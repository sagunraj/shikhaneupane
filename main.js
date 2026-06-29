(function () {
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navDrawer = document.getElementById('navDrawer');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', function () {
    var isOpen = navDrawer.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navDrawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navDrawer.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var staggerGroups = [
    { parent: '.pillars-grid',  child: '.pillar' },
    { parent: '.about-aside',   child: '.aside-fact' },
    { parent: '.writing-grid',  child: '.writing-card' },
    { parent: '.civic-grid',    child: '.civic-card' },
    { parent: '.contact-cards', child: '.contact-card' },
    { parent: '.insight-list',  child: '.insight-item' },
  ];

  staggerGroups.forEach(function (g) {
    var parent = document.querySelector(g.parent);
    if (!parent) return;
    parent.querySelectorAll(g.child).forEach(function (el, i) {
      if (i === 1) el.classList.add('stagger-1');
      if (i === 2) el.classList.add('stagger-2');
      if (i === 3) el.classList.add('stagger-3');
    });
  });

  var fadeTargets = document.querySelectorAll(
    '.section-label, .section-heading, .insights-heading, .contact-heading, ' +
    '.about-text, .about-aside, .pull-quote, ' +
    '.pillar, .aside-fact, .writing-card, .work-entry, ' +
    '.insight-item, .civic-card, .contact-card'
  );

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-up');
    io.observe(el);
  });

  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('section[id], header');

  var sio = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.getAttribute('id');
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { sio.observe(s); });
}());
