/**
 * Belle Époque - Sistema Completo de Promociones
 * Calculadora interactiva con funcionalidades avanzadas
 *
 * Características:
 * - Calculadora de promociones con 3 tipos: Mañana Francesa, Festival Macarons, Cliente Premium
 * - Sistema de búsqueda y filtros por categoría
 * - Favoritos con persistencia en localStorage
 * - Countdown timers para promociones con fecha límite
 * - Modales de detalles con términos y condiciones
 * - Carruseles responsive con soporte táctil
 * - Lazy loading de imágenes
 * - Social proof dinámico
 * - Efectos parallax y animaciones al scroll
 * - Indicadores de stock dinámicos
 * - Toast notifications
 * - Integración con carrito global
 */

// ==================== CLASE CAROUSEL ====================

/**
 * Clase para gestionar carruseles responsive con soporte táctil
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

// ==================== ESTADO GLOBAL ====================

// Estado global de la calculadora
const calculadoraState = {
    promocionActiva: 'manana-francesa',
    productos: [],
    subtotal: 0,
    descuento: 0,
    total: 0
};

// ==================== CONFIGURACIÓN DE PROMOCIONES ====================

// Configuración de promociones
const promociones = {
    'manana-francesa': {
        nombre: 'Mañana Francesa',
        explicacion: 'Agregá 2 o más productos de viennoiserie y obtené 50% de descuento en el segundo de menor o igual valor.',
        categorias: ['viennoiserie'],
        calcular: (productos) => {
            const productosElegibles = productos.filter(p => p.categoria === 'viennoiserie');
            if (productosElegibles.length === 0) return 0;

            // Contar cantidad total de productos viennoiserie
            let cantidadTotal = productosElegibles.reduce((sum, p) => sum + p.cantidad, 0);

            // Necesitamos al menos 2 productos para la promo
            if (cantidadTotal < 2) return 0;

            // Calcular cuántos pares podemos formar
            let pares = Math.floor(cantidadTotal / 2);

            // Crear un array con todos los productos expandidos por cantidad
            let productosExpandidos = [];
            productosElegibles.forEach(p => {
                for (let i = 0; i < p.cantidad; i++) {
                    productosExpandidos.push({ precio: p.precio, nombre: p.nombre });
                }
            });

            // Ordenar por precio descendente
            productosExpandidos.sort((a, b) => b.precio - a.precio);

            // Calcular descuento: 50% del más barato de cada par
            let descuento = 0;
            for (let i = 0; i < pares; i++) {
                const indice1 = i * 2;
                const indice2 = i * 2 + 1;

                if (indice2 < productosExpandidos.length) {
                    const precio1 = productosExpandidos[indice1].precio;
                    const precio2 = productosExpandidos[indice2].precio;
                    const precioMenor = Math.min(precio1, precio2);

                    descuento += precioMenor * 0.5;
                }
            }

            return descuento;
        }
    },
    'festival-macarons': {
        nombre: 'Festival de Macarons',
        explicacion: 'Comprá 3 macarons individuales y pagá solo 2. El descuento se aplica al macaron de menor valor. No aplica a cajas.',
        categorias: ['macarons'],
        calcular: (productos) => {
            // Filtrar SOLO macarons individuales (excluir cajas)
            const macaronsIndividuales = productos.filter(p =>
                p.categoria === 'macarons' &&
                p.nombre === 'Macaron (unidad)'
            );

            if (macaronsIndividuales.length === 0) return 0;

            // Contar cantidad total de macarons individuales
            let cantidadTotal = macaronsIndividuales.reduce((sum, p) => sum + p.cantidad, 0);

            // Calcular grupos de 3 (el tercero es gratis)
            let gruposDe3 = Math.floor(cantidadTotal / 3);

            if (gruposDe3 === 0) return 0;

            // El descuento es el precio de 1 macaron por cada grupo de 3
            // Asumiendo que todos los macarons individuales cuestan lo mismo
            const precioMacaron = macaronsIndividuales[0].precio;
            const descuento = precioMacaron * gruposDe3;

            return descuento;
        }
    },
    'cliente-premium': {
        nombre: 'Cliente Premium',
        explicacion: 'Obtené 10% de descuento en compras superiores a $30.000. Aplicable a todos nuestros productos.',
        categorias: ['viennoiserie', 'macarons', 'pasteles', 'especialidades'],
        calcular: (productos, subtotal) => {
            return subtotal > 30000 ? subtotal * 0.1 : 0;
        }
    }
};

// ==================== MAPEO DE PRODUCTOS A IMÁGENES ====================

// Mapeo de productos a imágenes
const productImageMap = {
    'Croissant Tradicional': 'images/croissants.png',
    'Pain au Chocolat': 'images/croissants_2.png',
    'Croissant de Almendra': 'images/croissants.png',
    'Pain aux Raisins': 'images/danesa.png',
    'Brioche': 'images/croissants.png',
    'Chausson aux Pommes': 'images/manzanita.png',
    'Macaron (unidad)': 'images/macarons.png',
    'Caja x6 Macarons': 'images/macarons.png',
    'Caja x12 Macarons': 'images/macarons.png',
    'Opera Cake': 'images/torta.png',
    'Tarte Tatin': 'images/torta.png',
    'Fraisier': 'images/torta.png',
    'Saint-Honoré': 'images/torta.png',
    'Mille-feuille': 'images/hojaldre.png',
    'Paris-Brest': 'images/torta.png',
    'Éclair de Chocolate': 'images/eclairs.png',
    'Éclair': 'images/eclairs.png'
};

// ==================== INICIALIZACIÓN ====================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCalculadora();
    initScrollAnimations();
    initSmoothScroll();
    initHoverEffects();

    // Nuevas funcionalidades
    initSearch();
    initFavorites();
    initCountdowns();
    initModal();
    initScrollFeatures();
    initLazyLoading();
    initSkeletonLoader();
    initRippleEffect();
    initSocialProof();
    initParallax();
    initEnhancedScrollAnimations();
    initStockIndicators();

    // Inicializar carruseles
    initCarousels();

    // Mostrar bienvenida
    setTimeout(() => {
        showToast('¡Bienvenido a Belle Époque! Explorá nuestras promociones especiales', 'info', 5000);
    }, 2000);
});

// ==================== FUNCIONES DE CALCULADORA ====================

// Inicializar calculadora
function initCalculadora() {
    // Event listeners para botones de promoción
    document.querySelectorAll('.promo-select-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            seleccionarPromocion(this.dataset.promo);
        });
    });

    // Event listeners para controles de cantidad
    const qtyPlus = document.getElementById('qty-plus');
    const qtyMinus = document.getElementById('qty-minus');

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            const input = document.getElementById('quantity-select');
            if (input) {
                const valor = parseInt(input.value) + 1;
                if (valor <= 20) input.value = valor;
            }
        });
    }

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            const input = document.getElementById('quantity-select');
            if (input) {
                const valor = parseInt(input.value) - 1;
                if (valor >= 1) input.value = valor;
            }
        });
    }

    // Event listener para agregar producto
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', agregarProducto);
    }

    // Event listeners para botones de acción
    const addToCartBtn = document.getElementById('add-to-cart-calculator');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', agregarCalculadoraAlCarrito);
    }

    const whatsappBtn = document.getElementById('whatsapp-order');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', enviarPorWhatsApp);
    }

    const resetBtn = document.getElementById('reset-calculator');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetearCalculadora);
    }

    // Validar formulario en tiempo real
    const productSelect = document.getElementById('product-select');
    if (productSelect) {
        productSelect.addEventListener('change', validarFormulario);
    }

    const quantitySelect = document.getElementById('quantity-select');
    if (quantitySelect) {
        quantitySelect.addEventListener('input', validarFormulario);
    }

    // Inicializar estado
    actualizarVisualizacion();
    validarFormulario();
}

// Seleccionar promoción
function seleccionarPromocion(promo) {
    // Actualizar botones
    document.querySelectorAll('.promo-select-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-promo="${promo}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Actualizar estado
    calculadoraState.promocionActiva = promo;

    // Actualizar explicación
    const explicacion = promociones[promo].explicacion;
    const explanationText = document.getElementById('explanation-text');
    if (explanationText) {
        explanationText.textContent = explicacion;
    }

    // Filtrar productos válidos en el select
    filtrarProductosValidos();

    // Recalcular
    calcularTotales();
}

// Filtrar productos válidos según promoción
function filtrarProductosValidos() {
    const promocion = promociones[calculadoraState.promocionActiva];
    const select = document.getElementById('product-select');
    if (!select) return;

    const options = select.querySelectorAll('option');

    options.forEach(option => {
        if (option.value === '') return; // Skip default option

        const categoria = option.dataset.category;
        if (promocion.categorias.includes(categoria)) {
            option.style.display = 'block';
            option.disabled = false;
        } else if (calculadoraState.promocionActiva === 'cliente-premium') {
            // Cliente premium aplica a todos
            option.style.display = 'block';
            option.disabled = false;
        } else {
            option.style.display = 'none';
            option.disabled = true;
        }
    });

    // Reset selección si no es válida
    const selectedOption = select.selectedOptions[0];
    if (selectedOption && selectedOption.disabled) {
        select.value = '';
        validarFormulario();
    }
}

// Validar formulario
function validarFormulario() {
    const productSelect = document.getElementById('product-select');
    const quantitySelect = document.getElementById('quantity-select');
    const btnAgregar = document.getElementById('add-product-btn');

    if (!productSelect || !quantitySelect || !btnAgregar) return;

    const producto = productSelect.value;
    const cantidad = quantitySelect.value;

    const esValido = producto && cantidad && parseInt(cantidad) > 0;
    btnAgregar.disabled = !esValido;
}

// Agregar producto al carrito
function agregarProducto() {
    const select = document.getElementById('product-select');
    const cantidadInput = document.getElementById('quantity-select');

    if (!select || !cantidadInput) return;

    const selectedOption = select.selectedOptions[0];
    if (!selectedOption || !selectedOption.value) return;

    const nombreProducto = selectedOption.dataset.name;
    const producto = {
        id: Date.now(), // ID único
        nombre: nombreProducto,
        precio: parseInt(selectedOption.value),
        cantidad: parseInt(cantidadInput.value),
        categoria: selectedOption.dataset.category,
        imagen: productImageMap[nombreProducto] || 'images/torta.png'
    };

    calculadoraState.productos.push(producto);

    // Reset formulario
    select.value = '';
    cantidadInput.value = 1;
    validarFormulario();

    // Actualizar visualización
    actualizarListaProductos();
    calcularTotales();

    // Animación de feedback
    showPromoNotification(`${producto.nombre} agregado al carrito`);
}

// Actualizar lista de productos
function actualizarListaProductos() {
    const lista = document.getElementById('products-list');
    if (!lista) return;

    if (calculadoraState.productos.length === 0) {
        lista.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Aún no agregaste productos. ¡Comenzá seleccionando algo delicioso!</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = calculadoraState.productos.map(producto => `
        <div class="product-item" data-id="${producto.id}">
            <div class="product-details">
                <div class="product-name">${producto.nombre}</div>
                <div class="product-info">Cantidad: ${producto.cantidad} | Precio unitario: $${producto.precio.toLocaleString()}</div>
            </div>
            <div class="product-price">$${(producto.precio * producto.cantidad).toLocaleString()}</div>
            <button class="remove-product" onclick="eliminarProducto(${producto.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Eliminar producto del carrito
function eliminarProducto(id) {
    calculadoraState.productos = calculadoraState.productos.filter(p => p.id !== id);
    actualizarListaProductos();
    calcularTotales();
    showPromoNotification('Producto eliminado del carrito');
}

// Calcular totales
function calcularTotales() {
    // Calcular subtotal
    calculadoraState.subtotal = calculadoraState.productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

    // Calcular descuento según promoción activa
    const promocion = promociones[calculadoraState.promocionActiva];
    calculadoraState.descuento = promocion.calcular(calculadoraState.productos, calculadoraState.subtotal);

    // Calcular total
    calculadoraState.total = calculadoraState.subtotal - calculadoraState.descuento;

    // Actualizar visualización
    actualizarResultados();
}

// Actualizar visualización de resultados
function actualizarResultados() {
    const subtotalAmount = document.getElementById('subtotal-amount');
    const discountAmount = document.getElementById('discount-amount');
    const finalAmount = document.getElementById('final-amount');

    if (subtotalAmount) {
        subtotalAmount.textContent = `$${calculadoraState.subtotal.toLocaleString()}`;
    }
    if (discountAmount) {
        discountAmount.textContent = `-$${calculadoraState.descuento.toLocaleString()}`;
    }
    if (finalAmount) {
        finalAmount.textContent = `$${calculadoraState.total.toLocaleString()}`;
    }

    // Mostrar/ocultar resumen de ahorros
    const savingsSummary = document.getElementById('savings-summary');
    if (savingsSummary) {
        if (calculadoraState.descuento > 0) {
            const porcentajeAhorro = ((calculadoraState.descuento / calculadoraState.subtotal) * 100).toFixed(1);

            const savingsAmount = document.getElementById('savings-amount');
            const savingsPercentage = document.getElementById('savings-percentage');
            const promoApplied = document.getElementById('promo-applied');

            if (savingsAmount) {
                savingsAmount.textContent = `$${calculadoraState.descuento.toLocaleString()}`;
            }
            if (savingsPercentage) {
                savingsPercentage.textContent = porcentajeAhorro;
            }
            if (promoApplied) {
                promoApplied.textContent = `Promoción: ${promociones[calculadoraState.promocionActiva].nombre}`;
            }

            savingsSummary.style.display = 'block';
        } else {
            savingsSummary.style.display = 'none';
        }
    }
}

// Actualizar visualización general
function actualizarVisualizacion() {
    actualizarListaProductos();
    actualizarResultados();
}

// Agregar productos de la calculadora al carrito global
function agregarCalculadoraAlCarrito() {
    if (calculadoraState.productos.length === 0) {
        showPromoNotification('Agregá productos antes de agregar al carrito');
        return;
    }

    // Función auxiliar para agregar al carrito
    function agregarAlCarrito() {
        // Agregar cada producto al carrito global
        let productosAgregados = 0;
        calculadoraState.productos.forEach(producto => {
            // Agregar el producto al carrito con la cantidad especificada
            for (let i = 0; i < producto.cantidad; i++) {
                window.cart.addItem({
                    id: producto.id,
                    name: producto.nombre,
                    price: producto.precio,
                    image: producto.imagen || 'images/torta.png',
                    category: producto.categoria || 'Promociones'
                });
            }
            productosAgregados++;
        });

        // Mostrar confirmación
        showPromoNotification(`¡${productosAgregados} producto(s) agregado(s) al carrito!`, 'success');

        // Abrir el modal del carrito automáticamente
        setTimeout(() => {
            if (window.cart && window.cart.openCart) {
                window.cart.openCart();
            }
        }, 500);
    }

    // Esperar a que window.cart esté disponible con polling
    console.log('🔍 Buscando window.cart...');
    let intentos = 0;
    const maxIntentos = 20; // 20 intentos x 100ms = 2 segundos máximo

    const esperarCarrito = setInterval(() => {
        intentos++;
        console.log(`⏳ Intento ${intentos}/${maxIntentos}, window.cart:`, typeof window.cart);

        if (typeof window.cart !== 'undefined') {
            // Carrito encontrado!
            console.log('✅ Carrito encontrado en intento', intentos);
            clearInterval(esperarCarrito);
            agregarAlCarrito();
        } else if (intentos >= maxIntentos) {
            // Timeout después de 2 segundos
            clearInterval(esperarCarrito);
            console.error('❌ window.cart no está definido después de', intentos * 100, 'ms');
            console.error('Estado de scripts:', {
                cartJs: !!document.querySelector('script[src*="cart.js"]'),
                mainJs: !!document.querySelector('script[src*="main.js"]')
            });
            showPromoNotification('Error: El sistema de carrito no está disponible. Por favor, recargá la página.', 'error');
        }
    }, 100); // Verificar cada 100ms
}

// Enviar pedido por WhatsApp
function enviarPorWhatsApp() {
    if (calculadoraState.productos.length === 0) {
        showPromoNotification('Agregá productos antes de hacer el pedido');
        return;
    }

    let mensaje = `¡Hola! Me gustaría hacer este pedido:\n\n`;

    // Agregar productos
    calculadoraState.productos.forEach(p => {
        mensaje += `• ${p.nombre} (x${p.cantidad}) - $${(p.precio * p.cantidad).toLocaleString()}\n`;
    });

    // Agregar totales
    mensaje += `\nSubtotal: $${calculadoraState.subtotal.toLocaleString()}\n`;

    if (calculadoraState.descuento > 0) {
        mensaje += `Descuento (${promociones[calculadoraState.promocionActiva].nombre}): -$${calculadoraState.descuento.toLocaleString()}\n`;
    }

    mensaje += `Total: $${calculadoraState.total.toLocaleString()}\n\n`;
    mensaje += `¡Gracias!`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/5491145678900?text=${mensajeCodificado}`;

    window.open(url, '_blank');
    showPromoNotification('Redirigiendo a WhatsApp...');
}

// Resetear calculadora
function resetearCalculadora() {
    calculadoraState.productos = [];
    calculadoraState.subtotal = 0;
    calculadoraState.descuento = 0;
    calculadoraState.total = 0;

    const productSelect = document.getElementById('product-select');
    const quantitySelect = document.getElementById('quantity-select');

    if (productSelect) productSelect.value = '';
    if (quantitySelect) quantitySelect.value = 1;

    actualizarVisualizacion();
    validarFormulario();

    showPromoNotification('Calculadora reiniciada');
}

// ==================== FUNCIONES DE ANIMACIÓN Y EFECTOS ====================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.promo-card, .combo-card, .tip-card, .popular-item, .promo-selector-section, .product-selector-section, .results-section');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

function initHoverEffects() {
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function showPromoNotification(promoText) {
    const notification = document.createElement('div');
    notification.className = 'promo-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-gift"></i>
            <span>${promoText}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ==================== FUNCIONES PARA LOS BOTONES DE PROMOCIONES ====================

// Funciones para los botones de promociones
function agregarPromocion(tipoPromocion) {
    // Scroll hasta la calculadora
    const calculadora = document.getElementById('calculadora-interactiva');
    if (calculadora) {
        calculadora.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Esperar un poco y luego seleccionar la promoción
    setTimeout(() => {
        seleccionarPromocion(tipoPromocion);
        showPromoNotification(`¡Promoción ${promociones[tipoPromocion].nombre} seleccionada! Ahora agregá tus productos.`);
    }, 800);
}

function consultarPromocion(nombrePromocion) {
    const mensaje = `¡Hola! Me interesa la promoción "${nombrePromocion}". ¿Podrían darme más información?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/5491145678900?text=${mensajeCodificado}`;

    window.open(url, '_blank');
    showPromoNotification('Te redirigimos a WhatsApp para consultar sobre esta promoción');
}

// Función para agregar productos directamente desde "Los Más Elegidos"
function agregarProductoDirecto(precio, nombre, categoria) {
    // Scroll a la calculadora
    const calculadora = document.getElementById('calculadora-promociones');
    if (calculadora) {
        calculadora.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Agregar el producto al carrito
    setTimeout(() => {
        const producto = {
            id: Date.now(),
            nombre: nombre,
            precio: parseInt(precio),
            cantidad: 1,
            categoria: categoria,
            imagen: productImageMap[nombre] || 'images/torta.png'
        };

        calculadoraState.productos.push(producto);
        actualizarListaProductos();
        calcularTotales();

        showPromoNotification(`${nombre} agregado a la calculadora`);
    }, 800);
}

// Función para redirigir a calculadora con combo pre-armado
function irACalculadoraConCombo(tipoCombo) {
    // Scroll a la calculadora
    const calculadora = document.getElementById('calculadora-promociones');
    if (calculadora) {
        calculadora.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    setTimeout(() => {
        // Definir los combos
        const combos = {
            'desayuno-parisino': [
                { precio: 4000, nombre: 'Croissant Tradicional', categoria: 'viennoiserie' }
            ],
            'dulce-frances': [
                { precio: 14000, nombre: 'Caja x6 Macarons', categoria: 'macarons' },
                { precio: 2200, nombre: 'Éclair de Chocolate', categoria: 'especialidades' }
            ],
            'celebracion-elegante': [
                { precio: 7200, nombre: 'Tarte Tatin', categoria: 'pasteles' },
                { precio: 27000, nombre: 'Caja x12 Macarons', categoria: 'macarons' }
            ]
        };

        // Obtener productos del combo
        const productosCombo = combos[tipoCombo];

        if (productosCombo) {
            // Agregar cada producto del combo
            productosCombo.forEach(prod => {
                const producto = {
                    id: Date.now() + Math.random(),
                    nombre: prod.nombre,
                    precio: prod.precio,
                    cantidad: 1,
                    categoria: prod.categoria,
                    imagen: productImageMap[prod.nombre] || 'images/torta.png'
                };
                calculadoraState.productos.push(producto);
            });

            // Seleccionar la promoción adecuada
            if (tipoCombo === 'dulce-frances') {
                seleccionarPromocion('festival-macarons');
            } else if (tipoCombo === 'celebracion-elegante') {
                seleccionarPromocion('cliente-premium');
            } else {
                seleccionarPromocion('manana-francesa');
            }

            actualizarListaProductos();
            calcularTotales();

            showPromoNotification('¡Combo agregado a la calculadora! Personalizá tu pedido.');
        }
    }, 800);
}

// ==================== SISTEMA DE BÚSQUEDA Y FILTROS ====================

let currentFilter = 'all';
let currentSearchTerm = '';

function initSearch() {
    const searchInput = document.getElementById('promo-search');
    const searchClear = document.getElementById('search-clear');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!searchInput) return;

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function(e) {
        currentSearchTerm = e.target.value.toLowerCase();
        if (searchClear) {
            searchClear.style.display = currentSearchTerm ? 'flex' : 'none';
        }
        filterPromos();
    });

    // Limpiar búsqueda
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            currentSearchTerm = '';
            searchClear.style.display = 'none';
            filterPromos();
        });
    }

    // Filtros por categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterPromos();
        });
    });
}

function filterPromos() {
    const promos = document.querySelectorAll('.promo-card');
    const resultsInfo = document.getElementById('results-info');
    const resultsCount = document.getElementById('results-count');
    let visibleCount = 0;

    promos.forEach(promo => {
        const category = promo.dataset.category;
        const searchTerms = promo.dataset.searchTerms || '';
        const titleEl = promo.querySelector('h3');
        const descriptionEl = promo.querySelector('.promo-description');

        const title = titleEl ? titleEl.textContent.toLowerCase() : '';
        const description = descriptionEl ? descriptionEl.textContent.toLowerCase() : '';

        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = !currentSearchTerm ||
            searchTerms.includes(currentSearchTerm) ||
            title.includes(currentSearchTerm) ||
            description.includes(currentSearchTerm);

        if (matchesFilter && matchesSearch) {
            promo.style.display = 'block';
            promo.style.animation = 'fadeInUp 0.5s ease-out';
            visibleCount++;
        } else {
            promo.style.display = 'none';
        }
    });

    // Mostrar/ocultar mensaje de resultados
    if (resultsInfo && resultsCount) {
        if (currentSearchTerm) {
            resultsCount.textContent = visibleCount;
            resultsInfo.style.display = 'block';
        } else {
            resultsInfo.style.display = 'none';
        }
    }

    // Actualizar contadores de filtros
    updateFilterCounts();
}

function updateFilterCounts() {
    const promos = document.querySelectorAll('.promo-card');
    const counts = { all: 0, viennoiserie: 0, macarons: 0, premium: 0 };

    promos.forEach(promo => {
        const category = promo.dataset.category;
        counts.all++;
        counts[category] = (counts[category] || 0) + 1;
    });

    Object.keys(counts).forEach(key => {
        const countEl = document.getElementById(`count-${key}`);
        if (countEl) countEl.textContent = counts[key];
    });
}

// ==================== SISTEMA DE FAVORITOS ====================

let favorites = JSON.parse(localStorage.getItem('belle-epoque-favorites') || '[]');

function initFavorites() {
    // Cargar favoritos guardados
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const promoId = btn.dataset.promo;
        if (favorites.includes(promoId)) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFavorite(promoId, this);
        });
    });
}

function toggleFavorite(promoId, btn) {
    const icon = btn.querySelector('i');

    if (favorites.includes(promoId)) {
        // Remover de favoritos
        favorites = favorites.filter(id => id !== promoId);
        btn.classList.remove('active');
        if (icon) {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
        showToast('Promoción removida de favoritos', 'info');
    } else {
        // Agregar a favoritos
        favorites.push(promoId);
        btn.classList.add('active');
        if (icon) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
        btn.style.animation = 'heartBounce 0.6s ease';
        setTimeout(() => btn.style.animation = '', 600);
        showToast('Promoción agregada a favoritos ❤️', 'success');
    }

    localStorage.setItem('belle-epoque-favorites', JSON.stringify(favorites));
}

// ==================== TEMPORIZADORES DE CUENTA REGRESIVA ====================

function initCountdowns() {
    const countdowns = document.querySelectorAll('.countdown-timer');

    countdowns.forEach(timer => {
        const endDate = new Date(timer.dataset.end);
        updateCountdown(timer, endDate);
        setInterval(() => updateCountdown(timer, endDate), 1000);
    });
}

function updateCountdown(element, endDate) {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
        element.innerHTML = '<i class="fas fa-clock"></i> Promoción finalizada';
        element.classList.add('expired');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let html = '<i class="fas fa-hourglass-half"></i> Termina en: ';

    if (days > 0) html += `<span>${days}d</span> `;
    if (hours > 0 || days > 0) html += `<span>${hours}h</span> `;
    html += `<span>${minutes}m</span> `;
    html += `<span>${seconds}s</span>`;

    element.innerHTML = html;

    // Urgencia si quedan menos de 24 horas
    if (diff < 24 * 60 * 60 * 1000) {
        element.classList.add('urgent');
    }
}

// ==================== MODAL DE DETALLES ====================

const promoData = {
    'manana-francesa': {
        title: 'Mañana Francesa Perfecta',
        image: 'images/croissants.png',
        fullDescription: 'Disfrutá de la auténtica experiencia del desayuno francés con nuestra promoción estrella. Llevá 2 productos de viennoiserie y obtené 50% de descuento en el segundo de menor o igual valor.',
        products: ['Croissant Tradicional', 'Pain au Chocolat', 'Croissant de Almendra', 'Pain aux Raisins', 'Brioche', 'Chausson aux Pommes'],
        terms: [
            'Válido todos los días durante el horario de atención',
            'El descuento se aplica al producto de menor o igual valor',
            'No acumulable con otras promociones',
            'Sujeto a disponibilidad de stock',
            'Aplicable tanto para consumo en local como take away'
        ],
        savings: 'Ahorrá hasta $2.500 en tu desayuno',
        validUntil: '23 de Octubre de 2025'
    },
    'festival-macarons': {
        title: 'Festival de Macarons',
        image: 'images/macarons.png',
        fullDescription: 'Sumérgete en el mundo de los macarons parisinos. Comprá 3 macarons de cualquier sabor y pagá solo 2. Una oportunidad perfecta para probar nuestros 8 sabores únicos.',
        products: ['Chocolate', 'Vainilla', 'Fresa', 'Limón', 'Pistacho', 'Café', 'Frambuesa', 'Caramelo Salado'],
        terms: [
            'Válido de lunes a viernes',
            'Podés elegir diferentes sabores',
            'El descuento se aplica al macaron de menor valor',
            'Máximo 6 macarons por transacción con esta promoción',
            'Preparación artesanal diaria'
        ],
        savings: 'Ahorrá $2.500 cada 3 macarons',
        validUntil: '20 de Octubre de 2025'
    },
    'cliente-premium': {
        title: 'Cliente Premium',
        image: 'images/torta.png',
        fullDescription: 'Convertite en cliente premium y accedé a beneficios exclusivos. Obtené 10% de descuento en compras superiores a $30.000, aplicable a toda nuestra línea de productos.',
        products: ['Toda la línea de productos Belle Époque'],
        terms: [
            'Válido todos los días',
            'Monto mínimo de compra: $30.000',
            'Descuento aplicado automáticamente al alcanzar el monto',
            'Incluye viennoiserie, macarons, pasteles y especialidades',
            'Ideal para eventos y celebraciones'
        ],
        savings: 'Ahorrá desde $3.000 en compras grandes',
        validUntil: '21 de Octubre de 2025'
    }
};

function openPromoModal(promoId) {
    const modal = document.getElementById('promo-modal');
    const modalBody = document.getElementById('modal-body');
    const data = promoData[promoId];

    if (!modal || !modalBody || !data) return;

    // Generar contenido del modal
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <h2 id="modal-title">${data.title}</h2>
        </div>
        <div class="modal-description">
            <p>${data.fullDescription}</p>
        </div>
        <div class="modal-section">
            <h3><i class="fas fa-box"></i> Productos Incluidos</h3>
            <ul class="modal-list">
                ${data.products.map(p => `<li><i class="fas fa-check"></i> ${p}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section">
            <h3><i class="fas fa-file-contract"></i> Términos y Condiciones</h3>
            <ul class="modal-list">
                ${data.terms.map(t => `<li><i class="fas fa-info-circle"></i> ${t}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-highlight">
            <i class="fas fa-piggy-bank"></i>
            <strong>${data.savings}</strong>
        </div>
        <div class="modal-footer">
            <p class="modal-valid">Válido hasta: <strong>${data.validUntil}</strong></p>
            <div class="modal-actions">
                <button class="modal-btn primary ripple-effect" onclick="agregarPromocion('${promoId}'); closePromoModal();">
                    <i class="fas fa-cart-plus"></i>
                    ¡Quiero esta promo!
                </button>
                <button class="modal-btn secondary ripple-effect" onclick="sharePromo('${data.title}')">
                    <i class="fas fa-share-alt"></i>
                    Compartir
                </button>
            </div>
        </div>
    `;

    // Mostrar modal con animación
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closePromoModal() {
    const modal = document.getElementById('promo-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initModal() {
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    if (modalClose) {
        modalClose.addEventListener('click', closePromoModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closePromoModal);
    }

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closePromoModal();
    });
}

function sharePromo(title) {
    if (navigator.share) {
        navigator.share({
            title: `Belle Époque - ${title}`,
            text: `¡Mirá esta promoción increíble de Belle Époque!`,
            url: window.location.href
        }).then(() => {
            showToast('Promoción compartida exitosamente', 'success');
        }).catch(() => {
            showToast('No se pudo compartir', 'error');
        });
    } else {
        // Copiar al portapapeles
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copiado al portapapeles', 'success');
        });
    }
}

// ==================== SISTEMA DE TOAST NOTIFICATIONS ====================

function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==================== BOTÓN VOLVER ARRIBA Y SCROLL PROGRESS ====================

function initScrollFeatures() {
    const backToTop = document.getElementById('back-to-top');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Mostrar/ocultar botón volver arriba
        if (backToTop) {
            if (scrolled > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Actualizar barra de progreso
        if (scrollProgress) {
            const scrollPercent = (scrolled / (docHeight - windowHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== LAZY LOADING DE IMÁGENES ====================

function initLazyLoading() {
    const images = document.querySelectorAll('img.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.filter = 'blur(10px)';

                // Simular carga
                setTimeout(() => {
                    img.style.transition = 'filter 0.5s ease';
                    img.style.filter = 'blur(0)';
                }, 200);

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== SKELETON LOADER ====================

function initSkeletonLoader() {
    const skeletonOverlay = document.getElementById('skeleton-overlay');

    if (skeletonOverlay) {
        // Simular carga de 1.5 segundos
        setTimeout(() => {
            skeletonOverlay.style.opacity = '0';
            setTimeout(() => {
                skeletonOverlay.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// ==================== RIPPLE EFFECT EN BOTONES ====================

function initRippleEffect() {
    document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== SOCIAL PROOF DINÁMICO ====================

function initSocialProof() {
    const viewerCounters = document.querySelectorAll('.viewers-count');

    // Actualizar contadores cada 10-15 segundos
    viewerCounters.forEach(counter => {
        const baseCount = parseInt(counter.dataset.base);

        setInterval(() => {
            const variation = Math.floor(Math.random() * 5) - 2; // -2 a +2
            const newCount = Math.max(baseCount + variation, 1);
            counter.textContent = newCount;
            counter.style.animation = 'pulse 0.5s ease';
            setTimeout(() => counter.style.animation = '', 500);
        }, 12000 + Math.random() * 6000);
    });
}

// ==================== EFECTOS PARALLAX SUAVES ====================

function initParallax() {
    const heroSection = document.querySelector('.hero-promociones');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (heroSection && scrolled < 600) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ==================== ANIMACIONES AL SCROLL MEJORADAS ====================

function initEnhancedScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ==================== CARRUSELES DINÁMICOS ====================

function initCarousels() {
    // Inicializar carrusel de Productos Populares con breakpoints personalizados
    // Para coincidir con el CSS: 768px->2 items, 1200px->3 items, 1400px->4 items
    const popularTrack = document.querySelector('.popular-products');
    if (popularTrack) {
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
    }

    // Inicializar carrusel de Tips con breakpoints por defecto
    // 768px->2 items, 1024px->3 items, 1400px->4 items
    const tipsTrack = document.querySelector('.tips-grid');
    if (tipsTrack) {
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
    }
}

// ==================== INDICADORES DE STOCK DINÁMICOS ====================

function initStockIndicators() {
    const stockIndicators = document.querySelectorAll('.stock-indicator:not(.unlimited)');

    // Simular actualización de stock cada 30 segundos
    stockIndicators.forEach(indicator => {
        setInterval(() => {
            const currentStock = parseInt(indicator.dataset.stock);
            const total = parseInt(indicator.dataset.total);

            if (currentStock > 0) {
                const newStock = Math.max(currentStock - Math.floor(Math.random() * 3), 5);
                indicator.dataset.stock = newStock;

                const percentage = (newStock / total) * 100;
                const bar = indicator.querySelector('.stock-bar');
                const text = indicator.querySelector('.stock-text strong');

                if (bar) bar.style.width = percentage + '%';
                if (text) text.textContent = `${newStock} unidades`;

                // Cambiar color según disponibilidad
                if (percentage < 20) {
                    bar?.classList.add('critical');
                    indicator.classList.add('low-stock');
                } else if (percentage < 50) {
                    bar?.classList.add('warning');
                }
            }
        }, 30000);
    });
}
