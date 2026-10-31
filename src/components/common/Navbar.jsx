import React, { useState } from 'react';
import RedStar from './RedStar';
import { 
  Home, 
  FileText, 
  BarChart3, 
  BrainCircuit, 
  Scale, 
  BookOpen, 
  Settings, 
  Menu, 
  X,
  Database,
  MessageCircle,
  Send
} from 'lucide-react';
import { getGasUrl } from '../../services/api';

export default function Navbar({ activeTab, setActiveTab, onOpenSettings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const gasUrl = getGasUrl();

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home, emoji: '🏠' },
    { id: 'instruments', label: 'Instrumentos', icon: FileText, emoji: '📝', badge: '5' },
    { id: 'dashboard', label: 'Analítica Práxica', icon: BarChart3, emoji: '📊' },
    { id: 'interpreter', label: 'Intérprete Dialéctico', icon: BrainCircuit, emoji: '🧠' },
    { id: 'legal', label: 'Bases Legales', icon: Scale, emoji: '⚖️' },
    { id: 'guide', label: 'Guía de Uso', icon: BookOpen, emoji: '📘' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo y Título */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-red-50 rounded-xl border border-red-100 group-hover:bg-red-100 transition-colors shadow-xs">
              <RedStar className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
                  Praxis Social Iribarren
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                  UBV LARA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Estrategia de Integración Tecnológica • Gestión Social Emancipadora
              </p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm shadow-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                      isActive ? 'bg-white text-red-700' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Acciones Derecha (Contacto Directo Investigador & Sincronización) */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Botón WhatsApp Directo */}
            <a
              href="https://wa.me/584267355056?text=Hola%20Ing.%20Edery%20Rodr%C3%ADguez,%20me%20comunico%20desde%20la%20Plataforma%20de%20Praxis%20Social%20Iribarren"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs"
              title="WhatsApp directo con el investigador Ing. Edery Rodríguez (+58 426 735 5056)"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Botón Telegram Directo */}
            <a
              href="https://t.me/+584267355056"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition shadow-2xs"
              title="Telegram directo con el investigador Ing. Edery Rodríguez (+58 426 735 5056)"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            {/* Estado de Sincronización Soberana */}
            <button
              onClick={onOpenSettings}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                gasUrl
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Configurar sincronización con la Base de Datos Soberana"
            >
              {gasUrl ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Base Soberana Conectada</span>
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5 text-slate-600" />
                  <span>Almacenamiento Soberano</span>
                </>
              )}
              <Settings className="w-3.5 h-3.5 text-slate-500 ml-1" />
            </button>
          </div>

          {/* Botón Menú Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-600 hover:text-red-600 rounded-lg border border-slate-200"
              aria-label="Configuración Soberana"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-red-600 rounded-lg border border-slate-200 hover:bg-slate-100"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Mobile Expandible */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <a
              href="https://wa.me/584267355056?text=Hola%20Ing.%20Edery%20Rodr%C3%ADguez,%20me%20comunico%20desde%20la%20Plataforma%20de%20Praxis%20Social%20Iribarren"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://t.me/+584267355056"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-sky-500 text-white font-bold text-xs"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-red-700' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
