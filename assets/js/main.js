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

  // SP下部固定CTAバー：[data-cta-trigger]（FV／ページタイトル）を通過したら表示
  var bar = document.querySelector('.fixed-cta');
  var trigger = document.querySelector('[data-cta-trigger]');
  if (bar && trigger && 'IntersectionObserver' in window) {
    document.body.classList.add('has-fixed-cta');
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      var passed = !e.isIntersecting && e.boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', passed);
    }).observe(trigger);
  } else if (bar) {
    document.body.classList.add('has-fixed-cta');
    bar.classList.add('is-visible');
  }
})();
