# 🥐 Belle Époque - Pastelería Francesa Artesanal

Sitio web institucional desarrollado para Belle Époque, una pastelería francesa artesanal ubicada en Buenos Aires. Proyecto desarrollado como parte de la materia **Desarrollo y Diseño Web** - UADE.

**Demo en vivo:** https://euge-90.github.io/belle-epoque-pasteleria/

---

## 📋 Descripción del Proyecto

Belle Époque es un sitio web profesional que presenta la identidad, productos y servicios de una pastelería francesa artesanal. El proyecto fue desarrollado con tecnologías web modernas, enfocándose en accesibilidad, experiencia de usuario y diseño responsive.

### 🎯 Objetivos del Proyecto

- Crear presencia digital profesional para la pastelería
- Exhibir productos con información detallada (precios, porciones, alérgenos)
- Ofrecer experiencia multiidioma (Español/Inglés)
- Garantizar accesibilidad según estándares WCAG 2.1 AA
- Implementar diseño responsive mobile-first
- Facilitar contacto directo con clientes vía WhatsApp

---

## 🌟 Características Principales

### 🌐 Sistema Multiidioma
- Traducción completa Español/Inglés
- Toggle dinámico de idioma en todas las páginas
- Persistencia de preferencia del usuario en localStorage
- 280+ textos traducidos manualmente
- Integración con modales y componentes dinámicos

### 🛍️ Catálogo de Productos
- Más de 20 productos organizados por categorías
- Información detallada: precio, porción, alérgenos
- Íconos visuales para identificación rápida de alérgenos
- Sistema de carrito de compras funcional
- Vista rápida de productos con overlay hover
- Filtros por categoría en tiempo real

### ♿ Accesibilidad WCAG 2.1 AA
- Contraste de colores certificado (ratio 4.8:1)
- Navegación por teclado completa
- Etiquetas ARIA en elementos interactivos
- Text-shadow optimizado para legibilidad en hero sections
- Variables CSS para colores accesibles
- Footer con enlaces legales accesibles

### 📱 Diseño Responsive
- Enfoque mobile-first
- Breakpoints optimizados: 480px, 768px, 1024px
- Grid adaptable con CSS Grid y Flexbox
- Menú hamburguesa para dispositivos móviles
- Imágenes optimizadas con lazy loading

### 🎨 Interfaz de Usuario
- Paleta de colores inspirada en pastelerías francesas de lujo
- Animaciones CSS suaves y profesionales
- Botones flotantes (WhatsApp + volver arriba)
- Efectos hover interactivos
- Tipografías elegantes: Playfair Display, Cinzel y Georgia

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Flexbox, Grid, animaciones, media queries
- **JavaScript ES6+**: Funcionalidad sin dependencias externas

### Librerías y Recursos
- **Font Awesome 6.5.0**: Iconografía profesional
- **Google Fonts**: Cinzel, Lora, Montserrat, Playfair Display
- **Simple Icons**: SVG de TripAdvisor
- **Lazy Loading**: Optimización de carga de imágenes

### Herramientas de Desarrollo
- **Git/GitHub**: Control de versiones
- **GitHub Pages**: Hosting y deployment automático
- **VS Code**: Editor de código principal
- **Chrome DevTools**: Testing, debugging y optimización
- **Lighthouse**: Auditorías de rendimiento y accesibilidad

---

## 📂 Estructura del Proyecto

```
belle-epoque-pasteleria/
├── index.html              # Página principal
├── productos.html          # Catálogo de productos
├── promociones.html        # Ofertas y promociones
├── blog.html              # Blog de la pastelería
├── faq.html               # Preguntas frecuentes
├── politica-privacidad.html # Política de privacidad
├── css/
│   ├── styles.css         # Estilos principales (1200+ líneas)
│   ├── animations.css     # Animaciones y transiciones
│   ├── productos.css      # Estilos específicos de productos
│   └── promociones.css    # Estilos de promociones
├── js/
│   ├── translations.js    # Sistema de internacionalización (627 líneas)
│   ├── cart.js           # Lógica del carrito de compras
│   ├── main.js           # Funcionalidad principal
│   ├── productos.js      # Lógica de productos
│   ├── promociones.js    # Lógica de promociones
│   ├── contact.js        # Formulario de contacto
│   └── testimonials.js   # Sistema de testimonios
├── images/               # Recursos visuales
│   ├── products_images/  # Imágenes de productos
│   └── logos/           # Logotipos y branding
└── README.md            # Documentación del proyecto
```

---

## 🎨 Paleta de Colores

La paleta fue diseñada para evocar elegancia y tradición francesa:

| Color | Hex | Uso |
|-------|-----|-----|
| Dorado Elegante | `#d4af37` | Color principal, acentos |
| Dorado Accesible | `#9d7b1f` | Textos sobre fondos claros (WCAG AA) |
| Marrón Chocolate | `#8b4513` | Elementos secundarios |
| Beige Crema | `#f5f5dc` | Fondos suaves |
| Marrón Oscuro | `#2c1810` | Textos principales |

---

## 🚀 Funcionalidades Implementadas

### Sistema de Internacionalización

- **Desarrollo:** 8 horas
- **Líneas de código:** 627
- **Archivos modificados:** 7
- **Traducciones:** 280+ textos en ES/EN

Implementación de un sistema completo de traducción que permite cambiar dinámicamente entre español e inglés. El sistema utiliza una arquitectura basada en clases con métodos para:
- Traducción de elementos DOM con atributo `data-translate`
- Traducción de placeholders con `data-translate-placeholder`
- Traducción de aria-labels para accesibilidad
- Persistencia de preferencia de idioma en localStorage
- Integración con componentes dinámicos (modales, tooltips)

### Mejoras de Accesibilidad

- Implementación de variables CSS para contraste WCAG AA
- Optimización de text-shadow en hero sections (multi-capa)
- Aria-labels en navegación y elementos interactivos
- Navegación por teclado completa en todos los componentes
- Footer legal con enlaces accesibles

### Catálogo de Productos

- Diseño y maquetación de 20+ tarjetas de productos
- Sistema de iconografía para alérgenos (gluten, lácteos, frutos secos, huevo)
- Información detallada visible: precio, porción, ingredientes
- Grid responsive con CSS Grid (auto-fit, minmax)
- Overlay de "Vista Rápida" activado solo en hover de imagen
- Botones "Agregar al Carrito" siempre visibles y clickeables

### Sistema de Carrito de Compras

- Funcionalidad completa de agregar/eliminar productos
- Persistencia de carrito en localStorage
- Contador dinámico en navbar
- Modal responsive con resumen de pedido
- Integración con WhatsApp para checkout
- Cálculo automático de totales

---

## 📱 Páginas del Sitio

### 1. Inicio (index.html)

- **Hero section** con presentación y imagen de fondo
- **Sección "Nosotros"** con historia de la pastelería
- **Nuestro Local** con galería de imágenes
- **Preview de productos** destacados
- **Testimonios** de clientes
- **Sección "Nos Eligen"** con logos de clientes
- **Información de contacto** y mapa de ubicación

### 2. Productos (productos.html)

Catálogo completo organizado por categorías:
- **Croissants & Viennoiseries:** Hojaldre artesanal con manteca francesa
- **Macarons Parisinos:** Elaborados según tradición francesa
- **Pasteles & Tartas:** Creaciones artesanales para ocasiones especiales
- **Pedidos Especiales:** Productos personalizados para eventos

Características:
- Sistema de filtros por categoría
- Vista rápida de productos en modal
- Información nutricional y alérgenos
- Integración con sistema de carrito

### 3. Promociones (promociones.html)

- Ofertas especiales y descuentos destacados
- Productos del mes con precios promocionales
- Sistema de cupones y códigos de descuento
- Carruseles interactivos de productos en oferta

### 4. Blog (blog.html)

- Artículos sobre repostería francesa
- Recetas y consejos profesionales
- Historia de productos clásicos franceses
- Noticias y novedades de la pastelería

### 5. FAQ (faq.html)

- **8 preguntas frecuentes** con sistema de acordeón
- Sistema de búsqueda en tiempo real
- Categorización de preguntas (envíos, pedidos, pagos, etc.)
- Información sobre:
  - Envíos a domicilio (CABA y GBA)
  - Tortas personalizadas
  - Tiempos de anticipación
  - Opciones veganas y sin gluten
  - Eventos y catering
  - Métodos de pago
  - Elaboración diaria
  - Programa de fidelidad

### 6. Política de Privacidad (politica-privacidad.html)

- **Política de Privacidad:** Información sobre recopilación y uso de datos
- **Términos y Condiciones:** Reglas de uso del sitio y servicios
- **Información de Contacto Legal:** Datos de la empresa
- Estructura clara con navegación por anclas

---

## 💻 JavaScript: Funcionalidades Implementadas

### main.js - Funcionalidades Core

```javascript
// Funcionalidades principales implementadas:
- Smooth scroll entre secciones
- Navbar dinámica con cambio de estilo al scroll
- Botón "Volver arriba" (back-to-top) con smooth scroll
- Sistema de botones flotantes (WhatsApp + back-to-top)
- Scroll reveal con Intersection Observer API
- Indicador de horario abierto/cerrado dinámico
- Sistema de notificaciones toast
```

### translations.js - Sistema de Internacionalización

```javascript
// Arquitectura del sistema de traducción:
class TranslationSystem {
  - Constructor con detección de idioma preferido
  - Método createLanguageToggle() para toggle ES|EN
  - Método translatePage() para traducción automática
  - Método changeLanguage(lang) para cambio dinámico
  - Integración con localStorage para persistencia
  - Interceptación de métodos globales (alert, confirm)
  - Traducción de modales dinámicos
}
```

### cart.js - Sistema de Carrito

```javascript
// Clase ShoppingCart con métodos:
- addToCart(product) - Agregar productos
- removeFromCart(productId) - Eliminar productos
- updateQuantity(productId, quantity) - Actualizar cantidades
- clearCart() - Vaciar carrito
- calculateTotal() - Calcular totales
- saveToLocalStorage() - Persistencia de datos
- checkout() - Integración con WhatsApp
```

### contact.js - Validación de Formularios

```javascript
// Validaciones implementadas:
- Validación de email con regex
- Validación de teléfono (formato argentino)
- Validación de campos requeridos
- Feedback visual en tiempo real
- Prevención de envío con errores
- Sistema de mensajes de error personalizados
```

---

## 🎯 Características Técnicas Destacadas

### Sistema de Carrito de Compras
- **Arquitectura modular**: Clase JavaScript independiente y reutilizable
- **Persistencia local**: Carrito guardado en localStorage
- **Integración WhatsApp**: Checkout directo con mensaje formateado
- **UX optimizada**: Modal responsive con animaciones suaves
- **Validaciones**: Control de cantidades y productos

### Sistema de Traducción
- **280+ traducciones**: Cobertura completa ES/EN
- **Toggle persistente**: Preferencia guardada entre sesiones
- **Traducción dinámica**: Actualización en tiempo real sin recargar
- **Integración total**: Modales, placeholders, aria-labels
- **Código modular**: Clase reutilizable TranslationSystem

### Filtrado de Productos
- **Multi-criterio**: Categoría, búsqueda, filtros combinados
- **Tiempo real**: Actualización instantánea de resultados
- **Contador dinámico**: Feedback visual de productos encontrados
- **Performance**: Optimización con debouncing

### Animaciones y Efectos
- **Scroll reveal**: Intersection Observer API
- **Efectos hover**: Transiciones suaves en cards y botones
- **Animaciones CSS**: Keyframes personalizados
- **Smooth scroll**: Navegación fluida entre secciones

---

## ♿ Accesibilidad y Rendimiento

### Accesibilidad (WCAG 2.1 AA)
- ✅ **Contraste**: Ratio 4.8:1 en todos los textos sobre fondos claros
- ✅ **Navegación por teclado**: Tab, Enter, Escape funcionales
- ✅ **ARIA labels**: Etiquetas descriptivas en elementos interactivos
- ✅ **Estructura semántica**: HTML5 con roles correctos
- ✅ **Textos alternativos**: Todas las imágenes con alt descriptivo
- ✅ **Focus visible**: Indicadores claros de elemento activo

### Rendimiento
- ⚡ **Lazy loading**: Carga diferida de imágenes
- ⚡ **LocalStorage**: Cache de preferencias y carrito
- ⚡ **CSS optimizado**: Variables y clases reutilizables
- ⚡ **JavaScript modular**: Carga condicional según página
- ⚡ **Debouncing**: En búsqueda y filtros

---

## 📊 Métricas del Proyecto

### Líneas de Código
- **HTML**: ~2,500 líneas (6 páginas)
- **CSS**: ~1,400 líneas (4 archivos)
- **JavaScript**: ~1,200 líneas (7 archivos)
- **Total**: ~5,100 líneas de código

### Tiempo de Desarrollo
- **Fase 1 - Estructura base**: 12 horas
- **Fase 2 - Estilos y diseño**: 16 horas
- **Fase 3 - JavaScript**: 20 horas
- **Fase 4 - Sistema i18n**: 8 horas
- **Fase 5 - Optimización**: 10 horas
- **Total**: ~66 horas de desarrollo

### Commits
- **Total de commits**: 15+
- **Ramas**: main
- **Convención**: Conventional Commits (feat, fix, refactor, docs)

---

## 🚀 Publicación y Deployment

### GitHub Pages
**Sitio en vivo**: https://euge-90.github.io/belle-epoque-pasteleria/

### Proceso de Actualización

```bash
# 1. Verificar cambios
git status

# 2. Agregar archivos modificados
git add .

# 3. Crear commit descriptivo
git commit -m "descripción del cambio"

# 4. Subir a GitHub
git push origin main
```

El sitio se actualiza automáticamente en GitHub Pages después de cada push a la rama `main`.

---

## 📞 Datos de Contacto (del sitio)

- **Nombre**: Belle Époque Pastelería Francesa
- **Dirección**: Florida 165, San Martín 170, 1005 Buenos Aires
- **Teléfono**: +54 11 4567-8900
- **Email**: info@belleepoque.com.ar

### Horarios de Atención
- **Lunes a Viernes**: 8:30 a 19:30 hs
- **Sábados**: 9:00 a 19:30 hs
- **Domingos**: Cerrado

---

## 🎓 Aprendizajes y Desafíos

### Principales Aprendizajes

1. **Sistema de Internacionalización**: Implementación de un sistema de traducción dinámico sin frameworks externos, utilizando solo JavaScript vanilla y localStorage.

2. **Accesibilidad WCAG**: Profundización en estándares de accesibilidad web, implementación de contraste adecuado, navegación por teclado y etiquetas ARIA.

3. **CSS Grid y Flexbox**: Dominio de layouts modernos con CSS Grid para productos y Flexbox para componentes responsivos.

4. **JavaScript Modular**: Arquitectura basada en clases reutilizables, separación de responsabilidades y código mantenible.

5. **Git Workflow**: Uso profesional de Git con commits semánticos y gestión de versiones.

### Desafíos Superados

1. **Overlay Clickeable**: Solución al problema de overlay bloqueando botones mediante `pointer-events: none` selectivo.

2. **Contraste WCAG AA**: Ajuste de colores dorados para cumplir con ratio 4.8:1 en fondos claros, creando variable `--gold-accessible`.

3. **Traducción de Modales Dinámicos**: Implementación de observadores para traducir contenido generado dinámicamente.

4. **Grid Responsive**: Alineación perfecta de productos con diferentes alturas usando `grid-auto-rows: 1fr`.

5. **Performance**: Optimización de búsqueda y filtros mediante debouncing para evitar re-renders excesivos.

---

## 🔮 Mejoras Futuras Planificadas

- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración para gestión de productos
- [ ] Integración con pasarela de pagos (Mercado Pago)
- [ ] Sistema de reservas online para eventos
- [ ] Blog con CMS headless
- [ ] Modo oscuro manual (toggle)
- [ ] PWA (Progressive Web App) con service workers
- [ ] Optimización SEO avanzada con sitemap.xml

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de la materia **Desarrollo y Diseño Web** de la Universidad Argentina de la Empresa (UADE).

---

## 👨‍💻 Autor

Desarrollado por Eugenio Ojeda - Estudiante de Ingeniería en Informática, UADE.

**Contacto**: euge-90@github.com

---

**Belle Époque** · Pastelería Francesa Artesanal ✨🥐
