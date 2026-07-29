/* ═══════════════════════════════════════════════════════════
   TAROT PORTFOLIO — Pricing Page Engine
   GSAP + ScrollTrigger + Lenis
   ═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '917453895770';
let lenis;

/* ═══ LENIS SMOOTH SCROLL ═══════════════════════════════ */
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ═══ HERO ANIMATIONS ═══════════════════════════════════ */
function initHero() {
  const particles = document.querySelector('.hero-particles');
  if (particles) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.classList.add('hero-particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = Math.random() * 50 + '%';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.animationDuration = (7 + Math.random() * 8) + 's';
      p.style.width = (1 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      particles.appendChild(p);
    }
  }

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.hero-label', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-title .line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.5')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-range', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to('.hero-scroll', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.2');

  gsap.to('.hero-content', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: -80, opacity: 0,
  });
}

/* ═══ NAVIGATION ════════════════════════════════════════ */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('[data-mobile-nav]').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('[data-nav], [data-mobile-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) lenis.scrollTo(target, { offset: -80 });
    });
  });
}

/* ═══ SCROLL ANIMATIONS ════════════════════════════════ */
function initScrollAnimations() {
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reading-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.7, delay: (i % 4) * 0.08, ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.combo-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      y: 60, opacity: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.session-group').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
      x: i % 2 === 0 ? -50 : 50, opacity: 0, duration: 0.9, ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.subscription-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
    });
  });

  gsap.from('.cta-content', {
    scrollTrigger: { trigger: '#cta', start: 'top 70%', toggleActions: 'play none none none' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out',
  });

  gsap.from('.footer-top', {
    scrollTrigger: { trigger: '#footer', start: 'top 90%', toggleActions: 'play none none none' },
    y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
  });
}

/* ═══ INIT ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initHero();
  initNavigation();
  initScrollAnimations();
});

/* ═══════════════════════════════════════════
   BOOKING MODAL LOGIC
   ═══════════════════════════════════════════ */
(function() {
  const WHATSAPP = '917453895770';
  const IG_HANDLE = 'tarotuniverse._';
  const INSTAGRAM_RETURN_STATE = 'tarotuniverse.instagramBooking';
  const URGENT_FEE_INR = 100;
  const URGENT_FEE_USD = 4.44;

  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.booking-backdrop');
  const panel = modal.querySelector('.booking-panel');
  const closeBtn = modal.querySelector('.booking-close');
  const nameEl = document.getElementById('modal-service-name');
  const priceEl = document.getElementById('modal-price');
  const totalEl = document.getElementById('modal-total');
  const urgentToggle = document.getElementById('urgent-toggle');
  const nameInput = document.getElementById('booking-name');
  const noteInput = document.getElementById('booking-note');
  const waBtn = document.getElementById('send-whatsapp');
  const igBtn = document.getElementById('send-instagram');
  const notice = document.getElementById('booking-notice');

  let currentName = '';
  let currentInr = '';
  let currentUsd = '';
  let urgent = false;

  function parsePrice(str) {
    if (!str) return 0;
    const clean = str.replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  }

  function updateTotal() {
    const baseInr = parsePrice(currentInr);
    const baseUsd = parsePrice(currentUsd);
    const totalInr = urgent ? baseInr + URGENT_FEE_INR : baseInr;
    const totalUsd = urgent ? baseUsd + URGENT_FEE_USD : baseUsd;
    totalEl.textContent = `₹${totalInr.toLocaleString('en-IN')} / $${totalUsd.toFixed(2)}`;
  }

  function openModal(name, inr, usd) {
    currentName = name;
    currentInr = inr;
    currentUsd = usd;
    urgent = false;
    urgentToggle.setAttribute('aria-pressed', 'false');
    nameEl.textContent = name;
    priceEl.textContent = `${inr} / ${usd}`;
    updateTotal();
    nameInput.value = '';
    noteInput.value = '';
    notice.textContent = '';
    notice.className = 'booking-notice';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => nameInput.focus(), 400);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    sessionStorage.removeItem(INSTAGRAM_RETURN_STATE);
  }

  function buildMessage() {
    const userName = nameInput.value.trim() || 'A seeker';
    const note = noteInput.value.trim();
    const baseInr = parsePrice(currentInr);
    const baseUsd = parsePrice(currentUsd);
    const totalInr = urgent ? baseInr + URGENT_FEE_INR : baseInr;
    const totalUsd = urgent ? baseUsd + URGENT_FEE_USD : baseUsd;

    let msg = `Hi! I'd like to book a reading.\n\n`;
    msg += `Service: ${currentName}\n`;
    msg += `Price: ₹${totalInr.toLocaleString('en-IN')} / $${totalUsd.toFixed(2)}`;
    if (urgent) msg += ` (Urgent)`;
    msg += `\nName: ${userName}`;
    if (note) msg += `\nNote: ${note}`;
    return msg;
  }

  async function copyEnquiry(message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(message);
        return true;
      } catch (error) {
        // Fall back below for browsers that deny the Clipboard API.
      }
    }

    const fallback = document.createElement('textarea');
    fallback.value = message;
    fallback.setAttribute('readonly', '');
    fallback.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand('copy');
    fallback.remove();
    return copied;
  }

  function saveInstagramReturnState() {
    const state = {
      service: currentName,
      inr: currentInr,
      usd: currentUsd,
      urgent,
      name: nameInput.value,
      note: noteInput.value,
      scrollY: window.scrollY,
    };
    sessionStorage.setItem(INSTAGRAM_RETURN_STATE, JSON.stringify(state));
  }

  function restoreInstagramReturnState() {
    const saved = sessionStorage.getItem(INSTAGRAM_RETURN_STATE);
    if (!saved) return;

    try {
      const state = JSON.parse(saved);
      if (!state.service) return;
      openModal(state.service, state.inr, state.usd);
      urgent = Boolean(state.urgent);
      urgentToggle.setAttribute('aria-pressed', String(urgent));
      updateTotal();
      nameInput.value = state.name || '';
      noteInput.value = state.note || '';
      notice.textContent = 'Your enquiry is still copied and ready to paste in Instagram.';
      notice.className = 'booking-notice success';
      requestAnimationFrame(() => window.scrollTo(0, state.scrollY || 0));
    } catch (error) {
      sessionStorage.removeItem(INSTAGRAM_RETURN_STATE);
    }
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  urgentToggle.addEventListener('click', () => {
    urgent = !urgent;
    urgentToggle.setAttribute('aria-pressed', urgent.toString());
    updateTotal();
  });

  waBtn.addEventListener('click', () => {
    if (!nameInput.value.trim()) {
      nameInput.focus();
      notice.textContent = 'Please enter your name.';
      notice.className = 'booking-notice error';
      return;
    }
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    notice.textContent = 'Opening WhatsApp...';
    notice.className = 'booking-notice success';
    setTimeout(closeModal, 2000);
  });

  igBtn.addEventListener('click', () => {
    if (!nameInput.value.trim()) {
      nameInput.focus();
      notice.textContent = 'Please enter your name.';
      notice.className = 'booking-notice error';
      return;
    }
    const msg = buildMessage();
    // Instagram does not allow websites to prefill a DM. Its universal link
    // opens the installed Instagram app on mobile devices. Save the modal
    // state first so a visitor can return to the same completed enquiry.
    notice.textContent = 'Copying your enquiry and opening Instagram…';
    notice.className = 'booking-notice';

    copyEnquiry(msg).then((copied) => {
      saveInstagramReturnState();
      window.location.assign(`https://ig.me/m/${encodeURIComponent(IG_HANDLE)}`);
      notice.textContent = copied
        ? 'Your enquiry is copied. Opening the Instagram app…'
        : 'Opening Instagram. Please copy your enquiry details before sending your message.';
      notice.className = copied ? 'booking-notice success' : 'booking-notice error';
    });
  });

  // Card click handlers
  document.querySelectorAll('[data-name]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const name = card.getAttribute('data-name');
      const inr = card.getAttribute('data-price-inr');
      const usd = card.getAttribute('data-price-usd');
      if (name) openModal(name, inr, usd);
    });
  });

  restoreInstagramReturnState();
})();
