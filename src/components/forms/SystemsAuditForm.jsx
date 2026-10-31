import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import WordCountInput from '../common/WordCountInput';
import { 
  INSTITUCIONES_IRIBARREN, 
  ARQUITECTURAS_SOFTWARE, 
  CAPACIDADES_INTEROPERABILIDAD, 
  NIVELES_DUPLICIDAD 
} from '../../data/initialData';
import { submitInstrumentRecord } from '../../services/api';
import { Cpu, Send, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function SystemsAuditForm({ onRecordSubmitted }) {
  const [formData, setFormData] = useState({
    sistema: '',
    institucion: INSTITUCIONES_IRIBARREN[0],
    arquitectura: ARQUITECTURAS_SOFTWARE[0],
    interoperabilidad: CAPACIDADES_INTEROPERABILIDAD[0],
    duplicidad: NIVELES_DUPLICIDAD[0],
    contradiccion_infogobierno: '',
    observaciones: '',
    consentimiento: false
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const checkWords = (text, min) => {
    if (!text) return false;
    const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    return count >= min;
  };

  const isFormValid = () => {
    return (
      formData.sistema.trim().length > 2 &&
      formData.institucion &&
      formData.arquitectura &&
      formData.interoperabilidad &&
      formData.duplicidad &&
      checkWords(formData.contradiccion_infogobierno, 10) &&
      checkWords(formData.observaciones, 8) &&
      formData.consentimiento
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor completa todos los campos técnicos y el análisis de contradicción con la Ley de Infogobierno.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInstrumentRecord('auditoria', formData);
      setStatusMessage({
        type: 'success',
        text: `¡Auditoría del sistema guardada! Código: ${res.recordId}. Almacenada en la memoria soberana${res.gasSynced ? ' y sincronizada con Google Spreadsheets' : ''}.`
      });

      setFormData(prev => ({
        ...prev,
        sistema: '',
        contradiccion_infogobierno: '',
        observaciones: '',
        consentimiento: false
      }));

      if (onRecordSubmitted) onRecordSubmitted();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Error al registrar auditoría: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      {/* Encabezado */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
          <span>⚙️ Instrumento 4</span>
          <span>•</span>
          <span>Auditoría de Sistemas y Análisis Documental</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Matriz de Auditoría y Soberanía Tecnológica
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Objetivo metodológico: Evaluar los sistemas de información actuales, sus arquitecturas y manuales bajo los principios de Soberanía Tecnológica, Ley de Infogobierno y Desarrollo Endógeno.
        </p>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border ${
          statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : 'bg-red-50 text-red-900 border-red-200'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Identificación del Sistema */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            I. Identificación de la Plataforma
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sistema" className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre del Sistema / Software / Base de Datos *
              </label>
              <input
                type="text"
                id="sistema"
                name="sistema"
                value={formData.sistema}
                onChange={handleChange}
                placeholder="Ej. SIGES, Módulo Patria Hogares, Sistema de Triaje Comunal..."
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div>
              <label htmlFor="audit_institucion" className="block text-xs font-semibold text-slate-700 mb-1">
                Institución Administradora / Responsable *
              </label>
              <select
                id="audit_institucion"
                name="institucion"
                value={formData.institucion}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {INSTITUCIONES_IRIBARREN.map((inst, idx) => (
                  <option key={idx} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Criterios Técnicos y Político-Legales */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            II. Dimensiones Arquitectónicas y de Interoperabilidad
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="arquitectura" className="block text-xs font-semibold text-slate-700">
                  Arquitectura Tecnológica *
                </label>
                <MarxistTooltip termKey="caja de cristal">Caja de Cristal</MarxistTooltip>
              </div>
              <select
                id="arquitectura"
                name="arquitectura"
                value={formData.arquitectura}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {ARQUITECTURAS_SOFTWARE.map((arq, idx) => (
                  <option key={idx} value={arq}>{arq}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="interoperabilidad" className="block text-xs font-semibold text-slate-700 mb-1">
                Capacidad de Interoperabilidad *
              </label>
              <select
                id="interoperabilidad"
                name="interoperabilidad"
                value={formData.interoperabilidad}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {CAPACIDADES_INTEROPERABILIDAD.map((inter, idx) => (
                  <option key={idx} value={inter}>{inter}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duplicidad" className="block text-xs font-semibold text-slate-700 mb-1">
                Duplicidad de Datos Identificada *
              </label>
              <select
                id="duplicidad"
                name="duplicidad"
                value={formData.duplicidad}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {NIVELES_DUPLICIDAD.map((dup, idx) => (
                  <option key={idx} value={dup}>{dup}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Análisis Crítico Documental */}
        <div className="space-y-6 pt-1">
          <WordCountInput
            id="contradiccion_infogobierno"
            name="contradiccion_infogobierno"
            value={formData.contradiccion_infogobierno}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Contradicción con la Ley de Infogobierno (Decreto N° 8.950)"
            helperText="Analice si el sistema viola los mandatos de Software Libre (Art. 4 y 23), Interoperabilidad Abierta (Art. 34) o Soberanía de Datos Nacionales."
            tooltipContent={<MarxistTooltip termKey="soberania tecnologica">Ver: Soberanía Tecnológica</MarxistTooltip>}
            placeholder="Examine la contradicción entre el marco legal revolucionario venezolano y las barreras técnicas de la plataforma auditada..."
          />

          <WordCountInput
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            minWords={8}
            rows={3}
            label="Observaciones Técnicas y Operativas (Línea Base para la Integración)"
            helperText="Detalles sobre bases de datos utilizadas (Postgres, Oracle, MySQL, Excel), manuales disponibles, formatos de archivo y viabilidad de migración."
            placeholder="Especifique lenguaje, base de datos subyacente, dependencias de licencias y ruta de liberación recomendada..."
          />
        </div>

        {/* Consentimiento */}
        <div className="bg-red-50/70 border border-red-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentimiento_aud"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consentimiento_aud" className="text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer">
              <strong>Validación Metodológica de Auditoría Técnica:</strong> Confirmo que la caracterización técnica del sistema fue realizada mediante análisis documental y levantamiento in situ, respondiendo al diagnóstico de soberanía del Municipio Iribarren.
            </label>
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
              isFormValid() && !loading
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Procesando Auditoría...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Registrar en Matriz de Auditoría</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
