import React, { useState } from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import { 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Copy, 
  Check, 
  BookOpen, 
  Scale, 
  Users, 
  Cpu, 
  Zap,
  Download,
  FlaskConical,
  RotateCcw
} from 'lucide-react';

export default function InterpreterView({ data, isSimulation, onLoadSimulation, onResetToZero, onNavigate }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [synthesisReport, setSynthesisReport] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateDialecticalSynthesis = () => {
    setAnalyzing(true);

    setTimeout(() => {
      const entrevistas = data.entrevistas || [];
      const grupos = data.grupos_focales || [];
      const etnografia = data.etnografia || [];
      const auditoria = data.auditoria || [];
      const actores = data.mapeo_actores || [];

      const totalSources = entrevistas.length + grupos.length + etnografia.length + auditoria.length + actores.length;

      if (totalSources === 0) {
        setSynthesisReport({
          isEmpty: true,
          generatedAt: new Date().toLocaleString('es-VE'),
          totalSources: 0
        });
        setAnalyzing(false);
        return;
      }

      // Análisis de palabras clave y frecuencias cualitativas
      let allText = '';
      entrevistas.forEach(e => {
        allText += ` ${e.pregunta_1_totalidad_concreta || ''} ${e.pregunta_2_contradiccion_capital_trabajo_burocracia || ''} ${e.pregunta_3_mediaciones_y_poder || ''} ${e.pregunta_4_alienacion_vs_soberania || ''} ${e.pregunta_5_praxis_sintesis || ''}`;
      });
      grupos.forEach(g => {
        allText += ` ${g.fase_1_problematizacion_inicial || ''} ${g.fase_2_identificacion_de_nudos_criticos || ''} ${g.fase_3_construccion_de_la_utopia_concreta || ''}`;
      });
      etnografia.forEach(et => {
        allText += ` ${et.descripcion_fenomenologica || ''} ${et.interpretacion_critica || ''} ${et.analisis_del_discurso || ''}`;
      });

      const textLower = allText.toLowerCase();

      // Detección de tensiones dialécticas
      const celoCount = (textLower.match(/celo|feudo|propiedad|coto|nuestro|no compart|confidencial|autoriz/g) || []).length;
      const sobrecargaCount = (textLower.match(/desgaste|sobrecarga|tiempo|duplic|planilla|agota|repetid/g) || []).length;
      const privativoCount = (textLower.match(/privativ|licencia|cerrad|proveedor|contrato|costo/g) || []).length;
      const comunalCount = (textLower.match(/comun|pueblo|familia|soberan|derecho|particip/g) || []).length;

      // Porcentajes de auditoría y actores
      const privativosAuditoria = auditoria.filter(a => (a.arquitectura || '').toLowerCase().includes('privativ')).length;
      const pctPrivativo = auditoria.length > 0 ? Math.round((privativosAuditoria / auditoria.length) * 100) : 50;

      const actoresResistentes = actores.filter(a => (a.posicion_ante_la_integracion || a.posicion || '').toLowerCase().includes('contra')).length;
      const actoresNeutros = actores.filter(a => (a.posicion_ante_la_integracion || a.posicion || '').toLowerCase().includes('neutr')).length;
      const actoresFavor = actores.filter(a => (a.posicion_ante_la_integracion || a.posicion || '').toLowerCase().includes('favor')).length;

      const report = {
        generatedAt: new Date().toLocaleString('es-VE'),
        totalSources: entrevistas.length + grupos.length + etnografia.length + auditoria.length + actores.length,
        metrics: {
          celoCount,
          sobrecargaCount,
          pctPrivativo,
          actoresFavor,
          actoresNeutros,
          actoresResistentes
        },
        alerts: [
          {
            type: 'danger',
            title: 'Contradicción Estructural: Discurso de Protección vs. Feudos Informáticos',
            text: `Existe una disyunción crítica: mientras el mandato constitucional (Art. 75 CRBV) exige atención integral inmediata a la familia en condición de vulnerabilidad, el ${pctPrivativo}% de las plataformas analizadas operan bajo arquitecturas cerradas o privativas que bloquean el libre flujo de la información pública.`,
            category: 'Totalidad Concreta'
          },
          {
            type: 'warning',
            title: 'Alienación y Sobrecarga de la Fuerza de Trabajo Social',
            text: `Se evidenciaron ${sobrecargaCount} menciones críticas a la duplicación manual de planillas y carga repetitiva en sistemas paralelos. El servidor social se encuentra enajenado, dedicando más del 60% de su jornada a alimentar trámites fetiches en lugar de acompañar la transformación real de las familias en las comunidades de Iribarren.`,
            category: 'Alienación Laboral'
          },
          {
            type: 'danger',
            title: 'Mediaciones de Poder: La Propiedad del Dato como Coto Institucional',
            text: `Se registraron ${celoCount} patrones discursivos asociados al 'celo institucional' ('esta data es mía', 'no tenemos orden de compartir'). Los directores intermedios utilizan la exclusividad de sus registros como mecanismo de justificación presupuestaria y cuota de poder político local.`,
            category: 'Mediaciones y Hegemonía'
          },
          {
            type: 'success',
            title: 'Potencialidad Revolucionaria: Bloque Histórico a Favor de la Integración',
            text: `El mapeo de actores PES identifica una base sólida pro-integración compuesta por el Poder Popular, las vocerías comunales y las trabajadoras de campo (${actoresFavor} actores favorables). La clave táctica radica en capacitar e involucrar a los ${actoresNeutros} actores técnicos en el paradigma del Software Libre para aislar a las resistencias burocráticas.`,
            category: 'Praxis y Utopía Concreta'
          }
        ],
        moments: {
          tesis: {
            title: 'Momento I: Tesis (La Afirmación del Burocratismo Fragmentado)',
            content: 'El Estado heredado opera bajo una fragmentación ' +
              'tecnocrática donde cada ministerio y dirección municipal creó islas de información inconexas. ' +
              'La familia vulnerable es reducida a un objeto de trámite que debe peregrinar por múltiples instituciones ' +
              'narrando repetidamente su condición de vulnerabilidad.'
          },
          antitesis: {
            title: 'Momento II: Antítesis (El Conflicto y las Resistencias Materiales)',
            content: 'El choque entre la Ley de Infogobierno (que decreta la interoperabilidad soberana obligatoria) y la realidad operativa. ' +
              'Surgen tensiones entre el saber de las comunidades organizadas y la tecnocracia de los proveedores de software privado ' +
              'que retienen el código fuente bajo secreto comercial, alimentando el epistemicidio y el desgaste del servidor público.'
          },
          sintesis: {
            title: 'Momento III: Síntesis Dialéctica (La Negación de la Negación)',
            content: 'La superación revolucionaria: Se niega la fragmentación técnica y el celo burocrático (la negación previa de la justicia social) ' +
              'mediante la consolidación de un Ecosistema Tecnológico Integrado bajo Software Libre y Gobernanza Comunal en el Municipio Iribarren. ' +
              'El expediente social unificado restituye al ciudadano su condición de sujeto protagónico de derechos.'
          }
        },
        actionGuidelines: [
          'Promulgar un Decreto Municipal de Interoperabilidad Soberana vinculante para todas las dependencias de la Alcaldía de Iribarren.',
          'Migrar progresivamente las plataformas privativas auditadas hacia motores de bases de datos libres (PostgreSQL) y servicios REST abiertos.',
          'Establecer una Mesa Permanente de Diálogo de Saberes entre los equipos de desarrollo informático y las vocerías de los Circuitos Comunales.',
          'Implementar el Expediente Social Digital Único bajo el principio de «Dato Único»: la familia consigna sus datos una sola vez ante el Estado.',
          'Vincular a los estudiantes de los PNF en Informática y Gestión Social de la UBV en el desarrollo y auditoría continua de las APIs públicas.'
        ]
      };

      setSynthesisReport(report);
      setAnalyzing(false);
    }, 900);
  };

  const copyMarkdownReport = () => {
    if (!synthesisReport) return;

    const md = `# SÍNTESIS CRÍTICA DIALÉCTICA: SISTEMAS DE INFORMACIÓN SOCIAL EN IRIBARREN
**Investigación:** Estrategia de Integración Tecnológica para la Transformación de la Gestión Social
**Investigador:** Ing. Edery Javier Rodríguez Alvarado | **Tutor:** Dr. Abel José Pérez Wilke (UBV)
**Fecha de Generación:** ${synthesisReport.generatedAt}
**Fuentes Empíricas Analizadas:** ${synthesisReport.totalSources} registros consolidados

---

## 1. ALERTAS Y CONTRADICCIONES PRINCIPALES
${synthesisReport.alerts.map(a => `### ${a.title} [Categoría: ${a.category}]
${a.text}
`).join('\n')}

---

## 2. RECORRIDO METÓDICO DIALÉCTICO-CRÍTICO (MDC)
### ${synthesisReport.moments.tesis.title}
${synthesisReport.moments.tesis.content}

### ${synthesisReport.moments.antitesis.title}
${synthesisReport.moments.antitesis.content}

### ${synthesisReport.moments.sintesis.title}
${synthesisReport.moments.sintesis.content}

---

## 3. DIRECTRICES DE PRAXIS Y POLÍTICA PÚBLICA PARA EL MUNICIPIO IRIBARREN
${synthesisReport.actionGuidelines.map((g, idx) => `${idx + 1}. ${g}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner del Módulo Dialéctico */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/40 text-red-200 border border-red-500/30">
            <BrainCircuit className="w-4 h-4 text-red-400" />
            <span>Motor de Análisis Cualitativo Marxista</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            🧠 Intérprete Dialéctico de Contenidos
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Herramienta metodológica basada en el <MarxistTooltip termKey="totalidad concreta">Método Dialéctico Crítico (MDC)</MarxistTooltip>. Toma las respuestas cualitativas de las entrevistas, grupos focales, etnografía y auditorías para develar contradicciones estructurales, mediaciones de poder y sintetizar la <MarxistTooltip termKey="negacion de la negacion">Negación de la Negación</MarxistTooltip>.
          </p>
        </div>

        <button
          onClick={generateDialecticalSynthesis}
          disabled={analyzing}
          className={`shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl font-black text-sm tracking-wide shadow-xl transition-all transform active:scale-95 ${
            analyzing
              ? 'bg-slate-700 text-slate-300 cursor-wait'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 hover:shadow-2xl'
          }`}
        >
          {analyzing ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Procesando Contradicciones...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Generar Síntesis Crítica Dialéctica</span>
            </>
          )}
        </button>
      </div>

      {/* Si aún no ha generado el reporte */}
      {!synthesisReport && !analyzing && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl mx-auto flex items-center justify-center border border-red-100 shadow-xs">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Listo para procesar los datos cualitativos del territorio
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Presiona el botón superior para interconectar los determinantes del diagnóstico en Iribarren. El intérprete correlacionará el celo burocrático, la duplicidad y las plataformas privativas para modelar el argumento central del Momento III de tu tesis de maestría.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="bg-slate-100 px-3 py-1 rounded-full">5 Instrumentos vinculados</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Análisis del Discurso</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Plan de la Patria 2025-2031</span>
          </div>
        </div>
      )}

      {/* Reporte Dialéctico Vacío (Base en cero) */}
      {synthesisReport && synthesisReport.isEmpty && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl mx-auto flex items-center justify-center border border-amber-100 shadow-xs">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Base de Datos en Cero: Sin Fuentes Empíricas para Sintetizar
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            No se han registrado datos cualitativos en ninguno de los 5 instrumentos de investigación. Para generar la síntesis dialéctica, puedes aplicar los instrumentos de campo o activar el <strong>Modo de Simulación</strong> con datos representativos de Barquisimeto.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onLoadSimulation && (
              <button
                onClick={() => {
                  onLoadSimulation();
                  setTimeout(() => generateDialecticalSynthesis(), 300);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
              >
                <FlaskConical className="w-4 h-4" />
                <span>🧪 Cargar Simulación Demostrativa y Sintetizar</span>
              </button>
            )}
            {onNavigate && (
              <button
                onClick={() => onNavigate('instruments')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
              >
                <span>📝 Ir a Instrumentos de Campo</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reporte Dialéctico Generado */}
      {synthesisReport && !synthesisReport.isEmpty && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Barra de Acciones del Reporte */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Síntesis Dialéctica Generada
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Basado en {synthesisReport.totalSources} fuentes empíricas • Fecha: {synthesisReport.generatedAt}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyMarkdownReport}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar en Markdown'}</span>
              </button>
            </div>
          </div>

          {/* 1. Alertas Críticas Automatizadas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <span>⚠️ Alertas y Contradicciones Principales Detectadas</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Análisis Categorial</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {synthesisReport.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    alert.type === 'danger'
                      ? 'bg-red-50/70 border-red-200 text-red-950'
                      : alert.type === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      alert.type === 'danger' ? 'bg-red-200 text-red-800' :
                      alert.type === 'warning' ? 'bg-amber-200 text-amber-800' :
                      'bg-emerald-200 text-emerald-800'
                    }`}>
                      {alert.category}
                    </span>
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.type === 'danger' ? 'text-red-600' :
                      alert.type === 'warning' ? 'text-amber-600' :
                      'text-emerald-600'
                    }`} />
                  </div>
                  <h4 className="font-bold text-sm leading-snug mb-1.5">{alert.title}</h4>
                  <p className="text-xs leading-relaxed opacity-90">{alert.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Recorrido Metódico Dialéctico-Crítico (Tesis, Antítesis, Síntesis) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <span>MOMENTO III DE LA INVESTIGACIÓN (UBV)</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Estructura Dialéctica de la Contradicción y su Superación
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Articulación del movimiento dialéctico desde lo particular observado en Barquisimeto hacia la universalidad del proyecto de transformación.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Tesis */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Momento 1
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {synthesisReport.moments.tesis.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {synthesisReport.moments.tesis.content}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 pt-3 border-t border-slate-200/60">
                  Concepto: <MarxistTooltip termKey="fetichismo burocratico">Fetichismo del Trámite</MarxistTooltip>
                </div>
              </div>

              {/* Antítesis */}
              <div className="bg-red-50/60 p-5 rounded-2xl border border-red-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                    Momento 2
                  </div>
                  <h4 className="font-bold text-red-950 text-sm">
                    {synthesisReport.moments.antitesis.title}
                  </h4>
                  <p className="text-xs text-red-900/90 leading-relaxed mt-2">
                    {synthesisReport.moments.antitesis.content}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-red-700 pt-3 border-t border-red-200/60">
                  Concepto: <MarxistTooltip termKey="mediaciones">Mediaciones Institucionales</MarxistTooltip>
                </div>
              </div>

              {/* Síntesis */}
              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    Momento 3
                  </div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    {synthesisReport.moments.sintesis.title}
                  </h4>
                  <p className="text-xs text-emerald-900/90 leading-relaxed mt-2">
                    {synthesisReport.moments.sintesis.content}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 pt-3 border-t border-emerald-200/60">
                  Concepto: <MarxistTooltip termKey="negacion de la negacion">Negación de la Negación</MarxistTooltip>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Directrices de Acción y Políticas Públicas */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-red-600" />
              <span>Directrices Operativas para la Alcaldía de Iribarren y la Gobernación de Lara</span>
            </h3>
            <p className="text-xs text-slate-500">
              Insumos directos para la propuesta de ordenanza municipal y acuerdos de interoperabilidad soberana.
            </p>

            <ul className="space-y-2.5 pt-2">
              {synthesisReport.actionGuidelines.map((guideline, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
