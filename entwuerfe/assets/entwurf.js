/* Gemeinsames Skript aller drei Entwürfe: Mobil-Navigation und
   Einblenden beim Scrollen. Beide Varianten der Reveal-Klasse
   (.rein für A, .auf für B/C) werden bedient. */
(function () {
  'use strict';

  var schalter = document.querySelector('.nav-schalter');
  var nav = document.getElementById('hauptnav');
  if (schalter && nav) {
    schalter.addEventListener('click', function () {
      var offen = nav.classList.toggle('offen');
      schalter.setAttribute('aria-expanded', String(offen));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('offen');
        schalter.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('offen')) {
        nav.classList.remove('offen');
        schalter.setAttribute('aria-expanded', 'false');
        schalter.focus();
      }
    });
  }

  var ziele = document.querySelectorAll('.rein, .auf');
  if (!ziele.length) return;
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (ruhig || !('IntersectionObserver' in window)) {
    ziele.forEach(function (el) { el.classList.add('da'); });
    return;
  }
  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('da'); beobachter.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  ziele.forEach(function (el) { beobachter.observe(el); });
})();
