
// Mobile nav controller (hero violet vs glass on scroll) + fade-in dropdown (robust)
(function(){
  function init(){
    const mnav = document.getElementById('mobile-nav');
    const toggle = document.getElementById('mnavToggle');
    const panel = document.getElementById('mnavPanel');
    if (!mnav || !toggle || !panel) return;

    function updateState(){
      try{
        const hero = document.getElementById('header') || document.getElementById('hero');
        let atTop = window.scrollY <= 12;
        if (hero) {
          const rect = hero.getBoundingClientRect();
          atTop = rect.top <= 0 ? window.scrollY < (hero.offsetHeight * 0.3) : rect.top < 12;
        }
        mnav.classList.toggle('is-hero', atTop);
        mnav.classList.toggle('is-scrolled', !atTop);
        mnav.querySelectorAll('.mnav-toggle span, #mnavToggle span').forEach(s => {
          s.style.background = atTop ? '#fff' : '#111';
        });
      }catch(e){ /* no-op */ }
    }

    function openPanel(){
      panel.hidden = false;
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      document.body.style.overflow = 'hidden';
    }
    function closePanel(){
      panel.classList.remove('is-open');
      panel.hidden = true;
      toggle.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closePanel() : openPanel();
    });

    // También escuchar touchend para móviles
    toggle.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closePanel() : openPanel();
    });

    // Close on link click
    panel.querySelectorAll('a.mnav-link').forEach(a => a.addEventListener('click', closePanel));

    // Close on ESC
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && 
          !panel.contains(e.target) && 
          !toggle.contains(e.target)) {
        closePanel();
      }
    });

    // Update state on scroll + load + resize
    ['scroll','resize'].forEach(evt => window.addEventListener(evt, updateState, {passive:true}));
    updateState();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
