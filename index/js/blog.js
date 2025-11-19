/* ========================================
   BLOG PAGE JAVASCRIPT
   Studio Nola Atelier
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SISTEMA DE FILTROS POR CATEGORÍA
    // ========================================
    
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const emptyState = document.getElementById('emptyState');
    const blogGrid = document.getElementById('blogGrid');
    
    // Función para filtrar artículos
    function filterArticles(category) {
        let visibleCount = 0;
        
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('filtered-out');
                card.style.display = 'flex';
                
                // Animación de entrada
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, 50);
                
                visibleCount++;
            } else {
                card.classList.add('filtered-out');
                card.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar mensaje de estado vacío
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            blogGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            blogGrid.style.display = 'grid';
        }
    }
    
    // Event listeners para botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar artículos
            const category = this.getAttribute('data-category');
            filterArticles(category);
            
            // Guardar preferencia en localStorage
            localStorage.setItem('blogFilter', category);
        });
    });
    
    // ========================================
    // RESTAURAR FILTRO DESDE LOCALSTORAGE
    // ========================================
    
    const savedFilter = localStorage.getItem('blogFilter');
    if (savedFilter) {
        const savedButton = document.querySelector(`[data-category="${savedFilter}"]`);
        if (savedButton) {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            savedButton.classList.add('active');
            filterArticles(savedFilter);
        }
    }
    
    // ========================================
    // CURSOR PERSONALIZADO (mismo comportamiento que index)
    // ========================================
    
    // Movimiento del cursor
    document.addEventListener('mousemove', function(e) {
        const cursor = document.getElementById('cursor2');
        if (cursor) {
            cursor.style.left = (e.clientX - 40) + 'px';
            cursor.style.top = (e.clientY - 40) + 'px';
        }
    });
    
    // Efecto mini en botones, links y cards
    const miniElements = document.querySelectorAll('.back-link, .cta-button, .blog-card-link, .category-btn, .blog-card');
    
    miniElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const cursor = document.getElementById('cursor2');
            if (cursor) {
                cursor.classList.add('mini');
            }
        });
        
        element.addEventListener('mouseleave', function() {
            const cursor = document.getElementById('cursor2');
            if (cursor) {
                cursor.classList.remove('mini');
            }
        });
    });
    
    // ========================================
    // LAZY LOADING DE IMÁGENES (backup)
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
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
    // REVEAL ON SCROLL - ESTILO SERVICIOS
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target); // Solo animar una vez
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        });
        
        // Observar todos los elementos con clase reveal-up
        document.querySelectorAll('.reveal-up').forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // ========================================
    // ANALYTICS (cuando implementes Google Analytics)
    // ========================================
    
    // Track clicks en artículos
    blogCards.forEach(card => {
        const link = card.querySelector('.blog-card-link:not(.blog-card-link--disabled)');
        if (link) {
            link.addEventListener('click', function() {
                const articleTitle = card.querySelector('.blog-card-title').textContent;
                const articleCategory = card.getAttribute('data-category');
                
                // Google Analytics event (descomentar cuando tengas GA)
                // if (typeof gtag !== 'undefined') {
                //     gtag('event', 'click', {
                //         'event_category': 'Blog',
                //         'event_label': articleTitle,
                //         'value': articleCategory
                //     });
                // }
                
                console.log('Article clicked:', articleTitle, '|', articleCategory);
            });
        }
    });
    
    // Track clicks en filtros de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Google Analytics event (descomentar cuando tengas GA)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'filter', {
            //         'event_category': 'Blog',
            //         'event_label': category
            //     });
            // }
            
            console.log('Filter clicked:', category);
        });
    });
    
    // ========================================
    // BÚSQUEDA (opcional para el futuro)
    // ========================================
    
    // Puedes agregar funcionalidad de búsqueda aquí si lo necesitas
    
});

// ========================================
// FUNCIÓN DE UTILIDAD: DEBOUNCE
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// LOG DE INICIALIZACIÓN
// ========================================

console.log('✅ Blog JavaScript cargado correctamente - Studio Nola Atelier');
