(function(){
  "use strict";
  function mq(q){
    try { return !!(window.matchMedia && window.matchMedia(q).matches); }
    catch (e) { return false; }
  }
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover:hover) and (pointer:fine)');
  var raf = window.requestAnimationFrame || function(fn){ return setTimeout(fn, 16); };

  /* anno corrente nel piè di pagina */
  var anno = document.getElementById('anno');
  if (anno) anno.textContent = new Date().getFullYear();

  /* barra di avanzamento + stato della navigazione */
  var bar = document.getElementById('progress');
  var nav = document.getElementById('nav');
  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    raf(function(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      if (bar) bar.style.transform = 'scaleX(' + p + ')';
      if (nav) nav.classList.toggle('stuck', window.scrollY > 12);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* menu a scomparsa su schermi piccoli */
  var burger = document.getElementById('burger');
  if (burger && nav){
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-panel a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  /* comparsa degli elementi allo scorrimento */
  var revealables = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {rootMargin:'0px 0px -12% 0px', threshold:0.12});
    revealables.forEach(function(el){ io.observe(el); });
  } else {
    revealables.forEach(function(el){ el.classList.add('in'); });
  }

  /* ----- telefono 3D nella copertina: inclinazione + parallasse ----- */
  var phone3d = document.getElementById('phone3d');
  var hero = document.querySelector('.hero');
  var parallaxEls = document.querySelectorAll('[data-px]');
  var orb = document.getElementById('orb');
  if (hero && phone3d && fine && !reduce){
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    function loop(){
      cx += (tx - cx) * .1;
      cy += (ty - cy) * .1;
      phone3d.style.transform = 'rotateY(' + (cx * 24).toFixed(2) + 'deg) rotateX(' + (-cy * 16).toFixed(2) + 'deg) translateZ(' + (Math.abs(cx) * 24).toFixed(1) + 'px)';
      parallaxEls.forEach(function(el){
        var f = parseFloat(el.getAttribute('data-px')) || 0;
        el.style.translate = (cx * f).toFixed(1) + 'px ' + (cy * f * .6).toFixed(1) + 'px';
      });
      if (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) raf(loop);
      else running = false;
    }
    function wake(){
      if (!running){ running = true; raf(loop); }
    }
    hero.addEventListener('mousemove', function(ev){
      var r = hero.getBoundingClientRect();
      tx = (ev.clientX - r.left) / r.width - .5;
      ty = (ev.clientY - r.top) / r.height - .5;
      if (orb){
        orb.style.left = (ev.clientX - r.left) + 'px';
        orb.style.top = (ev.clientY - r.top) + 'px';
      }
      wake();
    });
    hero.addEventListener('mouseleave', function(){
      tx = 0; ty = 0;
      wake();
    });
  }

  /* ----- bottoni magnetici ----- */
  if (fine && !reduce){
    document.querySelectorAll('.magnetic').forEach(function(btn){
      btn.addEventListener('mousemove', function(ev){
        var r = btn.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - .5;
        var y = (ev.clientY - r.top) / r.height - .5;
        btn.style.transform = 'translate(' + (x * 8).toFixed(1) + 'px,' + (y * 6).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }

  /* ----- faro sotto il cursore nelle schede ----- */
  if (fine){
    document.querySelectorAll('.tile, .plan').forEach(function(card){
      card.addEventListener('mousemove', function(ev){
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }

  /* ----- disegno di ciambelle e anelli ----- */
  function drawShapes(scope){
    scope.querySelectorAll('.arc').forEach(function(c){
      var dash = c.getAttribute('data-dash');
      var off = c.getAttribute('data-offset');
      if (off) c.style.strokeDashoffset = off;
      c.style.strokeDasharray = '0 999';
      raf(function(){
        setTimeout(function(){ c.style.strokeDasharray = dash + ' 999'; }, 60);
      });
    });
    scope.querySelectorAll('.ring .val').forEach(function(c){
      var p = parseFloat(c.getAttribute('data-p')) || 0;
      var circ = 2 * Math.PI * 26;
      c.style.strokeDasharray = '0 999';
      raf(function(){
        setTimeout(function(){ c.style.strokeDasharray = (circ * p / 100).toFixed(1) + ' 999'; }, 80);
      });
    });
  }
  /* la ciambella nella copertina si disegna subito */
  document.querySelectorAll('.arc-hero').forEach(function(c){
    var off = c.getAttribute('data-offset');
    if (off) c.style.strokeDashoffset = off;
    setTimeout(function(){ c.style.strokeDasharray = c.getAttribute('data-dash') + ' 999'; }, 500);
  });

  /* ----- l'importo si digita da solo nel tastierino ----- */
  var typedEl = document.getElementById('typed');
  var typeTimer = null;
  function typeAmount(){
    if (!typedEl){ return; }
    if (reduce){ typedEl.textContent = '24,50'; return; }
    var seq = ['0,00','2,00','24,00','24,50'];
    var i = 0;
    clearInterval(typeTimer);
    typedEl.textContent = seq[0];
    typeTimer = setInterval(function(){
      i++;
      if (i >= seq.length){ clearInterval(typeTimer); return; }
      typedEl.textContent = seq[i];
    }, 380);
  }

  /* ----- la schermata del telefono segue il passaggio in lettura -----
     su computer: il blocco di testo al centro dello schermo;
     su telefono: la scheda sfogliata col dito. */
  var steps = document.querySelectorAll('.step[data-step]');
  var shots = document.querySelectorAll('.shot[data-shot]');
  var stepsWrap = document.querySelector('.steps');
  var phPrev = document.getElementById('phPrev');
  var phNext = document.getElementById('phNext');
  var curShot = 0;
  function showShot(i){
    curShot = parseInt(i, 10) || 0;
    shots.forEach(function(s){
      var on = s.getAttribute('data-shot') === String(i);
      var was = s.classList.contains('on-shot');
      s.classList.toggle('on-shot', on);
      if (on && !was){
        drawShapes(s);
        if (s.getAttribute('data-shot') === '0') typeAmount();
      }
    });
    if (phPrev) phPrev.classList.toggle('dis', curShot <= 0);
    if (phNext) phNext.classList.toggle('dis', curShot >= shots.length - 1);
  }
  /* le schede orizzontali comandano? */
  function carouselMode(){
    return stepsWrap && stepsWrap.scrollWidth > stepsWrap.clientWidth + 4;
  }
  /* salto diretto a una schermata (frecce e sfioramento) */
  function goTo(i){
    i = Math.min(Math.max(i, 0), shots.length - 1);
    showShot(i);
    if (carouselMode() && typeof stepsWrap.scrollTo === 'function'){
      var max = stepsWrap.scrollWidth - stepsWrap.clientWidth;
      try { stepsWrap.scrollTo({left: max * i / (shots.length - 1), behavior:'smooth'}); }
      catch (e) { stepsWrap.scrollLeft = max * i / (shots.length - 1); }
    }
  }
  if (phPrev) phPrev.addEventListener('click', function(){ goTo(curShot - 1); });
  if (phNext) phNext.addEventListener('click', function(){ goTo(curShot + 1); });

  /* sfioramento orizzontale direttamente sopra il telefono */
  var featPhone = document.getElementById('featPhone');
  if (featPhone && shots.length){
    var swX = null, swY = null;
    featPhone.addEventListener('touchstart', function(ev){
      if (!ev.touches || !ev.touches.length) return;
      swX = ev.touches[0].clientX;
      swY = ev.touches[0].clientY;
    }, {passive:true});
    featPhone.addEventListener('touchend', function(ev){
      if (swX === null || !ev.changedTouches || !ev.changedTouches.length) return;
      var dx = ev.changedTouches[0].clientX - swX;
      var dy = ev.changedTouches[0].clientY - swY;
      swX = swY = null;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.2) return; /* era uno scorrimento verticale */
      goTo(curShot + (dx < 0 ? 1 : -1));
    }, {passive:true});
  }
  if (steps.length && shots.length){
    if ('IntersectionObserver' in window){
      var io2 = new IntersectionObserver(function(entries){
        /* quando le schede scorrono in orizzontale comanda il carosello, non lo scorrimento della pagina */
        if (carouselMode()) return;
        entries.forEach(function(e){
          if (e.isIntersecting) showShot(e.target.getAttribute('data-step'));
        });
      }, {rootMargin:'-45% 0px -45% 0px', threshold:0});
      steps.forEach(function(s){ io2.observe(s); });
    }
    /* carosello orizzontale (si attiva solo quando le schede scorrono in orizzontale) */
    if (stepsWrap){
      var swipeTimer = null;
      stepsWrap.addEventListener('scroll', function(){
        if (!carouselMode()) return;
        clearTimeout(swipeTimer);
        swipeTimer = setTimeout(function(){
          var max = stepsWrap.scrollWidth - stepsWrap.clientWidth;
          var idx = Math.round(stepsWrap.scrollLeft / max * (steps.length - 1));
          showShot(Math.min(Math.max(idx, 0), steps.length - 1));
        }, 50);
      }, {passive:true});
    }
  }
  typeAmount();

  /* ----- la chicca: da telefono vero, quello in copertina segue l'inclinazione -----
     Usa i sensori del dispositivo (deviceorientation). Si attiva solo su touch e richiede HTTPS.
     Su Android parte da solo; su iPhone Apple esige un tocco di consenso, quindi
     compare un bottone che chiama DeviceOrientationEvent.requestPermission(). */
  if (phone3d && !fine && !reduce && 'DeviceOrientationEvent' in window){
    var gyroBase = null, gtX = 0, gtY = 0, gcX = 0, gcY = 0, gyroRunning = false;
    function gyroLoop(){
      gcX += (gtX - gcX) * .12;
      gcY += (gtY - gcY) * .12;
      phone3d.style.transform = 'rotateY(' + (gcY * 18).toFixed(2) + 'deg) rotateX(' + (-gcX * 12).toFixed(2) + 'deg)';
      if (Math.abs(gtX - gcX) > .002 || Math.abs(gtY - gcY) > .002) raf(gyroLoop);
      else gyroRunning = false;
    }
    function onOrient(e){
      if (e.beta == null || e.gamma == null) return;
      if (!gyroBase){
        gyroBase = { b: e.beta, g: e.gamma };
        phone3d.classList.add('gyro'); /* spegne l'ondeggiamento automatico */
      }
      /* il punto zero insegue lentamente la posizione media, così se cambi presa non resta storto */
      gyroBase.b += (e.beta - gyroBase.b) * .004;
      gyroBase.g += (e.gamma - gyroBase.g) * .004;
      gtY = Math.max(-1, Math.min(1, (e.gamma - gyroBase.g) / 26));
      gtX = Math.max(-1, Math.min(1, (e.beta - gyroBase.b) / 26));
      if (!gyroRunning){ gyroRunning = true; raf(gyroLoop); }
    }
    if (typeof DeviceOrientationEvent.requestPermission === 'function'){
      /* iPhone e iPad: serve il consenso con un tocco */
      var gyroBtn = document.getElementById('gyroBtn');
      if (gyroBtn){
        gyroBtn.hidden = false;
        gyroBtn.addEventListener('click', function(){
          DeviceOrientationEvent.requestPermission().then(function(stato){
            if (stato === 'granted'){
              window.addEventListener('deviceorientation', onOrient);
              gyroBtn.hidden = true;
            } else {
              gyroBtn.textContent = 'Permesso negato dal sistema';
              gyroBtn.disabled = true;
            }
          }).catch(function(){
            gyroBtn.textContent = 'Sensori non disponibili';
            gyroBtn.disabled = true;
          });
        });
      }
    } else {
      /* Android: nessun permesso richiesto, si parte subito */
      window.addEventListener('deviceorientation', onOrient);
    }
  }

  /* ----- una sola domanda aperta alla volta ----- */
  var dets = document.querySelectorAll('.faq details');
  dets.forEach(function(d){
    d.addEventListener('toggle', function(){
      if (d.open) dets.forEach(function(o){ if (o !== d) o.open = false; });
    });
  });
})();
