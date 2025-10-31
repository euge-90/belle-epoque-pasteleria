/**
 * BELLE ÉPOQUE - Testimonials Slider
 * Slider de testimonios con auto-play
 */

class TestimonialsSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 segundos

        // Testimonios de datos
        this.testimonials = [
            {
                name: 'María L.',
                location: 'Recoleta',
                text: 'Los mejores croissants que probé fuera de Francia. La manteca se nota en cada bocado y el hojaldre es perfecto.',
                rating: 5,
                image: ''
            },
            {
                name: 'Juan P.',
                location: 'Palermo',
                text: 'Pedí una torta para mi boda y fue el centro de atención. ¡Hermosa y deliciosa! Todos los invitados querían saber de dónde era.',
                rating: 5,
                image: ''
            },
            {
                name: 'Laura M.',
                location: 'Belgrano',
                text: 'El café con medialunas es mi ritual de cada sábado. Calidad francesa auténtica en el corazón de Buenos Aires.',
                rating: 5,
                image: ''
            },
            {
                name: 'Roberto S.',
                location: 'San Telmo',
                text: 'Los macarons son perfectos. Me recuerdan a mi viaje a París, exactamente el mismo sabor y textura.',
                rating: 5,
                image: ''
            },
            {
                name: 'Ana G.',
                location: 'Caballito',
                text: 'Atención excelente y productos de primera. Es mi pastelería favorita para cualquier ocasión especial.',
                rating: 5,
                image: ''
            }
        ];

        this.init();
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    init() {
        this.render();
        this.attachEventListeners();
        this.startAutoPlay();
    }

    // ============================================
    // RENDERIZAR SLIDER
    // ============================================
    render() {
        this.container.innerHTML = `
            <div class="testimonials-wrapper">
                <button class="testimonial-arrow testimonial-prev" data-translate-aria="testimonios.anterior" aria-label="Testimonio anterior">
                    <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                </button>

                <div class="testimonials-track">
                    ${this.testimonials.map((testimonial, index) => `
                        <div class="testimonial-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <div class="testimonial-content">
                                <div class="testimonial-quote">
                                    <i class="fa-solid fa-quote-left" aria-hidden="true"></i>
                                </div>
                                <p class="testimonial-text">"${testimonial.text}"</p>
                                <div class="testimonial-rating">
                                    ${this.renderStars(testimonial.rating)}
                                </div>
                                <div class="testimonial-author">
                                    <div class="author-avatar">
                                        ${testimonial.image ?
                                            `<img src="${testimonial.image}" alt="${testimonial.name}">` :
                                            `<i class="fa-solid fa-user" aria-hidden="true"></i>`
                                        }
                                    </div>
                                    <div class="author-info">
                                        <strong class="author-name">${testimonial.name}</strong>
                                        <span class="author-location">📍 ${testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <button class="testimonial-arrow testimonial-next" data-translate-aria="testimonios.siguiente" aria-label="Siguiente testimonio">
                    <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </button>
            </div>

            <div class="testimonial-dots">
                ${this.testimonials.map((_, index) => `
                    <button class="testimonial-dot ${index === 0 ? 'active' : ''}"
                            data-index="${index}"
                            data-translate-aria="testimonios.ir"
                            aria-label="Ir al testimonio"></button>
                `).join('')}
            </div>
        `;
    }

    // ============================================
    // RENDERIZAR ESTRELLAS
    // ============================================
    renderStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fa-solid fa-star" aria-hidden="true"></i>';
            } else {
                stars += '<i class="fa-regular fa-star" aria-hidden="true"></i>';
            }
        }
        return stars;
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    attachEventListeners() {
        // Botón anterior
        const prevBtn = this.container.querySelector('.testimonial-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoPlay();
            });
        }

        // Botón siguiente
        const nextBtn = this.container.querySelector('.testimonial-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoPlay();
            });
        }

        // Dots
        const dots = this.container.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Pausar al hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // Touch events para móvil
        this.initTouchEvents();
    }

    // ============================================
    // TOUCH EVENTS PARA MÓVIL
    // ============================================
    initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;

        const track = this.container.querySelector('.testimonials-track');

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - siguiente
                    this.next();
                } else {
                    // Swipe right - anterior
                    this.prev();
                }
                this.resetAutoPlay();
            }
        };

        this.handleSwipe = handleSwipe;
    }

    // ============================================
    // NAVEGACIÓN
    // ============================================
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateSlide();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }

    // ============================================
    // ACTUALIZAR SLIDE
    // ============================================
    updateSlide() {
        // Actualizar slides
        const slides = this.container.querySelectorAll('.testimonial-slide');
        slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar dots
        const dots = this.container.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ============================================
    // AUTO-PLAY
    // ============================================
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    // ============================================
    // DESTRUCTOR
    // ============================================
    destroy() {
        this.stopAutoPlay();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ============================================
// CREAR SECCIÓN DE TESTIMONIOS SI NO EXISTE
// ============================================
function createTestimonialsSection() {
    // Verificar si ya existe
    if (document.getElementById('testimonios')) return;

    // Buscar donde insertar (después de productos, antes de contacto)
    const productosSection = document.getElementById('productos');
    const contactoSection = document.getElementById('contacto');

    if (!productosSection && !contactoSection) return;

    const testimonialsHTML = `
        <section id="testimonios" class="section testimonios-section animate-on-scroll">
            <div class="container">
                <div class="text-center mb-3">
                    <h2 class="text-gold" data-translate="testimonios.titulo">Lo que dicen nuestros clientes</h2>
                    <p data-translate="testimonios.subtitulo">Experiencias reales de quienes nos eligen</p>
                </div>
                <div id="testimonials-slider" class="testimonios-slider"></div>
            </div>
        </section>
    `;

    if (contactoSection) {
        contactoSection.insertAdjacentHTML('beforebegin', testimonialsHTML);
    } else if (productosSection) {
        productosSection.insertAdjacentHTML('afterend', testimonialsHTML);
    }

    // Asegurar que no quede oculto por animate-on-scroll
    const section = document.getElementById('testimonios');
    if (section && section.classList.contains('animate-on-scroll')) {
        section.classList.add('animated');
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Crear sección si existen los anclajes típicos de la home
        createTestimonialsSection();

        // Inicializar slider si el contenedor fue insertado
        const sliderContainer = document.getElementById('testimonials-slider');
        if (sliderContainer) {
            window.testimonialsSlider = new TestimonialsSlider('#testimonials-slider');
        }
    });
} else {
    // Crear sección si existen los anclajes típicos de la home
    createTestimonialsSection();

    // Inicializar slider si el contenedor fue insertado
    const sliderContainer = document.getElementById('testimonials-slider');
    if (sliderContainer) {
        window.testimonialsSlider = new TestimonialsSlider('#testimonials-slider');
    }
}

console.log('💬 Sistema de testimonios inicializado');
