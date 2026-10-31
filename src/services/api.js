/**
 * SERVICIO DE COMUNICACIÓN CON EL SERVICIO REMOTO Y PERSISTENCIA SOBERANA LOCAL
 * Proyecto: Estrategia de Integración Tecnológica (Municipio Iribarren)
 * Investigador: Ing. Edery Javier Rodríguez Alvarado
 */

import { INITIAL_DATA, SPREADSHEET_ID } from '../data/initialData';

const STORAGE_KEY_API_URL = 'praxis_iribarren_remote_url';

/**
 * Obtener la URL guardada del servicio remoto
 */
export function getGasUrl() {
  const local = localStorage.getItem(STORAGE_KEY_API_URL);
  if (local && local.trim().length > 0) return local.trim();
  return (import.meta.env.VITE_GAS_API_URL || '').trim();
}

/**
 * Guardar la URL del servicio remoto
 */
export function saveGasUrl(url) {
  if (!url) {
    localStorage.removeItem(STORAGE_KEY_API_URL);
  } else {
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim());
  }
}

/**
 * Cargar todos los datos (LocalStorage o Initial Data)
 */
export function getLocalRecords() {
  try {
    const raw = localStorage.getItem('praxis_iribarren_data_v1');
    if (!raw) {
      localStorage.setItem('praxis_iribarren_data_v1', JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al leer datos locales:', e);
    return INITIAL_DATA;
  }
}

/**
 * Guardar estado completo en LocalStorage
 */
export function saveLocalRecords(data) {
  try {
    localStorage.setItem('praxis_iribarren_data_v1', JSON.stringify(data));
  } catch (e) {
    console.error('Error al guardar datos locales:', e);
  }
}

/**
 * Cargar registros desde el servicio remoto con fallback a LocalStorage
 */
export async function fetchAllRecords() {
  const remoteUrl = getGasUrl();
  const localData = getLocalRecords();

  if (!remoteUrl) {
    return {
      source: 'local',
      data: localData,
      message: 'Operando en modo de Almacenamiento Local Soberano. Conecta la API en Configuración para sincronización remota.'
    };
  }

  try {
    const fetchUrl = `${remoteUrl}?action=getAll&t=${Date.now()}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor remoto HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json.status === 'success' && json.data) {
      // Normalizar datos remotos y fusionar con locales
      const merged = {
        entrevistas: json.data.entrevista && json.data.entrevista.length > 0 ? json.data.entrevista : localData.entrevistas,
        grupos_focales: json.data.grupo_focal && json.data.grupo_focal.length > 0 ? json.data.grupo_focal : localData.grupos_focales,
        etnografia: json.data.etnografia && json.data.etnografia.length > 0 ? json.data.etnografia : localData.etnografia,
        auditoria: json.data.auditoria && json.data.auditoria.length > 0 ? json.data.auditoria : localData.auditoria,
        mapeo_actores: json.data.mapeo_actores && json.data.mapeo_actores.length > 0 ? json.data.mapeo_actores : localData.mapeo_actores,
      };
      saveLocalRecords(merged);
      return {
        source: 'gas',
        data: merged,
        message: 'Datos sincronizados exitosamente desde el Repositorio de Datos Soberano.'
      };
    } else {
      throw new Error(json.message || 'Respuesta remota sin éxito');
    }
  } catch (err) {
    console.warn('Fallo al conectar con el servicio remoto, usando datos locales:', err);
    return {
      source: 'local',
      data: localData,
      warning: `No se pudo conectar al Repositorio Remoto (${err.message}). Utilizando copia de seguridad local.`,
      spreadsheetId: SPREADSHEET_ID
    };
  }
}

/**
 * Enviar un nuevo registro
 * @param {string} instrument 'entrevista' | 'grupo_focal' | 'etnografia' | 'auditoria' | 'mapeo_actores'
 * @param {object} payload Datos del formulario
 */
export async function submitInstrumentRecord(instrument, payload) {
  const currentData = getLocalRecords();
  const remoteUrl = getGasUrl();

  const now = new Date();
  const timestampStr = now.toISOString().replace('T', ' ').substring(0, 19);
  const prefixMap = {
    entrevista: 'ENT',
    grupo_focal: 'GF',
    etnografia: 'ETN',
    auditoria: 'AUD',
    mapeo_actores: 'ACT'
  };

  const keyMap = {
    entrevista: 'entrevistas',
    grupo_focal: 'grupos_focales',
    etnografia: 'etnografia',
    auditoria: 'auditoria',
    mapeo_actores: 'mapeo_actores'
  };

  const pluralKey = keyMap[instrument];
  const list = currentData[pluralKey] || [];
  const nextId = `${prefixMap[instrument]}-${String(list.length + 1).padStart(4, '0')}`;

  // Formato estandarizado para almacenamiento local
  const newRecord = {
    ...payload,
    id_registro: nextId,
    marca_temporal: timestampStr,
    consentimiento_informado: payload.consentimiento ? 'Sí (Aceptado)' : 'No'
  };

  // Guardar inmediatamente en local
  currentData[pluralKey] = [newRecord, ...list];
  saveLocalRecords(currentData);

  // Intentar sincronizar con el servicio remoto si hay URL configurada
  let syncSuccess = false;
  let syncError = null;

  if (remoteUrl) {
    try {
      const bodyData = {
        instrument: instrument,
        ...payload
      };

      await fetch(remoteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(bodyData),
        mode: 'no-cors'
      });

      syncSuccess = true;
    } catch (err) {
      console.error('Error al enviar al servicio remoto:', err);
      syncError = err.message;
    }
  }

  return {
    success: true,
    recordId: nextId,
    storedLocally: true,
    gasSynced: syncSuccess,
    gasError: syncError,
    timestamp: timestampStr
  };
}

/**
 * Probar conexión con el servicio remoto (Ping)
 */
export async function pingGasEndpoint(url) {
  if (!url) throw new Error('Debes ingresar la URL del servicio remoto de integración.');
  try {
    const testUrl = `${url.trim()}?action=ping&t=${Date.now()}`;
    const res = await fetch(testUrl, {
      method: 'GET'
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Fallo de conexión: ${err.message}. Asegúrate de que el servicio esté publicado con acceso público.`);
  }
}

/**
 * Restablecer datos a los ejemplos de muestra iniciales
 */
export function resetToSampleData() {
  saveLocalRecords(INITIAL_DATA);
  return INITIAL_DATA;
}
