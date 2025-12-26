const heroBanner = document.getElementById("heroBanner");
const heroTitleText = document.querySelector(".js-hero-slide-title");

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
    on: {
        init(sw) {
            applyHeroFromSlide(sw);
        },
        slideChange(sw) {
            applyHeroFromSlide(sw);
        },
    },
});

function applyHeroFromSlide(sw) {
    const slide = sw.slides[sw.activeIndex];
    if (!slide) return;

    const img = slide.dataset.image;
    const title = slide.dataset.title;

    if (heroBanner && img) {
        heroBanner.style.backgroundImage = `url("${img}")`;
    }
    if (heroTitleText && title) {
        heroTitleText.textContent = title;
    }
}


// ЦИФРЫ
const mainfishSwiper = new Swiper(".mainfish-swiper", {
    slidesPerView: 3,
    spaceBetween: 60,
    speed: 450,
    loop: true,
    navigation: { prevEl: ".mainfish__nav-btn--prev", nextEl: ".mainfish__nav-btn--next" },
    pagination: { el: ".mainfish-pagination", clickable: true },

    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        576: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 60 },
    },
});

// ВЫСШАЯ ПРОБА
const delicacySwiper = new Swiper(".delicacy-swiper", {
    slidesPerView: 1,
    speed: 450,
    loop: true,
    navigation: { prevEl: ".delicacy__nav--prev", nextEl: ".delicacy__nav--next" },
    pagination: { el: ".delicacy-pagination", clickable: true },
});

// ПРОДУКЦИЯ
const productsSwiper = new Swiper(".products-swiper", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 80,
    speed: 450,
    loop: true,
    navigation: { prevEl: ".products__nav--prev", nextEl: ".products__nav--next" },
    pagination: { el: ".products-pagination", clickable: true },

    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20, centeredSlides: true },
        576: { slidesPerView: 1, spaceBetween: 30, centeredSlides: true },
        992: { slidesPerView: 3, spaceBetween: 80, centeredSlides: true },
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
