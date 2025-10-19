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
            const product = {
                element: card,
                id: card.getAttribute('data-product'),
                name: card.querySelector('.product-name')?.textContent || '',
                category: card.getAttribute('data-category') || 'todos',
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
                           aria-label="Buscar productos">
                    <button type="button" aria-label="Buscar">
                        <i class="fas fa-search"></i>
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
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
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
            // Filtro de búsqueda
            if (this.currentFilters.search) {
                if (!product.name.toLowerCase().includes(this.currentFilters.search)) {
                    return false;
                }
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

        // Actualizar contador
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const count = this.filteredProducts.length;
            resultsCount.innerHTML = `Mostrando <strong>${count}</strong> ${count === 1 ? 'producto' : 'productos'}`;
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
                    <h3>No se encontraron productos</h3>
                    <p>Intenta cambiar los filtros o realizar otra búsqueda</p>
                `;

                const container = document.querySelector('.section.product-category');
                if (container) {
                    container.appendChild(noResultsMsg);
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
