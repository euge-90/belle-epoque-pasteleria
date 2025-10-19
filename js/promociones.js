/**
 * Belle Époque - Sistema de Promociones
 * Manejo de cálculo de descuentos y promociones
 */

// Estado de la aplicación
const state = {
    activePromo: '2x1',
    products: [],
    subtotal: 0,
    discount: 0,
    total: 0
};

// Configuración de promociones
const promotions = {
    '2x1': {
        name: '50% en el segundo producto',
        description: 'Llevá 2 productos y obtené 50% de descuento en el segundo de menor o igual valor.',
        calculate: (products) => {
            if (products.length < 2) return 0;
            
            // Ordenar productos por precio (mayor a menor)
            const sorted = [...products].sort((a, b) => b.price - a.price);
            let discount = 0;
            
            // Aplicar 50% al segundo de cada par
            for (let i = 1; i < sorted.length; i += 2) {
                discount += (sorted[i].price * sorted[i].quantity) * 0.5;
            }
            
            return discount;
        }
    },
    '3x2': {
        name: '3x2 en productos seleccionados',
        description: 'Comprá 3 productos y pagá solo 2. Se descuenta el de menor valor.',
        calculate: (products) => {
            if (products.length === 0) return 0;
            
            // Crear lista de todos los items individuales
            let items = [];
            products.forEach(product => {
                for (let i = 0; i < product.quantity; i++) {
                    items.push(product.price);
                }
            });
            
            // Ordenar de mayor a menor
            items.sort((a, b) => b - a);
            
            let discount = 0;
            // Por cada grupo de 3, descontar el más barato
            for (let i = 2; i < items.length; i += 3) {
                discount += items[i];
            }
            
            return discount;
        }
    },
    '10off': {
        name: '10% de descuento',
        description: '10% de descuento en compras superiores a $30,000.',
        calculate: (products) => {
            const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
            return total >= 30000 ? total * 0.1 : 0;
        }
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadSavedCart();

    // Inicializar carrusel de Productos Populares con breakpoints personalizados
    // Para coincidir con el CSS: 768px->2 items, 1200px->3 items, 1400px->4 items
    new Carousel(
        '.popular-products',
        'popular-prev',
        'popular-next',
        'popular-dots',
        [
            { width: 1400, items: 4 },
            { width: 1200, items: 3 },
            { width: 768, items: 2 }
        ]
    );

    // Inicializar carrusel de Tips con breakpoints por defecto
    // 768px->2 items, 1024px->3 items, 1400px->4 items
    new Carousel(
        '.tips-grid',
        'tips-prev',
        'tips-next',
        'tips-dots',
        [
            { width: 1400, items: 4 },
            { width: 1024, items: 3 },
            { width: 768, items: 2 }
        ]
    );
});

// Event Listeners
function initializeEventListeners() {
    // Botones de promoción
    document.querySelectorAll('.promo-btn').forEach(btn => {
        btn.addEventListener('click', handlePromoChange);
    });
    
    // Formulario de productos
    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', handleAddProduct);
    }
    
    // Botón reset
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCart);
    }
    
    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// Cambio de promoción
function handlePromoChange(e) {
    const btn = e.currentTarget;
    const promo = btn.dataset.promo;
    
    // Actualizar estado
    state.activePromo = promo;
    
    // Actualizar UI
    document.querySelectorAll('.promo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Actualizar info
    const info = document.getElementById('promo-info');
    if (info) {
        info.innerHTML = `<p>${promotions[promo].description}</p>`;
    }
    
    // Recalcular si hay productos
    if (state.products.length > 0) {
        calculateTotal();
    }
}

// Agregar producto
function handleAddProduct(e) {
    e.preventDefault();
    
    const select = document.getElementById('product-select');
    const quantityInput = document.getElementById('quantity');
    
    if (!select.value) return;
    
    const selectedOption = select.options[select.selectedIndex];
    const product = {
        id: Date.now(),
        name: selectedOption.dataset.name,
        price: parseFloat(select.value),
        quantity: parseInt(quantityInput.value) || 1
    };
    
    // Agregar al estado
    state.products.push(product);
    
    // Actualizar UI
    renderProducts();
    calculateTotal();
    
    // Limpiar form
    select.value = '';
    quantityInput.value = 1;
    
    // Guardar
    saveCart();
}

// Renderizar productos
function renderProducts() {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    if (state.products.length === 0) {
        container.innerHTML = '';
        document.getElementById('results-section').style.display = 'none';
        return;
    }
    
    const html = state.products.map(product => `
        <div class="product-item">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-details">
                    ${product.quantity} x $${formatNumber(product.price)} = $${formatNumber(product.price * product.quantity)}
                </div>
            </div>
            <button class="remove-btn" onclick="removeProduct(${product.id})">Eliminar</button>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Eliminar producto
function removeProduct(id) {
    state.products = state.products.filter(p => p.id !== id);
    renderProducts();
    calculateTotal();
    saveCart();
}

// Calcular total
function calculateTotal() {
    if (state.products.length === 0) {
        document.getElementById('results-section').style.display = 'none';
        return;
    }
    
    // Calcular subtotal
    state.subtotal = state.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    
    // Calcular descuento
    const promo = promotions[state.activePromo];
    state.discount = promo.calculate(state.products);
    
    // Calcular total
    state.total = state.subtotal - state.discount;
    
    // Actualizar UI
    updateResults();
}

// Actualizar resultados
function updateResults() {
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('subtotal').textContent = `$${formatNumber(state.subtotal)}`;
    document.getElementById('discount').textContent = `-$${formatNumber(state.discount)}`;
    document.getElementById('total').textContent = `$${formatNumber(state.total)}`;
    
    // Mostrar badge de ahorro
    const savingsPercentage = state.subtotal > 0 
        ? Math.round((state.discount / state.subtotal) * 100) 
        : 0;
    
    const badge = document.getElementById('savings-badge');
    if (badge) {
        if (state.discount > 0) {
            document.getElementById('savings-percentage').textContent = `${savingsPercentage}%`;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Formatear números
function formatNumber(num) {
    return new Intl.NumberFormat('es-AR').format(num);
}

// Reset carrito
function resetCart() {
    if (confirm('¿Querés limpiar el carrito y comenzar una nueva compra?')) {
        state.products = [];
        state.subtotal = 0;
        state.discount = 0;
        state.total = 0;
        
        renderProducts();
        calculateTotal();
        localStorage.removeItem('belleEpoquePromo');
    }
}

// Guardar carrito
function saveCart() {
    const data = {
        products: state.products,
        activePromo: state.activePromo,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('belleEpoquePromo', JSON.stringify(data));
}

// Cargar carrito guardado
function loadSavedCart() {
    const saved = localStorage.getItem('belleEpoquePromo');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const savedDate = new Date(data.timestamp);
            const now = new Date();
            const hoursDiff = (now - savedDate) / (1000 * 60 * 60);
            
            // Solo cargar si tiene menos de 24 horas
            if (hoursDiff < 24) {
                state.products = data.products || [];
                state.activePromo = data.activePromo || '2x1';
                
                // Actualizar UI
                document.querySelectorAll('.promo-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.promo === state.activePromo);
                });
                
                const info = document.getElementById('promo-info');
                if (info) {
                    info.innerHTML = `<p>${promotions[state.activePromo].description}</p>`;
                }
                
                renderProducts();
                calculateTotal();
            } else {
                localStorage.removeItem('belleEpoquePromo');
            }
        } catch (error) {
            console.error('Error cargando carrito:', error);
            localStorage.removeItem('belleEpoquePromo');
        }
    }
}

// ==================== CARRUSELES ====================

/**
 * Clase para gestionar carruseles
 */
class Carousel {
    constructor(trackSelector, prevBtnId, nextBtnId, dotsContainerId, customBreakpoints = null) {
        this.track = document.querySelector(trackSelector);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.dotsContainer = document.getElementById(dotsContainerId);
        this.customBreakpoints = customBreakpoints;

        if (!this.track) {
            return;
        }

        this.items = Array.from(this.track.children);
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // En pantallas grandes (>= 1400px) donde se ven las 4 opciones, no inicializar carrusel
        if (window.innerWidth >= 1400) {
            return;
        }

        // Si hay breakpoints personalizados, ordenarlos de mayor a menor
        if (this.customBreakpoints) {
            this.customBreakpoints.sort((a, b) => b.width - a.width);
        }

        this.createDots();
        this.updateCarousel();
        this.attachEventListeners();

        // Auto-slide opcional (comentado por defecto)
        // this.startAutoSlide();
    }

    createDots() {
        if (!this.dotsContainer) return;

        const itemsPerView = this.getItemsPerView();
        const totalDots = Math.max(1, this.items.length - itemsPerView + 1);

        this.dotsContainer.innerHTML = '';

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);

            if (i === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.updateCarousel();
            });

            this.dotsContainer.appendChild(dot);
        }
    }

    getItemsPerView() {
        const width = window.innerWidth;

        // Si hay breakpoints personalizados, usarlos
        if (this.customBreakpoints) {
            for (const bp of this.customBreakpoints) {
                if (width >= bp.width) {
                    return bp.items;
                }
            }
            return 1; // Default para pantallas pequeñas
        }

        // Breakpoints por defecto
        if (width >= 1400) return 4;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    updateCarousel() {
        const itemsPerView = this.getItemsPerView();

        // Usar offsetLeft del item objetivo para un posicionamiento más preciso
        const targetItem = this.items[this.currentIndex];
        const offset = targetItem ? -targetItem.offsetLeft : 0;

        this.track.style.transform = `translateX(${offset}px)`;

        // Actualizar botones
        this.updateButtons();

        // Actualizar dots
        this.updateDots();
    }

    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;

        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);

        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }

    updateDots() {
        if (!this.dotsContainer) return;

        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        // No hacer nada en pantallas >= 1400px
        if (window.innerWidth >= 1400) return;

        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);

        if (this.currentIndex < maxIndex) {
            this.currentIndex += 1;
            this.updateCarousel();
        }
    }

    prev() {
        // No hacer nada en pantallas >= 1400px
        if (window.innerWidth >= 1400) return;

        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            this.updateCarousel();
        }
    }

    attachEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Responsive: recrear dots al cambiar tamaño de ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // En pantallas >= 1400px, resetear transform y no usar carrusel
                if (window.innerWidth >= 1400) {
                    this.track.style.transform = 'translateX(0px)';
                    return;
                }

                this.createDots();
                this.currentIndex = 0;
                this.updateCarousel();
            }, 250);
        });

        // Touch/swipe support
        this.addSwipeSupport();
    }

    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    startAutoSlide(interval = 5000) {
        setInterval(() => {
            const itemsPerView = this.getItemsPerView();

            if (this.currentIndex >= this.items.length - itemsPerView) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }

            this.updateCarousel();
        }, interval);
    }
}

// Los carruseles se inicializan en el listener principal de DOMContentLoaded (línea 72)