import React from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import { 
  BookOpen, 
  Compass, 
  FileEdit, 
  BarChart3, 
  BrainCircuit, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Layers,
  ArrowRight,
  MessageCircle, 
  Send, 
  Phone,
  Lock
} from 'lucide-react';
import RedStar from '../common/RedStar';

export default function UserGuideView({ onNavigate }) {
  const whatsappUrl = "https://wa.me/584267355056?text=Hola%20Ing.%20Edery%20Rodr%C3%ADguez,%20me%20comunico%20desde%20la%20Plataforma%20de%20Praxis%20Social%20Iribarren";
  const telegramUrl = "https://t.me/+584267355056";
  const orcidUrl = "https://orcid.org/0000-0003-1369-9036";
  const devUrl = "https://ejavierds.vercel.app";

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Banner de la Guía */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-red-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/40 text-red-200 border border-red-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manual de Inducción Metodológica y Operativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <span>¡Bienvenido(a) a la Plataforma Praxis Social Iribarren!</span>
            <RedStar className="w-6 h-6 inline" />
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Esta guía te orientará en el uso del sistema para el levantamiento de los 5 instrumentos diagnósticos, la interpretación de gráficos de contradicción y el uso del intérprete dialéctico.
          </p>
        </div>
      </div>

      {/* Pasos de la Guía */}
      <div className="space-y-6">
        
        {/* Paso 1: Navegación */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                1. Navegación Principal 🧭
              </h3>
              <p className="text-xs text-slate-500">
                Estructura de pestañas y accesos directos de la aplicación.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>
              En la barra superior (o menú desplegable en dispositivos móviles), encontrarás los siguientes accesos:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>🏠 Inicio:</strong> Contexto histórico-social de Iribarren, delimitación del problema y ficha académica del Trabajo de Grado UBV.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>📝 Instrumentos:</strong> Acceso a los 5 formularios dinámicos de recolección de datos estandarizados.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>📊 Analítica Práxica:</strong> Dashboard estadístico con gráficos en tiempo real (Software Libre vs Privativo, Mapeo PES). <span className="text-red-700 font-semibold">(Acceso protegido)</span>.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>🧠 Intérprete Dialéctico:</strong> Motor cualitativo que sintetiza contradicciones y genera el análisis para el Momento III.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>⚖️ Bases Legales:</strong> Términos de uso, marco constitucional venezolano y políticas de privacidad y soberanía de datos.
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong>⚙️ Sincronización Soberana:</strong> Verificación de conexión con la base de datos soberana. <span className="text-red-700 font-semibold">(Acceso protegido)</span>.
              </li>
            </ul>
          </div>
        </div>

        {/* Paso 2: Uso de Formularios e Instrumentos */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                2. Cómo usar los Formularios (Instrumentos) 📝
              </h3>
              <p className="text-xs text-slate-500">
                Directrices para garantizar calidad epistemológica en las respuestas.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <ol className="space-y-2.5 list-decimal list-inside">
              <li>
                Ve a la pestaña <strong>📝 Instrumentos</strong> y selecciona la herramienta que deseas aplicar (ej. <em>Auditoría de Sistemas</em> o <em>Entrevista en Profundidad</em>).
              </li>
              <li>
                Usa los <strong>Menús Desplegables (▼)</strong> obligatorios para estandarizar las instituciones, arquitecturas de software y posiciones políticas de los actores.
              </li>
              <li>
                <strong>Tooltips Dialécticos (💬):</strong> Si no comprendes un término conceptual (ej. <em>Totalidad Concreta, Alienación, Ecología de Saberes, Mediaciones</em>), pasa el ratón o toca sobre la palabra subrayada y aparecerá una ventana con la definición del autor y su aplicación en Iribarren.
              </li>
              <li>
                <strong>Validación de Palabras Mínimas:</strong> Para evitar respuestas vacías o monosilábicas como «Sí» o «No», cada campo cualitativo exige un mínimo de 10 palabras reflexivas. El indicador cambiará a color verde cuando alcances la densidad analítica requerida.
              </li>
              <li>
                Marca la casilla de <strong>«Consentimiento Informado y Validación Metodológica»</strong> y haz clic en <strong>Guardar</strong>. Los datos se almacenarán en la memoria soberana y en la base de datos central.
              </li>
            </ol>
          </div>
        </div>

        {/* Paso 3: Dashboard de Estadísticas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                3. Explorar el Dashboard de Estadísticas 📊
              </h3>
              <p className="text-xs text-slate-500">
                Visualización de contradicciones materiales y métricas consolidadas.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>
              El módulo <strong>Analítica Práxica</strong> procesa automáticamente los registros:
            </p>
            <ul className="space-y-2 pt-1 list-disc list-inside">
              <li>
                <strong>Gráfico Circular:</strong> Ilustra el porcentaje de sistemas con arquitectura Libre vs. Privativa vs. Híbrida en las instituciones de Iribarren.
              </li>
              <li>
                <strong>Gráfico de Barras PES:</strong> Muestra la correlación de fuerzas de los actores mapeados (A favor, Neutro o En contra de la integración).
              </li>
              <li>
                <strong>Tarjetas de KPIs:</strong> Informan de forma sintética sobre el total de instituciones auditadas, el porcentaje crítico de duplicidad de datos y el volumen global de registros.
              </li>
              <li>
                <strong>Explorador de Tablas y Exportación:</strong> Permite filtrar cualquier campo por palabra clave y exportar toda la base en formato JSON estructurado.
              </li>
              <li>
                <strong>Acceso Blindado:</strong> Módulo con acceso protegido para el investigador y personal autorizado.
              </li>
            </ul>
          </div>
        </div>

        {/* Paso 4: Intérprete Dialéctico */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center border border-red-100">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                4. Uso del Intérprete Dialéctico 🧠
              </h3>
              <p className="text-xs text-slate-500">
                Develamiento de contradicciones y redacción del Momento III de la tesis.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>
              El Intérprete evalúa los discursos y notas cualitativas recolectadas en el terreno:
            </p>
            <ol className="space-y-2 pt-1 list-decimal list-inside">
              <li>Ingresa a la sección <strong>Intérprete</strong>.</li>
              <li>Presiona el botón <strong>«Generar Síntesis Crítica Dialéctica»</strong>.</li>
              <li>El motor examinará los patrones de <em>celo burocrático, sobrecarga laboral de servidores y resistencia técnica</em>, estructurando el análisis en tres momentos: <strong>Tesis</strong> (el orden burocrático fragmentado), <strong>Antítesis</strong> (las contradicciones de facto) y <strong>Síntesis</strong> (la Negación de la Negación mediante software libre).</li>
              <li>Puedes copiar el reporte en formato Markdown listo para incorporarlo en los capítulos de resultados de tu tesis de maestría o en propuestas de ordenanza municipal.</li>
            </ol>
          </div>
        </div>

      </div>

      {/* Soporte y Contacto Directo con el Investigador */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Atención Metodológica y Operativa
          </span>
          <h4 className="font-extrabold text-lg text-white">
            ¿Requieres orientación para aplicar un instrumento en tu institución?
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Comunícate directamente con el maestrante e investigador responsable <strong>Ing. Edery Javier Rodríguez Alvarado</strong> al número institucional o consulta su perfil científico:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md hover:shadow-lg active:scale-95"
            title="WhatsApp directo con el investigador"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp (+58 426 735 5056)</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition shadow-md hover:shadow-lg active:scale-95"
            title="Telegram directo con el investigador"
          >
            <Send className="w-4 h-4" />
            <span>Telegram (+58 426 735 5056)</span>
          </a>

          <a
            href={orcidUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700 shadow-md active:scale-95"
            title="Perfil Académico Oficial ORCID"
          >
            <svg className="w-4 h-4 fill-[#A6CE39]" viewBox="0 0 256 256">
              <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zM86.35 186.29H63.68V85.74h22.67v100.55zm-11.34-114.3a13.16 13.16 0 1 1 13.15-13.16 13.17 13.17 0 0 1-13.15 13.16zm117.38 67.89c0 30.08-20.16 46.41-49.09 46.41h-34.9V85.74h36.19c27.87 0 47.8 17.5 47.8 44.1zm-22.95.12c0-17.78-11.45-27.17-27.34-27.17h-11.83v54.22h11.83c16.01 0 27.34-9.52 27.34-27.05z"/>
            </svg>
            <span>ORCID: 0000-0003-1369-9036</span>
          </a>
        </div>
      </div>

      {/* Botón de Iniciar */}
      <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-center space-y-3">
        <h4 className="font-bold text-slate-900 text-base">
          ¿Listo para iniciar el levantamiento de instrumentos?
        </h4>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Comienza aplicando la Entrevista en Profundidad o la Auditoría de Sistemas para nutrir la memoria diagnóstica.
        </p>
        <button
          onClick={() => onNavigate('instruments')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-200 transition"
        >
          <span>Ir a los Formularios de Instrumentos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
