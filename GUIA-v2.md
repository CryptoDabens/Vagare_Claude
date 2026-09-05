# Vagare Travels — Landing page v2

Archivos nuevos (los originales `index.html` / `main.css` quedan intactos):

| Archivo | Qué es |
|---|---|
| `index-v2.html` | Estructura de la página (HTML semántico, sin Bootstrap) |
| `main-v2.css` | Estilos. **Sección 1 = variables de marca** |
| `main-v2.js` | Menú móvil, dropdown, carrusel, formulario → WhatsApp, animaciones |

## Cambiar colores, fuentes y tamaños
Abre `main-v2.css` y edita sólo el bloque `:root { ... }` al inicio:

- `--color-navy`, `--color-gold`, `--color-beige`, `--color-gray` → paleta oficial.
- `--bg-page`, `--text-main`, `--btn-primary-bg`, `--nav-bg`… → qué color usa cada elemento.
- `--font-display`, `--font-accent`, `--font-body` → tipografías.
- `--fs-hero`, `--fs-h2`, `--fs-body`… → tamaños de letra.
- `--logo-nav-height`, `--logo-footer-height` → tamaño de los logos.

## Cambiar logos e imágenes
Sustituye el archivo **conservando el mismo nombre**:

- Barra de navegación → `img/logos/Logo Vagare travels Horizontal.png`
- Footer, favicon y sección "Nosotros" → `img/logos/IMG Vagare Logo simple.jpeg`
- Fondo del hero → `img/hero/lets-go-travel.jpg`
- Paquetes → `img/packages/…` y `img/destinations/…` (rutas en cada `<article class="package-card">`)

## Cambiar número de WhatsApp
En `main-v2.js`, `CONFIG.whatsapp` (código de país + número, sin `+`). Los enlaces
`wa.me/...` del HTML (contacto, footer y botón flotante) también llevan el número.

## Agregar un paquete
Copia un bloque `<article class="package-card">…</article>` dentro de
`.carousel__track` y cambia imagen, textos, precio y `data-package`. El carrusel
y los puntos se recalculan solos.

## Servicios
La cuadrícula tiene 8 tarjetas (2 filas de 4 en escritorio). Para editar una, busca su `<article class="service-card">` en `index-v2.html`; el mismo nombre aparece en el dropdown de Servicios y en el footer.

## Contenido de ejemplo
Cifras de la franja de confianza, precios, testimonios y horario son ficticios:
reemplázalos con datos reales antes de publicar.
