# Belle Époque — Pastelería Francesa Artesanal (Entrega Final)

Demo en vivo: https://euge-90.github.io/belle-epoque-pasteleria/

## Descripción

Sitio web estático para Belle Époque, una pastelería francesa artesanal ubicada en una galería del microcentro. La web comunica la identidad de marca, presenta productos, muestra referencias de clientes (“Nos Eligen”) y facilita la ubicación y horarios, todo con un enfoque accesible, rápido y sin JavaScript.

## Características clave

- 100% HTML + CSS (sin JavaScript): menú móvil resuelto con checkbox + label (el input está oculto visualmente).
- Responsive completo (mobile-first) con Flexbox y CSS Grid.
- Modo oscuro automático con `prefers-color-scheme`, contrastes reforzados en:
  - enlaces del menú (navbar),
  - descripciones/títulos de productos (figcaption),
  - tarjetas de contacto y acciones del mapa.
- Tipografía Avenir auto-hospedada (con fallbacks seguros) y variables CSS para paleta/temas.
- Sección “Nosotros” con historia, cita destacada y foto del local.
- Sección “Nuestro Local” con 2 fotos del interior en grilla responsive.
- Galería “Ver todos nuestros productos” unificada en la home, con grilla equilibrada (última fila no estira tarjetas en exceso).
- Sección “Nos Eligen” con logos provistos (Mercado Libre, Santander, FarmaPlus, L’Occitane, Lucullus, CCI France) en un contenedor sectorizado.
- Mapa de ubicación (Google Maps iframe) con fallback estático (OpenStreetMap) y bloque <noscript>.
- Footer renovado: gradiente crema/beige en claro y neutral en oscuro, franja dorada superior, marca “Belle Époque” con subrayado dorado de ancho completo y redes sociales en botones dorados.
- Redes sociales: Facebook, Instagram, TripAdvisor (via Simple Icons), TikTok, X (Twitter), Threads.

## Secciones del sitio (index.html)

- Inicio (Hero): imagen del local de fondo con superposición, título y CTA a productos.
- Nosotros: historia breve, cita con detalles dorados, y foto del frente del local.
- Nuestro Local: dos imágenes del interior en grilla responsive.
- Productos: galería de productos en tarjetas simples con imagen + título.
- Nos Eligen: grilla de marcas que confían en Belle Époque dentro de un contenedor con fondo sectorizado.
- Contacto: tarjetas de Ubicación (con mapa embebido + botón “Ver en Google Maps” dentro de la tarjeta) y Horarios.
- Footer: bloque de marca + redes + datos.

## Tecnologías

- HTML5 semántico.
- CSS3 con variables, Flexbox, Grid y media queries.
- Preferencias de color del sistema (`prefers-color-scheme`) para el modo oscuro.
- Iconografía: Font Awesome (brands) + Simple Icons (TripAdvisor SVG).

## Estructura del proyecto

```
belle-epoque-pasteleria/
├─ index.html
├─ productos.html               # (Referencia histórica; la galería final está en index.html)
├─ documentacion-proyecto.html
├─ INSTRUCCIONES-GITHUB.md
├─ css/
│  └─ styles.css
├─ images/
│  ├─ logo.png
│  ├─ local.png
│  ├─ interior.png
│  ├─ interiorr.png
│  ├─ eclairs.png
│  ├─ cookies.png
│  ├─ profiterol-de-banana.png
│  ├─ croissants.png
│  ├─ croissants_2.png
│  ├─ medialuna.png
│  ├─ danesa.png
│  ├─ hojaldre.png
│  ├─ manzanita.png
│  ├─ desayuno.png
│  ├─ torta.png
│  ├─ macarons.png
│  ├─ mercado_libre.png
│  ├─ santander.png
│  ├─ farmaplus.png
│  ├─ loccitane.png
│  ├─ LUCULLUS.png
│  └─ CCI_FRANCE.png
└─ README.md
```

Nota: Las fuentes Avenir se referencian desde `css/styles.css` en `fonts/avenir/`. Si no estuvieran en el repo público, el sitio usa fallbacks seguros.

## Paleta y tipografía

- Paleta base: dorado (`#d4af37`), crema/beige, marrón oscuro de texto; en oscuro, gradientes neutros con dorado como acento.
- Tipografía: Avenir (300–900, normal e italic) auto-hospedada con fallbacks: `Avenir, Avenir Next, Segoe UI, Helvetica Neue, Arial, sans-serif`.

## Accesibilidad y rendimiento

- Contraste reforzado en modo oscuro para navegación, productos y contacto.
- Imágenes con `loading="lazy"` cuando aplica.
- Menú móvil sin JS y checkbox oculto correctamente (sólo label visible).
- Estructura semántica y navegación por teclado.

## Publicación (GitHub Pages)

- Sitio en vivo: https://euge-90.github.io/belle-epoque-pasteleria/
- Actualización rápida:

```powershell
git add .
git commit -m "docs: actualizar README (entrega final)"
git push
```

Para más detalles, ver `INSTRUCCIONES-GITHUB.md`.

## Cambios destacados (2025-09-22)

- Eliminación total de JavaScript y adopción de patrones CSS puros (menú móvil con checkbox + label).
- Restauración de la sección “Nosotros” con narrativa, cita y foto del local.
- Mapa embebido (Google Maps) con imagen estática de fallback y botón visible en mobile dentro de la tarjeta.
- Integración de tipografía Avenir auto-hospedada y uso de variables CSS.
- Galería de productos unificada en la home; se quitó la tarjeta “Selección de productos” y se equilibró la grilla.
- Sección “Nos Eligen” agregada, movida sobre “Contacto” y con fondo sectorizado; logos reales provistos por el cliente.
- Footer renovado: gradiente claro, franja dorada superior, bloque de marca “Belle Époque” con subrayado dorado de ancho completo, íconos en botones dorados y mayor contraste.
- Redes sociales ampliadas: Facebook, Instagram, TripAdvisor (SVG vía Simple Icons), TikTok, X, Threads; íconos +25% de tamaño.
- Modo oscuro: ajustes de contraste en navbar, descripciones/títulos de productos y tarjetas de contacto/mapa.

## Créditos

- Iconos de marcas: Font Awesome y Simple Icons (TripAdvisor).
- Logos de “Nos Eligen”: provistos por el cliente.
- Imágenes del local y productos: provistas para el proyecto.

---

Entrega final — Belle Époque · Pastelería Francesa Artesanal ✨🥐