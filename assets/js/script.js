// Pour débugger
// console.log("JS chargé");

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

// ✅ Toggle projets supplémentaires selon la langue
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
    setupToggleProjects(); // 🔁 rebinde les bons boutons selon la langue
  }
});

// Animation d'apparition de la photo de profil
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

  document.querySelectorAll(".carousel-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

window.addEventListener("load", () => {
  setTimeout(setupFullStudyPanel, 100);
});

document.querySelectorAll('.video-thumbnail').forEach(item => {
  item.addEventListener('click', () => {
    const videoSrc = item.getAttribute('data-video');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.src = videoSrc;
    modal.style.display = 'block';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const path = document.querySelector(".timeline-path path");
  const timeline = document.querySelector(".timeline");

  if (!path || !timeline) {
    console.warn("Path or timeline not found");
    return;
  }
  const pathLength = path.getTotalLength();
  //path.style.strokeDasharray = `${pathLength}`;
  path.style.strokeDashoffset = pathLength;
  path.style.transition = 'stroke-dashoffset 0.2s ease-out';
  path.style.strokeLinecap = 'round';

  // Fonction de mise à jour selon le scroll DANS LA TIMELINE uniquement
  function updatePathOnScroll() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= windowHeight || rect.bottom <= 0) return; // hors écran

    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const scrollRatio = visibleHeight / rect.height;

    const drawLength = pathLength * scrollRatio;
    path.style.strokeDashoffset = pathLength - drawLength;
  }

  window.addEventListener("scroll", updatePathOnScroll);
  updatePathOnScroll(); // init
});


/* === Recommendations Slider === */
(function() {
  const track = document.getElementById('recoTrack');
  if (!track) return;

  const dotsEl = document.getElementById('recoDots');
  const prevBtn = document.querySelector('.reco-prev');
  const nextBtn = document.querySelector('.reco-next');

  let items = [];
  let index = 0;      // premier slide visible
  let perView = 1;    // nombre de cartes visibles

  // calc perView selon largeur (1 mobile, 2 tablette, 3 desktop large)
  const calcPerView = () => {
    const w = window.innerWidth;
    if (w >= 1200) perView = 3;
    else if (w >= 900) perView = 2;
    else perView = 1;
  };

  // --- Fallback avatar (initiales en SVG) ---
  function placeholderFromInitials(name){
    const initials = String(name || '')
      .trim()
      .split(/\s+/)
      .slice(0,2)
      .map(s => s[0])
      .join('')
      .toUpperCase() || '?';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
      <rect width='100%' height='100%' rx='40' fill='#e6f7fc'/>
      <text x='50%' y='54%' font-family='Inter,Segoe UI,Arial' font-size='32' font-weight='700'
        text-anchor='middle' fill='#0aaad6'>${initials}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  const render = () => {
    track.innerHTML = '';
    const currentLangIsEN = document.querySelector('html')?.lang === 'en' ||
      document.querySelector('[data-lang="en"]')?.style?.display !== 'none' && 
      document.querySelector('[data-lang="fr"]')?.style?.display === 'none';

    const visibleLang = currentLangIsEN ? 'en' : 'fr';
    const data = items.filter(it => it.lang === visibleLang);

    data.forEach((it, i) => {
      const li = document.createElement('li');
      li.className = 'reco-card';
      li.setAttribute('role', 'group');
      li.setAttribute('aria-roledescription', 'slide');
      li.setAttribute('aria-label', `${i+1} / ${data.length}`);

      // Choix source avatar (vide => initiales)
      const avatarSrc = (it.avatar && it.avatar.trim())
        ? it.avatar
        : placeholderFromInitials(it.author);

      // Construction via template + onerror pour fallback si image cassée
      li.innerHTML = `
        <div class="reco-badge">${it.badge || (visibleLang==='fr' ? 'Recommandé' : 'Recommended')}</div>
        <p class="reco-text">${it.excerpt}</p>
        <a class="reco-readmore" href="${it.linkedin || '#'}" target="_blank" rel="noopener">
          ${visibleLang==='fr' ? 'Lire la suite' : 'Read more'}
        </a>
        <div class="reco-author">
          <img class="reco-avatar" referrerpolicy="no-referrer" src="${avatarSrc}" alt="">
          <div>
            <div class="reco-name">${it.author}</div>
            <div class="reco-meta">${it.title} · ${it.date}</div>
          </div>
        </div>
      `;

      // Si l'URL image distante échoue, on repasse aux initiales
      const imgEl = li.querySelector('.reco-avatar');
      imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = placeholderFromInitials(it.author); };

      track.appendChild(li);
    });

    buildDots(data.length);
    goTo(index); // reposition
  };

  const buildDots = (count) => {
    dotsEl.innerHTML = '';
    const totalPages = Math.max(1, Math.ceil(count / perView));
    for (let i = 0; i < totalPages; i++) {
      const b = document.createElement('button');
      b.className = 'reco-dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === Math.floor(index / perView) ? 'true' : 'false');
      b.addEventListener('click', () => {
        index = i * perView;
        goTo(index);
      });
      dotsEl.appendChild(b);
    }
  };

  const goTo = (i) => {
    const children = track.children.length;
    if (children === 0) return;

    const maxIndex = Math.max(0, children - perView);
    index = Math.min(Math.max(0, i), maxIndex);
    const percent = -(index * (100 / perView));
    track.style.transform = `translateX(${percent}%)`;

    // maj dots
    const tabs = dotsEl.querySelectorAll('.reco-dot');
    const page = Math.floor(index / perView);
    tabs.forEach((t, k) => t.setAttribute('aria-selected', k === page ? 'true' : 'false'));

    // désactiver / activer les flèches
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === maxIndex);
  };


  // nav
  prevBtn?.addEventListener('click', () => goTo(index - perView));
  nextBtn?.addEventListener('click', () => goTo(index + perView));

  // swipe (mobile)
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? goTo(index + perView) : goTo(index - perView);
    }
  });

  // resize / toggle FR-EN
  window.addEventListener('resize', () => { calcPerView(); render(); });
  // observe les changements d’affichage FR/EN
  const langObserver = new MutationObserver(() => render());
  document.querySelectorAll('[data-lang="fr"], [data-lang="en"]').forEach(n => {
    langObserver.observe(n, { attributes: true, attributeFilter: ['style'] });
  });

  // charge JSON
  const rootEl = document.querySelector('.recommendations');
  const hinted = rootEl?.dataset.json;   // priorité au data-attr
  const candidates = [
    hinted,
    '/assets/data/recommendations.json',   // absolu (si site à la racine)
    'assets/data/recommendations.json',    // relatif à la page
    '../assets/data/recommendations.json',
    '../../assets/data/recommendations.json'
  ].filter(Boolean);

  async function fetchFirst(paths){
    for (const p of paths){
      try {
        const url = new URL(p, document.baseURI).toString();
        const res = await fetch(url);
        if (!res.ok) continue;
        return await res.json();
      } catch { /* try next */ }
    }
    throw new Error('No JSON path worked');
  }

  fetchFirst(candidates)
    .then(json => { items = json; calcPerView(); render(); })
    .catch(err => { console.error('Unable to load recommendations JSON:', err); items = []; });
})();
