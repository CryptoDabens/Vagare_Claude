/* =====================================================================
   VAGARE TRAVELS — analytics.js
   ---------------------------------------------------------------------
   Banner de cookies + Google Analytics 4 + Meta Pixel.

   - Nada de analítica se carga hasta que el visitante pulsa "Aceptar".
   - Si los dos IDs están vacíos, el banner no aparece y no se carga nada.
   - Se incluye en TODAS las páginas (index, aviso de privacidad, términos).

   Eventos que se envían (sólo con consentimiento):
     · Formulario de cotización enviado → GA4 "generate_lead" · Pixel "Lead"
     · Clic en cualquier enlace a WhatsApp → GA4 "whatsapp_click" · Pixel "Contact"
     · Clic en correo (mailto:)          → GA4 "email_click"    · Pixel "Contact"
   Nunca se envían nombre, teléfono, correo ni mensajes del formulario.
   ===================================================================== */

/* ---------- 1. CONFIG: pega aquí tus IDs ---------- */
const ANALYTICS_CONFIG = {
  ga4Id:       "",   // Google Analytics 4 → "G-XXXXXXXXXX" (Administrar → Flujos de datos → Web)
  metaPixelId: "",   // Meta Pixel → sólo el número, ej. "123456789012345" (Administrador de eventos)

  storageKey:  "vagare_cookie_consent",   // dónde se guarda la decisión en el navegador
  privacyUrl:  "aviso-privacidad.html#cookies",
};


(function () {
  const C = ANALYTICS_CONFIG;
  const enabled = Boolean(C.ga4Id || C.metaPixelId);
  let loaded = false;

  /* ---------- 2. DECISIÓN GUARDADA ---------- */
  function getConsent() {
    try { return localStorage.getItem(C.storageKey); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(C.storageKey, value); } catch (e) { /* modo privado: sólo vale para esta visita */ }
  }

  /* ---------- 3. CARGA DE SCRIPTS (sólo con "granted") ---------- */
  function loadAnalytics() {
    if (loaded || !enabled) return;
    loaded = true;

    if (C.ga4Id) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.ga4Id);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", C.ga4Id);
    }

    if (C.metaPixelId) {
      /* Snippet oficial de Meta Pixel */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq("init", C.metaPixelId);
      window.fbq("track", "PageView");
    }
  }

  /* ---------- 4. EVENTOS (función pública) ----------
     Uso: vagareTrack("generate_lead", { tipo_viaje: "Cruceros" }, "Lead")
     - ga4Event:   nombre del evento en GA4
     - params:     datos NO personales (tipo de viaje, ubicación del botón…)
     - pixelEvent: evento estándar de Meta (Lead, Contact…) o null           */
  window.vagareTrack = function (ga4Event, params, pixelEvent) {
    if (!loaded) return;
    try {
      if (C.ga4Id && window.gtag) window.gtag("event", ga4Event, params || {});
      if (C.metaPixelId && window.fbq && pixelEvent) window.fbq("track", pixelEvent, params || {});
    } catch (e) { /* la analítica nunca debe romper la página */ }
  };

  // Clics en WhatsApp y correo, en cualquier parte de la página
  document.addEventListener("click", (e) => {
    const link = e.target.closest && e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    const where = link.closest("footer") ? "footer"
                : link.classList.contains("whatsapp-float") ? "boton_flotante"
                : link.closest("#contacto, #cotizacion") ? "contacto"
                : "pagina";
    if (href.includes("wa.me/")) window.vagareTrack("whatsapp_click", { ubicacion: where }, "Contact");
    else if (href.startsWith("mailto:")) window.vagareTrack("email_click", { ubicacion: where }, "Contact");
  });

  /* ---------- 5. BANNER ---------- */
  let banner = null;

  function buildBanner() {
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Preferencias de cookies");
    banner.innerHTML =
      '<p class="cookie-banner__text">Usamos cookies de Google Analytics y Meta para saber cómo se usa el sitio ' +
      'y medir nuestros anuncios. Sólo se activan si aceptas. ' +
      '<a href="' + C.privacyUrl + '">Más información</a></p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn--sm btn--outline-navy" data-consent="denied">Rechazar</button>' +
      '<button type="button" class="btn btn--sm btn--primary" data-consent="granted">Aceptar</button>' +
      "</div>";
    banner.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-consent]");
      if (!btn) return;
      const value = btn.dataset.consent;
      const previous = getConsent();
      setConsent(value);
      hideBanner();
      if (value === "granted") loadAnalytics();
      // Si retira un consentimiento previo, recargamos para descargar los scripts ya cargados
      else if (previous === "granted" && loaded) window.location.reload();
    });
    document.body.appendChild(banner);
  }

  function showBanner() {
    if (!enabled) return;
    if (!banner) buildBanner();
    banner.hidden = false;
    document.body.classList.add("has-cookie-banner");
  }
  function hideBanner() {
    if (banner) banner.hidden = true;
    document.body.classList.remove("has-cookie-banner");
  }

  // Enlaces "Preferencias de cookies" (footer, aviso de privacidad)
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (!trigger) return;
    e.preventDefault();
    if (enabled) showBanner();
    else alert("Por ahora este sitio no usa cookies de analítica.");
  });

  /* ---------- 6. ARRANQUE ---------- */
  function init() {
    const consent = getConsent();
    if (consent === "granted") loadAnalytics();
    else if (consent !== "denied") showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
