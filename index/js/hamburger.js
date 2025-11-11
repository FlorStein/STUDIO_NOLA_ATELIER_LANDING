// ============================================
// MENÚ HAMBURGUESA - SIMPLE Y FUNCIONAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.ul');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    // Abrir/cerrar menú
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Cerrar menú cuando se hace click en un enlace
    navMenu.addEventListener('click', function(e) {
        // Si es un enlace válido (no "Contacto")
        if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
            // Cerrar el menú inmediatamente
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            // El navegador seguirá el href normalmente
        }
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (body.classList.contains('menu-open') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
});
