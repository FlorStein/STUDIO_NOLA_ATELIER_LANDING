/* ========================================
   ARTICLE PAGE JAVASCRIPT
   Studio Nola Atelier - Comportamiento del cursor
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CURSOR PERSONALIZADO
    // ========================================
    
    // Crear el elemento cursor si no existe
    let cursor = document.getElementById('cursor-article');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'cursor-article';
        cursor.style.cssText = `
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: #0e6a00;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
            mix-blend-mode: difference;
            transition: transform 0.2s ease;
        `;
        document.body.appendChild(cursor);
    }
    
    // Movimiento del cursor
    document.addEventListener('mousemove', function(e) {
        if (cursor) {
            cursor.style.left = (e.clientX - 32) + 'px';
            cursor.style.top = (e.clientY - 32) + 'px';
        }
    });
    
    // Efecto mini (intermedio) en elementos interactivos
    const miniElements = document.querySelectorAll('.back-link, .cta-button, a, button');
    
    miniElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (cursor) {
                cursor.style.transform = 'scale(1.4)';
                cursor.style.backgroundColor = '#11ff00';
                cursor.style.border = '0.01px solid #000000';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = '#0e6a00';
                cursor.style.border = 'none';
            }
        });
    });
    
    // ========================================
    // SMOOTH SCROLL
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top al hacer click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
});

console.log('✅ Article JavaScript cargado - Studio Nola Atelier');
