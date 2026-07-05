// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.cssText += open ? '' : 'position:absolute; top:100%; left:0; right:0; background:#fff; flex-direction:column; padding:10px 32px; border-bottom:1px solid #e5e5e5;';
    });
  }

  // Hero slider (home page only)
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('sliderDots');
  if (slides.length && dotsWrap) {
    let current = 0;
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.textContent = String(i + 1).padStart(2, '0');
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(b);
    });
    function showSlide(i) {
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }
    setInterval(() => showSlide((current + 1) % slides.length), 5500);
  }

  // Tilt-on-hover for cards
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Counter animation
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          let startTs = null;
          const duration = 1200;
          function step(ts) {
            if (!startTs) startTs = ts;
            const progress = Math.min((ts - startTs) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }
          requestAnimationFrame(step);
          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => counterIO.observe(el));
  }

  // Client marquee
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const clientNames = [
      "Horizon Sourcing", "Trimstech Packaging", "Atlas Honda", "Krystalite Products", "Novatex BOPET Plant",
      "Reckitt & Benckiser", "Printech Packages", "Feroze 1888", "Alkaram Textile Mills", "Ismail Industries",
      "Artistic Fabrics & Garments", "Plasticon Engineering", "Modern Techno Engineering", "Gumcorp",
      "Swift Textile Nooriabad", "Allied Material", "Pakitex Boards", "Nando's Pakistan", "National Stadium Karachi",
      "Nueplex Cinema", "Bank Islami", "Meezan Bank", "Iqra University", "Costa Coffee"
    ];
    track.innerHTML = clientNames.concat(clientNames).map(c => `<div class="client-pill">${c}</div>`).join('');
  }

  // Projects tabs (industrial / commercial)
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });
  }
});
