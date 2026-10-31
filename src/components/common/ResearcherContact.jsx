import React, { useState } from 'react';
import { MessageCircle, Send, Phone, UserCheck, X } from 'lucide-react';

export default function ResearcherContact({ mode = "floating" }) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "584267355056";
  const formattedPhone = "+58 426 735 5056";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Saludos estimado Ing. Edery Rodríguez, me comunico respecto a la investigación sobre la Estrategia de Integración Tecnológica en Iribarren.")}`;
  const telegramUrl = `https://t.me/+${phoneNumber}`;

  // Modo en línea (para incrustar en Navbar, Home o Footer)
  if (mode === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm hover:shadow active:scale-95"
          title={`Contactar al investigador Ing. Edery Rodríguez vía WhatsApp: ${formattedPhone}`}
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Investigador</span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition shadow-sm hover:shadow active:scale-95"
          title={`Contactar al investigador Ing. Edery Rodríguez vía Telegram: ${formattedPhone}`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram Investigador</span>
        </a>
      </div>
    );
  }

  // Modo Flotante en la esquina inferior derecha
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border-2 border-red-500/20 p-4 text-slate-800 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                ⭐
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 leading-tight">Contacto Directo</h4>
                <p className="text-[10px] text-slate-500">Ing. Edery Javier Rodríguez A.</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Comunícate directamente con el investigador para aclaratorias metodológicas, carga de instrumentos o aportes al diagnóstico:
          </p>

          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Contactar vía WhatsApp</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-200/60 px-1.5 py-0.5 rounded">
                +58 426-7355056
              </span>
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 transition text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-600" />
                <span>Contactar vía Telegram</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-200/60 px-1.5 py-0.5 rounded">
                +58 426-7355056
              </span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Atención a servidores públicos y vocerías comunales
          </div>
        </div>
      )}

      {/* Botón Disparador Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-full shadow-lg shadow-red-600/30 font-bold text-xs transition-all transform hover:scale-105 active:scale-95"
        title="Contactar al Investigador (+58 426 735 5056)"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">Contactar Investigador</span>
      </button>
    </div>
  );
}
