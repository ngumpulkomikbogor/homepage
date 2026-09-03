const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");

burger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

/* =========================
   INTERSECTION OBSERVER
========================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }

    });

}, {
    threshold: 0.2
});

/* ELEMENT */
document.querySelectorAll(".block, .hero-text")
.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});

/* HERO IMAGE */
observer.observe(document.querySelector(".hero-img-wrap"));

/* CAROUSEL ANIMATION */
document.querySelectorAll(".carousel .card").forEach((card, index) => {

    card.classList.add("reveal");
    card.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(card);

});

/* =========================
   CAROUSEL FUNCTION
========================= */

window.addEventListener("load", () => {

    document.querySelectorAll(".carousel").forEach(carousel => {

        const track = carousel.querySelector(".carousel-track");
        const prev = carousel.querySelector(".prev");
        const next = carousel.querySelector(".next");

        function getScrollAmount() {
            const card = carousel.querySelector(".card");
            const gap = 16;
            return card.offsetWidth + gap;
        }

        next.addEventListener("click", () => {
            track.scrollBy({
                left: getScrollAmount() * 2,
                behavior: "smooth"
            });
        });

        prev.addEventListener("click", () => {
            track.scrollBy({
                left: -(getScrollAmount() * 2),
                behavior: "smooth"
            });
        });

    });

});

/* =========================
   LANGUAGE SWITCH (FIX)
========================= */

function setLanguage(lang) {

    const elements = document.querySelectorAll("[data-id]");

    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerHTML = text;
    });

    localStorage.setItem("language", lang);
}

/* LOAD LANGUAGE */
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "id";
    setLanguage(savedLang);
});