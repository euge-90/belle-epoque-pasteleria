# Belle Époque — Pastelería Francesa Artesanal

**Demo en vivo:** https://euge-90.github.io/belle-epoque-pasteleria/

## Descripción

Sitio web profesional para **Belle Époque**, una pastelería francesa artesanal ubicada en una galería del microcentro de Buenos Aires. El sitio comunica la identidad de marca, presenta productos, incluye un sistema completo de carrito de compras, filtros avanzados, formularios de contacto validados, y múltiples funcionalidades interactivas, todo con un enfoque accesible, responsive y optimizado para SEO.

## Características principales

### Funcionalidades Core
- **Sistema de carrito de compras**: Agregar/quitar productos, gestión de cantidades, persistencia con localStorage, checkout por WhatsApp
- **Filtros de productos avanzados**: Por categoría, rango de precios, opciones dietarias y búsqueda en tiempo real
- **Formularios validados**: Contacto y newsletter con validación en tiempo real (email, teléfono, campos requeridos)
- **Slider de testimonios**: Rotación automática con controles, soporte para gestos táctiles en móviles
- **Animaciones y efectos**: Scroll reveal, efectos de hover, transiciones suaves, parallax
- **Botón flotante de WhatsApp**: Acceso directo para consultas
- **Banner de cookies**: Gestión de consentimiento con localStorage

### Diseño y UX
- **Responsive completo** (mobile-first) con Flexbox y CSS Grid
- **Modo oscuro automático** con `prefers-color-scheme`
- **Tipografía profesional**: Cinzel, Lora y Montserrat (Google Fonts) + Avenir auto-hospedada
- **Variables CSS** para paleta de colores y consistencia visual
- **Animaciones CSS personalizadas**: fadeIn, slideIn, pulse, bounce, glow y más
- **Efectos visuales**: Shimmer en banners, ripple en botones, skeleton loaders

### SEO y Accesibilidad
- **Meta tags completos**: Description, keywords, favicon en todas las páginas
- **Open Graph y Twitter Cards**: Optimización para compartir en redes sociales
- **Datos estructurados (Schema.org)**: Markup de tipo Bakery para mejor indexación
- **Accesibilidad WCAG**: Aria-labels, navegación por teclado, contraste adecuado
- **Lazy loading**: Carga diferida de imágenes para mejor rendimiento

### Contenido
- **Galería de productos**: 12 productos con imágenes reales en tarjetas equilibradas
- **Sección "Nos Eligen"**: Logos de empresas clientes destacadas
- **Página FAQ**: 8 preguntas frecuentes con acordeón interactivo
- **Blog**: 3 artículos sobre pastelería francesa
- **Política de privacidad**: Documento legal completo con términos y condiciones
- **Mapa de ubicación**: Google Maps iframe con fallback estático

## Estructura del sitio

### Páginas

- **index.html**: Página principal con hero, nosotros, local, productos, testimonios y contacto
- **productos.html**: Catálogo completo con filtros avanzados y sistema de carrito
- **promociones.html**: Ofertas especiales, calculadora de descuentos y carruseles interactivos
- **faq.html**: Preguntas frecuentes con sistema de acordeón y búsqueda
- **blog.html**: Artículos sobre pastelería francesa y consejos
- **politica-privacidad.html**: Política de privacidad y términos y condiciones
- **documentacion-proyecto.html**: Documentación técnica del proyecto

### Secciones de index.html

1. **Inicio (Hero)**: Imagen del local de fondo con superposición, título y subtítulo
2. **Nosotros**: Historia breve, cita destacada con detalles dorados, y foto del frente del local
3. **Nuestro Local**: Dos imágenes del interior en grilla responsive
4. **Productos**: Preview de 12 productos con sistema de carrito y botón "Ver todos los productos"
5. **Testimonios**: Slider automático con 5 testimonios de clientes, navegación y soporte táctil
6. **Nos Eligen**: Grilla de logos de empresas clientes destacadas
7. **Contacto**: Formulario validado de contacto + mapa embebido + horarios de atención
8. **Footer**: Marca, navegación, redes sociales, contacto y enlaces legales

## Tecnologías

### Frontend
- **HTML5 semántico**: Estructura clara y accesible
- **CSS3 avanzado**: Variables, Flexbox, Grid, animaciones y media queries
- **JavaScript vanilla (ES6+)**: Clases, async/await, modules, destructuring
- **APIs del navegador**: localStorage, Intersection Observer, Fetch API

### Estilos y Diseño
- **CSS custom properties**: Paleta de colores consistente y theming
- **Animaciones CSS**: Keyframes personalizados (fadeIn, slideIn, pulse, shimmer, etc.)
- **Responsive design**: Mobile-first con breakpoints adaptativos
- **Modo oscuro**: Detección automática con `prefers-color-scheme`

### Fuentes e Iconografía
- **Google Fonts**: Cinzel (títulos), Lora (texto destacado), Montserrat (UI)
- **Avenir auto-hospedada**: Sistema de fallbacks robusto
- **Font Awesome 6.5.0**: Iconos de redes sociales y UI
- **Simple Icons**: SVG de TripAdvisor

### Integraciones
- **WhatsApp Business API**: Checkout y consultas directas
- **Google Maps**: Iframe embebido con fallback estático
- **Schema.org**: Datos estructurados para SEO

## Estructura de archivos

```
belle-epoque-pasteleria/
├── index.html
├── productos.html
├── promociones.html
├── faq.html
├── blog.html
├── politica-privacidad.html
├── documentacion-proyecto.html
├── INSTRUCCIONES-GITHUB.md
├── README.md
├── .gitignore
├── css/
│   ├── styles.css              # Estilos principales
│   ├── animations.css          # Animaciones y efectos
│   ├── productos.css           # Estilos específicos de productos
│   └── promociones.css         # Estilos de promociones
├── js/
│   ├── main.js                 # Funcionalidades core (scroll, navbar, whatsapp, cookies)
│   ├── cart.js                 # Sistema de carrito de compras
│   ├── contact.js              # Validación de formularios
│   ├── product-filters.js      # Filtros de productos
│   ├── testimonials.js         # Slider de testimonios
│   ├── productos.js            # Lógica específica de página de productos
│   └── promociones.js          # Carruseles y calculadora de promociones
├── fonts/
│   ├── avenir/
│   │   └── [archivos de fuente]
│   └── README.txt
├── images/
│   ├── logo.png
│   ├── local.png
│   ├── interior.png
│   ├── interiorr.png
│   ├── [productos: eclairs, cookies, croissants, macarons, tortas, etc.]
│   └── [logos clientes: mercado_libre, santander, farmaplus, etc.]
└── .github/
    └── workflows/
```

## Paleta de colores

- **Dorado**: `#d4af37` (acento principal)
- **Crema/Beige**: tonos cálidos para fondos y elementos decorativos
- **Marrón oscuro**: texto principal
- **Modo oscuro**: gradientes neutros con dorado como acento

## Tipografía

- **Títulos principales**: Cinzel (serif elegante)
- **Texto destacado/quotes**: Lora (serif legible)
- **UI/navegación**: Montserrat (sans-serif moderna)
- **Fuente de sistema (auto-hospedada)**: Avenir con fallbacks: `Avenir, Avenir Next, Segoe UI, Helvetica Neue, Arial, sans-serif`

## JavaScript: Funcionalidades Implementadas

### main.js - Funcionalidades Core
- **Smooth scroll**: Navegación suave entre secciones
- **Navbar dinámica**: Cambio de estilo al hacer scroll
- **Botón back-to-top**: Aparece automáticamente después de scroll
- **Scroll reveal**: Animaciones al hacer visible elementos
- **WhatsApp flotante**: Botón persistente con animación pulse
- **Cookie banner**: Gestión de consentimiento con localStorage
- **Business hours**: Indicador dinámico de horario abierto/cerrado
- **Toast notifications**: Sistema de notificaciones no invasivo

### cart.js - Sistema de Carrito
- **Clase ShoppingCart**: Gestión completa del carrito
- **Persistencia**: localStorage para mantener carrito entre sesiones
- **Modal del carrito**: Interfaz completa para gestionar productos
- **Cálculo automático**: Subtotal, descuentos y total
- **Checkout WhatsApp**: Envío automático de pedido formateado
- **Validaciones**: Cantidades mínimas/máximas, stock disponible

### contact.js - Validación de Formularios
- **Clase ContactForm**: Validación en tiempo real
- **Regex patterns**: Validación de email, teléfono, formatos
- **Mensajes de error**: Feedback inmediato al usuario
- **Newsletter**: Formulario de suscripción con validación
- **Prevención de spam**: Límites y validaciones de seguridad

### product-filters.js - Filtros Avanzados
- **Clase ProductFilters**: Sistema completo de filtrado
- **Múltiples criterios**: Categoría, precio, opciones dietarias, búsqueda
- **Actualización dinámica**: Resultados en tiempo real
- **Contador de resultados**: Feedback visual de productos encontrados
- **Estado persistente**: Mantiene filtros seleccionados

### testimonials.js - Slider de Testimonios
- **Clase TestimonialsSlider**: Carrusel automático
- **Auto-play**: Rotación cada 5 segundos con pausa en hover
- **Touch support**: Gestos de swipe en dispositivos táctiles
- **Navegación completa**: Flechas, dots, teclado
- **5 testimonios reales**: Clientes de diferentes zonas de Buenos Aires

## Accesibilidad y rendimiento

### Accesibilidad (WCAG 2.1)
- **Contraste**: Ratios adecuados en todos los modos (claro/oscuro)
- **Navegación por teclado**: Tab, Enter, Escape funcionales
- **ARIA labels**: Etiquetas descriptivas en elementos interactivos
- **Estructura semántica**: HTML5 con roles correctos
- **Textos alternativos**: Todas las imágenes con alt descriptivo
- **Focus visible**: Indicadores claros de elemento activo

### Rendimiento
- **Lazy loading**: Carga diferida de imágenes fuera del viewport
- **Debouncing**: En búsqueda y filtros para reducir procesamiento
- **LocalStorage**: Cache de preferencias y carrito
- **CSS optimizado**: Variables y clases reutilizables
- **JavaScript modular**: Carga condicional según página
- **Minificación**: CSS y JS optimizados para producción

## Publicación (GitHub Pages)

**Sitio en vivo**: https://euge-90.github.io/belle-epoque-pasteleria/

### Actualización rápida

```powershell
git add .
git commit -m "descripción del cambio"
git push
```

Para más detalles sobre el flujo de trabajo con Git, consultar `INSTRUCCIONES-GITHUB.md`.

## Datos de contacto (del sitio)

- **Dirección**: Florida 165, San Martín 170, 1005 Buenos Aires
- **Teléfono**: +54 11 4567-8900
- **Horarios**:
  - Lunes a Viernes: 8:30 a 19:30 hs
  - Sábados: 9:00 a 19:30 hs
  - Domingos: Cerrado

## Características técnicas destacadas

### Sistema de Carrito de Compras
- **Arquitectura modular**: Clase JavaScript independiente y reutilizable
- **Persistencia local**: Carrito guardado en localStorage, sobrevive a recargas
- **Integración WhatsApp**: Checkout directo con mensaje formateado automáticamente
- **UX optimizada**: Modal responsive, animaciones suaves, feedback visual
- **Validaciones**: Control de stock, cantidades mínimas/máximas

### Filtrado Avanzado de Productos
- **Multi-criterio**: Categoría, rango de precios, opciones dietarias, búsqueda de texto
- **Tiempo real**: Actualización instantánea sin recargar página
- **Contador dinámico**: Muestra cantidad de resultados encontrados
- **Performance**: Debouncing en búsqueda para optimizar rendimiento

### Validación de Formularios
- **Regex personalizado**: Validación robusta de email, teléfono, campos de texto
- **Feedback inmediato**: Mensajes de error inline, iconos de estado
- **Prevención de errores**: Desactivación de submit hasta validación correcta
- **Accesible**: Mensajes asociados con aria-describedby

### Animaciones y Efectos
- **Scroll reveal**: Intersection Observer API para animaciones al scroll
- **Shimmer effect**: Banner promocional con gradiente animado
- **Ripple effect**: Feedback táctil en botones
- **Skeleton loaders**: Placeholders durante carga de contenido
- **Parallax**: Efectos de profundidad en secciones hero

### SEO y Metadatos
- **Open Graph**: Tarjetas enriquecidas para Facebook, LinkedIn
- **Twitter Cards**: Preview optimizado para compartir en Twitter
- **Schema.org**: Datos estructurados tipo Bakery para Google
- **Favicon dinámico**: SVG inline con emoji de croissant
- **Meta tags completos**: Description, keywords, author en todas las páginas

## Créditos

- **Iconos de marcas**: Font Awesome y Simple Icons
- **Logos de "Nos Eligen"**: Provistos por el cliente
- **Imágenes del local y productos**: Provistas para el proyecto
- **Fuentes**: Google Fonts (Cinzel, Lora, Montserrat) y Avenir auto-hospedada

## Nota sobre el desarrollo

Este proyecto fue desarrollado utilizando [Claude Code](https://claude.com/claude-code) en Visual Studio Code como herramienta de asistencia integral. Claude Code contribuyó en:

- **Arquitectura JavaScript**: Diseño e implementación de clases modulares (ShoppingCart, ProductFilters, TestimonialsSlider, ContactForm)
- **Sistema de carrito**: Lógica completa con persistencia, validaciones y checkout por WhatsApp
- **Validaciones**: Implementación de regex patterns y validación en tiempo real de formularios
- **Animaciones CSS**: Keyframes personalizados y efectos visuales (shimmer, ripple, scroll reveal)
- **SEO**: Meta tags, Open Graph, Twitter Cards y datos estructurados Schema.org
- **Páginas adicionales**: FAQ con acordeón, Blog, Política de Privacidad
- **Git workflow**: Commits semánticos y gestión de repositorio
- **Documentación**: README completo con detalles técnicos

El uso de Claude Code permitió implementar funcionalidades profesionales de manera eficiente, manteniendo código limpio, modular y bien documentado, mientras se siguieron las mejores prácticas de desarrollo web moderno.

---

**Belle Époque** · Pastelería Francesa Artesanal ✨🥐
