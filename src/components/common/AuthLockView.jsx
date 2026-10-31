import React, { useState } from 'react';
import RedStar from './RedStar';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck, 
  MessageCircle, 
  Send, 
  ArrowLeft 
} from 'lucide-react';
import { unlockSession } from '../../services/auth';

export default function AuthLockView({ onUnlocked, onCancel, title = "Módulo Protegido: Analítica Práxica" }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappUrl = "https://wa.me/584267355056?text=Saludos%20Ing.%20Edery%20Rodr%C3%ADguez,%20solicito%20la%20clave%20de%20acceso%20para%20la%20Anal%C3%ADtica%20Pr%C3%A1xica";
  const telegramUrl = "https://t.me/+584267355056";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    setTimeout(() => {
      const success = unlockSession(password);
      if (success) {
        if (onUnlocked) onUnlocked();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 250);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-slate-800 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Icono de Cabecera con Estrella Roja */}
      <div className="flex flex-col items-center text-center space-y-3 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-inner">
            <Lock className="w-8 h-8 text-red-600 animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs border border-slate-200">
            <RedStar className="w-5 h-5" />
          </div>
        </div>

        <div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100/70 px-2.5 py-0.5 rounded-full mb-1">
            Seguridad y Soberanía Metodológica
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Las estadísticas consolidadas, auditorías institucionales y configuraciones del repositorio requieren validación de credencial de investigación.
          </p>
        </div>
      </div>

      {/* Formulario de Contraseña */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="praxis_auth_pass" 
            className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5 flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-red-600" />
            <span>Contraseña de Acceso Metodológico</span>
          </label>

          <div className="relative">
            <input
              id="praxis_auth_pass"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Ingresa la contraseña..."
              className={`w-full px-4 py-3 pr-11 rounded-xl text-sm border focus:ring-2 transition-all outline-hidden font-medium ${
                error
                  ? 'border-red-400 focus:ring-red-200 bg-red-50/50 text-red-900'
                  : 'border-slate-300 focus:ring-red-100 focus:border-red-600 bg-slate-50 focus:bg-white text-slate-900'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="mt-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-in shake duration-150">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Contraseña Incorrecta</strong>
                <span>Por favor contacta al investigador para obtener la credencial autorizada.</span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !password.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-red-600/30 transition transform active:scale-98"
        >
          {loading ? (
            <span>Validando credencial...</span>
          ) : (
            <>
              <Unlock className="w-4 h-4" />
              <span>Desbloquear Módulo</span>
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la vista principal</span>
          </button>
        )}
      </form>

      {/* Asistencia Directa del Investigador */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-500 block mb-2 font-medium">
          ¿No posees la clave? Solicítala directamente al investigador:
        </span>
        <div className="flex items-center justify-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-current" />
            <span>WhatsApp</span>
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition"
          >
            <Send className="w-3.5 h-3.5 text-sky-600" />
            <span>Telegram</span>
          </a>
        </div>
      </div>

    </div>
  );
}
