# 📚 GUÍA DE INTERPRETACIÓN DE MÉTRICAS

Esta guía te ayuda a entender qué significa cada métrica y cómo usarla para tomar decisiones.

---

## 💎 GRÁFICA REINA - Profit Neto

### ¿Qué es?
**El dinero real que te queda** después de pagar todo.

### Fórmula
```
Profit Neto = Ingresos Dropi - Egresos Dropi - Gastos Ads
```

### Ejemplo Real
```
Ingresos Dropi:  $28,400  (lo que Dropi te pagó)
Egresos Dropi:   -$3,200  (devoluciones + comisiones)
Gastos Ads:      -$15,240 (Meta + TikTok)
─────────────────────────
Profit Neto:     $9,960   ✨
```

### Interpretación

| Profit Neto | Significado | Acción |
|-------------|-------------|--------|
| > $0 | ✅ **Estás ganando dinero** | Escala las campañas que funcionan |
| = $0 | ⚠️ **Break even** | Optimiza para aumentar margen |
| < $0 | ❌ **Estás perdiendo dinero** | URGENTE: Para y analiza |

### Decisiones Basadas en Profit Neto

**Si es positivo pero bajo (<10% de ventas):**
- Reduce gastos en ads poco rentables
- Negocia mejores márgenes con proveedores
- Reduce devoluciones mejorando descripciones

**Si es negativo:**
- **PARA INMEDIATAMENTE** las campañas con ROAS < 2.0
- Analiza por qué hay tantas devoluciones
- Revisa si el CPA es muy alto

---

## 🟠 DROPI - Entradas y Salidas

### Entradas ✅

**¿Qué son?**  
El dinero que Dropi **te paga** por los pedidos entregados.

**Ejemplo:**
```
05/12  +$8,400   Pago pedidos
04/12  +$12,000  Pago pedidos
03/12  +$8,000   Pago pedidos
```

**Interpretación:**
- Más entradas = más pedidos entregados exitosamente
- Entradas crecientes = negocio creciendo
- Entradas cayendo = problema con entregas o ventas

### Salidas ❌

**¿Qué son?**  
El dinero que Dropi **te cobra** por devoluciones, comisiones, etc.

**Ejemplo:**
```
05/12  -$1,200  Devolución
04/12  -$800   Comisión
03/12  -$1,200  Devolución
```

**Interpretación:**
- Muchas salidas = muchas devoluciones (PROBLEMA)
- Salidas > 10% de ingresos = revisar urgente
- Salidas constantes = identificar patrón

### Balance Ideal

| Métrica | Rango Saludable |
|---------|----------------|
| Entradas | Crecimiento mensual |
| Salidas | < 10% de entradas |
| Ratio Salidas/Entradas | < 0.10 |

### Decisiones

**Si salidas > 15% de entradas:**
1. Revisar productos con más devoluciones
2. Mejorar descripciones de productos
3. Validar calidad del proveedor
4. Considerar cambiar producto

**Si entradas cayendo:**
1. ¿Están cayendo las ventas en Shopify?
2. ¿Aumentó el tiempo de entrega?
3. ¿Hay problemas logísticos?

---

## 🔵 META ADS - Métricas

### Gasto 💸

**¿Qué es?**  
Cuánto dinero has gastado en Meta Ads en el periodo.

**Rango Saludable:**
- 30-50% de tus ventas proyectadas

**Decisiones:**
- Si gasto > 60% de ventas → reducir o mejorar ROAS
- Si gasto < 20% de ventas → oportunidad de escalar

### ROAS 📈

**¿Qué es?**  
Return on Ad Spend = Cuánto vendes por cada $1 gastado en ads.

**Fórmula:**
```
ROAS = Ventas / Gasto en Ads
```

**Ejemplo:**
```
Ventas: $30,000
Gasto: $10,000
ROAS = 3.0x (por cada $1 gastado, generas $3 en ventas)
```

**Interpretación:**

| ROAS | Significado | Acción |
|------|-------------|--------|
| > 3.0x | 🚀 **Excelente** | Escala al máximo |
| 2.0-3.0x | ✅ **Bueno** | Mantén y optimiza |
| 1.5-2.0x | ⚠️ **Aceptable** | Mejora urgentemente |
| < 1.5x | ❌ **Malo** | Para o cambia estrategia |

**CRÍTICO:**  
Si ROAS < 2.0x → probablemente estés perdiendo dinero.

### CPA 🎪

**¿Qué es?**  
Cost Per Acquisition = Cuánto te cuesta conseguir un cliente.

**Fórmula:**
```
CPA = Gasto en Ads / Número de Conversiones
```

**Ejemplo:**
```
Gasto: $10,000
Conversiones: 50
CPA = $200 (te cuesta $200 conseguir un cliente)
```

**Interpretación:**

Si tu producto cuesta $240:
- CPA de $200 = $40 de margen bruto → AJUSTADO
- CPA de $150 = $90 de margen bruto → BUENO
- CPA de $250 = -$10 de margen bruto → PERDIENDO

**Decisión:**
- CPA debe ser < 70% del precio del producto
- Si CPA > 80% → para y optimiza

### CPM 💰

**¿Qué es?**  
Cost Per Mille = Cuánto cuesta mostrar tu ad 1,000 veces.

**Interpretación:**

| CPM | Significado |
|-----|-------------|
| < $10 | Muy barato (mercado poco competido) |
| $10-$20 | Normal |
| > $20 | Caro (mercado muy competido) |

**Decisiones:**
- CPM alto → mejora creativos para aumentar CTR
- CPM bajo → escala más agresivamente

### CTR 👆

**¿Qué es?**  
Click Through Rate = % de personas que hacen click en tu ad.

**Fórmula:**
```
CTR = (Clicks / Impresiones) × 100
```

**Interpretación:**

| CTR | Significado | Acción |
|-----|-------------|--------|
| > 3% | 🚀 **Excelente** | Creativos funcionan |
| 2-3% | ✅ **Bueno** | Mantén |
| 1-2% | ⚠️ **Regular** | Mejora creativos |
| < 1% | ❌ **Malo** | Cambia creativos YA |

**Decisiones:**
- CTR bajo → audiencia incorrecta o creativos malos
- CTR alto + ROAS bajo → página de producto mala

---

## ⚫ TIKTOK ADS

### Mismas Métricas, Diferentes Benchmarks

| Métrica | Meta Benchmark | TikTok Benchmark |
|---------|---------------|------------------|
| ROAS | > 2.5x | > 2.0x |
| CPA | < 70% precio | < 75% precio |
| CPM | $10-$20 | $5-$15 |
| CTR | > 2% | > 3% |

**TikTok suele tener:**
- CPM más bajo
- CTR más alto
- ROAS ligeramente menor

---

## 🟢 SHOPIFY - Pedidos

### ¿Qué mide?
Cuántos pedidos recibes en Shopify (antes de ir a Dropi).

### Comparación con Dropi

```
Shopify: 50 pedidos
Dropi Entregas: 42 pedidos
Dropi Devoluciones: 6 pedidos

Tasa de Entrega: 42/50 = 84% ✅
Tasa de Devolución: 6/50 = 12% ⚠️
```

### Tasas Saludables

| Métrica | Rango Saludable |
|---------|----------------|
| Entrega | > 85% |
| Devolución | < 10% |
| Procesando | < 5% |

---

## 📊 ANÁLISIS POR PERIODO

### Días
**Usa para:** Detectar problemas inmediatos  
**Ejemplo:** Campaña de ayer tuvo CPA muy alto

### Semanas
**Usa para:** Tendencias corto plazo  
**Ejemplo:** Esta semana vendimos menos que la anterior

### Meses
**Usa para:** Análisis estratégico  
**Ejemplo:** Noviembre fue mejor que Octubre

### Trimestres
**Usa para:** Decisiones grandes  
**Ejemplo:** Q4 fue 50% mejor que Q3

### Semestres/Años
**Usa para:** Crecimiento del negocio  
**Ejemplo:** 2024 vs 2023

---

## 🎯 ESCENARIOS COMUNES

### Escenario 1: Ventas Altas, Profit Bajo

**Diagnóstico:**
```
Ventas: $50,000 ✅
Gastos Ads: $25,000 ❌ (50%)
Profit: $5,000 ⚠️ (10%)
```

**Problema:** Gastando demasiado en ads

**Solución:**
1. Para campañas con ROAS < 2.5x
2. Aumenta precios 10-15%
3. Optimiza campañas rentables

### Escenario 2: ROAS Alto, Profit Bajo

**Diagnóstico:**
```
ROAS: 3.5x ✅
Devoluciones: 20% ❌
Profit: -$2,000 ❌
```

**Problema:** Demasiadas devoluciones

**Solución:**
1. Revisar productos más devueltos
2. Mejorar descripciones
3. Validar calidad del proveedor

### Escenario 3: Todo Bien, No Escala

**Diagnóstico:**
```
ROAS: 3.2x ✅
CPA: $120 ✅
Profit: $8,000 ✅
Gasto: $5,000 (bajo)
```

**Problema:** No estás escalando

**Solución:**
1. Aumenta presupuesto 20% diario
2. Duplica campañas ganadoras
3. Prueba nuevas audiencias

---

## 💡 TIPS PRO

### Regla del 70/30
- 70% de tu gasto en lo que funciona
- 30% en testear cosas nuevas

### Revisa Diario
- Profit Neto
- CPA
- ROAS

### Revisa Semanal
- Tendencias de ventas
- Devoluciones
- Nuevos productos

### Revisa Mensual
- Comparativa mes vs mes
- ROI total
- Decisiones estratégicas

---

## 🚨 ALERTAS URGENTES

**Para inmediatamente si:**
- Profit Neto negativo > 3 días seguidos
- Devoluciones > 20%
- ROAS < 1.5x en todas las campañas
- CPA > precio del producto

**Optimiza urgente si:**
- Profit Neto < 10% de ventas
- Devoluciones > 15%
- ROAS entre 1.5x - 2.0x
- CTR < 1%

---

## 📈 OBJETIVOS POR ETAPA

### Startup (Mes 1-3)
- Profit Neto: > $0 (break even)
- ROAS: > 2.0x
- Devoluciones: < 15%

### Crecimiento (Mes 4-12)
- Profit Neto: > 15% ventas
- ROAS: > 2.5x
- Devoluciones: < 12%

### Consolidación (Año 2+)
- Profit Neto: > 20% ventas
- ROAS: > 3.0x
- Devoluciones: < 10%

---

**Usa este dashboard para tomar decisiones basadas en datos, no en intuición.** 📊
