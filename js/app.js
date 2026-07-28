/* ═══════════════════════════════════════════════════════════
   TAROT PORTFOLIO — Animation & Interaction Engine
   GSAP + ScrollTrigger + Lenis
   ═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── Config ────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '917453895770';
const INTRO_DURATION = 2000;

/* ─── State ─────────────────────────────────────────────── */
let lenis;
let introComplete = false;

/* ═══════════════════════════════════════════════════════════
   LENIS SMOOTH SCROLL
   ═══════════════════════════════════════════════════════════ */
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* ═══════════════════════════════════════════════════════════
   INTRO OVERLAY
   ═══════════════════════════════════════════════════════════ */
function initIntro() {
  const overlay = document.getElementById('intro-overlay');
  const lines = document.querySelectorAll('.intro-line');
  const progressBar = document.getElementById('intro-progress-bar');
  const particles = document.getElementById('intro-particles');

  // Create floating particles
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('intro-particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 40 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    particles.appendChild(p);
  }

  // Intro timeline
  const tl = gsap.timeline();

  tl.to(lines, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.2,
  });

  // Progress bar animation
  gsap.to(progressBar, {
    width: '100%',
    duration: 1.5,
    ease: 'none',
    delay: 0.2,
  });

  // Fade out after duration
  setTimeout(() => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.style.display = 'none';
        introComplete = true;
        document.getElementById('navbar').classList.add('visible');
        initHeroAnimations();
        ScrollTrigger.refresh();
      }
    });
  }, INTRO_DURATION);
}

/* ═══════════════════════════════════════════════════════════
   HERO ANIMATIONS
   ═══════════════════════════════════════════════════════════ */
function initHeroAnimations() {
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero-label', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.h-line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.5')
    .to('.hero-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-scroll-indicator', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3')
    .to('.card-1', { opacity: 1, rotation: -8, x: 0, y: 0, duration: 1.2, ease: 'power3.out' }, 0.2)
    .to('.card-2', { opacity: 1, rotation: 5, x: 0, y: 0, duration: 1.2, ease: 'power3.out' }, 0.35)
    .to('.card-3', { opacity: 1, rotation: -3, x: 0, y: 0, duration: 1.2, ease: 'power3.out' }, 0.5)
    .to('.card-4', { opacity: 1, rotation: 7, x: 0, y: 0, duration: 1.2, ease: 'power3.out' }, 0.65);

  // Hero parallax on scroll
  gsap.to('.hero-left', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -80,
    opacity: 0,
  });

  gsap.to('.hero-right', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -40,
    scale: 0.95,
    opacity: 0,
  });

  // Floating cards animation
  gsap.to('.card-1', {
    y: -12,
    rotation: -10,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
  gsap.to('.card-2', {
    y: -8,
    rotation: 7,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5,
  });
  gsap.to('.card-3', {
    y: -15,
    rotation: -5,
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1,
  });
  gsap.to('.card-4', {
    y: -10,
    rotation: 9,
    duration: 5.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.5,
  });

  // Moon particles
  createMoonParticles();
}

/* ═══════════════════════════════════════════════════════════
   MOON PARTICLES
   ═══════════════════════════════════════════════════════════ */
function createMoonParticles() {
  const container = document.getElementById('moon-particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('moon-particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    container.appendChild(p);

    gsap.to(p, {
      opacity: 0.5,
      duration: 2 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
    });

    gsap.to(p, {
      y: -(20 + Math.random() * 60),
      x: (Math.random() - 0.5) * 40,
      duration: 6 + Math.random() * 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 4,
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('[data-mobile-nav]').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
      menuToggle.click();
    }
  });

  // Smooth scroll for all nav links
  document.querySelectorAll('[data-nav], [data-mobile-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });
  });

  // Service cards
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // About image reveal (mask)
  gsap.to('.about-image-mask', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power4.inOut',
  });

  // About content reveal
  gsap.from('.about-content', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 65%',
      toggleActions: 'play none none none',
    },
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3,
  });

  // About stats
  gsap.from('.about-stat', {
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
  });

  // Process steps
  const processSteps = gsap.utils.toArray('.process-step');
  const processLine = document.getElementById('process-line');

  processSteps.forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => step.classList.add('active'),
      },
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.15,
    });
  });

  // Process line animation
  if (processLine) {
    ScrollTrigger.create({
      trigger: '.process-timeline',
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1,
      onUpdate: (self) => {
        processLine.style.height = (self.progress * 100) + '%';
      },
    });
  }

  // Contact links
  gsap.utils.toArray('.contact-link-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      x: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out',
    });
  });

  // Booking section
  gsap.from('.booking-left', {
    scrollTrigger: {
      trigger: '#booking',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.booking-right', {
    scrollTrigger: {
      trigger: '#booking',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
  });

  // FAQ items
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out',
    });
  });

  // Footer
  gsap.from('.footer-top', {
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
}

/* ═══════════════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════════════ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   FORM HANDLING
   ═══════════════════════════════════════════════════════════ */
function initForms() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // Format date
    let formattedDate = data.date || '';
    if (data.date) {
      const d = new Date(data.date);
      formattedDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    // Format time
    let formattedTime = data.time || '';
    if (data.time) {
      const [h, m] = data.time.split(':');
      const hour = parseInt(h);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const h12 = hour % 12 || 12;
      formattedTime = `${h12}:${m} ${ampm}`;
    }

    // Build WhatsApp message
    const whatsappMsg = encodeURIComponent(
      `Hello,\n\nMy name is ${data.name}.\n\nI would like a Tarot Reading.\n\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Reason: ${data.reason}\n` +
      `Preferred Date: ${formattedDate}\n` +
      `Preferred Time: ${formattedTime}\n` +
      (data.message ? `Message: ${data.message}\n` : '')
    );

    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, '_blank');

    // Show success modal
    showModal(
      'Enquiry Sent!',
      'Your booking request has been sent via WhatsApp. You\'ll receive a confirmation within 24 hours.'
    );

    form.reset();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════ */
function showModal(title, text) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-text').textContent = text;
  document.getElementById('success-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('success-modal').classList.remove('active');
}

window.closeModal = closeModal;

/* ═══════════════════════════════════════════════════════════
   MOUSE PARALLAX (Hero)
   ═══════════════════════════════════════════════════════════ */
function initMouseParallax() {
  const composition = document.getElementById('tarot-composition');
  if (!composition) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const cards = composition.querySelectorAll('.tarot-card');
    cards.forEach((card, i) => {
      const depth = (i + 1) * 6;
      card.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════════════════════════════════
   SOUND TOGGLE (placeholder)
   ═══════════════════════════════════════════════════════════ */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    // Placeholder: in production, toggle ambient audio here
  });
}

/* ═══════════════════════════════════════════════════════════
   DUPLICATE TESTIMONIALS for infinite scroll
   ═══════════════════════════════════════════════════════════ */
function initTestimonialsLoop() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  // Clone all cards for seamless loop
  const cards = track.innerHTML;
  track.innerHTML = cards + cards;
}

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initIntro();
  initNavigation();
  initScrollAnimations();
  initFAQ();
  initForms();
  initMouseParallax();
  initSoundToggle();
  initTestimonialsLoop();
});
