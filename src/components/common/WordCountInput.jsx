import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function WordCountInput({
  id,
  name,
  value = "",
  onChange,
  placeholder = "Escribe tu análisis crítico y reflexivo aquí...",
  minWords = 10,
  rows = 4,
  required = true,
  tooltipContent = null,
  label = "",
  helperText = ""
}) {
  const words = value
    ? value
        .trim()
        .split(/\s+/)
        .filter(w => w.length > 0)
    : [];
  const wordCount = words.length;
  const isSatisfied = wordCount >= minWords;

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {tooltipContent && <div>{tooltipContent}</div>}
        </div>
      )}

      {helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}

      <div className="relative">
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full p-3.5 text-sm sm:text-base rounded-xl border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${
            value && !isSatisfied
              ? 'border-amber-400 focus:border-amber-500 focus:ring-amber-200'
              : isSatisfied
              ? 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-200'
              : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
          }`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex items-center gap-1.5">
          {isSatisfied ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Densidad reflexiva lograda ({wordCount} palabras)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Mínimo {minWords} palabras (Actual: {wordCount}) — evita respuestas vacías
            </span>
          )}
        </div>

        <span className="text-slate-400 font-mono text-[11px]">
          {wordCount} / {minWords} palabras mínimas
        </span>
      </div>
    </div>
  );
}
