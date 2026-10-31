import React, { useState } from 'react';
import InterviewForm from '../forms/InterviewForm';
import FocusGroupForm from '../forms/FocusGroupForm';
import EthnographyForm from '../forms/EthnographyForm';
import SystemsAuditForm from '../forms/SystemsAuditForm';
import ActorsMappingForm from '../forms/ActorsMappingForm';
import MarxistTooltip from '../common/MarxistTooltip';
import { 
  MessageSquare, 
  Users, 
  FileEdit, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function InstrumentsView({ onRecordSubmitted, recordsCount }) {
  const [activeInstrument, setActiveInstrument] = useState('entrevista');

  const instrumentsList = [
    {
      id: 'entrevista',
      number: '1',
      title: 'Entrevista en Profundidad',
      shortTitle: 'Entrevista',
      subtitle: 'Tomadores de Decisiones',
      icon: MessageSquare,
      emoji: '💬',
      countKey: 'entrevistas',
      component: <InterviewForm onRecordSubmitted={onRecordSubmitted} />
    },
    {
      id: 'grupo_focal',
      number: '2',
      title: 'Guía de Moderación Grupo Focal',
      shortTitle: 'Grupo Focal',
      subtitle: 'Ecología de Saberes',
      icon: Users,
      emoji: '👥',
      countKey: 'grupos_focales',
      component: <FocusGroupForm onRecordSubmitted={onRecordSubmitted} />
    },
    {
      id: 'etnografia',
      number: '3',
      title: 'Matriz de Registro Etnográfico',
      shortTitle: 'Etnografía',
      subtitle: 'Observación Participante',
      icon: FileEdit,
      emoji: '📝',
      countKey: 'etnografia',
      component: <EthnographyForm onRecordSubmitted={onRecordSubmitted} />
    },
    {
      id: 'auditoria',
      number: '4',
      title: 'Auditoría de Sistemas y Software',
      shortTitle: 'Auditoría',
      subtitle: 'Ley de Infogobierno',
      icon: Cpu,
      emoji: '⚙️',
      countKey: 'auditoria',
      component: <SystemsAuditForm onRecordSubmitted={onRecordSubmitted} />
    },
    {
      id: 'mapeo_actores',
      number: '5',
      title: 'Mapeo de Actores (PES)',
      shortTitle: 'Actores PES',
      subtitle: 'Carlos Matus',
      icon: Compass,
      emoji: '🗺️',
      countKey: 'mapeo_actores',
      component: <ActorsMappingForm onRecordSubmitted={onRecordSubmitted} />
    }
  ];

  const currentInst = instrumentsList.find(i => i.id === activeInstrument) || instrumentsList[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner de Presentación del Módulo */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/40 text-red-200 border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo de Recolección Dialéctico-Metodológica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            📝 5 Instrumentos de Diagnóstico Marxista
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Formularios estandarizados para capturar las contradicciones entre la fragmentación institucional y el mandato constitucional en Iribarren. Cada campo cualitativo exige un mínimo de reflexión crítica para alimentar el <MarxistTooltip termKey="utopia concreta">Intérprete Dialéctico</MarxistTooltip>.
          </p>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-9xl font-black">
          ⭐
        </div>
      </div>

      {/* Selector de Instrumentos (Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {instrumentsList.map((inst) => {
          const Icon = inst.icon;
          const isActive = activeInstrument === inst.id;
          const count = recordsCount ? recordsCount[inst.countKey] || 0 : 0;

          return (
            <button
              key={inst.id}
              onClick={() => setActiveInstrument(inst.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/20 scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{inst.emoji}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-red-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count} reg.
                </span>
              </div>
              <div>
                <span className={`text-[10px] font-extrabold tracking-wider uppercase block ${
                  isActive ? 'text-red-200' : 'text-red-600'
                }`}>
                  Inst. #{inst.number}
                </span>
                <h4 className="font-bold text-xs sm:text-sm leading-tight mt-0.5 line-clamp-1">
                  {inst.shortTitle}
                </h4>
                <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-red-100' : 'text-slate-400'}`}>
                  {inst.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Formulario Activo */}
      <div className="transition-all duration-300">
        {currentInst.component}
      </div>

    </div>
  );
}
