import React, { useState } from 'react';
import { 
  X, 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Play, 
  RefreshCw,
  FileCode,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { getGasUrl, saveGasUrl, pingGasEndpoint, resetToSampleData } from '../../services/api';
import { SPREADSHEET_ID } from '../../data/initialData';

export default function SettingsModal({ isOpen, onClose, onDataReset }) {
  const [gasUrlInput, setGasUrlInput] = useState(getGasUrl());
  const [pingStatus, setPingStatus] = useState(null);
  const [pingLoading, setPingLoading] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveUrl = () => {
    saveGasUrl(gasUrlInput);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handlePing = async () => {
    if (!gasUrlInput.trim()) {
      setPingStatus({
        success: false,
        message: 'Por favor ingresa la URL de la API de Sincronización antes de probar.'
      });
      return;
    }

    setPingLoading(true);
    setPingStatus(null);

    try {
      const res = await pingGasEndpoint(gasUrlInput);
      setPingStatus({
        success: true,
        message: `¡Conexión exitosa con el servicio remoto! Mensaje: ${res.message || 'API Operativa'}`
      });
      saveGasUrl(gasUrlInput);
    } catch (err) {
      setPingStatus({
        success: false,
        message: err.message
      });
    } finally {
      setPingLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar la base de datos a los ejemplos de muestra iniciales de Barquisimeto?')) {
      resetToSampleData();
      if (onDataReset) onDataReset();
      alert('Datos restaurados a la configuración inicial con éxito.');
    }
  };

  const copyAppsScriptCode = async () => {
    try {
      const res = await fetch('/Codigo.gs');
      let text = '';
      if (res.ok) {
        text = await res.text();
      } else {
        text = `// ID DEL REPOSITORIO DE DATOS SOBERANO: ${SPREADSHEET_ID}\n// Revisa el archivo google-apps-script/Codigo.gs incluido en el repositorio.`;
      }
      navigator.clipboard.writeText(text);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    } catch (e) {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Configuración de Conexión Soberana
              </h3>
              <p className="text-xs text-slate-500">
                Base de Datos Institucional y API de Sincronización Remota
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Identificación del Repositorio */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                ID Oficial del Repositorio de Datos Soberano
              </span>
              <a
                href={`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:underline"
              >
                <span>Abrir Repositorio de Datos</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="font-mono text-xs bg-white p-2.5 rounded-lg border border-slate-200 select-all text-slate-800 break-all">
              {SPREADSHEET_ID}
            </div>
            <p className="text-[11px] text-slate-500">
              El script sincroniza 5 matrices estructuradas (Entrevistas, GruposFocales, MatrizEtnografica, AuditoriaSistemas, MapeoActores) con encabezados oficiales.
            </p>
          </div>

          {/* Campo URL del Servicio de Integración */}
          <div className="space-y-2">
            <label htmlFor="gas_url" className="block font-bold text-slate-900 text-xs uppercase tracking-wide">
              URL de la API de Sincronización Soberana (doGet / doPost)
            </label>
            <input
              type="url"
              id="gas_url"
              value={gasUrlInput}
              onChange={(e) => setGasUrlInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
            />
            <p className="text-[11px] text-slate-500">
              Si dejas este campo vacío o la conexión remota no responde, la aplicación continuará funcionando ininterrumpidamente guardando todos los datos en el <strong>Almacenamiento Local Soberano</strong> del navegador.
            </p>

            {/* Botones Probar y Guardar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handlePing}
                disabled={pingLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
              >
                <Play className={`w-3.5 h-3.5 ${pingLoading ? 'animate-spin' : ''}`} />
                <span>{pingLoading ? 'Probando...' : 'Probar Conexión (Ping)'}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition"
              >
                <span>{saveSuccess ? '¡URL Guardada!' : 'Guardar URL'}</span>
              </button>
            </div>

            {/* Mensaje de Estado del Ping */}
            {pingStatus && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                pingStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
              }`}>
                {pingStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{pingStatus.message}</span>
              </div>
            )}
          </div>

          {/* Guía Rápida para Desplegar el Script en el Servidor */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-red-600" />
                <span>Pasos para Instalar «Código.gs» en el Repositorio Central</span>
              </h4>

              <button
                onClick={copyAppsScriptCode}
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{codeCopied ? '¡Código Copiado!' : 'Copiar Código.gs'}</span>
              </button>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              <li>Abre el documento del Repositorio de Datos (ID: <code className="font-mono text-red-600">1pTxVBSWoSm...</code>).</li>
              <li>En el menú superior, ve a <strong>Extensiones &gt; Editor de Scripts</strong>.</li>
              <li>Reemplaza el contenido del archivo con el código provisto en <code className="font-mono text-slate-800">google-apps-script/Codigo.gs</code>.</li>
              <li>Haz clic en <strong>Implementar &gt; Nueva implementación</strong>.</li>
              <li>Selecciona tipo: <strong>Aplicación web</strong>.</li>
              <li>En «Quién tiene acceso», selecciona obligatoriamente: <strong>Cualquiera (Anyone)</strong>.</li>
              <li>Haz clic en <strong>Implementar</strong>, autoriza los permisos requeridos y copia la URL generada en el campo superior.</li>
            </ol>
          </div>

          {/* Restauración de Datos de Prueba */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Datos de Muestra y Línea Base</h5>
              <p className="text-[11px] text-slate-500">Restaura los registros de demostración de Barquisimeto.</p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Restaurar Muestra</span>
            </button>
          </div>

        </div>

        {/* Pie del Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
