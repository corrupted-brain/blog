// ============================================
// ENHANCED ABOUT PAGE - JAVASCRIPT INTERACTIVITY
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // TAB NAVIGATION
  // ============================================
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  function switchTab(targetSection) {
    // Remove active class from all nav buttons and tab contents
    navButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    const targetButton = document.querySelector(
      `[data-section="${targetSection}"]`
    );
    const targetContent = document.getElementById(`${targetSection}-tab`);

    if (targetButton && targetContent) {
      targetButton.classList.add("active");
      targetContent.classList.add("active");
    }
  }

  // Add click event listeners to navigation buttons
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      switchTab(section);

      // Close mobile menu if open
      closeMobileNav();
    });
  });

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove("active");
      const icon = mobileToggle?.querySelector("i");
      if (icon) {
        icon.className = "fas fa-bars";
      }
    }
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      const icon = this.querySelector("i");
      if (mobileNav.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // Close mobile nav when clicking on nav items
    const mobileNavButtons = mobileNav.querySelectorAll(".nav-btn");
    mobileNavButtons.forEach((button) => {
      button.addEventListener("click", () => {
        closeMobileNav();
      });
    });
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".card, .cert-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ============================================
  // SKILLS ANIMATION
  // ============================================
  const skillBadges = document.querySelectorAll(".skill-badge");
  skillBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
  });

  // ============================================
  // TOOLTIP FOR COMPANY ICONS
  // ============================================
  const companyIcons = document.querySelectorAll(".company-icon");
  companyIcons.forEach((icon) => {
    const title = icon.getAttribute("title");
    if (title) {
      icon.style.cursor = "pointer";
      icon.addEventListener("mouseenter", () => {
        showTooltip(icon, title);
      });
      icon.addEventListener("mouseleave", hideTooltip);
    }
  });

  function showTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: #1f2937;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      z-index: 1000;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  // ============================================
  // ACTIVE NAVIGATION UPDATE ON SCROLL
  // ============================================
  let ticking = false;
  function updateActiveNav() {
    const sections = document.querySelectorAll(".tab-content");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id").replace("-tab", "");
      }
    });

    // Update button states
    navButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-section") === current) {
        btn.classList.add("active");
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  });

  // ============================================
  // EMAIL VALIDATION FOR CONTACT BUTTON
  // ============================================
  const contactButtons = document.querySelectorAll('a[href^="mailto:"]');
  contactButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const email = this.getAttribute("href").replace("mailto:", "");
      if (!email || email.includes("your-email")) {
        e.preventDefault();
        console.warn("Please update your email address in the page front matter");
      }
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const activeBtn = document.querySelector(".nav-btn.active");
      const nextBtn = activeBtn?.nextElementSibling;
      if (nextBtn && nextBtn.classList.contains("nav-btn")) {
        nextBtn.click();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const activeBtn = document.querySelector(".nav-btn.active");
      const prevBtn = activeBtn?.previousElementSibling;
      if (prevBtn && prevBtn.classList.contains("nav-btn")) {
        prevBtn.click();
      }
    }
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "back-to-top";
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "flex";
      backToTopBtn.style.alignItems = "center";
      backToTopBtn.style.justifyContent = "center";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform = "translateY(-5px)";
    backToTopBtn.style.boxShadow =
      "0 8px 20px rgba(16, 185, 129, 0.4)";
  });

  backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = "translateY(0)";
    backToTopBtn.style.boxShadow =
      "0 4px 12px rgba(16, 185, 129, 0.3)";
  });

  // ============================================
  // EXTERNAL LINK ICONS
  // ============================================
  const externalLinks = document.querySelectorAll(
    'a[href^="http"]:not([href*="' + window.location.hostname + '"])'
  );
  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  console.log("About page enhancements loaded successfully!");
});
