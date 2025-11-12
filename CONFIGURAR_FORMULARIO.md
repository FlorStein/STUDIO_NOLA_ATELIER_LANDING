# 📧 Configuración del Formulario de Contacto

## ⚠️ IMPORTANTE: Debes configurar la clave API

El formulario está configurado para usar **Web3Forms**, un servicio gratuito y confiable.

## 🔧 Pasos para activar el formulario:

### 1. Obtener la Access Key GRATUITA

1. Ve a: **https://web3forms.com**
2. Haz clic en "Get Started" o "Create Access Key"
3. Ingresa el email: **studionolaatelier@gmail.com**
4. Haz clic en "Create Access Key"
5. Recibirás un email con tu **Access Key** (algo como: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
6. Confirmá el email haciendo clic en el enlace que te enviarán

### 2. Configurar la Access Key en el código

1. Abrí el archivo `index.html`
2. Buscá la línea que dice:
   ```html
   <input type="hidden" name="access_key" value="a81e1348-550f-4a44-8b13-0f5c64b4f1f4">
   ```
3. Reemplazá `TU_ACCESS_KEY_AQUI` con tu Access Key real:
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7890-abcd-ef1234567890">
   ```
4. Guardá el archivo

### 3. ¡Listo! 

Ya podés probar el formulario. Los mensajes llegarán directamente a **studionolaatelier@gmail.com**

---

## ✅ Características del formulario:

- ✉️ Envío directo a studionolaatelier@gmail.com
- 🚫 Sin redirecciones molestas
- ✨ Mensaje de confirmación en la misma página
- 🔒 Protección anti-spam incluida
- 📱 Funciona en todos los dispositivos
- 🆓 Completamente gratuito (hasta 250 mensajes/mes)

## 🐛 Solución de problemas:

Si el formulario no funciona:
1. Verificá que hayas confirmado el email de Web3Forms
2. Revisá que la Access Key esté correctamente copiada (sin espacios)
3. Abrí la consola del navegador (F12) para ver errores
4. Si el problema persiste, probá el botón de WhatsApp como alternativa

---

## 📞 Alternativa: Botón de WhatsApp

El botón "Escribir por WhatsApp" siempre funciona como backup y no requiere configuración.
