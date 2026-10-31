import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomeView from './components/views/HomeView';
import InstrumentsView from './components/views/InstrumentsView';
import DashboardView from './components/views/DashboardView';
import InterpreterView from './components/views/InterpreterView';
import LegalView from './components/views/LegalView';
import UserGuideView from './components/views/UserGuideView';
import SettingsModal from './components/views/SettingsModal';
import ResearcherContact from './components/common/ResearcherContact';
import { fetchAllRecords, getLocalRecords } from './services/api';
import { Sparkles, Database, WifiOff } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [data, setData] = useState(getLocalRecords());
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Carga de registros (Remoto Soberano / Local)
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchAllRecords();
      setData(result.data);
      setSyncStatus({
        source: result.source,
        message: result.message || result.warning,
        isGas: result.source === 'gas'
      });
    } catch (err) {
      console.error('Error al sincronizar datos:', err);
      setData(getLocalRecords());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recuento de registros por instrumento para badges
  const recordsCount = {
    entrevistas: (data.entrevistas || []).length,
    grupos_focales: (data.grupos_focales || []).length,
    etnografia: (data.etnografia || []).length,
    auditoria: (data.auditoria || []).length,
    mapeo_actores: (data.mapeo_actores || []).length
  };

  const handleRecordSubmitted = () => {
    loadData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-red-500 selection:text-white relative">
      
      {/* Barra de Navegación Principal */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Contenido Principal con Vistas Dinámicas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner de Estado de Conectividad Discreto */}
        {syncStatus && syncStatus.isGas && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Sincronizado con el Repositorio de Datos Soberano (ID: 1pTxVBSWoSmOH02h...)
            </span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="font-bold underline hover:text-emerald-950 text-[11px]"
            >
              Ver Configuración
            </button>
          </div>
        )}

        {/* Vistas Dinámicas */}
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            recordsCount={recordsCount}
          />
        )}

        {activeTab === 'instruments' && (
          <InstrumentsView
            onRecordSubmitted={handleRecordSubmitted}
            recordsCount={recordsCount}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            data={data}
            onRefresh={loadData}
            loading={loading}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'interpreter' && (
          <InterpreterView
            data={data}
          />
        )}

        {activeTab === 'legal' && (
          <LegalView />
        )}

        {activeTab === 'guide' && (
          <UserGuideView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Pie de Página Institucional UBV */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modal de Conexión y Configuración Soberana */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataReset={loadData}
      />

      {/* Botón Flotante de Contacto Directo con el Investigador (WhatsApp y Telegram) */}
      <ResearcherContact mode="floating" />

    </div>
  );
}
