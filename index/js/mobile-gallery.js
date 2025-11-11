
(function(){

  var SOURCES = ["./gallery photos/1.webp", "./gallery photos/2.webp", "./gallery photos/3.webp", "./gallery photos/4.webp", "./gallery photos/5.webp", "./gallery photos/6.webp", "./gallery photos/7.webp", "./gallery photos/8.webp", "./gallery photos/9.webp", "./gallery photos/10.webp", "./gallery photos/11.webp", "./gallery photos/12.webp", "./gallery photos/13.webp", "./gallery photos/14.webp", "./gallery photos/15.webp", "./gallery photos/16.webp", "./gallery photos/17.webp", "./gallery photos/18.webp", "./gallery photos/19.webp", "./gallery photos/20.webp"];
  var BATCH_SIZE = 20;
  var MAX_NODES = 300;

  var grid = document.getElementById('galleryGrid');
  var sentinel = document.getElementById('infiniteSentinel');
  if(!grid || !sentinel) return;

  var appended = 0;

  function nextBatch(){
    var batch = [];
    for(var i=0;i<BATCH_SIZE;i++){
      var src = SOURCES[(appended + i) % SOURCES.length];
      batch.push(src);
    }
    appended += BATCH_SIZE;
    return batch;
  }

  function renderBatch(batch){
    var frag = document.createDocumentFragment();
    var startIndex = grid.querySelectorAll('.grid-item').length;
    batch.forEach(function(src, k){
      var idx = startIndex + k;
      var btn = document.createElement('button');
      btn.className = 'grid-item';
      btn.setAttribute('data-index', String(idx));
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = 'Proyecto ' + (idx+1);
      img.src = src;
      img.addEventListener('load', function(){ img.classList.add('is-loaded'); });
      btn.appendChild(img);
      frag.appendChild(btn);
    });
    grid.appendChild(frag);

    if (grid.querySelectorAll('.grid-item').length > MAX_NODES) {
      var toRemove = Math.min(100, grid.querySelectorAll('.grid-item').length - MAX_NODES);
      for (var i=0; i<toRemove; i++) {
        var first = grid.querySelector('.grid-item');
        if (first) first.remove();
      }
    }
  }

  // Initial
  renderBatch(nextBatch());
  renderBatch(nextBatch());

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        renderBatch(nextBatch());
      }
    });
  }, { rootMargin: '800px 0px' });
  io.observe(sentinel);

  // Lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImage');
  if(!lb || !lbImg) return;

  var btnX=lb.querySelector('.lb-close'), btnP=lb.querySelector('.lb-prev'), btnN=lb.querySelector('.lb-next');
  var current = 0;

  function open(i){
    current = i;
    var el = grid.querySelector('[data-index="'+i+'"] img');
    var src = el ? el.getAttribute('src') : SOURCES[i % SOURCES.length];
    lbImg.src = src;
    lb.hidden = false;
    lb.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';
  }
  function close(){
    lb.hidden = true;
    lb.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow='';
    document.body.style.overflow='';
  }
  function prev(){ open(Math.max(0, current-1)); }
  function next(){ open(current+1); }

  grid.addEventListener('click', function(e){
    var b = e.target.closest('.grid-item'); if(!b) return;
    var i = parseInt(b.getAttribute('data-index'),10)||0; open(i);
  });
  if(btnX) btnX.addEventListener('click', close);
  if(btnP) btnP.addEventListener('click', prev);
  if(btnN) btnN.addEventListener('click', next);
  lb.addEventListener('click', function(e){ if(e.target===lb) close(); });

  window.addEventListener('keydown', function(e){
    if(lb.hidden) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') prev();
    if(e.key==='ArrowRight') next();
  });

  var sx=0, sy=0;
  lb.addEventListener('touchstart', function(e){ var t=e.changedTouches[0]; sx=t.clientX; sy=t.clientY; }, {passive:true});
  lb.addEventListener('touchend', function(e){
    var t=e.changedTouches[0];
    var dx=t.clientX - sx, dy=t.clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { dx<0 ? next() : prev(); }
    else if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) { close(); }
  }, {passive:true});

})();
