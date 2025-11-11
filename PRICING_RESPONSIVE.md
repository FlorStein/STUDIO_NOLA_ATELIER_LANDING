# Sección Pricing - Sistema de Acordeón Responsive ✅

## 🎯 Nueva Implementación: Acordeón Click-to-Expand

### Comportamiento por Dispositivo

#### 📱 **Mobile y Tablet (< 1024px)**
- **Sistema de Acordeón**: Cada sección se abre/cierra al hacer click
- **Una tabla a la vez**: Solo una sección visible por vez para mejor UX
- **Transiciones suaves**: Animaciones de 0.4s con easing
- **Scroll automático**: Al abrir una sección, scroll suave hacia ella
- **Indicadores visuales**: Flechas ▼/▲ que muestran el estado
- **Altura adaptativa**: Las secciones cerradas ocupan solo 60-70px

#### �️ **Desktop (≥ 1024px)**
- **Sistema horizontal tradicional**: Acordeón horizontal como antes
- **Auto-rotación**: Las secciones cambian automáticamente cada 3.5s
- **Click para fijar**: Al hacer click, se detiene la rotación

### Características del Acordeón

#### ✨ Interacción Mejorada
1. **Click para abrir/cerrar**
   - Primera vez: abre la sección
   - Segunda vez: cierra la sección
   - Al abrir otra: cierra la anterior automáticamente

2. **Transiciones suaves**
   - Apertura: 0.4s cubic-bezier
   - Contenido: fade-in con delay
   - Tablas: animación desde arriba/abajo

3. **Indicadores visuales**
   - **Cerrado**: Flecha hacia abajo (▼)
   - **Abierto**: Flecha hacia arriba (▲)
   - Posicionadas a la derecha del título

4. **Scroll automático**
   - Al abrir, scroll suave hacia la sección
   - Offset de 80px para no quedar pegado al header

### Cambios en los Archivos

#### 1. **pricing.js** - JavaScript Mejorado
```javascript
- Detección de viewport (desktop vs mobile)
- Toggle accordion en mobile/tablet
- Auto-rotación solo en desktop
- Scroll suave al abrir secciones
- Manejo de resize para cambios de viewport
```

#### 2. **pricing.css** - Estilos del Acordeón
```css
- Estados cerrado/abierto bien definidos
- Transiciones suaves (0.4s cubic-bezier)
- Animaciones fadeIn para contenido
- Indicadores de flecha (::after)
- Overflow controlado
- Media queries específicas por breakpoint
```

#### 3. **patches.css** - Mejoras Adicionales
```css
- Transiciones mejoradas
- Prevención de overflow
- Smooth scroll para HTML
- Mejoras de interacción táctil
```

## 📐 Estructura Visual

### Sección Cerrada (Mobile)
```
┌─────────────────────────────────────┐
│  WEB DESIGN                      ▼  │  ← 60px altura
└─────────────────────────────────────┘
```

### Sección Abierta (Mobile)
```
┌─────────────────────────────────────┐
│  WEB DESIGN                      ▲  │
│  ─────────────────────────────────  │
│                                     │
│  [TABLA DE PRECIOS CON SCROLL →]   │
│                                     │
│  Basic   Medium   Advance           │
│  ...     ...      ...               │
│                                     │
└─────────────────────────────────────┘
```

## 🎨 Breakpoints Detallados

| Dispositivo | Altura Cerrada | Altura Abierta | Fuente | Flecha |
|-------------|----------------|----------------|---------|---------|
| **320-480px** | 60px | auto (min 400px) | 0.65rem | 1rem |
| **481-767px** | 65px | auto (min 450px) | 0.75rem | 1.2rem |
| **768-1023px** | 70px | auto (min 500px) | 0.85rem | 1.4rem |
| **1024px+** | Horizontal | 100% | 1rem | N/A |

## 🔧 Cómo Funciona

### Estados del Acordeón

#### Estado Inicial (Mobile)
- Primera sección abierta por defecto
- Resto de secciones cerradas
- Solo títulos visibles

#### Al Hacer Click
1. Si está **cerrado**: 
   - Cierra todas las demás secciones
   - Abre la sección clickeada
   - Scroll suave hacia ella
   - Anima el contenido (fade-in)

2. Si está **abierto**:
   - Cierra la sección
   - Vuelve a altura mínima (60-70px)
   - Oculta tablas con transición

### Animaciones CSS

```css
@keyframes fadeInDown {
  from: opacity: 0, translateY(-10px)
  to: opacity: 1, translateY(0)
}

@keyframes fadeInUp {
  from: opacity: 0, translateY(10px)
  to: opacity: 1, translateY(0)
}
```

## 📱 Experiencia de Usuario

### Ventajas del Nuevo Sistema

1. **✅ Mejor uso del espacio**: Solo una sección visible a la vez
2. **✅ Navegación clara**: Flechas indican estado abierto/cerrado
3. **✅ Menos scroll**: Contenido colapsable reduce desplazamiento
4. **✅ Transiciones suaves**: Experiencia fluida y profesional
5. **✅ Touch-friendly**: Áreas clickeables grandes (60-70px)
6. **✅ Feedback visual**: Animaciones y cambios de estado claros

### Mobile UX Flow

```
Usuario ve la página
    ↓
Ve 4 secciones colapsadas (con títulos)
    ↓
Click en "FOTOGRAFIA" ▼
    ↓
Se cierra "WEB DESIGN" 
Se abre "FOTOGRAFIA" ▲
Scroll automático a la sección
    ↓
Usuario revisa la tabla (scroll horizontal si necesita)
    ↓
Click en "BRANDING" ▼
    ↓
Se cierra "FOTOGRAFIA"
Se abre "BRANDING" ▲
    ↓
...y así sucesivamente
```

## 🎯 Testing Recomendado

### Escenarios a Probar

#### Mobile (320-767px)
- ✅ Abrir y cerrar cada sección
- ✅ Verificar que solo una está abierta a la vez
- ✅ Probar scroll automático
- ✅ Verificar animaciones suaves
- ✅ Probar scroll horizontal en tablas
- ✅ Verificar indicadores de flecha

#### Tablet (768-1023px)
- ✅ Mismo comportamiento que mobile
- ✅ Verificar tamaños de fuente mayores
- ✅ Probar en portrait y landscape

#### Desktop (1024px+)
- ✅ Verificar sistema horizontal
- ✅ Probar auto-rotación
- ✅ Click para detener rotación
- ✅ Hover states

#### Cambio de Viewport
- ✅ Redimensionar ventana de mobile a desktop
- ✅ Redimensionar de desktop a mobile
- ✅ Verificar que cambia el comportamiento correctamente

## 🔍 Detalles Técnicos

### JavaScript

```javascript
// Detección de viewport
var isDesktop = window.innerWidth >= 1024;

// Toggle en mobile
if (clickedFigure.hasClass("on")) {
  clickedFigure.removeClass("on"); // Cerrar
} else {
  $(".hero figure").removeClass("on"); // Cerrar todos
  clickedFigure.addClass("on"); // Abrir este
  // Scroll suave
}

// Manejo de resize
$(window).on('resize', function() {
  // Cambiar comportamiento según nuevo viewport
});
```

### CSS Key Features

```css
/* Transición suave */
.hero figure {
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ocultar contenido cuando cerrado */
.hero figure:not(.on) .tbl-header,
.hero figure:not(.on) .tbl-content {
  display: none !important;
  opacity: 0;
  height: 0;
}

/* Indicadores visuales */
.hero figure:not(.on)::after {
  content: '▼';
}
.hero figure.on::after {
  content: '▲';
}
```

## 📊 Performance

### Optimizaciones Implementadas

1. **CSS Transitions**: Hardware-accelerated
2. **Cubic-bezier easing**: Transiciones naturales
3. **Smooth scroll**: CSS scroll-behavior
4. **Touch optimization**: -webkit-tap-highlight-color
5. **Overflow control**: Prevención de layout shift

## 🎨 Personalización Futura

### Fácil de Ajustar

```css
/* Cambiar velocidad de transición */
transition: height 0.4s ease; /* ← Cambiar 0.4s */

/* Cambiar altura cerrada */
height: 60px; /* ← Ajustar según necesidad */

/* Cambiar indicadores */
content: '▼'; /* ← Cambiar por otro símbolo */
```

## ✅ Resultado Final

- **Desktop**: Sistema horizontal con auto-rotación
- **Mobile/Tablet**: Acordeón vertical con click-to-expand
- **Transiciones**: Suaves y profesionales
- **UX**: Intuitiva con indicadores visuales claros
- **Performance**: Optimizado para todos los dispositivos
- **Responsive**: 100% funcional desde 320px hasta 4K+

---

**¡El sistema de pricing ahora es completamente responsive con un acordeón intuitivo en mobile y tablet!** 🎉
