/**
 * Currency Converter System
 * Sincroniza precios entre página principal (USD) y tienda (múltiples monedas)
 */

const CurrencyConverter = (function() {
  'use strict';

  // Precios base en USD (desde la página principal - index.html)
  const BASE_PRICES = {
    // DISEÑO WEB
    'web-simple': 280,            // Diseño Web Simple (1-3 secciones)
    'web-intermedio': 480,        // Diseño Web Intermedio (4-6 secciones)
    'web-avanzado': 1250,         // Diseño Web Avanzado (CMS, integraciones)
    
    // BRANDING
    'branding-esencial': 600,     // Branding Esencial (logo + guía)
    'identidad-marca': 1200,      // Identidad de Marca (manual completo)
    'rebranding': 2400,           // Rebranding Estratégico (360°)
    
    // MARKETING DIGITAL
    'gestion-rrss': 350,          // Gestión de RRSS (8-12 posts/mes)
    'campanas-ads': 500,          // Campañas Ads (Meta/Google)
    'estrategia-completa': 800    // Estrategia Digital Completa
  };

  // API Configuration
  const API_CONFIG = {
    enabled: true,  // Cambiar a false para usar tasas manuales
    url: 'https://api.exchangerate-api.com/v4/latest/USD',
    cacheKey: 'studioNola_exchangeRates_cache',
    cacheDuration: 24 * 60 * 60 * 1000  // 24 horas en milisegundos
  };

  // Tasas de cambio (se actualizan automáticamente desde API o usar valores por defecto)
  const EXCHANGE_RATES = {
    'USD': { rate: 1, symbol: 'USD', decimals: 0 },
    'ARS': { rate: 1000, symbol: 'ARS', decimals: 0, prefix: '$' },       // Peso argentino
    'MXN': { rate: 17, symbol: 'MXN', decimals: 0, prefix: '$' },         // Peso mexicano
    'CLP': { rate: 950, symbol: 'CLP', decimals: 0, prefix: '$' },        // Peso chileno
    'COP': { rate: 4300, symbol: 'COP', decimals: 0, prefix: '$' },       // Peso colombiano
    'EUR': { rate: 0.92, symbol: 'EUR', decimals: 0, prefix: '€' },       // Euro
    'BRL': { rate: 5.0, symbol: 'BRL', decimals: 0, prefix: 'R$' }        // Real brasileño
  };

  // Estado actual
  let currentCurrency = 'USD';
  let isLoadingRates = false;

  /**
   * Redondeo inteligente según el monto y la moneda
   * Redondea a números "bonitos" manteniendo la precisión comercial
   */
  function smartRound(amount, currency) {
    // USD, EUR - Redondeo a múltiplos según rango
    if (currency === 'USD' || currency === 'EUR') {
      if (amount < 100) return Math.round(amount / 5) * 5;           // $50, $55, $60
      if (amount < 500) return Math.round(amount / 10) * 10;         // $280, $290, $300
      if (amount < 1000) return Math.round(amount / 25) * 25;        // $450, $475, $500
      if (amount < 5000) return Math.round(amount / 50) * 50;        // $1200, $1250, $1300
      return Math.round(amount / 100) * 100;                         // $2400, $2500, $2600
    }

    // ARS - Redondeo más agresivo por inflación
    if (currency === 'ARS') {
      if (amount < 10000) return Math.round(amount / 100) * 100;     // $9,900, $10,000
      if (amount < 50000) return Math.round(amount / 500) * 500;     // $49,500, $50,000
      if (amount < 100000) return Math.round(amount / 1000) * 1000;  // $99,000, $100,000
      if (amount < 500000) return Math.round(amount / 5000) * 5000;  // $495,000, $500,000
      return Math.round(amount / 10000) * 10000;                     // $2,490,000, $2,500,000
    }

    // MXN - Redondeo moderado
    if (currency === 'MXN') {
      if (amount < 1000) return Math.round(amount / 10) * 10;        // $4,780, $4,790
      if (amount < 5000) return Math.round(amount / 50) * 50;        // $4,750, $4,800
      if (amount < 10000) return Math.round(amount / 100) * 100;     // $8,100, $8,200
      return Math.round(amount / 500) * 500;                         // $21,000, $21,500
    }

    // CLP - Redondeo grande (sin decimales, montos altos)
    if (currency === 'CLP') {
      if (amount < 10000) return Math.round(amount / 100) * 100;     // $9,900, $10,000
      if (amount < 100000) return Math.round(amount / 1000) * 1000;  // $99,000, $100,000
      if (amount < 500000) return Math.round(amount / 5000) * 5000;  // $495,000, $500,000
      return Math.round(amount / 10000) * 10000;                     // $1,190,000, $1,200,000
    }

    // COP - Redondeo muy agresivo (montos muy altos)
    if (currency === 'COP') {
      if (amount < 100000) return Math.round(amount / 1000) * 1000;  // $99,000, $100,000
      if (amount < 500000) return Math.round(amount / 5000) * 5000;  // $495,000, $500,000
      if (amount < 1000000) return Math.round(amount / 10000) * 10000; // $990,000, $1,000,000
      return Math.round(amount / 50000) * 50000;                     // $2,050,000, $2,100,000
    }

    // BRL - Similar a MXN
    if (currency === 'BRL') {
      if (amount < 1000) return Math.round(amount / 10) * 10;        // R$1,390, R$1,400
      if (amount < 5000) return Math.round(amount / 50) * 50;        // R$2,400, R$2,450
      return Math.round(amount / 100) * 100;                         // R$6,200, R$6,300
    }

    // Fallback: redondeo estándar
    return Math.round(amount);
  }
  
  // Obtener tasas desde API
  async function fetchExchangeRates() {
    if (!API_CONFIG.enabled) {
      console.log('💱 API deshabilitada - usando tasas manuales');
      return false;
    }

    try {
      // Verificar cache
      const cached = localStorage.getItem(API_CONFIG.cacheKey);
      if (cached) {
        const { rates, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age < API_CONFIG.cacheDuration) {
          console.log(`💱 Usando tasas desde cache (${Math.round(age / 1000 / 60 / 60)}h antiguas)`);
          applyRatesFromAPI(rates);
          return true;
        }
      }

      // Obtener tasas actualizadas
      console.log('💱 Obteniendo tasas actualizadas desde API...');
      const response = await fetch(API_CONFIG.url);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      // Guardar en cache
      localStorage.setItem(API_CONFIG.cacheKey, JSON.stringify({
        rates: data.rates,
        timestamp: Date.now()
      }));

      applyRatesFromAPI(data.rates);
      console.log('✓ Tasas actualizadas correctamente desde API');
      return true;

    } catch (error) {
      console.warn('⚠️ Error al obtener tasas de API, usando valores por defecto:', error.message);
      return false;
    }
  }

  // Aplicar tasas obtenidas de la API
  function applyRatesFromAPI(apiRates) {
    if (apiRates.ARS) EXCHANGE_RATES.ARS.rate = Math.round(apiRates.ARS);
    if (apiRates.MXN) EXCHANGE_RATES.MXN.rate = Math.round(apiRates.MXN * 10) / 10;
    if (apiRates.CLP) EXCHANGE_RATES.CLP.rate = Math.round(apiRates.CLP);
    if (apiRates.COP) EXCHANGE_RATES.COP.rate = Math.round(apiRates.COP);
    if (apiRates.EUR) EXCHANGE_RATES.EUR.rate = Math.round(apiRates.EUR * 100) / 100;
    if (apiRates.BRL) EXCHANGE_RATES.BRL.rate = Math.round(apiRates.BRL * 10) / 10;
  }
  
  // Obtener moneda guardada o detectar región
  function initializeCurrency() {
    // Intentar cargar desde localStorage
    const savedCurrency = localStorage.getItem('studioNola_preferredCurrency');
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
      currentCurrency = savedCurrency;
      return;
    }

    // Detección automática por región (opcional)
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.includes('es-AR')) currentCurrency = 'ARS';
    else if (userLang.includes('es-MX')) currentCurrency = 'MXN';
    else if (userLang.includes('es-CL')) currentCurrency = 'CLP';
    else if (userLang.includes('es-CO')) currentCurrency = 'COP';
    else if (userLang.includes('pt')) currentCurrency = 'BRL';
    else currentCurrency = 'USD';
  }

  // Convertir precio de USD a otra moneda
  function convert(usdAmount, targetCurrency) {
    if (!EXCHANGE_RATES[targetCurrency]) {
      console.error(`Moneda no soportada: ${targetCurrency}`);
      return usdAmount;
    }
    
    const rate = EXCHANGE_RATES[targetCurrency].rate;
    const rawAmount = usdAmount * rate;
    
    // Aplicar redondeo inteligente
    return smartRound(rawAmount, targetCurrency);
  }

  // Formatear precio con símbolo de moneda
  function formatPrice(amount, currency) {
    const config = EXCHANGE_RATES[currency];
    if (!config) return `${amount}`;

    const formatted = new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    }).format(amount);

    if (config.prefix) {
      return `${config.prefix}${formatted}`;
    }
    return `${formatted} ${config.symbol}`;
  }

  // Obtener precio convertido y formateado
  function getPrice(planId, currency = currentCurrency) {
    const basePrice = BASE_PRICES[planId];
    if (!basePrice) {
      console.error(`Plan no encontrado: ${planId}`);
      return '—';
    }

    const converted = convert(basePrice, currency);
    return formatPrice(converted, currency);
  }

  // Actualizar todos los precios en la página
  function updateAllPrices() {
    // Actualizar precios con data-plan attribute
    document.querySelectorAll('[data-plan]').forEach(element => {
      const planId = element.getAttribute('data-plan');
      const priceText = getPrice(planId, currentCurrency);
      element.textContent = priceText;
    });

    // Actualizar precios con data-price-usd attribute (precios custom)
    document.querySelectorAll('[data-price-usd]').forEach(element => {
      const usdPrice = parseFloat(element.getAttribute('data-price-usd'));
      const converted = convert(usdPrice, currentCurrency);
      element.textContent = formatPrice(converted, currentCurrency);
    });

    // Actualizar selectores de moneda
    document.querySelectorAll('.currency-selector').forEach(selector => {
      selector.value = currentCurrency;
    });

    // Actualizar indicadores de moneda
    document.querySelectorAll('.currency-indicator').forEach(indicator => {
      const config = EXCHANGE_RATES[currentCurrency];
      indicator.textContent = config.symbol;
    });
  }

  // Cambiar moneda
  function changeCurrency(newCurrency) {
    if (!EXCHANGE_RATES[newCurrency]) {
      console.error(`Moneda no válida: ${newCurrency}`);
      return;
    }

    currentCurrency = newCurrency;
    localStorage.setItem('studioNola_preferredCurrency', newCurrency);
    updateAllPrices();

    // Evento personalizado para otros scripts
    window.dispatchEvent(new CustomEvent('currencyChanged', { 
      detail: { currency: newCurrency } 
    }));
  }

  // Inicializar selectores de moneda
  function initializeSelectors() {
    document.querySelectorAll('.currency-selector').forEach(selector => {
      // Poblar opciones
      Object.keys(EXCHANGE_RATES).forEach(code => {
        const config = EXCHANGE_RATES[code];
        const option = document.createElement('option');
        option.value = code;
        // Mostrar solo el código para evitar duplicación visual (USD, ARS, EUR)
        option.textContent = code;
        // Guardar símbolo por si se requiere en UI futura
        option.setAttribute('data-symbol', config.symbol);
        if (code === currentCurrency) option.selected = true;
        selector.appendChild(option);
      });

      // Evento de cambio
      selector.addEventListener('change', (e) => {
        changeCurrency(e.target.value);
      });
    });
  }

  // Inicialización automática
  async function init() {
    initializeCurrency();
    
    // Cargar tasas desde API primero
    if (API_CONFIG.enabled) {
      isLoadingRates = true;
      await fetchExchangeRates();
      isLoadingRates = false;
    }
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initializeSelectors();
        updateAllPrices();
      });
    } else {
      initializeSelectors();
      updateAllPrices();
    }
  }

  // API pública
  return {
    init,
    getPrice,
    convert,
    formatPrice,
    changeCurrency,
    getCurrentCurrency: () => currentCurrency,
    getExchangeRates: () => ({ ...EXCHANGE_RATES }),
    getBasePrices: () => ({ ...BASE_PRICES }),
    
    // Métodos administrativos
    updateRate: (currency, newRate) => {
      if (EXCHANGE_RATES[currency]) {
        EXCHANGE_RATES[currency].rate = newRate;
        updateAllPrices();
        console.log(`✓ Tasa actualizada: ${currency} = ${newRate} USD`);
      }
    },
    
    logCurrentRates: () => {
      console.table(EXCHANGE_RATES);
    },
    
    // Métodos de API
    refreshRates: async () => {
      console.log('🔄 Actualizando tasas desde API...');
      const success = await fetchExchangeRates();
      if (success) {
        updateAllPrices();
        console.log('✓ Tasas refrescadas y precios actualizados');
      }
      return success;
    },
    
    clearCache: () => {
      localStorage.removeItem(API_CONFIG.cacheKey);
      console.log('✓ Cache de tasas eliminado');
    },
    
    getLastUpdate: () => {
      const cached = localStorage.getItem(API_CONFIG.cacheKey);
      if (cached) {
        const { timestamp } = JSON.parse(cached);
        const date = new Date(timestamp);
        const hoursAgo = Math.round((Date.now() - timestamp) / 1000 / 60 / 60);
        return {
          date: date.toLocaleString('es-AR'),
          hoursAgo: hoursAgo,
          message: `Última actualización: ${date.toLocaleString('es-AR')} (hace ${hoursAgo}h)`
        };
      }
      return { message: 'Sin datos de cache' };
    },
    
    toggleAPI: (enabled) => {
      API_CONFIG.enabled = enabled;
      console.log(`API ${enabled ? 'habilitada' : 'deshabilitada'}`);
    }
  };
})();

// Inicializar automáticamente
CurrencyConverter.init();

// Exponer globalmente para uso en consola
window.CurrencyConverter = CurrencyConverter;
