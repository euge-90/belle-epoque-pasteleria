/**
 * BELLE ÉPOQUE - Carrito de Compras
 * Sistema de carrito con localStorage y descuentos automáticos
 */

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();

        // Validación de seguridad: asegurar que items es un array
        if (!Array.isArray(this.items)) {
            console.error('❌ CRITICAL: this.items no es un array, forzando []');
            this.items = [];
        }

        // Mapeo de productos a categorías para aplicar descuentos automáticos
        this.productCategories = {
            // Viennoiserie
            'croissant-tradicional': 'viennoiserie',
            'pain-au-chocolat': 'viennoiserie',
            'croissant-almendras': 'viennoiserie',
            'pain-aux-raisins': 'viennoiserie',
            'brioche': 'viennoiserie',
            'chausson-aux-pommes': 'viennoiserie',

            // Macarons
            'macaron-frambuesa': 'macarons',
            'macaron-pistacho': 'macarons',
            'macaron-chocolate': 'macarons',
            'macaron-vainilla': 'macarons',
            'macaron-lavanda': 'macarons',
            'macaron-limon': 'macarons',
            'macaron-rosa': 'macarons',
            'macaron-caramelo': 'macarons'
        };

        this.init();
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    init() {
        this.createCartButton();
        this.createCartModal();
        this.updateCartCount();
        this.attachEventListeners();
    }

    // ============================================
    // CREAR BOTÓN DEL CARRITO
    // ============================================
    createCartButton() {
        // Verificar si ya existe
        if (document.querySelector('.cart-widget')) return;

        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const cartWidget = document.createElement('div');
        cartWidget.className = 'cart-widget';
        cartWidget.innerHTML = `
            <button id="cart-btn" class="cart-button" aria-label="Ver carrito">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-count" class="cart-count">0</span>
            </button>
        `;

        // Insertar antes del menu-toggle
        const menuToggle = navbar.querySelector('.menu-toggle');
        if (menuToggle) {
            navbar.insertBefore(cartWidget, menuToggle);
        } else {
            navbar.appendChild(cartWidget);
        }

        // Evento para abrir modal
        document.getElementById('cart-btn').addEventListener('click', () => {
            this.openCartModal();
        });
    }

    // ============================================
    // CREAR MODAL DEL CARRITO
    // ============================================
    createCartModal() {
        // Verificar si ya existe
        if (document.getElementById('cart-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'modal cart-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content cart-modal-content">
                <div class="modal-header">
                    <h2>
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-title-label" data-translate="carrito.tu.pedido">Tu Pedido</span>
                        <span class="cart-title-count" aria-live="polite"></span>
                    </h2>
                    <button class="modal-close" aria-label="Cerrar">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="cart-items" class="cart-items"></div>
                    <div id="empty-cart" class="empty-cart" style="display: none;">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                        <a href="productos.html" class="btn-primary">Ver Productos</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="cart-summary">
                        <div class="cart-subtotal">
                            <span>Subtotal:</span>
                            <span id="cart-subtotal-amount">$0</span>
                        </div>
                        <div id="cart-discounts" class="cart-discounts"></div>
                        <div class="cart-total">
                            <strong>Total:</strong>
                            <span id="cart-total-amount" class="total-amount">$0</span>
                        </div>
                    </div>
                    <div class="cart-actions">
                        <button id="cart-checkout" class="btn-primary">
                            <i class="fab fa-whatsapp"></i>
                            Finalizar pedido
                        </button>
                        <button id="cart-clear" class="btn-secondary">
                            <i class="fas fa-trash"></i>
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Eventos
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeCartModal());
        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeCartModal());
        modal.querySelector('#cart-clear').addEventListener('click', () => this.clearCart());
        modal.querySelector('#cart-checkout').addEventListener('click', () => this.checkout());
    }

    // ============================================
    // AGREGAR AL CARRITO
    // ============================================
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        // Obtener categoría: usar la proporcionada o buscar en el mapa
        const category = product.category || this.productCategories[product.id] || 'otros';

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: product.image || '',
                category: category
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();

        // Mostrar notificación
        if (window.BelleEpoque && window.BelleEpoque.showToast) {
            window.BelleEpoque.showToast('Producto agregado al carrito', 'success');
        }

        return true;
    }

    // ============================================
    // REMOVER DEL CARRITO
    // ============================================
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();

        if (window.BelleEpoque && window.BelleEpoque.showToast) {
            window.BelleEpoque.showToast('Producto eliminado del carrito', 'info');
        }
    }

    // ============================================
    // ACTUALIZAR CANTIDAD
    // ============================================
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartCount();
            this.renderCartItems();
        }
    }

    // ============================================
    // VACIAR CARRITO
    // ============================================
    clearCart() {
        if (this.items.length === 0) return;

        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.items = [];
            this.saveCart();
            this.updateCartCount();
            this.renderCartItems();

            if (window.BelleEpoque && window.BelleEpoque.showToast) {
                window.BelleEpoque.showToast('Carrito vaciado', 'info');
            }
        }
    }

    // ============================================
    // CALCULAR DESCUENTOS
    // ============================================
    calculateDiscount() {
        let totalDiscount = 0;
        const appliedPromos = [];

        // Promoción 1: Mañana Francesa (50% en el segundo item)
        const viennoiserie = this.items.filter(item => item.category === 'viennoiserie');
        if (viennoiserie.length > 0) {
            // Contar cantidad total de productos viennoiserie
            let totalProducts = viennoiserie.reduce((sum, item) => sum + item.quantity, 0);

            // Necesitamos al menos 2 productos para la promo
            if (totalProducts >= 2) {
                let pairs = Math.floor(totalProducts / 2);

                // Crear un array con todos los productos expandidos por cantidad
                let expandedProducts = [];
                viennoiserie.forEach(item => {
                    for (let i = 0; i < item.quantity; i++) {
                        expandedProducts.push({ price: item.price, name: item.name });
                    }
                });

                // Ordenar por precio descendente
                expandedProducts.sort((a, b) => b.price - a.price);

                // Calcular descuento: 50% del más barato de cada par
                let discountAmount = 0;
                for (let i = 0; i < pairs; i++) {
                    const idx1 = i * 2;
                    const idx2 = i * 2 + 1;

                    if (idx2 < expandedProducts.length) {
                        const price1 = expandedProducts[idx1].price;
                        const price2 = expandedProducts[idx2].price;
                        const cheaperPrice = Math.min(price1, price2);

                        discountAmount += cheaperPrice * 0.5;
                    }
                }

                totalDiscount += discountAmount;
                if (discountAmount > 0) {
                    appliedPromos.push({
                        name: 'Mañana Francesa (2do al 50%)',
                        discount: discountAmount
                    });
                }
            }
        }

        // Promoción 2: Festival de Macarons (3x2 - el 3ro gratis)
        // Solo aplica a macarons individuales, no a cajas
        const macaronsIndividuales = this.items.filter(item =>
            item.category === 'macarons' &&
            (item.name.includes('Macaron de') || item.name === 'Macaron de Frambuesa' ||
             item.name === 'Macaron de Pistacho' || item.name === 'Macaron de Chocolate' ||
             item.name === 'Macaron de Vainilla' || item.name === 'Macaron de Lavanda' ||
             item.name === 'Macaron de Limón' || item.name === 'Macaron de Rosa' ||
             item.name === 'Macaron de Caramelo')
        );

        if (macaronsIndividuales.length > 0) {
            let totalMacarons = macaronsIndividuales.reduce((sum, item) => sum + item.quantity, 0);
            let groupsOf3 = Math.floor(totalMacarons / 3);

            if (groupsOf3 > 0) {
                // Por cada grupo de 3, descontar 1 macaron
                // Asumiendo que todos los macarons individuales cuestan lo mismo
                const precioMacaron = macaronsIndividuales[0].price;
                const discountAmount = precioMacaron * groupsOf3;

                totalDiscount += discountAmount;
                appliedPromos.push({
                    name: 'Festival de Macarons (3x2)',
                    discount: discountAmount
                });
            }
        }

        // Promoción 3: Cliente Premium (10% en compras > $30,000)
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (subtotal >= 30000) {
            const premiumDiscount = subtotal * 0.1;
            totalDiscount += premiumDiscount;
            appliedPromos.push({
                name: 'Cliente Premium (-10%)',
                discount: premiumDiscount
            });
        }

        return {
            totalDiscount,
            appliedPromos
        };
    }

    // ============================================
    // CALCULAR TOTAL
    // ============================================
    calculateTotal() {
        const subtotal = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        const { totalDiscount } = this.calculateDiscount();

        return subtotal - totalDiscount;
    }

    // ============================================
    // CALCULAR SUBTOTAL (sin descuentos)
    // ============================================
    calculateSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // ============================================
    // ACTUALIZAR CONTADOR
    // ============================================
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        const countElement = document.getElementById('cart-count');

        if (countElement) {
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';

            // Animación de pulso
            countElement.classList.add('pulse');
            setTimeout(() => countElement.classList.remove('pulse'), 300);
        }

        // Actualizar contador en el título del modal si existe
        const modalTitleCount = document.querySelector('#cart-modal .cart-title-count');
        if (modalTitleCount) {
            modalTitleCount.textContent = count > 0 ? ` (${count})` : '';
        }
    }

    // ============================================
    // RENDERIZAR ITEMS DEL CARRITO
    // ============================================
    renderCartItems() {
        const container = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const totalElement = document.getElementById('cart-total-amount');

        if (!container) return;

        if (this.items.length === 0) {
            container.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'flex';
            if (totalElement) totalElement.textContent = '$0';
            return;
        }

        container.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                ${item.image ? `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                ` : ''}
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toLocaleString('es-AR')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn qty-minus" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number"
                           class="qty-input"
                           value="${item.quantity}"
                           min="1"
                           data-id="${item.id}"
                           readonly>
                    <button class="qty-btn qty-plus" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-subtotal">
                    $${(item.price * item.quantity).toLocaleString('es-AR')}
                </div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Actualizar subtotal, descuentos y total
        const subtotal = this.calculateSubtotal();
    const { totalDiscount, appliedPromos } = this.calculateDiscount();
        const total = subtotal - totalDiscount;

        const subtotalElement = document.getElementById('cart-subtotal-amount');
        const discountsElement = document.getElementById('cart-discounts');

        if (subtotalElement) {
            subtotalElement.textContent = `$${subtotal.toLocaleString('es-AR')}`;
        }

        // Mostrar descuentos aplicados
        if (discountsElement) {
            if (appliedPromos.length > 0) {
                discountsElement.innerHTML = appliedPromos.map(promo => `
                    <div class="cart-discount-item">
                        <span class="discount-name">
                            <i class="fas fa-tag"></i> ${promo.name}
                        </span>
                        <span class="discount-amount">-$${promo.discount.toLocaleString('es-AR')}</span>
                    </div>
                `).join('');
                discountsElement.style.display = 'block';
            } else {
                discountsElement.style.display = 'none';
            }
        }

        if (totalElement) {
            totalElement.textContent = `$${total.toLocaleString('es-AR')}`;
        }


        // Eventos de cantidad
        container.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = this.items.find(i => i.id === id);
                if (item && item.quantity > 1) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });
        });

        container.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });

        container.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.removeItem(id);
            });
        });
    }

    // ============================================
    // ABRIR/CERRAR MODAL
    // ============================================
    openCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            this.renderCartItems();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Asegurar que el título muestre la cantidad actual al abrir
            this.updateCartCount();
        }
    }

    closeCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // CHECKOUT - ENVIAR POR WHATSAPP
    // ============================================
    checkout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Crear mensaje para WhatsApp
        let message = '¡Hola Belle Époque! Quiero hacer el siguiente pedido:\n\n';

        this.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Cantidad: ${item.quantity}\n`;
            message += `   Precio: $${item.price.toLocaleString('es-AR')}\n`;
            message += `   Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}\n\n`;
        });

        const subtotal = this.calculateSubtotal();
        const { totalDiscount, appliedPromos } = this.calculateDiscount();
        const total = subtotal - totalDiscount;

        message += `SUBTOTAL: $${subtotal.toLocaleString('es-AR')}\n`;

        // Agregar descuentos si aplican
        if (appliedPromos.length > 0) {
            message += '\n✨ PROMOCIONES APLICADAS:\n';
            appliedPromos.forEach(promo => {
                message += `   ${promo.name}: -$${promo.discount.toLocaleString('es-AR')}\n`;
            });
        }

        message += `\nTOTAL: $${total.toLocaleString('es-AR')}\n\n`;
        message += '¿Podrían confirmar disponibilidad y tiempo de preparación?';

        // Codificar mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/5491145678900?text=${encodedMessage}`;

        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');

        // Opcional: vaciar carrito después de enviar
        setTimeout(() => {
            if (confirm('¿Deseas vaciar el carrito?')) {
                this.clearCart();
                this.closeCartModal();
            }
        }, 1000);
    }

    // ============================================
    // LOCALSTORAGE
    // ============================================
    saveCart() {
        localStorage.setItem('belleEpoqueCart', JSON.stringify(this.items));
    }

    loadCart() {
        try {
            const saved = localStorage.getItem('belleEpoqueCart');
            if (!saved) {
                console.log('📦 Carrito vacío - iniciando nuevo');
                return [];
            }

            const parsed = JSON.parse(saved);

            // Validar que sea un array
            if (!Array.isArray(parsed)) {
                console.warn('⚠️ Datos de carrito inválidos (no es array), limpiando...');
                localStorage.removeItem('belleEpoqueCart');
                return [];
            }

            console.log('✅ Carrito cargado correctamente:', parsed.length, 'items');
            return parsed;

        } catch (error) {
            console.error('❌ Error al cargar carrito desde localStorage:', error);
            // Limpiar localStorage corrupto
            localStorage.removeItem('belleEpoqueCart');
            return [];
        }
    }

    // ============================================
    // ATTACH EVENT LISTENERS
    // ============================================
    attachEventListeners() {
        // Eventos globales para botones "Agregar al carrito"
        document.addEventListener('click', (e) => {
            // Buscar tanto .add-to-cart como .add-to-cart-btn
            const button = e.target.closest('.add-to-cart, .add-to-cart-btn');
            if (button) {
                const productData = {
                    id: button.getAttribute('data-id'),
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    image: button.getAttribute('data-image'),
                    quantity: 1
                };

                this.addItem(productData);
            }
        });
    }
}

// Inicializar carrito cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🛒 Inicializando carrito (DOMContentLoaded)...');
        window.cart = new ShoppingCart();
        console.log('✅ window.cart creado:', typeof window.cart);
    });
} else {
    console.log('🛒 Inicializando carrito (inmediato)...');
    window.cart = new ShoppingCart();
    console.log('✅ window.cart creado:', typeof window.cart);
}

console.log('📦 cart.js cargado correctamente');
