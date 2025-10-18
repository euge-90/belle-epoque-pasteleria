// Productos.js - Funcionalidad interactiva para la página de productos
document.addEventListener('DOMContentLoaded', function() {
    // ===== FILTROS DE PRODUCTOS =====
    initProductFilters();
    
    // ===== MODAL DE VISTA RÁPIDA =====
    initProductModal();
    
    // ===== ANIMACIONES =====
    initScrollAnimations();
    
    // ===== NAVEGACIÓN SUAVE =====
    initSmoothScroll();
});

// ===== SISTEMA DE FILTROS =====
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCategories = document.querySelectorAll('.product-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar categorías
            productCategories.forEach(category => {
                if (filter === 'all') {
                    category.style.display = 'block';
                    animateCategory(category, 'show');
                } else if (category.getAttribute('data-category') === filter) {
                    category.style.display = 'block';
                    animateCategory(category, 'show');
                } else {
                    animateCategory(category, 'hide');
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
            
            // Scroll suave al primer producto filtrado
            if (filter !== 'all') {
                const targetCategory = document.querySelector(`[data-category="${filter}"]`);
                if (targetCategory) {
                    setTimeout(() => {
                        targetCategory.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        });
    });
}

function animateCategory(category, action) {
    if (action === 'show') {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        setTimeout(() => {
            category.style.transition = 'all 0.3s ease';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 50);
    } else {
        category.style.transition = 'all 0.3s ease';
        category.style.opacity = '0';
        category.style.transform = 'translateY(-20px)';
    }
}

// ===== MODAL DE VISTA RÁPIDA =====
function initProductModal() {
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.modal-close');
    
    // Datos de productos para el modal
    const productData = {
        'croissant-tradicional': {
            name: 'Croissant Tradicional',
            description: 'Hojaldre clásico con manteca francesa, crujiente por fuera y tierno por dentro. Elaborado según la técnica tradicional francesa con más de 80 capas de masa.',
            price: '$4.000',
            ingredients: 'Harina de trigo, manteca francesa, agua, sal, azúcar, levadura',
            allergens: 'Contiene: Gluten, Lácteos. Puede contener trazas de huevo y frutos secos.',
            image: 'images/products_images/croissant.jpg'
        },
        'pain-au-chocolat': {
            name: 'Pain au Chocolat',
            description: 'Hojaldre relleno de barritas de chocolate belga de alta calidad. Un clásico de la pastelería francesa que combina la textura crujiente del hojaldre con el sabor intenso del chocolate.',
            price: '$4.700',
            ingredients: 'Harina de trigo, manteca francesa, chocolate belga, agua, sal, azúcar, levadura',
            allergens: 'Contiene: Gluten, Lácteos, Cacao. Puede contener trazas de huevo y frutos secos.',
            image: 'images/products_images/pain_au_chocolat.png'
        },
        'croissant-almendras': {
            name: 'Croissant de Almendra',
            description: 'Hojaldre relleno de crema de almendra y decorado con almendras laminadas. Una especialidad que combina la técnica del croissant con el sabor dulce y aromático de la almendra.',
            price: '$5.700',
            ingredients: 'Harina de trigo, manteca francesa, crema de almendra, almendras, agua, sal, azúcar, levadura',
            allergens: 'Contiene: Gluten, Lácteos, Frutos secos (almendras), Huevo. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/croissant_almendras.png'
        },
        'pain-aux-raisins': {
            name: 'Pain aux Raisins',
            description: 'Espiral de hojaldre con crema pastelera y pasas de uva sultana. Una viennoiserie clásica que combina la textura del hojaldre con la cremosidad de la crema pastelera.',
            price: '$5.400',
            ingredients: 'Harina de trigo, manteca francesa, crema pastelera, pasas sultanas, agua, sal, azúcar, levadura',
            allergens: 'Contiene: Gluten, Lácteos, Huevo. Puede contener trazas de frutos secos.',
            image: 'images/products_images/Pain_aux_Raisins.png'
        },
        'brioche': {
            name: 'Brioche',
            description: 'Pan enriquecido con manteca y huevos, de textura esponjosa y sabor delicado. Una especialidad francesa perfecta para desayunos gourmet o meriendas elegantes.',
            price: '$7.700',
            ingredients: 'Harina de trigo, manteca francesa, huevos, azúcar, sal, levadura, leche',
            allergens: 'Contiene: Gluten, Lácteos, Huevo. Puede contener trazas de frutos secos.',
            image: 'images/products_images/pan_brioche.jpg'
        },
        'chausson-aux-pommes': {
            name: 'Chausson aux Pommes',
            description: 'Empanada de hojaldre rellena de manzanas caramelizadas con canela. Un postre tradicional francés que combina la textura crujiente del hojaldre con la dulzura de las manzanas.',
            price: '$4.500',
            ingredients: 'Harina de trigo, manteca francesa, manzanas, azúcar, canela, agua, sal',
            allergens: 'Contiene: Gluten, Lácteos. Puede contener trazas de huevo y frutos secos.',
            image: 'images/products_images/ChaussonauxPommes.png'
        },
        // Macarons
        'macaron-frambuesa': {
            name: 'Macaron de Frambuesa',
            description: 'Delicadas galletas de almendra rellenas de ganache de frambuesa fresca con un toque cítrico que realza el sabor natural de la fruta.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, frambuesas, crema, chocolate blanco',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_frambuesa.png'
        },
        'macaron-pistacho': {
            name: 'Macaron de Pistacho',
            description: 'Pasta de pistacho siciliano con notas tostadas que brindan un sabor único e inconfundible. Un macaron para los paladares más exigentes.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, pistachos, crema, manteca',
            allergens: 'Contiene: Frutos secos (almendras, pistachos), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_pistacho.png'
        },
        'macaron-chocolate': {
            name: 'Macaron de Chocolate',
            description: 'Ganache de chocolate belga 70% cacao que ofrece un sabor intenso y equilibrado. Para los verdaderos amantes del chocolate.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, chocolate belga, crema',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos, Cacao. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_chocolate.png'
        },
        'macaron-vainilla': {
            name: 'Macaron de Vainilla',
            description: 'Crema de vainilla de Madagascar premium que aporta un aroma y sabor auténtico. El clásico por excelencia.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, vainilla de Madagascar, crema, manteca',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_vainilla.png'
        },
        'macaron-lavanda': {
            name: 'Macaron de Lavanda',
            description: 'Delicada esencia de lavanda provenzal que brinda un sabor floral único y sofisticado. Una experiencia sensorial completa.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, esencia de lavanda, crema, miel',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_lavanda.png'
        },
        'macaron-limon': {
            name: 'Macaron de Limón',
            description: 'Curd de limón fresco con ralladura natural que aporta acidez y frescura. Perfecto para equilibrar el paladar.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, limón, manteca, huevos',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_limon.png'
        },
        'macaron-rosa': {
            name: 'Macaron de Rosa',
            description: 'Agua de rosas turcas con pétalos cristalizados que crean una experiencia romántica y delicada. Un sabor exclusivo y elegante.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, agua de rosas, pétalos cristalizados, crema',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_rosa.png'
        },
        'macaron-caramelo': {
            name: 'Macaron de Caramelo',
            description: 'Caramelo beurre salé con flor de sal de Guérande que equilibra perfectamente lo dulce y lo salado. Una combinación adictiva.',
            price: '$2.500',
            ingredients: 'Almendra molida, azúcar glas, clara de huevo, azúcar, caramelo, manteca, flor de sal',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/macaron_caramel.png'
        },
        // Pasteles
        'opera-cake': {
            name: 'Opera Cake',
            description: 'Capas de bizcocho de almendra, ganache de chocolate y buttercream de café, cubierto con glaseado espejo. Una obra maestra de la pastelería francesa.',
            price: '$7.200',
            ingredients: 'Bizcocho de almendra, chocolate, café, manteca, azúcar, huevos, almendras',
            allergens: 'Contiene: Frutos secos (almendras), Huevo, Lácteos, Gluten, Cacao. Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/opera_cake.png'
        },
        'tarte-tatin': {
            name: 'Tarte Tatin',
            description: 'Tarta invertida de manzanas caramelizadas sobre masa quebrada. Un clásico francés de origen campestre que conquista por su simplicidad y sabor.',
            price: '$4.500',
            ingredients: 'Manzanas, azúcar, manteca, harina, huevo, sal',
            allergens: 'Contiene: Gluten, Lácteos, Huevo. Puede contener trazas de frutos secos.',
            image: 'images/products_images/Tarte_Tatin.png'
        },
        'fraisier': {
            name: 'Fraisier',
            description: 'Bizcocho genovés con crema mousseline y fresas frescas, cubierto con una fina capa de mazapán. La celebración perfecta de la fresa.',
            price: '$6.500',
            ingredients: 'Bizcocho genovés, fresas, crema, almendras, azúcar, huevos, manteca',
            allergens: 'Contiene: Gluten, Huevo, Lácteos, Frutos secos (almendras). Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/Fraisier_cake.png'
        },
        'saint-honore': {
            name: 'Saint-Honoré',
            description: 'Base de masa quebrada con profiteroles caramelizados y crema Chiboust. Dedicado al santo patrón de los panaderos, es una verdadera obra de arte.',
            price: '$7.200',
            ingredients: 'Masa quebrada, masa choux, crema Chiboust, caramelo, huevos, manteca, harina',
            allergens: 'Contiene: Gluten, Huevo, Lácteos. Puede contener trazas de frutos secos.',
            image: 'images/products_images/saint_honore.png'
        },
        'mille-feuille': {
            name: 'Mille-feuille',
            description: 'Tres capas de hojaldre crujiente con crema pastelera y glaseado fondant. También conocido como Napoleón, es un clásico indiscutible.',
            price: '$7.200',
            ingredients: 'Hojaldre, crema pastelera, fondant, huevos, manteca, harina, azúcar',
            allergens: 'Contiene: Gluten, Huevo, Lácteos. Puede contener trazas de frutos secos.',
            image: 'images/products_images/mille_feuille.png'
        },
        'paris-brest': {
            name: 'Paris-Brest',
            description: 'Corona de masa choux rellena de crema de praline y avellanas tostadas. Creado para conmemorar la carrera ciclista París-Brest.',
            price: '$6.500',
            ingredients: 'Masa choux, crema de praline, avellanas, manteca, huevos, harina, azúcar',
            allergens: 'Contiene: Gluten, Huevo, Lácteos, Frutos secos (avellanas). Puede contener trazas de otros frutos secos.',
            image: 'images/products_images/paris_brest.png'
        }
    };
    
    // Event listeners para botones de vista rápida
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product');
            const product = productData[productId];
            
            if (product) {
                openModal(product);
            }
        });
    });
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });
    
    function openModal(product) {
        const modal = document.getElementById('productModal');
        
        // Actualizar contenido del modal
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.name;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPrice').innerHTML = `<strong>Precio:</strong> ${product.price}`;
        document.getElementById('modalIngredients').innerHTML = `<strong>Ingredientes:</strong> ${product.ingredients}`;
        document.getElementById('modalAllergens').innerHTML = `<strong>Alérgenos:</strong> ${product.allergens}`;
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalHandler() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar productos y secciones
    const elementsToAnimate = document.querySelectorAll('.product-card, .special-order-card, .contact-method');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== NAVEGACIÓN SUAVE =====
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
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILIDADES =====
function formatPrice(price) {
    return price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}

// ===== SCROLL TO TOP =====
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar scroll to top
document.addEventListener('DOMContentLoaded', function() {
    createScrollToTop();
});