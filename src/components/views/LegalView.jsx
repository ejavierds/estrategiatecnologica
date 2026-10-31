import React from 'react';
import MarxistTooltip from '../common/MarxistTooltip';
import { Scale, ShieldCheck, Scroll, BookMarked, Landmark, CheckCircle2 } from 'lucide-react';

export default function LegalView() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Banner del Marco Legal */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-red-900/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/40 text-red-200 border border-red-500/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Marco Jurídico de la República Bolivariana de Venezuela</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ⚖️ Términos de Uso, Bases Legales y Políticas de Privacidad Soberana
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Fundamentación constitucional y normativa que legitima la recolección, resguardo ético y democratización del flujo de datos en el Municipio Iribarren, Estado Lara.
          </p>
        </div>
      </div>

      {/* Términos de Uso */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <Scroll className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Términos de Uso de la Plataforma
            </h3>
            <p className="text-xs text-slate-500">
              Directrices de acceso, corresponsabilidad y enfoque emancipador.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider block">
              1. Naturaleza y Propósito
            </span>
            <p className="leading-relaxed text-slate-600">
              La presente aplicación web es una herramienta metodológica de recolección, procesamiento e interpretación de datos, enmarcada en el Trabajo de Grado <em>"Estrategia de Integración Tecnológica para la Transformación de la Gestión Social"</em>. Su uso es estrictamente académico, político-emancipador y orientado al diseño de políticas públicas en el Municipio Iribarren, Estado Lara.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider block">
              2. Acceso y Responsabilidad
            </span>
            <p className="leading-relaxed text-slate-600">
              El acceso a la carga de datos está orientado a los actores participantes de la investigación (servidores públicos, voceros comunales y el investigador). El usuario se compromete a ingresar información veraz producto de su praxis social y reflexión crítica, evitando respuestas mecánicas.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider block">
              3. Enfoque de Código y Soberanía
            </span>
            <p className="leading-relaxed text-slate-600">
              En alineación con la propuesta de investigación, esta plataforma promueve los principios del Software Libre. Los algoritmos de interpretación y el diseño de la interfaz están concebidos para evitar la alienación del usuario, promoviendo la transparencia de los procesos (<MarxistTooltip termKey="caja de cristal">Caja de Cristal</MarxistTooltip>).
            </p>
          </div>

        </div>
      </div>

      {/* Bases Legales */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <Landmark className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Bases Legales de la República Bolivariana de Venezuela
            </h3>
            <p className="text-xs text-slate-500">
              Sustento jurídico nacional y municipal que respalda la obligatoriedad de la interoperabilidad.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
              CRBV
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Constitución de la República Bolivariana de Venezuela (CRBV)
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                <strong>Art. 75:</strong> Establece el deber del Estado de garantizar la protección integral a la familia, mandato que exige una acción unificada y no la atomización burocrática.<br/>
                <strong>Art. 110:</strong> Reconoce el interés público de la ciencia, la tecnología y los servicios de información como instrumentos fundamentales para el desarrollo económico, social y político del país.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
              LEY
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Ley de Infogobierno (Decreto N° 8.950)
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Establece la <strong>interoperabilidad obligatoria</strong> entre los órganos y entes del Poder Público, así como el uso prioritario de <strong>software libre</strong> y estándares abiertos para garantizar la soberanía nacional sobre los datos públicos (Artículos 4, 5, 23 y 34).
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
              7T
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Ley Orgánica del Plan de la Patria 2025-2031 (7 Grandes Transformaciones)
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Alineación directa con la <strong>Gran Transformación Social</strong> (garantizar la máxima felicidad social y perfeccionar el Sistema de Misiones y Grandes Misiones) y con la <strong>Gran Transformación Científico-Tecnológica</strong> para la independencia de soluciones técnicas.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
              POP
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Ley Orgánica del Poder Popular (2010) y Ley de Administración Pública (2014)
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Garantiza el ejercicio de la contraloría social, la democratización del acceso a la información y el principio de eficacia y eficiencia del Estado al servicio del pueblo soberano.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Políticas de Privacidad y Resguardo Soberano */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <ShieldCheck className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Políticas de Privacidad y Soberanía de los Datos
            </h3>
            <p className="text-xs text-slate-500">
              Protocolos de seguridad ética y no captura de datos sensibles de familias vulnerables.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-emerald-950">
            <h4 className="font-bold mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Soberanía y Resguardo Ético de los Datos</span>
            </h4>
            <p className="leading-relaxed">
              Todos los datos recolectados se almacenan de manera soberana. <strong>No se capturarán ni almacenarán datos personales sensibles o de identificación directa de las «familias vulnerables» (nombres personales, cédulas de identidad particulares ni domicilios exactos)</strong>. El sistema mide comportamientos institucionales, arquitecturas de software, tiempos de respuesta y percepciones sociopolíticas de los operadores.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800">
            <h4 className="font-bold mb-1">
              2. Uso Exclusivamente Metodológico e Investigativo
            </h4>
            <p className="leading-relaxed text-slate-600">
              Los datos cualitativos y cuantitativos serán utilizados exclusivamente para generar el diagnóstico crítico y modelar la estrategia de integración tecnológica en el municipio Iribarren. No existe ningún fin comercial ni lucrativo.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800">
            <h4 className="font-bold mb-1">
              3. Consentimiento Informado Vinculante
            </h4>
            <p className="leading-relaxed text-slate-600">
              Al ingresar información en los módulos (Entrevistas, Grupos Focales, Etnografía), el usuario participante acepta que sus reflexiones sean procesadas metodológicamente, manteniendo el estricto anonimato de la fuente directa si así lo exige la ética de la investigación transformadora.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
