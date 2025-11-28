# 💱 Sistema de Conversión de Moneda

Sistema automático de conversión de precios entre USD y múltiples monedas latinoamericanas.

## 📋 Características

- **Conversión automática** de todos los precios en la tienda
- **7 monedas soportadas**: USD, ARS, MXN, CLP, COP, EUR, BRL
- **Sincronización** con los precios base en USD de la página principal
- **Persistencia** de preferencia del usuario (localStorage)
- **Detección automática** de región del usuario

## 🏷️ Precios Base (en USD)

| Plan | Precio USD | Equivalente ARS (aprox) |
|------|------------|-------------------------|
| Identidad Básica | USD 500 | $500,000 ARS |
| Branding Completo | USD 1,250 | $1,250,000 ARS |
| Web One Page | USD 600 | $600,000 ARS |
| Web Multipágina | USD 1,200 | $1,200,000 ARS |
| Marketing Digital | USD 350/mes | $350,000 ARS/mes |
| Presencia Total | USD 2,400 | $2,400,000 ARS |

*Nota: Los precios en la página principal (index.html) están en USD y son la fuente de verdad.*

## 🌐 Actualización Automática de Tasas (API)

El sistema obtiene las tasas de cambio **automáticamente** desde [exchangerate-api.com](https://www.exchangerate-api.com/):

- ✅ **Actualización automática** cada 24 horas
- ✅ **Sin API Key requerida** (plan gratuito)
- ✅ **Cache local** para mejor rendimiento
- ✅ **Fallback** a valores por defecto si la API falla

### Configuración de API

En `js/currency-converter.js`:

```javascript
const API_CONFIG = {
    enabled: true,  // Cambiar a false para desactivar API
    url: 'https://api.exchangerate-api.com/v4/latest/USD',
    cacheKey: 'studioNola_exchangeRates_cache',
    cacheDuration: 24 * 60 * 60 * 1000  // 24 horas
};
```

## 💱 Tasas de Cambio

Las tasas se obtienen automáticamente desde la API. Valores por defecto (fallback):

```javascript
'USD': 1       // Dólar estadounidense (base)
'ARS': 1000    // Peso argentino (actualizado desde API)
'MXN': 17      // Peso mexicano (actualizado desde API)
'CLP': 950     // Peso chileno (actualizado desde API)
'COP': 4300    // Peso colombiano (actualizado desde API)
'EUR': 0.92    // Euro (actualizado desde API)
'BRL': 5.0     // Real brasileño (actualizado desde API)
```

## 🔧 Cómo Actualizar las Tasas de Cambio

### ⭐ Opción 1: Automático (Recomendado - Ya configurado)

**Las tasas se actualizan automáticamente cada 24 horas desde la API.**

No necesitas hacer nada, el sistema lo hace solo. Para forzar actualización:

```javascript
// Desde la consola del navegador (F12)
await CurrencyConverter.refreshRates();
```

O usa el panel de administración: `admin-tasas.html` → botón "🌐 Actualizar desde API"

### Opción 2: Desde el Panel de Administración

1. Abre `admin-tasas.html` en tu navegador
2. Click en "🌐 Actualizar desde API" para obtener tasas frescas
3. O edita manualmente los valores y haz click en "💾 Guardar Tasas"

### Opción 3: Desde la Consola del Navegador

```javascript
// Actualizar desde API
await CurrencyConverter.refreshRates();

// Ver última actualización
CurrencyConverter.getLastUpdate();

// Limpiar cache y forzar nueva descarga
CurrencyConverter.clearCache();
await CurrencyConverter.refreshRates();

// Actualizar una moneda manualmente
CurrencyConverter.updateRate('ARS', 1050);

// Ver tasas actuales
CurrencyConverter.logCurrentRates();
```

### Opción 4: Desactivar API (Usar Tasas Manuales)

1. Abre `js/currency-converter.js`
2. Cambia `API_CONFIG.enabled` a `false`
3. Edita los valores en `EXCHANGE_RATES`
4. Guarda y recarga

## 🎯 Cómo Usar en el HTML

### Precios de Planes (automático)

Los precios se actualizan automáticamente usando el atributo `data-plan`:

```html
<!-- En tienda.html y páginas de planes -->
<div class="plan-price">
    <span data-plan="identidad-basica">USD 500</span>
</div>
```

### Precios Personalizados

Para precios que no son planes estándar:

```html
<span data-price-usd="750">USD 750</span>
```

### Selector de Moneda

El selector se agrega automáticamente en el header:

```html
<select class="currency-selector" aria-label="Seleccionar moneda">
    <!-- Opciones cargadas automáticamente por JS -->
</select>
```

## 📱 Funcionamiento

1. **Detección inicial**: El sistema detecta la región del usuario y selecciona la moneda apropiada
2. **Conversión**: Todos los elementos con `data-plan` o `data-price-usd` se convierten automáticamente
3. **Persistencia**: La elección del usuario se guarda en localStorage
4. **Actualización**: Al cambiar la moneda, todos los precios se actualizan instantáneamente

## 🌍 Detección de Región

El sistema detecta automáticamente la región del usuario:

- `es-AR` → ARS (Peso argentino)
- `es-MX` → MXN (Peso mexicano)
- `es-CL` → CLP (Peso chileno)
- `es-CO` → COP (Peso colombiano)
- `pt-*` → BRL (Real brasileño)
- Otros → USD (por defecto)

## 🔍 API de Consola

Comandos disponibles en la consola del navegador (F12):

```javascript
// === Comandos de API (nuevos) ===

// Actualizar tasas desde API
await CurrencyConverter.refreshRates();

// Ver última actualización
CurrencyConverter.getLastUpdate();
// Retorna: { date, hoursAgo, message }

// Limpiar cache
CurrencyConverter.clearCache();

// Habilitar/deshabilitar API
CurrencyConverter.toggleAPI(true);  // o false

// === Comandos básicos ===

// Ver moneda actual
CurrencyConverter.getCurrentCurrency();

// Cambiar moneda manualmente
CurrencyConverter.changeCurrency('EUR');

// Obtener precio convertido de un plan
CurrencyConverter.getPrice('identidad-basica', 'MXN');

// Ver todas las tasas
CurrencyConverter.getExchangeRates();

// Ver todos los precios base en USD
CurrencyConverter.getBasePrices();

// Actualizar tasa manualmente (sobrescribe API)
CurrencyConverter.updateRate('ARS', 1100);

// Ver tabla de tasas
CurrencyConverter.logCurrentRates();
```

## 📁 Archivos Involucrados

```
STUDIO_NOLA_ATELIER_LANDING/
├── js/
│   └── currency-converter.js          ← Sistema principal
├── tienda.html                        ← Página principal de tienda
└── planes/
    ├── identidad-basica.html         ← Incluye conversor
    ├── branding-completo.html        ← Incluye conversor
    ├── web-one-page.html             ← Incluye conversor
    ├── web-multipagina.html          ← Incluye conversor
    ├── marketing-digital.html        ← Incluye conversor
    └── presencia-total.html          ← Incluye conversor
```

## ✨ Beneficios de la Actualización Automática

✅ **Siempre actualizado**: Tasas reales sin intervención manual  
✅ **Cache inteligente**: Solo consulta API cada 24h, resto usa cache  
✅ **Sin costos**: API gratuita sin límites en el plan básico  
✅ **Fallback automático**: Si la API falla, usa valores por defecto  
✅ **Performance**: Cache local = carga instantánea  

## 📊 Fuente de Datos

**API utilizada**: [exchangerate-api.com](https://www.exchangerate-api.com/)
- Plan gratuito: 1,500 requests/mes
- Datos actualizados diariamente
- Sin necesidad de API key
- Respuesta: < 100ms

## ⚠️ Importante

1. **Los precios base en USD son la fuente de verdad**
2. **Las tasas se actualizan automáticamente** cada 24 horas desde exchangerate-api.com
3. **Cache local**: Las tasas se guardan 24h para mejor performance
4. **Fallback**: Si la API falla, usa los valores por defecto del código
5. Los precios se muestran redondeados (sin decimales para la mayoría de monedas)
6. La preferencia de moneda del usuario se guarda localmente en su navegador

## 🚀 Implementación en Nuevas Páginas

Para agregar el conversor a una nueva página:

1. Incluir el CSS del selector en el `<style>`:
```css
.currency-selector {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--color-white);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
}
```

2. Agregar el selector en el header:
```html
<select class="currency-selector" aria-label="Seleccionar moneda"></select>
```

3. Usar atributos data en los precios:
```html
<span data-plan="nombre-del-plan">USD XXX</span>
```

4. Incluir el script antes del cierre de `</body>`:
```html
<script src="../js/currency-converter.js"></script>
```

## 📞 Soporte

Para dudas o modificaciones, revisar el código en `js/currency-converter.js` que está ampliamente documentado.
