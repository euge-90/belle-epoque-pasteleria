/**
 * BELLE ÉPOQUE - Main JavaScript
 * Funcionalidades principales del sitio
 */

// ============================================
// 1. INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHeaderScroll();
    initBackToTop();
    initScrollReveal();
    initWhatsAppButton();
    initMobileMenu();
    initCookieBanner();
    checkIfOpen();
});

// ============================================
// 2. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle && navToggle.checked) {
                    navToggle.checked = false;
                }
            }
        });
    });
}

// ============================================
// 3. HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Agregar/quitar clase 'scrolled' para cambiar estilo
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// 4. BOTÓN VOLVER ARRIBA
// ============================================
function initBackToTop() {
    // Crear botón si no existe
    let backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Volver arriba');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
    }

    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll al hacer click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 5. SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opcional: dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// 6. WHATSAPP FLOTANTE
// ============================================
function initWhatsAppButton() {
    // Crear botón de WhatsApp si no existe
    let whatsappBtn = document.querySelector('.whatsapp-float');

    if (!whatsappBtn) {
        whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://wa.me/5491145678900?text=Hola%20Belle%20Époque!%20Quiero%20hacer%20una%20consulta';
        whatsappBtn.className = 'whatsapp-float';
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
        whatsappBtn.innerHTML = `
            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span class="whatsapp-text">WhatsApp</span>
        `;
        document.body.appendChild(whatsappBtn);
    }
}

// ============================================
// 7. MENÚ MÓVIL
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!navToggle) return;

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false;
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (navToggle.checked && !navbar.contains(e.target)) {
            navToggle.checked = false;
        }
    });
}

// ============================================
// 8. BANNER DE COOKIES
// ============================================
function initCookieBanner() {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
        // Crear banner si no existe
        let banner = document.getElementById('cookie-banner');

        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'cookie-banner';
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>🍪 Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies.</p>
                    <div class="cookie-actions">
                        <button id="accept-cookies" class="btn-primary">Aceptar</button>
                        <a href="politica-privacidad.html" class="btn-link">Más información</a>
                    </div>
                </div>
            `;
            document.body.appendChild(banner);

            // Mostrar banner
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);

            // Evento de aceptar
            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'true');
                banner.classList.remove('show');
                setTimeout(() => {
                    banner.remove();
                }, 300);
            });
        }
    }
}

// ============================================
// 9. VERIFICAR SI ESTÁ ABIERTO
// ============================================
function checkIfOpen() {
    const statusElement = document.getElementById('open-status');
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60;

    let isOpen = false;

    // Horarios (según el footer)
    if (day >= 1 && day <= 5) {
        // Lunes a Viernes: 8:00 - 20:00
        isOpen = currentTime >= 8 && currentTime < 20;
    } else if (day === 6) {
        // Sábado: 9:00 - 21:00
        isOpen = currentTime >= 9 && currentTime < 21;
    } else {
        // Domingo: 10:00 - 18:00
        isOpen = currentTime >= 10 && currentTime < 18;
    }

    if (isOpen) {
        statusElement.innerHTML = '<span class="status-open">🟢 Abierto ahora</span>';
    } else {
        statusElement.innerHTML = '<span class="status-closed">🔴 Cerrado ahora</span>';
    }
}

// ============================================
// 10. CONTADOR ANIMADO
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('es-AR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('es-AR');
        }
    }, 16);
}

// Observar contadores cuando sean visibles
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Inicializar contadores cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    initCounters();
}

// ============================================
// 11. UTILIDADES
// ============================================

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;

    const icon = {
        'success': '✓',
        'error': '✗',
        'warning': '⚠',
        'info': 'ℹ'
    }[type] || 'ℹ';

    toast.innerHTML = `
        <i>${icon}</i>
        <span>${message}</span>
        <button class="toast-close">×</button>
    `;

    // Agregar al contenedor de toasts o crear uno
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    container.appendChild(toast);

    // Evento de cerrar
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Exportar funciones útiles
window.BelleEpoque = {
    showToast,
    animateCounter,
    checkIfOpen
};

console.log('🥐 Belle Époque - JavaScript inicializado correctamente');
