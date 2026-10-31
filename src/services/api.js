/**
 * SERVICIO DE COMUNICACIÓN CON EL REPOSITORIO REMOTO Y PERSISTENCIA SOBERANA LOCAL
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
 * Normaliza cualquier registro (remoto o local) para asegurar que contenga
 * tanto las claves estándar extendidas como las claves cortas de los formularios.
 */
export function normalizeRecord(instrument, raw) {
  if (!raw || typeof raw !== 'object') return {};

  // Normalizar fecha
  let fechaStr = raw.fecha;
  if (fechaStr && typeof fechaStr === 'string' && fechaStr.includes('T')) {
    fechaStr = fechaStr.split('T')[0];
  } else if (!fechaStr) {
    fechaStr = new Date().toISOString().split('T')[0];
  }

  // Normalizar marca temporal
  let marcaTemporal = raw.marca_temporal || raw.timestamp || `${fechaStr} 12:00:00`;
  if (typeof marcaTemporal === 'string' && marcaTemporal.includes('T')) {
    marcaTemporal = marcaTemporal.replace('T', ' ').substring(0, 19);
  }

  const consentimientoVal = raw.consentimiento_informado || (raw.consentimiento ? 'Sí (Aceptado)' : 'Sí (Aceptado)');

  switch (instrument) {
    case 'entrevista':
    case 'entrevistas': {
      const p1 = raw.pregunta_1_totalidad_concreta || raw.pregunta_1__totalidad_concreta || raw.p1_totalidad || '';
      const p2 = raw.pregunta_2_contradiccion_capital_trabajo_burocracia || raw.pregunta_2__contradiccion_capital_trabajo_burocracia || raw.p2_contradiccion || '';
      const p3 = raw.pregunta_3_mediaciones_y_poder || raw.pregunta_3__mediaciones_y_poder || raw.p3_mediaciones || '';
      const p4 = raw.pregunta_4_alienacion_vs_soberania || raw.pregunta_4__alienacion_vs_soberania || raw.p4_alienacion || '';
      const p5 = raw.pregunta_5_praxis_sintesis || raw.pregunta_5__praxis___sintesis || raw.pregunta_5_praxis_o_sintesis || raw.p5_praxis || '';
      const inst = raw.institucion || raw.institucion_responsable || '';
      const cargo = raw.cargo_del_informante || raw.cargo || '';

      return {
        ...raw,
        id_registro: raw.id_registro || raw.id || 'ENT-0001',
        marca_temporal: marcaTemporal,
        fecha: fechaStr,
        institucion: inst,
        cargo: cargo,
        cargo_del_informante: cargo,
        p1_totalidad: p1,
        pregunta_1_totalidad_concreta: p1,
        p2_contradiccion: p2,
        pregunta_2_contradiccion_capital_trabajo_burocracia: p2,
        p3_mediaciones: p3,
        pregunta_3_mediaciones_y_poder: p3,
        p4_alienacion: p4,
        pregunta_4_alienacion_vs_soberania: p4,
        p5_praxis: p5,
        pregunta_5_praxis_sintesis: p5,
        consentimiento: true,
        consentimiento_informado: consentimientoVal
      };
    }

    case 'grupo_focal':
    case 'grupos_focales': {
      const f1 = raw.fase_1_problematizacion_inicial || raw.fase_1__problematizacion_inicial__dignidad_y_trabajo_diario_ || raw.fase_1_problematizacion_inicial_dignidad_y_trabajo_diario || raw.fase1_problematizacion || '';
      const f2 = raw.fase_2_identificacion_de_nudos_criticos || raw.fase_2__identificacion_de_nudos_criticos__saber_tecnico_vs_social_ || raw.fase_2_identificacion_de_nudos_criticos_saber_tecnico_vs_social || raw.fase2_nudos_criticos || '';
      const f3 = raw.fase_3_construccion_de_la_utopia_concreta || raw.fase_3__construccion_de_la_utopia_concreta__ecosistema_integrado_ || raw.fase_3_construccion_de_la_utopia_concreta_ecosistema_integrado || raw.fase3_utopia_concreta || '';
      const actores = raw.actores_participantes || raw.actores || '';

      return {
        ...raw,
        id_registro: raw.id_registro || raw.id || 'GF-0001',
        marca_temporal: marcaTemporal,
        fecha: fechaStr,
        lugar: raw.lugar || raw.lugar___espacio_observado || 'Barquisimeto',
        actores: actores,
        actores_participantes: actores,
        fase1_problematizacion: f1,
        fase_1_problematizacion_inicial: f1,
        fase2_nudos_criticos: f2,
        fase_2_identificacion_de_nudos_criticos: f2,
        fase3_utopia_concreta: f3,
        fase_3_construccion_de_la_utopia_concreta: f3,
        consentimiento: true,
        consentimiento_informado: consentimientoVal
      };
    }

    case 'etnografia': {
      const cat = raw.categoria_vinculada || raw.categoria || '';
      const desc = raw.descripcion_fenomenologica || raw.descripcion || raw.descripcion_fenomenologica__lo_que_ocurre_ || raw.descripcion_fenomenologica_lo_que_ocurre || '';
      const interp = raw.interpretacion_critica || raw.interpretacion || raw.interpretacion_critica__lo_que_oculta_ || raw.interpretacion_critica_lo_que_oculta || '';
      const notas = raw.analisis_del_discurso || raw.notas_discurso || raw.analisis_del_discurso___notas || raw.analisis_del_discurso_notas || '';

      return {
        ...raw,
        id_registro: raw.id_registro || raw.id || 'ETN-0001',
        marca_temporal: marcaTemporal,
        fecha: fechaStr,
        lugar: raw.lugar || raw.lugar___espacio_observado || 'Barquisimeto',
        categoria: cat,
        categoria_vinculada: cat,
        descripcion: desc,
        descripcion_fenomenologica: desc,
        interpretacion: interp,
        interpretacion_critica: interp,
        notas_discurso: notas,
        analisis_del_discurso: notas,
        consentimiento: true,
        consentimiento_informado: consentimientoVal
      };
    }

    case 'auditoria': {
      const sist = raw.sistema_plataforma || raw.sistema || raw.sistema___plataforma || '';
      const inst = raw.institucion_responsable || raw.institucion || '';
      const arq = raw.arquitectura || raw.arquitectura__libre___privativo___mixto_ || raw.arquitectura_libre_privativo || raw.arquitectura_libre_privativo_mixto || '';
      const interop = raw.capacidad_de_interoperabilidad || raw.capacidad_de_interoperabilidad__api_bd_manual_ || raw.capacidad_de_interoperabilidad_api_bd_manual || raw.interoperabilidad || '';
      const dup = raw.duplicidad_de_datos_identificada || raw.duplicidad || '';
      const ley = raw.contradiccion_con_ley_de_infogobierno || raw.contradiccion_infogobierno || '';
      const obs = raw.observaciones_tecnicas || raw.observaciones || '';

      return {
        ...raw,
        id_registro: raw.id_registro || raw.id || 'AUD-0001',
        marca_temporal: marcaTemporal,
        fecha: fechaStr,
        sistema: sist,
        sistema_plataforma: sist,
        institucion: inst,
        institucion_responsable: inst,
        arquitectura: arq,
        interoperabilidad: interop,
        capacidad_de_interoperabilidad: interop,
        duplicidad: dup,
        duplicidad_de_datos_identificada: dup,
        contradiccion_infogobierno: ley,
        contradiccion_con_ley_de_infogobierno: ley,
        observaciones: obs,
        observaciones_tecnicas: obs,
        consentimiento: true,
        consentimiento_informado: consentimientoVal
      };
    }

    case 'mapeo_actores': {
      const act = raw.actor_social_politico || raw.actor || raw.actor_social___politico || '';
      const rec = raw.recursos_de_poder || raw.recursos_poder || raw.recursos_de_poder__tecnico___politico___economico___comunal_ || raw.recursos_de_poder_tecnico_politico_economico_comunal || '';
      const inte = raw.interes_principal || raw.interes || '';
      const pos = raw.posicion_ante_la_integracion || raw.posicion || raw.posicion_ante_la_integracion__a_favor___neutro___en_contra_ || raw.posicion_ante_la_integracion_a_favor_neutro_en_contra || '';
      const disc = raw.discurso_manifiesto || raw.discurso || '';
      const estr = raw.estrategia_de_abordaje || raw.estrategia_praxis || raw.estrategia_de_abordaje__praxis_ || raw.estrategia_de_abordaje_praxis || '';

      return {
        ...raw,
        id_registro: raw.id_registro || raw.id || 'ACT-0001',
        marca_temporal: marcaTemporal,
        fecha: fechaStr,
        actor: act,
        actor_social_politico: act,
        recursos_poder: rec,
        recursos_de_poder: rec,
        interes: inte,
        interes_principal: inte,
        posicion: pos,
        posicion_ante_la_integracion: pos,
        discurso: disc,
        discurso_manifiesto: disc,
        estrategia_praxis: estr,
        estrategia_de_abordaje: estr,
        consentimiento: true,
        consentimiento_informado: consentimientoVal
      };
    }

    default:
      return raw;
  }
}

/**
 * Combina registros remotos y locales eliminando duplicados por ID de registro
 */
function mergeRecords(remoteList = [], localList = [], instrument) {
  const normRemote = (remoteList || []).map(r => normalizeRecord(instrument, r));
  const normLocal = (localList || []).map(r => normalizeRecord(instrument, r));

  const map = new Map();
  // 1. Agregar locales
  normLocal.forEach(item => {
    const key = item.id_registro || `${item.fecha}_${item.institucion || item.actor || item.sistema || Math.random()}`;
    map.set(key, item);
  });
  // 2. Sobrescribir / agregar remotos (tienen prioridad porque provienen del repositorio central)
  normRemote.forEach(item => {
    const key = item.id_registro || `${item.fecha}_${item.institucion || item.actor || item.sistema || Math.random()}`;
    map.set(key, item);
  });

  return Array.from(map.values());
}

/**
 * Cargar todos los datos desde LocalStorage o Initial Data normalizados
 */
export function getLocalRecords() {
  try {
    const raw = localStorage.getItem('praxis_iribarren_data_v1');
    let dataObj = INITIAL_DATA;
    if (raw) {
      dataObj = JSON.parse(raw);
    } else {
      localStorage.setItem('praxis_iribarren_data_v1', JSON.stringify(INITIAL_DATA));
    }

    return {
      entrevistas: (dataObj.entrevistas || []).map(r => normalizeRecord('entrevista', r)),
      grupos_focales: (dataObj.grupos_focales || []).map(r => normalizeRecord('grupo_focal', r)),
      etnografia: (dataObj.etnografia || []).map(r => normalizeRecord('etnografia', r)),
      auditoria: (dataObj.auditoria || []).map(r => normalizeRecord('auditoria', r)),
      mapeo_actores: (dataObj.mapeo_actores || []).map(r => normalizeRecord('mapeo_actores', r)),
    };
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
 * Cargar registros desde el servicio remoto con sincronización federada hacia LocalStorage
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
      // Normalizar datos remotos y fusionar con locales para no perder registros
      const merged = {
        entrevistas: mergeRecords(json.data.entrevista, localData.entrevistas, 'entrevista'),
        grupos_focales: mergeRecords(json.data.grupo_focal, localData.grupos_focales, 'grupo_focal'),
        etnografia: mergeRecords(json.data.etnografia, localData.etnografia, 'etnografia'),
        auditoria: mergeRecords(json.data.auditoria, localData.auditoria, 'auditoria'),
        mapeo_actores: mergeRecords(json.data.mapeo_actores, localData.mapeo_actores, 'mapeo_actores'),
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
 * Enviar un nuevo registro desde cualquier formulario
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

  // Formato normalizado para consistencia inmediata en toda la UI
  const newRecord = normalizeRecord(instrument, {
    ...payload,
    id_registro: nextId,
    marca_temporal: timestampStr,
    fecha: payload.fecha || now.toISOString().split('T')[0],
    consentimiento_informado: payload.consentimiento ? 'Sí (Aceptado)' : 'No'
  });

  // Guardar inmediatamente en LocalStorage para redundancia y cero pérdida
  currentData[pluralKey] = [newRecord, ...list.filter(item => item.id_registro !== nextId)];
  saveLocalRecords(currentData);

  // Intentar sincronizar con el servicio remoto (API REST)
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
    record: newRecord,
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
  const normalizedInitial = {
    entrevistas: (INITIAL_DATA.entrevistas || []).map(r => normalizeRecord('entrevista', r)),
    grupos_focales: (INITIAL_DATA.grupos_focales || []).map(r => normalizeRecord('grupo_focal', r)),
    etnografia: (INITIAL_DATA.etnografia || []).map(r => normalizeRecord('etnografia', r)),
    auditoria: (INITIAL_DATA.auditoria || []).map(r => normalizeRecord('auditoria', r)),
    mapeo_actores: (INITIAL_DATA.mapeo_actores || []).map(r => normalizeRecord('mapeo_actores', r)),
  };
  saveLocalRecords(normalizedInitial);
  return normalizedInitial;
}
