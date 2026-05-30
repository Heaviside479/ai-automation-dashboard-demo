document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    ".dashboard-preview, .metric-card, .workflow-card, .analytics-card, .task-column, .task-card, .value-card, .section-heading, .cta-section"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("fade-element");
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  const metricNumbers = document.querySelectorAll(".metric-card strong");

  metricNumbers.forEach((number) => {
    number.addEventListener("mouseenter", () => {
      number.style.transform = "scale(1.06)";
    });

    number.addEventListener("mouseleave", () => {
      number.style.transform = "scale(1)";
    });

    number.style.transition = "transform 0.3s ease";
  });

  const workflowCards = document.querySelectorAll(".workflow-card");

  workflowCards.forEach((card) => {
    card.addEventListener("click", () => {
      workflowCards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });

  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
    });
  });

  const chartBars = document.querySelectorAll(".mini-chart div, .line-visual span");

  chartBars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.08}s`;
    bar.classList.add("bar-animate");
  });

  console.log(
    "%cFlowPilot AI",
    "color:#38bdf8;font-size:22px;font-weight:bold;"
  );

  console.log(
    "%cAI Automation Dashboard Demo by Heaviside Solutions",
    "color:#94a3b8;font-size:14px;"
  );
});
