/**
 * Waris Ali — Portfolio Master Script
 * Theme: Minimalist Monochrome (Permanent Single Theme)
 * Pure vanilla JavaScript with GSAP & ScrollTrigger integration
 */

(function () {
  "use strict";

  // Check if GSAP is available, otherwise initialize fallback
  const hasGSAP = typeof gsap !== "undefined";
  if (hasGSAP && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ==========================================================================
     Case Study Data Model
     ========================================================================== */
  const CASE_STUDIES = {
    "waris-fav-songs": {
      title: "Waris' Fav Songs",
      subtitle: "Personal Music Playlist Experience",
      tagline: "A personal web-based music playlist experience built from scratch using pure HTML, CSS, and JavaScript with interactive audio playback controls.",
      role: "Solo — concept, design, frontend development & audio integration",
      context: "BCA 1st Semester Project",
      status: "Live on Vercel",
      stack: ["HTML5", "CSS3", "JavaScript", "Audio API", "Vercel"],
      liveUrl: "https://warisfavsongs.vercel.app/",
      githubUrl: "https://github.com/cheemsmirrorx/waris-fav-song-playlist",
      overview: [
        "Waris' Fav Songs is a personal web-based music playlist created as one of my first projects during my BCA 1st semester. The idea was simple: take the songs I love and turn them into a clean, interactive web experience.",
        "Instead of building another basic static webpage, I wanted to experiment with the fundamentals of frontend development, including layout design, styling, JavaScript interactions, audio controls, and responsive UI."
      ],
      problem: [
        "Many beginner projects are simple static clones without interactive media controls. I wanted to build something I personally use and enjoy.",
        "The goal was to build a real interactive music experience from scratch using pure HTML, CSS, and JavaScript without relying on heavy frameworks."
      ],
      features: [
        {
          title: "Personal Music Playlist",
          body: "Browse through a curated tracklist of personally selected songs with visual album artwork."
        },
        {
          title: "Interactive Audio Playback",
          body: "Play, pause, skip, and control music tracks directly from the web interface using the HTML5 Audio API."
        },
        {
          title: "Custom Modern UI",
          body: "Designed with a dark-mode music-player aesthetic, clean typography, and smooth interactive feedback."
        },
        {
          title: "Responsive Layout",
          body: "Built with CSS Flexbox and media queries to deliver a seamless experience across desktop and mobile devices."
        }
      ],
      architecture: [
        { label: "HTML5", detail: "Semantic page structure, media containers, and audio elements" },
        { label: "CSS3", detail: "Modern layout, custom player design, animations, and responsive styling" },
        { label: "JavaScript (ES6+)", detail: "DOM manipulation, event handling, track switching, and audio controls" },
        { label: "Vercel", detail: "Production deployment with instant worldwide edge hosting" }
      ],
      ownership: [
        "Product concept and track curation",
        "Interface design and styling from scratch",
        "Vanilla JavaScript audio controls and playback logic",
        "Deployment on Vercel and repository management on GitHub"
      ]
    }
  };

  /* ==========================================================================
     Top Scroll Progress Line
     ========================================================================== */
  const progressFill = document.getElementById("scroll-progress-fill");
  function updateScrollProgress() {
    if (!progressFill) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    progressFill.style.transform = `scaleX(${progress})`;
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ==========================================================================
     Custom Magnetic Difference Cursor
     ========================================================================== */
  const cursor = document.getElementById("custom-cursor");
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (cursor && isFinePointer) {
    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = "1";
    });

    document.documentElement.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Enlarge cursor on interactive elements
    const hoverTargets = "a, button, input, textarea, summary, .t-btn, .t-row, .t-chip, .skills-card";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.add("is-active");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.remove("is-active");
      }
    });
  }

  /* ==========================================================================
     Fullscreen Intro Sequence
     ========================================================================== */
  const introOverlay = document.getElementById("intro-overlay");
  const introCount = document.getElementById("intro-count");
  const introBar = document.getElementById("intro-progress-bar");

  let introCompleted = false;
  function completeIntro() {
    if (introCompleted || !introOverlay) return;
    introCompleted = true;

    if (hasGSAP) {
      gsap.to(introOverlay, {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut",
        onComplete: () => {
          introOverlay.style.display = "none";
          triggerHeroAnimations();
        }
      });
    } else {
      introOverlay.style.transform = "translateY(-100%)";
      setTimeout(() => {
        introOverlay.style.display = "none";
        triggerHeroAnimations();
      }, 1000);
    }
  }

  if (introOverlay) {
    // Skip on click or keypress
    introOverlay.addEventListener("click", completeIntro);
    window.addEventListener("keydown", completeIntro, { once: true });

    // Smooth counter animation 000 -> 100
    let counterVal = { val: 0 };
    if (hasGSAP) {
      gsap.to(counterVal, {
        val: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (introCount) {
            introCount.textContent = String(Math.round(counterVal.val)).padStart(3, "0");
          }
        }
      });
      gsap.to(introBar, {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(completeIntro, 200);
        }
      });
    } else {
      let count = 0;
      const interval = setInterval(() => {
        count += 2;
        if (count >= 100) {
          count = 100;
          clearInterval(interval);
          setTimeout(completeIntro, 200);
        }
        if (introCount) introCount.textContent = String(count).padStart(3, "0");
        if (introBar) introBar.style.transform = `scaleX(${count / 100})`;
      }, 25);
    }
  }

  /* ==========================================================================
     Hero Entrance & Character Deflection
     ========================================================================== */
  function triggerHeroAnimations() {
    // Scramble effect on "Portfolio · 2026"
    const scrambleEl = document.getElementById("hero-scramble-text");
    if (scrambleEl) {
      const originalText = scrambleEl.textContent;
      const chars = "01/—_#*<>[]";
      let iteration = 0;
      const scrambleInterval = setInterval(() => {
        scrambleEl.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (iteration >= originalText.length) {
          clearInterval(scrambleInterval);
          scrambleEl.textContent = originalText;
        }
        iteration += 1 / 3;
      }, 30);
    }

    if (hasGSAP) {
      gsap.from("[data-fade]", {
        y: 28,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out"
      });
      gsap.from("[data-rule]", {
        scaleX: 0,
        duration: 1.2,
        ease: "expo.inOut",
        stagger: 0.1
      });
    }
  }

  // Split hero title lines into individual characters for magnetic hover
  const heroLines = document.querySelectorAll(".hero-line");
  const heroCharEls = [];
  heroLines.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement("span");
      span.className = "hero-char";
      span.textContent = char === " " ? "\u00A0" : char;
      line.appendChild(span);
      heroCharEls.push(span);
    }
  });

  if (isFinePointer && heroCharEls.length > 0) {
    let charPositions = [];
    function updateCharPositions() {
      charPositions = heroCharEls.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
    }
    updateCharPositions();
    window.addEventListener("resize", updateCharPositions);
    window.addEventListener("scroll", updateCharPositions, { passive: true });

    window.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      heroCharEls.forEach((el, index) => {
        const pos = charPositions[index];
        if (!pos) return;
        const dx = pos.x - mouseX;
        const dy = pos.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < 130) {
          const power = (1 - dist / 130) * 22;
          const pushX = (dx / (dist || 1)) * power;
          const pushY = (dy / (dist || 1)) * power;
          el.style.transform = `translate(${pushX}px, ${pushY}px)`;
        } else {
          el.style.transform = `translate(0px, 0px)`;
        }
      });
    });
  }

  /* ==========================================================================
     Navbar Hide / Reveal on Scroll
     ========================================================================== */
  const mainNav = document.getElementById("main-nav");
  let lastScrollY = 0;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollY > 140 && currentScrollY > lastScrollY) {
      if (mainNav) mainNav.style.transform = "translateY(-100%)";
    } else {
      if (mainNav) mainNav.style.transform = "translateY(0)";
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ==========================================================================
     Dual Velocity Marquee Ticker
     ========================================================================== */
  const track1 = document.getElementById("ticker-track-1");
  const track2 = document.getElementById("ticker-track-2");
  const tickerContainer = document.getElementById("ticker-container");

  if (track1 && track2) {
    let pos1 = 0;
    let pos2 = 0;
    let baseSpeed1 = -1.2;
    let baseSpeed2 = 1.0;
    let scrollVelocity = 0;
    let lastY = window.pageYOffset;
    let lastTime = performance.now();

    window.addEventListener("scroll", () => {
      const now = performance.now();
      const currentY = window.pageYOffset;
      const dt = Math.max(1, now - lastTime);
      scrollVelocity = (currentY - lastY) / dt * 15;
      lastY = currentY;
      lastTime = now;
    }, { passive: true });

    function tickMarquee() {
      scrollVelocity *= 0.92; // dampening
      const currentSpeed1 = baseSpeed1 - scrollVelocity * 0.4;
      const currentSpeed2 = baseSpeed2 + scrollVelocity * 0.4;

      pos1 += currentSpeed1;
      pos2 += currentSpeed2;

      const halfWidth1 = track1.scrollWidth / 2;
      const halfWidth2 = track2.scrollWidth / 2;

      if (halfWidth1 > 0) {
        if (pos1 <= -halfWidth1) pos1 += halfWidth1;
        if (pos1 >= 0) pos1 -= halfWidth1;
      }
      if (halfWidth2 > 0) {
        if (pos2 >= 0) pos2 -= halfWidth2;
        if (pos2 <= -halfWidth2) pos2 += halfWidth2;
      }

      track1.style.transform = `translate3d(${pos1}px, 0, 0)`;
      track2.style.transform = `translate3d(${pos2}px, 0, 0)`;

      // Subtle velocity skew effect matching reference
      const skewAngle = Math.max(-8, Math.min(8, -scrollVelocity * 0.3));
      if (tickerContainer) {
        tickerContainer.style.transform = `skewX(${skewAngle}deg)`;
      }

      requestAnimationFrame(tickMarquee);
    }
    requestAnimationFrame(tickMarquee);
  }

  /* ==========================================================================
     Project Hover Preview Window
     ========================================================================== */
  const previewBox = document.getElementById("hover-preview");
  const previewImg = document.getElementById("hover-preview-img");
  const projectRows = document.querySelectorAll(".t-row[data-preview]");

  if (previewBox && previewImg && isFinePointer) {
    let pX = 0, pY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX + 30;
      targetY = e.clientY - 20;
    });

    function updatePreviewPos() {
      pX += (targetX - pX) * 0.2;
      pY += (targetY - pY) * 0.2;
      previewBox.style.transform = `translate(${pX}px, ${pY}px)`;
      requestAnimationFrame(updatePreviewPos);
    }
    requestAnimationFrame(updatePreviewPos);

    projectRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const src = row.getAttribute("data-preview");
        if (src) {
          previewImg.src = src;
          previewBox.style.opacity = "1";
        }
      });
      row.addEventListener("mouseleave", () => {
        previewBox.style.opacity = "0";
      });
    });
  }

  /* ==========================================================================
     Skills Horizontal Scroll (GSAP ScrollTrigger)
     ========================================================================== */
  const skillsViewport = document.getElementById("skills-viewport");
  const skillsTrack = document.getElementById("skills-track");

  if (hasGSAP && skillsViewport && skillsTrack) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getScrollDist = () => skillsTrack.scrollWidth - window.innerWidth + 80;
      gsap.to(skillsTrack, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: skillsViewport,
          start: "top top",
          end: () => `+=${getScrollDist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    });
  }

  /* ==========================================================================
     Services 3D Stack Cards Animation (GSAP ScrollTrigger)
     ========================================================================== */
  const servicesWrap = document.getElementById("services-stage-wrap");
  const serviceCards = document.querySelectorAll(".service-stack-card");

  if (hasGSAP && servicesWrap && serviceCards.length > 0) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const cardList = Array.from(serviceCards);
      // Initialize card stack positions
      gsap.set(cardList[0], { y: 0, scale: 1, zIndex: 10 });
      cardList.slice(1).forEach((card, idx) => {
        gsap.set(card, { y: "110%", scale: 0.97, zIndex: cardList.length - idx });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesWrap,
          start: "top top",
          end: () => `+=${window.innerHeight * (cardList.length - 1)}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      cardList.slice(1).forEach((card, idx) => {
        tl.to(card, {
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.45
        }, idx * 0.45);

        tl.to(cardList[idx], {
          scale: 0.985,
          ease: "power2.out",
          duration: 0.4
        }, idx * 0.45);
      });
    });
  }

  /* ==========================================================================
     Footer Marquee Scroll Scrub
     ========================================================================== */
  const footerMarquee = document.getElementById("footer-marquee");
  if (hasGSAP && footerMarquee) {
    gsap.fromTo(footerMarquee, 
      { xPercent: 0 },
      {
        xPercent: -45,
        ease: "none",
        scrollTrigger: {
          trigger: "footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6
        }
      }
    );
  }

  /* ==========================================================================
     Back to Top Smooth Scroll
     ========================================================================== */
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     Case Study Modal Logic
     ========================================================================== */
  const modalOverlay = document.getElementById("case-study-modal");
  const modalContent = document.getElementById("case-study-content");
  const modalCloseBtn = document.getElementById("case-study-close-btn");

  function openCaseStudy(slug) {
    const data = CASE_STUDIES[slug];
    if (!data || !modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="t-label t-muted">${data.role} · ${data.status}</span>
        <h2 class="t-h2" style="font-size:clamp(2rem, 4vw, 3.2rem); margin-top:0.5rem;">${data.title}</h2>
        <p class="case-study-tagline">${data.tagline}</p>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom: 2rem;">
        ${data.stack.map(s => `<span class="t-chip t-chip--solid">${s}</span>`).join("")}
      </div>

      <div class="case-study-section">
        <h4>Overview</h4>
        ${data.overview.map(p => `<p class="t-prose" style="margin-bottom: 1rem;">${p}</p>`).join("")}
      </div>

      <div class="case-study-section">
        <h4>The Problem</h4>
        ${data.problem.map(p => `<p class="t-prose" style="margin-bottom: 1rem;">${p}</p>`).join("")}
      </div>

      ${data.features ? `
        <div class="case-study-section">
          <h4>Key Features</h4>
          <div>
            ${data.features.map(f => `
              <div class="feature-box">
                <h5>${f.title}</h5>
                <p class="t-prose" style="font-size:0.95rem;">${f.body}</p>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${data.architecture ? `
        <div class="case-study-section">
          <h4>Architecture & Stack</h4>
          <div>
            ${data.architecture.map(a => `
              <div class="hero-spec-row" style="padding: 0.5rem 0;">
                <dt style="font-weight:700;">${a.label}</dt>
                <dd style="color:var(--text-secondary);">${a.detail}</dd>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <div style="display:flex; gap:1rem; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--t-line);">
        ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="t-btn">Live demo ↗</a>` : ""}
        ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="t-btn t-btn--ghost">GitHub Source ↗</a>` : ""}
      </div>
    `;

    modalOverlay.classList.add("is-active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCaseStudy() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("is-active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".open-case-study-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const slug = btn.getAttribute("data-slug");
      if (slug) openCaseStudy(slug);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeCaseStudy);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeCaseStudy();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCaseStudy();
  });

})();
