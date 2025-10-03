# Belle Époque — Pastelería Francesa Artesanal

**Demo en vivo:** https://euge-90.github.io/belle-epoque-pasteleria/

## Descripción

Sitio web estático para **Belle Époque**, una pastelería francesa artesanal ubicada en una galería del microcentro de Buenos Aires. El sitio comunica la identidad de marca, presenta productos, muestra clientes destacados ("Nos Eligen") y facilita la ubicación y horarios, todo con un enfoque accesible, responsive y sin JavaScript.

## Características principales

- **100% HTML + CSS** (sin JavaScript): menú móvil resuelto con checkbox + label (el input está oculto visualmente)
- **Responsive completo** (mobile-first) con Flexbox y CSS Grid
- **Modo oscuro automático** con `prefers-color-scheme`
- **Tipografía profesional**: Cinzel, Lora y Montserrat (Google Fonts) + Avenir auto-hospedada con fallbacks seguros
- **Variables CSS** para paleta de colores y consistencia visual
- **Hero con imagen de fondo**: foto del local con overlay
- **Sección "Nosotros"**: historia, cita destacada y foto del frente del local
- **Sección "Nuestro Local"**: 2 fotos del interior en grilla responsive
- **Galería de productos**: 12 productos con imágenes reales en tarjetas equilibradas
- **Sección "Nos Eligen"**: logos de empresas clientes (Mercado Libre, Santander, FarmaPlus, L'Occitane, Lucullus, CCI France)
- **Mapa de ubicación**: Google Maps iframe con fallback estático (OpenStreetMap) y bloque `<noscript>`
- **Footer renovado**: gradiente suave, franja dorada superior, marca "Belle Époque" con subrayado dorado de ancho completo
- **Redes sociales**: Facebook, Instagram, TripAdvisor, TikTok, X (Twitter), Threads con iconos en botones dorados

## Estructura del sitio

### Páginas

- **index.html**: Página principal con todas las secciones
- **productos.html**: Página dedicada con la galería completa de productos
- **documentacion-proyecto.html**: Documentación técnica del proyecto

### Secciones de index.html

1. **Inicio (Hero)**: Imagen del local de fondo con superposición, título y subtítulo
2. **Nosotros**: Historia breve, cita destacada con detalles dorados, y foto del frente del local
3. **Nuestro Local**: Dos imágenes del interior en grilla responsive
4. **Productos**: Preview de 12 productos con botón "Ver todos los productos"
5. **Nos Eligen**: Grilla de logos de empresas clientes
6. **Contacto**: Tarjetas de Ubicación (con mapa embebido + botón "Ver en Google Maps") y Horarios
7. **Footer**: Bloque de marca + redes sociales + datos de contacto

## Tecnologías

- HTML5 semántico
- CSS3 con variables, Flexbox, Grid y media queries
- Preferencias de color del sistema (`prefers-color-scheme`) para modo oscuro
- **Fuentes**:
  - Google Fonts: Cinzel, Lora, Montserrat
  - Avenir auto-hospedada (fonts/avenir/)
- **Iconografía**:
  - Font Awesome 6.5.0 (brands)
  - Simple Icons (TripAdvisor SVG)

## Estructura de archivos

```
belle-epoque-pasteleria/
├── index.html
├── productos.html
├── documentacion-proyecto.html
├── INSTRUCCIONES-GITHUB.md
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── fonts/
│   ├── avenir/
│   │   └── [archivos de fuente]
│   └── README.txt
├── images/
│   ├── logo.png
│   ├── local.png
│   ├── interior.png
│   ├── interiorr.png
│   ├── eclairs.png
│   ├── cookies.png
│   ├── profiterol-de-banana.png
│   ├── croissants.png
│   ├── croissants_2.png
│   ├── medialuna.png
│   ├── danesa.png
│   ├── hojaldre.png
│   ├── manzanita.png
│   ├── desayuno.png
│   ├── torta.png
│   ├── macarons.png
│   ├── mercado_libre.png
│   ├── santander.png
│   ├── farmaplus.png
│   ├── loccitane.png
│   ├── LUCULLUS.png
│   └── CCI_FRANCE.png
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

## Accesibilidad y rendimiento

- Contraste reforzado en modo oscuro para navegación, productos y contacto
- Imágenes con `loading="lazy"` para carga diferida
- Menú móvil sin JS usando checkbox oculto (solo label visible)
- Estructura semántica HTML5
- Navegación por teclado funcional
- Textos alternativos en todas las imágenes
- Etiquetas ARIA donde corresponde

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

### Menú móvil sin JavaScript

- Implementado con `<input type="checkbox">` oculto + `<label>` visible
- Navegación accesible por teclado
- Animaciones CSS para apertura/cierre suave

### Mapa interactivo con fallback

- Google Maps iframe como opción principal
- Imagen estática de OpenStreetMap como fallback
- Bloque `<noscript>` para usuarios sin JavaScript
- Botón "Ver en Google Maps" visible y accesible en mobile

### Modo oscuro

- Detección automática con `@media (prefers-color-scheme: dark)`
- Ajustes de contraste en:
  - Enlaces de navegación
  - Tarjetas de productos (figcaption)
  - Tarjetas de contacto
  - Elementos del mapa
- Gradientes neutros en footer con acento dorado

## Créditos

- **Iconos de marcas**: Font Awesome y Simple Icons
- **Logos de "Nos Eligen"**: Provistos por el cliente
- **Imágenes del local y productos**: Provistas para el proyecto
- **Fuentes**: Google Fonts (Cinzel, Lora, Montserrat) y Avenir auto-hospedada

---

**Belle Époque** · Pastelería Francesa Artesanal ✨🥐
