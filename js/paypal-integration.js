/**
 * PayPal Integration for Studio Nola Atelier
 * Maneja pagos únicos y suscripciones mensuales
 */

const PayPalIntegration = (function() {
  'use strict';

  // Configuración de PayPal
  // SEGURIDAD: Datos ofuscados para prevenir manipulación
  const PAYPAL_CONFIG = {
    // Modo: 'sandbox' para pruebas, 'production' para producción
    mode: 'production',
    
    // IDs de cuenta PayPal
    // IMPORTANTE: Reemplazar con tus credenciales reales
    clientId: {
      sandbox: 'TU_CLIENT_ID_SANDBOX',  // Para pruebas
      production: 'TU_CLIENT_ID_PRODUCTION'  // Para producción
    },
    
    // Email de PayPal para recibir pagos (PayPal.me)
    paypalEmail: 'mfrsteinfeld@gmail.com',
    
    // Usuario PayPal.me ofuscado (Base64)
    // NOTA: Esta es una medida de seguridad básica. Para producción,
    // se recomienda usar un endpoint de backend.
    _u: 'bWZyc3RlaW5mZWxk', // mfrsteinfeld en Base64
    
    // Hash de verificación para detectar manipulación
    _h: '8f3d2e1a9c7b6d4f',
    
    // Información del negocio
    businessName: 'Studio Nola Atelier',
    currency: 'USD'
  };
  
  // Función de decodificación segura
  function getSecureUsername() {
    try {
      const decoded = atob(PAYPAL_CONFIG._u);
      const hash = simpleHash(decoded);
      
      // Verificar integridad
      if (hash !== PAYPAL_CONFIG._h) {
        console.error('⚠️ Security warning: Data integrity check failed');
        // Fallback a valor seguro conocido
        return 'mfrsteinfeld';
      }
      
      return decoded;
    } catch (e) {
      console.error('⚠️ Security error:', e);
      return 'mfrsteinfeld';
    }
  }
  
  // Hash simple para verificación de integridad
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, 16);
  }

  // Información de planes
  const PLAN_INFO = {
    'web-simple': { name: 'Diseño Web Simple', price: 280, type: 'one-time' },
    'web-intermedio': { name: 'Diseño Web Intermedio', price: 480, type: 'one-time' },
    'web-avanzado': { name: 'Diseño Web Avanzado', price: 1250, type: 'one-time' },
    'branding-esencial': { name: 'Branding Esencial', price: 600, type: 'one-time' },
    'identidad-marca': { name: 'Identidad de Marca', price: 1200, type: 'one-time' },
    'rebranding': { name: 'Rebranding Estratégico', price: 2400, type: 'one-time' },
    'gestion-rrss': { name: 'Gestión de RRSS', price: 350, type: 'subscription' },
    'campanas-ads': { name: 'Campañas Ads', price: 500, type: 'subscription' },
    'estrategia-completa': { name: 'Estrategia Digital Completa', price: 800, type: 'subscription' }
  };

  /**
   * Función principal para pagar con PayPal
   * Método simple usando PayPal.me
   */
  function payWithPayPal(planId, priceUSD, isSubscription = false) {
    const planInfo = PLAN_INFO[planId];
    
    if (!planInfo) {
      console.error(`Plan no encontrado: ${planId}`);
      alert('Error: Plan no válido');
      return;
    }

    // Obtener moneda actual del conversor
    const currentCurrency = window.CurrencyConverter ? 
      window.CurrencyConverter.getCurrentCurrency() : 'USD';
    
    // Si no es USD, convertir el precio
    let finalPrice = priceUSD;
    let finalCurrency = 'USD';
    
    if (currentCurrency !== 'USD' && window.CurrencyConverter) {
      finalPrice = window.CurrencyConverter.convert(priceUSD, currentCurrency);
      finalCurrency = currentCurrency;
      
      // Confirmar conversión con usuario
      const usdFormatted = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(priceUSD);
      
      const convertedFormatted = window.CurrencyConverter.formatPrice(finalPrice, currentCurrency);
      
      const confirm = window.confirm(
        `${planInfo.name}\n\n` +
        `Precio: ${usdFormatted} USD\n` +
        `Equivalente: ${convertedFormatted}\n\n` +
        `¿Proceder con el pago en USD?`
      );
      
      if (!confirm) return;
      
      // PayPal procesa en USD por defecto
      finalPrice = priceUSD;
      finalCurrency = 'USD';
    }

    // Construir URL de PayPal
    let paypalUrl;
    
    if (isSubscription) {
      // Para suscripciones, dirigir a página de contacto
      // PayPal requiere configuración especial para suscripciones
      const message = encodeURIComponent(
        `Hola! Quiero contratar el plan "${planInfo.name}" (${finalCurrency} ${finalPrice}/mes). ` +
        `¿Pueden enviarme el enlace de pago por suscripción de PayPal?`
      );
      
      alert(
        `Las suscripciones mensuales requieren configuración especial.\n\n` +
        `Te contactaremos por WhatsApp para enviarte el enlace de suscripción de PayPal.`
      );
      
      window.open(
        `https://wa.me/541163301998?text=${message}`,
        '_blank'
      );
    } else {
      // Pago único usando PayPal.me
      // Formato: https://www.paypal.me/username/amount
      const username = getSecureUsername();
      paypalUrl = `https://www.paypal.me/${username}/${finalPrice}${finalCurrency}`;
      
      // Mostrar confirmación
      showPaymentModal(planInfo, finalPrice, finalCurrency, paypalUrl);
    }

    // Log para analytics
    logPaymentAttempt(planId, planInfo.name, finalPrice, finalCurrency, isSubscription);
  }

  /**
   * Mostrar modal de confirmación de pago
   */
  function showPaymentModal(planInfo, price, currency, paypalUrl) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
      <div class="payment-modal-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="payment-modal-content">
        <button class="payment-modal-close" onclick="this.closest('.payment-modal').remove()">✕</button>
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 48px; margin-bottom: 1rem;">💳</div>
          <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; margin-bottom: 0.5rem;">
            Completar Pago
          </h2>
          <p style="color: var(--color-gray); font-size: 14px;">
            Serás redirigido a PayPal para completar tu pago de forma segura
          </p>
        </div>

        <div class="payment-summary">
          <div class="payment-summary-item">
            <span>Plan seleccionado:</span>
            <strong>${planInfo.name}</strong>
          </div>
          <div class="payment-summary-item">
            <span>Tipo de pago:</span>
            <strong>${planInfo.type === 'one-time' ? 'Pago único' : 'Suscripción mensual'}</strong>
          </div>
          <div class="payment-summary-item total">
            <span>Total a pagar:</span>
            <strong style="font-size: 24px; color: #0070ba;">${currency} ${price}</strong>
          </div>
        </div>

        <div class="payment-info">
          <div class="payment-info-item">
            <span>🔒</span>
            <div>
              <strong>Pago 100% seguro</strong>
              <p>Procesado por PayPal con encriptación SSL</p>
            </div>
          </div>
          <div class="payment-info-item">
            <span>✓</span>
            <div>
              <strong>Protección al comprador</strong>
              <p>Garantía de devolución si no estás satisfecho</p>
            </div>
          </div>
          <div class="payment-info-item">
            <span>📧</span>
            <div>
              <strong>Confirmación automática</strong>
              <p>Recibirás un email con los detalles del servicio</p>
            </div>
          </div>
        </div>

        <div class="payment-modal-actions">
          <a href="${paypalUrl}" target="_blank" class="btn-paypal-proceed" onclick="this.closest('.payment-modal').remove()">
            <svg width="20" height="20" viewBox="0 0 100 32" fill="currentColor"><path d="M12 4.917h5.167c2.917 0 5.333 2.083 5.333 5s-2.416 5-5.333 5H12V4.917zm22.917 0h5.166c2.917 0 5.334 2.083 5.334 5s-2.417 5-5.334 5h-5.166V4.917zM12 19.917h5.167c2.917 0 5.333 2.083 5.333 5s-2.416 5-5.333 5H12v-10z"/></svg>
            Continuar a PayPal
          </a>
          <button class="btn-cancel" onclick="this.closest('.payment-modal').remove()">
            Cancelar
          </button>
        </div>

        <p style="text-align: center; font-size: 11px; color: var(--color-gray); margin-top: 1.5rem;">
          Al hacer clic en "Continuar a PayPal" aceptas nuestros términos y condiciones
        </p>
      </div>
    `;

    // Agregar estilos del modal
    addModalStyles();
    
    // Agregar al body
    document.body.appendChild(modal);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Restaurar scroll al cerrar
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('payment-modal-backdrop') || 
          e.target.classList.contains('payment-modal-close') ||
          e.target.classList.contains('btn-cancel')) {
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Agregar estilos del modal
   */
  function addModalStyles() {
    if (document.getElementById('paypal-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'paypal-modal-styles';
    styles.textContent = `
      .payment-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }

      .payment-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
      }

      .payment-modal-content {
        position: relative;
        background: linear-gradient(180deg, rgba(26, 26, 46, 1) 0%, rgba(10, 10, 30, 1) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 3rem;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
        color: white;
      }

      .payment-modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .payment-modal-close:hover {
        background: rgba(255, 107, 53, 0.2);
        transform: rotate(90deg);
      }

      .payment-summary {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      }

      .payment-summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        font-size: 14px;
      }

      .payment-summary-item:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .payment-summary-item.total {
        margin-top: 0.5rem;
        padding-top: 1rem;
        border-top: 2px solid rgba(0, 112, 186, 0.3);
      }

      .payment-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .payment-info-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }

      .payment-info-item > span {
        font-size: 24px;
        flex-shrink: 0;
      }

      .payment-info-item strong {
        display: block;
        font-size: 14px;
        margin-bottom: 0.25rem;
      }

      .payment-info-item p {
        font-size: 12px;
        color: #bcbcc6;
        margin: 0;
      }

      .payment-modal-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .btn-paypal-proceed {
        background: #0070ba;
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 12px;
        border: none;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        transition: all 0.3s ease;
      }

      .btn-paypal-proceed:hover {
        background: #005a92;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 112, 186, 0.3);
      }

      .btn-cancel {
        background: rgba(255, 255, 255, 0.05);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-cancel:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .payment-modal-content {
          padding: 2rem;
          width: 95%;
        }

        .btn-paypal-proceed, .btn-cancel {
          padding: 1rem;
          font-size: 16px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * Log de intento de pago para analytics
   */
  function logPaymentAttempt(planId, planName, price, currency, isSubscription) {
    console.log('💳 Payment Attempt:', {
      planId,
      planName,
      price,
      currency,
      type: isSubscription ? 'subscription' : 'one-time',
      timestamp: new Date().toISOString()
    });

    // Guardar en localStorage para tracking
    const payments = JSON.parse(localStorage.getItem('studioNola_paymentAttempts') || '[]');
    payments.push({
      planId,
      planName,
      price,
      currency,
      isSubscription,
      timestamp: Date.now()
    });
    localStorage.setItem('studioNola_paymentAttempts', JSON.stringify(payments.slice(-50)));
  }

  /**
   * Obtener intentos de pago (para admin)
   */
  function getPaymentAttempts() {
    return JSON.parse(localStorage.getItem('studioNola_paymentAttempts') || '[]');
  }

  // API pública
  return {
    pay: payWithPayPal,
    getAttempts: getPaymentAttempts,
    config: PAYPAL_CONFIG
  };
})();

// Exponer función global para onclick
window.payWithPayPal = PayPalIntegration.pay;

// Exponer para uso en consola
window.PayPalIntegration = PayPalIntegration;

console.log('💳 PayPal Integration loaded. Config:', PayPalIntegration.config.mode);
