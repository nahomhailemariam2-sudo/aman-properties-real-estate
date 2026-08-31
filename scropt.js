/* =========================================
   AMAN PROPERTIES — JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
       ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================
       HEADER SCROLL EFFECT
       ===================================== */

    const header = document.querySelector(".header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    /* =====================================
       SCROLL REVEAL
       ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================
       ANIMATED STAT COUNTERS
       ===================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = Number(
                    counter.dataset.target || counter.textContent
                );

                let current = 0;

                const duration = 1600;
                const stepTime = 20;
                const increment = target / (duration / stepTime);

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        counter.textContent =
                            Math.floor(current).toLocaleString();

                        setTimeout(updateCounter, stepTime);

                    } else {

                        counter.textContent =
                            target.toLocaleString();
                    }
                };

                updateCounter();

                counterObserver.unobserve(counter);
            });

        },
        {
            threshold: 0.6
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================
       SMOOTH SCROLL
       ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /* =====================================
       PROPERTY IMAGE HOVER
       ===================================== */

    document.querySelectorAll(".property-card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.zIndex = "5";
        });

        card.addEventListener("mouseleave", () => {
            card.style.zIndex = "1";
        });

    });


    /* =====================================
       GALLERY LIGHTBOX
       ===================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const image = item.querySelector("img");

            if (!image) return;

            const overlay = document.createElement("div");

            overlay.className = "lightbox";

            overlay.innerHTML = `
                <button class="lightbox-close"
                        aria-label="Close gallery">
                    ×
                </button>

                <img src="${image.src}"
                     alt="${image.alt || "Property image"}">
            `;

            document.body.appendChild(overlay);

            document.body.style.overflow = "hidden";

            requestAnimationFrame(() => {
                overlay.classList.add("show");
            });

            const closeLightbox = () => {

                overlay.classList.remove("show");

                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = "";
                }, 300);
            };

            overlay
                .querySelector(".lightbox-close")
                .addEventListener("click", closeLightbox);

            overlay.addEventListener("click", event => {

                if (event.target === overlay) {
                    closeLightbox();
                }

            });

            document.addEventListener(
                "keydown",
                function escapeHandler(event) {

                    if (event.key === "Escape") {
                        closeLightbox();
                        document.removeEventListener(
                            "keydown",
                            escapeHandler
                        );
                    }

                }
            );

        });

    });


    /* =====================================
       CONTACT FORM
       ===================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const button =
                contactForm.querySelector("button");

            if (!button) return;

            const originalText = button.textContent;

            button.textContent = "MESSAGE SENT ✓";
            button.disabled = true;

            contactForm.reset();

            setTimeout(() => {

                button.textContent = originalText;
                button.disabled = false;

            }, 3000);

        });

    }


    /* =====================================
       PARALLAX HERO
       ===================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", () => {

            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {

                hero.style.backgroundPosition =
                    `center ${scrollPosition * 0.35}px`;

            }

        });

    }

});
