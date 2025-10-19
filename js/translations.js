/**
 * BELLE ÉPOQUE - Sistema de Traducción ES|EN
 * Sistema independiente de i18n que se integra con código existente
 */

class TranslationSystem {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'es';
        this.translations = this.getTranslations();
        this.init();
    }

    // ============================================
    // TRADUCCIONES
    // ============================================
    getTranslations() {
        return {
            es: {
                // Navegación
                'nav.inicio': 'Inicio',
                'nav.nosotros': 'Nosotros',
                'nav.productos': 'Productos',
                'nav.promociones': 'Promociones',
                'nav.faq': 'FAQ',
                'nav.blog': 'Blog',
                'nav.contacto': 'Contacto',
                'nav.carrito': 'Carrito',

                // Hero Index
                'hero.title': 'Belle Époque',
                'hero.subtitle': 'Auténtica pastelería francesa en el corazón de la galería.',

                // Nosotros
                'nosotros.title': 'Nosotros',
                'nosotros.p1': 'Belle Époque nació del amor por la pastelería francesa artesanal y el deseo de compartirla en un lugar cercano, cálido y elegante. Cada madrugada trabajamos la masa con paciencia para lograr ese hojaldre ligero y crujiente que perfuma la galería con manteca francesa y vainilla.',
                'nosotros.quote': '"Creemos en lo simple y bien hecho: ingredientes nobles, técnica clásica y un servicio amable en el corazón de la ciudad."',
                'nosotros.p2': 'Un punto céntrico y práctico para pasar a buscar tu café con croissant, elegir una tarta para compartir o encargar una torta especial. Bienvenidos a nuestra esquina de París en Buenos Aires.',

                // Local
                'local.title': 'Nuestro Local',
                'local.subtitle': 'Ambiente elegante y productos recién hechos en el corazón de la galería.',

                // Productos Preview
                'productos.preview.title': 'Algunos de nuestros productos',
                'productos.ver.catalogo': 'Ver Catálogo Completo',

                // Productos Page
                'productos.hero.title': 'Nuestros Productos',
                'productos.hero.subtitle': 'Sabores auténticos de la pastelería francesa artesanal',
                'productos.banner.promo': '🚚 Pedidos con 24hs de anticipación - Envíos a domicilio 📦',
                'productos.alert.title': '¡Tenemos ofertas especiales!',
                'productos.alert.subtitle': 'Aprovechá descuentos de hasta 50% en productos seleccionados',
                'productos.alert.btn': 'Ver Promociones',
                'productos.filtros.title': 'Explora nuestras categorías',
                'productos.filtros.todos': 'Todos los productos',
                'productos.filtros.croissants': 'Croissants & Viennoiseries',
                'productos.filtros.macarons': 'Macarons',
                'productos.filtros.pasteles': 'Pasteles & Tartas',
                'productos.filtros.especiales': 'Pedidos Especiales',

                // Product Cards
                'producto.vista.rapida': 'Vista Rápida',
                'producto.ver.promo': 'Ver promoción',
                'producto.agregar': 'Agregar al Carrito',
                'producto.porcion': 'Porción',
                'producto.contiene': 'Contiene',
                'producto.alergenos': 'Alérgenos',
                'producto.gluten': 'Gluten',
                'producto.huevo': 'Huevo',
                'producto.lacteos': 'Lácteos',
                'producto.frutos.secos': 'Frutos secos',

                // Categorías de Productos
                'categoria.croissants.title': '🥐 Croissants & Viennoiseries',
                'categoria.croissants.subtitle': 'Hojaldre artesanal elaborado con manteca francesa',
                'categoria.macarons.title': '🍪 Macarons Parisinos',
                'categoria.macarons.subtitle': 'Elaborados según la tradición francesa',
                'categoria.pasteles.title': '🍰 Pasteles & Tartas',
                'categoria.pasteles.subtitle': 'Creaciones artesanales para ocasiones especiales',
                'categoria.especiales.title': '⭐ Pedidos Especiales',
                'categoria.especiales.subtitle': 'Productos personalizados para eventos únicos',

                // Promociones
                'promociones.hero.title': 'Promociones Especiales',
                'promociones.hero.subtitle': 'Descuentos y ofertas en productos seleccionados',

                // Blog
                'blog.hero.title': 'Blog',
                'blog.hero.subtitle': 'Historias, recetas y secretos de la pastelería francesa',

                // FAQ
                'faq.hero.title': 'Preguntas Frecuentes',
                'faq.hero.subtitle': 'Encuentra respuestas a las consultas más comunes',
                'faq.search.placeholder': '🔍 Buscar en preguntas frecuentes...',
                'faq.q1': '¿Hacen envíos a domicilio?',
                'faq.q2': '¿Puedo encargar tortas personalizadas?',
                'faq.q3': '¿Cuánto tiempo de anticipación necesitan para pedidos especiales?',
                'faq.q4': '¿Tienen opciones veganas o sin gluten?',
                'faq.q5': '¿Aceptan reservas para eventos?',
                'faq.q6': '¿Cuáles son sus métodos de pago?',
                'faq.q7': '¿Los productos son de elaboración diaria?',
                'faq.q8': '¿Tienen programa de fidelidad o descuentos?',
                'faq.contact.title': '¿No encontraste lo que buscabas?',
                'faq.contact.subtitle': 'Estamos aquí para ayudarte. Contactanos por cualquiera de estos medios:',
                'faq.contact.whatsapp': 'WhatsApp',
                'faq.contact.email': 'Email',
                'faq.contact.form': 'Formulario de contacto',

                // Política de Privacidad
                'privacidad.hero.title': 'Política de Privacidad y Términos Legales',

                // Contacto
                'contacto.title': 'Contacto',
                'contacto.subtitle': 'Estamos aquí para ayudarte',
                'contacto.nombre': 'Nombre',
                'contacto.email': 'Email',
                'contacto.telefono': 'Teléfono',
                'contacto.mensaje': 'Mensaje',
                'contacto.enviar': 'Enviar Mensaje',
                'contacto.ubicacion': 'Ubicación',
                'contacto.horarios': 'Horarios',
                'contacto.lun.vie': 'Lunes a Viernes',
                'contacto.sabado': 'Sábado',
                'contacto.domingo': 'Domingo',

                // Footer
                'footer.enlaces.rapidos': 'Enlaces Rápidos',
                'footer.sobre.nosotros': 'Sobre Nosotros',
                'footer.politica.privacidad': 'Política de Privacidad',
                'footer.terminos': 'Términos y Condiciones',
                'footer.contacto': 'Contacto',
                'footer.redes': 'Síguenos',
                'footer.copyright': '© 2025 Belle Époque. Todos los derechos reservados.',
                'footer.hecho.con': 'Hecho con',
                'footer.en': 'en Buenos Aires',

                // Carrito
                'carrito.tu.pedido': 'Tu Pedido',
                'carrito.vacio': 'Tu carrito está vacío',
                'carrito.ver.productos': 'Ver Productos',
                'carrito.total': 'Total:',
                'carrito.finalizar': 'Finalizar pedido',
                'carrito.vaciar': 'Vaciar carrito',
                'carrito.agregado': 'Producto agregado al carrito',
                'carrito.eliminado': 'Producto eliminado del carrito',
                'carrito.vaciado': 'Carrito vaciado',
                'carrito.confirmar.vaciar': '¿Estás seguro de que quieres vaciar el carrito?',
                'carrito.confirmar.eliminar': '¿Deseas vaciar el carrito?',
                'carrito.vacio.alert': 'Tu carrito está vacío',

                // Status
                'status.abierto': '🟢 Abierto ahora',
                'status.cerrado': '🔴 Cerrado ahora',

                // Botones
                'btn.leer.mas': 'Leer más',
                'btn.ver.mas': 'Ver más',
                'btn.cerrar': 'Cerrar',
                'btn.aceptar': 'Aceptar',
                'btn.cancelar': 'Cancelar',

                // Cookies
                'cookies.mensaje': '🍪 Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies.',
                'cookies.aceptar': 'Aceptar',
                'cookies.mas.info': 'Más información',

                // WhatsApp
                'whatsapp.label': 'WhatsApp',
                'whatsapp.contactar': 'Contactar por WhatsApp'
            },
            en: {
                // Navigation
                'nav.inicio': 'Home',
                'nav.nosotros': 'About Us',
                'nav.productos': 'Products',
                'nav.promociones': 'Promotions',
                'nav.faq': 'FAQ',
                'nav.blog': 'Blog',
                'nav.contacto': 'Contact',
                'nav.carrito': 'Cart',

                // Hero Index
                'hero.title': 'Belle Époque',
                'hero.subtitle': 'Authentic French pastry in the heart of the gallery.',

                // About Us
                'nosotros.title': 'About Us',
                'nosotros.p1': 'Belle Époque was born from a love for artisanal French pastry and the desire to share it in a warm, welcoming, and elegant place. Every morning, we patiently work the dough to achieve that light, crispy puff pastry that fills the gallery with French butter and vanilla.',
                'nosotros.quote': '"We believe in simplicity done right: noble ingredients, classic technique, and friendly service in the heart of the city."',
                'nosotros.p2': 'A central and convenient spot to pick up your coffee with a croissant, choose a tart to share, or order a special cake. Welcome to our corner of Paris in Buenos Aires.',

                // Local
                'local.title': 'Our Store',
                'local.subtitle': 'Elegant atmosphere and fresh products in the heart of the gallery.',

                // Products Preview
                'productos.preview.title': 'Some of our products',
                'productos.ver.catalogo': 'View Full Catalog',

                // Products Page
                'productos.hero.title': 'Our Products',
                'productos.hero.subtitle': 'Authentic flavors of artisanal French pastry',
                'productos.banner.promo': '🚚 Orders 24 hours in advance - Home delivery 📦',
                'productos.alert.title': 'We have special offers!',
                'productos.alert.subtitle': 'Take advantage of discounts up to 50% on selected products',
                'productos.alert.btn': 'View Promotions',
                'productos.filtros.title': 'Explore our categories',
                'productos.filtros.todos': 'All products',
                'productos.filtros.croissants': 'Croissants & Viennoiseries',
                'productos.filtros.macarons': 'Macarons',
                'productos.filtros.pasteles': 'Pastries & Tarts',
                'productos.filtros.especiales': 'Special Orders',

                // Product Cards
                'producto.vista.rapida': 'Quick View',
                'producto.ver.promo': 'View promotion',
                'producto.agregar': 'Add to Cart',
                'producto.porcion': 'Serving',
                'producto.contiene': 'Contains',
                'producto.alergenos': 'Allergens',
                'producto.gluten': 'Gluten',
                'producto.huevo': 'Egg',
                'producto.lacteos': 'Dairy',
                'producto.frutos.secos': 'Tree nuts',

                // Product Categories
                'categoria.croissants.title': '🥐 Croissants & Viennoiseries',
                'categoria.croissants.subtitle': 'Artisanal puff pastry made with French butter',
                'categoria.macarons.title': '🍪 Parisian Macarons',
                'categoria.macarons.subtitle': 'Made according to French tradition',
                'categoria.pasteles.title': '🍰 Pastries & Tarts',
                'categoria.pasteles.subtitle': 'Artisanal creations for special occasions',
                'categoria.especiales.title': '⭐ Special Orders',
                'categoria.especiales.subtitle': 'Personalized products for unique events',

                // Promotions
                'promociones.hero.title': 'Special Promotions',
                'promociones.hero.subtitle': 'Discounts and offers on selected products',

                // Blog
                'blog.hero.title': 'Blog',
                'blog.hero.subtitle': 'Stories, recipes and secrets of French pastry',

                // FAQ
                'faq.hero.title': 'Frequently Asked Questions',
                'faq.hero.subtitle': 'Everything you need to know about Belle Époque',
                'faq.search.placeholder': '🔍 Search frequently asked questions...',
                'faq.q1': 'Do you offer home delivery?',
                'faq.q2': 'Can I order custom cakes?',
                'faq.q3': 'How much advance notice do you need for special orders?',
                'faq.q4': 'Do you have vegan or gluten-free options?',
                'faq.q5': 'Do you accept reservations for events?',
                'faq.q6': 'What are your payment methods?',
                'faq.q7': 'Are the products made fresh daily?',
                'faq.q8': 'Do you have a loyalty program or discounts?',
                'faq.contact.title': 'Didn\'t find what you were looking for?',
                'faq.contact.subtitle': 'We are here to help you. Contact us through any of these channels:',
                'faq.contact.whatsapp': 'WhatsApp',
                'faq.contact.email': 'Email',
                'faq.contact.form': 'Contact form',

                // Privacy Policy
                'privacidad.hero.title': 'Privacy Policy and Legal Terms',
                'privacidad.politica.titulo': 'Privacy Policy',
                'privacidad.terminos.titulo': 'Terms and Conditions',
                'privacidad.contacto.titulo': 'Contact Information',
                'privacidad.actualizado': 'Last updated:',

                // Contact
                'contacto.title': 'Contact',
                'contacto.subtitle': 'We are here to help you',
                'contacto.nombre': 'Name',
                'contacto.email': 'Email',
                'contacto.telefono': 'Phone',
                'contacto.mensaje': 'Message',
                'contacto.enviar': 'Send Message',
                'contacto.ubicacion': 'Location',
                'contacto.horarios': 'Hours',
                'contacto.lun.vie': 'Monday to Friday',
                'contacto.sabado': 'Saturday',
                'contacto.domingo': 'Sunday',

                // Footer
                'footer.enlaces.rapidos': 'Quick Links',
                'footer.sobre.nosotros': 'About Us',
                'footer.politica.privacidad': 'Privacy Policy',
                'footer.terminos': 'Terms and Conditions',
                'footer.contacto': 'Contact',
                'footer.redes': 'Follow Us',
                'footer.copyright': '© 2025 Belle Époque. All rights reserved.',
                'footer.hecho.con': 'Made with',
                'footer.en': 'in Buenos Aires',

                // Cart
                'carrito.tu.pedido': 'Your Order',
                'carrito.vacio': 'Your cart is empty',
                'carrito.ver.productos': 'View Products',
                'carrito.total': 'Total:',
                'carrito.finalizar': 'Checkout',
                'carrito.vaciar': 'Clear cart',
                'carrito.agregado': 'Product added to cart',
                'carrito.eliminado': 'Product removed from cart',
                'carrito.vaciado': 'Cart cleared',
                'carrito.confirmar.vaciar': 'Are you sure you want to clear the cart?',
                'carrito.confirmar.eliminar': 'Do you want to clear the cart?',
                'carrito.vacio.alert': 'Your cart is empty',

                // Status
                'status.abierto': '🟢 Open now',
                'status.cerrado': '🔴 Closed now',

                // Buttons
                'btn.leer.mas': 'Read more',
                'btn.ver.mas': 'See more',
                'btn.cerrar': 'Close',
                'btn.aceptar': 'Accept',
                'btn.cancelar': 'Cancel',

                // Cookies
                'cookies.mensaje': '🍪 We use cookies to improve your experience. By continuing to browse, you accept our use of cookies.',
                'cookies.aceptar': 'Accept',
                'cookies.mas.info': 'More information',

                // WhatsApp
                'whatsapp.label': 'WhatsApp',
                'whatsapp.contactar': 'Contact via WhatsApp'
            }
        };
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    init() {
        this.createLanguageToggle();
        this.interceptGlobalMethods();
        this.observeCartModal();
        this.observeCartButton();
        this.translatePage();

        console.log(`🌐 Sistema de traducción inicializado (${this.currentLang.toUpperCase()})`);
    }

    // ============================================
    // CREAR TOGGLE DE IDIOMA
    // ============================================
    createLanguageToggle() {
        // Esperar a que el navbar exista
        const checkNavbar = setInterval(() => {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            clearInterval(checkNavbar);

            // Verificar si ya existe
            if (document.querySelector('.language-toggle')) return;

            const toggle = document.createElement('div');
            toggle.className = 'language-toggle';
            toggle.innerHTML = `
                <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                <span class="lang-separator">|</span>
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            `;

            // Insertar antes del menu-toggle
            const menuToggle = navbar.querySelector('.menu-toggle');
            if (menuToggle) {
                navbar.insertBefore(toggle, menuToggle);
            } else {
                navbar.appendChild(toggle);
            }

            // Eventos
            toggle.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang');
                    this.changeLanguage(lang);
                });
            });
        }, 100);

        // Timeout de seguridad
        setTimeout(() => clearInterval(checkNavbar), 5000);
    }

    // ============================================
    // AGREGAR ETIQUETA "CARRITO" AL BOTÓN
    // ============================================
    observeCartButton() {
        const checkCartButton = setInterval(() => {
            const cartBtn = document.getElementById('cart-btn');
            if (!cartBtn) return;

            clearInterval(checkCartButton);

            // Verificar si ya tiene etiqueta
            if (cartBtn.querySelector('.cart-label')) return;

            // Agregar etiqueta
            const label = document.createElement('span');
            label.className = 'cart-label';
            label.setAttribute('data-translate', 'nav.carrito');
            label.textContent = this.translate('nav.carrito');

            // Insertar después del ícono, antes del contador
            const icon = cartBtn.querySelector('i');
            if (icon) {
                icon.after(label);
            }
        }, 100);

        // Timeout de seguridad
        setTimeout(() => clearInterval(checkCartButton), 5000);
    }

    // ============================================
    // OBSERVAR MODAL DEL CARRITO
    // ============================================
    observeCartModal() {
        // Observar cuando se abra el modal del carrito
        const observer = new MutationObserver(() => {
            const modal = document.getElementById('cart-modal');
            if (modal && modal.classList.contains('active')) {
                this.translateCartModal();
            }
        });

        // Observar cambios en el body (cuando se agregue clase active al modal)
        const checkModal = setInterval(() => {
            const modal = document.getElementById('cart-modal');
            if (modal) {
                clearInterval(checkModal);
                observer.observe(modal, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        }, 100);

        setTimeout(() => clearInterval(checkModal), 5000);
    }

    // ============================================
    // TRADUCIR MODAL DEL CARRITO
    // ============================================
    translateCartModal() {
        const modal = document.getElementById('cart-modal');
        if (!modal) return;

        // Título del modal
        const title = modal.querySelector('.modal-header h2');
        if (title) {
            const icon = title.querySelector('i');
            title.textContent = ' ' + this.translate('carrito.tu.pedido');
            if (icon) title.prepend(icon);
        }

        // Carrito vacío
        const emptyCart = modal.querySelector('#empty-cart p');
        if (emptyCart) {
            emptyCart.textContent = this.translate('carrito.vacio');
        }

        const emptyLink = modal.querySelector('#empty-cart a');
        if (emptyLink) {
            emptyLink.textContent = this.translate('carrito.ver.productos');
        }

        // Total
        const totalLabel = modal.querySelector('.cart-total strong');
        if (totalLabel) {
            totalLabel.textContent = this.translate('carrito.total');
        }

        // Botón finalizar
        const checkoutBtn = modal.querySelector('#cart-checkout');
        if (checkoutBtn) {
            const icon = checkoutBtn.querySelector('i');
            checkoutBtn.textContent = ' ' + this.translate('carrito.finalizar');
            if (icon) checkoutBtn.prepend(icon);
        }

        // Botón vaciar
        const clearBtn = modal.querySelector('#cart-clear');
        if (clearBtn) {
            const icon = clearBtn.querySelector('i');
            clearBtn.textContent = ' ' + this.translate('carrito.vaciar');
            if (icon) clearBtn.prepend(icon);
        }
    }

    // ============================================
    // INTERCEPTAR MÉTODOS GLOBALES
    // ============================================
    interceptGlobalMethods() {
        // Interceptar showToast
        if (window.BelleEpoque && window.BelleEpoque.showToast) {
            const originalShowToast = window.BelleEpoque.showToast;
            window.BelleEpoque.showToast = (message, type) => {
                const translatedMessage = this.translate(message) || message;
                originalShowToast(translatedMessage, type);
            };
        }

        // Interceptar confirm
        const originalConfirm = window.confirm;
        window.confirm = (message) => {
            const translatedMessage = this.translate(message) || message;
            return originalConfirm(translatedMessage);
        };

        // Interceptar alert
        const originalAlert = window.alert;
        window.alert = (message) => {
            const translatedMessage = this.translate(message) || message;
            return originalAlert(translatedMessage);
        };
    }

    // ============================================
    // TRADUCIR PÁGINA
    // ============================================
    translatePage() {
        // Traducir todos los elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);

            if (translation) {
                // Preservar iconos y HTML interno si es necesario
                if (element.querySelector('i, svg')) {
                    const icons = Array.from(element.querySelectorAll('i, svg'));
                    element.textContent = translation;
                    icons.forEach(icon => element.prepend(icon));
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Traducir placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.translate(key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Traducir aria-labels
        document.querySelectorAll('[data-translate-aria]').forEach(element => {
            const key = element.getAttribute('data-translate-aria');
            const translation = this.translate(key);
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });

        // Traducir status de apertura
        const statusElement = document.querySelector('#open-status');
        if (statusElement) {
            const isOpen = statusElement.textContent.includes('🟢');
            const key = isOpen ? 'status.abierto' : 'status.cerrado';
            statusElement.innerHTML = `<span class="${isOpen ? 'status-open' : 'status-closed'}">${this.translate(key)}</span>`;
        }
    }

    // ============================================
    // CAMBIAR IDIOMA
    // ============================================
    changeLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Actualizar botones del toggle
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Traducir página
        this.translatePage();

        // Traducir modal del carrito si está abierto
        const modal = document.getElementById('cart-modal');
        if (modal && modal.classList.contains('active')) {
            this.translateCartModal();
        }

        // Traducir etiqueta del carrito
        const cartLabel = document.querySelector('.cart-label');
        if (cartLabel) {
            cartLabel.textContent = this.translate('nav.carrito');
        }

        console.log(`🌐 Idioma cambiado a: ${lang.toUpperCase()}`);
    }

    // ============================================
    // OBTENER TRADUCCIÓN
    // ============================================
    translate(key) {
        // Buscar traducción directa
        if (this.translations[this.currentLang][key]) {
            return this.translations[this.currentLang][key];
        }

        // Buscar traducción parcial (para mensajes del carrito)
        for (const translationKey in this.translations[this.currentLang]) {
            if (key.toLowerCase().includes(translationKey.split('.').pop().toLowerCase())) {
                return this.translations[this.currentLang][translationKey];
            }
        }

        // Si no hay traducción, devolver null
        return null;
    }

    // ============================================
    // API PÚBLICA
    // ============================================
    getCurrentLanguage() {
        return this.currentLang;
    }

    getTranslation(key) {
        return this.translate(key);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new TranslationSystem();
    });
} else {
    window.i18n = new TranslationSystem();
}

console.log('🌐 translations.js cargado correctamente');
