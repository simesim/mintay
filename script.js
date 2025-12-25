// О НАС + баннер
const swiper = new Swiper(".about-swiper", {
  slidesPerView: 1,
  speed: 450,
  loop: true, // было false

  navigation: {
    prevEl: ".hero__arrow--prev",
    nextEl: ".hero__arrow--next",
  },

  pagination: {
    el: ".about-pagination",
    clickable: true,
  },
});

// ЦИФРЫ (слайдер)
const mainfishSwiper = new Swiper(".mainfish-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 60,
  speed: 450,
  loop: true,                 // было false
  loopAdditionalSlides: 3,    // чтобы карусель работала гладко при 3 карточках

  navigation: {
    prevEl: ".mainfish__nav-btn--prev",
    nextEl: ".mainfish__nav-btn--next",
  },

  pagination: {
    el: ".mainfish-pagination",
    clickable: true,
  },
});

// ВЫСШАЯ ПРОБА (слайдер)
const delicacySwiper = new Swiper(".delicacy-swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  speed: 450,
  loop: true, // было false

  navigation: {
    prevEl: ".delicacy__nav--prev",
    nextEl: ".delicacy__nav--next",
  },

  pagination: {
    el: ".delicacy-pagination",
    clickable: true,
  },
});

// ПРОДУКЦИЯ (слайдер)
const productsSwiper = new Swiper(".products-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  centeredSlides: true,
  spaceBetween: 80,
  speed: 450,
  loop: true,                 // было false
  loopAdditionalSlides: 3,    // чтобы не дёргалось при 3 вью

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
    const header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
        if (window.scrollY > 1) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
})();



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
