// Pour débugger
console.log("JS chargé");

// ✅ Sélecteurs des éléments
function setupFullStudyPanel() {
  const toggleBtnFr = document.getElementById("toggle-full-study-fr");
  const toggleBtnEn = document.getElementById("toggle-full-study-en");
  const studySection = document.getElementById("full-study-panel");
  const closeBtn = document.getElementById("close-full-study");

  if (!studySection) return; // sécurité

  function openPanel() {
    if (studySection.hasAttribute("hidden")) {
      studySection.removeAttribute("hidden");
      requestAnimationFrame(() => {
        studySection.classList.add("visible");
      });
    }
  }

  function closePanel() {
    studySection.classList.remove("visible");
    studySection.addEventListener(
      "transitionend",
      () => {
        studySection.setAttribute("hidden", "");
      },
      { once: true }
    );
  }

  if (toggleBtnFr) toggleBtnFr.addEventListener("click", openPanel);
  if (toggleBtnEn) toggleBtnEn.addEventListener("click", openPanel);
  if (closeBtn) closeBtn.addEventListener("click", closePanel);
}

function setupToggleProjects() {
  const frBtn = document.getElementById("toggle-projects");
  const enBtn = document.getElementById("toggle-projects-en");
  const extraProjects = document.getElementById("extra-projects");

  function toggleProjects(lang) {
    const isHidden = extraProjects.classList.contains("hidden-projects");

    if (isHidden) {
      extraProjects.classList.remove("hidden-projects");
    } else {
      extraProjects.classList.add("hidden-projects");
    }

    if (lang === "fr") {
      frBtn.textContent = isHidden ? "Masquer" : "Voir tous les projets";
    } else {
      enBtn.textContent = isHidden ? "Hide" : "See all projects";
    }
  }

  const lang = document.documentElement.getAttribute("lang") || "fr";

  if (lang === "fr" && frBtn) {
    frBtn.addEventListener("click", () => toggleProjects("fr"));
  }

  if (lang === "en" && enBtn) {
    enBtn.addEventListener("click", () => toggleProjects("en"));
  }
}

function setActiveLink() {
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

function setupLangSwitch() {
  const toggle = document.getElementById("lang-toggle");
  const langElements = document.querySelectorAll("[data-lang]");

  const storedLang = localStorage.getItem("lang");
  const isEnglish = storedLang === "en";

  if (toggle) {
    toggle.checked = isEnglish;
    updateLanguage(isEnglish ? "en" : "fr");

    toggle.addEventListener("change", () => {
      const lang = toggle.checked ? "en" : "fr";
      updateLanguage(lang);
      localStorage.setItem("lang", lang);
    });
  }

  function updateLanguage(lang) {
    langElements.forEach((el) => {
      el.style.display = el.getAttribute("data-lang") === lang ? "" : "none";
    });
    document.documentElement.setAttribute("lang", lang);
    setupToggleProjects();
  }
}

function setupPortraitObserver() {
  const portrait = document.querySelector(".portrait");
  if (portrait) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          portrait.classList.add("visible");
          observer.unobserve(portrait);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(portrait);
  }
}

function setupBurgerMenu() {
  const burger = document.getElementById("burgerMenu");
  const nav = document.getElementById("navMenu");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
      const isOpen = burger.classList.contains("open");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }
}

function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".carousel-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}

function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupVideoModal() {
  document.querySelectorAll('.video-thumbnail').forEach(item => {
    item.addEventListener('click', () => {
      const videoSrc = item.getAttribute('data-video');
      const modal = document.getElementById('videoModal');
      const modalVideo = document.getElementById('modalVideo');
      modalVideo.src = videoSrc;
      modal.style.display = 'block';
    });
  });

  document.getElementById('closeVideoModal').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = '';
  });
}

function setupTimelineScroll() {
  const path = document.querySelector(".timeline-path path");
  const timeline = document.querySelector(".timeline");

  if (!path || !timeline) {
    console.warn("Path or timeline not found");
    return;
  }

  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = `${pathLength}`;
  path.style.strokeDashoffset = pathLength;
  path.style.transition = 'stroke-dashoffset 0.2s ease-out';
  path.style.strokeLinecap = 'round';

  function updatePathOnScroll() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= windowHeight || rect.bottom <= 0) return;

    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const scrollRatio = visibleHeight / rect.height;

    const drawLength = pathLength * scrollRatio;
    path.style.strokeDashoffset = pathLength - drawLength;
  }

  window.addEventListener("scroll", updatePathOnScroll);
  updatePathOnScroll();
}

function init() {
  console.log("🚀 JS initialisé");
  setupFullStudyPanel();
  setupToggleProjects();
  setupLangSwitch();
  setupPortraitObserver();
  setupBurgerMenu();
  setupImageModal();
  setupScrollToTop();
  setActiveLink();
  setupTimelineScroll();
  setupVideoModal();
}

window.addEventListener("load", init);