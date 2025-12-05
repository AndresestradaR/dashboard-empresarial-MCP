import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

// 🎯 DASHBOARD EMPRESARIAL - ANÁLISIS DE RENTABILIDAD POR PERIODO
// Separado por plataforma: Dropi, Meta, TikTok, Shopify

const API_BASE = 'https://web-production-96b67.up.railway.app';

const Dashboard = () => {
  // Estados principales
  const [selectedPeriod, setSelectedPeriod] = useState('last7'); // ID del periodo seleccionado
  const [customDates, setCustomDates] = useState({
    start: '',
    end: ''
  });
  const [useCustomDates, setUseCustomDates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Datos por plataforma
  const [masterChart, setMasterChart] = useState({
    gastosAds: 0,
    ingresosDropi: 0,
    egresosDropi: 0,
    profitNeto: 0
  });
  
  const [dropiData, setDropiData] = useState({
    pedidos: { total: 0, monto: 0 },
    entregas: { total: 0, monto: 0 },
    devoluciones: { total: 0, monto: 0 },
    entradas: [],  // Transacciones de entrada
    salidas: []    // Transacciones de salida
  });
  
  const [metaData, setMetaData] = useState({
    gasto: 0,
    presupuesto: 0,
    roas: 0,
    cpm: 0,
    ctr: 0,
    cpa: 0,
    historico: []
  });
  
  const [tiktokData, setTiktokData] = useState({
    gasto: 0,
    presupuesto: 0,
    roas: 0,
    cpm: 0,
    ctr: 0,
    cpa: 0,
    historico: []
  });
  
  const [shopifyData, setShopifyData] = useState({
    pedidos: 0,
    historico: []
  });

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 300000); // 5 min
    return () => clearInterval(interval);
  }, [selectedPeriod, customDates, useCustomDates]); // Recargar cuando cambia

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Determinar fechas a usar
      let startDate, endDate, periodLabel;
      
      if (useCustomDates) {
        startDate = customDates.start;
        endDate = customDates.end;
        periodLabel = `${startDate} al ${endDate}`;
      } else {
        const period = quickPeriods.find(p => p.id === selectedPeriod);
        startDate = period.start;
        endDate = period.end;
        periodLabel = period.label;
      }
      
      // Request al Cerebro
      const requestBody = {
        start_date: startDate,
        end_date: endDate,
        period_label: periodLabel,
        query: `datos del ${startDate} al ${endDate}`
      };
      
      // Llamar al Cerebro
      const response = await fetch(`${API_BASE}/api/dashboard-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Usar datos REALES del backend
          setMasterChart(data.master);
          setDropiData(data.dropi);
          setMetaData(data.meta);
          setTiktokData(data.tiktok);
          setShopifyData(data.shopify);
        } else {
          // Si el backend devuelve error, usar mock como fallback
          const mockData = generateMockData('custom');
          setMasterChart(mockData.master);
          setDropiData(mockData.dropi);
          setMetaData(mockData.meta);
          setTiktokData(mockData.tiktok);
          setShopifyData(mockData.shopify);
        }
      } else {
        // Si la respuesta no es OK, usar mock
        const mockData = generateMockData('custom');
        setMasterChart(mockData.master);
        setDropiData(mockData.dropi);
        setMetaData(mockData.meta);
        setTiktokData(mockData.tiktok);
        setShopifyData(mockData.shopify);
      }
      
    } catch (error) {
      console.error('Error:', error);
      const mockData = generateMockData('custom');
      setMasterChart(mockData.master);
      setDropiData(mockData.dropi);
      setMetaData(mockData.meta);
      setTiktokData(mockData.tiktok);
      setShopifyData(mockData.shopify);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (tf) => {
    // Generar datos según el timeframe
    const periods = tf === 'day' ? 7 : tf === 'week' ? 4 : tf === 'month' ? 12 : tf === 'quarter' ? 4 : tf === 'semester' ? 2 : 5;
    
    return {
      master: {
        gastosAds: 15240,      // Meta + TikTok
        ingresosDropi: 28400,  // Lo que pagó Dropi
        egresosDropi: 3200,    // Devoluciones y cargos
        profitNeto: 9960       // ingresos - egresos - gastos
      },
      dropi: {
        pedidos: { total: 48, monto: 28400 },
        entregas: { total: 42, monto: 24800 },
        devoluciones: { total: 6, monto: 3600 },
        entradas: [
          { fecha: '05/12', concepto: 'Pago pedidos', monto: 8400, balance: 3257262 },
          { fecha: '04/12', concepto: 'Pago pedidos', monto: 12000, balance: 3248862 },
          { fecha: '03/12', concepto: 'Pago pedidos', monto: 8000, balance: 3236862 }
        ],
        salidas: [
          { fecha: '05/12', concepto: 'Devolución', monto: -1200, balance: 3256062 },
          { fecha: '04/12', concepto: 'Comisión', monto: -800, balance: 3248062 },
          { fecha: '03/12', concepto: 'Devolución', monto: -1200, balance: 3236062 }
        ]
      },
      meta: {
        gasto: 8240,
        presupuesto: 10000,
        roas: 3.45,
        cpm: 12.50,
        ctr: 2.8,
        cpa: 171.67,
        historico: Array.from({ length: periods }, (_, i) => ({
          periodo: `P${i + 1}`,
          gasto: 1000 + Math.random() * 500,
          roas: 2.5 + Math.random() * 1.5
        }))
      },
      tiktok: {
        gasto: 7000,
        presupuesto: 8000,
        roas: 2.85,
        cpm: 8.20,
        ctr: 3.2,
        cpa: 145.83,
        historico: Array.from({ length: periods }, (_, i) => ({
          periodo: `P${i + 1}`,
          gasto: 800 + Math.random() * 400,
          roas: 2.0 + Math.random() * 1.5
        }))
      },
      shopify: {
        pedidos: 48,
        historico: Array.from({ length: periods }, (_, i) => ({
          periodo: `P${i + 1}`,
          pedidos: 8 + Math.floor(Math.random() * 8)
        }))
      }
    };
  };

  const theme = {
    bg: darkMode ? '#0a0a0a' : '#ffffff',
    card: darkMode ? '#141414' : '#f5f5f5',
    text: darkMode ? '#ffffff' : '#000000',
    textMuted: darkMode ? '#888888' : '#666666',
    border: darkMode ? '#222222' : '#e0e0e0',
    accent: '#10b981',
    accentDark: '#059669',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    purple: '#8b5cf6',
    orange: '#f97316'
  };

  // Calcular fechas dinámicamente
  const today = new Date();
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const quickPeriods = [
    // Periodos cortos
    {
      id: 'today',
      label: '📅 Hoy',
      start: formatDate(today),
      end: formatDate(today)
    },
    {
      id: 'yesterday',
      label: '📆 Ayer',
      start: formatDate(new Date(today.getTime() - 86400000)),
      end: formatDate(new Date(today.getTime() - 86400000))
    },
    {
      id: 'last7',
      label: '📊 Últimos 7 Días',
      start: formatDate(new Date(today.getTime() - 6 * 86400000)),
      end: formatDate(today)
    },
    {
      id: 'last14',
      label: '📈 Últimos 14 Días',
      start: formatDate(new Date(today.getTime() - 13 * 86400000)),
      end: formatDate(today)
    },
    {
      id: 'last30',
      label: '📉 Últimos 30 Días',
      start: formatDate(new Date(today.getTime() - 29 * 86400000)),
      end: formatDate(today)
    },
    {
      id: 'thisMonth',
      label: '🗓️ Este Mes',
      start: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
      end: formatDate(today)
    },
    {
      id: 'lastMonth',
      label: '🗓️ Mes Anterior',
      start: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
      end: formatDate(new Date(today.getFullYear(), today.getMonth(), 0))
    },
    // Trimestres
    {
      id: 'q1',
      label: '📊 Q1 (Ene-Mar)',
      start: `${today.getFullYear()}-01-01`,
      end: `${today.getFullYear()}-03-31`
    },
    {
      id: 'q2',
      label: '📊 Q2 (Abr-Jun)',
      start: `${today.getFullYear()}-04-01`,
      end: `${today.getFullYear()}-06-30`
    },
    {
      id: 'q3',
      label: '📊 Q3 (Jul-Sep)',
      start: `${today.getFullYear()}-07-01`,
      end: `${today.getFullYear()}-09-30`
    },
    {
      id: 'q4',
      label: '📊 Q4 (Oct-Dic)',
      start: `${today.getFullYear()}-10-01`,
      end: `${today.getFullYear()}-12-31`
    },
    // Semestres
    {
      id: 'h1',
      label: '📈 Primer Semestre (Ene-Jun)',
      start: `${today.getFullYear()}-01-01`,
      end: `${today.getFullYear()}-06-30`
    },
    {
      id: 'h2',
      label: '📈 Segundo Semestre (Jul-Dic)',
      start: `${today.getFullYear()}-07-01`,
      end: `${today.getFullYear()}-12-31`
    },
    // Año
    {
      id: 'thisYear',
      label: '🗓️ Este Año',
      start: `${today.getFullYear()}-01-01`,
      end: formatDate(today)
    },
    {
      id: 'lastYear',
      label: '🗓️ Año Anterior',
      start: `${today.getFullYear() - 1}-01-01`,
      end: `${today.getFullYear() - 1}-12-31`
    }
  ];

  const StatCard = ({ title, value, subtitle, color, icon }) => (
    <div style={{
      background: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      padding: '20px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ fontSize: '28px' }}>{icon}</div>
        <div style={{ fontSize: '13px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: color, marginBottom: '8px' }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: theme.textMuted }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
        color: theme.text
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <div style={{ fontSize: '18px' }}>Cargando análisis...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: darkMode ? 'linear-gradient(135deg, #141414 0%, #0a0a0a 100%)' : '#ffffff',
        borderBottom: `1px solid ${theme.border}`,
        padding: '20px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '32px' }}>📊</div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
                Dashboard Empresarial
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.textMuted }}>
                Análisis de Rentabilidad por Periodo
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => loadDashboardData()} style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '10px 16px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              🔄 Actualizar
            </button>
            
            <button onClick={() => setDarkMode(!darkMode)} style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '10px 16px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: '20px'
            }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* Selector Temporal Global */}
        <div style={{
          background: theme.card,
          border: `2px solid ${theme.accent}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⏱️ Periodo de Análisis
          </div>
          
          {/* Periodos Recientes */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '12px', fontWeight: '600' }}>
              Periodos recientes:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
              {quickPeriods.slice(0, 7).map(period => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    setUseCustomDates(false);
                  }}
                  style={{
                    background: !useCustomDates && selectedPeriod === period.id ? theme.accent : theme.bg,
                    color: !useCustomDates && selectedPeriod === period.id ? 'white' : theme.text,
                    border: `1px solid ${!useCustomDates && selectedPeriod === period.id ? theme.accent : theme.border}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: !useCustomDates && selectedPeriod === period.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.bg;
                    }
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trimestres */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '12px', fontWeight: '600' }}>
              Trimestres {today.getFullYear()}:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {quickPeriods.slice(7, 11).map(period => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    setUseCustomDates(false);
                  }}
                  style={{
                    background: !useCustomDates && selectedPeriod === period.id ? theme.accent : theme.bg,
                    color: !useCustomDates && selectedPeriod === period.id ? 'white' : theme.text,
                    border: `1px solid ${!useCustomDates && selectedPeriod === period.id ? theme.accent : theme.border}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: !useCustomDates && selectedPeriod === period.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.bg;
                    }
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Semestres y Años */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '12px', fontWeight: '600' }}>
              Semestres y años:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
              {quickPeriods.slice(11).map(period => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    setUseCustomDates(false);
                  }}
                  style={{
                    background: !useCustomDates && selectedPeriod === period.id ? theme.accent : theme.bg,
                    color: !useCustomDates && selectedPeriod === period.id ? 'white' : theme.text,
                    border: `1px solid ${!useCustomDates && selectedPeriod === period.id ? theme.accent : theme.border}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: !useCustomDates && selectedPeriod === period.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (useCustomDates || selectedPeriod !== period.id) {
                      e.currentTarget.style.background = theme.bg;
                    }
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Fechas Personalizadas */}
          <div style={{
            background: useCustomDates ? `${theme.accent}15` : theme.bg,
            border: `1px solid ${useCustomDates ? theme.accent : theme.border}`,
            borderRadius: '12px',
            padding: '16px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={useCustomDates}
                onChange={(e) => setUseCustomDates(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              📅 Personalizado
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              opacity: useCustomDates ? 1 : 0.5,
              pointerEvents: useCustomDates ? 'auto' : 'none'
            }}>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={customDates.start}
                  onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text,
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={customDates.end}
                  onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text,
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={() => loadDashboardData()}
                  disabled={!customDates.start || !customDates.end}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: customDates.start && customDates.end ? theme.accent : theme.border,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: customDates.start && customDates.end ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (customDates.start && customDates.end) {
                      e.currentTarget.style.background = theme.accentDark;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (customDates.start && customDates.end) {
                      e.currentTarget.style.background = theme.accent;
                    }
                  }}
                >
                  🔍 Analizar Periodo
                </button>
              </div>
            </div>
            
            {useCustomDates && customDates.start && customDates.end && (
              <div style={{
                marginTop: '12px',
                padding: '8px 12px',
                background: theme.accent,
                color: 'white',
                borderRadius: '8px',
                fontSize: '13px',
                textAlign: 'center'
              }}>
                ✅ Analizando del {customDates.start} al {customDates.end}
              </div>
            )}
          </div>
        </div>

        {/* GRÁFICA REINA - Rentabilidad del Periodo */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.accent}15, ${theme.info}15)`,
          border: `2px solid ${theme.accent}`,
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '22px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px' }}>
            💎 RENTABILIDAD DEL PERIODO
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div style={{ background: theme.card, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '8px' }}>💸 Gastos Ads (Meta + TikTok)</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: theme.danger }}>
                ${masterChart.gastosAds.toLocaleString()}
              </div>
            </div>
            
            <div style={{ background: theme.card, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '8px' }}>✅ Ingresos Dropi</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent }}>
                ${masterChart.ingresosDropi.toLocaleString()}
              </div>
            </div>
            
            <div style={{ background: theme.card, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '8px' }}>❌ Egresos Dropi</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: theme.warning }}>
                ${masterChart.egresosDropi.toLocaleString()}
              </div>
            </div>
            
            <div style={{ background: theme.accent, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>💰 PROFIT NETO</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
                ${masterChart.profitNeto.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
                {((masterChart.profitNeto / masterChart.gastosAds) * 100).toFixed(1)}% ROI
              </div>
            </div>
          </div>

          {/* Fórmula visual */}
          <div style={{
            background: theme.card,
            borderRadius: '12px',
            padding: '20px',
            fontSize: '16px',
            fontFamily: 'monospace',
            textAlign: 'center',
            color: theme.textMuted
          }}>
            <span style={{ color: theme.accent }}>${masterChart.ingresosDropi.toLocaleString()}</span>
            {' '}-{' '}
            <span style={{ color: theme.warning }}>${masterChart.egresosDropi.toLocaleString()}</span>
            {' '}-{' '}
            <span style={{ color: theme.danger }}>${masterChart.gastosAds.toLocaleString()}</span>
            {' '}={' '}
            <span style={{ color: theme.accent, fontWeight: '700', fontSize: '18px' }}>${masterChart.profitNeto.toLocaleString()}</span>
          </div>
        </div>

        {/* DROPI - Flujo de Caja */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🟠 DROPI - Gestión y Flujo de Caja
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              icon="📦"
              title="Pedidos"
              value={dropiData.pedidos.total}
              subtitle={`$${dropiData.pedidos.monto.toLocaleString()}`}
              color={theme.info}
            />
            <StatCard
              icon="✅"
              title="Entregas"
              value={dropiData.entregas.total}
              subtitle={`$${dropiData.entregas.monto.toLocaleString()}`}
              color={theme.accent}
            />
            <StatCard
              icon="↩️"
              title="Devoluciones"
              value={dropiData.devoluciones.total}
              subtitle={`$${dropiData.devoluciones.monto.toLocaleString()}`}
              color={theme.danger}
            />
          </div>

          {/* Entradas y Salidas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Entradas */}
            <div style={{
              background: `${theme.accent}10`,
              border: `1px solid ${theme.accent}40`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: theme.accent }}>
                ✅ Entradas (Pagos de Dropi)
              </div>
              {dropiData.entradas.map((t, i) => (
                <div key={i} style={{
                  background: theme.card,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: theme.textMuted }}>{t.fecha}</span>
                    <span style={{ color: theme.accent, fontWeight: '600' }}>+${t.monto.toLocaleString()}</span>
                  </div>
                  <div style={{ color: theme.textMuted, fontSize: '12px' }}>{t.concepto}</div>
                  <div style={{ color: theme.textMuted, fontSize: '11px', marginTop: '4px' }}>
                    Balance: ${t.balance.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Salidas */}
            <div style={{
              background: `${theme.danger}10`,
              border: `1px solid ${theme.danger}40`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: theme.danger }}>
                ❌ Salidas (Cargos de Dropi)
              </div>
              {dropiData.salidas.map((t, i) => (
                <div key={i} style={{
                  background: theme.card,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: theme.textMuted }}>{t.fecha}</span>
                    <span style={{ color: theme.danger, fontWeight: '600' }}>${t.monto.toLocaleString()}</span>
                  </div>
                  <div style={{ color: theme.textMuted, fontSize: '12px' }}>{t.concepto}</div>
                  <div style={{ color: theme.textMuted, fontSize: '11px', marginTop: '4px' }}>
                    Balance: ${t.balance.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* META ADS */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.info}40`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔵 META ADS
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <StatCard icon="💸" title="Gasto" value={`$${metaData.gasto.toLocaleString()}`} color={theme.danger} />
            <StatCard icon="🎯" title="Presupuesto" value={`$${metaData.presupuesto.toLocaleString()}`} color={theme.textMuted} />
            <StatCard icon="📈" title="ROAS" value={`${metaData.roas}x`} color={theme.accent} />
            <StatCard icon="💰" title="CPM" value={`$${metaData.cpm}`} color={theme.info} />
            <StatCard icon="👆" title="CTR" value={`${metaData.ctr}%`} color={theme.purple} />
            <StatCard icon="🎪" title="CPA" value={`$${metaData.cpa}`} color={theme.warning} />
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={metaData.historico}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="periodo" stroke={theme.textMuted} />
              <YAxis stroke={theme.textMuted} />
              <Tooltip contentStyle={{ background: theme.card, border: `1px solid ${theme.border}` }} />
              <Bar dataKey="gasto" fill={theme.info} name="Gasto" />
              <Line type="monotone" dataKey="roas" stroke={theme.accent} strokeWidth={2} name="ROAS" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* TIKTOK ADS */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.textMuted}40`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚫ TIKTOK ADS
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <StatCard icon="💸" title="Gasto" value={`$${tiktokData.gasto.toLocaleString()}`} color={theme.danger} />
            <StatCard icon="🎯" title="Presupuesto" value={`$${tiktokData.presupuesto.toLocaleString()}`} color={theme.textMuted} />
            <StatCard icon="📈" title="ROAS" value={`${tiktokData.roas}x`} color={theme.accent} />
            <StatCard icon="💰" title="CPM" value={`$${tiktokData.cpm}`} color={theme.info} />
            <StatCard icon="👆" title="CTR" value={`${tiktokData.ctr}%`} color={theme.purple} />
            <StatCard icon="🎪" title="CPA" value={`$${tiktokData.cpa}`} color={theme.warning} />
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={tiktokData.historico}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="periodo" stroke={theme.textMuted} />
              <YAxis stroke={theme.textMuted} />
              <Tooltip contentStyle={{ background: theme.card, border: `1px solid ${theme.border}` }} />
              <Bar dataKey="gasto" fill="#000000" name="Gasto" />
              <Line type="monotone" dataKey="roas" stroke={theme.accent} strokeWidth={2} name="ROAS" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* SHOPIFY */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.accent}40`,
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🟢 SHOPIFY - Pedidos
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <StatCard
              icon="📦"
              title="Total Pedidos"
              value={shopifyData.pedidos}
              subtitle={`En el periodo seleccionado`}
              color={theme.accent}
            />
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={shopifyData.historico}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="periodo" stroke={theme.textMuted} />
              <YAxis stroke={theme.textMuted} />
              <Tooltip contentStyle={{ background: theme.card, border: `1px solid ${theme.border}` }} />
              <Bar dataKey="pedidos" fill={theme.accent} name="Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          textAlign: 'center',
          color: theme.textMuted,
          fontSize: '13px'
        }}>
          <p>📊 Dashboard Empresarial • Análisis Unificado por Periodo</p>
          <p style={{ marginTop: '8px' }}>Conectado a: Dropi • Meta • TikTok • Shopify</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
