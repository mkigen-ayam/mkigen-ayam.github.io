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

  // 3) Slider ulasan pelanggan (tambah <figure class="slide"> untuk ulasan baru)
  var slider = document.getElementById('revSlider');
  var dotsBox = document.getElementById('revDots');
  if (slider && dotsBox) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var btns = document.querySelectorAll('.rev-btn');
    slides.forEach(function () { dotsBox.appendChild(document.createElement('i')); });
    var dots = Array.prototype.slice.call(dotsBox.children);

    function step() {
      return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : slider.clientWidth;
    }
    function update() {
      var i = Math.round(slider.scrollLeft / step());
      i = Math.max(0, Math.min(slides.length - 1, i));
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      var max = slider.scrollWidth - slider.clientWidth - 2;
      if (btns.length === 2) {
        btns[0].disabled = slider.scrollLeft <= 2;
        btns[1].disabled = slider.scrollLeft >= max;
      }
    }
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        slider.scrollBy({ left: step() * Number(b.getAttribute('data-dir')), behavior: 'smooth' });
      });
    });
    slider.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { slider.scrollBy({ left: step(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { slider.scrollBy({ left: -step(), behavior: 'smooth' }); }
    });
    window.addEventListener('resize', update);
    update();
  }
})();
