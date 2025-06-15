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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  // Clic sur image du carrousel
  document.querySelectorAll(".carousel-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  // Fermeture de la modale
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Clic à l'extérieur de l'image = fermer
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// ✅ Appel différé garanti après que tout soit prêt
window.addEventListener("load", () => {
  setTimeout(setupFullStudyPanel, 100); // léger délai pour que tout le DOM soit bien prêt
});

// Vidéo Lightbox
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
  modalVideo.src = ''; // reset
});


