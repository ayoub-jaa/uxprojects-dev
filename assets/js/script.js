// Afficher / cacher le bouton scroll to top
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Remonter en haut de la page en douceur
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Gestion de la sticky nav (highlight du menu actif)
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section");

function setActiveLink() {
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

window.addEventListener("scroll", setActiveLink);

// -------------------------
// Gestion de la langue FR/EN avec switch animé
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("lang-toggle");
  const langElements = document.querySelectorAll("[data-lang]");

  // Détection de la langue stockée
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
  }
});


// Animation d'apparition de la photo de profil quand elle entre dans la vue
const portrait = document.querySelector(".portrait");

if (portrait) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        portrait.classList.add("visible");
        observer.unobserve(portrait); // ne l'observe plus une fois visible
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(portrait);
}

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burgerMenu");
  const nav = document.getElementById("navMenu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    nav.classList.toggle("open");

    const isOpen = burger.classList.contains("open");
    burger.setAttribute("aria-expanded", isOpen);
  });
});
