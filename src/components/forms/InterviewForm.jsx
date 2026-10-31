import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import WordCountInput from '../common/WordCountInput';
import { INSTITUCIONES_IRIBARREN } from '../../data/initialData';
import { submitInstrumentRecord } from '../../services/api';
import { Send, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function InterviewForm({ onRecordSubmitted }) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    institucion: INSTITUCIONES_IRIBARREN[0],
    cargo: '',
    p1_totalidad: '',
    p2_contradiccion: '',
    p3_mediaciones: '',
    p4_alienacion: '',
    p5_praxis: '',
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
      formData.institucion &&
      formData.cargo.trim().length > 2 &&
      checkWords(formData.p1_totalidad, 10) &&
      checkWords(formData.p2_contradiccion, 10) &&
      checkWords(formData.p3_mediaciones, 10) &&
      checkWords(formData.p4_alienacion, 10) &&
      checkWords(formData.p5_praxis, 10) &&
      formData.consentimiento
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor completa todos los campos con la densidad reflexiva requerida (mínimo 10 palabras por pregunta) y acepta el Consentimiento Informado.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInstrumentRecord('entrevista', formData);
      setStatusMessage({
        type: 'success',
        text: `¡Entrevista registrada exitosamente! Código: ${res.recordId}. Almacenada en la memoria soberana${res.gasSynced ? ' y sincronizada con Google Spreadsheets' : ''}.`
      });

      // Limpiar formulario excepto institución y fecha
      setFormData(prev => ({
        ...prev,
        cargo: '',
        p1_totalidad: '',
        p2_contradiccion: '',
        p3_mediaciones: '',
        p4_alienacion: '',
        p5_praxis: '',
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
      {/* Encabezado del Instrumento */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
          <span>💬 Instrumento 1</span>
          <span>•</span>
          <span>Dirigido a Tomadores de Decisiones y Coordinadores</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Guión de Entrevista en Profundidad
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Objetivo metodológico: Develar las contradicciones estructurales y mediaciones institucionales en la gestión de sistemas de información social en el Municipio Iribarren.
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
        
        {/* Sección I: Identificación */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <span>I. Datos de Identificación Institucional</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="fecha" className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de Aplicación *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="institucion" className="block text-xs font-semibold text-slate-700 mb-1">
                Institución Participante *
              </label>
              <select
                id="institucion"
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

          <div>
            <label htmlFor="cargo" className="block text-xs font-semibold text-slate-700 mb-1">
              Cargo o Responsabilidad del Informante *
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Ej. Directora de Gestión Social, Coordinador de Tecnología, Responsable de Misión..."
              required
              className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </div>

        {/* Sección II: Preguntas Generadoras Dialéctico-Críticas */}
        <div className="space-y-6 pt-2">
          <div className="border-b border-slate-200 pb-2">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <span>II. Preguntas Generadoras (Dialéctica-Crítica)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Reflexiones profundas sobre las contradicciones materiales en los sistemas y la atención a las familias.
            </p>
          </div>

          {/* Pregunta 1: Totalidad Concreta */}
          <WordCountInput
            id="p1_totalidad"
            name="p1_totalidad"
            value={formData.p1_totalidad}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="1. Relación entre Mandato Constitucional y Estructura Tecnológica Fragmentada"
            helperText="Desde su posición, ¿cómo visualiza la relación entre el mandato constitucional de atención integral a la familia vulnerable (Art. 75 CRBV) y la actual estructura tecnológica dividida por instituciones?"
            tooltipContent={<MarxistTooltip termKey="totalidad concreta">Ver categoría: Totalidad Concreta</MarxistTooltip>}
            placeholder="Analice si la división en feudos tecnológicos fragmenta la respuesta integral exigida por la Constitución..."
          />

          {/* Pregunta 2: Contradicción Capital-Trabajo/Burocracia */}
          <WordCountInput
            id="p2_contradiccion"
            name="p2_contradiccion"
            value={formData.p2_contradiccion}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="2. Contradicción Burocracia - Carga Laboral del Servidor Público"
            helperText="¿De qué manera la existencia de múltiples sistemas y bases de datos inconexas impacta en la carga laboral de los servidores públicos y en la efectividad del Estado?"
            tooltipContent={<MarxistTooltip termKey="alienacion">Ver categoría: Alienación Laboral</MarxistTooltip>}
            placeholder="Describa el tiempo invertido en duplicar planillas, la saturación operativa y el impacto en la atención de las familias..."
          />

          {/* Pregunta 3: Mediaciones y Poder */}
          <WordCountInput
            id="p3_mediaciones"
            name="p3_mediaciones"
            value={formData.p3_mediaciones}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="3. Mediaciones, Celos Institucionales y Lógicas de Poder"
            helperText="Sabemos que la Ley de Infogobierno exige interoperabilidad obligatoria. En la práctica, ¿qué actores, normativas no escritas o lógicas de poder impiden que los datos fluyan como un bien común?"
            tooltipContent={<MarxistTooltip termKey="mediaciones">Ver categoría: Mediaciones y Poder</MarxistTooltip>}
            placeholder="Identifique las resistencias culturales, jerárquicas o tecnológicas que impiden la apertura de datos..."
          />

          {/* Pregunta 4: Alienación vs Soberanía */}
          <WordCountInput
            id="p4_alienacion"
            name="p4_alienacion"
            value={formData.p4_alienacion}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="4. Cosificación de las Familias vs Soberanía Tecnológica"
            helperText="¿Considera que las actuales plataformas tecnológicas (muchas cerradas o privativas) cosifican a los ciudadanos en simples estadísticas? ¿Cómo avanzar hacia un modelo que garantice soberanía tecnológica?"
            tooltipContent={<MarxistTooltip termKey="cosificacion">Ver concepto: Cosificación</MarxistTooltip>}
            placeholder="Analice la pérdida del rostro humano del ciudadano frente al número burocrático y el rol del Software Libre..."
          />

          {/* Pregunta 5: Praxis / Síntesis */}
          <WordCountInput
            id="p5_praxis"
            name="p5_praxis"
            value={formData.p5_praxis}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="5. Acción Transformadora Inmediata (Praxis de Integración)"
            helperText="Si tuviese el poder político y técnico inmediato, ¿cuál sería su primera acción concreta para unificar la gestión social en el Municipio Iribarren?"
            tooltipContent={<MarxistTooltip termKey="utopia concreta">Ver: Utopía Concreta / Praxis</MarxistTooltip>}
            placeholder="Proponga medidas concretas: decretos de interoperabilidad, mesas de diálogo de saberes, plataformas libres..."
          />
        </div>

        {/* Validación y Consentimiento Informado */}
        <div className="bg-red-50/70 border border-red-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentimiento"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consentimiento" className="text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer">
              <strong>Consentimiento Informado y Validación Metodológica:</strong> Certifico que los testimonios y reflexiones aquí expresados corresponden a la praxis institucional analizada críticamente. Autorizo su tratamiento con fines estrictamente académicos, político-emancipadores y de formulación de políticas públicas para el Municipio Iribarren, bajo estricto resguardo ético y anonimato institucional.
            </label>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            * Todos los campos de reflexión crítica son obligatorios (mínimo 10 palabras por respuesta).
          </p>

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
              isFormValid() && !loading
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 hover:shadow-lg transform active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Procesando Diagnóstico...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Guardar Entrevista en Memoria Soberana</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
