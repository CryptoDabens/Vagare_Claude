/* =====================================================================
   VAGARE TRAVELS — main-v2.js  (JavaScript puro, sin librerías)
   ---------------------------------------------------------------------
   1. CONFIG            → número de WhatsApp y textos
   2. Menú móvil        → botón hamburguesa
   3. Dropdown Servicios
   4. Carrusel de paquetes
   5. Formulario        → arma el mensaje y abre WhatsApp
   6. Animación al hacer scroll
   ===================================================================== */

/* ---------- 1. CONFIG: cambia aquí lo que necesites ---------- */
const CONFIG = {
  whatsapp: "526691239999",          // código de país + número, sin espacios ni "+"
  carouselAutoplayMs: 6000,          // 0 para desactivar el avance automático
};


document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 2. MENÚ MÓVIL ---------- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Cierra el menú al elegir un enlace (útil en móvil)
  nav.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      closeDropdown();
    });
  });


  /* ---------- 3. DROPDOWN DE SERVICIOS ---------- */
  const servicesToggle = document.getElementById("servicesToggle");
  const servicesMenu = document.getElementById("servicesMenu");

  function closeDropdown() {
    servicesMenu.classList.remove("is-open");
    servicesToggle.setAttribute("aria-expanded", "false");
  }

  servicesToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = servicesMenu.classList.toggle("is-open");
    servicesToggle.setAttribute("aria-expanded", String(open));
  });

  // En escritorio también se abre al pasar el mouse
  const dropdownItem = servicesToggle.closest(".nav__item--dropdown");
  dropdownItem.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      servicesMenu.classList.add("is-open");
      servicesToggle.setAttribute("aria-expanded", "true");
    }
  });
  dropdownItem.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) closeDropdown();
  });

  document.addEventListener("click", (e) => {
    if (!dropdownItem.contains(e.target)) closeDropdown();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });


  /* ---------- 4. CARRUSEL DE PAQUETES ---------- */
  const carousel = document.getElementById("packagesCarousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel__track");
    const cards = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel__btn--prev");
    const nextBtn = carousel.querySelector(".carousel__btn--next");
    const dotsBox = carousel.querySelector(".carousel__dots");

    let index = 0;          // tarjeta en la posición izquierda
    let perView = 3;        // tarjetas visibles (se recalcula por ancho)
    let timer = null;

    function getPerView() {
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 992) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, cards.length - perView);
    }

    function buildDots() {
      dotsBox.innerHTML = "";
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement("button");
        dot.className = "carousel__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir a la página ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsBox.appendChild(dot);
      }
    }

    function update() {
      // gap de 1.5rem definido en CSS: lo leemos para que el cálculo sea exacto
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const cardWidth = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

      dotsBox.querySelectorAll(".carousel__dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === index);
      });
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === maxIndex();
      prevBtn.style.opacity = prevBtn.disabled ? 0.4 : 1;
      nextBtn.style.opacity = nextBtn.disabled ? 0.4 : 1;
    }

    function goTo(i) {
      index = Math.min(Math.max(i, 0), maxIndex());
      update();
      restartAutoplay();
    }

    function next() { goTo(index >= maxIndex() ? 0 : index + 1); }
    function prev() { goTo(index - 1); }

    function restartAutoplay() {
      clearInterval(timer);
      if (CONFIG.carouselAutoplayMs > 0) {
        timer = setInterval(next, CONFIG.carouselAutoplayMs);
      }
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", restartAutoplay);

    // Deslizar con el dedo en móvil
    let startX = 0;
    track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    });

    // Recalcular al cambiar el tamaño de la ventana
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        perView = getPerView();
        index = Math.min(index, maxIndex());
        buildDots();
        update();
      }, 150);
    });

    perView = getPerView();
    buildDots();
    update();
    restartAutoplay();
  }


  /* ---------- 5. FORMULARIO → WHATSAPP ---------- */
  const form = document.getElementById("quoteForm");
  const success = document.getElementById("formSuccess");

  // Los botones "Cotizar" de cada paquete pre-llenan el destino
  document.querySelectorAll("[data-package]").forEach(btn => {
    btn.addEventListener("click", () => {
      form.destination.value = btn.dataset.package;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const f = form.elements;
    const lines = [
      `¡Hola Gaby! Quiero una cotización con Vagare Travels.`,
      ``,
      `*Nombre:* ${f.name.value}`,
      `*WhatsApp:* ${f.phone.value}`,
      f.email.value ? `*Correo:* ${f.email.value}` : null,
      `*Tipo de viaje:* ${f.service.value}`,
      `*Viajeros:* ${f.travelers.value}`,
      f.destination.value ? `*Destino:* ${f.destination.value}` : null,
      f.dates.value ? `*Fechas:* ${f.dates.value}` : null,
      f.message.value ? `` : null,
      f.message.value ? f.message.value : null,
    ].filter(l => l !== null);

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");

    success.classList.add("is-visible");
    form.reset();
    form.travelers.value = 2;
  });


  /* ---------- 6. ANIMACIÓN AL HACER SCROLL ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-visible"));
  }


  /* Año automático en el footer */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
