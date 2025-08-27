// FredRAMP.com - Interactive Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Navigation dropdown functionality
  const navButtons = document.querySelectorAll(".usa-accordion__button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const controls = this.getAttribute("aria-controls");
      const submenu = document.getElementById(controls);

      // Close all other submenus
      navButtons.forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.setAttribute("aria-expanded", "false");
          const otherControls = otherButton.getAttribute("aria-controls");
          const otherSubmenu = document.getElementById(otherControls);
          if (otherSubmenu) {
            otherSubmenu.style.display = "none";
          }
        }
      });

      // Toggle current submenu
      if (isExpanded) {
        this.setAttribute("aria-expanded", "false");
        if (submenu) {
          submenu.style.display = "none";
        }
      } else {
        this.setAttribute("aria-expanded", "true");
        if (submenu) {
          submenu.style.display = "block";
        }
      }
    });
  });

  // Close submenus when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".usa-nav__primary-item")) {
      navButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        const controls = button.getAttribute("aria-controls");
        const submenu = document.getElementById(controls);
        if (submenu) {
          submenu.style.display = "none";
        }
      });
    }
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector(".usa-menu-btn");
  const navPrimary = document.querySelector(".usa-nav__primary");

  if (menuBtn && navPrimary) {
    menuBtn.addEventListener("click", function () {
      const isVisible = navPrimary.style.display === "flex";
      if (isVisible) {
        navPrimary.style.display = "none";
        this.textContent = "Menu";
      } else {
        navPrimary.style.display = "flex";
        this.textContent = "Close";
      }
    });
  }

  // Back to top functionality
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // USA Banner accordion functionality
  const bannerButton = document.querySelector(".usa-banner__button");
  const bannerContent = document.querySelector(".usa-banner__content");

  if (bannerButton) {
    bannerButton.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);

      // Toggle banner content visibility
      if (bannerContent) {
        if (isExpanded) {
          bannerContent.style.display = "none";
        } else {
          bannerContent.style.display = "block";
        }
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add hover effects for cards
  const cards = document.querySelectorAll(".fedramp-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });

  // Add loading animation for buttons
  const buttons = document.querySelectorAll(".usa-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add loading state for form buttons
      if (this.type === "submit" || this.closest("form")) {
        const originalText = this.textContent;
        this.textContent = "Loading...";
        this.disabled = true;

        // Simulate loading (remove this in production)
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
        }, 2000);
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".fedramp-card, .fedramp-hero, .mountain-banner"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add parallax effect to mountain background
  const mountainImg = document.querySelector(".mountain-img");

  if (mountainImg) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      mountainImg.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Escape key closes all dropdowns
    if (e.key === "Escape") {
      navButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        const controls = button.getAttribute("aria-controls");
        const submenu = document.getElementById(controls);
        if (submenu) {
          submenu.style.display = "none";
        }
      });
    }

    // Tab key navigation
    if (e.key === "Tab") {
      // Ensure focus is visible
      document.body.classList.add("keyboard-navigation");
    }
  });

  // Remove keyboard navigation class on mouse use
  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add focus styles for keyboard navigation
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      if (document.body.classList.contains("keyboard-navigation")) {
        this.style.outline = "2px solid #00bde3";
        this.style.outlineOffset = "2px";
      }
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });
  });

  // Console message for developers
  console.log("🚀 FredRAMP.com loaded successfully!");
  console.log(
    "This is a parody site - not affiliated with the real FedRAMP program."
  );
  console.log("Fred says: 'Welcome to my basement office!' 🏠");
  console.log(
    "Remember: Fred is not a real government employee, but he does make great coffee ☕"
  );

  // Add some fun easter eggs
  let clickCount = 0;
  const logo = document.querySelector(".usa-logo");

  if (logo) {
    logo.addEventListener("click", function (e) {
      clickCount++;
      if (clickCount >= 5) {
        this.style.transform = "rotate(360deg)";
        this.style.transition = "transform 1s ease";
        setTimeout(() => {
          this.style.transform = "";
          this.style.transition = "";
        }, 1000);
        clickCount = 0;
      }
    });
  }
});
