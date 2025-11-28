# Script para actualizar las 9 páginas de planes con sistema de 3 idiomas (ES/EN/PT)

$planFiles = @(
    "planes\web-simple.html",
    "planes\web-intermedio.html",
    "planes\web-avanzado.html",
    "planes\branding-esencial.html",
    "planes\identidad-marca.html",
    "planes\rebranding.html",
    "planes\gestion-rrss.html",
    "planes\campanas-ads.html",
    "planes\estrategia-completa.html"
)

foreach ($file in $planFiles) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        Write-Host "Procesando $file..." -ForegroundColor Cyan
        
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        
        # 1. Actualizar el botón de idioma para mostrar globo terráqueo
        $content = $content -replace '<span class="lang-icon">🌐</span>', '<span class="globe-icon">🌐</span>'
        
        # 2. Actualizar la función toggleLanguage para 3 idiomas
        $oldToggle = 'document\.addEventListener\(''DOMContentLoaded'', \(\) => \{\s+document\.getElementById\(''langToggle''\)\.addEventListener\(''click'', \(\) => \{\s+currentLang = currentLang === ''es'' \? ''en'' : ''es'';'
        $newToggle = @'
document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('langToggle').addEventListener('click', () => {
                const langs = ['es', 'en', 'pt'];
                const currentIndex = langs.indexOf(currentLang);
                currentLang = langs[(currentIndex + 1) % langs.length];
'@
        $content = $content -replace $oldToggle, $newToggle
        
        Write-Host "  ✓ Botón y lógica actualizados" -ForegroundColor Green
        
        # Guardar cambios
        Set-Content $fullPath -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "  ✓ Archivo guardado`n" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Archivo no encontrado: $fullPath`n" -ForegroundColor Red
    }
}

Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
Write-Host "Nota: Aún necesitas agregar manualmente las traducciones en portugués (objeto 'pt') a cada archivo." -ForegroundColor Yellow
