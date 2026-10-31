import React, { useState, useRef, useEffect } from 'react';
import { MARXIST_GLOSSARY } from '../../data/marxistGlossary';
import { HelpCircle, BookOpen, X } from 'lucide-react';

export default function MarxistTooltip({ termKey, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const normalizedKey = (termKey || (typeof children === 'string' ? children : ''))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const glossEntry = MARXIST_GLOSSARY[normalizedKey] || {
    term: children || termKey,
    author: "Paradigma Dialéctico-Crítico",
    definition: "Concepto central para comprender las relaciones materiales, las contradicciones burocráticas y la transformación social en el territorio.",
    investigationNote: "Herramienta analítica aplicada al diagnóstico de los sistemas de información en Iribarren."
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1 font-medium text-red-700 hover:text-red-900 border-b border-dashed border-red-400 hover:border-red-600 transition-colors cursor-help ${className}`}
        aria-label={`Concepto marxista: ${glossEntry.term}`}
      >
        <span>{children || glossEntry.term}</span>
        <HelpCircle className="w-3.5 h-3.5 text-red-500 opacity-80 inline" />
      </button>

      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 sm:w-96 p-4 bg-white rounded-xl shadow-2xl border-2 border-red-500/30 text-left text-slate-800 text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-150"
          style={{ filter: "drop-shadow(0 10px 15px rgba(220, 38, 38, 0.1))" }}
        >
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <h4 className="font-bold text-slate-900 text-sm">{glossEntry.term}</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-md mb-2">
            <BookOpen className="w-3 h-3 text-red-600" />
            <span>Referente: {glossEntry.author}</span>
          </div>

          <p className="text-slate-700 leading-relaxed mb-2.5">
            {glossEntry.definition}
          </p>

          {glossEntry.investigationNote && (
            <div className="bg-slate-50 border-l-2 border-red-500 p-2 text-[11px] text-slate-600 italic rounded-r">
              <span className="font-semibold text-slate-800 not-italic">En Iribarren: </span>
              {glossEntry.investigationNote}
            </div>
          )}

          {/* Triángulo inferior del Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 w-0 h-0 pointer-events-none drop-shadow"></div>
        </div>
      )}
    </span>
  );
}
