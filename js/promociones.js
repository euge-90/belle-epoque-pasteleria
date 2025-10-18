/**
 * Belle Époque - Sistema de Promociones Interactivo
 * Archivo: promociones.js
 * Descripción: Maneja toda la lógica de cálculo de promociones y descuentos
 * Autor: Belle Époque Dev Team
 * Fecha: 2025
 */

// ====================================
// ESTADO DE LA APLICACIÓN
// ====================================
const appState = {
    activePromo: '2x1',
    products: [],
    subtotal: 0,
    discount: 0,
    total: 0
};

// ====================================
// CONFIGURACIÓN DE PROMOCIONES
// ====================================
const promotions = {
    '2x1': {
        name: 'Promo Duo Francés',
        description: 'Llevá 2 productos y obtené 50% de descuento en el segundo (se aplica al de menor valor)',
        icon: '🥐',
        calculate: function(products) {
            if (products.length < 2) return 0;
            
            // Ordenar productos por precio (de mayor a menor)
            const sortedProducts = [...products].sort((a, b) => b.price - a.price);
            let discount = 0;
            
            // Aplicar 50% de descuento en cada segundo producto
            for (let i = 1; i < sortedProducts.length; i += 2) {
                discount += sortedProducts[i].price * sortedProducts[i].quantity * 0.5;
            }
            
            return discount;
        }
    },
    '3x2': {
        name: 'Festival de Dulces',
        description: '3x2 en productos seleccionados - Pagá 2 y llevá 3 (se descuenta el de menor valor)',
        icon: '🍰',
        calculate: function(products) {
            if (products.length === 0) return 0;
            
            // Crear array con todos los productos individuales
            let allItems = [];
            products.forEach(product => {
                for (let i = 0; i < product.quantity; i++) {
                    allItems.push(product.price);
                }
            });
            
            // Ordenar de mayor a menor precio
            allItems.sort((a, b) => b - a);
            
            let discount = 0;
            // Por cada grupo de 3, descontar el más barato
            for (let i = 2; i < allItems.length; i += 3) {
                discount += allItems[i];
            }
            
            return discount;
        }
    },
    'descuento10': {
        name: 'Cliente Premium',
        description: '10% de descuento en compras superiores a $30,000',
        icon: '💎',
        calculate: function(products) {
            const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            return total >= 30000 ? total * 0.1 : 0;
        },
        minimumAmount: 30000
    }
};

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadSavedCart();
    updatePromoInfo();
});

/**
 * Inicializa todos los event listeners
 */
function initializeEventListeners() {
    // Botones de promoción
    document.querySelectorAll('.promo-btn').forEach(btn => {
        btn.addEventListener('click', handlePromoChange);
    });
    
    // Botón de agregar producto
    document.getElementById('add-product-btn').addEventListener('click', handleAddProduct);
    
    // Enter en el campo de cantidad
    document.getElementById('quantity-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddProduct();
        }
    });
    
    // Botón de limpiar
    document.getElementById('clear-btn').addEventListener('click', handleClearCart);
    
    // Cambio en el selector de producto
    document.getElementById('product-select').addEventListener('change', function() {
        if (this.value) {
            document.getElementById('quantity-input').focus();
        }
    });
    
    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// ====================================
// MANEJO DE PROMOCIONES
// ====================================
/**
 * Maneja el cambio de promoción activa
 * @param {Event} event - Evento del click
 */
function handlePromoChange(event) {
    const button = event.currentTarget;
    const promo = button.dataset.promo;
    
    // Actualizar estado
    appState.activePromo = promo;
    
    // Actualizar UI
    document.querySelectorAll('.promo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Actualizar información
    updatePromoInfo();
    
    // Recalcular si hay productos
    if (appState.products.length > 0) {
        calculateTotal();
    }
    
    // Animación de feedback
    animateElement(button, 'pulse');
}

/**
 * Actualiza la información de la promoción activa
 */
function updatePromoInfo() {
    const promo = promotions[appState.activePromo];
    const infoElement = document.getElementById('promo-info');
    
    infoElement.innerHTML = `
        <p>📌 <strong>Promo activa:</strong> ${promo.description}</p>
        ${promo.minimumAmount ? `<p>💰 <strong>Compra mínima:</strong> $${formatNumber(promo.minimumAmount)}</p>` : ''}
    `;
    
    animateElement(infoElement, 'fadeIn');
}

// ====================================
// MANEJO DE PRODUCTOS
// ====================================
/**
 * Agrega un producto al carrito
 */
function handleAddProduct() {
    const select = document.getElementById('product-select');
    const quantityInput = document.getElementById('quantity-input');
    
    // Validaciones
    if (!select.value) {
        showNotification('Por favor, seleccioná un producto', 'warning');
        select.focus();
        return;
    }
    
    const quantity = parseInt(quantityInput.value) || 1;
    if (quantity < 1 || quantity > 20) {
        showNotification('La cantidad debe ser entre 1 y 20', 'warning');
        quantityInput.focus();
        return;
    }
    
    // Obtener datos del producto
    const selectedOption = select.options[select.selectedIndex];
    const product = {
        id: Date.now(),
        name: selectedOption.dataset.name,
        price: parseFloat(select.value),
        quantity: quantity
    };
    
    // Agregar al estado
    appState.products.push(product);
    
    // Actualizar UI
    renderProducts();
    calculateTotal();
    
    // Limpiar formulario
    select.value = '';
    quantityInput.value = 1;
    
    // Guardar en localStorage
    saveCart();
    
    // Feedback visual
    showNotification(`${product.name} agregado al carrito`, 'success');
}

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto a eliminar
 */
function removeProduct(productId) {
    const productIndex = appState.products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        const product = appState.products[productIndex];
        appState.products.splice(productIndex, 1);
        
        renderProducts();
        calculateTotal();
        saveCart();
        
        showNotification(`${product.name} eliminado`, 'info');
    }
}

/**
 * Renderiza la lista de productos
 */
function renderProducts() {
    const container = document.getElementById('products-container');
    
    if (appState.products.length === 0) {
        container.innerHTML = '<p class="empty-message">Aún no agregaste productos. ¡Comenzá seleccionando tus favoritos! 🛒</p>';
        document.getElementById('results-section').style.display = 'none';
        return;
    }
    
    container.innerHTML = appState.products.map(product => `
        <div class="product-item" data-id="${product.id}">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-details">
                    ${product.quantity} ${product.quantity > 1 ? 'unidades' : 'unidad'} × $${formatNumber(product.price)} = $${formatNumber(product.price * product.quantity)}
                </div>
            </div>
            <button class="remove-btn" onclick="removeProduct(${product.id})">
                🗑️
            </button>
        </div>
    `).join('');
    
    // Animar productos nuevos
    container.querySelectorAll('.product-item').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, index * 50);
    });
}

// ====================================
// CÁLCULOS
// ====================================
/**
 * Calcula el total con descuentos
 */
function calculateTotal() {
    if (appState.products.length === 0) {
        document.getElementById('results-section').style.display = 'none';
        return;
    }
    
    // Calcular subtotal
    appState.subtotal = appState.products.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);
    
    // Calcular descuento según promoción activa
    const promo = promotions[appState.activePromo];
    appState.discount = promo.calculate(appState.products);
    
    // Calcular total
    appState.total = appState.subtotal - appState.discount;
    
    // Actualizar UI
    updateResults();
}

/**
 * Actualiza la visualización de resultados
 */
function updateResults() {
    document.getElementById('results-section').style.display = 'block';
    
    // Actualizar valores
    document.getElementById('subtotal').textContent = `$${formatNumber(appState.subtotal)}`;
    document.getElementById('discount').textContent = `-$${formatNumber(appState.discount)}`;
    document.getElementById('total').textContent = `$${formatNumber(appState.total)}`;
    
    // Calcular y mostrar porcentaje de ahorro
    const savingsPercentage = appState.subtotal > 0 
        ? Math.round((appState.discount / appState.subtotal) * 100) 
        : 0;
    
    document.getElementById('savings-percentage').textContent = `${savingsPercentage}%`;
    
    // Mostrar/ocultar mensaje de ahorro
    const savingsMessage = document.getElementById('savings-message');
    if (appState.discount > 0) {
        savingsMessage.style.display = 'block';
        animateElement(savingsMessage, 'pulse');
    } else {
        savingsMessage.style.display = 'none';
    }
    
    // Animación de los resultados
    animateElement(document.getElementById('results-section'), 'fadeIn');
}

// ====================================
// UTILIDADES
// ====================================
/**
 * Formatea números con separador de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
function formatNumber(num) {
    return new Intl.NumberFormat('es-AR').format(num);
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, warning, info)
 */
function showNotification(message, type = 'info') {
    // Eliminar notificación existente si la hay
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
    `;
    
    // Estilos en línea para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Aplica una animación a un elemento
 * @param {HTMLElement} element - Elemento a animar
 * @param {string} animationName - Nombre de la animación
 */
function animateElement(element, animationName) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = `${animationName} 0.5s ease`;
    }, 10);
}

/**
 * Limpia el carrito
 */
function handleClearCart() {
    if (appState.products.length === 0) return;
    
    if (confirm('¿Estás seguro de que querés limpiar el carrito?')) {
        appState.products = [];
        appState.subtotal = 0;
        appState.discount = 0;
        appState.total = 0;
        
        renderProducts();
        calculateTotal();
        clearSavedCart();
        
        showNotification('Carrito limpiado', 'info');
    }
}

// ====================================
// LOCAL STORAGE
// ====================================
/**
 * Guarda el carrito en localStorage
 */
function saveCart() {
    const cartData = {
        products: appState.products,
        activePromo: appState.activePromo,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('belleEpoqueCart', JSON.stringify(cartData));
}

/**
 * Carga el carrito guardado
 */
function loadSavedCart() {
    const savedCart = localStorage.getItem('belleEpoqueCart');
    if (savedCart) {
        try {
            const cartData = JSON.parse(savedCart);
            
            // Verificar que no sea muy antiguo (24 horas)
            const savedTime = new Date(cartData.timestamp);
            const now = new Date();
            const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                appState.products = cartData.products || [];
                appState.activePromo = cartData.activePromo || '2x1';
                
                // Actualizar UI
                renderProducts();
                calculateTotal();
                
                // Actualizar promoción activa
                document.querySelectorAll('.promo-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.promo === appState.activePromo);
                });
                
                showNotification('Carrito recuperado', 'info');
            } else {
                clearSavedCart();
            }
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            clearSavedCart();
        }
    }
}

/**
 * Limpia el carrito guardado
 */
function clearSavedCart() {
    localStorage.removeItem('belleEpoqueCart');
}

// ====================================
// ANIMACIONES CSS DINÁMICAS
// ====================================
// Agregar estilos de animación al documento
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .product-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .product-item.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ====================================
// FUNCIONES DE DEBUG (solo desarrollo)
// ====================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debug = {
        showState: () => console.table(appState),
        addTestProducts: () => {
            appState.products = [
                { id: 1, name: 'Croissant Clásico', price: 3500, quantity: 2 },
                { id: 2, name: 'Macaron', price: 1200, quantity: 5 },
                { id: 3, name: 'Tarta Tatin', price: 18000, quantity: 1 }
            ];
            renderProducts();
            calculateTotal();
        }
    };
}