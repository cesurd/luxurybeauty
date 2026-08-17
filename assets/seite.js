/* Luxury Beauty by Sen – nur zwei Aufgaben: Mobil-Navigation und
   sanftes Einblenden beim Scrollen. Kein Framework, kein Tracking. */
(function () {
  'use strict';

  /* ---- Mobil-Navigation ---- */
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

  /* ---- Zwei-Klick-Karte ----
     Der Google-Maps-iframe wird erst nach ausdrücklicher Zustimmung
     eingehängt. Ohne Klick verlässt kein Byte den Browser. */
  var kartenKnopf = document.querySelector('[data-karte-laden]');
  if (kartenKnopf) {
    kartenKnopf.addEventListener('click', function () {
      var box = document.getElementById('mapbox');
      var rahmen = document.createElement('iframe');
      rahmen.title = 'Karte: Luxury Beauty by Sen, Auerberger Allee 1, 53117 Bonn';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'no-referrer-when-downgrade';
      rahmen.allowFullscreen = true;
      rahmen.src = 'https://www.google.com/maps?q=' +
        encodeURIComponent('Luxury Beauty by Sen, Auerberger Allee 1, 53117 Bonn') +
        '&hl=de&z=16&output=embed';
      box.innerHTML = '';
      box.appendChild(rahmen);
    });
  }

  /* ---- Einblenden beim Scrollen ---- */
  var ziele = document.querySelectorAll('.einblenden');
  if (!ziele.length) return;
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (ruhig || !('IntersectionObserver' in window)) {
    ziele.forEach(function (el) { el.classList.add('sichtbar'); });
    return;
  }
  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('sichtbar');
        beobachter.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  ziele.forEach(function (el) { beobachter.observe(el); });
})();
