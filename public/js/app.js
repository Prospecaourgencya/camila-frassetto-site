/* Interações do site — reveal on scroll, ticker, parallax, navbar.
   Servido estático (CSP script-src 'self').
   Robusto à hidratação do React: quando o React recria o conteúdo do
   #site-root, um MutationObserver re-anexa os observers aos nós novos. */
(function () {
  var scrollBound = false;
  var px = [];

  function setupReveal() {
    var els = document.querySelectorAll('.cx-rise');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
  }

  function safetyNet() {
    document.querySelectorAll('.cx-rise:not(.in)').forEach(function (e) {
      var r = e.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.15) e.classList.add('in');
    });
  }

  function ticker() {
    var mq = document.getElementById('cxticker');
    if (!mq || mq.dataset.filled) return;
    var items = ['Atendimento particular', 'Terapia de casal', 'Terapia individual', '<b>Presencial em Piracicaba &amp; Online</b>', 'Agenda limitada', 'Sigilo profissional', 'Acompanhamento contínuo', 'Nota fiscal para reembolso'];
    var unit = items.map(function (t) { return '<span>' + t + ' <i>&#10022;</i></span>'; }).join('');
    mq.innerHTML = unit + unit;
    mq.dataset.filled = '1';
  }

  function onScroll() {
    var vh = window.innerHeight;
    px.forEach(function (el) {
      var box = el.parentElement && el.parentElement.parentElement;
      if (!box) return;
      var r = box.getBoundingClientRect();
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translateY(' + (p * parseFloat(el.dataset.parallax || '0') * 100) + 'px)';
    });
  }

  function bindScrollOnce() {
    if (scrollBound) return;
    scrollBound = true;
    window.addEventListener('scroll', function () { onScroll(); safetyNet(); }, { passive: true });
  }

  function initNavbar() {
    var bar = document.querySelector('.topbar');
    if (!bar || bar.dataset.bound) return;
    bar.dataset.bound = '1';
    var f = function () { bar.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', f, { passive: true });
    f();
  }

  function run() {
    ticker();
    px = document.querySelectorAll('[data-parallax]');
    setupReveal();
    initNavbar();
    bindScrollOnce();
    onScroll();
    safetyNet();
  }

  run();

  // Re-anexa quando o React recriar o conteúdo (hidratação).
  var root = document.getElementById('site-root');
  if (root && 'MutationObserver' in window) {
    var mo = new MutationObserver(function () { run(); });
    mo.observe(root, { childList: true });
    setTimeout(function () { mo.disconnect(); }, 6000);
  }

  window.addEventListener('load', function () {
    setTimeout(run, 80);
    setTimeout(safetyNet, 500);
  });
})();
