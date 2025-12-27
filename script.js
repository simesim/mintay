document.addEventListener("DOMContentLoaded", () => {
    // О НАС + баннер (фон меняется от слайда)

    const titleEl = document.querySelector(".js-hero-slide-title");
    const heroBanner = document.getElementById("heroBanner");

    // стартовая картинка баннера
    heroBanner.style.backgroundImage = 'url("./images/banner-bg.png")';

    const swiper = new Swiper(".about-swiper", {
        slidesPerView: 1,
        speed: 450,
        loop: true,

        navigation: {
            prevEl: ".hero__arrow--prev",
            nextEl: ".hero__arrow--next",
        },

        pagination: {
            el: ".about-pagination",
            clickable: true,
        },
    });

    function sync() {
        const slide = swiper.slides[swiper.activeIndex];
        const t = slide ? slide.getAttribute("data-title") : "";
        const img = slide ? slide.getAttribute("data-image") : "";

        if (titleEl) titleEl.textContent = t || "";
        if (heroBanner && img) heroBanner.style.backgroundImage = 'url("' + img + '")';
    }

    sync();
    swiper.on("slideChange", sync);
});

// ЦИФРЫ (слайдер)
const mainfishSwiper = new Swiper(".mainfish-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 60,
  speed: 450,
  loop: true,

  roundLengths: true,
  observer: true,
  observeParents: true,
  resizeObserver: true,

  navigation: {
    prevEl: ".mainfish__nav-btn--prev",
    nextEl: ".mainfish__nav-btn--next",
  },
  pagination: {
    el: ".mainfish-pagination",
    clickable: true,
  },

  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 16 },
    640: { slidesPerView: 2, spaceBetween: 24 },
    992: { slidesPerView: 3, spaceBetween: 60 },
  },
});

// ВЫСШАЯ ПРОБА (слайдер)
const delicacySwiper = new Swiper(".delicacy-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    speed: 450,
    loop: true,

    navigation: {
        prevEl: ".delicacy__nav--prev",
        nextEl: ".delicacy__nav--next",
    },

    pagination: {
        el: ".delicacy-pagination",
        clickable: true,
    },
});

(function () {
    const header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
        if (window.scrollY > 1) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
})();

// ПРОДУКЦИЯ (слайдер)
const productsSwiper = new Swiper(".products-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  centeredSlides: true,
  spaceBetween: 80,
  speed: 450,
  loop: true,

  navigation: {
    prevEl: ".products__nav--prev",
    nextEl: ".products__nav--next",
  },

  pagination: {
    el: ".products-pagination",
    clickable: true,
  },
});

(function () {
  const SPEED = 16;

  function startTyping(card) {
    const box = card.querySelector(".typewriter__text");
    if (!box) return;

    const textA = card.getAttribute("data-type") || "";
    const textB = card.getAttribute("data-ing") || "";
    const full = (textA + "\n\n" + textB).trim();

    stopTyping(card);

    box.textContent = "";
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      box.textContent = full.slice(0, i);
      if (i >= full.length) stopTyping(card);
    }, SPEED);

    card._twTimer = timer;
  }

  function stopTyping(card) {
    if (card._twTimer) {
      clearInterval(card._twTimer);
      card._twTimer = null;
    }
  }

  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("mouseenter", () => startTyping(card));
    card.addEventListener("mouseleave", () => {
      stopTyping(card);
      const box = card.querySelector(".typewriter__text");
      if (box) box.textContent = "";
    });
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const burger = document.getElementById("burger");
  const overlay = document.getElementById("navOverlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  const mobileProductsToggle = document.getElementById("mobileProductsToggle");
  const mobileProductsSub = document.getElementById("mobileProductsSub");

  if (!burger || !overlay || !mobileMenu) return;

  const openMenu = () => {
    body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");

    if (mobileProductsSub) mobileProductsSub.classList.remove("is-open");
    if (mobileProductsToggle) mobileProductsToggle.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    body.classList.contains("menu-open") ? closeMenu() : openMenu();
  };

  burger.addEventListener("click", toggleMenu);

  overlay.addEventListener("click", closeMenu);

  if (mobileClose) mobileClose.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  if (mobileProductsToggle && mobileProductsSub) {
    mobileProductsToggle.addEventListener("click", () => {
      const isOpen = mobileProductsSub.classList.toggle("is-open");
      mobileProductsToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
});