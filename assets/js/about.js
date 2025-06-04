document.addEventListener("DOMContentLoaded", () => {
  // Tab Navigation
  const navButtons = document.querySelectorAll(".nav-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  function switchTab(targetSection) {
    // Remove active class from all nav buttons and tab contents
    navButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked button and corresponding content
    const targetButton = document.querySelector(`[data-section="${targetSection}"]`)
    const targetContent = document.getElementById(`${targetSection}-tab`)

    if (targetButton && targetContent) {
      targetButton.classList.add("active")
      targetContent.classList.add("active")
    }
  }

  // Add click event listeners to navigation buttons
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.getAttribute("data-section")
      switchTab(section)
    })
  })

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobile-toggle")
  const mobileNav = document.getElementById("mobile-nav")

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", function () {
      mobileNav.classList.toggle("active")
      const icon = this.querySelector("i")
      if (mobileNav.classList.contains("active")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })

    // Close mobile nav when clicking on nav items
    const mobileNavButtons = mobileNav.querySelectorAll(".nav-btn")
    mobileNavButtons.forEach((button) => {
      button.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        mobileToggle.querySelector("i").className = "fas fa-bars"
      })
    })

    // Close mobile nav when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileToggle.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove("active")
        mobileToggle.querySelector("i").className = "fas fa-bars"
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add animation to skill badges on hover
  const skillBadges = document.querySelectorAll(".skill-badge")
  skillBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all cards for animation
  document.querySelectorAll(".card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Mobile menu toggle (if needed)
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Add typing effect to hero title (optional)
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Initialize typing effect for hero title (uncomment if desired)
  // const heroTitle = document.querySelector('.hero-title');
  // if (heroTitle) {
  //     const originalText = heroTitle.textContent;
  //     typeWriter(heroTitle, originalText, 50);
  // }

  // Add parallax effect to background elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".bg-circle")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Add glow effect to buttons on hover
  const buttons = document.querySelectorAll(".btn-primary")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.4)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = ""
    })
  })
})
