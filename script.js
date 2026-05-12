document.addEventListener("DOMContentLoaded", function () {
  // 1. INITIALIZE GSAP & SCROLLTRIGGER
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  gsap.defaults({
    ease: "power2.out",
    duration: 0.8,
  });

  // ─── KEY FIX ─────────────────────────────────────────────────────────────
  // Set all animatable elements visible by default via CSS so that if a
  // ScrollTrigger never fires (e.g. user jumps via nav link), nothing stays
  // hidden. GSAP "from" will override this during the animation; after it
  // completes the element is back to its natural visible state.
  // ─────────────────────────────────────────────────────────────────────────

  // 2. HERO SECTION ANIMATIONS
  function initHeroAnimations() {
    const resumeButton = document.querySelector("#resume");
    const profileImage = document.querySelector(".profile-image");
    const introElements = document.querySelectorAll(
      ".intro-text, .role-title, .role-description",
    );

    gsap.from(".hellobox", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "back.out(1.7)",
    });

    const heroLines = document.querySelectorAll(".hero-line");
    heroLines.forEach((line, index) => {
      const chars = line.querySelectorAll(".letters");
      gsap.from(chars, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.3 + index * 0.5,
        ease: "back.out(1.7)",
      });
      const redLetter = line.querySelector(".red-letter");
      if (redLetter) {
        gsap.from(redLetter, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: 0.9,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });

    gsap.from(resumeButton, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1.6,
      ease: "back.out(1.7)",
    });

    if (profileImage) {
      gsap.from(profileImage, {
        scale: 0.8,
        opacity: 0,
        rotation: -5,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
      });
      gsap.to(profileImage, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });
    }

    introElements.forEach((el, index) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.5 + index * 0.2,
        ease: "power2.out",
      });
    });
  }

  // 3. NAVIGATION ANIMATIONS
  function initNavAnimations() {
    const navbar = document.querySelector("#navbar");
    const navItems = document.querySelectorAll("#navbar > a");
    const logo = document.querySelector("#navbar > h3");

    gsap.from(navbar, { y: -100, opacity: 0, duration: 0.8, delay: 0.1 });
    gsap.from(navItems, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3,
      ease: "back.out(1.7)",
    });
    if (logo)
      gsap.from(logo, {
        scale: 0,
        rotation: 360,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });
  }

  // 4. SECTION REVEAL ANIMATIONS
  // ─── KEY FIX ─────────────────────────────────────────────────────────────
  // Use `once: true` so animations play once and never reverse.
  // Use `start: "top 95%"` so triggers fire earlier (before element is fully
  // in view), preventing the "late appearance" on mobile.
  // Remove `toggleActions` entirely — replaced by `once: true`.
  // ─────────────────────────────────────────────────────────────────────────
  function revealOnScroll(selector, extraVars = {}) {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: extraVars.staggerDelay ? i * extraVars.staggerDelay : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%", // fires earlier → no late-pop on mobile
            once: true, // never reverses → no disappear on scroll-up
          },
        },
      );
    });
  }

  function initSectionReveals() {
    // Disable scroll animations on phones (screens < 768px)
    const isPhone = window.matchMedia("(max-width: 767px)").matches;

    if (isPhone) {
      // Make everything visible immediately on phones
      document
        .querySelectorAll(
          "#service, .servicecard, #skills, #projects, #contact-footer, .projects-header, .skills-header",
        )
        .forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0 });
        });
      return; // Skip scroll animations entirely
    }

    // Tablets and laptops get full scroll animations

    revealOnScroll("#service");
    revealOnScroll(".servicecard", { staggerDelay: 0.08 });
    revealOnScroll("#skills");
    revealOnScroll("#projects");
    revealOnScroll("#contact-footer");
    revealOnScroll(".projects-header");
    revealOnScroll(".skills-header");
  }

  // 5. SKILL BARS ANIMATION
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach((bar) => {
      const progress = bar.querySelector(".skill-progress");
      const width = progress.getAttribute("data-width");
      ScrollTrigger.create({
        trigger: bar,
        start: "top 95%",
        once: true, // KEY FIX: animate once, never reset
        onEnter: () => {
          gsap.to(progress, {
            width: `${width}%`,
            duration: 1.5,
            ease: "power2.out",
          });
        },
      });
    });

    gsap.fromTo(
      ".tech-icon",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tech-icons",
          start: "top 95%",
          once: true,
        },
      },
    );
  }

  // 6. PROJECT TABS
  function initProjectTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const projectTabs = document.querySelectorAll(".project-tab");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        tabBtns.forEach((b) => {
          b.classList.remove("active");
          gsap.to(b, { scale: 1, duration: 0.3 });
        });
        projectTabs.forEach((tab) => {
          tab.classList.remove("active");
          gsap.set(tab, { opacity: 0, y: 20 });
        });

        this.classList.add("active");
        gsap.to(this, { scale: 1.05, duration: 0.3 });

        const activeTab = document.getElementById(tabId);
        activeTab.classList.add("active");
        gsap.fromTo(
          activeTab,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        );

        const projectImage = activeTab.querySelector(".image-container img");
        if (projectImage) {
          gsap.fromTo(
            projectImage,
            { scale: 1.05 },
            { scale: 1.02, duration: 0.8, ease: "power2.out" },
          );
        }
      });
    });

    // Hover on project images
    document.querySelectorAll(".image-container img").forEach((img) => {
      img.addEventListener("mouseenter", () =>
        gsap.to(img, { scale: 1.05, duration: 0.3 }),
      );
      img.addEventListener("mouseleave", () =>
        gsap.to(img, { scale: 1.02, duration: 0.3 }),
      );
    });
  }

  // 7. FOOTER & CONTACT
  function initFooterAnimations() {
    document.getElementById("current-year").textContent =
      new Date().getFullYear();

    // Copy to clipboard
    const copyableItems = document.querySelectorAll(
      ".contact-value[data-copy]",
    );
    const notification = document.querySelector(".copy-notification");

    copyableItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        navigator.clipboard
          .writeText(this.getAttribute("data-copy"))
          .then(() => {
            if (!notification) return;
            gsap.fromTo(
              notification,
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                onStart: () => notification.classList.add("show"),
                onComplete: () => {
                  setTimeout(() => {
                    gsap.to(notification, {
                      opacity: 0,
                      y: 100,
                      duration: 0.3,
                      onComplete: () => notification.classList.remove("show"),
                    });
                  }, 2000);
                },
              },
            );
          });
      });
    });

    // Hover on contact items
    document.querySelectorAll(".contact-item").forEach((item) => {
      item.addEventListener("mouseenter", () =>
        gsap.to(item, { y: -5, duration: 0.3 }),
      );
      item.addEventListener("mouseleave", () =>
        gsap.to(item, { y: 0, duration: 0.3 }),
      );
    });
  }

  // 8. SCROLL PROGRESS BAR
  function initScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      gsap.to(progressBar, {
        width: `${(winScroll / height) * 100}%`,
        duration: 0.1,
        ease: "none",
      });
    });
  }

  // 9. NAV LINK SCROLL FIX
  // ─── KEY FIX ─────────────────────────────────────────────────────────────
  // After clicking a nav/footer anchor, ScrollTrigger doesn't fire for
  // elements that are suddenly "in view" without a scroll event.
  // Force-refresh after the browser finishes jumping.
  // ─────────────────────────────────────────────────────────────────────────
  function initNavScrollFix() {
    document
      .querySelectorAll('#navbar a, .FL, footer a[href^="#"]')
      .forEach((link) => {
        link.addEventListener("click", function () {
          // Wait for smooth-scroll to land, then wake up all triggers
          setTimeout(() => {
            ScrollTrigger.refresh(); // recalculates all positions
            ScrollTrigger.getAll().forEach((st) => st.update()); // re-evaluate each
          }, 700);
        });
      });
  }

  // 10. BOOT
  function init() {
    initHeroAnimations();
    initNavAnimations();
    initSectionReveals();
    initSkillBars();
    initProjectTabs();
    initFooterAnimations();
    initScrollProgress();
    initNavScrollFix();
    console.log("Portfolio animations ready.");
  }

  setTimeout(init, 100);

  // Refresh on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });

  // Respect reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(0.3);
  }
});
