import React from 'react';
import RedStar from '../common/RedStar';
import MarxistTooltip from '../common/MarxistTooltip';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Scale, 
  Sparkles,
  GitBranch,
  Layers,
  Award
} from 'lucide-react';

export default function HomeView({ onNavigate, recordsCount }) {
  const instruments = [
    {
      num: '1',
      title: 'Entrevista en Profundidad',
      target: 'Tomadores de Decisiones',
      desc: 'Explora contradicciones entre mandato constitucional y estructura técnica aislada.',
      emoji: '💬'
    },
    {
      num: '2',
      title: 'Grupo Focal',
      target: 'Ecología de Saberes',
      desc: 'Diálogo horizontal entre técnicos, trabajadoras sociales y vocerías comunales.',
      emoji: '👥'
    },
    {
      num: '3',
      title: 'Matriz Etnográfica',
      target: 'Observación Participante',
      desc: 'Registro de rituales burocráticos y la propiedad del dato como mecanismo de poder.',
      emoji: '📝'
    },
    {
      num: '4',
      title: 'Auditoría de Sistemas',
      target: 'Ley de Infogobierno',
      desc: 'Evaluación de arquitecturas de software libre vs privativo e interoperabilidad.',
      emoji: '⚙️'
    },
    {
      num: '5',
      title: 'Mapeo de Actores PES',
      target: 'Carlos Matus',
      desc: 'Correlación de fuerzas, recursos de poder y construcción del Bloque Histórico.',
      emoji: '🗺️'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Banner Principal Académico e Institucional */}
      <div className="relative bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden border border-red-900/60">
        
        {/* Adorno Estrella de fondo */}
        <div className="absolute -right-10 -bottom-16 opacity-10 text-[240px] pointer-events-none select-none font-bold">
          ⭐
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Insignias institucionales */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/50 text-white border border-red-400/40">
              <RedStar className="w-3.5 h-3.5" />
              Universidad Bolivariana de Venezuela (UBV)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
              Eje Precursor José Leonardo Chirinos • Sede Estado Lara
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
              Maestría en Ciencias para el Desarrollo Estratégico (Cohorte VI)
            </span>
          </div>

          {/* Título de la Investigación */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Estrategia de Integración Tecnológica para la Transformación de la Gestión Social y la Emancipación de Familias Vulnerables en el Municipio Iribarren
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-3xl">
              Plataforma digital para la recolección estandarizada, sistematización empírica y procesamiento dialéctico de 5 instrumentos de investigación orientados a erradicar la fragmentación burocrática y refundar la soberanía del dato social.
            </p>
          </div>

          {/* Ficha Académica del Maestrante y Tutor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-red-900/40 text-xs text-slate-300">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Investigador / Maestrante:</span>
              <strong className="text-white text-sm">Ing. Edery Javier Rodríguez Alvarado</strong>
              <span className="block text-[11px] text-red-300">C.I. V-17859495</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Tutor Académico:</span>
              <strong className="text-white text-sm">Dr. Abel José Pérez Wilke</strong>
              <span className="block text-[11px] text-slate-400">C.I. V-10844246</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 sm:col-span-2 lg:col-span-1">
              <span className="text-slate-400 block text-[11px]">Línea y Enfoque:</span>
              <span className="text-white font-medium">Dominio Tecnológico para el Desarrollo Endógeno</span>
              <span className="block text-[11px] text-amber-300">Paradigma Marxista Heterodoxo</span>
            </div>
          </div>

          {/* Botones de Acción Rápida */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('instruments')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all transform active:scale-95"
            >
              <span>Aplicar Instrumentos de Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
            >
              <span>Ver Analítica Práxica</span>
            </button>

            <button
              onClick={() => onNavigate('interpreter')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-sm border border-red-800 transition"
            >
              <span>🧠 Intérprete Dialéctico</span>
            </button>
          </div>

        </div>
      </div>

      {/* Resumen del Problema y Contradicción Fundamental */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
            <span>Delimitación de la Situación Problema</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            La Fragmentación de la Información y el Desgaste de la Gestión Social
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            En el Municipio Iribarren del estado Lara, las familias en condición de vulnerabilidad enfrentan una realidad donde la protección social integral plasmada en el <strong>Artículo 75 de la Constitución</strong> choca frontalmente con una estructura institucional fragmentada. Cada organismo (salud, misiones, alcaldía, gobernación) gestiona soluciones informáticas aisladas, forzando a los ciudadanos a contar su historia múltiples veces y someterse a una tramitología repetitiva.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Esta duplicidad crítica genera ineficiencia en la asignación de recursos escasos, sobrecarga laboral en los trabajadores sociales y debilita la soberanía tecnológica al sostener una dependencia de facto respecto a plataformas privativas y manuales desconectados de la <strong>Ley de Infogobierno</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div className="bg-red-50/70 p-4 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-950 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                <span>⚡ Contradicción Fundamental</span>
              </h4>
              <p className="text-xs text-red-900 leading-relaxed">
                Mandato constitucional de atención holística y digna vs. Estructura tecnológica parcelada en cotos de información.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                <span>⭐ Horizonte Ideal (Utopía Concreta)</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Ecosistema de interoperabilidad soberana bajo software libre donde el dato social fluya como un bien común y estratégico.
              </p>
            </div>
          </div>
        </div>

        {/* Pilares Teóricos y Epistemológicos */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>Sustento Teórico Crítico</span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              Epistemología de la Praxis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              El conocimiento surge del ciclo permanente de <MarxistTooltip termKey="totalidad concreta">acción-reflexión-acción</MarxistTooltip> junto a las comunidades. Rechazamos la neutralidad técnica: todo software refleja y consolida relaciones de poder.
            </p>

            <ul className="space-y-2.5 pt-4 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">•</span>
                <span><strong>Karl Marx:</strong> Materialismo histórico, contradicción y <MarxistTooltip termKey="alienacion">alienación burocrática</MarxistTooltip>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">•</span>
                <span><strong>Oscar Varsavsky:</strong> Estilo tecnológico soberano pueblo-céntrico.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">•</span>
                <span><strong>Boaventura de Sousa Santos:</strong> <MarxistTooltip termKey="ecologia de saberes">Ecología de saberes</MarxistTooltip> y freno al epistemicidio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">•</span>
                <span><strong>Carlos Matus:</strong> Planificación Estratégica Situacional (PES) y fuerzas vivas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">•</span>
                <span><strong>Hugo Chávez:</strong> Golpe de Timón, democratización del Estado y nueva geometría del poder.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('legal')}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>Consultar bases legales completas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Los 5 Instrumentos Metodológicos */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              📝 Los 5 Instrumentos Metodológicos de Recolección
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Diseñados en el Momento III para articular la evidencia empírica con la crítica dialéctica.
            </p>
          </div>
          <button
            onClick={() => onNavigate('instruments')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ir al formulario de instrumentos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {instruments.map((inst) => (
            <div
              key={inst.num}
              onClick={() => onNavigate('instruments')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{inst.emoji}</span>
                  <span className="text-[10px] font-extrabold bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    Instrumento {inst.num}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-red-700 transition-colors">
                  {inst.title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  {inst.target}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {inst.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-red-600">
                <span>Llenar instrumento</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

          {/* Tarjeta Extra: Guía del Usuario */}
          <div
            onClick={() => onNavigate('guide')}
            className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">📘</span>
                <span className="text-[10px] font-extrabold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                  Manual
                </span>
              </div>
              <h4 className="font-extrabold text-white text-sm">
                Guía Operativa del Usuario
              </h4>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                Orientaciones Metodológicas
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Instrucciones detalladas sobre cómo llenar los formularios, interpretar el conteo reflexivo y desplegar en Vercel y Google Sheets.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-red-400">
              <span>Leer manual completo</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
