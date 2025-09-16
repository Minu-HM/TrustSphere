/* ------------------ UI Animations (anime.js) ------------------ */

// animate balance counter when dashboard opens
function animateBalanceCounter() {
  const el = document.getElementById('balanceAmount');
  if (!el) return;
  const start = 0;
  const end = currentBalance || 0;
  anime({
    targets: { val: start },
    val: end,
    round: 2,
    duration: 1000,
    easing: 'easeOutCubic',
    update(anim) {
      const v = anim.animations[0].currentValue;
      // keep two decimals:
      el.textContent = Number(v).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
  });
}

// ripple effect helper for buttons
function attachRipples() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// logo particle subtle float (using anime)
function animateLogoParticles() {
  const particles = document.querySelectorAll('.logo-particles span');
  if (!particles.length) return;
  particles.forEach((p, i) => {
    anime({
      targets: p,
      translateY: [-8, -28, -8],
      translateX: [0, (i % 2 === 0 ? -8 : 8), 0],
      opacity: [0, 1, 0],
      duration: 2000 + i * 300,
      delay: i * 120,
      loop: true,
      easing: 'easeInOutSine'
    });
  });
}

// reveal on scroll
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.section-card, .balance-card, .section-header, .features-grid .feature-card');
  function reveal() {
    const viewHeight = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all .6s cubic-bezier(.2,.9,.25,1)';
      } else {
        el.style.opacity = 0;
        el.style.transform = 'translateY(18px)';
      }
    });
  }
  reveal();
  window.addEventListener('scroll', reveal);
  window.addEventListener('resize', reveal);
}

// call animations in initializeApp to run on load/dashboard open
(function uiInit() {
  // attach ripples to buttons
  attachRipples();
  // animate logo parts
  animateLogoParticles();
  // reveal sections on scroll
  setupScrollReveal();

  // animate balance when dashboard visible — watch for page activation
  const obs = new MutationObserver(() => {
    if (dashboardPage.classList.contains('active')) {
      animateBalanceCounter();
    }
  });
  obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // also animate immediately if already visible on load
  if (dashboardPage.classList.contains('active')) {
    animateBalanceCounter();
  }
})();
