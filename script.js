// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });

  // Active nav link highlighting and section detection
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Simple animation for skills section
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category, index) => {
    category.style.opacity = "0";
    category.style.transform = "translateY(20px)";
    category.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    setTimeout(() => {
      category.style.opacity = "1";
      category.style.transform = "translateY(0)";
    }, 300 + index * 100);
  });

  // Animation for experience items
  const experienceItems = document.querySelectorAll(
    ".experience-item, .education-item"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  observerOptions);

  experienceItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    appearOnScroll.observe(item);
  });

  document.addEventListener("intersect", function (e) {
    if (
      e.target.classList.contains("experience-item") ||
      e.target.classList.contains("education-item")
    ) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });

  // Add class to elements when they intersect viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.dispatchEvent(new CustomEvent("intersect"));
      }
    });
  }, observerOptions);

  experienceItems.forEach((item) => {
    observer.observe(item);
  });
});

// Update current year in footer copyright text
document.addEventListener("DOMContentLoaded", function () {
  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace("2023", currentYear);
  }
});
