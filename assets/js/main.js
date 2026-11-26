(function () {
  // SPハンバーガーメニュー
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('sp-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
      menu.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) btn.click();
    });
  }

  // SP右下の追従CTA：[data-cta-trigger]（FV／ページタイトル）を通過したら表示。
  // ページ下部の相談欄（.cta）やフッターが見えている間は、ボタンが重複しないよう隠す
  var bar = document.querySelector('.fixed-cta');
  var trigger = document.querySelector('[data-cta-trigger]');
  if (bar && trigger && 'IntersectionObserver' in window) {
    var passed = false;
    var endVisible = {};
    var update = function () {
      var anyEnd = Object.keys(endVisible).some(function (k) { return endVisible[k]; });
      bar.classList.toggle('is-visible', passed && !anyEnd);
    };
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      passed = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    }).observe(trigger);
    var ends = document.querySelectorAll('section.cta, .site-footer');
    if (ends.length) {
      var endObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { endVisible[e.target.dataset.ctaEnd] = e.isIntersecting; });
        update();
      });
      Array.prototype.forEach.call(ends, function (el, i) {
        el.dataset.ctaEnd = String(i);
        endObserver.observe(el);
      });
    }
  } else if (bar) {
    bar.classList.add('is-visible');
  }
})();
