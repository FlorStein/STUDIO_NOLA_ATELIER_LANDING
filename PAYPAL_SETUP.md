# 💳 Guía de Configuración de PayPal

## 🚀 Configuración Rápida (5 minutos)

### Paso 1: Configurar PayPal.me

1. **Inicia sesión en PayPal**: https://www.paypal.com
2. **Ve a tu perfil** → Click en el ícono de configuración ⚙️
3. **Busca "PayPal.me"** en el menú
4. **Crea tu enlace personalizado**: `paypal.me/tu-nombre-de-negocio`
5. **Guarda tu enlace**

### Paso 2: Actualizar el Código

Abre el archivo: `js/paypal-integration.js`

Busca la línea 73 y reemplaza con tu enlace:

```javascript
// ANTES:
paypalUrl = `https://www.paypal.me/studionolaatelier/${finalPrice}${finalCurrency}`;

// DESPUÉS (reemplaza "tu-nombre-de-negocio"):
paypalUrl = `https://www.paypal.me/tu-nombre-de-negocio/${finalPrice}${finalCurrency}`;
```

**Ejemplo real:**
```javascript
paypalUrl = `https://www.paypal.me/studionolaatelier/${finalPrice}${finalCurrency}`;
```

### Paso 3: Actualizar Email de Contacto

En la línea 13 del mismo archivo:

```javascript
paypalEmail: 'tu-email@paypal.com',  // ← Cambiar por tu email de PayPal
```

### Paso 4: Probar

1. Abre `tienda.html` en tu navegador
2. Click en "Pagar con PayPal" en cualquier plan
3. Verifica que el modal se abra correctamente
4. Click en "Continuar a PayPal"
5. Deberías ver tu página de PayPal.me

---

## ✅ ¡Listo! Ya está funcionando

El sistema funciona con **PayPal.me** que es:
- ✅ Gratuito
- ✅ Sin configuración técnica compleja
- ✅ Acepta cualquier método de pago (tarjetas, PayPal balance, etc.)
- ✅ Protección automática al comprador
- ✅ Funciona en cualquier país

---

## 🔧 Configuración Avanzada (Opcional)

### Para Suscripciones Mensuales

Las suscripciones mensuales (planes de marketing) requieren configuración adicional:

1. **Ir a PayPal Dashboard**: https://www.paypal.com/businessmanage/
2. **Productos y Servicios** → "Crear plan de suscripción"
3. **Configurar cada plan**:
   - Gestión RRSS: USD 350/mes
   - Campañas Ads: USD 500/mes
   - Estrategia Completa: USD 800/mes
4. **Obtener los enlaces de suscripción**
5. **Compartir por WhatsApp** cuando un cliente lo solicite

Actualmente, el sistema redirige a WhatsApp para suscripciones, donde puedes enviarles el enlace manualmente.

### API de PayPal (Para desarrolladores)

Si quieres integración completa con la API de PayPal:

1. **Crear App en PayPal**: https://developer.paypal.com/dashboard/
2. **Obtener Client ID** (Sandbox y Production)
3. **Actualizar en** `paypal-integration.js` líneas 10-13:

```javascript
clientId: {
  sandbox: 'TU_CLIENT_ID_SANDBOX',
  production: 'TU_CLIENT_ID_PRODUCTION'
}
```

4. **Cargar SDK de PayPal** en tienda.html antes del cierre de `</body>`:

```html
<script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&currency=USD"></script>
```

5. **Implementar botones inteligentes de PayPal** (requiere más desarrollo)

---

## 🛡️ Seguridad

### Información que NO necesitas en el código:

- ❌ NO pongas tu contraseña de PayPal
- ❌ NO pongas información bancaria
- ❌ NO compartas tu API Secret (solo Client ID es público)

### Lo que SÍ es seguro compartir:

- ✅ PayPal.me link (es público)
- ✅ Email de PayPal (aparece en facturas)
- ✅ Client ID (es para uso público)

---

## 📊 Tracking de Pagos

El sistema guarda localmente los intentos de pago para tu análisis:

```javascript
// En la consola del navegador (F12)
PayPalIntegration.getAttempts();

// Ver configuración actual
PayPalIntegration.config;
```

---

## ❓ Preguntas Frecuentes

### ¿Necesito una cuenta Business de PayPal?

No, una cuenta personal funciona perfectamente con PayPal.me. Pero una cuenta Business te da:
- Nombre comercial personalizado
- Herramientas de facturación avanzadas
- Múltiples usuarios

### ¿Cuánto cobra PayPal?

- **Transacciones nacionales**: ~3.4% + tarifa fija
- **Transacciones internacionales**: ~4.4% + tarifa fija
- **Sin cargos mensuales** para cuenta personal

### ¿Los clientes necesitan cuenta PayPal?

No, pueden pagar con tarjeta de crédito/débito directamente.

### ¿Funciona con otras monedas?

Sí, PayPal convierte automáticamente. Pero recomendamos mantener USD como base para consistencia.

### ¿Qué pasa si cambio de modo sandbox a production?

Solo necesitas:
1. Actualizar `mode: 'production'` en línea 8 de `paypal-integration.js`
2. Usar tu PayPal.me real (ya configurado)

---

## 🎯 Próximos Pasos

1. ✅ Configurar PayPal.me (5 min)
2. ✅ Actualizar enlace en el código (2 min)
3. ✅ Probar con un pago de prueba (3 min)
4. ✅ Configurar suscripciones en PayPal (10 min - opcional)
5. ✅ Promover tu tienda con pagos seguros! 🚀

---

## 📞 Soporte

Si tienes dudas:
1. **PayPal Help**: https://www.paypal.com/help
2. **PayPal Developer Docs**: https://developer.paypal.com/docs/
3. **Consola del navegador**: Presiona F12 para ver logs de debug

---

## 🔗 Enlaces Útiles

- **PayPal.me Setup**: https://www.paypal.com/paypalme/
- **Developer Dashboard**: https://developer.paypal.com/dashboard/
- **Subscription Plans**: https://www.paypal.com/businessmanage/subscriptions
- **PayPal Fees**: https://www.paypal.com/webapps/mpp/paypal-fees

---

**¡Todo listo!** Tu tienda ya acepta pagos seguros con PayPal 💰
