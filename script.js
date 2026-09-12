document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.nav-mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
    });
  }

  var introPhoto = document.querySelector('.intro-photo-hover');
  if (introPhoto) {
    introPhoto.addEventListener('click', function () {
      introPhoto.classList.toggle('day-active');
    });
  }

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

    photo.appendChild(prevBtn);
    photo.appendChild(nextBtn);
    photo.appendChild(dotsWrap);
  });
});
