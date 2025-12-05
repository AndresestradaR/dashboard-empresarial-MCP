# 🎨 GUÍA DE PERSONALIZACIÓN

Personaliza el dashboard según tu marca y necesidades.

---

## 🌈 Cambiar Colores

### Colores del Tema

Edita `dashboard-dropshipping.jsx`, línea ~77:

```javascript
const theme = {
  bg: darkMode ? '#0a0a0a' : '#ffffff',
  card: darkMode ? '#141414' : '#f5f5f5',
  text: darkMode ? '#ffffff' : '#000000',
  textMuted: darkMode ? '#888888' : '#666666',
  border: darkMode ? '#222222' : '#e0e0e0',
  
  // 🎯 PERSONALIZA ESTOS:
  accent: '#10b981',      // Verde - Color principal
  accentDark: '#059669',  // Verde oscuro
  danger: '#ef4444',      // Rojo - Para gastos
  warning: '#f59e0b',     // Naranja - Para alertas
  info: '#3b82f6'        // Azul - Para info
};
```

### Ejemplos de Paletas

**Morado moderno:**
```javascript
accent: '#8b5cf6',
accentDark: '#7c3aed',
danger: '#ef4444',
warning: '#f59e0b',
info: '#06b6d4'
```

**Azul corporativo:**
```javascript
accent: '#3b82f6',
accentDark: '#2563eb',
danger: '#dc2626',
warning: '#ea580c',
info: '#0891b2'
```

**Rojo agresivo:**
```javascript
accent: '#ef4444',
accentDark: '#dc2626',
danger: '#991b1b',
warning: '#f59e0b',
info: '#3b82f6'
```

---

## 📝 Cambiar Textos

### Título del Dashboard

```javascript
<h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
  Tu Nombre Aquí 🚀  {/* Cambia esto */}
</h1>
<p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.textMuted }}>
  Tu Slogan o Descripción  {/* Y esto */}
</p>
```

### Iconos de Métricas

Cambia los emojis en los `MetricCard`:

```javascript
<MetricCard
  icon="🎯"  // Cambia este emoji
  title="Tu Métrica"
  value="$1,234"
/>
```

**Sugerencias de emojis:**
- 💰 💵 💸 💴 💶 💷 (Dinero)
- 📊 📈 📉 📆 (Gráficos)
- 🎯 🎪 ⚡ 🔥 (Metas)
- 📦 🚚 📮 🎁 (Pedidos)
- 👥 🛍️ 🏪 🏬 (Clientes)
- ✨ 🌟 ⭐ 🚀 (Éxito)

---

## 📊 Agregar Nuevas Métricas

### Paso 1: Agregar al Estado

```javascript
const [metrics, setMetrics] = useState({
  ventasHoy: 0,
  gastosHoy: 0,
  pedidosHoy: 0,
  cpa: 0,
  roas: 0,
  profit: 0,
  
  // 🆕 Nuevas métricas
  aov: 0,           // Average Order Value
  conversionRate: 0, // Tasa de conversión
  satisfaccion: 0    // Satisfacción del cliente
});
```

### Paso 2: Agregar Tarjeta

```javascript
<MetricCard
  icon="💎"
  title="AOV (Ticket Promedio)"
  value={`$${metrics.aov.toFixed(2)}`}
  subtitle="vs $180 mes pasado"
  trend={1}
/>
```

---

## 📈 Personalizar Gráficos

### Cambiar Colores de Gráficos

```javascript
<Bar dataKey="ventas" fill="#10b981" name="Ventas" />
<Bar dataKey="gastos" fill="#ef4444" name="Gastos" />

// Cambia los valores fill="#COLOR"
```

### Agregar Nuevo Gráfico

```javascript
// Gráfico de Pizza para distribución de productos
<div style={{ background: theme.card, borderRadius: '16px', padding: '24px' }}>
  <h3>🍕 Productos Más Vendidos</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={[
          { name: 'Magnesium', value: 40 },
          { name: 'Keratina', value: 30 },
          { name: 'Bundle', value: 30 }
        ]}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill={theme.accent}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
```

---

## 🔔 Agregar Notificaciones

### Notificación de Meta Alcanzada

```javascript
// Al inicio del componente
const [showNotification, setShowNotification] = useState(false);

// Dentro del useEffect o loadDashboardData
if (metrics.ventasHoy > 3000) {
  setShowNotification(true);
  setTimeout(() => setShowNotification(false), 5000);
}

// En el render
{showNotification && (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: theme.accent,
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    zIndex: 1000
  }}>
    🎉 ¡Meta del día alcanzada! $3,000+
  </div>
)}
```

---

## 📱 Agregar Filtros de Fecha

```javascript
const [dateFilter, setDateFilter] = useState('today');

// Botones de filtro
<div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
  {['today', 'week', 'month'].map(filter => (
    <button
      key={filter}
      onClick={() => setDateFilter(filter)}
      style={{
        background: dateFilter === filter ? theme.accent : theme.card,
        color: dateFilter === filter ? 'white' : theme.text,
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer'
      }}
    >
      {filter === 'today' ? 'Hoy' : filter === 'week' ? 'Semana' : 'Mes'}
    </button>
  ))}
</div>
```

---

## 🎯 Agregar Metas y Progreso

```javascript
const ProgressBar = ({ current, goal, label }) => {
  const percentage = (current / goal) * 100;
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '14px'
      }}>
        <span>{label}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: theme.border,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.min(percentage, 100)}%`,
          height: '100%',
          background: percentage >= 100 ? theme.accent : theme.warning,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
};

// Uso
<ProgressBar 
  current={metrics.ventasHoy} 
  goal={3000} 
  label="Meta de Ventas Diaria"
/>
```

---

## 🖼️ Cambiar Fuente

### Opción A: Usar Google Fonts

En `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body {
  font-family: 'Poppins', -apple-system, sans-serif;
}
```

### Opción B: Fuentes Alternativas

**Moderna y elegante:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Profesional:**
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
```

**Creativa:**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
```

---

## 🌟 Agregar Animaciones

### Entrada Suave

```javascript
<div style={{
  animation: 'fadeIn 0.5s ease-in',
  ...otherStyles
}}>
  {/* Contenido */}
</div>

// Agregar en index.css:
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Hover Effect en Tarjetas

```javascript
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'scale(1.05)';
  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'scale(1)';
  e.currentTarget.style.boxShadow = 'none';
}}
```

---

## 🎨 Temas Predefinidos

### Tema Oscuro Neón

```javascript
const theme = {
  bg: '#000000',
  card: '#111111',
  text: '#00ff88',
  textMuted: '#00aa66',
  border: '#00ff8844',
  accent: '#00ff88',
  danger: '#ff0066',
  warning: '#ffaa00',
  info: '#00aaff'
};
```

### Tema Claro Minimalista

```javascript
const theme = {
  bg: '#fafafa',
  card: '#ffffff',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  border: '#e5e7eb',
  accent: '#2563eb',
  danger: '#dc2626',
  warning: '#f59e0b',
  info: '#0891b2'
};
```

---

## 💾 Guardar Preferencias

```javascript
// Guardar dark mode en localStorage
useEffect(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    setDarkMode(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);
```

---

## 📤 Exportar a PDF

```javascript
const exportPDF = () => {
  window.print(); // Usa el diálogo de impresión del navegador
};

// Agregar botón
<button onClick={exportPDF}>
  📄 Exportar PDF
</button>

// Agregar en index.css para impresión
@media print {
  button { display: none; }
  .no-print { display: none; }
}
```

---

## 🎯 Tips Finales

1. **Mantén la consistencia** - Usa los mismos espaciados y bordes
2. **No satures** - Menos es más en dashboards
3. **Prioriza la info importante** - Las métricas clave arriba
4. **Usa animaciones sutiles** - No exageres con movimientos
5. **Prueba en móvil** - El dashboard debe verse bien en todos los tamaños

---

**¿Necesitas más ideas?**

Inspírate en:
- Stripe Dashboard
- Shopify Analytics
- Google Analytics
- Mixpanel
- Amplitude

Toma lo que te guste y adáptalo a tu estilo. 🎨
