import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import WordCountInput from '../common/WordCountInput';
import { submitInstrumentRecord } from '../../services/api';
import { Users, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function FocusGroupForm({ onRecordSubmitted }) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    lugar: '',
    actores: 'Trabajadores Sociales, Técnicos Informáticos y Voceros Comunales',
    fase1_problematizacion: '',
    fase2_nudos_criticos: '',
    fase3_utopia_concreta: '',
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
      formData.actores.trim().length > 3 &&
      checkWords(formData.fase1_problematizacion, 10) &&
      checkWords(formData.fase2_nudos_criticos, 10) &&
      checkWords(formData.fase3_utopia_concreta, 10) &&
      formData.consentimiento
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatusMessage({
        type: 'error',
        text: 'Completa todos los campos con la argumentación mínima requerida y valida el consentimiento metodológico.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInstrumentRecord('grupo_focal', formData);
      setStatusMessage({
        type: 'success',
        text: `¡Sesión de Grupo Focal registrada! Código: ${res.recordId}. Almacenada en la memoria soberana${res.gasSynced ? ' y sincronizada con Google Spreadsheets' : ''}.`
      });

      setFormData(prev => ({
        ...prev,
        lugar: '',
        fase1_problematizacion: '',
        fase2_nudos_criticos: '',
        fase3_utopia_concreta: '',
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
          <span>👥 Instrumento 2</span>
          <span>•</span>
          <span>Diálogo de Saberes Intersectorial</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Guía de Moderación para Grupo Focal
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Objetivo metodológico: Generar un proceso de concienciación y diálogo de saberes entre trabajadores sociales, técnicos informáticos y voceros comunales del Poder Popular.
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
        
        {/* Datos de la Sesión */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            I. Datos de la Sesión y Actores
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="gf_fecha" className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de la Sesión *
              </label>
              <input
                type="date"
                id="gf_fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="lugar" className="block text-xs font-semibold text-slate-700 mb-1">
                Lugar / Espacio de Encuentro *
              </label>
              <input
                type="text"
                id="lugar"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                placeholder="Ej. Casa Comunal Parroquia Unión, Salón de Usos Múltiples Alcaldía de Iribarren..."
                required
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="actores" className="block text-xs font-semibold text-slate-700 mb-1">
              Actores Colectivos Participantes (Ecología de Saberes) *
            </label>
            <input
              type="text"
              id="actores"
              name="actores"
              value={formData.actores}
              onChange={handleChange}
              placeholder="Indica los sectores presentes (Trabajadores sociales, Informáticos, Voceros comunales...)"
              required
              className="w-full p-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </div>

        {/* Fases de la Sesión */}
        <div className="space-y-6 pt-2">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              II. Estructura de la Sesión (<MarxistTooltip termKey="ecologia de saberes">Ecología de Saberes</MarxistTooltip>)
            </h4>
          </div>

          {/* Fase 1: Problematización Inicial */}
          <WordCountInput
            id="fase1_problematizacion"
            name="fase1_problematizacion"
            value={formData.fase1_problematizacion}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Fase 1: Problematización Inicial (20 min)"
            helperText="Planteamiento generador: 'Las familias vulnerables deben contar su historia 5 veces a 5 instituciones distintas'. ¿Qué consensos surgieron sobre cómo afecta esto a la dignidad del pueblo y a la carga diaria?"
            tooltipContent={<MarxistTooltip termKey="fetichismo burocratico">Ver: Fetichismo Burocrático</MarxistTooltip>}
            placeholder="Sintetice el sentir del grupo frente al maltrato de la tramitología y la fragmentación..."
          />

          {/* Fase 2: Identificación de Nudos Críticos */}
          <WordCountInput
            id="fase2_nudos_criticos"
            name="fase2_nudos_criticos"
            value={formData.fase2_nudos_criticos}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Fase 2: Identificación de Nudos Críticos (30 min)"
            helperText="Pizarra dialéctica: ¿Por qué los sistemas informáticos 'no se hablan' entre sí? Confrontación entre el 'saber técnico' (redes, software) vs 'saber social' (burocratismo, celo institucional)."
            tooltipContent={<MarxistTooltip termKey="mediaciones">Ver: Mediaciones y Celos</MarxistTooltip>}
            placeholder="Registre las contradicciones entre la justificación técnica de los informáticos y las quejas de los promotores sociales..."
          />

          {/* Fase 3: Construcción de la Utopía Concreta */}
          <WordCountInput
            id="fase3_utopia_concreta"
            name="fase3_utopia_concreta"
            value={formData.fase3_utopia_concreta}
            onChange={handleChange}
            minWords={10}
            rows={4}
            label="Fase 3: Construcción de la Utopía Concreta (40 min)"
            helperText="¿Cómo imaginamos un Ecosistema Tecnológico Integrado, libre y soberano (Infogobierno)? Definición colectiva de los primeros pasos (Acuerdos interinstitucionales, Software Libre)."
            tooltipContent={<MarxistTooltip termKey="utopia concreta">Ver concepto: Utopía Concreta</MarxistTooltip>}
            placeholder="Escriba las propuestas concretas acordadas por la mesa para avanzar en la integración..."
          />
        </div>

        {/* Consentimiento */}
        <div className="bg-red-50/70 border border-red-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentimiento_gf"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consentimiento_gf" className="text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer">
              <strong>Validación Metodológica y Ética del Diálogo:</strong> Certifico que los consensos y contradicciones aquí recogidos reflejan fielmente las deliberaciones colectivas de la sesión de Grupo Focal, preservando el respeto entre saberes y la confidencialidad de los participantes.
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
                <span>Guardando Sistematización...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Registrar Grupo Focal</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
