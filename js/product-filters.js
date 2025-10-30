/**
 * BELLE ÉPOQUE - Product Filters
 * Sistema de filtros y búsqueda para productos
 */

class ProductFilters {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilters = {
            category: 'todos',
            price: 'todos',
            search: ''
        };

        this.init();
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    init() {
        this.collectProducts();
        this.createFilterUI();
        this.attachEventListeners();
    }

    // ============================================
    // RECOLECTAR PRODUCTOS DEL DOM
    // ============================================
    collectProducts() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Detectar categoría desde la sección contenedora si no está en el card
            const section = card.closest('.product-category');
            const detectedCategory = section ? section.getAttribute('data-category') : (card.getAttribute('data-category') || 'todos');

            const product = {
                element: card,
                id: card.getAttribute('data-product'),
                name: card.querySelector('.product-name')?.textContent || '',
                description: card.querySelector('.product-description')?.textContent || '',
                category: detectedCategory || 'todos',
                price: this.extractPrice(card),
                visible: true
            };

            this.products.push(product);
        });

        this.filteredProducts = [...this.products];
    }

    // ============================================
    // EXTRAER PRECIO DEL CARD
    // ============================================
    extractPrice(card) {
        const priceText = card.querySelector('.precio')?.textContent || '0';
        return parseInt(priceText.replace(/[^\d]/g, ''));
    }

    // ============================================
    // CREAR UI DE FILTROS
    // ============================================
    createFilterUI() {
        const filtersSection = document.querySelector('.productos-filters');
        if (!filtersSection) {
            this.createFiltersSection();
        }
    }

    createFiltersSection() {
        const productFiltersSection = document.querySelector('.product-filters-section');
        if (!productFiltersSection) return;

        const filtersHTML = `
            <div class="productos-filters">
                <div class="search-bar">
                    <input type="text"
                           id="search-products"
                           placeholder="Buscar productos..."
                           data-translate-placeholder="productos.buscar.placeholder"
                           aria-label="Buscar productos">
                    <button type="button" id="clear-search" aria-label="Limpiar búsqueda">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="filters-grid">
                    <div class="filter-group">
                        <label for="filter-categoria">Categoría:</label>
                        <select id="filter-categoria">
                            <option value="todos">Todos</option>
                            <option value="croissants">Croissants & Viennoiseries</option>
                            <option value="macarons">Macarons</option>
                            <option value="pasteles">Pasteles & Tartas</option>
                            <option value="especiales">Pedidos Especiales</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="filter-precio">Precio:</label>
                        <select id="filter-precio">
                            <option value="todos">Todos</option>
                            <option value="bajo">Menos de $3.000</option>
                            <option value="medio">$3.000 - $6.000</option>
                            <option value="alto">Más de $6.000</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <button id="clear-filters" class="btn-clear-filters">
                            <i class="fas fa-times"></i>
                            Limpiar filtros
                        </button>
                    </div>
                </div>

                <div class="filter-results">
                    <span id="results-count">Mostrando <strong>${this.products.length}</strong> productos</span>
                </div>
            </div>
        `;

        // Insertar antes de las secciones de productos
        const firstSection = document.querySelector('.section.product-category');
        if (firstSection) {
            firstSection.insertAdjacentHTML('beforebegin', filtersHTML);
            // Traducir placeholders/textos recién insertados si i18n está activo
            if (window.i18n && typeof window.i18n.translatePage === 'function') {
                window.i18n.translatePage();
            }
        }
    }

    // ============================================
    // ATTACH EVENT LISTENERS
    // ============================================
    attachEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('search-products');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });
        }

        // Limpiar búsqueda
        const clearBtnSearch = document.getElementById('clear-search');
        if (clearBtnSearch && searchInput) {
            clearBtnSearch.addEventListener('click', () => {
                searchInput.value = '';
                this.currentFilters.search = '';
                this.applyFilters();
                searchInput.focus();
            });
        }

        // Filtro de categoría
        const categoryFilter = document.getElementById('filter-categoria');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        // Filtro de precio
        const priceFilter = document.getElementById('filter-precio');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.price = e.target.value;
                this.applyFilters();
            });
        }

        // Limpiar filtros
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }
    }

    // ============================================
    // APLICAR FILTROS
    // ============================================
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Filtro de búsqueda (nombre + descripción, sin acentos)
            if (this.currentFilters.search) {
                const term = this.normalize(this.currentFilters.search);
                const haystack = this.normalize(`${product.name} ${product.description || ''}`);
                if (!haystack.includes(term)) return false;
            }

            // Filtro de categoría
            if (this.currentFilters.category !== 'todos') {
                if (product.category !== this.currentFilters.category) {
                    return false;
                }
            }

            // Filtro de precio
            if (this.currentFilters.price !== 'todos') {
                const price = product.price;
                switch (this.currentFilters.price) {
                    case 'bajo':
                        if (price >= 3000) return false;
                        break;
                    case 'medio':
                        if (price < 3000 || price > 6000) return false;
                        break;
                    case 'alto':
                        if (price <= 6000) return false;
                        break;
                }
            }

            return true;
        });

        this.updateDisplay();
    }

    // ============================================
    // ACTUALIZAR DISPLAY
    // ============================================
    updateDisplay() {
        // Ocultar/mostrar productos
        this.products.forEach(product => {
            const isVisible = this.filteredProducts.includes(product);
            product.element.style.display = isVisible ? '' : 'none';
            product.visible = isVisible;
        });

        // Mostrar/ocultar secciones de categorías según si tienen productos visibles
        const sections = document.querySelectorAll('.product-category');
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeFilterBtn = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.product-card:not([style*="display: none"])');
            const sectionCategory = section.getAttribute('data-category');
            if (activeFilterBtn !== 'all' && sectionCategory !== activeFilterBtn) {
                // Respetar el filtro por botones de categoría del sitio
                section.style.display = 'none';
            } else {
                section.style.display = visibleCards.length > 0 ? 'block' : 'none';
            }
        });

        // Actualizar contador
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const count = this.filteredProducts.length;
            const text = this.getResultsText(count);
            resultsCount.innerHTML = text;
        }

        // Mostrar mensaje si no hay resultados
        this.showNoResults();

        // Animación
        this.filteredProducts.forEach((product, index) => {
            setTimeout(() => {
                product.element.style.opacity = '0';
                product.element.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    product.element.style.transition = 'all 0.3s ease';
                    product.element.style.opacity = '1';
                    product.element.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        });
    }

    // ============================================
    // MOSTRAR MENSAJE SIN RESULTADOS
    // ============================================
    showNoResults() {
        let noResultsMsg = document.querySelector('.no-results-message');

        if (this.filteredProducts.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>${this.translateFallback('productos.sinresultados.titulo', 'No se encontraron productos')}</h3>
                    <p>${this.translateFallback('productos.sinresultados.texto', 'Intenta cambiar los filtros o realizar otra búsqueda')}</p>
                `;

                // Insertar después del bloque de filtros si existe, si no al inicio de la primera sección
                const afterFilters = document.querySelector('.productos-filters');
                if (afterFilters && afterFilters.parentNode) {
                    afterFilters.parentNode.insertBefore(noResultsMsg, afterFilters.nextSibling);
                } else {
                    const container = document.querySelector('.section.product-category');
                    if (container) container.insertAdjacentElement('beforebegin', noResultsMsg);
                }
            } else {
                noResultsMsg.style.display = 'flex';
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }
    }

    // ============================================
    // LIMPIAR FILTROS
    // ============================================
    clearFilters() {
        this.currentFilters = {
            category: 'todos',
            price: 'todos',
            search: ''
        };

        // Resetear inputs
        const searchInput = document.getElementById('search-products');
        if (searchInput) searchInput.value = '';

        const categoryFilter = document.getElementById('filter-categoria');
        if (categoryFilter) categoryFilter.value = 'todos';

        const priceFilter = document.getElementById('filter-precio');
        if (priceFilter) priceFilter.value = 'todos';

        this.applyFilters();

        if (window.BelleEpoque && window.BelleEpoque.showToast) {
            window.BelleEpoque.showToast('Filtros limpiados', 'info');
        }
    }

    // ============================================
    // UTILIDADES
    // ============================================
    normalize(text) {
        return (text || '')
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    translateFallback(key, fallback) {
        if (window.i18n && typeof window.i18n.getTranslation === 'function') {
            return window.i18n.getTranslation(key) || fallback;
        }
        return fallback;
    }

    getResultsText(count) {
        const template = this.translateFallback('productos.resultados', null);
        if (template) {
            return template.replace('{count}', `<strong>${count}</strong>`);
        }
        // Fallback en ES
        return `Mostrando <strong>${count}</strong> ${count === 1 ? 'producto' : 'productos'}`;
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.product-card')) {
            window.productFilters = new ProductFilters();
        }
    });
} else {
    if (document.querySelector('.product-card')) {
        window.productFilters = new ProductFilters();
    }
}

console.log('🔍 Sistema de filtros de productos inicializado');
