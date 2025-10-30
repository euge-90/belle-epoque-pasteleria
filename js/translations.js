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
                'producto.badge.promo': '50% OFF en el 2do',
                'producto.badge.nuevo': 'Nuevo',
                'producto.badge.popular': 'Popular',

                // Productos - Croissants & Viennoiseries
                'producto.croissant.nombre': 'Croissant Tradicional',
                'producto.croissant.desc': 'Hojaldre clásico con manteca francesa, crujiente por fuera y tierno por dentro.',
                'producto.croissant.porcion': '1 unidad (80g)',
                'producto.croissant.alt': 'Croissant Tradicional francés dorado y crujiente',

                'producto.painchocolat.nombre': 'Pain au Chocolat',
                'producto.painchocolat.desc': 'Hojaldre relleno de barritas de chocolate belga de alta calidad.',
                'producto.painchocolat.porcion': '1 unidad (90g)',
                'producto.painchocolat.alt': 'Pain au Chocolat con chocolate belga',

                'producto.croissantalmendra.nombre': 'Croissant de Almendra',
                'producto.croissantalmendra.desc': 'Hojaldre relleno de crema de almendra y decorado con almendras laminadas.',
                'producto.croissantalmendra.porcion': '1 unidad (100g)',
                'producto.croissantalmendra.alt': 'Croissant de Almendra con almendras laminadas',

                'producto.painraisins.nombre': 'Pain aux Raisins',
                'producto.painraisins.desc': 'Espiral de hojaldre con crema pastelera y pasas de uva sultana.',
                'producto.painraisins.porcion': '1 unidad (95g)',
                'producto.painraisins.alt': 'Pain aux Raisins con pasas y crema pastelera',

                'producto.brioche.nombre': 'Brioche',
                'producto.brioche.desc': 'Pan suave y esponjoso enriquecido con huevo y manteca, ideal para el desayuno.',
                'producto.brioche.porcion': '1 unidad (70g)',
                'producto.brioche.alt': 'Brioche francés dorado y esponjoso',

                'producto.chausson.nombre': 'Chausson aux Pommes',
                'producto.chausson.desc': 'Hojaldre en forma de media luna relleno de compota de manzana especiada.',
                'producto.chausson.porcion': '1 unidad (110g)',
                'producto.chausson.alt': 'Chausson aux Pommes con compota de manzana',

                'producto.kouignamann.nombre': 'Kouign-Amann',
                'producto.kouignamann.desc': 'Especialidad bretona de hojaldre caramelizado con capas crujientes de azúcar.',
                'producto.kouignamann.porcion': '1 unidad (100g)',
                'producto.kouignamann.alt': 'Kouign-Amann caramelizado bretón',

                // Productos - Macarons
                'producto.macaronframbuesa.nombre': 'Macaron de Frambuesa',
                'producto.macaronframbuesa.desc': 'Delicada galleta de almendra con ganache de frambuesa fresca.',
                'producto.macaronframbuesa.porcion': '1 unidad (20g)',
                'producto.macaronframbuesa.alt': 'Macaron de Frambuesa rosa',

                'producto.macaronpistacho.nombre': 'Macaron de Pistacho',
                'producto.macaronpistacho.desc': 'Macaron relleno de crema de pistacho siciliano de alta calidad.',
                'producto.macaronpistacho.porcion': '1 unidad (20g)',
                'producto.macaronpistacho.alt': 'Macaron de Pistacho verde',

                'producto.macaronchocolate.nombre': 'Macaron de Chocolate',
                'producto.macaronchocolate.desc': 'Intenso macaron con ganache de chocolate negro 70% cacao.',
                'producto.macaronchocolate.porcion': '1 unidad (20g)',
                'producto.macaronchocolate.alt': 'Macaron de Chocolate oscuro',

                'producto.macaronvainilla.nombre': 'Macaron de Vainilla',
                'producto.macaronvainilla.desc': 'Clásico macaron con crema de vainilla de Madagascar.',
                'producto.macaronvainilla.porcion': '1 unidad (20g)',
                'producto.macaronvainilla.alt': 'Macaron de Vainilla clásico',

                'producto.macaronlavanda.nombre': 'Macaron de Lavanda',
                'producto.macaronlavanda.desc': 'Sutil y aromático macaron con ganache de lavanda de Provenza.',
                'producto.macaronlavanda.porcion': '1 unidad (20g)',
                'producto.macaronlavanda.alt': 'Macaron de Lavanda morado',

                'producto.macaronlimon.nombre': 'Macaron de Limón',
                'producto.macaronlimon.desc': 'Refrescante macaron con curd de limón siciliano.',
                'producto.macaronlimon.porcion': '1 unidad (20g)',
                'producto.macaronlimon.alt': 'Macaron de Limón amarillo',

                'producto.macaronrosa.nombre': 'Macaron de Rosa',
                'producto.macaronrosa.desc': 'Romántico macaron con buttercream perfumado con agua de rosas.',
                'producto.macaronrosa.porcion': '1 unidad (20g)',
                'producto.macaronrosa.alt': 'Macaron de Rosa romántico',

                'producto.macaroncaramelo.nombre': 'Macaron de Caramelo',
                'producto.macaroncaramelo.desc': 'Dulce macaron con caramelo salado de Bretaña.',
                'producto.macaroncaramelo.porcion': '1 unidad (20g)',
                'producto.macaroncaramelo.alt': 'Macaron de Caramelo dorado',

                // Productos - Pasteles & Tartas
                'producto.opera.nombre': 'Opera Cake',
                'producto.opera.desc': 'Capas de bizcocho, ganache de chocolate y buttercream de café cubierto con glaseado espejo.',
                'producto.opera.porcion': '1 porción (120g)',
                'producto.opera.alt': 'Opera Cake con capas de chocolate y café',

                'producto.tatin.nombre': 'Tarte Tatin',
                'producto.tatin.desc': 'Tarta invertida de manzanas caramelizadas sobre masa quebrada. Un clásico francés.',
                'producto.tatin.porcion': '1 porción (150g)',
                'producto.tatin.alt': 'Tarte Tatin de manzanas caramelizadas',

                'producto.fraisier.nombre': 'Fraisier',
                'producto.fraisier.desc': 'Bizcocho genovés con crema mousseline y fresas frescas, cubierto con mazapán.',
                'producto.fraisier.porcion': '1 porción (130g)',
                'producto.fraisier.alt': 'Fraisier con fresas frescas',

                'producto.sainthonore.nombre': 'Saint-Honoré',
                'producto.sainthonore.desc': 'Base de masa quebrada con profiteroles caramelizados y crema Chiboust.',
                'producto.sainthonore.porcion': '1 porción (140g)',
                'producto.sainthonore.alt': 'Saint-Honoré con profiteroles',

                'producto.millefeuille.nombre': 'Mille-feuille',
                'producto.millefeuille.desc': 'Tres capas de hojaldre crujiente con crema pastelera y glaseado fondant.',
                'producto.millefeuille.porcion': '1 porción (120g)',
                'producto.millefeuille.alt': 'Mille-feuille con hojaldre caramelizado',

                'producto.parisbrest.nombre': 'Paris-Brest',
                'producto.parisbrest.desc': 'Corona de masa choux rellena de crema de praline y avellanas tostadas.',
                'producto.parisbrest.porcion': '1 porción (130g)',
                'producto.parisbrest.alt': 'Paris-Brest con crema de avellana',

                // Macarons - Descripciones cortas
                'macaron.frambuesa.desc.short': 'Ganache de frambuesa fresca con toque cítrico.',
                'macaron.pistacho.desc.short': 'Pasta de pistacho siciliano con notas tostadas.',
                'macaron.chocolate.desc.short': 'Ganache de chocolate belga 70% cacao.',
                'macaron.vainilla.desc.short': 'Crema de vainilla de Madagascar premium.',
                'macaron.lavanda.desc.short': 'Delicada esencia de lavanda provenzal.',
                'macaron.limon.desc.short': 'Curd de limón fresco con ralladura natural.',
                'macaron.rosa.desc.short': 'Agua de rosas turcas con pétalos cristalizados.',
                'macaron.caramelo.desc.short': 'Caramelo beurre salé con flor de sal de Guérande.',

                // Macarons - Información de presentaciones
                'macarons.presentaciones.titulo': 'Presentaciones disponibles',
                'macarons.presentacion.unidad': 'Unidad',
                'macarons.presentacion.caja6': 'Caja x6',
                'macarons.presentacion.caja12': 'Caja x12',
                'macarons.presentacion.caja24': 'Caja x24',
                'macarons.ahorro': 'ahorrás',

                // Pedidos Especiales
                'especiales.tortas.titulo': 'Tortas Personalizadas',
                'especiales.tortas.desc': 'Diseñamos la torta perfecta para tu celebración especial. Cada creación es única y adaptada a tus gustos y necesidades.',
                'especiales.tortas.feat1': 'Diseños exclusivos',
                'especiales.tortas.feat2': 'Sabores a elección',
                'especiales.tortas.feat3': 'Decoración temática',
                'especiales.tortas.feat4': 'Diferentes tamaños',

                'especiales.corporativos.titulo': 'Eventos Corporativos',
                'especiales.corporativos.desc': 'Catering de alta calidad para reuniones, lanzamientos y celebraciones empresariales con el toque francés que nos caracteriza.',
                'especiales.corporativos.feat1': 'Servicio completo',
                'especiales.corporativos.feat2': 'Menús personalizados',
                'especiales.corporativos.feat3': 'Presentación elegante',
                'especiales.corporativos.feat4': 'Entrega puntual',

                'especiales.bodas.titulo': 'Bodas & Celebraciones',
                'especiales.bodas.desc': 'Hacemos realidad el pastel de tus sueños para el día más importante. Trabajamos contigo en cada detalle.',
                'especiales.bodas.feat1': 'Consulta personalizada',
                'especiales.bodas.feat2': 'Degustación previa',
                'especiales.bodas.feat3': 'Múltiples niveles',
                'especiales.bodas.feat4': 'Decoración artística',

                'especiales.como.titulo': '¿Cómo hacer tu pedido especial?',
                'especiales.paso1.titulo': 'Contactanos',
                'especiales.paso1.desc': 'Llámanos o escribinos para contarnos tu idea',
                'especiales.paso2.titulo': 'Diseñamos juntos',
                'especiales.paso2.desc': 'Trabajamos contigo en el diseño y sabores',
                'especiales.paso3.titulo': 'Confirmamos',
                'especiales.paso3.desc': 'Te enviamos el presupuesto y confirmás con seña',
                'especiales.paso4.titulo': 'Creamos tu pedido',
                'especiales.paso4.desc': 'Elaboramos tu encargo con amor y dedicación',

                'especiales.contacto.email': 'Email',
                'especiales.contacto.whatsapp': 'WhatsApp',
                'especiales.contacto.tiempo': 'Tiempo mínimo',
                'especiales.contacto.tiempo.valor': '72 horas de anticipación',
                'especiales.contacto.sena': 'Seña requerida',
                'especiales.contacto.sena.valor': '50% del total del pedido',
                'especiales.cta.contacto': 'Contactanos ahora',
                'especiales.cta.promociones': 'Ver promociones',

                // Medios de Pago
                'pago.titulo': 'Medios de Pago',
                'pago.subtitulo': 'Aceptamos múltiples formas de pago para tu comodidad',
                'pago.tarjetas.titulo': 'Tarjetas de Débito y Crédito',
                'pago.tarjetas.desc': 'Visa, Mastercard, American Express y todas las tarjetas bancarias.',
                'pago.efectivo.titulo': 'Efectivo',
                'pago.efectivo.desc': 'Pesos argentinos en nuestro local.',
                'pago.transferencia.titulo': 'Transferencia Bancaria',
                'pago.transferencia.desc': 'CBU y Alias disponibles. Consultá por WhatsApp.',
                'pago.mercadopago.titulo': 'Mercado Pago',
                'pago.mercadopago.desc': 'Pagá con QR o link de pago.',

                // Alérgenos
                'alergenos.titulo': 'Información de Alérgenos',
                'alergenos.subtitulo': 'Tu seguridad es nuestra prioridad. Conocé los alérgenos presentes en nuestros productos.',
                'alergenos.gluten.titulo': 'Gluten',
                'alergenos.gluten.desc': 'Presente en todos nuestros productos de hojaldre, croissants y tartas.',
                'alergenos.huevo.titulo': 'Huevo',
                'alergenos.huevo.desc': 'Utilizado en bizcochos, cremas y masa de macarons.',
                'alergenos.lacteos.titulo': 'Lácteos',
                'alergenos.lacteos.desc': 'Manteca francesa, crema y leche en la mayoría de nuestras preparaciones.',
                'alergenos.frutos.titulo': 'Frutos Secos',
                'alergenos.frutos.desc': 'Almendras, pistachos y avellanas. Riesgo de contaminación cruzada.',
                'alergenos.cacao.titulo': 'Cacao',
                'alergenos.cacao.desc': 'Presente en productos de chocolate. Puede contener trazas de leche.',
                'alergenos.soja.titulo': 'Soja',
                'alergenos.soja.desc': 'Lecitina de soja presente en algunos chocolates importados.',
                'alergenos.nota.titulo': 'Nota Importante:',
                'alergenos.nota.desc': 'Nuestros productos se elaboran en un espacio donde se manipulan todos los alérgenos mencionados. Si tenés alergias alimentarias, consultá con nuestro personal antes de realizar tu pedido. Podemos brindarte información detallada sobre cada producto específico.',
                'alergenos.consultas': 'Consultas:',

                // Modal de Producto
                'modal.consultar.disponibilidad': 'Consultar disponibilidad',
                'modal.consultar.whatsapp': 'Consultar por WhatsApp',

                // Index - Secciones adicionales
                'index.nos.eligen': 'NOS ELIGEN',
                'index.empresas': 'Empresas que confían en nosotros',
                'index.como.llegar': 'Cómo llegar',
                'index.ver.googlemaps': 'Ver en Google Maps',
                'index.cerrado': 'Cerrado',
                'index.ubicacion': 'Estamos en',

                // Figcaptions de productos
                'fig.eclairs': 'Éclairs',
                'fig.cookies': 'Cookies',
                'fig.profiterol': 'Profiterol de banana',
                'fig.croissants': 'Croissants artesanales',
                'fig.croissants.manteca': 'Croissants de manteca',
                'fig.medialunas': 'Medialunas',
                'fig.danesas': 'Danesas',
                'fig.hojaldre': 'Hojaldrería',
                'fig.tartaleta': 'Tartaleta de manzana',
                'fig.desayuno': 'Desayunos',
                'fig.torta': 'Tortas',
                'fig.macarons': 'Macarons',

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
                'promociones.banner': '🎉 ¡Ofertas especiales disponibles! - Válidas hasta fin de mes 🛍️',
                'promociones.catalogo.titulo': '¿Buscás algo específico?',
                'promociones.catalogo.desc': 'Explorá nuestro catálogo completo con todos los productos disponibles',
                'promociones.catalogo.btn': 'Ver Todos los Productos',
                'promociones.vigentes.titulo': '🎉 Ofertas Vigentes',
                'promociones.vigentes.desc': 'Aprovechá nuestras promociones especiales y llevate lo mejor de la pastelería francesa 🥐✨',
                'promociones.buscar': 'Buscar promociones...',
                'promociones.limpiar': 'Limpiar búsqueda',
                'promociones.filtro.todas': 'Todas',
                'promociones.filtro.viennoiserie': 'Viennoiserie',
                'promociones.filtro.macarons': 'Macarons',
                'promociones.filtro.premium': 'Premium',
                'promociones.encontradas': 'promociones encontradas',
                'promociones.badge.popular': '¡MÁS POPULAR!',
                'promociones.badge.nuevo': 'NUEVO',
                'promociones.badge.premium': 'PREMIUM',
                'promociones.favoritos': 'Agregar a favoritos',
                'promociones.personas.viendo': 'personas viendo',
                'promociones.stock.quedan': 'Solo quedan',
                'promociones.stock.disponibles': 'unidades disponibles hoy',
                'promociones.valido': 'Válido',
                'promociones.valido.dias': 'todos los días',
                'promociones.valido.lunes.viernes': 'Lunes a Viernes',
                'promociones.ejemplo': 'Ejemplo:',
                'promociones.ahorras': '¡Ahorrás',
                'promociones.btn.quiero': '¡Quiero esta promo!',
                'promociones.btn.consultar': 'Consultar',
                'promociones.btn.detalles': 'Ver detalles',

                // Promoción Mañana Francesa
                'promo.manana.titulo': 'Mañana Francesa Perfecta',
                'promo.manana.desc': 'Llevá 2 productos de viennoiserie y obtené 50% de descuento en el segundo de menor o igual valor. Ideal para compartir un desayuno auténtico.',
                'promo.manana.productos': 'Croissants, Pain au Chocolat, Brioche',

                // Promoción Macarons
                'promo.macarons.titulo': 'Festival de Macarons',
                'promo.macarons.desc': 'Comprá 3 macarons de cualquier sabor y pagá solo 2. Perfecto para probar nuevos sabores parisinos.',
                'promo.macarons.productos': 'Todos los sabores de macarons',

                // Promoción Premium
                'promo.premium.titulo': 'Cliente Premium',
                'promo.premium.desc': '10% de descuento en compras superiores a $30.000',
                'promo.premium.productos': 'Todos los productos de la tienda',

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
                'whatsapp.contactar': 'Contactar por WhatsApp',

                // Combos Especiales
                'combos.titulo': '🍽️ Combos Especiales',
                'combos.subtitulo': 'Arma tu combo perfecto y ahorrá más 💰🥖',
                'combos.ahorras': 'Ahorrás',
                'combos.armar': 'Armar en calculadora',
                'combos.consultar': 'Consultar',

                'combo.desayuno.nombre': 'Desayuno Parisino',
                'combo.desayuno.item1': '1 Croissant a elección',
                'combo.desayuno.item2': 'Café Premium',
                'combo.desayuno.item3': 'Jugo de naranja natural',

                'combo.dulce.nombre': 'Dulce Francés',
                'combo.dulce.item1': 'Caja x6 Macarons',
                'combo.dulce.item2': '1 Pain aux Raisins',
                'combo.dulce.item3': 'Té premium',

                'combo.celebracion.nombre': 'Celebración Elegante',
                'combo.celebracion.item1': '1 Tarta individual',
                'combo.celebracion.item2': 'Caja x12 Macarons',
                'combo.celebracion.item3': 'Champagne francés',

                // Tips
                'tips.titulo': '💡 Cómo Aprovechar Mejor Nuestras Ofertas',
                'tips.subtitulo': 'Consejos para maximizar tu ahorro en Belle Époque',
                'tips.horarios.titulo': 'Horarios Ideales',
                'tips.horarios.texto': 'Visitanos en las primeras horas de la mañana para encontrar toda nuestra selección de productos frescos recién horneados.',
                'tips.horarios.horario': '🕐 8:30 - 10:00 hs:',
                'tips.horarios.descripcion': 'Productos recién salidos del horno',
                'tips.compartir.titulo': 'Compartir es Ahorrar',
                'tips.compartir.texto': 'Nuestras promociones son perfectas para compartir. Vení con amigos o familia y aprovechá los descuentos grupales.',
                'tips.compartir.etiqueta': '👥 Tip:',
                'tips.compartir.descripcion': 'Combiná promociones con diferentes productos',
                'tips.whatsapp.titulo': 'Pedidos por WhatsApp',
                'tips.whatsapp.texto': 'Reservá tus productos favoritos por WhatsApp y asegurate de que estén disponibles cuando llegues al local.',
                'tips.eventos.titulo': 'Eventos Especiales',
                'tips.eventos.texto': 'Consultá por descuentos adicionales para eventos corporativos, cumpleaños y celebraciones especiales.',
                'tips.eventos.etiqueta': '🎉 Eventos:',
                'tips.eventos.descripcion': 'Descuentos por volumen disponibles',

                // Populares
                'populares.titulo': '⭐ Los Más Elegidos',
                'populares.subtitulo': 'Descubrí qué productos nuestros clientes eligen más frecuentemente',
                'populares.producto1.nombre': 'Croissant Tradicional',
                'populares.producto1.descripcion': 'El clásico que nunca falla. Crujiente por fuera, tierno por dentro.',
                'populares.producto1.promo': '🔥 50% OFF en el 2do',
                'populares.producto2.nombre': 'Macarons Surtidos',
                'populares.producto2.descripcion': 'La joya de la pastelería parisina en 8 sabores únicos.',
                'populares.producto2.promo': '🎁 3x2 disponible',
                'populares.producto3.nombre': 'Croissant de Almendra',
                'populares.producto3.descripcion': 'Hojaldre relleno de crema de almendra y almendras laminadas.',
                'populares.producto3.promo': '💎 Incluido en Premium',
                'populares.producto4.nombre': 'Pain au Chocolat',
                'populares.producto4.descripcion': 'Hojaldre relleno de chocolate, perfecto para el desayuno.',
                'populares.producto4.promo': '🌅 Ideal para combos',
                'populares.agregar_calculadora': 'Agregar a calculadora',

                // Calculadora
                'calculadora.titulo': '🧮 Calculadora de Promociones',
                'calculadora.subtitulo': 'Descubrí cuánto podés ahorrar con nuestras ofertas especiales',
                'calculadora.paso1': '1. Elegí tu promoción',
                'calculadora.promo1.nombre': 'Mañana Francesa',
                'calculadora.promo1.descripcion': '50% OFF en el 2do producto',
                'calculadora.promo2.nombre': 'Festival de Macarons',
                'calculadora.promo2.descripcion': '3x2 en macarons',
                'calculadora.promo3.nombre': 'Cliente Premium',
                'calculadora.promo3.descripcion': '10% en compras +$30.000',
                'calculadora.advertencia.titulo': 'Importante:',
                'calculadora.advertencia.texto': 'Las promociones NO son acumulativas. Solo se aplicará la promoción seleccionada. No es posible combinar descuentos.',
                'calculadora.explicacion.default': 'Agregá productos de viennoiserie y obtené 50% de descuento en el segundo producto de menor o igual valor.',
                'calculadora.paso2': '2. Seleccioná tus productos',
                'calculadora.form.producto_label': 'Producto:',
                'calculadora.form.seleccionar_producto': '-- Seleccioná un producto --',
                'calculadora.form.cantidad_label': 'Cantidad:',
                'calculadora.form.agregar_btn': 'Agregar',
                'calculadora.carrito.titulo': 'Productos en tu carrito:',
                'calculadora.carrito.vacio': 'Aún no agregaste productos. ¡Comenzá seleccionando algo delicioso!',
                'calculadora.paso3': '3. Tu resumen de compra',
                'calculadora.resumen.subtotal': 'Subtotal',
                'calculadora.resumen.descuento': 'Descuento',
                'calculadora.resumen.total': 'Total Final',
                'calculadora.ahorro.titulo': '¡Excelente elección!',
                'calculadora.ahorro.texto': 'Estás ahorrando',
                'calculadora.ahorro.texto2': 'con esta promoción.',
                'calculadora.botones.agregar_carrito': 'Agregar al Carrito',
                'calculadora.botones.pedido_whatsapp': 'Hacer Pedido por WhatsApp',
                'calculadora.botones.nuevo_calculo': 'Nuevo Cálculo',

                // Información
                'info.titulo': '📋 Información Importante',
                'info.modalidades.titulo': 'Modalidades:',
                'info.modalidades.texto': 'Válidas para consumo en local o take away',
                'info.stock.titulo': 'Stock Diario:',
                'info.stock.texto': 'Sujeto a disponibilidad de productos frescos',
                'info.promo3x2.titulo': 'Promociones 3x2:',
                'info.promo3x2.texto': 'Se descuenta el producto de menor valor',
                'info.vigencia.titulo': 'Vigencia:',
                'info.vigencia.texto': 'Hasta el 31 de diciembre de 2025',
                'info.ubicacion.titulo': 'Ubicación:',
                'info.pedidos_especiales.titulo': 'Pedidos Especiales:',
                'info.pedidos_especiales.texto': 'Consultar condiciones particulares',
                'info.nota.titulo': 'Nota Importante',
                'info.nota.texto': 'Las promociones no son acumulables entre sí. Belle Époque se reserva el derecho de modificar las ofertas sin previo aviso. Para consultas específicas sobre aplicación de descuentos, consultá con nuestro personal en el mostrador.',

                // Contacto Promociones
                'contacto.titulo': '¿Tenés dudas sobre las promociones?',
                'contacto.subtitulo': 'Nuestro equipo está listo para ayudarte a aprovechar al máximo nuestras ofertas',
                'contacto.whatsapp.disponibilidad': 'Respuesta inmediata',
                'contacto.whatsapp.boton': 'Consultar',
                'contacto.telefono.titulo': 'Teléfono',
                'contacto.telefono.horario': 'Lun a Vie: 8:30-19:30',
                'contacto.telefono.boton': 'Llamar',
                'contacto.email.tiempo': 'Respuesta en 24hs',
                'contacto.email.boton': 'Escribir',
                'contacto.visita.titulo': 'O visitanos directamente',
                'contacto.visita.horarios': 'Lun-Vie: 8:30-19:30hs<br>Sáb: 9:00-19:30hs',
                'contacto.visita.boton_mapa': 'Ver ubicación en mapa',

                // Footer adicional
                'footer.derechos': '© 2024 Belle Époque - Pastelería Francesa Artesanal. Todos los derechos reservados.',
                'footer.direccion': 'Florida 165, San Martín 170, 1005 Buenos Aires | Teléfono: +54 11 4567-8900',
                'footer.politica_privacidad': 'Política de Privacidad',
                'footer.terminos': 'Términos y Condiciones'
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
                'producto.badge.promo': '50% OFF on 2nd',
                'producto.badge.nuevo': 'New',
                'producto.badge.popular': 'Popular',

                // Products - Croissants & Viennoiseries
                'producto.croissant.nombre': 'Traditional Croissant',
                'producto.croissant.desc': 'Classic puff pastry with French butter, crispy on the outside and tender inside.',
                'producto.croissant.porcion': '1 unit (80g)',
                'producto.croissant.alt': 'Traditional French croissant golden and crispy',

                'producto.painchocolat.nombre': 'Pain au Chocolat',
                'producto.painchocolat.desc': 'Puff pastry filled with high-quality Belgian chocolate bars.',
                'producto.painchocolat.porcion': '1 unit (90g)',
                'producto.painchocolat.alt': 'Pain au Chocolat with Belgian chocolate',

                'producto.croissantalmendra.nombre': 'Almond Croissant',
                'producto.croissantalmendra.desc': 'Puff pastry filled with almond cream and decorated with sliced almonds.',
                'producto.croissantalmendra.porcion': '1 unit (100g)',
                'producto.croissantalmendra.alt': 'Almond Croissant with sliced almonds',

                'producto.painraisins.nombre': 'Pain aux Raisins',
                'producto.painraisins.desc': 'Puff pastry spiral with pastry cream and sultana raisins.',
                'producto.painraisins.porcion': '1 unit (95g)',
                'producto.painraisins.alt': 'Pain aux Raisins with raisins and pastry cream',

                'producto.brioche.nombre': 'Brioche',
                'producto.brioche.desc': 'Soft and fluffy bread enriched with egg and butter, ideal for breakfast.',
                'producto.brioche.porcion': '1 unit (70g)',
                'producto.brioche.alt': 'Golden and fluffy French brioche',

                'producto.chausson.nombre': 'Chausson aux Pommes',
                'producto.chausson.desc': 'Crescent-shaped puff pastry filled with spiced apple compote.',
                'producto.chausson.porcion': '1 unit (110g)',
                'producto.chausson.alt': 'Chausson aux Pommes with apple compote',

                'producto.kouignamann.nombre': 'Kouign-Amann',
                'producto.kouignamann.desc': 'Breton specialty of caramelized puff pastry with crispy sugar layers.',
                'producto.kouignamann.porcion': '1 unit (100g)',
                'producto.kouignamann.alt': 'Caramelized Breton Kouign-Amann',

                // Products - Macarons
                'producto.macaronframbuesa.nombre': 'Raspberry Macaron',
                'producto.macaronframbuesa.desc': 'Delicate almond cookie with fresh raspberry ganache.',
                'producto.macaronframbuesa.porcion': '1 unit (20g)',
                'producto.macaronframbuesa.alt': 'Pink Raspberry Macaron',

                'producto.macaronpistacho.nombre': 'Pistachio Macaron',
                'producto.macaronpistacho.desc': 'Macaron filled with high-quality Sicilian pistachio cream.',
                'producto.macaronpistacho.porcion': '1 unit (20g)',
                'producto.macaronpistacho.alt': 'Green Pistachio Macaron',

                'producto.macaronchocolate.nombre': 'Chocolate Macaron',
                'producto.macaronchocolate.desc': 'Intense macaron with 70% cacao dark chocolate ganache.',
                'producto.macaronchocolate.porcion': '1 unit (20g)',
                'producto.macaronchocolate.alt': 'Dark Chocolate Macaron',

                'producto.macaronvainilla.nombre': 'Vanilla Macaron',
                'producto.macaronvainilla.desc': 'Classic macaron with Madagascar vanilla cream.',
                'producto.macaronvainilla.porcion': '1 unit (20g)',
                'producto.macaronvainilla.alt': 'Classic Vanilla Macaron',

                'producto.macaronlavanda.nombre': 'Lavender Macaron',
                'producto.macaronlavanda.desc': 'Subtle and aromatic macaron with Provence lavender ganache.',
                'producto.macaronlavanda.porcion': '1 unit (20g)',
                'producto.macaronlavanda.alt': 'Purple Lavender Macaron',

                'producto.macaronlimon.nombre': 'Lemon Macaron',
                'producto.macaronlimon.desc': 'Refreshing macaron with Sicilian lemon curd.',
                'producto.macaronlimon.porcion': '1 unit (20g)',
                'producto.macaronlimon.alt': 'Yellow Lemon Macaron',

                'producto.macaronrosa.nombre': 'Rose Macaron',
                'producto.macaronrosa.desc': 'Romantic macaron with rose water buttercream.',
                'producto.macaronrosa.porcion': '1 unit (20g)',
                'producto.macaronrosa.alt': 'Romantic Rose Macaron',

                'producto.macaroncaramelo.nombre': 'Caramel Macaron',
                'producto.macaroncaramelo.desc': 'Sweet macaron with Brittany salted caramel.',
                'producto.macaroncaramelo.porcion': '1 unit (20g)',
                'producto.macaroncaramelo.alt': 'Golden Caramel Macaron',

                // Products - Pastries & Tarts
                'producto.opera.nombre': 'Opera Cake',
                'producto.opera.desc': 'Layers of sponge cake, chocolate ganache and coffee buttercream covered with mirror glaze.',
                'producto.opera.porcion': '1 serving (120g)',
                'producto.opera.alt': 'Opera Cake with chocolate and coffee layers',

                'producto.tatin.nombre': 'Tarte Tatin',
                'producto.tatin.desc': 'Upside-down tart of caramelized apples on shortcrust pastry. A French classic.',
                'producto.tatin.porcion': '1 serving (150g)',
                'producto.tatin.alt': 'Tarte Tatin with caramelized apples',

                'producto.fraisier.nombre': 'Fraisier',
                'producto.fraisier.desc': 'Genoise sponge with mousseline cream and fresh strawberries, covered with marzipan.',
                'producto.fraisier.porcion': '1 serving (130g)',
                'producto.fraisier.alt': 'Fraisier with fresh strawberries',

                'producto.sainthonore.nombre': 'Saint-Honoré',
                'producto.sainthonore.desc': 'Shortcrust pastry base with caramelized cream puffs and Chiboust cream.',
                'producto.sainthonore.porcion': '1 serving (140g)',
                'producto.sainthonore.alt': 'Saint-Honoré with cream puffs',

                'producto.millefeuille.nombre': 'Mille-feuille',
                'producto.millefeuille.desc': 'Three layers of crispy puff pastry with pastry cream and fondant glaze.',
                'producto.millefeuille.porcion': '1 serving (120g)',
                'producto.millefeuille.alt': 'Mille-feuille with caramelized puff pastry',

                'producto.parisbrest.nombre': 'Paris-Brest',
                'producto.parisbrest.desc': 'Choux pastry crown filled with praline cream and toasted hazelnuts.',
                'producto.parisbrest.porcion': '1 serving (130g)',
                'producto.parisbrest.alt': 'Paris-Brest with hazelnut cream',

                // Macarons - Short descriptions
                'macaron.frambuesa.desc.short': 'Fresh raspberry ganache with citrus touch.',
                'macaron.pistacho.desc.short': 'Sicilian pistachio paste with toasted notes.',
                'macaron.chocolate.desc.short': 'Belgian 70% cacao chocolate ganache.',
                'macaron.vainilla.desc.short': 'Premium Madagascar vanilla cream.',
                'macaron.lavanda.desc.short': 'Delicate Provence lavender essence.',
                'macaron.limon.desc.short': 'Fresh lemon curd with natural zest.',
                'macaron.rosa.desc.short': 'Turkish rose water with crystallized petals.',
                'macaron.caramelo.desc.short': 'Beurre salé caramel with Guérande sea salt.',

                // Macarons - Presentations
                'macarons.presentaciones.titulo': 'Available presentations',
                'macarons.presentacion.unidad': 'Unit',
                'macarons.presentacion.caja6': 'Box of 6',
                'macarons.presentacion.caja12': 'Box of 12',
                'macarons.presentacion.caja24': 'Box of 24',
                'macarons.ahorro': 'save',

                // Special Orders
                'especiales.tortas.titulo': 'Custom Cakes',
                'especiales.tortas.desc': 'We design the perfect cake for your special celebration. Each creation is unique and tailored to your tastes and needs.',
                'especiales.tortas.feat1': 'Exclusive designs',
                'especiales.tortas.feat2': 'Choice of flavors',
                'especiales.tortas.feat3': 'Themed decoration',
                'especiales.tortas.feat4': 'Different sizes',

                'especiales.corporativos.titulo': 'Corporate Events',
                'especiales.corporativos.desc': 'High-quality catering for meetings, launches and corporate celebrations with our signature French touch.',
                'especiales.corporativos.feat1': 'Full service',
                'especiales.corporativos.feat2': 'Customized menus',
                'especiales.corporativos.feat3': 'Elegant presentation',
                'especiales.corporativos.feat4': 'Punctual delivery',

                'especiales.bodas.titulo': 'Weddings & Celebrations',
                'especiales.bodas.desc': 'We bring your dream cake to life for the most important day. We work with you on every detail.',
                'especiales.bodas.feat1': 'Personalized consultation',
                'especiales.bodas.feat2': 'Prior tasting',
                'especiales.bodas.feat3': 'Multiple tiers',
                'especiales.bodas.feat4': 'Artistic decoration',

                'especiales.como.titulo': 'How to place your special order?',
                'especiales.paso1.titulo': 'Contact us',
                'especiales.paso1.desc': 'Call or write to tell us your idea',
                'especiales.paso2.titulo': 'We design together',
                'especiales.paso2.desc': 'We work with you on design and flavors',
                'especiales.paso3.titulo': 'We confirm',
                'especiales.paso3.desc': 'We send you the quote and you confirm with deposit',
                'especiales.paso4.titulo': 'We create your order',
                'especiales.paso4.desc': 'We prepare your order with love and dedication',

                'especiales.contacto.email': 'Email',
                'especiales.contacto.whatsapp': 'WhatsApp',
                'especiales.contacto.tiempo': 'Minimum time',
                'especiales.contacto.tiempo.valor': '72 hours in advance',
                'especiales.contacto.sena': 'Deposit required',
                'especiales.contacto.sena.valor': '50% of total order',
                'especiales.cta.contacto': 'Contact us now',
                'especiales.cta.promociones': 'View promotions',

                // Payment Methods
                'pago.titulo': 'Payment Methods',
                'pago.subtitulo': 'We accept multiple payment methods for your convenience',
                'pago.tarjetas.titulo': 'Debit and Credit Cards',
                'pago.tarjetas.desc': 'Visa, Mastercard, American Express and all bank cards.',
                'pago.efectivo.titulo': 'Cash',
                'pago.efectivo.desc': 'Argentine pesos at our store.',
                'pago.transferencia.titulo': 'Bank Transfer',
                'pago.transferencia.desc': 'CBU and Alias available. Ask via WhatsApp.',
                'pago.mercadopago.titulo': 'Mercado Pago',
                'pago.mercadopago.desc': 'Pay with QR or payment link.',

                // Allergens
                'alergenos.titulo': 'Allergen Information',
                'alergenos.subtitulo': 'Your safety is our priority. Know the allergens present in our products.',
                'alergenos.gluten.titulo': 'Gluten',
                'alergenos.gluten.desc': 'Present in all our puff pastry products, croissants and tarts.',
                'alergenos.huevo.titulo': 'Egg',
                'alergenos.huevo.desc': 'Used in sponge cakes, creams and macaron shells.',
                'alergenos.lacteos.titulo': 'Dairy',
                'alergenos.lacteos.desc': 'French butter, cream and milk in most of our preparations.',
                'alergenos.frutos.titulo': 'Tree Nuts',
                'alergenos.frutos.desc': 'Almonds, pistachios and hazelnuts. Risk of cross-contamination.',
                'alergenos.cacao.titulo': 'Cacao',
                'alergenos.cacao.desc': 'Present in chocolate products. May contain traces of milk.',
                'alergenos.soja.titulo': 'Soy',
                'alergenos.soja.desc': 'Soy lecithin present in some imported chocolates.',
                'alergenos.nota.titulo': 'Important Note:',
                'alergenos.nota.desc': 'Our products are prepared in a facility where all mentioned allergens are handled. If you have food allergies, consult with our staff before placing your order. We can provide detailed information about each specific product.',
                'alergenos.consultas': 'Inquiries:',

                // Product Modal
                'modal.consultar.disponibilidad': 'Check availability',
                'modal.consultar.whatsapp': 'Ask via WhatsApp',

                // Index - Additional sections
                'index.nos.eligen': 'THEY CHOOSE US',
                'index.empresas': 'Companies that trust us',
                'index.como.llegar': 'How to get here',
                'index.ver.googlemaps': 'View on Google Maps',
                'index.cerrado': 'Closed',
                'index.ubicacion': 'We are at',

                // Product Figcaptions
                'fig.eclairs': 'Éclairs',
                'fig.cookies': 'Cookies',
                'fig.profiterol': 'Banana profiterole',
                'fig.croissants': 'Artisan croissants',
                'fig.croissants.manteca': 'Butter croissants',
                'fig.medialunas': 'Medialunas',
                'fig.danesas': 'Danish pastries',
                'fig.hojaldre': 'Puff pastries',
                'fig.tartaleta': 'Apple tartlet',
                'fig.desayuno': 'Breakfasts',
                'fig.torta': 'Cakes',
                'fig.macarons': 'Macarons',

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
                'promociones.banner': '🎉 Special offers available! - Valid until end of month 🛍️',
                'promociones.catalogo.titulo': 'Looking for something specific?',
                'promociones.catalogo.desc': 'Explore our complete catalog with all available products',
                'promociones.catalogo.btn': 'View All Products',
                'promociones.vigentes.titulo': '🎉 Current Offers',
                'promociones.vigentes.desc': 'Take advantage of our special promotions and get the best of French pastry 🥐✨',
                'promociones.buscar': 'Search promotions...',
                'promociones.limpiar': 'Clear search',
                'promociones.filtro.todas': 'All',
                'promociones.filtro.viennoiserie': 'Viennoiserie',
                'promociones.filtro.macarons': 'Macarons',
                'promociones.filtro.premium': 'Premium',
                'promociones.encontradas': 'promotions found',
                'promociones.badge.popular': 'MOST POPULAR!',
                'promociones.badge.nuevo': 'NEW',
                'promociones.badge.premium': 'PREMIUM',
                'promociones.favoritos': 'Add to favorites',
                'promociones.personas.viendo': 'people watching',
                'promociones.stock.quedan': 'Only',
                'promociones.stock.disponibles': 'units available today',
                'promociones.valido': 'Valid',
                'promociones.valido.dias': 'every day',
                'promociones.valido.lunes.viernes': 'Monday to Friday',
                'promociones.ejemplo': 'Example:',
                'promociones.ahorras': 'You save',
                'promociones.btn.quiero': 'I want this promo!',
                'promociones.btn.consultar': 'Ask',
                'promociones.btn.detalles': 'View details',

                // French Morning Promotion
                'promo.manana.titulo': 'Perfect French Morning',
                'promo.manana.desc': 'Buy 2 viennoiserie products and get 50% off the second of equal or lesser value. Perfect for sharing an authentic breakfast.',
                'promo.manana.productos': 'Croissants, Pain au Chocolat, Brioche',

                // Macarons Promotion
                'promo.macarons.titulo': 'Macarons Festival',
                'promo.macarons.desc': 'Buy 3 macarons of any flavor and pay for only 2. Perfect for trying new Parisian flavors.',
                'promo.macarons.productos': 'All macaron flavors',

                // Premium Promotion
                'promo.premium.titulo': 'Premium Client',
                'promo.premium.desc': '10% discount on purchases over $30,000',
                'promo.premium.productos': 'All store products',

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
                'whatsapp.contactar': 'Contact via WhatsApp',

                // Special Combos
                'combos.titulo': '🍽️ Special Combos',
                'combos.subtitulo': 'Build your perfect combo and save more 💰🥖',
                'combos.ahorras': 'You save',
                'combos.armar': 'Build in calculator',
                'combos.consultar': 'Ask',

                'combo.desayuno.nombre': 'Parisian Breakfast',
                'combo.desayuno.item1': '1 Croissant of your choice',
                'combo.desayuno.item2': 'Premium Coffee',
                'combo.desayuno.item3': 'Natural orange juice',

                'combo.dulce.nombre': 'Sweet French',
                'combo.dulce.item1': 'Box of 6 Macarons',
                'combo.dulce.item2': '1 Pain aux Raisins',
                'combo.dulce.item3': 'Premium tea',

                'combo.celebracion.nombre': 'Elegant Celebration',
                'combo.celebracion.item1': '1 Individual tart',
                'combo.celebracion.item2': 'Box of 12 Macarons',
                'combo.celebracion.item3': 'French champagne',

                // Tips
                'tips.titulo': '💡 How to Make the Most of Our Offers',
                'tips.subtitulo': 'Tips to maximize your savings at Belle Époque',
                'tips.horarios.titulo': 'Ideal Hours',
                'tips.horarios.texto': 'Visit us in the early morning hours to find our full selection of freshly baked products.',
                'tips.horarios.horario': '🕐 8:30 - 10:00 am:',
                'tips.horarios.descripcion': 'Products fresh from the oven',
                'tips.compartir.titulo': 'Sharing is Saving',
                'tips.compartir.texto': 'Our promotions are perfect for sharing. Come with friends or family and take advantage of group discounts.',
                'tips.compartir.etiqueta': '👥 Tip:',
                'tips.compartir.descripcion': 'Combine promotions with different products',
                'tips.whatsapp.titulo': 'Orders via WhatsApp',
                'tips.whatsapp.texto': 'Reserve your favorite products via WhatsApp and make sure they\'re available when you arrive at the store.',
                'tips.eventos.titulo': 'Special Events',
                'tips.eventos.texto': 'Ask about additional discounts for corporate events, birthdays and special celebrations.',
                'tips.eventos.etiqueta': '🎉 Events:',
                'tips.eventos.descripcion': 'Volume discounts available',

                // Popular Products
                'populares.titulo': '⭐ Most Popular',
                'populares.subtitulo': 'Discover which products our customers choose most frequently',
                'populares.producto1.nombre': 'Traditional Croissant',
                'populares.producto1.descripcion': 'The classic that never fails. Crispy outside, tender inside.',
                'populares.producto1.promo': '🔥 50% OFF on 2nd',
                'populares.producto2.nombre': 'Assorted Macarons',
                'populares.producto2.descripcion': 'The jewel of Parisian pastry in 8 unique flavors.',
                'populares.producto2.promo': '🎁 3x2 available',
                'populares.producto3.nombre': 'Almond Croissant',
                'populares.producto3.descripcion': 'Puff pastry filled with almond cream and sliced almonds.',
                'populares.producto3.promo': '💎 Included in Premium',
                'populares.producto4.nombre': 'Pain au Chocolat',
                'populares.producto4.descripcion': 'Chocolate-filled puff pastry, perfect for breakfast.',
                'populares.producto4.promo': '🌅 Ideal for combos',
                'populares.agregar_calculadora': 'Add to calculator',

                // Calculator
                'calculadora.titulo': '🧮 Promotions Calculator',
                'calculadora.subtitulo': 'Discover how much you can save with our special offers',
                'calculadora.paso1': '1. Choose your promotion',
                'calculadora.promo1.nombre': 'French Morning',
                'calculadora.promo1.descripcion': '50% OFF on 2nd product',
                'calculadora.promo2.nombre': 'Macarons Festival',
                'calculadora.promo2.descripcion': '3x2 on macarons',
                'calculadora.promo3.nombre': 'Premium Client',
                'calculadora.promo3.descripcion': '10% on purchases +$30,000',
                'calculadora.advertencia.titulo': 'Important:',
                'calculadora.advertencia.texto': 'Promotions are NOT cumulative. Only the selected promotion will be applied. It is not possible to combine discounts.',
                'calculadora.explicacion.default': 'Add viennoiserie products and get 50% off the second product of equal or lesser value.',
                'calculadora.paso2': '2. Select your products',
                'calculadora.form.producto_label': 'Product:',
                'calculadora.form.seleccionar_producto': '-- Select a product --',
                'calculadora.form.cantidad_label': 'Quantity:',
                'calculadora.form.agregar_btn': 'Add',
                'calculadora.carrito.titulo': 'Products in your cart:',
                'calculadora.carrito.vacio': 'You haven\'t added products yet. Start by selecting something delicious!',
                'calculadora.paso3': '3. Your purchase summary',
                'calculadora.resumen.subtotal': 'Subtotal',
                'calculadora.resumen.descuento': 'Discount',
                'calculadora.resumen.total': 'Final Total',
                'calculadora.ahorro.titulo': 'Excellent choice!',
                'calculadora.ahorro.texto': 'You\'re saving',
                'calculadora.ahorro.texto2': 'with this promotion.',
                'calculadora.botones.agregar_carrito': 'Add to Cart',
                'calculadora.botones.pedido_whatsapp': 'Order via WhatsApp',
                'calculadora.botones.nuevo_calculo': 'New Calculation',

                // Information
                'info.titulo': '📋 Important Information',
                'info.modalidades.titulo': 'Modalities:',
                'info.modalidades.texto': 'Valid for dine-in or take away',
                'info.stock.titulo': 'Daily Stock:',
                'info.stock.texto': 'Subject to availability of fresh products',
                'info.promo3x2.titulo': '3x2 Promotions:',
                'info.promo3x2.texto': 'Lowest value product is discounted',
                'info.vigencia.titulo': 'Validity:',
                'info.vigencia.texto': 'Until December 31, 2025',
                'info.ubicacion.titulo': 'Location:',
                'info.pedidos_especiales.titulo': 'Special Orders:',
                'info.pedidos_especiales.texto': 'Consult for particular conditions',
                'info.nota.titulo': 'Important Note',
                'info.nota.texto': 'Promotions are not cumulative with each other. Belle Époque reserves the right to modify offers without prior notice. For specific questions about discount application, consult with our staff at the counter.',

                // Contact Promotions
                'contacto.titulo': 'Have questions about promotions?',
                'contacto.subtitulo': 'Our team is ready to help you make the most of our offers',
                'contacto.whatsapp.disponibilidad': 'Immediate response',
                'contacto.whatsapp.boton': 'Ask',
                'contacto.telefono.titulo': 'Phone',
                'contacto.telefono.horario': 'Mon to Fri: 8:30am-7:30pm',
                'contacto.telefono.boton': 'Call',
                'contacto.email.tiempo': 'Response in 24hrs',
                'contacto.email.boton': 'Write',
                'contacto.visita.titulo': 'Or visit us directly',
                'contacto.visita.horarios': 'Mon-Fri: 8:30am-7:30pm<br>Sat: 9:00am-7:30pm',
                'contacto.visita.boton_mapa': 'View location on map',

                // Additional Footer
                'footer.derechos': '© 2024 Belle Époque - Artisanal French Pastry. All rights reserved.',
                'footer.direccion': 'Florida 165, San Martín 170, 1005 Buenos Aires | Phone: +54 11 4567-8900',
                'footer.politica_privacidad': 'Privacy Policy',
                'footer.terminos': 'Terms and Conditions'
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

        // Título del modal: actualizar solo la etiqueta, preservando ícono y contador
        const titleLabel = modal.querySelector('.modal-header h2 .cart-title-label');
        if (titleLabel) {
            titleLabel.textContent = this.translate('carrito.tu.pedido');
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

        // Traducir alt de imágenes
        document.querySelectorAll('[data-translate-alt]').forEach(element => {
            const key = element.getAttribute('data-translate-alt');
            const translation = this.translate(key);
            if (translation) {
                element.setAttribute('alt', translation);
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
