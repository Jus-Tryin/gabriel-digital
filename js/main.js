(function () {
  'use strict';

  /* ---------- Lightbox ---------- */
  var modal   = document.getElementById('lightboxModal');
  var modalImg = document.getElementById('lightboxImg');
  var modalCap = document.getElementById('lightboxCaption');
  var hideTimer = null;

  window.openLightbox = function (src, caption, origin) {
    clearTimeout(hideTimer);                     // interruptible: cancel a pending close
    modalImg.src = src;
    modalCap.textContent = caption || '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';     // page behind must not scroll

    if (origin && origin.getBoundingClientRect && modalImg.offsetWidth > 0) {
      var r  = origin.getBoundingClientRect();
      var ox = r.left + r.width  / 2 - modalImg.offsetLeft;
      var oy = r.top  + r.height / 2 - modalImg.offsetTop;
      modalImg.style.transformOrigin = ox + 'px ' + oy + 'px';
    } else {
      modalImg.style.transformOrigin = '50% 50%';
    }
    void modal.offsetWidth;                      // commit start state, then animate
    modal.classList.add('is-open');
  };

  window.closeLightbox = function () {
    modal.classList.remove('is-open');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }, 280);
  };

  modal.addEventListener('click', function (e) {
    if (e.target === modal) window.closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      window.closeLightbox();
    }
  });

  /* ---------- Scroll reveal ---------- */
  try {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var selectors = [
      '#services .section-head', '#services .grid > div',
      '#packages .section-head', '#packages .grid > div',
      '#offer .section-head',    '#offer .offer-card',
      '#portfolio .section-head','#portfolio .grid > div',
      '#contact .cta-inner'
    ];

    var items = [];
    selectors.forEach(function (sel) {
      var list = document.querySelectorAll(sel);
      for (var i = 0; i < list.length; i++) {
        items.push({ el: list[i], delay: (i % 3) * 80 });
      }
    });
    if (!items.length) return;

    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        el.classList.add('in');
        setTimeout(function () {                 // hand back to normal styles
          el.classList.remove('reveal', 'in');
          el.style.transitionDelay = '';
        }, 900);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (it) {
      it.el.classList.add('reveal');
      it.el.style.transitionDelay = it.delay + 'ms';
      io.observe(it.el);
    });
  } catch (err) {
    document.documentElement.classList.remove('js-reveal');
  }
})();
