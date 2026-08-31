/* =========================================================
   AMAN PROPERTIES
   COMPLETE SCRIPT
========================================================= */


/* =========================================================
   CINEMATIC PRELOADER
========================================================= */

(function () {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;


    /*
       The preloader is completely independent
       from images and external resources.
    */

    setTimeout(function () {

        preloader.classList.add(
            "aman-loaded"
        );

    }, 2200);


    /*
       Completely remove it after the
       fade-out animation.
    */

    setTimeout(function () {

        preloader.style.display = "none";

    }, 3300);

})();



/* =========================================================
   WAIT FOR DOM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           NAVIGATION
        ================================================= */

        const navbar =
            document.querySelector(".navbar");


        function updateNavbar() {

            if (!navbar) return;


            if (window.scrollY > 60) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateNavbar,
            {
                passive: true
            }
        );


        updateNavbar();



        /* =================================================
           MOBILE MENU
        ================================================= */

        const menuButton =
            document.querySelector(
                ".menu-toggle"
            );

        const mobileMenu =
            document.querySelector(
                ".mobile-menu"
            );


        if (
            menuButton &&
            mobileMenu
        ) {

            menuButton.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.toggle(
                        "active"
                    );

                    document.body.classList.toggle(
                        "menu-open"
                    );

                }
            );


            mobileMenu
                .querySelectorAll("a")
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            mobileMenu.classList.remove(
                                "active"
                            );

                            document.body.classList.remove(
                                "menu-open"
                            );

                        }
                    );

                });

        }



        /* =================================================
           SMOOTH SCROLL
        ================================================= */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
                        ) return;


                        const target =
                            document.querySelector(
                                id
                            );


                        if (!target) return;


                        event.preventDefault();


                        const offset =
                            navbar
                                ? navbar.offsetHeight
                                : 0;


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



        /* =================================================
           SCROLL REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) return;


                            const delay =
                                entry.target.dataset.delay ||
                                0;


                            setTimeout(
                                function () {

                                    entry.target.classList.add(
                                        "active"
                                    );

                                },
                                Number(delay)
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: .12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );



        /* =================================================
           STAGGERED CARDS
        ================================================= */

        const groups = [

            ".project-card",
            ".team-card",
            ".experience-item",
            ".stat"

        ];


        groups.forEach(
            function (selector) {

                document
                    .querySelectorAll(
                        selector
                    )
                    .forEach(
                        function (item, index) {

                            item.dataset.delay =
                                Math.min(
                                    index * 100,
                                    500
                                );

                        }
                    );

            }
        );



        /* =================================================
           ANIMATED COUNTERS
        ================================================= */

        const counters =
            document.querySelectorAll(
                "[data-count]"
            );


        const counterObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) return;


                            const element =
                                entry.target;


                            const target =
                                Number(
                                    element.dataset.count
                                );


                            const duration =
                                1800;


                            const start =
                                performance.now();


                            function count(
                                currentTime
                            ) {

                                const progress =
                                    Math.min(
                                        (
                                            currentTime -
                                            start
                                        ) /
                                        duration,
                                        1
                                    );


                                const eased =
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        4
                                    );


                                element.textContent =
                                    Math.floor(
                                        target *
                                        eased
                                    ).toLocaleString();


                                if (
                                    progress < 1
                                ) {

                                    requestAnimationFrame(
                                        count
                                    );

                                } else {

                                    element.textContent =
                                        target.toLocaleString();

                                }

                            }


                            requestAnimationFrame(
                                count
                            );


                            counterObserver.unobserve(
                                element
                            );

                        }
                    );

                },

                {
                    threshold: .6
                }

            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );



        /* =================================================
           HERO PARALLAX
        ================================================= */

        const hero =
            document.querySelector(
                ".hero"
            );


        const heroBackground =
            document.querySelector(
                ".hero-background"
            );


        const canHover =
            window.matchMedia(
                "(hover: hover)"
            ).matches;


        if (
            hero &&
            heroBackground &&
            canHover
        ) {

            hero.addEventListener(
                "mousemove",
                function (event) {

                    const x =
                        (
                            event.clientX /
                            window.innerWidth -
                            .5
                        ) * 2;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight -
                            .5
                        ) * 2;


                    heroBackground.style.transform =
                        `
                        scale(1.025)
                        translate3d(
                            ${x * -6}px,
                            ${y * -4}px,
                            0
                        )
                        `;

                }
            );


            hero.addEventListener(
                "mouseleave",
                function () {

                    heroBackground.style.transform =
                        "scale(1.02)";

                }
            );

        }



        /* =================================================
           PROJECT CARD MOVEMENT
        ================================================= */

        if (canHover) {

            document
                .querySelectorAll(
                    ".project-card"
                )
                .forEach(
                    function (card) {

                        const image =
                            card.querySelector(
                                ".project-image"
                            );


                        if (!image) return;


                        card.addEventListener(
                            "mousemove",
                            function (event) {

                                const rect =
                                    card.getBoundingClientRect();


                                const x =
                                    (
                                        event.clientX -
                                        rect.left
                                    ) /
                                    rect.width -
                                    .5;


                                const y =
                                    (
                                        event.clientY -
                                        rect.top
                                    ) /
                                    rect.height -
                                    .5;


                                image.style.transform =
                                    `
                                    perspective(1000px)
                                    rotateX(${y * -2}deg)
                                    rotateY(${x * 2}deg)
                                    scale(1.03)
                                    `;

                            }
                        );


                        card.addEventListener(
                            "mouseleave",
                            function () {

                                image.style.transform =
                                    `
                                    perspective(1000px)
                                    rotateX(0)
                                    rotateY(0)
                                    scale(1)
                                    `;

                            }
                        );

                    }
                );

        }



        /* =================================================
           BUTTON MAGNETIC EFFECT
        ================================================= */

        if (canHover) {

            document
                .querySelectorAll(
                    ".button"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "mousemove",
                            function (event) {

                                const rect =
                                    button.getBoundingClientRect();


                                const x =
                                    event.clientX -
                                    rect.left -
                                    rect.width / 2;


                                const y =
                                    event.clientY -
                                    rect.top -
                                    rect.height / 2;


                                button.style.transform =
                                    `
                                    translate(
                                        ${x * .05}px,
                                        ${y * .05}px
                                    )
                                    `;

                            }
                        );


                        button.addEventListener(
                            "mouseleave",
                            function () {

                                button.style.transform =
                                    "translate(0,0)";

                            }
                        );

                    }
                );

        }



        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        function updateActiveNav() {

            let current = "";


            sections.forEach(
                function (section) {

                    if (
                        window.scrollY >=
                        section.offsetTop - 200
                    ) {

                        current =
                            section.id;

                    }

                }
            );


            navLinks.forEach(
                function (link) {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateActiveNav,
            {
                passive: true
            }
        );


        updateActiveNav();



        /* =================================================
           SCROLL PROGRESS
        ================================================= */

        const progress =
            document.createElement(
                "div"
            );


        progress.className =
            "scroll-progress";


        document.body.appendChild(
            progress
        );


        function updateProgress() {

            const scrollTop =
                window.scrollY;


            const total =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            if (total <= 0) return;


            progress.style.width =
                (
                    scrollTop /
                    total *
                    100
                ) + "%";

        }


        window.addEventListener(
            "scroll",
            updateProgress,
            {
                passive: true
            }
        );


        updateProgress();



        /* =================================================
           IMAGE LOADING
        ================================================= */

        document
            .querySelectorAll("img")
            .forEach(
                function (image) {

                    if (
                        image.complete
                    ) {

                        image.classList.add(
                            "loaded"
                        );

                    } else {

                        image.addEventListener(
                            "load",
                            function () {

                                image.classList.add(
                                    "loaded"
                                );

                            },
                            {
                                once: true
                            }
                        );

                    }

                }
            );



        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    if (mobileMenu) {

                        mobileMenu.classList.remove(
                            "active"
                        );

                    }

                    document.body.classList.remove(
                        "menu-open"
                    );

                }

            }
        );



        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 1000 &&
                    mobileMenu
                ) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }

            }
        );


        /* =================================================
           BRAND CONSOLE
        ================================================= */

        console.log(
            "%c AMAN PROPERTIES ",
            "background:#11100e;color:#c5a66a;padding:10px 16px;font-size:14px;font-weight:bold;"
        );

        console.log(
            "Premium real estate experience loaded."
        );


    }
);
