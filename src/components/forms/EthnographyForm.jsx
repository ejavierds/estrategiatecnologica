import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import WordCountInput from '../common/WordCountInput';
import { CATEGORIAS_ETNOGRAFICAS } from '../../data/initialData';
import { submitInstrumentRecord } from '../../services/api';
import { Eye, Send, CheckCircle2, AlertTriangle, BookMarked } from 'lucide-react';

export default function EthnographyForm({ onRecordSubmitted }) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    lugar: '',
    categoria: CATEGORIAS_ETNOGRAFICAS[0],
    descripcion_fenomenologica: '',
    interpretacion_critica: '',
    notas_discurso: '',
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
      formData.lugar.trim().length > 3 &&
      formData.categoria &&
      checkWords(formData.descripcion_fenomenologica, 10) &&
      checkWords(formData.interpretacion_critica, 10) &&
      checkWords(formData.notas_discurso, 5) &&
      formData.consentimiento
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatusMessage({
        type: 'error',
        text: 'Completa la descripción, interpretación y notas del discurso con suficiente profundidad analítica.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInstrumentRecord('etnografia', formData);
      setStatusMessage({
        type: 'success',
        text: `¡Registro etnográfico guardado! Código: ${res.recordId}. Almacenado en la memoria soberana${res.gasSynced ? ' y sincronizado con Google Spreadsheets' : ''}.`
      });

      setFormData(prev => ({
        ...prev,
        lugar: '',
        descripcion_fenomenologica: '',
        interpretacion_critica: '',
        notas_discurso: '',
        consentimiento: false
      }));

      if (onRecordSubmitted) onRecordSubmitted();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Error al registrar: ${err.message}`
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
          <span>📝 Instrumento 3</span>
          <span>•</span>
          <span>Observación Participante y Diario de Campo</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Matriz de Registro Etnográfico
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Objetivo metodológico: Observar el comportamiento, los rituales burocráticos y las resistencias operativas en la praxis institucional y reuniones interinstitucionales.
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

      {/* Nota Metodológica de Orientación */}
      <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 mb-6 flex items-start gap-2.5">
        <BookMarked className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Directriz para el Investigador:</strong> No solo registrar fallas técnicas o informáticas, sino evidenciar <em>"la propiedad del dato"</em> como mecanismo de control y poder burocrático. Registrar el lenguaje literal empleado por los actores (Análisis del Discurso).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Contexto Espacial y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80">
          <div>
            <label htmlFor="etn_fecha" className="block text-xs font-semibold text-slate-700 mb-1">
              Fecha de Observación *
            </label>
            <input
              type="date"
              id="etn_fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label htmlFor="etn_lugar" className="block text-xs font-semibold text-slate-700 mb-1">
              Lugar / Espacio Observado *
            </label>
            <input
              type="text"
              id="etn_lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              placeholder="Ej. Taquilla de atención social, Sala técnica, Mesa de salud..."
              required
              className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          <div>
            <label htmlFor="categoria" className="block text-xs font-semibold text-slate-700 mb-1">
              Categoría Vinculada (Teórica) *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800"
            >
              {CATEGORIAS_ETNOGRAFICAS.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Campos Fenomenológico y Crítico */}
        <div className="space-y-6 pt-1">
          <WordCountInput
            id="descripcion_fenomenologica"
            name="descripcion_fenomenologica"
            value={formData.descripcion_fenomenologica}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Descripción Fenomenológica (Lo que ocurre objetivamente)"
            helperText="Narre el hecho concreto, ritual burocrático, demora, traba técnica o interacción observada entre el ciudadano y la institución."
            placeholder="Describa el hecho fáctico: filas de espera, rechazo de planillas ajenas, desconexiones, exigencia de nuevos requisitos..."
          />

          <WordCountInput
            id="interpretacion_critica"
            name="interpretacion_critica"
            value={formData.interpretacion_critica}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Interpretación Crítica Dialéctica (Lo que oculta el fenómeno)"
            helperText="Develar qué relaciones materiales de poder, alienación o intereses de dominación burocrática subyacen detrás del hecho observado."
            tooltipContent={<MarxistTooltip termKey="mediaciones">Ver: Lógicas de Poder Ocultas</MarxistTooltip>}
            placeholder="Analice qué contradicción estructural se manifiesta y a quién beneficia el mantenimiento de este aislamiento..."
          />

          <WordCountInput
            id="notas_discurso"
            name="notas_discurso"
            value={formData.notas_discurso}
            onChange={handleChange}
            minWords={5}
            rows={3}
            label="Análisis del Discurso (Frases y justificaciones textuales)"
            helperText="Citas textuales escuchadas de funcionarios o usuarios (Ej. 'no tenemos línea para ese sistema', 'esa base de datos es nuestra', etc.)"
            placeholder="Registre expresiones textuales de resistencia, justificación burocrática o reclamo popular..."
          />
        </div>

        {/* Consentimiento */}
        <div className="bg-red-50/70 border border-red-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentimiento_etn"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consentimiento_etn" className="text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer">
              <strong>Validación del Diario de Campo Etnográfico:</strong> Confirmo que este registro de observación participante fue levantado en el terreno de investigación bajo estrictos criterios de rigor epistemológico y anonimato de los sujetos observados.
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
                <span>Guardando Registro...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Registrar en Matriz Etnográfica</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
