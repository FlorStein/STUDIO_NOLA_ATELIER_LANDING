// Sistema de contador de vistas para artículos del blog
// Solo visible en consola del navegador para el admin

(function() {
    'use strict';

    const ViewCounter = {
        storageKey: 'studioNola_articleViews',

        // Inicializar el contador
        init() {
            this.trackView();
            this.logStats();
        },

        // Obtener ID del artículo actual desde la URL
        getArticleId() {
            const path = window.location.pathname;
            const filename = path.split('/').pop().replace('.html', '');
            return filename;
        },

        // Obtener todos los datos de vistas
        getAllViews() {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        },

        // Guardar datos de vistas
        saveViews(data) {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        },

        // Registrar una vista
        trackView() {
            const articleId = this.getArticleId();
            const views = this.getAllViews();
            
            if (!views[articleId]) {
                views[articleId] = {
                    count: 0,
                    firstView: new Date().toISOString(),
                    lastView: null,
                    viewHistory: []
                };
            }

            views[articleId].count++;
            views[articleId].lastView = new Date().toISOString();
            views[articleId].viewHistory.push({
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                screenWidth: window.innerWidth
            });

            // Limitar historial a últimas 100 vistas por artículo
            if (views[articleId].viewHistory.length > 100) {
                views[articleId].viewHistory = views[articleId].viewHistory.slice(-100);
            }

            this.saveViews(views);
        },

        // Mostrar estadísticas en consola
        logStats() {
            const views = this.getAllViews();
            const articleId = this.getArticleId();
            const currentArticle = views[articleId];

            console.log('%c📊 STUDIO NOLA - Estadísticas de Vistas', 'background: #7c3aed; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
            
            if (currentArticle) {
                console.log('\n%c📄 Artículo Actual:', 'color: #ff6b35; font-weight: bold; font-size: 14px;');
                console.log(`   ID: ${articleId}`);
                console.log(`   Vistas totales: ${currentArticle.count}`);
                console.log(`   Primera vista: ${new Date(currentArticle.firstView).toLocaleString('es-AR')}`);
                console.log(`   Última vista: ${new Date(currentArticle.lastView).toLocaleString('es-AR')}`);
            }

            console.log('\n%c📈 Todos los Artículos:', 'color: #21d63f; font-weight: bold; font-size: 14px;');
            
            // Crear tabla ordenada por vistas
            const sortedArticles = Object.entries(views)
                .map(([id, data]) => ({
                    'Artículo': id,
                    'Vistas': data.count,
                    'Primera Vista': new Date(data.firstView).toLocaleDateString('es-AR'),
                    'Última Vista': new Date(data.lastView).toLocaleDateString('es-AR')
                }))
                .sort((a, b) => b.Vistas - a.Vistas);

            console.table(sortedArticles);

            // Estadísticas totales
            const totalViews = Object.values(views).reduce((sum, article) => sum + article.count, 0);
            const totalArticles = Object.keys(views).length;

            console.log('\n%c📊 Resumen General:', 'color: #7c3aed; font-weight: bold; font-size: 14px;');
            console.log(`   Total de artículos visitados: ${totalArticles}`);
            console.log(`   Total de vistas: ${totalViews}`);
            console.log(`   Promedio de vistas por artículo: ${(totalViews / totalArticles).toFixed(1)}`);

            console.log('\n%c💡 Comandos disponibles:', 'color: #bcbcc6; font-style: italic;');
            console.log('   viewCounter.getStats() - Ver estadísticas completas');
            console.log('   viewCounter.exportData() - Exportar todos los datos');
            console.log('   viewCounter.resetArticle("nombre-articulo") - Resetear un artículo');
            console.log('   viewCounter.resetAll() - Resetear todo (¡cuidado!)');
            console.log('\n');
        },

        // Obtener estadísticas completas
        getStats() {
            const views = this.getAllViews();
            const stats = {
                articles: [],
                totals: {
                    totalViews: 0,
                    totalArticles: Object.keys(views).length,
                    averageViews: 0
                }
            };

            Object.entries(views).forEach(([id, data]) => {
                stats.articles.push({
                    id,
                    views: data.count,
                    firstView: data.firstView,
                    lastView: data.lastView,
                    viewHistory: data.viewHistory
                });
                stats.totals.totalViews += data.count;
            });

            stats.articles.sort((a, b) => b.views - a.views);
            stats.totals.averageViews = (stats.totals.totalViews / stats.totals.totalArticles) || 0;

            console.log('%c📊 Estadísticas Completas', 'background: #7c3aed; color: white; padding: 8px 16px; font-weight: bold;');
            console.log(stats);
            return stats;
        },

        // Exportar datos como JSON
        exportData() {
            const views = this.getAllViews();
            const dataStr = JSON.stringify(views, null, 2);
            console.log('%c📦 Datos exportados:', 'color: #21d63f; font-weight: bold;');
            console.log(dataStr);
            
            // Copiar al clipboard si está disponible
            if (navigator.clipboard) {
                navigator.clipboard.writeText(dataStr).then(() => {
                    console.log('%c✅ Datos copiados al portapapeles', 'color: #21d63f;');
                });
            }
            
            return views;
        },

        // Resetear un artículo específico
        resetArticle(articleId) {
            const views = this.getAllViews();
            if (views[articleId]) {
                delete views[articleId];
                this.saveViews(views);
                console.log(`%c✅ Artículo "${articleId}" reseteado`, 'color: #21d63f; font-weight: bold;');
            } else {
                console.log(`%c⚠️ Artículo "${articleId}" no encontrado`, 'color: #ff6b35; font-weight: bold;');
            }
        },

        // Resetear todos los datos
        resetAll() {
            if (confirm('⚠️ ¿Estás segura de que quieres resetear TODAS las estadísticas?')) {
                localStorage.removeItem(this.storageKey);
                console.log('%c✅ Todas las estadísticas han sido reseteadas', 'color: #21d63f; font-weight: bold;');
            }
        }
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ViewCounter.init());
    } else {
        ViewCounter.init();
    }

    // Exponer funciones al objeto window para uso en consola
    window.viewCounter = {
        getStats: () => ViewCounter.getStats(),
        exportData: () => ViewCounter.exportData(),
        resetArticle: (id) => ViewCounter.resetArticle(id),
        resetAll: () => ViewCounter.resetAll()
    };

})();
