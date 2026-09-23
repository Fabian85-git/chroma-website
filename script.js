document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.nav-mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
    });
  }

  // Tag/Nacht Theme-Umschalter
  var THEME_KEY = 'chroma-theme';
  var themeBtns = document.querySelectorAll('.theme-btn');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'day';
  }

  function setTheme(theme, persist) {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
    } else {
      theme = 'day';
      document.documentElement.removeAttribute('data-theme');
    }
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
    themeBtns.forEach(function (btn) {
      var isActive = btn.getAttribute('data-theme-btn') === theme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    document.dispatchEvent(new CustomEvent('chroma:theme', { detail: { theme: theme } }));
  }

  themeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme-btn'), true);
    });
  });

  setTheme(getCurrentTheme(), false);

  if (window.jQuery && jQuery.fn.payrexxModal) {
    jQuery('.btn-payrexx-modal').payrexxModal();
  }

  // Bild-Karussell pro Produkt (nur aktiv, wenn mehr als 1 Bild vorhanden ist)
  document.querySelectorAll('.color-photo').forEach(function (photo) {
    var imgs = photo.querySelectorAll('.color-img');
    if (imgs.length < 2) return;

    var current = 0;
    imgs.forEach(function (img, i) {
      img.classList.toggle('active', i === current);
    });

    function goTo(index) {
      current = (index + imgs.length) % imgs.length;
      imgs.forEach(function (img, i) {
        img.classList.toggle('active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'carousel-arrow prev';
    prevBtn.setAttribute('aria-label', 'Vorheriges Bild');
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', function () { goTo(current - 1); });

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'carousel-arrow next';
    nextBtn.setAttribute('aria-label', 'Nächstes Bild');
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';
    var dots = [];
    imgs.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Bild ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    // Tag/Nacht: Karussell auf das themapassende Bild setzen
    var dayIndex = -1;
    var nightIndex = -1;
    imgs.forEach(function (img, i) {
      var def = img.getAttribute('data-theme-default');
      if (def === 'day' && dayIndex === -1) dayIndex = i;
      if (def === 'night' && nightIndex === -1) nightIndex = i;
    });

    function applyGlobalTheme(theme) {
      var idx = theme === 'night' ? nightIndex : dayIndex;
      if (idx !== -1) goTo(idx);
    }

    if (dayIndex !== -1 || nightIndex !== -1) {
      applyGlobalTheme(getCurrentTheme());
      document.addEventListener('chroma:theme', function (e) {
        applyGlobalTheme(e.detail.theme);
      });
    }

    photo.appendChild(prevBtn);
    photo.appendChild(nextBtn);
    photo.appendChild(dotsWrap);

    // Swipe-Geste fuer Touch-Geraete
    var touchStartX = 0;
    var touchStartY = 0;
    var touchActive = false;

    photo.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    }, { passive: true });

    photo.addEventListener('touchend', function (e) {
      if (!touchActive) return;
      touchActive = false;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - touchStartX;
      var dy = touch.clientY - touchStartY;
      var threshold = 40;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          goTo(current + 1);
        } else {
          goTo(current - 1);
        }
      }
    }, { passive: true });
  });
});
