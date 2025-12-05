# 🔧 ACTUALIZAR SERVER.PY CON CORS

## 📄 Archivo Listo

He creado `server.py` con CORS ya configurado para tu dashboard.

**Cambios principales:**

1. ✅ **CORS agregado** para dashboard de Railway
2. ✅ **Endpoint `/api/dashboard-data`** creado
3. ✅ **Estructura de respuesta** lista para conectar
4. ✅ **Localhost** incluido para desarrollo

---

## 🚀 Cómo Subirlo a GitHub

### **Opción 1: Desde GitHub Web** (Más fácil)

1. **Ve a tu repo MCP-Dropshipping en GitHub**
   ```
   https://github.com/AndresestradaR/MCP-Dropshipping
   ```

2. **Busca el archivo `server.py`**
   - Click en el archivo
   - Click en el ícono del lápiz (Edit)

3. **Reemplaza TODO el contenido** con el de este archivo

4. **Commit changes:**
   - Mensaje: `Add CORS for dashboard`
   - Click "Commit changes"

5. **Railway redesplegará automáticamente** ✅

---

### **Opción 2: Desde Git Local** (Si tienes el repo clonado)

```bash
# 1. Abre terminal en la carpeta del repo

# 2. Reemplaza el archivo server.py con el nuevo

# 3. Commit y push
git add server.py
git commit -m "Add CORS for dashboard"
git push
```

Railway redesplegará automáticamente.

---

## 🔍 Verifica Que Funcionó

### **1. Espera el redespliegue** (2-3 minutos)

Ve a Railway → MCP Cerebro → Deployments

### **2. Prueba el endpoint desde tu navegador:**

```
https://web-production-96b67.up.railway.app/
```

Deberías ver:
```json
{
  "status": "online",
  "service": "Super Agente IA - Cerebro",
  "version": "1.0.0"
}
```

### **3. Abre tu dashboard:**

```
https://dashboard-empresarial-mcp-production.up.railway.app
```

Ya **NO** debería haber errores de CORS.

---

## 🎯 Próximo Paso Después

Una vez que CORS funcione, necesitas **implementar las llamadas a MCP** en el endpoint `/api/dashboard-data`.

Busca en el `server.py` la sección que dice:

```python
# TODO: Implementar llamadas a las herramientas MCP
```

Y ahí agregarás:

```python
# Ejemplo:
dropi_wallet = await agent.invoke_tool("dropi_get_wallet_transactions", {
    "start_date": start_date,
    "end_date": end_date
})

meta_insights = await agent.invoke_tool("meta_get_insights", {
    "start_date": start_date,
    "end_date": end_date
})

# etc...
```

Pero **primero** haz funcionar el CORS subiendo este archivo.

---

## ✅ Checklist

- [ ] Descargar `server.py` de outputs
- [ ] Ir a GitHub → MCP-Dropshipping
- [ ] Editar `server.py`
- [ ] Reemplazar contenido
- [ ] Commit changes
- [ ] Esperar redespliegue (2-3 min)
- [ ] Probar dashboard
- [ ] Verificar que no hay error CORS

---

## 🆘 Si Algo Sale Mal

### **Error: "No such file 'server.py'"**
- El archivo puede estar en una subcarpeta
- Busca en `src/server.py` o `backend/server.py`

### **Dashboard sigue con error CORS**
- Espera 5 minutos más (Railway puede tardar)
- Verifica que el deployment terminó (verde en Railway)
- Limpia caché del navegador (Ctrl+Shift+R)

---

**¿Listo?** Descarga el archivo y súbelo a GitHub. Luego me avisas y probamos el dashboard. 🚀
