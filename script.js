/* =========================================================
   AMAN PROPERTIES
   PREMIUM WEBSITE INTERACTIONS
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const preloader = document.getElementById("preloader");
  const navbar = document.querySelector(".navbar");
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  let pageLoaded = false;
  let minimumTimePassed = false;


  /* =======================================================
     CINEMATIC PRELOADER
  ======================================================= */

  function hidePreloader() {

    if (!preloader) return;

    preloader.classList.add("hide");

    document.body.classList.add("page-ready");

  }


  /*
     Give the luxury intro enough time to play.
  */

  setTimeout(() => {

    minimumTimePassed = true;

    if (pageLoaded) {
      hidePreloader();
    }

  }, 2200);


  /*
     When the complete page has loaded.
  */

  window.addEventListener("load", () => {

    pageLoaded = true;

    if (minimumTimePassed) {
      hidePreloader();
    }

  });


  /*
     Emergency fallback.

     Even if an external image gets stuck,
     the website will NEVER remain on the
     loading screen forever.
  */

  setTimeout(() => {

    hidePreloader();

  }, 5000);


  /* =======================================================
     NAVBAR
  ======================================================= */

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 70) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("active");

      document.body.classList.toggle(
        "menu-open"
      );

    });

  }


  /*
     Close mobile menu after selecting
     a navigation item.
  */

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }

      document.body.classList.remove(
        "menu-open"
      );

    });

  });


  /*
     ESC closes mobile menu.
  */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }

      document.body.classList.remove(
        "menu-open"
      );

    }

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          /*
             Small delay based on element position
             creates a cinematic sequence.
          */

          const delay =
            entry.target.dataset.delay || 0;


          setTimeout(() => {

            entry.target.classList.add(
              "active"
            );

          }, Number(delay));


          revealObserver.unobserve(
            entry.target
          );

        });

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -70px 0px"

      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =======================================================
     STAGGERED REVEALS
  ======================================================= */

  const revealGroups = [

    ".project-card",
    ".team-card",
    ".experience-item",
    ".stat"

  ];


  revealGroups.forEach(selector => {

    const items =
      document.querySelectorAll(selector);


    items.forEach((item, index) => {

      item.dataset.delay =
        Math.min(index * 90, 400);

    });

  });


  /* =======================================================
     ANIMATED STATISTICS
  ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );


  function animateCounter(element) {

    const target =
      Number(element.dataset.count);


    const duration = 1800;

    const startTime =
      performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /*
         Ease-out cubic.
         Starts quickly and gently settles.
      */

      const eased =
        1 -
        Math.pow(
          1 - progress,
          4
        );


      const current =
        Math.floor(
          target * eased
        );


      element.textContent =
        current.toLocaleString();


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        element.textContent =
          target.toLocaleString();

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  const counterObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            animateCounter(
              entry.target
            );

            counterObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: .65
      }

    );


  counters.forEach(counter => {

    counterObserver.observe(
      counter
    );

  });


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroBackground =
    document.querySelector(
      ".hero-background"
    );


  let ticking = false;


  function updateParallax() {

    if (!heroBackground) {
      ticking = false;
      return;
    }


    const scroll =
      window.scrollY;


    /*
       Only run the effect while the
       hero is visible.
    */

    if (
      scroll <
      window.innerHeight
    ) {

      heroBackground.style.transform =
        `scale(1.02)
         translate3d(0,
         ${scroll * 0.10}px,
         0)`;

    }


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {


      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            navbarHeight;


          window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

          });

        }
      );

    });


  /* =======================================================
     PROJECT CARD 3D MOVEMENT
  ======================================================= */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );


  /*
     Disable this effect on touch devices.
  */

  const supportsHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (supportsHover) {

    projectCards.forEach(card => {

      const image =
        card.querySelector(
          ".project-image"
        );


      if (!image) return;


      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateX =
            ((y / rect.height) - .5)
            * -2;


          const rotateY =
            ((x / rect.width) - .5)
            * 2;


          image.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.025)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          image.style.transform =
            `perspective(1000px)
             rotateX(0deg)
             rotateY(0deg)
             scale(1)`;

        }
      );

    });

  }


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".button"
    );


  if (supportsHover) {

    buttons.forEach(button => {

      button.addEventListener(
        "mousemove",
        event => {

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
            `translate(
              ${x * .06}px,
              ${y * .06}px
            )`;

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

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  function updateActiveNavigation() {

    let current = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;


      if (
        window.scrollY >=
        sectionTop
      ) {

        current =
          section.id;

      }

    });


    navLinks.forEach(link => {

      link.classList.remove(
        "active"
      );


      if (
        link.getAttribute(
          "href"
        ) === `#${current}`
      ) {

        link.classList.add(
          "active"
        );

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  /* =======================================================
     IMAGE LOAD EFFECT
  ======================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(image => {

    if (image.complete) {

      image.classList.add(
        "loaded"
      );

    } else {

      image.addEventListener(
        "load",
        () => {

          image.classList.add(
            "loaded"
          );

        },
        {
          once: true
        }
      );

    }

  });


  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        /*
           Don't let one broken image
           break the rest of the website.
        */

        image.classList.add(
          "image-error"
        );

      },
      {
        once: true
      }
    );

  });


  /* =======================================================
     HERO MOUSE MOVEMENT
  ======================================================= */

  const hero =
    document.querySelector(
      ".hero"
    );


  if (
    hero &&
    supportsHover
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const x =
          (event.clientX /
            window.innerWidth -
            .5) *
          2;


        const y =
          (event.clientY /
            window.innerHeight -
            .5) *
          2;


        if (heroBackground) {

          heroBackground.style.transform =
            `scale(1.025)
             translate3d(
               ${x * -7}px,
               ${y * -5}px,
               0
             )`;

        }

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        if (heroBackground) {

          heroBackground.style.transform =
            "scale(1.02)";

        }

      }
    );

  }


  /* =======================================================
     BUTTON RIPPLE
  ======================================================= */

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const ripple =
          document.createElement(
            "span"
          );


        ripple.className =
          "button-ripple";


        const rect =
          button.getBoundingClientRect();


        ripple.style.left =
          `${event.clientX - rect.left}px`;


        ripple.style.top =
          `${event.clientY - rect.top}px`;


        button.appendChild(
          ripple
        );


        setTimeout(() => {

          ripple.remove();

        }, 650);

      }
    );

  });


  /* =======================================================
     HOVER IMAGE PREVIEW FEEL
  ======================================================= */

  const featuredImage =
    document.querySelector(
      ".featured-image"
    );


  if (
    featuredImage &&
    supportsHover
  ) {

    featuredImage.addEventListener(
      "mousemove",
      event => {

        const rect =
          featuredImage.getBoundingClientRect();


        const x =
          (event.clientX -
            rect.left) /
          rect.width -
          .5;


        const y =
          (event.clientY -
            rect.top) /
          rect.height -
          .5;


        const image =
          featuredImage.querySelector(
            "img"
          );


        if (image) {

          image.style.transform =
            `scale(1.035)
             translate(
               ${x * -8}px,
               ${y * -8}px
             )`;

        }

      }
    );


    featuredImage.addEventListener(
      "mouseleave",
      () => {

        const image =
          featuredImage.querySelector(
            "img"
          );


        if (image) {

          image.style.transform =
            "scale(1)";

        }

      }
    );

  }


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const progressBar =
    document.createElement(
      "div"
    );


  progressBar.className =
    "scroll-progress";


  document.body.appendChild(
    progressBar
  );


  function updateScrollProgress() {

    const scrollTop =
      window.scrollY;


    const documentHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {
      return;
    }


    const progress =
      (scrollTop /
        documentHeight) *
      100;


    progressBar.style.width =
      `${progress}%`;

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
      passive: true
    }
  );


  updateScrollProgress();


  /* =======================================================
     INTERSECTION OBSERVER FOR LARGE SECTIONS
  ======================================================= */

  const imageSections =
    document.querySelectorAll(
      ".featured-image, .about-image, .map-card"
    );


  const imageObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "in-view"
            );

            imageObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: .2
      }

    );


  imageSections.forEach(section => {

    imageObserver.observe(
      section
    );

  });


  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        document.body.classList.add(
          "page-hidden"
        );

      } else {

        document.body.classList.remove(
          "page-hidden"
        );

      }

    }
  );


  /* =======================================================
     RESIZE SAFETY
  ======================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(() => {

          /*
             Close mobile menu when
             returning to desktop.
          */

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


          updateActiveNavigation();

        }, 150);

    }
  );


  /* =======================================================
     CONSOLE BRAND MESSAGE
  ======================================================= */

  console.log(
    "%c AMAN PROPERTIES ",
    "background:#10100f;color:#d1b477;padding:10px 16px;font-size:14px;font-weight:bold;"
  );

  console.log(
    "Premium real estate experience loaded."
  );


});8
