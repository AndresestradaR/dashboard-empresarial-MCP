# 🚀 INICIO RÁPIDO - Dashboard Empresarial

¡Felicidades! Tienes un dashboard profesional de análisis de rentabilidad. Esta guía te ayuda a ponerlo en marcha en minutos.

---

## 📦 ¿Qué Tengo?

Tienes **2 dashboards** disponibles:

### 1️⃣ Dashboard Básico (`dashboard-dropshipping.jsx`)
**Para empezar rápido**
- Métricas generales
- Gráficos simples
- Ideal para testear

### 2️⃣ Dashboard Empresarial (`dashboard-empresarial.jsx`) ⭐ **RECOMENDADO**
**Para análisis profesional**
- Separado por plataforma (Dropi, Meta, TikTok, Shopify)
- Gráfica Reina de Rentabilidad
- **Selector intuitivo:** Botones claros (Hoy, Ayer, Últimos 7 Días, Q1-Q4, etc)
- Entradas/Salidas de Dropi (CRÍTICO)

---

## ⚡ Setup en 5 Minutos

### Paso 1: Elegir Dashboard

**Usa Dashboard Empresarial** (es lo que necesitas)

### Paso 2: Reemplazar main.jsx

Abre `main.jsx` y cambia:
```javascript
// De:
import Dashboard from './dashboard-dropshipping.jsx'

// A:
import Dashboard from './dashboard-empresarial.jsx'
```

### Paso 3: Instalar

```bash
npm install
```

### Paso 4: Correr

```bash
npm run dev
```

### Paso 5: Abrir

```
http://localhost:3000
```

**¡Listo!** 🎉 Verás el dashboard con datos de ejemplo.

---

## 🔌 Conectar Datos Reales (10 minutos)

### Prioridad 1: Dropi Wallet (CRÍTICO)

**Lee:** [DROPI-WALLET.md](./DROPI-WALLET.md)

1. Obtén API Key de Dropi
2. Implementa herramienta `dropi_get_wallet_transactions`
3. Agrega variable `DROPI_API_KEY` en Railway
4. Redeploy Server Dropi

**Sin esto no puedes calcular Profit Neto.**

### Prioridad 2: Endpoint del Cerebro

**Lee:** [API-EMPRESARIAL.md](./API-EMPRESARIAL.md)

1. Implementa endpoint `/api/dashboard-data` en `server.py`
2. Conecta con servidores MCP (Dropi, Meta, TikTok, Shopify)
3. Retorna estructura correcta
4. Redeploy Cerebro

### Prioridad 3: Actualizar URL

En `dashboard-empresarial.jsx`, línea 10:
```javascript
const API_BASE = 'https://TU-CEREBRO.railway.app';
```

Reemplaza con tu URL del Cerebro.

---

## 🚀 Desplegar en Vercel (5 minutos)

### Opción A: Desde GitHub (Recomendado)

```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Dashboard empresarial"
git push -u origin main

# 2. Ve a vercel.com/new
# 3. Importa tu repo
# 4. Deploy automático
```

### Opción B: CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

**URL resultante:** `https://tu-dashboard.vercel.app`

---

## 📊 Entender las Métricas

**Lee:** [METRICAS.md](./METRICAS.md)

Guía completa de:
- Qué significa cada métrica
- Cómo interpretarla
- Qué decisiones tomar

**Métricas clave:**
- 💎 Profit Neto (la reina)
- ✅ Entradas Dropi (ingresos reales)
- ❌ Salidas Dropi (egresos reales)
- 📈 ROAS (rentabilidad de ads)
- 🎪 CPA (costo por cliente)

---

## 🎨 Personalizar

**Lee:** [CUSTOMIZE.md](./CUSTOMIZE.md)

- Cambiar colores
- Agregar métricas
- Modificar gráficos
- Cambiar fuentes

---

## 📚 Documentación Completa

| Archivo | Descripción |
|---------|-------------|
| [README-EMPRESARIAL.md](./README-EMPRESARIAL.md) | Documentación completa del dashboard |
| [API-EMPRESARIAL.md](./API-EMPRESARIAL.md) | Cómo conectar todas las APIs |
| [DROPI-WALLET.md](./DROPI-WALLET.md) | Implementar módulo de Dropi (CRÍTICO) |
| [SELECTOR-INTUITIVO.md](./SELECTOR-INTUITIVO.md) | ⭐ Nuevo selector de fechas claro |
| [METRICAS.md](./METRICAS.md) | Guía de interpretación de métricas |
| [CUSTOMIZE.md](./CUSTOMIZE.md) | Personalización del dashboard |
| [DEPLOY.md](./DEPLOY.md) | Guías de despliegue |

---

## 🎯 Roadmap Sugerido

### Semana 1: MVP
- [ ] Dashboard corriendo localmente
- [ ] Datos mock funcionando
- [ ] Familiarizado con las métricas

### Semana 2: Integraciones
- [ ] Dropi Wallet implementado
- [ ] Endpoint del Cerebro funcionando
- [ ] Datos reales mostrándose

### Semana 3: Producción
- [ ] Dashboard desplegado en Vercel
- [ ] Todas las plataformas conectadas
- [ ] Usando diariamente para decisiones

### Mes 2+: Optimización
- [ ] Dashboard personalizado a tu marca
- [ ] Alertas configuradas
- [ ] Reportes automatizados

---

## 🚨 Problemas Comunes

### 1. Dashboard en blanco
- Revisa console del navegador (F12)
- Verifica que `npm install` funcionó
- Asegúrate que usas el dashboard correcto en main.jsx

### 2. Datos no cargan
- Verifica URL del API_BASE
- Chequea que el Cerebro esté corriendo
- Revisa CORS en el servidor

### 3. Error 401 en Dropi
- API Key incorrecta
- Regenera la key en Dropi
- Actualiza variable en Railway

### 4. Gráficos vacíos
- Verifica estructura de datos en response
- Chequea que `historico` sea un array
- Revisa logs del servidor

---

## 💡 Tips Pro

### Usa el Selector Temporal
Cambia entre días/semanas/meses para diferentes análisis:
- **Días**: Para detectar problemas inmediatos
- **Semanas**: Para tendencias corto plazo
- **Meses**: Para análisis estratégico

### Revisa el Profit Neto Diario
Es la métrica más importante. Si es negativo > 3 días, **para todo** y analiza.

### Compara Plataformas
Meta vs TikTok: ¿Cuál tiene mejor ROAS? ¿Dónde invertir más?

### Monitorea Devoluciones
Si >15%, hay un problema con el producto o las expectativas.

---

## 🎊 ¡Listo para Empezar!

Tienes todo lo que necesitas:
1. ✅ Dashboard profesional
2. ✅ Documentación completa
3. ✅ Guías de implementación
4. ✅ Guías de interpretación

**Próximo paso:** Abre el dashboard localmente y explóralo. Luego conecta las APIs una por una.

---

## 🆘 ¿Necesitas Ayuda?

1. **Lee primero:** La documentación tiene casi todas las respuestas
2. **Revisa logs:** Navegador (F12) y servidor (Railway)
3. **Verifica APIs:** Asegúrate que las credenciales funcionan

---

**Recuerda: Este dashboard está diseñado para **negocios serios** que quieren tomar **decisiones basadas en datos**.** 📊💰

No es solo "ver números bonitos" - es **entender si estás ganando o perdiendo dinero**, y **qué hacer al respecto**.

---

¡Éxito! 🚀
