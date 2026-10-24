/* ==========================================================================
   PRACTICAL-4: Student Hub Portal Interactive DOM Script
   Features:
     - Light/Dark Theme Switching with persistent localStorage
     - Dismissible Notification Banner with sessionStorage tracking
     - Automated Highlights Slider with pause-on-hover & indicator dots
     - Campus Announcement Modal Dialog with keyboard Escape closing
     - Collapsible FAQ Accordion for faq.html
     - Responsive Mobile Hamburger Navigation
   Student: Vishv Vaghasiya | ID: 25CE130 | Course: ITUE203 WDF
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light) with localStorage persistence
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem("studenthub-theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const isLight = document.body.classList.contains("light-theme");
      const nextTheme = isLight ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem("studenthub-theme", nextTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light";
    } else {
      document.body.classList.remove("light-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark";
    }
  }

  /* ------------------------------------------------------------------------
     2. Dismissible Notification Banner with sessionStorage
     ------------------------------------------------------------------------ */
  const notificationBanner = document.getElementById("notificationBanner");
  const closeBannerBtn = document.getElementById("closeBannerBtn");

  if (sessionStorage.getItem("studenthub_banner_dismissed") === "true") {
    if (notificationBanner) {
      notificationBanner.remove();
    }
  } else if (closeBannerBtn && notificationBanner) {
    closeBannerBtn.addEventListener("click", function () {
      notificationBanner.style.opacity = "0";
      notificationBanner.style.transform = "translateY(-10px)";
      notificationBanner.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      setTimeout(function () {
        notificationBanner.remove();
      }, 300);
      sessionStorage.setItem("studenthub_banner_dismissed", "true");
    });
  }

  /* ------------------------------------------------------------------------
     3. Responsive Mobile Hamburger Menu
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const siteNav = document.getElementById("siteNav");

  if (hamburgerBtn && siteNav) {
    hamburgerBtn.addEventListener("click", function () {
      siteNav.classList.toggle("open");
    });

    // Close menu when clicking outside on mobile
    document.addEventListener("click", function (event) {
      if (!siteNav.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        siteNav.classList.remove("open");
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Campus Highlights Slider
     ------------------------------------------------------------------------ */
  const sliderContainer = document.getElementById("highlightsSlider");
  const slidesWrapper = document.getElementById("slidesWrapper");
  const prevSlideBtn = document.getElementById("prevSlide");
  const nextSlideBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");

  if (slidesWrapper && sliderContainer) {
    const slides = slidesWrapper.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoSlideInterval = null;

    // Dynamically generate dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.className = "slider-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      slidesWrapper.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".slider-dot");
        dots.forEach(function (dot, index) {
          dot.classList.toggle("active", index === currentSlide);
        });
      }
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (nextSlideBtn) nextSlideBtn.addEventListener("click", nextSlide);
    if (prevSlideBtn) prevSlideBtn.addEventListener("click", prevSlide);

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 4500);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
  }

  /* ------------------------------------------------------------------------
     5. Campus Announcement Modal Dialog
     ------------------------------------------------------------------------ */
  const openModalBtn = document.getElementById("openModalBtn");
  const announcementModal = document.getElementById("announcementModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOkBtn = document.getElementById("modalOkBtn");
  const modalDismissBtn = document.getElementById("modalDismissBtn");

  function openModal() {
    if (announcementModal) {
      announcementModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (announcementModal) {
      announcementModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener("click", closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener("click", closeModal);

  // Close when clicking on backdrop
  if (announcementModal) {
    announcementModal.addEventListener("click", function (event) {
      if (event.target === announcementModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && announcementModal && announcementModal.classList.contains("active")) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     6. Collapsible FAQ Accordion (for faq.html)
     ------------------------------------------------------------------------ */
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("active");

      // Optional: close other open items
      document.querySelectorAll(".faq-item").forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active", !isOpen);
    });
  });

});
