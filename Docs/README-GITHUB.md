# 📊 Dashboard Empresarial MCP

Dashboard profesional para análisis de dropshipping conectado al ecosistema MCP.

![React](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![Status](https://img.shields.io/badge/status-active-success)

## 🎯 Overview

Dashboard React que unifica métricas de **Dropi**, **Meta Ads**, **TikTok Ads** y **Shopify** para análisis integral de rentabilidad.

### ✨ Características Principales

- 💎 **Gráfica Reina** - Profit Neto Real (Ingresos - Egresos - Gastos Ads)
- 🟠 **Dropi** - Entradas/Salidas (flujo de caja real)
- 🔵 **Meta Ads** - ROAS, CPA, CPM, CTR
- ⚫ **TikTok Ads** - Métricas separadas
- 🟢 **Shopify** - Análisis de pedidos
- ⏱️ **Selector Intuitivo** - Hoy, Ayer, Últimos 7 días, Q1-Q4, Semestres
- 🌓 **Dark/Light Mode**
- 📱 **100% Responsive**

## 🚀 Quick Start

```bash
# Clonar
git clone https://github.com/AndresestradaR/dashboard-empresarial-MCP.git

# Instalar
cd dashboard-empresarial-MCP
npm install

# Correr
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📦 Stack

- React 18.2
- Recharts 2.10
- Vite 5.0

## 📖 Documentación

Ver carpeta [Docs/](Docs/):

- [START.md](Docs/START.md) - Inicio rápido
- [SELECTOR-INTUITIVO.md](Docs/SELECTOR-INTUITIVO.md) - Selector de fechas
- [API-EMPRESARIAL.md](Docs/API-EMPRESARIAL.md) - Integración APIs
- [DROPI-WALLET.md](Docs/DROPI-WALLET.md) - Módulo Dropi

## 🚀 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AndresestradaR/dashboard-empresarial-MCP)

O manualmente:

```bash
npm i -g vercel
vercel
```

## 🔗 Backend

Se conecta con [MCP-Dropshipping](https://github.com/AndresestradaR/MCP-Dropshipping)

Configura CORS en tu backend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tu-dashboard.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 👤 Autor

**Andres Estrada**
- GitHub: [@AndresestradaR](https://github.com/AndresestradaR)

---

Conectado a: Dropi • Meta Ads • TikTok Ads • Shopify 🚀
