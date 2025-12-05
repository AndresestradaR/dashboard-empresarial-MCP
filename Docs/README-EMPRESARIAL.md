# 📊 Dashboard Empresarial - Análisis de Rentabilidad

Dashboard profesional de nivel empresarial para análisis de rentabilidad en dropshipping, con **separación por plataforma** y **análisis temporal unificado**.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/React-18.2-blue) ![Recharts](https://img.shields.io/badge/Recharts-2.10-green)

---

## 🎯 Características Principales

### 💎 Gráfica Reina - Rentabilidad del Periodo
**La métrica más importante de tu negocio**

```
Profit Neto = Ingresos Dropi - Egresos Dropi - Gastos Ads (Meta + TikTok)
```

Visualiza en tiempo real si estás ganando o perdiendo dinero en el periodo seleccionado.

### ⏱️ Selector Temporal Intuitivo
**Botones super claros que dicen exactamente qué analizan:**

**Periodos Recientes:**
- 📅 Hoy - 📆 Ayer
- 📊 Últimos 7 Días - 📈 Últimos 14 Días - 📉 Últimos 30 Días
- 🗓️ Este Mes - 🗓️ Mes Anterior

**Trimestres (Ene-Dic):**
- 📊 Q1 (Ene-Mar) - Q2 (Abr-Jun) - Q3 (Jul-Sep) - Q4 (Oct-Dic)

**Semestres y Años:**
- 📈 Primer Semestre (Ene-Jun) - Segundo Semestre (Jul-Dic)
- 🗓️ Este Año - 🗓️ Año Anterior

**Personalizado:**
- 📅 Selecciona fechas exactas para eventos especiales (Black Friday, lanzamientos, etc)

**Un click = todos los gráficos sincronizados.**

Lee más: [SELECTOR-INTUITIVO.md](./SELECTOR-INTUITIVO.md)

### 🟠 Dropi - Gestión y Flujo de Caja
**El módulo más crítico:**
- ✅ **Entradas**: Lo que Dropi te ha pagado
- ❌ **Salidas**: Lo que Dropi te ha cobrado (devoluciones, comisiones)
- 📦 Pedidos, entregas, devoluciones (3 estados simples)

**Esto es vital** porque muestra el dinero real que se mueve en tu cuenta.

### 🔵 Meta Ads - Métricas Completas
- 💸 Gasto
- 🎯 Presupuesto
- 📈 ROAS
- 💰 CPM
- 👆 CTR
- 🎪 CPA
- 📊 Histórico por periodo

### ⚫ TikTok Ads - Métricas Completas
Mismas métricas que Meta, pero **separado** para análisis independiente.

### 🟢 Shopify - Pedidos Simples
- Solo cantidad de pedidos vs tiempo
- Si necesitas más detalles → ir a Shopify

---

## 🚀 Quick Start

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
# Abre: http://localhost:3000
```

### Producción
```bash
npm run build
```

---

## 📊 Vista del Dashboard

```
┌──────────────────────────────────────────────────────────┐
│  📊 Dashboard Empresarial                                │
│  ⏱️ PERIODO: [ Días | Semanas | Meses | ... ]           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  💎 RENTABILIDAD DEL PERIODO                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Gastos Ads: $15,240  |  Ingresos Dropi: $28,400      │
│  Egresos Dropi: $3,200  |  PROFIT NETO: $9,960 ✨      │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  🟠 DROPI - Flujo de Caja                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  📦 Pedidos: 48 ($28,400)                               │
│  ✅ Entregas: 42 ($24,800)                              │
│  ↩️ Devoluciones: 6 ($3,600)                            │
│                                                          │
│  ✅ Entradas (Pagos)    |    ❌ Salidas (Cargos)       │
│  +$8,400  Pago pedidos  |    -$1,200  Devolución       │
│  +$12,000 Pago pedidos  |    -$800    Comisión         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  🔵 META ADS                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  💸 Gasto: $8,240  |  🎯 ROAS: 3.45x  |  📈 CPM: $12.50│
│  [Gráfico de Gasto y ROAS por periodo]                  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ⚫ TIKTOK ADS                                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  💸 Gasto: $7,000  |  🎯 ROAS: 2.85x  |  📈 CPM: $8.20 │
│  [Gráfico de Gasto y ROAS por periodo]                  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  🟢 SHOPIFY                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  📦 Total Pedidos: 48                                    │
│  [Gráfico de Pedidos por periodo]                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 Integración con APIs

Lee [API-EMPRESARIAL.md](./API-EMPRESARIAL.md) para la documentación completa de integración.

### Datos Requeridos

**Dropi:**
- Historial de cartera (entradas/salidas) ← **CRÍTICO**
- Pedidos por periodo
- Estados: procesando, entregado, devuelto

**Meta Ads:**
- Gasto, impresiones, clicks, conversiones
- Por periodo seleccionado

**TikTok Ads:**
- Mismas métricas que Meta
- Por periodo seleccionado

**Shopify:**
- Cantidad de pedidos por periodo

---

## 📈 Fórmulas Clave

### Profit Neto (La Métrica Reina)
```
Profit Neto = Ingresos Dropi - Egresos Dropi - (Gastos Meta + Gastos TikTok)
```

### ROAS
```
ROAS = Ingresos / Gasto en Ads
```

### CPA
```
CPA = Gasto en Ads / Número de Conversiones
```

### CPM
```
CPM = (Gasto / Impresiones) × 1000
```

### CTR
```
CTR = (Clicks / Impresiones) × 100
```

---

## 🎯 ¿Por Qué Este Dashboard es Diferente?

### Problema de Otros Dashboards:
❌ Mezclan todas las métricas sin contexto  
❌ No muestran el flujo de caja real  
❌ No unifican el análisis temporal  
❌ Requieren ir a 4 plataformas diferentes  

### Solución de Este Dashboard:
✅ **Gráfica Reina** muestra rentabilidad real  
✅ **Entradas/Salidas de Dropi** = dinero real  
✅ **Un periodo = todos los gráficos** sincronizados  
✅ **Todo en un solo lugar**, datos limpios  

---

## 🛠️ Personalización

### Cambiar Colores
```javascript
const theme = {
  accent: '#10b981',     // Verde principal
  danger: '#ef4444',     // Rojo para gastos
  info: '#3b82f6',       // Azul para Meta
  // ... más colores
};
```

### Agregar Nueva Métrica
1. Agregar al estado
2. Obtener datos de la API
3. Crear `<StatCard />` o gráfico
4. Listo 🎉

---

## 📱 Responsive

El dashboard funciona perfectamente en:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px+)
- 📱 Tablet (768px+)
- 📱 Mobile (375px+)

---

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
vercel --prod
```

### Railway
```bash
# Conectar repo de GitHub
# Deploy automático en cada push
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 📂 Estructura del Proyecto

```
dashboard-empresarial/
├── dashboard-empresarial.jsx  # Componente principal
├── package.json              # Dependencias
├── index.html               # HTML
├── main.jsx                 # Entry point
├── index.css                # Estilos
├── vite.config.js           # Config Vite
└── docs/
    ├── API-EMPRESARIAL.md   # API docs
    └── README.md            # Este archivo
```

---

## 🎓 Conceptos Clave

### ¿Qué son las "Entradas" en Dropi?
Son los pagos que Dropi te hace por los pedidos entregados. **Dinero que entra a tu cuenta.**

### ¿Qué son las "Salidas" en Dropi?
Son los cargos que Dropi te cobra: devoluciones, comisiones, penalizaciones. **Dinero que sale de tu cuenta.**

### ¿Por qué es importante el Profit Neto?
Porque te dice si **realmente** estás ganando dinero después de:
- Pagar los ads
- Restar las devoluciones
- Restar las comisiones

Puedes tener muchas ventas pero perder dinero si:
- Gastas demasiado en ads
- Tienes muchas devoluciones
- Los márgenes son bajos

---

## 🔧 Troubleshooting

### El selector de periodo no funciona
- Verifica que `timeframe` se está pasando a la API
- Revisa los logs del servidor

### No muestra datos de Dropi
- Verifica que la herramienta `dropi_get_wallet_transactions` existe
- Chequea las credenciales de Dropi

### Gráficos vacíos
- Revisa que el endpoint está retornando el array `historico`
- Verifica la estructura de datos

---

## 📝 Roadmap

- [ ] Exportar reportes a PDF
- [ ] Alertas de rentabilidad
- [ ] Comparación mes vs mes
- [ ] Predicción de profit
- [ ] Notificaciones push
- [ ] Integración con más plataformas

---

## 🤝 Soporte

**Documentación:**
- [API-EMPRESARIAL.md](./API-EMPRESARIAL.md) - Integración APIs
- [CUSTOMIZE.md](./CUSTOMIZE.md) - Personalización

**¿Problemas?**
1. Revisa los logs del navegador (F12)
2. Verifica las credenciales de APIs
3. Chequea que el Cerebro MCP esté corriendo

---

## 📄 Licencia

MIT - Usa este código como quieras

---

**Creado para negocios serios de dropshipping que necesitan análisis de rentabilidad real** 💰

Conectado a: 🟠 Dropi • 🔵 Meta • ⚫ TikTok • 🟢 Shopify
