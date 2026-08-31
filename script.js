/* =========================================================
   AMAN PROPERTIES — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1000);

    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    const updateNavbar = () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");

    if (cursor && follower) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;


        window.addEventListener("mousemove", e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        });


        const animateCursor = () => {

            followerX +=
                (mouseX - followerX) * .12;

            followerY +=
                (mouseY - followerY) * .12;

            follower.style.left =
                `${followerX}px`;

            follower.style.top =
                `${followerY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };

        animateCursor();


        document
            .querySelectorAll("a, button")
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        follower.style.width =
                            "50px";

                        follower.style.height =
                            "50px";

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        follower.style.width =
                            "32px";

                        follower.style.height =
                            "32px";

                    }
                );

            });

    }


    /* =====================================================
       PROJECT SLIDER
    ===================================================== */

    const slider =
        document.getElementById(
            "projectsSlider"
        );

    const next =
        document.getElementById(
            "projectNext"
        );

    const prev =
        document.getElementById(
            "projectPrev"
        );


    if (slider) {

        next.addEventListener("click", () => {

            slider.scrollBy({

                left:
                    slider.clientWidth * .72,

                behavior: "smooth"

            });

        });


        prev.addEventListener("click", () => {

            slider.scrollBy({

                left:
                    -slider.clientWidth * .72,

                behavior: "smooth"

            });

        });


        /* Mouse wheel → horizontal project movement */

        slider.addEventListener(
            "wheel",
            e => {

                if (
                    Math.abs(e.deltaY) >
                    Math.abs(e.deltaX)
                ) {

                    e.preventDefault();

                    slider.scrollLeft +=
                        e.deltaY;

                }

            },
            { passive: false }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-up"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       SECTION FADE / SLIDE EFFECT
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section"
        );


    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform =
            "translateY(25px)";

        section.style.transition =
            "opacity 1s ease, transform 1s ease";

    });


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        sectionObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .05
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       PARALLAX IMAGE
    ===================================================== */

    const parallax =
        document.querySelector(
            ".image-break-bg"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!parallax) return;

            const rect =
                parallax.parentElement
                    .getBoundingClientRect();

            const windowHeight =
                window.innerHeight;

            if (
                rect.top < windowHeight &&
                rect.bottom > 0
            ) {

                const progress =
                    (windowHeight - rect.top) /
                    (windowHeight + rect.height);

                const movement =
                    (progress - .5) * 80;

                parallax.style.transform =
                    `translateY(${movement}px)`;

            }

        },
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );

    const trackedSections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                        });


                        const active =
                            document.querySelector(
                                `.desktop-nav a[href="#${entry.target.id}"]`
                            );


                        if (active) {

                            active.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },
            {
                threshold: .35
            }
        );


    trackedSections.forEach(section => {

        navObserver.observe(section);

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    document
        .querySelectorAll(".button, .circle-link")
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                e => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * .08}px, ${y * .08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0,0)";

                }
            );

        });


    /* =====================================================
       HERO TEXT ENTRANCE
    ===================================================== */

    const heroElements = [
        document.querySelector(".hero-eyebrow"),
        document.querySelector(".hero h1"),
        document.querySelector(".hero-description"),
        document.querySelector(".hero-actions")
    ];


    heroElements.forEach(
        (element, index) => {

            if (!element) return;

            element.style.opacity = "0";

            element.style.transform =
                "translateY(40px)";

            element.style.transition =
                `opacity 1s ease ${index * .15}s,
                 transform 1s cubic-bezier(.2,.7,.2,1) ${index * .15}s`;

            setTimeout(() => {

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }, 1100);

        }
    );


    /* =====================================================
       IMAGE TILT
    ===================================================== */

    document
        .querySelectorAll(
            ".story-main-image, .diaspora-image"
        )
        .forEach(image => {

            image.addEventListener(
                "mousemove",
                e => {

                    if (
                        window.innerWidth < 900
                    ) return;

                    const rect =
                        image.getBoundingClientRect();

                    const x =
                        (e.clientX - rect.left) /
                        rect.width;

                    const y =
                        (e.clientY - rect.top) /
                        rect.height;


                    const rotateX =
                        (y - .5) * -3;

                    const rotateY =
                        (x - .5) * 3;


                    image.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            image.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "perspective(900px) rotateX(0) rotateY(0)";

                }
            );

        });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(e) {

                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );

                    if (!target) return;

                    e.preventDefault();

                    const offset =
                        75;

                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;

                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%cAMAN PROPERTIES",
        "font-size:25px;font-weight:bold;"
    );

    console.log(
        "Premium real estate experience loaded."
    );

});
