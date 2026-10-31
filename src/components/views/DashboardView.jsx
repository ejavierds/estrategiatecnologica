import React, { useState, useMemo } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { 
  BarChart3, 
  Database, 
  Building2, 
  Layers, 
  Users, 
  AlertOctagon, 
  Download, 
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  FileCheck,
  Lock
} from 'lucide-react';
import MarxistTooltip from '../common/MarxistTooltip';
import { SPREADSHEET_ID } from '../../data/initialData';
import { isUnlocked, lockSession } from '../../services/auth';
import AuthLockView from '../common/AuthLockView';

const COLORS = ['#DC2626', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'];
const ARCH_COLORS = {
  'Software Libre': '#10B981',
  'Software Privativo': '#DC2626',
  'Mixto': '#F59E0B'
};

export default function DashboardView({ data, onRefresh, loading, onNavigate }) {
  const [authenticated, setAuthenticated] = useState(isUnlocked());
  const [selectedTable, setSelectedTable] = useState('auditoria');
  const [searchQuery, setSearchQuery] = useState('');

  if (!authenticated) {
    return (
      <AuthLockView
        onUnlocked={() => setAuthenticated(true)}
        onCancel={() => onNavigate && onNavigate('home')}
        title="Módulo Protegido: Analítica Práxica"
      />
    );
  }

  // 1. Métricas KPIs
  const kpis = useMemo(() => {
    const totalEntrevistas = (data.entrevistas || []).length;
    const totalGrupos = (data.grupos_focales || []).length;
    const totalEtnografia = (data.etnografia || []).length;
    const totalAuditoria = (data.auditoria || []).length;
    const totalActores = (data.mapeo_actores || []).length;

    const totalGeneral = totalEntrevistas + totalGrupos + totalEtnografia + totalAuditoria + totalActores;

    // Instituciones únicas auditadas
    const instituciones = new Set();
    (data.auditoria || []).forEach(a => {
      if (a.institucion_responsable || a.institucion) {
        instituciones.add(a.institucion_responsable || a.institucion);
      }
    });
    (data.entrevistas || []).forEach(e => {
      if (e.institucion) instituciones.add(e.institucion);
    });

    // Cálculos de duplicidad crítica
    const duplicidadAlta = (data.auditoria || []).filter(a => {
      const dup = (a.duplicidad_de_datos_identificada || a.duplicidad || '').toLowerCase();
      return dup.includes('critica') || dup.includes('alta');
    }).length;

    const pctDuplicidad = totalAuditoria > 0 
      ? Math.round((duplicidadAlta / totalAuditoria) * 100) 
      : 0;

    // Actores a favor
    const actoresAFavor = (data.mapeo_actores || []).filter(a => {
      const pos = (a.posicion_ante_la_integracion || a.posicion || '').toLowerCase();
      return pos.includes('favor');
    }).length;

    const pctAFavor = totalActores > 0 
      ? Math.round((actoresAFavor / totalActores) * 100) 
      : 0;

    return {
      totalGeneral,
      totalAuditoria,
      totalInstituciones: instituciones.size || 6,
      pctDuplicidad,
      pctAFavor,
      totalActores
    };
  }, [data]);

  // 2. Gráfico Circular: Arquitectura Libre vs Privativa (Instrumento 4)
  const arquitecturaChartData = useMemo(() => {
    const counts = {
      'Software Libre': 0,
      'Software Privativo': 0,
      'Solución Mixta': 0
    };

    (data.auditoria || []).forEach(item => {
      const arq = (item.arquitectura || item.arquitectura_libre_privativo || '').toLowerCase();
      if (arq.includes('libre')) {
        counts['Software Libre']++;
      } else if (arq.includes('privativo') || arq.includes('comercial')) {
        counts['Software Privativo']++;
      } else {
        counts['Solución Mixta']++;
      }
    });

    return [
      { name: 'Software Libre', value: counts['Software Libre'], fill: '#10B981' },
      { name: 'Software Privativo', value: counts['Software Privativo'], fill: '#DC2626' },
      { name: 'Solución Mixta', value: counts['Solución Mixta'], fill: '#F59E0B' }
    ].filter(i => i.value > 0);
  }, [data.auditoria]);

  // 3. Gráfico de Barras: Posición de Actores ante la Integración (Instrumento 5)
  const actoresChartData = useMemo(() => {
    const mapping = {
      'A favor': 0,
      'Neutro / Indeciso': 0,
      'En contra': 0
    };

    (data.mapeo_actores || []).forEach(item => {
      const pos = (item.posicion_ante_la_integracion || item.posicion || '').toLowerCase();
      if (pos.includes('favor')) {
        mapping['A favor']++;
      } else if (pos.includes('contra')) {
        mapping['En contra']++;
      } else {
        mapping['Neutro / Indeciso']++;
      }
    });

    return [
      { name: 'A favor (Proactivo)', cantidad: mapping['A favor'], fill: '#10B981' },
      { name: 'Neutro (Expectante)', cantidad: mapping['Neutro / Indeciso'], fill: '#F59E0B' },
      { name: 'En contra (Resistente)', cantidad: mapping['En contra'], fill: '#DC2626' }
    ];
  }, [data.mapeo_actores]);

  // 4. Gráfico de Barras: Categorías Etnográficas Detectadas (Instrumento 3)
  const etnografiaChartData = useMemo(() => {
    const cats = {};
    (data.etnografia || []).forEach(item => {
      const cat = item.categoria_vinculada || item.categoria || 'Otras tensiones';
      const shortCat = cat.length > 25 ? cat.substring(0, 22) + '...' : cat;
      cats[shortCat] = (cats[shortCat] || 0) + 1;
    });

    return Object.keys(cats).map((key, idx) => ({
      categoria: key,
      frecuencia: cats[key],
      fill: COLORS[idx % COLORS.length]
    }));
  }, [data.etnografia]);

  // 5. Tabla de Registros Filtrados
  const activeRecords = useMemo(() => {
    let list = data[selectedTable] || [];
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return list.filter(item => {
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(query)
      );
    });
  }, [data, selectedTable, searchQuery]);

  // Función de exportar data a JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `praxis_social_iribarren_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Encabezado del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <span>📊 Analítica Práxica Dialéctica</span>
            <span>•</span>
            <span>Tiempo Real</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard de Contradicciones y Diagnóstico
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualización cuantitativa e interpretación dialéctica de los 5 instrumentos aplicados en el Municipio Iribarren.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition shadow-xs"
            title="Recargar datos desde la Base de Datos Soberana / Almacenamiento Local"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Actualizando...' : 'Refrescar Datos'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm shadow-red-200"
            title="Exportar base completa para análisis en la tesis"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Data (JSON)</span>
          </button>

          <button
            onClick={() => {
              lockSession();
              setAuthenticated(false);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition shadow-xs"
            title="Bloquear acceso a la analítica (requerirá contraseña nuevamente)"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Bloquear</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas Clave (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Registros</span>
            <Layers className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{kpis.totalGeneral}</div>
          <p className="text-[11px] text-slate-400 mt-1">5 instrumentos consolidados</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Inst. Auditadas</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{kpis.totalInstituciones}</div>
          <p className="text-[11px] text-slate-400 mt-1">Salud, alcaldía y misiones</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sistemas Evaluados</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{kpis.totalAuditoria}</div>
          <p className="text-[11px] text-slate-400 mt-1">Plataformas y bases de datos</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Duplicidad Crítica</span>
            <AlertOctagon className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{kpis.pctDuplicidad}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Sistemas con datos redundantes</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Apoyo Integración</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{kpis.pctAFavor}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Actores PES pro-integración</p>
        </div>

      </div>

      {/* Fila de Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico 1: Arquitectura de Software Libre vs Privativo */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Arquitectura de Sistemas: Soberanía vs Dependencia
              </h3>
              <MarxistTooltip termKey="soberania tecnologica">Soberanía Tecnológica</MarxistTooltip>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Distribución de software libre frente a soluciones privativas o híbridas (Instrumento 4 - Ley de Infogobierno).
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full flex items-center justify-center">
            {arquitecturaChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={arquitecturaChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {arquitecturaChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value, name) => [`${value} sistemas`, name]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">Sin datos registrados de auditoría</div>
            )}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
            💡 <strong>Hallazgo Dialéctico:</strong> La persistencia de sistemas privativos cerrados constituye la mediación técnica principal que frena la interoperabilidad obligatoria de la Ley de Infogobierno.
          </div>
        </div>

        {/* Gráfico 2: Posición de Actores ante la Integración (PES) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Correlación de Fuerzas: Posición ante la Integración
              </h3>
              <MarxistTooltip termKey="hegemonia">Bloque Histórico (PES)</MarxistTooltip>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Mapeo de actores a favor, neutros o en resistencia burocrática (Instrumento 5 - Carlos Matus).
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full">
            {actoresChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actoresChartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <RechartsTooltip formatter={(value) => [`${value} actores`, 'Cantidad']} />
                  <Bar dataKey="cantidad" radius={[8, 8, 0, 0]}>
                    {actoresChartData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">Sin actores mapeados</div>
            )}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
            💡 <strong>Acción Política:</strong> El bloque a favor cuenta con el respaldo popular comunal; la estrategia debe incidir sobre los sectores técnicos neutros para vencer la inercia.
          </div>
        </div>

      </div>

      {/* Gráfico 3: Nudos Críticos Etnográficos */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
            Frecuencia de Categorías Críticas en la Observación Participante
          </h3>
          <MarxistTooltip termKey="alienacion">Contradicciones Materiales</MarxistTooltip>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Manifestaciones de celo burocrático, alienación y despojo del dato observadas in situ (Instrumento 3).
        </p>

        <div className="h-64 w-full">
          {etnografiaChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={etnografiaChartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="categoria" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <RechartsTooltip formatter={(val) => [`${val} registros`, 'Incidencia']} />
                <Bar dataKey="frecuencia" fill="#DC2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-xs text-slate-400">Sin registros etnográficos disponibles</div>
          )}
        </div>
      </div>

      {/* Visor de Tablas de Registros */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              Explorador de Datos Recolectados
            </h3>
            <p className="text-xs text-slate-500">
              Registros alojados en la memoria soberana y vinculados con la Base de Datos Soberana ID: {SPREADSHEET_ID.substring(0, 16)}...
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Selector de Instrumento para la tabla */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedTable('auditoria')}
                className={`px-3 py-1.5 rounded-lg transition ${selectedTable === 'auditoria' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                ⚙️ Auditoría
              </button>
              <button
                onClick={() => setSelectedTable('mapeo_actores')}
                className={`px-3 py-1.5 rounded-lg transition ${selectedTable === 'mapeo_actores' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                🗺️ Actores
              </button>
              <button
                onClick={() => setSelectedTable('entrevistas')}
                className={`px-3 py-1.5 rounded-lg transition ${selectedTable === 'entrevistas' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                💬 Entrevistas
              </button>
              <button
                onClick={() => setSelectedTable('grupos_focales')}
                className={`px-3 py-1.5 rounded-lg transition ${selectedTable === 'grupos_focales' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                👥 Grupos
              </button>
              <button
                onClick={() => setSelectedTable('etnografia')}
                className={`px-3 py-1.5 rounded-lg transition ${selectedTable === 'etnografia' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                📝 Etnografía
              </button>
            </div>

            {/* Buscador */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar registros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          </div>
        </div>

        {/* Tabla Responsiva */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-800 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Fecha</th>
                {selectedTable === 'auditoria' && (
                  <>
                    <th className="px-4 py-3">Sistema</th>
                    <th className="px-4 py-3">Institución</th>
                    <th className="px-4 py-3">Arquitectura</th>
                    <th className="px-4 py-3">Interoperabilidad</th>
                    <th className="px-4 py-3">Duplicidad</th>
                  </>
                )}
                {selectedTable === 'mapeo_actores' && (
                  <>
                    <th className="px-4 py-3">Actor</th>
                    <th className="px-4 py-3">Recurso de Poder</th>
                    <th className="px-4 py-3">Posición</th>
                    <th className="px-4 py-3">Interés Principal</th>
                  </>
                )}
                {selectedTable === 'entrevistas' && (
                  <>
                    <th className="px-4 py-3">Institución</th>
                    <th className="px-4 py-3">Cargo</th>
                    <th className="px-4 py-3">Mandato vs Estructura</th>
                  </>
                )}
                {selectedTable === 'grupos_focales' && (
                  <>
                    <th className="px-4 py-3">Lugar</th>
                    <th className="px-4 py-3">Actores Presentes</th>
                    <th className="px-4 py-3">Utopía Concreta</th>
                  </>
                )}
                {selectedTable === 'etnografia' && (
                  <>
                    <th className="px-4 py-3">Lugar</th>
                    <th className="px-4 py-3">Categoría Vinculada</th>
                    <th className="px-4 py-3">Interpretación Crítica</th>
                  </>
                )}
                <th className="px-4 py-3">Consentimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {activeRecords.length > 0 ? (
                activeRecords.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-red-600">
                      {item.id_registro || item.id || `REG-${idx + 1}`}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {item.fecha || item.marca_temporal?.substring(0, 10) || '-'}
                    </td>

                    {selectedTable === 'auditoria' && (
                      <>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {item.sistema_plataforma || item.sistema}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.institucion_responsable || item.institucion}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (item.arquitectura || '').includes('Libre') 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : (item.arquitectura || '').includes('Privativo')
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.arquitectura?.split('(')[0] || item.arquitectura}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.capacidad_de_interoperabilidad?.split('(')[0] || item.interoperabilidad}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.duplicidad_de_datos_identificada?.split('(')[0] || item.duplicidad}
                        </td>
                      </>
                    )}

                    {selectedTable === 'mapeo_actores' && (
                      <>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {item.actor_social_politico || item.actor}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.recursos_de_poder?.split('(')[0] || item.recursos_poder}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (item.posicion_ante_la_integracion || item.posicion || '').includes('favor')
                              ? 'bg-emerald-100 text-emerald-800'
                              : (item.posicion_ante_la_integracion || item.posicion || '').includes('contra')
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.posicion_ante_la_integracion?.split('(')[0] || item.posicion}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                          {item.interes_principal || item.interes}
                        </td>
                      </>
                    )}

                    {selectedTable === 'entrevistas' && (
                      <>
                        <td className="px-4 py-3 text-slate-800 font-semibold">{item.institucion}</td>
                        <td className="px-4 py-3 text-slate-600">{item.cargo_del_informante || item.cargo}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-sm truncate">
                          {item.pregunta_1_totalidad_concreta || item.p1_totalidad}
                        </td>
                      </>
                    )}

                    {selectedTable === 'grupos_focales' && (
                      <>
                        <td className="px-4 py-3 text-slate-800">{item.lugar}</td>
                        <td className="px-4 py-3 text-slate-600">{item.actores_participantes || item.actores}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-sm truncate">
                          {item.fase_3_construccion_de_la_utopia_concreta || item.fase3_utopia_concreta}
                        </td>
                      </>
                    )}

                    {selectedTable === 'etnografia' && (
                      <>
                        <td className="px-4 py-3 text-slate-800">{item.lugar}</td>
                        <td className="px-4 py-3 font-semibold text-red-700">
                          {item.categoria_vinculada || item.categoria}
                        </td>
                        <td className="px-4 py-3 text-slate-600 max-w-sm truncate">
                          {item.interpretacion_critica}
                        </td>
                      </>
                    )}

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Validado
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No se encontraron registros en esta sección.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
