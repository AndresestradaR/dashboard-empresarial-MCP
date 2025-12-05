# 🟠 IMPLEMENTACIÓN SERVIDOR DROPI

Esta guía te ayuda a implementar la herramienta **más crítica** del dashboard: el historial de cartera (wallet) de Dropi.

---

## 🎯 ¿Por Qué Es Tan Importante?

El historial de cartera de Dropi muestra el **dinero real** que se mueve:
- ✅ **Entradas**: Lo que Dropi te paga (tus ingresos reales)
- ❌ **Salidas**: Lo que Dropi te cobra (devoluciones, comisiones)

Sin esto, no sabes si realmente estás ganando dinero.

---

## 📡 API de Dropi - Historial de Cartera

### Endpoint (Ejemplo)
```
GET https://api.dropi.co/v1/wallet/transactions
```

### Parámetros
```json
{
  "start_date": "2024-12-01",
  "end_date": "2024-12-31",
  "type": "all"  // o "entrada" o "salida"
}
```

### Response Esperado
```json
{
  "transactions": [
    {
      "id": "153588730",
      "fecha": "05/12/2025",
      "tipo": "SALIDA",
      "concepto": "SALIDA POR PETICION DE RETIRO DE SALDO EN CARTERA",
      "monto": -150000,
      "balance_previo": 3257262,
      "balance_actual": 3107262
    },
    {
      "id": "153584195",
      "fecha": "05/12/2025",
      "tipo": "ENTRADA",
      "concepto": "PAGO POR COMISION DE REFERIDOS. ORDEN ID +58446030",
      "monto": 1000,
      "balance_previo": 3256262,
      "balance_actual": 3257262
    }
  ],
  "balance_actual": 3107262,
  "total_entradas": 28400,
  "total_salidas": -3200
}
```

---

## 🛠️ Implementación en dropi_server.py

### Paso 1: Agregar la Herramienta

```python
from mcp.server.fastmcp import FastMCP
import requests
from datetime import datetime, timedelta

mcp = FastMCP("Dropi Server")

@mcp.tool()
def dropi_get_wallet_transactions(
    start_date: str = "",
    end_date: str = "",
    transaction_type: str = "all"
) -> dict:
    """
    Obtiene el historial de transacciones de la cartera de Dropi.
    
    Args:
        start_date: Fecha de inicio (YYYY-MM-DD). Default: hace 30 días
        end_date: Fecha de fin (YYYY-MM-DD). Default: hoy
        transaction_type: Tipo de transacción (all, entrada, salida)
    
    Returns:
        {
            "transactions": [...],
            "balance_actual": 3107262,
            "total_entradas": 28400,
            "total_salidas": -3200,
            "periodo": {
                "start": "2024-12-01",
                "end": "2024-12-31"
            }
        }
    """
    
    # Fechas por defecto
    if not end_date:
        end_date = datetime.now().strftime("%Y-%m-%d")
    if not start_date:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    
    # Headers de autenticación
    headers = {
        "Authorization": f"Bearer {DROPI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Parámetros
    params = {
        "start_date": start_date,
        "end_date": end_date
    }
    
    if transaction_type != "all":
        params["type"] = transaction_type
    
    # Llamar API de Dropi
    try:
        response = requests.get(
            f"{DROPI_API_BASE}/wallet/transactions",
            headers=headers,
            params=params,
            timeout=30
        )
        
        response.raise_for_status()
        data = response.json()
        
        # Procesar transacciones
        transactions = data.get("transactions", [])
        
        # Separar entradas y salidas
        entradas = []
        salidas = []
        total_entradas = 0
        total_salidas = 0
        
        for tx in transactions:
            tx_formatted = {
                "id": tx["id"],
                "fecha": tx["fecha"],
                "concepto": tx["concepto"],
                "monto": tx["monto"],
                "balance": tx["balance_actual"]
            }
            
            if tx["tipo"] == "ENTRADA" or tx["monto"] > 0:
                entradas.append(tx_formatted)
                total_entradas += abs(tx["monto"])
            else:
                salidas.append(tx_formatted)
                total_salidas += abs(tx["monto"])
        
        return {
            "transactions": transactions,
            "entradas": entradas,
            "salidas": salidas,
            "balance_actual": data.get("balance_actual", 0),
            "total_entradas": total_entradas,
            "total_salidas": total_salidas,
            "periodo": {
                "start": start_date,
                "end": end_date
            }
        }
        
    except requests.exceptions.RequestException as e:
        return {
            "error": str(e),
            "transactions": [],
            "entradas": [],
            "salidas": [],
            "balance_actual": 0,
            "total_entradas": 0,
            "total_salidas": 0
        }
```

### Paso 2: Agregar Variables de Entorno

En Railway, agrega:
```bash
DROPI_API_KEY=tu_api_key_de_dropi
DROPI_API_BASE=https://api.dropi.co/v1
```

### Paso 3: Cargar Variables

En `dropi_server.py`:
```python
import os
from dotenv import load_dotenv

load_dotenv()

DROPI_API_KEY = os.getenv("DROPI_API_KEY")
DROPI_API_BASE = os.getenv("DROPI_API_BASE", "https://api.dropi.co/v1")

if not DROPI_API_KEY:
    raise ValueError("DROPI_API_KEY no está configurado")
```

---

## 🔍 Obtener API Key de Dropi

### Opción 1: Panel de Dropi

1. Login en [dropi.co](https://dropi.co)
2. Ve a **Configuraciones** → **Integraciones**
3. Busca "API Key" o "Token de Acceso"
4. Copia la key

### Opción 2: Inspeccionar Requests

Si no hay API Key visible:

1. Abre Dropi en Chrome
2. Presiona F12 (DevTools)
3. Ve a **Network** tab
4. Navega a "Historial de Cartera"
5. Busca la request a `/wallet` o `/transactions`
6. Copia el token del header `Authorization`

**Ejemplo:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🧪 Testing

### Test 1: Verificar Conexión

```bash
# Desde el server Dropi
curl http://localhost:3000/health
```

Debería responder:
```json
{
  "status": "ok",
  "tools": ["dropi_get_wallet_transactions", ...]
}
```

### Test 2: Llamar Herramienta

```bash
curl -X POST http://localhost:3000/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "dropi_get_wallet_transactions",
    "arguments": {
      "start_date": "2024-12-01",
      "end_date": "2024-12-31"
    }
  }'
```

Debería responder con transacciones.

### Test 3: Desde el Cerebro

En `server.py`:
```python
# Test manual
result = await session.call_tool(
    "dropi",
    "dropi_get_wallet_transactions",
    arguments={
        "start_date": "2024-12-01",
        "end_date": "2024-12-31"
    }
)

print(f"Balance actual: ${result['balance_actual']:,}")
print(f"Entradas: ${result['total_entradas']:,}")
print(f"Salidas: ${result['total_salidas']:,}")
```

---

## 📊 Usar en el Dashboard

Una vez implementado, el Cerebro puede llamar:

```python
# En el endpoint /api/dashboard-data
cartera = await session.call_tool(
    "dropi",
    "dropi_get_wallet_transactions",
    arguments={
        "start_date": date_range["start"],
        "end_date": date_range["end"]
    }
)

# Datos listos para el dashboard
dropi_data = {
    "entradas": cartera["entradas"][:5],  # Últimas 5
    "salidas": cartera["salidas"][:5],    # Últimas 5
    "ingresos_total": cartera["total_entradas"],
    "egresos_total": cartera["total_salidas"],
    "balance": cartera["balance_actual"]
}
```

---

## 🚨 Troubleshooting

### Error: "401 Unauthorized"

**Causa:** API Key incorrecta o expirada

**Solución:**
1. Verifica `DROPI_API_KEY` en Railway
2. Genera nueva API Key en Dropi
3. Actualiza la variable y redeploy

### Error: "404 Not Found"

**Causa:** Endpoint incorrecto

**Solución:**
1. Inspecciona las requests en Chrome DevTools
2. Verifica la URL correcta de la API
3. Actualiza `DROPI_API_BASE`

### Error: "Timeout"

**Causa:** API de Dropi lenta

**Solución:**
1. Aumenta timeout a 60 segundos
2. Reduce el rango de fechas
3. Implementa caché (ver abajo)

### No Hay Transacciones

**Causa:** Fechas incorrectas o formato

**Solución:**
1. Verifica formato: `YYYY-MM-DD`
2. Asegúrate que hay transacciones en ese rango
3. Prueba con `start_date` más antiguo

---

## ⚡ Optimizaciones

### 1. Caché de Transacciones

```python
from functools import lru_cache
from datetime import datetime

@lru_cache(maxsize=100)
def get_cached_transactions(start_date, end_date):
    """Cache por 5 minutos"""
    return dropi_get_wallet_transactions(start_date, end_date)

# Invalidar caché cada 5 minutos
import threading
def clear_cache():
    get_cached_transactions.cache_clear()
    threading.Timer(300, clear_cache).start()

clear_cache()
```

### 2. Paginación

Si hay muchas transacciones:
```python
def dropi_get_wallet_transactions(
    start_date: str,
    end_date: str,
    page: int = 1,
    per_page: int = 50
) -> dict:
    params = {
        "start_date": start_date,
        "end_date": end_date,
        "page": page,
        "per_page": per_page
    }
    # ...
```

### 3. Rate Limiting

```python
import time
from functools import wraps

last_request = 0
MIN_INTERVAL = 1  # 1 segundo entre requests

def rate_limit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        global last_request
        now = time.time()
        if now - last_request < MIN_INTERVAL:
            time.sleep(MIN_INTERVAL - (now - last_request))
        last_request = time.time()
        return func(*args, **kwargs)
    return wrapper

@rate_limit
def dropi_get_wallet_transactions(...):
    # ...
```

---

## 📈 Datos de Ejemplo

Si no tienes acceso a la API aún, usa datos mock:

```python
def dropi_get_wallet_transactions_mock(start_date, end_date):
    """Mock data para testing"""
    return {
        "entradas": [
            {"fecha": "05/12", "concepto": "Pago pedidos", "monto": 8400, "balance": 3257262},
            {"fecha": "04/12", "concepto": "Pago pedidos", "monto": 12000, "balance": 3248862},
            {"fecha": "03/12", "concepto": "Pago pedidos", "monto": 8000, "balance": 3236862}
        ],
        "salidas": [
            {"fecha": "05/12", "concepto": "Devolución", "monto": -1200, "balance": 3256062},
            {"fecha": "04/12", "concepto": "Comisión", "monto": -800, "balance": 3248062},
            {"fecha": "03/12", "concepto": "Devolución", "monto": -1200, "balance": 3236062}
        ],
        "balance_actual": 3107262,
        "total_entradas": 28400,
        "total_salidas": 3200
    }
```

---

## ✅ Checklist de Implementación

- [ ] API Key de Dropi obtenida
- [ ] Variable `DROPI_API_KEY` configurada en Railway
- [ ] Herramienta `dropi_get_wallet_transactions` implementada
- [ ] Test desde server Dropi (200 OK)
- [ ] Test desde Cerebro (datos correctos)
- [ ] Dashboard mostrando entradas/salidas
- [ ] Profit Neto calculándose correctamente
- [ ] Caché implementado (opcional)
- [ ] Documentación actualizada

---

## 🎯 Próximo Paso

Una vez que esto funcione, tendrás **la métrica más importante de tu negocio**: el **Profit Neto Real**.

Todo lo demás (ROAS, CPA, etc) son métricas intermedias. Pero el Profit Neto es lo único que importa al final del día.

---

**Esta implementación es CRÍTICA. Sin ella, el dashboard no puede calcular rentabilidad real.** 💰
