# Videos Folder

## Video de presentación Tienda

Coloca los videos de presentación aquí con los siguientes nombres:

- **iris-mobile.mp4** - Video vertical 1080x1080px para dispositivos móviles
- **iris-desktop.mp4** - Video horizontal (landscape) para desktop
- **iris-mobile.vtt** - Subtítulos en español para video mobile
- **iris-desktop.vtt** - Subtítulos en español para video desktop

### Características recomendadas:
- Formato: MP4 (H.264)
- Duración: 5-15 segundos idealmente
- Peso optimizado: < 5MB para mobile, < 10MB para desktop
- Sin audio obligatorio (el script intenta activarlo después del autoplay)

### Comportamiento:
- Autoplay al cargar la página de tienda
- Detección automática de dispositivo (mobile/desktop)
- Subtítulos en español activados automáticamente
- Botón "Saltar" visible en todo momento
- Cierre automático al finalizar el video
- Cierre con tecla ESC
- Traducido en ES/EN/PT

## Cómo editar los subtítulos

Los archivos `.vtt` son archivos de texto que usan el formato WebVTT.

**Estructura:**
```
WEBVTT

00:00:00.000 --> 00:00:03.000
Texto del subtítulo aquí

00:00:03.000 --> 00:00:06.000
Siguiente línea de subtítulo
```

**Formato de tiempo:** `HH:MM:SS.mmm` (horas:minutos:segundos.milisegundos)

Edita los archivos VTT con cualquier editor de texto para ajustar los tiempos y textos según tu video real.
