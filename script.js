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
});
