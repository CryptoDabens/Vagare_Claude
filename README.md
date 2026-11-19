# Vagare Travels — Landing Page

<p align="center">
  <img src="img/logos/Logo%20Vagare%20travels%20Horizontal.png" alt="Vagare Travels" width="320">
</p>

<p align="center">
  <em>Descubre el mundo · Viaja libre · Crea tu historia</em>
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000">
  <img alt="Sin dependencias" src="https://img.shields.io/badge/dependencias-0-success">
  <img alt="Licencia" src="https://img.shields.io/badge/licencia-MIT-blue">
</p>

Landing page para **Vagare Travels by Gaby Guerra**, agencia de viajes con sede en Mazatlán, Sinaloa. Es una página de una sola vista (one-page) orientada a conversión: presenta los servicios, muestra paquetes destacados en un carrusel y lleva al visitante a solicitar una cotización por WhatsApp.

Proyecto final del módulo *Front-End Fundamentals* (TecMilenio · FSWD).

---

## Tabla de contenido

- [Demo](#demo)
- [Características](#características)
- [Estructura de la página](#estructura-de-la-página)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Instalación y uso](#instalación-y-uso)
- [Personalización](#personalización)
  - [Colores, fuentes y tamaños](#colores-fuentes-y-tamaños)
  - [Logos e imágenes](#logos-e-imágenes)
  - [Número de WhatsApp y contacto](#número-de-whatsapp-y-contacto)
  - [Paquetes del carrusel](#paquetes-del-carrusel)
  - [Servicios](#servicios)
- [Identidad de marca](#identidad-de-marca)
- [Despliegue](#despliegue)
- [Roadmap](#roadmap)
- [Créditos](#créditos)
- [Licencia](#licencia)

---

## Demo

| Escritorio | Móvil |
|---|---|
| _Agrega aquí una captura o GIF_ | _Agrega aquí una captura o GIF_ |

🔗 **Sitio en producción:** _pendiente (Netlify)_

---

## Características

- **Diseño responsive** (móvil, tablet y escritorio) con menú hamburguesa y dropdown adaptado a touch.
- **Sin frameworks ni dependencias**: HTML5 semántico, CSS3 y JavaScript vanilla.
- **Sistema de diseño por variables CSS**: colores, tipografías, tamaños y alturas de logo se editan en un solo bloque `:root`.
- **Logos intercambiables** sustituyendo el archivo de imagen, sin tocar el código.
- **Carrusel de paquetes** propio: 3 / 2 / 1 tarjetas según el ancho, flechas, indicadores, autoplay y gesto de deslizar.
- **Formulario de cotización → WhatsApp**: valida los campos y abre un chat con el mensaje ya redactado.
- **Botón flotante de WhatsApp** y enlaces `wa.me` / `mailto`.
- **Animaciones al hacer scroll** (IntersectionObserver) con respeto a `prefers-reduced-motion`.
- **Accesibilidad básica**: etiquetas `aria`, navegación por teclado, `alt` en imágenes, contraste de la paleta de marca.
- **SEO básico**: `title`, `meta description`, favicon, estructura de encabezados.

---

## Estructura de la página

Orden de secciones en `index-v2.html`:

| # | Sección | ID | Contenido |
|---|---|---|---|
| 1 | **Header / Navbar** | — | Logo horizontal, menú *Inicio · Servicios (dropdown) · Paquetes · Nosotros · Contacto* y botón **Solicita una cotización**. Barra fija (`sticky`). |
| 2 | **Hero** | `#inicio` | Imagen a pantalla completa con capa azul marino, nombre de la marca, eslogan y dos CTA (*Cotiza tu viaje* / *Ver paquetes*). |
| 3 | **Franja de confianza** | — | Cuatro datos rápidos (viajes planeados, destinos, acompañamiento 24/7, asesoría sin costo). |
| 4 | **Servicios** | `#servicios` | Cuadrícula de 8 tarjetas: Paquetes por destino · Paquetes temáticos · Cruceros · Todo-Incluido · Viajes en grupo · Viajes románticos · Viajes a la medida · Vuelos y hoteles. |
| 5 | **Paquetes destacados** | `#paquetes` | Carrusel con tarjetas (imagen, etiqueta, duración, descripción, precio y botón *Cotizar* que pre-llena el formulario). |
| 6 | **Nosotros** | `#nosotros` | Presentación de la asesora, lista de diferenciadores y CTA. |
| 7 | **Testimonios** | `#testimonios` | Tres reseñas con calificación, sobre fondo azul marino. |
| 8 | **Cotización / Contacto** | `#cotizacion` `#contacto` | Datos de contacto, redes sociales y formulario que envía la solicitud por WhatsApp. |
| 9 | **Footer** | — | Logo cuadrado, descripción, enlaces a servicios y secciones, contacto y copyright. |
| — | **Botón flotante** | — | Acceso directo a WhatsApp visible en toda la página. |

Submenú de **Servicios** (dropdown): Paquetes por Destino · Paquetes temáticos · Cruceros · Todo-Incluido · Viajes en Grupo · Viajes Románticos · Viajes a la medida · Vuelos y hoteles.

---

## Estructura del proyecto

```
Vagare_Claude/
├── index-v2.html          # Página principal (estructura y contenido)
├── main-v2.css            # Estilos — sección 1 = variables de marca
├── main-v2.js             # Menú, dropdown, carrusel, formulario, animaciones
├── index-Copilot.html     # Prototipo anterior (referencia)
├── GUIA-v2.md             # Guía rápida de mantenimiento
├── README.md
└── img/
    ├── logos/             # Logotipos oficiales y hoja de especificaciones
    │   ├── Logo Vagare travels Horizontal.png   ← navbar
    │   ├── IMG Vagare Logo simple.jpeg          ← footer, favicon, Nosotros
    │   └── IMG Vagare Logo specs.jpeg           ← paleta y tipografías
    ├── hero/              # Imagen de fondo del hero
    ├── destinations/      # Fotos de destinos (carrusel)
    └── packages/          # Imágenes de paquetes (carrusel)
```

---

## Tecnologías

| Capa | Herramienta |
|---|---|
| Marcado | HTML5 semántico |
| Estilos | CSS3 (custom properties, Grid, Flexbox, `clamp()`, media queries) |
| Interactividad | JavaScript ES6+ (vanilla, sin librerías) |
| Tipografías | Google Fonts: Cinzel (sustituto de Trajan Pro), Playfair Display, Montserrat |
| Iconos | SVG inline |
| Hosting | Netlify (integración con GitHub) |

---

## Instalación y uso

No requiere instalación ni proceso de build.

```bash
# 1. Clona el repositorio
git clone https://github.com/CryptoDabens/Vagare_Claude.git
cd Vagare_Claude

# 2. Abre index-v2.html en el navegador
#    o sírvelo localmente (opcional):
npx serve .
# → http://localhost:3000/index-v2.html
```

> Las fuentes se cargan desde Google Fonts; sin conexión la página usa las fuentes de respaldo definidas en el CSS.

---

## Personalización

### Colores, fuentes y tamaños

Todo vive en el bloque `:root` al inicio de `main-v2.css`:

```css
:root {
  /* Paleta oficial */
  --color-navy:  #0D1B3D;
  --color-gold:  #C79D3B;
  --color-beige: #E8E1D6;
  --color-gray:  #6B7280;

  /* Roles: qué color usa cada elemento */
  --bg-page:        var(--color-beige-soft);
  --text-main:      var(--color-navy);
  --btn-primary-bg: var(--color-gold);
  --nav-bg:         var(--color-white);
  /* … */

  /* Tipografías y tamaños */
  --font-display: "Trajan Pro", "Cinzel", serif;
  --font-body:    "Montserrat", sans-serif;
  --fs-hero:      clamp(2.2rem, 5vw, 4.2rem);

  /* Logos */
  --logo-nav-height:    56px;
  --logo-footer-height: 120px;
}
```

Cambia un valor y toda la página se actualiza; el resto del CSS solo consume estas variables.

### Logos e imágenes

Sustituye el archivo **conservando el nombre**:

| Uso | Archivo |
|---|---|
| Navbar | `img/logos/Logo Vagare travels Horizontal.png` |
| Footer, favicon, sección Nosotros | `img/logos/IMG Vagare Logo simple.jpeg` |
| Fondo del hero | `img/hero/lets-go-travel.jpg` |

> Recomendación: exporta el logo horizontal como PNG con transparencia real para que no se note el fondo sobre la barra.

### Número de WhatsApp y contacto

- Formulario: `CONFIG.whatsapp` en `main-v2.js` (código de país + número, sin `+` ni espacios).
- Enlaces directos: busca `wa.me/` y `mailto:` en `index-v2.html` (contacto, footer y botón flotante).

### Formulario y Google Sheets

Al enviar el formulario, los datos se registran en la hoja **vagare_CRM → pestaña Leads** (cuenta vagaretravels) y después se abre WhatsApp. El código del lado de Google está en [`apps-script/Code.gs`](apps-script/Code.gs).

**Encabezados de la pestaña Leads (fila 1):** `fecha` (opcional, se llena sola), `nombre`, `whatsapp`, `correo`, `tipo_viaje`, `viajeros`, `destino`, `fechas_aprox`, `cuentanos_mas`. El orden no importa; el script acomoda por nombre.

**Publicar el script (una sola vez):**
1. En la hoja: *Extensiones → Apps Script*. Borra lo que haya y pega el contenido de `apps-script/Code.gs`. Guarda.
2. *Implementar → Nueva implementación →* tipo **Aplicación web**.
   - Ejecutar como: **Yo** · Quién tiene acceso: **Cualquier usuario**.
3. Autoriza los permisos. Si aparece "Google no ha verificado esta app": *Configuración avanzada → Ir a … (no seguro)*. Es normal, la app es tuya.
4. Copia la URL que termina en `/exec` y pégala en `CONFIG.sheetsUrl` de `main-v2.js`.

**Si modificas el script después:** *Implementar → Administrar implementaciones → ✏️ → Versión: Nueva versión*. Así la URL no cambia. (Una "Nueva implementación" genera otra URL.)

Con `sheetsUrl: ""` el registro se desactiva y el formulario sólo abre WhatsApp.

### Paquetes del carrusel

Duplica un bloque `<article class="package-card">…</article>` dentro de `.carousel__track` y edita imagen, textos, precio y el atributo `data-package` (pre-llena el campo *Destino* del formulario). El carrusel y los indicadores se recalculan solos.

### Servicios

Cada servicio es un `<article class="service-card">` en `#servicios`. El mismo nombre aparece en el dropdown del menú y en el footer; mantenlos sincronizados.

---

## Identidad de marca

Tomada de `img/logos/IMG Vagare Logo specs.jpeg`:

| Color | Hex | Uso |
|---|---|---|
| Azul marino | `#0D1B3D` | Texto principal, fondos oscuros, navbar |
| Dorado | `#C79D3B` | Acentos, botones primarios, detalles |
| Beige claro | `#E8E1D6` | Fondos de sección |
| Gris | `#6B7280` | Texto secundario |

| Tipografía | Uso | Respaldo web |
|---|---|---|
| Trajan Pro | Marca y títulos | Cinzel |
| Playfair Display Italic | Firma y frases de acento | Georgia |
| Montserrat Medium | Texto general | Segoe UI / Arial |

---

## Despliegue

El sitio se publica en **Netlify** conectado a este repositorio:

1. *New site from Git* → seleccionar `CryptoDabens/Vagare_Claude`.
2. Build command: *(vacío)* · Publish directory: `/`.
3. Cada `push` a `main` despliega automáticamente.

Si quieres que la URL raíz cargue la página, renombra `index-v2.html` a `index.html` (y actualiza los `<link>`/`<script>` si también renombras el CSS y el JS) o agrega un archivo `_redirects` con `/  /index-v2.html  200`.

---

## Roadmap

- [ ] Foto real de la asesora en la sección *Nosotros*
- [ ] Sustituir cifras, precios y testimonios de ejemplo por datos reales
- [ ] Enlaces reales a Instagram, Facebook y TikTok
- [ ] Páginas de *Aviso de privacidad* y *Términos y condiciones*
- [ ] Envío del formulario también por correo (Netlify Forms o Formspree)
- [ ] Optimizar imágenes (WebP / compresión) para mejorar el tiempo de carga
- [ ] Meta tags Open Graph para compartir en redes
- [ ] Google Analytics / Meta Pixel

---

## Créditos

- **Diseño y desarrollo:** David Híjar
- **Marca y contenido:** Gaby Guerra — Vagare Travels
- Tipografías vía [Google Fonts](https://fonts.google.com/)
- Iconos SVG propios

---

## Licencia

El código se distribuye bajo licencia [MIT](LICENSE). Los logotipos, nombre comercial e imágenes de Vagare Travels son propiedad de sus titulares y no están cubiertos por esta licencia.
