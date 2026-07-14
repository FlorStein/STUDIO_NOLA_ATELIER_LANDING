const WEB_PROJECTS = [
  {
    title: 'LUPITA',
    desc: 'Landing demo con identidad vibrante y foco en presentar una marca con personalidad, ritmo visual y una experiencia clara para navegar.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/LUPITA/',
    repo: 'https://github.com/FlorStein/LUPITA'
  },
  {
    title: 'QUESITO',
    desc: 'Landing demo para una marca de quesos, conservas y picnics, con constructor interactivo de picadas, fotos de clientes y una identidad fresca para portfolio.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/QUESITO/',
    repo: 'https://github.com/FlorStein/QUESITO'
  },
  {
    title: 'JACINTO',
    desc: 'Landing demo con una impronta visual marcada, pensada para presentar una marca con personalidad, recorrido claro y una primera impresion memorable.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/JACINTO/',
    repo: 'https://github.com/FlorStein/JACINTO'
  },
  {
    title: 'MILO',
    desc: 'Landing demo de marca con foco en presencia visual, navegacion simple y una experiencia directa para presentar una propuesta con energia propia.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/MILO/',
    repo: 'https://github.com/FlorStein/MILO'
  },
  {
    title: 'Redes por Tefi',
    desc: 'Landing clara y directa para una propuesta de gestion de redes, pensada para convertir visitas en consultas.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://redesportefi.com/',
    repo: 'https://github.com/FlorStein/redesxtefi'
  },
  {
    title: 'CAMARODI',
    desc: 'Landing de presencia visual con foco en identidad, impacto inicial y recorrido simple para presentar una marca con caracter.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/CAMARODI/',
    repo: 'https://github.com/FlorStein/CAMARODI'
  },
  {
    title: 'Ser Magia',
    desc: 'Sitio de marca con una atmosfera sensible y envolvente, pensado para transmitir universo visual, confianza y presencia digital.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://sermagia.com/',
    repo: 'https://github.com/FlorStein/SerMagiav2'
  },
  {
    title: 'Hotel Madrid',
    desc: 'Landing de hoteleria con enfoque en atmosfera, ubicacion y conversion, pensada para presentar estadias con una lectura rapida y elegante.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/HOTELMADRID/',
    repo: 'https://github.com/FlorStein/HOTELMADRID'
  },
  {
    title: 'Leonardi Abogada',
    desc: 'Landing profesional para servicios legales, con tono sobrio, estructura clara y foco en generar confianza desde el primer contacto.',
    type: 'Landing',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/Leonardi_abogada_landingpage/',
    repo: 'https://github.com/FlorStein/Leonardi_abogada_landingpage'
  },
  {
    title: 'Design Studio Template',
    desc: 'Template creativo para estudio de diseno, armado como base visual flexible para presentar servicios, estilo y llamada a la accion.',
    type: 'Template',
    year: '2026',
    category: 'landing',
    url: 'https://florstein.github.io/design-studio-template/',
    repo: 'https://github.com/FlorStein/design-studio-template'
  },
  {
    title: 'Caro Cruz Papelera',
    desc: 'Sitio comercial para una marca papelera, con foco en catalogo, compra y una experiencia clara para clientes recurrentes.',
    type: 'Ecommerce',
    year: '2026',
    category: 'store',
    url: 'https://carocruzpapelera.com/',
    repo: 'https://github.com/FlorStein/carocruz'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioPointer();
  buildMobileShowcase();

  const sections = document.querySelectorAll('#portfolio-home, .portfolio-page');

  sections.forEach((section) => {
    buildProjectCards(section);
    const cards = Array.from(section.querySelectorAll('.portfolio-card'));
    const filters = Array.from(section.querySelectorAll('.portfolio-filter'));
    const title = section.querySelector('#portfolioActiveTitle');
    const desc = section.querySelector('#portfolioActiveDesc');
    const type = section.querySelector('#portfolioActiveType');
    const year = section.querySelector('#portfolioActiveYear');
    const count = section.querySelector('#portfolioCount');
    const frame = section.querySelector('#portfolioFrame');
    const visit = section.querySelector('#portfolioVisit');
    const browser = section.querySelector('.portfolio-browser');
    const viewportButtons = Array.from(section.querySelectorAll('.portfolio-viewport'));
    setupPreviewScale(browser);

    const activateCard = (card) => {
      cards.forEach((item) => item.classList.toggle('is-active', item === card));
      if (title) title.textContent = card.dataset.title || '';
      if (desc) desc.textContent = card.dataset.desc || '';
      if (type) type.textContent = card.dataset.type || '';
      if (year) year.textContent = card.dataset.year || '';
      if (frame && frame.getAttribute('src') !== card.dataset.url) {
        frame.src = card.dataset.url || 'about:blank';
        frame.title = `Preview interactivo de ${card.dataset.title || 'proyecto web'}`;
      }
      if (visit) visit.href = card.dataset.url || '#';
      if (count) {
        const visible = cards.filter((item) => !item.classList.contains('is-hidden'));
        const index = Math.max(visible.indexOf(card), 0) + 1;
        count.textContent = `${String(index).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
      }
    };

    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        filters.forEach((item) => {
          const isActive = item === filter;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-selected', String(isActive));
        });

        cards.forEach((card) => {
          const isVisible = category === 'all' || card.dataset.category === category;
          card.classList.toggle('is-hidden', !isVisible);
        });

        const firstVisible = cards.find((card) => !card.classList.contains('is-hidden'));
        if (firstVisible) activateCard(firstVisible);
      });
    });

    viewportButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const viewport = button.dataset.viewport || 'desktop';
        viewportButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
        if (browser) {
          browser.classList.toggle('is-mobile', viewport === 'mobile');
          browser.classList.toggle('is-desktop', viewport !== 'mobile');
          updatePreviewScale(browser);
        }
      });
    });

    cards.forEach((card) => {
      card.addEventListener('click', () => activateCard(card));
      card.addEventListener('mouseenter', () => activateCard(card));
    });

    const initial = cards.find((card) => card.classList.contains('is-active')) || cards[0];
    if (initial) activateCard(initial);
  });
});

function updatePreviewScale(browser) {
  if (!browser || browser.classList.contains('is-mobile')) return;
  const desktopWidth = 1440;
  const availableWidth = browser.clientWidth;
  const scale = Math.min(1, Math.max(0.42, availableWidth / desktopWidth));
  browser.style.setProperty('--desktop-preview-scale', scale.toFixed(4));
}

function setupPreviewScale(browser) {
  if (!browser) return;
  updatePreviewScale(browser);

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(() => updatePreviewScale(browser));
    observer.observe(browser);
    return;
  }

  window.addEventListener('resize', () => updatePreviewScale(browser));
}

function updateMobileShowcaseScale(phone) {
  if (!phone) return;
  const mobileWidth = 390;
  const scale = Math.min(1, Math.max(0.72, phone.clientWidth / mobileWidth));
  phone.style.setProperty('--mobile-preview-scale', scale.toFixed(4));
}

function setupMobileShowcaseScales() {
  const phones = Array.from(document.querySelectorAll('.portfolio-mobile-phone'));
  if (!phones.length) return;

  phones.forEach((phone) => updateMobileShowcaseScale(phone));

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => updateMobileShowcaseScale(entry.target));
    });
    phones.forEach((phone) => observer.observe(phone));
    return;
  }

  window.addEventListener('resize', () => {
    phones.forEach((phone) => updateMobileShowcaseScale(phone));
  });
}

function buildMobileShowcase() {
  const track = document.querySelector('.portfolio-mobile-track');
  if (!track || track.dataset.generated === 'true') return;

  track.innerHTML = WEB_PROJECTS.map((project, index) => `
    <article class="portfolio-mobile-card">
      <div class="portfolio-mobile-info">
        <span>${String(index + 1).padStart(2, '0')} / ${String(WEB_PROJECTS.length).padStart(2, '0')}</span>
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
      </div>
      <div class="portfolio-mobile-phone">
        <div class="portfolio-mobile-speaker" aria-hidden="true"></div>
        <iframe src="${project.url}" title="Preview mobile de ${project.title}" loading="lazy"></iframe>
      </div>
      <a class="portfolio-mobile-link" href="${project.url}" target="_blank" rel="noopener">Abrir sitio</a>
    </article>
  `).join('');

  track.dataset.generated = 'true';
  setupMobileShowcaseScales();
}

function initPortfolioPointer() {
  const portfolioArea = document.querySelector('#portfolio-home, .portfolio-page');
  if (!portfolioArea || window.matchMedia('(pointer: coarse)').matches) return;

  let pointer = document.querySelector('.portfolio-pointer');
  if (!pointer) {
    pointer = document.createElement('div');
    pointer.className = 'portfolio-pointer';
    document.body.appendChild(pointer);
  }

  const movePointer = (event) => {
    pointer.style.left = `${event.clientX}px`;
    pointer.style.top = `${event.clientY}px`;
    pointer.classList.add('is-visible');
  };

  const setActive = (event) => {
    const target = event.target.closest('a, button, .portfolio-card, iframe');
    pointer.classList.toggle('is-active', Boolean(target));
  };

  document.addEventListener('mousemove', movePointer);
  document.addEventListener('mouseover', setActive);
  document.addEventListener('mouseout', setActive);
  document.addEventListener('mouseleave', () => pointer.classList.remove('is-visible'));
}

function buildProjectCards(section) {
  const grid = section.querySelector('.portfolio-grid');
  if (!grid || grid.dataset.generated === 'true') return;

  const projects = section.classList.contains('portfolio-page')
    ? WEB_PROJECTS
    : WEB_PROJECTS.slice(0, 3);

  grid.innerHTML = projects.map((project, index) => `
    <button class="portfolio-card${index === 0 ? ' is-active' : ''}" type="button"
      data-category="${project.category}"
      data-title="${project.title}"
      data-desc="${project.desc}"
      data-type="${project.type}"
      data-year="${project.year}"
      data-url="${project.url}"
      data-repo="${project.repo}">
      <span class="portfolio-card-top">
        <span></span><span></span><span></span>
      </span>
      <strong>${project.title}</strong>
      <small>${project.type}</small>
      <span class="portfolio-card-desc">${project.desc}</span>
      <em>${project.url.replace(/^\.\/|^https?:\/\//, '')}</em>
    </button>
  `).join('');

  grid.dataset.generated = 'true';
}
