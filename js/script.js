// MKI Generation Enterprise – script.js
(function () {
  'use strict';

  // 1) Bayang pada menu atas bila skrol
  var bar = document.querySelector('.bar');
  function onScroll() {
    if (!bar) return;
    bar.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2) Serlahkan pautan menu mengikut bahagian yang sedang dilihat
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href')] = a; });
  var targets = ['#perkhidmatan', '#penghantaran', '#hubungi']
    .map(function (id) { return document.querySelector(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map['#' + e.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
