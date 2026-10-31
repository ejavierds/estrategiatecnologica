import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import WordCountInput from '../common/WordCountInput';
import { RECURSOS_PODER, POSICIONES_INTEGRACION } from '../../data/initialData';
import { submitInstrumentRecord } from '../../services/api';
import { Compass, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ActorsMappingForm({ onRecordSubmitted }) {
  const [formData, setFormData] = useState({
    actor: '',
    recursos_poder: RECURSOS_PODER[0],
    interes: '',
    posicion: POSICIONES_INTEGRACION[0],
    discurso: '',
    estrategia_praxis: '',
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
      formData.actor.trim().length > 3 &&
      formData.recursos_poder &&
      checkWords(formData.interes, 8) &&
      formData.posicion &&
      checkWords(formData.discurso, 8) &&
      checkWords(formData.estrategia_praxis, 10) &&
      formData.consentimiento
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor completa todos los campos del mapeo estratégico con el nivel de detalle requerido.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInstrumentRecord('mapeo_actores', formData);
      setStatusMessage({
        type: 'success',
        text: `¡Actor mapeado exitosamente! Código: ${res.recordId}. Almacenado en la memoria soberana${res.gasSynced ? ' y sincronizado con la Base de Datos Soberana' : ''}.`
      });

      setFormData(prev => ({
        ...prev,
        actor: '',
        interes: '',
        discurso: '',
        estrategia_praxis: '',
        consentimiento: false
      }));

      if (onRecordSubmitted) onRecordSubmitted();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Error al registrar actor: ${err.message}`
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
          <span>🗺️ Instrumento 5</span>
          <span>•</span>
          <span>Planificación Estratégica Situacional (PES - Carlos Matus)</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Matriz de Mapeo de Actores y Fuerzas Sociales
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Objetivo metodológico: Modelar las fuerzas sociopolíticas y técnicas, su peso, recursos de poder y posición respecto al proyecto de integración tecnológica emancipadora.
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
        
        {/* Identificación del Actor y Posición */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
            <span>I. Caracterización del Actor en el Juego Social</span>
            <MarxistTooltip termKey="planificacion estrategica situacional">PES (Carlos Matus)</MarxistTooltip>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="actor" className="block text-xs font-semibold text-slate-700 mb-1">
                Actor Social / Político *
              </label>
              <input
                type="text"
                id="actor"
                name="actor"
                value={formData.actor}
                onChange={handleChange}
                placeholder="Ej. Directores de Salud, Equipo de Servidores, Comunas..."
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div>
              <label htmlFor="recursos_poder" className="block text-xs font-semibold text-slate-700 mb-1">
                Recursos de Poder Predominantes *
              </label>
              <select
                id="recursos_poder"
                name="recursos_poder"
                value={formData.recursos_poder}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {RECURSOS_PODER.map((rec, idx) => (
                  <option key={idx} value={rec}>{rec}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="posicion" className="block text-xs font-semibold text-slate-700 mb-1">
                Posición ante la Integración *
              </label>
              <select
                id="posicion"
                name="posicion"
                value={formData.posicion}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
              >
                {POSICIONES_INTEGRACION.map((pos, idx) => (
                  <option key={idx} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interés, Discurso y Estrategia */}
        <div className="space-y-6 pt-1">
          <WordCountInput
            id="interes"
            name="interes"
            value={formData.interes}
            onChange={handleChange}
            minWords={8}
            rows={3}
            label="Interés Principal del Actor (Motivación Real)"
            helperText="¿Qué busca preservar o ganar el actor? (Ej. autonomía institucional, control de partidas, eficiencia social, seguridad de sus datos)."
            placeholder="Especifique el móvil objetivo que guía su conducta institucional o comunal..."
          />

          <WordCountInput
            id="discurso"
            name="discurso"
            value={formData.discurso}
            onChange={handleChange}
            minWords={8}
            rows={3}
            label="Discurso Manifiesto (Lo que declara abiertamente)"
            helperText="Qué argumentos expone en reuniones o resoluciones (Ej. 'no tenemos orden de compartir', 'la soberanía exige cooperar')."
            placeholder="Exprese los argumentos formales que esgrime ante la comunidad o directivos..."
          />

          <WordCountInput
            id="estrategia_praxis"
            name="estrategia_praxis"
            value={formData.estrategia_praxis}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Estrategia de Abordaje (Praxis Política para la Viabilidad)"
            helperText="Acciones políticas, técnicas y pedagógicas para sumar al actor al 'Bloque Histórico' o neutralizar su resistencia burocrática."
            tooltipContent={<MarxistTooltip termKey="hegemonia">Ver: Bloque Histórico (Gramsci)</MarxistTooltip>}
            placeholder="Describa la propuesta de incidencia: acuerdos de corresponsabilidad, comités técnicos mixtos, formación política..."
          />
        </div>

        {/* Consentimiento */}
        <div className="bg-red-50/70 border border-red-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentimiento_act"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consentimiento_act" className="text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer">
              <strong>Validación Metodológica del Mapeo Estratégico:</strong> Certifico que la caracterización de este actor social se fundamenta en la observación directa de su praxis y deliberaciones en mesas de trabajo del Municipio Iribarren.
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
                <span>Procesando Actor...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Registrar en Matriz de Actores PES</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
