# 🔌 API EMPRESARIAL - Integración por Plataforma

Este documento explica cómo conectar cada plataforma con el Dashboard Empresarial.

---

## 📡 Endpoint Principal

```
POST /api/dashboard-data
```

### Request Body
```json
{
  "timeframe": "week",  // day, week, month, quarter, semester, year
  "query": "dame datos del periodo: week"
}
```

### Response Estructura
```json
{
  "master": {
    "gastosAds": 15240,
    "ingresosDropi": 28400,
    "egresosDropi": 3200,
    "profitNeto": 9960
  },
  "dropi": {
    "pedidos": { "total": 48, "monto": 28400 },
    "entregas": { "total": 42, "monto": 24800 },
    "devoluciones": { "total": 6, "monto": 3600 },
    "entradas": [...],
    "salidas": [...]
  },
  "meta": {
    "gasto": 8240,
    "presupuesto": 10000,
    "roas": 3.45,
    "cpm": 12.50,
    "ctr": 2.8,
    "cpa": 171.67,
    "historico": [...]
  },
  "tiktok": {
    "gasto": 7000,
    "presupuesto": 8000,
    "roas": 2.85,
    "cpm": 8.20,
    "ctr": 3.2,
    "cpa": 145.83,
    "historico": [...]
  },
  "shopify": {
    "pedidos": 48,
    "historico": [...]
  }
}
```

---

## 🟠 DROPI - Entradas y Salidas

### Datos Necesarios de Dropi

#### 1. Pedidos
```python
dropi_pedidos = await session.call_tool(
    "dropi",
    "dropi_get_pedidos",
    arguments={
        "timeframe": timeframe,
        "estados": ["procesando", "entregado", "devuelto"]
    }
)
```

#### 2. Historial de Cartera (CRÍTICO)
**Esto es lo que viste en el screenshot** - necesitamos las transacciones de entrada y salida.

```python
# Obtener transacciones del historial de cartera
cartera = await session.call_tool(
    "dropi",
    "dropi_get_wallet_transactions",
    arguments={
        "timeframe": timeframe,
        "tipo": "all"  # entradas y salidas
    }
)

# Separar entradas y salidas
entradas = []
salidas = []

for transaction in cartera["transactions"]:
    if transaction["tipo"] == "ENTRADA":
        # Pagos que Dropi te hizo
        entradas.append({
            "fecha": transaction["fecha"],
            "concepto": transaction["descripcion"],
            "monto": transaction["monto"],
            "balance": transaction["balance_previo"]
        })
    elif transaction["tipo"] == "SALIDA":
        # Cargos que Dropi te cobró (devoluciones, comisiones)
        salidas.append({
            "fecha": transaction["fecha"],
            "concepto": transaction["descripcion"],
            "monto": transaction["monto"],
            "balance": transaction["balance_previo"]
        })
```

#### 3. Calcular Totales Dropi
```python
# Total de ingresos (lo que Dropi te pagó)
ingresos_dropi = sum(t["monto"] for t in entradas)

# Total de egresos (lo que Dropi te cobró)
egresos_dropi = abs(sum(t["monto"] for t in salidas))

dropi_data = {
    "pedidos": {
        "total": len(dropi_pedidos),
        "monto": sum(p["total"] for p in dropi_pedidos)
    },
    "entregas": {
        "total": len([p for p in dropi_pedidos if p["estado"] == "entregado"]),
        "monto": sum(p["total"] for p in dropi_pedidos if p["estado"] == "entregado")
    },
    "devoluciones": {
        "total": len([p for p in dropi_pedidos if p["estado"] == "devuelto"]),
        "monto": sum(p["total"] for p in dropi_pedidos if p["estado"] == "devuelto")
    },
    "entradas": entradas[:5],  # Últimas 5
    "salidas": salidas[:5]     # Últimas 5
}
```

---

## 🔵 META ADS - Métricas por Periodo

```python
# Obtener datos de Meta Ads
meta_insights = await session.call_tool(
    "meta",
    "meta_get_insights",
    arguments={
        "timeframe": timeframe,
        "metrics": ["spend", "impressions", "clicks", "conversions"]
    }
)

# Calcular métricas
gasto = meta_insights["spend"]
impresiones = meta_insights["impressions"]
clicks = meta_insights["clicks"]
conversions = meta_insights["conversions"]

meta_data = {
    "gasto": gasto,
    "presupuesto": await get_meta_budget(timeframe),
    "roas": calculate_roas(conversions, gasto),  # ventas / gasto
    "cpm": (gasto / impresiones) * 1000,
    "ctr": (clicks / impresiones) * 100,
    "cpa": gasto / conversions if conversions > 0 else 0,
    "historico": await get_meta_historical(timeframe)
}
```

---

## ⚫ TIKTOK ADS - Métricas por Periodo

```python
# Obtener datos de TikTok Ads
tiktok_insights = await session.call_tool(
    "tiktok",
    "tiktok_get_insights",
    arguments={
        "timeframe": timeframe,
        "metrics": ["spend", "impressions", "clicks", "conversions"]
    }
)

# Calcular métricas (igual que Meta)
tiktok_data = {
    "gasto": tiktok_insights["spend"],
    "presupuesto": await get_tiktok_budget(timeframe),
    "roas": calculate_roas(conversions, gasto),
    "cpm": (gasto / impresiones) * 1000,
    "ctr": (clicks / impresiones) * 100,
    "cpa": gasto / conversions if conversions > 0 else 0,
    "historico": await get_tiktok_historical(timeframe)
}
```

---

## 🟢 SHOPIFY - Pedidos por Periodo

```python
# Obtener pedidos de Shopify
shopify_orders = await session.call_tool(
    "shopify",
    "shopify_get_orders",
    arguments={
        "timeframe": timeframe,
        "status": "any"
    }
)

shopify_data = {
    "pedidos": len(shopify_orders),
    "historico": await get_shopify_historical(timeframe)
}
```

---

## 💎 GRÁFICA REINA - Cálculo de Rentabilidad

```python
# 1. Sumar gastos de todas las plataformas de ads
gastos_ads_total = meta_data["gasto"] + tiktok_data["gasto"]

# 2. Obtener ingresos de Dropi (lo que te pagaron)
ingresos_dropi = sum(t["monto"] for t in entradas)

# 3. Obtener egresos de Dropi (lo que te cobraron)
egresos_dropi = abs(sum(t["monto"] for t in salidas))

# 4. Calcular profit neto
profit_neto = ingresos_dropi - egresos_dropi - gastos_ads_total

master_chart = {
    "gastosAds": gastos_ads_total,
    "ingresosDropi": ingresos_dropi,
    "egresosDropi": egresos_dropi,
    "profitNeto": profit_neto
}
```

---

## ⏱️ Manejo de Timeframes

### Convertir Timeframe a Fechas

```python
from datetime import datetime, timedelta

def get_date_range(timeframe):
    now = datetime.now()
    
    if timeframe == "day":
        # Últimos 7 días
        start = now - timedelta(days=7)
        end = now
        periods = 7
        
    elif timeframe == "week":
        # Últimas 4 semanas
        start = now - timedelta(weeks=4)
        end = now
        periods = 4
        
    elif timeframe == "month":
        # Últimos 12 meses
        start = now - timedelta(days=365)
        end = now
        periods = 12
        
    elif timeframe == "quarter":
        # Últimos 4 trimestres (1 año)
        start = now - timedelta(days=365)
        end = now
        periods = 4
        
    elif timeframe == "semester":
        # Últimos 2 semestres (1 año)
        start = now - timedelta(days=365)
        end = now
        periods = 2
        
    elif timeframe == "year":
        # Últimos 5 años
        start = now - timedelta(days=365*5)
        end = now
        periods = 5
    
    return {
        "start": start.isoformat(),
        "end": end.isoformat(),
        "periods": periods
    }
```

---

## 📊 Datos Históricos

### Generar Array de Periodos

```python
def get_meta_historical(timeframe):
    """Obtener datos históricos de Meta según el timeframe"""
    date_range = get_date_range(timeframe)
    historico = []
    
    # Llamar a Meta por cada periodo
    for i in range(date_range["periods"]):
        # Calcular rango de fechas del periodo
        period_data = await session.call_tool(
            "meta",
            "meta_get_insights_period",
            arguments={
                "start_date": calculate_period_start(i, timeframe),
                "end_date": calculate_period_end(i, timeframe)
            }
        )
        
        historico.append({
            "periodo": f"P{i+1}",  # P1, P2, P3...
            "gasto": period_data["spend"],
            "roas": period_data["roas"]
        })
    
    return historico
```

---

## 🛠️ Implementación Completa en server.py

```python
from fastapi import FastAPI, HTTPException
from datetime import datetime, timedelta

@app.post("/api/dashboard-data")
async def get_dashboard_data(request: dict):
    """
    Endpoint principal del Dashboard Empresarial
    """
    try:
        timeframe = request.get("timeframe", "week")
        date_range = get_date_range(timeframe)
        
        # === DROPI ===
        # 1. Obtener transacciones de cartera
        cartera = await get_dropi_wallet_transactions(
            date_range["start"],
            date_range["end"]
        )
        
        entradas = [t for t in cartera if t["tipo"] == "ENTRADA"]
        salidas = [t for t in cartera if t["tipo"] == "SALIDA"]
        
        ingresos_dropi = sum(t["monto"] for t in entradas)
        egresos_dropi = abs(sum(t["monto"] for t in salidas))
        
        # 2. Obtener pedidos
        pedidos = await get_dropi_pedidos(date_range["start"], date_range["end"])
        
        dropi_data = {
            "pedidos": {
                "total": len(pedidos),
                "monto": sum(p["total"] for p in pedidos)
            },
            "entregas": {
                "total": len([p for p in pedidos if p["estado"] == "entregado"]),
                "monto": sum(p["total"] for p in pedidos if p["estado"] == "entregado")
            },
            "devoluciones": {
                "total": len([p for p in pedidos if p["estado"] == "devuelto"]),
                "monto": sum(p["total"] for p in pedidos if p["estado"] == "devuelto")
            },
            "entradas": entradas[:5],
            "salidas": salidas[:5]
        }
        
        # === META ADS ===
        meta_insights = await get_meta_insights(
            date_range["start"],
            date_range["end"]
        )
        
        meta_data = {
            "gasto": meta_insights["spend"],
            "presupuesto": meta_insights["budget"],
            "roas": meta_insights["roas"],
            "cpm": meta_insights["cpm"],
            "ctr": meta_insights["ctr"],
            "cpa": meta_insights["cpa"],
            "historico": await get_meta_historical(timeframe)
        }
        
        # === TIKTOK ADS ===
        tiktok_insights = await get_tiktok_insights(
            date_range["start"],
            date_range["end"]
        )
        
        tiktok_data = {
            "gasto": tiktok_insights["spend"],
            "presupuesto": tiktok_insights["budget"],
            "roas": tiktok_insights["roas"],
            "cpm": tiktok_insights["cpm"],
            "ctr": tiktok_insights["ctr"],
            "cpa": tiktok_insights["cpa"],
            "historico": await get_tiktok_historical(timeframe)
        }
        
        # === SHOPIFY ===
        shopify_orders = await get_shopify_orders(
            date_range["start"],
            date_range["end"]
        )
        
        shopify_data = {
            "pedidos": len(shopify_orders),
            "historico": await get_shopify_historical(timeframe)
        }
        
        # === GRÁFICA REINA ===
        gastos_ads = meta_data["gasto"] + tiktok_data["gasto"]
        profit_neto = ingresos_dropi - egresos_dropi - gastos_ads
        
        master_chart = {
            "gastosAds": round(gastos_ads, 2),
            "ingresosDropi": round(ingresos_dropi, 2),
            "egresosDropi": round(egresos_dropi, 2),
            "profitNeto": round(profit_neto, 2)
        }
        
        return {
            "master": master_chart,
            "dropi": dropi_data,
            "meta": meta_data,
            "tiktok": tiktok_data,
            "shopify": shopify_data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 🔧 Herramientas MCP Necesarias

### Dropi Server
```python
# Necesitas agregar esta herramienta si no existe
@server.call_tool()
async def dropi_get_wallet_transactions(
    timeframe: str,
    start_date: str,
    end_date: str
) -> dict:
    """
    Obtiene el historial de cartera (entradas y salidas)
    Similar a lo que se ve en Dropi > Historial de Cartera
    """
    # Llamar API de Dropi para obtener transacciones
    response = requests.get(
        f"{DROPI_API_BASE}/wallet/transactions",
        params={
            "start_date": start_date,
            "end_date": end_date
        },
        headers={"Authorization": f"Bearer {DROPI_API_KEY}"}
    )
    
    return response.json()
```

### Meta Server (si no tienes TikTok aún)
```python
@server.call_tool()
async def meta_get_insights(
    start_date: str,
    end_date: str,
    metrics: list
) -> dict:
    """
    Obtiene insights de Meta Ads para un periodo
    """
    # Llamar Graph API de Meta
    # ...
```

---

## 🧪 Testing

### Test del Endpoint

```bash
curl -X POST http://localhost:8000/api/dashboard-data \
  -H "Content-Type: application/json" \
  -d '{
    "timeframe": "week",
    "query": "dame datos de esta semana"
  }'
```

### Response Esperado

```json
{
  "master": {
    "gastosAds": 15240.50,
    "ingresosDropi": 28400.00,
    "egresosDropi": 3200.00,
    "profitNeto": 9959.50
  },
  "dropi": { ... },
  "meta": { ... },
  "tiktok": { ... },
  "shopify": { ... }
}
```

---

## ✅ Checklist de Integración

- [ ] Endpoint `/api/dashboard-data` implementado
- [ ] Herramienta `dropi_get_wallet_transactions` creada
- [ ] Integración con Meta Ads funcionando
- [ ] Integración con TikTok Ads (si aplica)
- [ ] Integración con Shopify funcionando
- [ ] Cálculo de Profit Neto correcto
- [ ] Timeframes funcionando (días, semanas, meses, etc)
- [ ] Datos históricos generándose correctamente
- [ ] CORS configurado para el dashboard
- [ ] Dashboard desplegado y conectado

---

**La clave está en el módulo de Entradas/Salidas de Dropi** - eso te dice exactamente cuánto dinero real está moviendo tu negocio. 💰
