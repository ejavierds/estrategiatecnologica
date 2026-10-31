import React from 'react';
import RedStar from './RedStar';
import { Scale, BookOpen, ShieldCheck, MessageCircle, Send, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const whatsappUrl = "https://wa.me/584267355056?text=Hola%20Ing.%20Edery%20Rodr%C3%ADguez,%20me%20comunico%20desde%20la%20Plataforma%20de%20Praxis%20Social%20Iribarren";
  const telegramUrl = "https://t.me/+584267355056";
  const orcidUrl = "https://orcid.org/0000-0003-1369-9036";
  const devUrl = "https://ejavierds.vercel.app";

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Identidad del Proyecto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-950/60 rounded-xl border border-red-700/50">
                <RedStar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base sm:text-lg tracking-tight">
                  Praxis Social Iribarren
                </h3>
                <p className="text-xs text-red-400 font-medium">
                  Soberanía Tecnológica y Transformación de la Gestión Social
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Plataforma metodológica y operativa para la recolección, interpretación y visualización dialéctica de datos institucionales y populares. Enmarcada en el Trabajo de Grado de la Universidad Bolivariana de Venezuela para superar la fragmentación de sistemas y garantizar la justicia social en el Municipio Iribarren, Estado Lara.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                ⭐ Paradigma Marxista Heterodoxo
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                📜 Ley de Infogobierno (Dec. 8.950)
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                🇻🇪 Plan de la Patria 2025-2031 (7T)
              </span>
            </div>
          </div>

          {/* Columna 2: Créditos Académicos y Contacto Directo */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Créditos Académicos
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <div>
                <span className="text-slate-500 block">Investigador:</span>
                <strong className="text-slate-200">Ing. Edery Javier Rodríguez Alvarado</strong>

                {/* Enlace Oficial a ORCID */}
                <a
                  href={orcidUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#A6CE39] hover:underline font-mono mt-1"
                  title="ORCID iD oficial del Investigador Ing. Edery Rodríguez"
                >
                  <svg className="w-3.5 h-3.5 fill-[#A6CE39] shrink-0" viewBox="0 0 256 256">
                    <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zM86.35 186.29H63.68V85.74h22.67v100.55zm-11.34-114.3a13.16 13.16 0 1 1 13.15-13.16 13.17 13.17 0 0 1-13.15 13.16zm117.38 67.89c0 30.08-20.16 46.41-49.09 46.41h-34.9V85.74h36.19c27.87 0 47.8 17.5 47.8 44.1zm-22.95.12c0-17.78-11.45-27.17-27.34-27.17h-11.83v54.22h11.83c16.01 0 27.34-9.52 27.34-27.05z"/>
                  </svg>
                  <span>ORCID: 0000-0003-1369-9036</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
                
                {/* Botones de Contacto Directo */}
                <div className="flex items-center gap-2 mt-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-xs"
                    title="Contactar al investigador por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[11px] transition shadow-xs"
                    title="Contactar al investigador por Telegram"
                  >
                    <Send className="w-3 h-3" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-500 block">Tutor de Proyecto:</span>
                <strong className="text-slate-200">Dr. Abel José Pérez Wilke</strong>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 block">Institución:</span>
                <span className="text-slate-300">Universidad Bolivariana de Venezuela (UBV)</span>
                <span className="block text-[11px] text-slate-400">Eje Precursor José Leonardo Chirinos</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Enlaces y Ética */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Metodología & Ética
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-red-400" />
                  <span>Bases Legales y Normativas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Políticas de Privacidad Soberana</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-red-400" />
                  <span>Manual Operativo del Usuario</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Base de Datos vinculada:
                <div className="font-mono text-[10px] text-slate-400 bg-slate-800/80 p-1.5 rounded mt-1 truncate border border-slate-700/60">
                  Base de Datos Soberana: 1pTxVBSWoSmOH02h9...
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior con Autoria y Créditos */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center md:text-left">
            © 2026 Praxis Social Iribarren • Trabajo de Grado de Maestría en Ciencias para el Desarrollo Estratégico (UBV).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {/* Atribución de Diseño y Desarrollo */}
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/70">
              <span className="text-slate-400">Diseñado y desarrollado por</span>
              <a
                href={devUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-red-400 hover:text-red-300 underline underline-offset-2 transition flex items-center gap-1"
                title="Portafolio oficial del desarrollador ejavierds"
              >
                <span>ejavierds</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-80" />
              </a>
            </div>

            <p className="flex items-center gap-1 text-slate-400">
              Bajo principios de <span className="text-red-400 font-semibold">Software Libre</span> y Soberanía Popular
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
