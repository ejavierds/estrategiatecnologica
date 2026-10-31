import React from 'react';
import RedStar from './RedStar';
import { Scale, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
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

          {/* Columna 2: Créditos Académicos */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Créditos Académicos
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <div>
                <span className="text-slate-500 block">Investigador:</span>
                <strong className="text-slate-200">Ing. Edery Javier Rodríguez Alvarado</strong>
                <span className="block text-[11px] text-slate-400">C.I. V-17859495</span>
              </div>
              <div>
                <span className="text-slate-500 block">Tutor de Proyecto:</span>
                <strong className="text-slate-200">Dr. Abel José Pérez Wilke</strong>
                <span className="block text-[11px] text-slate-400">C.I. V-10844246</span>
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
                  Google Sheet: 1pTxVBSWoSmOH02h9...
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 Praxis Social Iribarren • Trabajo de Investigación para optar al título de Magíster Scientiarum.
          </p>
          <p className="flex items-center gap-1">
            Desarrollado bajo principios de <span className="text-red-400 font-medium">Software Libre</span> y Soberanía Popular
          </p>
        </div>
      </div>
    </footer>
  );
}
