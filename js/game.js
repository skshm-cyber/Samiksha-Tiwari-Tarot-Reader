/* ═══════════════════════════════════════════════════════════
   TAROT PORTFOLIO — The Daily Draw Engine
   Cinematic deck interaction · GSAP · 22 Major Arcana
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DESKTOP = window.matchMedia('(min-width: 900px)').matches;
  const D = (n) => (REDUCED ? Math.min(n * 0.25, 0.5) : n);

  /* ═══════════════════════════════════════════════════════════
     THE 22 MAJOR ARCANA
     ═══════════════════════════════════════════════════════════ */
  const MAJOR_ARCANA = [
    { id: 'the-fool', num: '0', name: 'The Fool', keywords: 'New beginnings · Innocence · A leap of faith', emblem: 'moon', interest: 'direction',
      reading: 'The Fool steps forward without a map, trusting that the path will reveal itself. This card asks where in your life you have been holding back out of fear, and what might open if you allowed yourself to begin. The first step rarely needs a full plan — only willingness. What would you do if you trusted the beginning as much as the ending? The Fool reminds you that every master was once a beginner, and that curiosity, not certainty, is what moves you forward.' },
    { id: 'the-magician', num: 'I', name: 'The Magician', keywords: 'Manifestation · Willpower · Creation', emblem: 'star', interest: 'career',
      reading: 'The Magician stands between what is and what could be, holding all the tools you already possess. This card invites you to look at your situation and notice what you have been underestimating — your skills, your voice, your ability to act. Nothing here is promised, but the energy suggests that your focus can shape your direction. What is one deliberate step you could take this week? Small, intentional actions, repeated, are how a vision begins to take form.' },
    { id: 'the-high-priestess', num: 'II', name: 'The High Priestess', keywords: 'Intuition · Mystery · Inner knowing', emblem: 'moon', interest: 'healing',
      reading: 'The High Priestess sits at the threshold between what is spoken and what is felt. She asks you to quiet the noise around you and listen to what you already know but have not said out loud. The answer you are searching for may not arrive as a dramatic sign, but as a quiet certainty that grows each time you trust it. What does your inner voice keep repeating? Give yourself permission to honour it — even before you fully understand it.' },
    { id: 'the-empress', num: 'III', name: 'The Empress', keywords: 'Abundance · Nurture · Growth', emblem: 'sun', interest: 'love',
      reading: 'The Empress reminds you that everything grows at its own pace. In a world that rushes, she asks what needs your patience and care right now — a project, a relationship, or simply yourself. Nurture is not weakness; it is the quiet force behind all lasting growth. What would change if you treated your situation with the gentleness you offer others? Tend to the roots, and trust that what is meant to bloom will bloom.' },
    { id: 'the-emperor', num: 'IV', name: 'The Emperor', keywords: 'Structure · Authority · Steadiness', emblem: 'sun', interest: 'career',
      reading: 'The Emperor represents the strength that comes from clear boundaries and calm decisions. He asks you to examine where your life lacks structure, and where a firm but fair hand is needed. You do not need to control everything — only to stand steady in what you value. What one decision, once made, would bring relief? Stability is not built in a day, but it begins the moment you choose order over chaos.' },
    { id: 'the-hierophant', num: 'V', name: 'The Hierophant', keywords: 'Tradition · Guidance · Belief', emblem: 'moon', interest: 'direction',
      reading: 'The Hierophant appears when you are searching for meaning in the familiar. He points to the teachers, traditions, and inner beliefs that have shaped you — and asks which of them still serve your growth. Wisdom can come from unexpected sources; remain open to the guidance of those who have walked before you. What belief are you ready to examine more closely? Your relationship with your own values is worth your deepest attention.' },
    { id: 'the-lovers', num: 'VI', name: 'The Lovers', keywords: 'Love · Choice · Alignment', emblem: 'star', interest: 'love',
      reading: 'The Lovers speak of the choices that shape us — in love, and in every connection that matters. This card asks you to consider what you truly value, and whether your actions align with it. No choice is without cost, but the right one often feels like coming home to yourself. What would alignment look like in your current situation? Listen to what your heart already knows beneath the doubt.' },
    { id: 'the-chariot', num: 'VII', name: 'The Chariot', keywords: 'Determination · Momentum · Will', emblem: 'sun', interest: 'career',
      reading: 'The Chariot moves forward because its focus is unwavering. You may have more strength and momentum than you realise — the question is whether your energy is being pointed where you actually want to go. This card invites you to steer rather than stall. What outcome would you work toward if you believed you could reach it? Determination is quiet; it simply keeps moving, one steady pull at a time.' },
    { id: 'strength', num: 'VIII', name: 'Strength', keywords: 'Courage · Gentleness · Inner power', emblem: 'moon', interest: 'love',
      reading: 'Strength does not roar; it soothes. This card shows that true power is found in patience, tenderness, and the courage to stay gentle with what is difficult. Whatever feels overwhelming right now may soften when met with calm intention rather than force. What would it look like to lead with compassion — toward yourself first? Your softness is not a weakness; it is precisely what carries you through.' },
    { id: 'the-hermit', num: 'IX', name: 'The Hermit', keywords: 'Solitude · Reflection · Inner light', emblem: 'moon', interest: 'healing',
      reading: 'The Hermit carries a lantern into the quiet, not to hide, but to see more clearly. This card invites you to step back from the noise and ask what your situation looks like when no one else is watching. Some answers only arrive in stillness. What have you been too busy to hear? Time alone is not withdrawal — it is preparation. Let the quiet show you what the crowd cannot.' },
    { id: 'wheel-of-fortune', num: 'X', name: 'Wheel of Fortune', keywords: 'Cycles · Change · Opportunity', emblem: 'world', interest: 'career',
      reading: 'The Wheel reminds you that change is the one constant — and that what turns away will eventually turn toward you. This card speaks to the natural cycles in your situation, encouraging you to release the illusion that a season lasts forever. What could you make space for, knowing that nothing stays the same? Ride the turning with trust rather than resistance, and remain open to the direction the wheel is taking you.' },
    { id: 'justice', num: 'XI', name: 'Justice', keywords: 'Balance · Truth · Accountability', emblem: 'star', interest: 'direction',
      reading: 'Justice weighs both sides with a steady hand. It asks you to be honest with yourself — about what you have given, what you have received, and what still needs to be said. Truth, spoken gently, has a way of restoring balance. What have you been avoiding that deserves your honesty? Clarity is not always comfortable, but it is almost always freeing. Choose fairness for yourself as carefully as you would for another.' },
    { id: 'the-hanged-man', num: 'XII', name: 'The Hanged Man', keywords: 'Surrender · Perspective · Pause', emblem: 'moon', interest: 'healing',
      reading: 'The Hanged Man hangs not in defeat, but in choice — choosing to see the world from a new angle. This card arrives when pushing harder has stopped working, and the answer lies in releasing control. What might shift if you paused instead of rushed, surrendered instead of forced? The pause you resist may be exactly what you need. From stillness comes the perspective that effort alone could not give you.' },
    { id: 'death', num: 'XIII', name: 'Death', keywords: 'Transformation · Endings · Rebirth', emblem: 'moon', interest: 'healing',
      reading: 'Death in tarot rarely means loss; it means release. This card honours the endings that make room for renewal — habits, situations, or identities that have fulfilled their purpose. What are you ready to let go of, even if it is familiar? The closing of one chapter is the quiet beginning of another. Change asks only for your consent, and your willingness to move through it with grace.' },
    { id: 'temperance', num: 'XIV', name: 'Temperance', keywords: 'Balance · Patience · Harmony', emblem: 'world', interest: 'healing',
      reading: 'Temperance blends two streams into one, teaching that healing is rarely dramatic — it is gradual and gentle. This card encourages patience with yourself and your process, and trust in the middle path. You do not need to resolve everything at once. What would harmony look like in your daily rhythm? Slow, steady integration often brings more peace than grand gestures ever could.' },
    { id: 'the-devil', num: 'XV', name: 'The Devil', keywords: 'Attachment · Shadows · Freedom', emblem: 'moon', interest: 'love',
      reading: 'The Devil invites you to look honestly at what binds you — a habit, a fear, or a story you have told yourself for too long. The chains in this card are loose enough to slip off; they hold only because we believe they do. What would you do if you believed you were free? Awareness itself is the first step. Your shadows are not your destiny; they are material for your liberation.' },
    { id: 'the-tower', num: 'XVI', name: 'The Tower', keywords: 'Sudden change · Awakening · Release', emblem: 'star', interest: 'direction',
      reading: 'The Tower shakes what was built on uncertain ground — not to destroy you, but to reveal what was never truly stable. This card often arrives with a sense of upheaval, yet it clears space for something more honest. What structure in your life might need to fall so something real can rise? Unexpected change, however uncomfortable, is sometimes the only path to truth. Let what crumbles make room for what lasts.' },
    { id: 'the-star', num: 'XVII', name: 'The Star', keywords: 'Hope · Renewal · Possibility', emblem: 'star', interest: 'healing',
      reading: 'The Star shines after the storm, a reminder that healing often follows difficulty. This card asks you to look beyond your current struggle and hold onto what you are quietly hoping for. Hope is not naive — it is the soil in which possibility grows. What are you willing to hope for again? Small rituals of faith — gratitude, rest, kindness to yourself — are the first drops of the water the Star pours.' },
    { id: 'the-moon', num: 'XVIII', name: 'The Moon', keywords: 'Dreams · Uncertainty · Intuition', emblem: 'moon', interest: 'healing',
      reading: 'The Moon illuminates what is hidden — fears, intuition, and truths that surface only in stillness. If things feel unclear right now, this card gently suggests that not everything is meant to be known yet. Trust the process of becoming, and pay attention to your dreams and instincts. What is your intuition whispering beneath the uncertainty? The fog will lift; what you learn in it may guide you far longer.' },
    { id: 'the-sun', num: 'XIX', name: 'The Sun', keywords: 'Joy · Vitality · Success', emblem: 'sun', interest: 'career',
      reading: 'The Sun brings warmth, visibility, and the quiet confidence of things becoming clear. This card celebrates the energy that returns when you allow yourself to be seen — your talents, your warmth, your growth. What has been quietly going well that you have not allowed yourself to enjoy? Joy is not a reward for completion; it is nourishment along the way. Let yourself feel the light while it is here.' },
    { id: 'judgement', num: 'XX', name: 'Judgement', keywords: 'Awakening · Reflection · Calling', emblem: 'star', interest: 'direction',
      reading: 'Judgement is the sound of a deeper yes. This card arrives when you are being asked to rise — to answer the call you have heard in quiet moments but postponed. It is not about judgment from outside; it is about honest reflection on who you are becoming. What have you been waiting for permission to do? Forgive what holds you back, and answer your own calling. The time is simply now.' },
    { id: 'the-world', num: 'XXI', name: 'The World', keywords: 'Completion · Wholeness · Fulfilment', emblem: 'world', interest: 'career',
      reading: 'The World closes a cycle with grace, honouring how far you have come. This card speaks of completion and wholeness — not the end of the journey, but the integration of all you have learned. What are you ready to celebrate within yourself? Look back for a moment; the person who began this chapter would be proud of you. Then step forward, carrying the wisdom you have earned.' }
  ];

  const EMBLEMS = {
    moon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
    world: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>'
  };

  /* ═══════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════ */
  const els = {
    scene: $('#dd-scene'),
    heading: $('#dd-heading'),
    deck: $('#dd-deck'),
    deckZone: $('#dd-deck-zone'),
    topCard: $('#dd-top-card'),
    inner: $('#dd-card-inner'),
    frontNum: $('#dd-front-num'),
    frontName: $('#dd-front-name'),
    frontEmblem: $('#dd-front-emblem'),
    frontCorner: $('#dd-front-corner'),
    hint: $('#dd-hint'),
    glow: $('.dd-deck-glow'),
    shadow: $('.dd-deck-shadow'),
    panel: $('#dd-panel'),
    readingBody: $('#dd-reading-body'),
    readingNum: $('#dd-reading-num'),
    readingName: $('#dd-reading-name'),
    readingKeywords: $('#dd-reading-keywords'),
    readingText: $('#dd-reading-text'),
    shareRow: $('#dd-share-row'),
    reflect: $('#dd-reflect'),
    reflect2: $('#dd-reflect-2'),
    hesitate: $('#dd-hesitate'),
    toast: $('#dd-toast')
  };

  let currentCard = null;
  let prevId = null;
  let drawCount = 0;
  let busy = false;
  let mode = 'idle';
  let reflectTimer = null;
  let introTl = null;
  const mist = $$('.dd-mist');
  let idleTweens = [];
  let mistDriftTweens = [];

  /* ═══════════════════════════════════════════════════════════
     ANALYTICS — no existing analytics found on the site, so we
     push standard dataLayer events and log in console.
     ═══════════════════════════════════════════════════════════ */
  function track(name, data) {
    const payload = Object.assign({ event: name }, data || {});
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, data || {});
      }
      (window.dataLayer = window.dataLayer || []).push(payload);
    } catch (e) { /* never break the experience */ }
    if (window.console && console.info) console.info('[daily-draw]', payload);
  }

  /* ═══════════════════════════════════════════════════════════
     BUILD DECK
     ═══════════════════════════════════════════════════════════ */
  function buildDeck() {
    els.deck.querySelectorAll('.dd-stack-card').forEach((n) => n.remove());
    const N = DESKTOP ? 11 : 8;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < N; i++) {
      const c = document.createElement('div');
      c.className = 'dd-stack-card';
      c.style.zIndex = String(i + 1);
      c.style.setProperty('--sx', ((i - N / 2) * 0.8).toFixed(2) + 'px');
      c.style.setProperty('--sy', (i * 1.7).toFixed(2) + 'px');
      c.style.setProperty('--sr', ((i - N / 2) * 0.5).toFixed(2) + 'deg');
      c.style.transform = 'translate(var(--sx), var(--sy)) rotate(var(--sr))';
      frag.appendChild(c);
    }
    els.deck.insertBefore(frag, els.topCard);
  }

  /* ═══════════════════════════════════════════════════════════
     IDLE ATMOSPHERE — the sky breathes, very slowly
     ═══════════════════════════════════════════════════════════ */
  function initIdle() {
    if (REDUCED) return;

    const drift = [
      { x: -60, y: -28, s: 1.05, d: 110 },
      { x: 70, y: -20, s: 1.04, d: 130 },
      { x: -50, y: 30, s: 1.06, d: 120 },
      { x: 55, y: 18, s: 1.04, d: 140 }
    ];
    mist.forEach((m, i) => {
      const cfg = drift[i] || drift[0];
      mistDriftTweens.push(
        gsap.to(m, {
          x: cfg.x, y: cfg.y, scale: cfg.s, duration: cfg.d,
          yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: 'center'
        })
      );
    });

    idleTweens.push(
      gsap.to(els.deck, { y: -10, rotation: 1.1, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
      gsap.to(els.shadow, { scaleX: 0.88, opacity: 0.45, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
      gsap.to(els.glow, { opacity: 0.55, duration: 5.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    );
  }

  /* ═══════════════════════════════════════════════════════════
     PARTICLES
     ═══════════════════════════════════════════════════════════ */
  function initParticles() {
    const field = $('#dd-particles');
    if (!field || REDUCED) return;
    const count = DESKTOP ? 22 : 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'dd-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
      field.appendChild(p);
      gsap.to(p, {
        opacity: 0.5, duration: 2 + Math.random() * 3, yoyo: true, repeat: -1,
        delay: Math.random() * 4, ease: 'sine.inOut'
      });
      gsap.to(p, {
        y: -(14 + Math.random() * 44), x: (Math.random() - 0.5) * 40,
        duration: 7 + Math.random() * 8, yoyo: true, repeat: -1,
        delay: Math.random() * 5, ease: 'sine.inOut'
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     NAV — transparent → glass on scroll (same as site)
     ═══════════════════════════════════════════════════════════ */
  function initNav() {
    const nav = $('#dd-nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════
     HOVER TILT (desktop only)
     ═══════════════════════════════════════════════════════════ */
  function initTilt() {
    if (REDUCED || !window.matchMedia('(pointer: fine)').matches) return;
    const rx = gsap.quickTo(els.deck, 'rotationX', { duration: 0.7, ease: 'power3.out' });
    const ry = gsap.quickTo(els.deck, 'rotationY', { duration: 0.7, ease: 'power3.out' });
    els.deckZone.addEventListener('pointermove', (e) => {
      const r = els.deckZone.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * 14);
      ry(px * 16);
    });
    els.deckZone.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }

  /* ═══════════════════════════════════════════════════════════
     CARD CONTENT
     ═══════════════════════════════════════════════════════════ */
  function setFrontContent(card) {
    els.frontNum.textContent = card.num;
    els.frontCorner.textContent = card.num;
    els.frontName.textContent = card.name;
    els.frontEmblem.innerHTML = EMBLEMS[card.emblem] || EMBLEMS.moon;
  }

  function fillPanel(card) {
    els.readingNum.textContent = card.num;
    els.readingName.textContent = card.name;
    els.readingKeywords.textContent = card.keywords;
    els.readingText.textContent = card.reading;
  }

  /* ═══════════════════════════════════════════════════════════
     FLY & FLIP — the top card rises to its reveal position
     ═══════════════════════════════════════════════════════════ */
  function revealPosition() {
    const w = els.topCard.offsetWidth;
    const h = els.topCard.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let cx, cy;
    if (window.matchMedia('(min-width: 900px)').matches) {
      cx = vw * 0.28;
      cy = vh * 0.36;
    } else {
      cx = vw / 2;
      cy = Math.min(vh * 0.12, 80) + h / 2;
    }
    return { left: cx - w / 2, top: cy - h / 2, cx, cy };
  }

  function flyCard(onDone) {
    const el = els.topCard;
    const r = el.getBoundingClientRect();
    const target = revealPosition();
    const dx = target.left - r.left;
    const dy = target.top - r.top;

    el.classList.add('dd-flying');
    els.scene.appendChild(el);
    gsap.set(el, { left: r.left, top: r.top, x: 0, y: 0, scale: 1, rotation: 0 });

    els.scene.style.setProperty('--dd-reveal-top', target.top + 'px');

    if (REDUCED) {
      gsap.set(el, { left: target.left, top: target.top, x: 0, y: 0 });
      gsap.set(els.inner, { rotationY: -180 });
      if (onDone) onDone();
      return;
    }

    gsap.timeline()
      .to(el, { x: dx, y: dy, scale: 1.38, duration: 0.85, ease: 'power3.inOut' }, 0)
      .to(els.inner, { rotationY: -180, duration: 0.6, ease: 'power2.inOut' }, 0.12)
      .to(el, { scale: 1, duration: 0.45, ease: 'power2.out' }, 0.95)
      .add(() => { if (onDone) onDone(); });
  }

  /* ═══════════════════════════════════════════════════════════
     DRAW SEQUENCE — the cinematic 2–3 second moment
     ═══════════════════════════════════════════════════════════ */
  function startDraw(trackTouch) {
    if (busy) return;
    busy = true;

    if (trackTouch) track('deck_touched');

    const card = pickCard();
    currentCard = card;
    setFrontContent(card);
    hidePanel();
    els.scene.classList.remove('dd-revealed');
    document.body.classList.remove('dd-revealed');

    /* stop the opening intro and idle drift so nothing fights the draw */
    if (introTl) { introTl.kill(); introTl = null; }
    idleTweens.forEach((t) => t.kill());
    idleTweens = [];
    gsap.set($$('.dd-heading > *'), { opacity: 0, y: 0 });
    gsap.set(els.hint, { opacity: 0 });
    gsap.set(els.deckZone, { opacity: 1, y: 0, scale: 1 });

    /* atmosphere responds */
    if (REDUCED) {
      flyCard(() => onReveal());
      return;
    }

    gsap.timeline()
      /* heading and hint step aside */
      .to($$('.dd-heading > *'), { opacity: 0, y: -16, duration: 0.3, stagger: 0.04, ease: 'power2.out' }, 0)
      .to(els.hint, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0.02)
      /* clouds move slowly outward, light rises */
      .to(mist[0], { x: '-=80', scale: 1.07, duration: 1.3, ease: 'power2.out' }, 0)
      .to(mist[1], { x: '+=90', scale: 1.06, duration: 1.3, ease: 'power2.out' }, 0)
      .to(mist[2], { x: '-=60', y: '+=36', scale: 1.08, duration: 1.5, ease: 'power2.out' }, 0)
      .to(mist[3], { x: '+=70', scale: 1.06, duration: 1.5, ease: 'power2.out' }, 0)
      .to('.dd-light-lift', { opacity: 0.5, duration: 0.9, ease: 'power2.out' }, 0)
      /* the deck leans toward the touch */
      .to(els.deck, { rotationZ: 2.2, scale: 1.02, duration: 0.26, ease: 'power2.out' }, 0)
      /* shuffle — a quick breath of movement */
      .to('#dd-top-card', { y: -7, rotationZ: -2, duration: 0.1, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.2)
      .to('.dd-stack-card', {
        y: () => 3 + Math.floor(Math.random() * 2),
        rotation: (i) => (i % 2 ? 2 : -2),
        duration: 0.16, stagger: 0.02, yoyo: true, repeat: 1, ease: 'power2.inOut'
      }, 0.18)
      /* the top card rises */
      .add(() => flyCard(), 0.62)
      /* the deck recedes */
      .to('.dd-stack-card', { opacity: 0, y: 56, duration: 0.6, ease: 'power2.in' }, 0.7)
      .to([els.glow, els.shadow], { opacity: 0, duration: 0.45, ease: 'power2.out' }, 0.7)
      /* light settles */
      .to('.dd-light-lift', { opacity: 0.25, duration: 0.7, ease: 'power2.out' }, 1.25)
      .add(() => onReveal());
  }

  /* ═══════════════════════════════════════════════════════════
     REVEAL STATE
     ═══════════════════════════════════════════════════════════ */
  function onReveal() {
    busy = false;
    mode = 'revealed';
    drawCount += 1;

    track('card_revealed', { card: currentCard.id, count: drawCount });
    track(drawCount === 1 ? 'first_card' : 'second_card', { card: currentCard.id });

    fillPanel(currentCard);
    els.scene.classList.add('dd-revealed');
    document.body.classList.add('dd-revealed');

    els.panel.hidden = false;
    els.readingBody.hidden = false;
    gsap.fromTo(els.panel,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 }
    );
    gsap.fromTo('.dd-panel [data-reveal]',
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out', delay: 0.2 }
    );

    if (drawCount === 1) {
      setTimeout(() => els.readingName.focus({ preventScroll: true }), 500);
    }

    /* premium transition → reflection */
    clearTimeout(reflectTimer);
    reflectTimer = setTimeout(showReflect, REDUCED ? 1400 : 1800);
  }

  function showReflect() {
    if (mode !== 'revealed') return;
    track('first_card_reflected', { card: currentCard.id, count: drawCount });

    /* clouds settle back, background deepens */
    mistDriftTweens.forEach((t) => t.kill());
    mist.forEach((m) => {
      gsap.to(m, { x: 0, y: 0, scale: 1, duration: 2.8, ease: 'power2.out' });
    });
    gsap.to('.dd-dim', { opacity: 0.32, duration: 1.8, ease: 'power2.out' });
    gsap.to('.dd-light-lift', { opacity: 0.1, duration: 1.8, ease: 'power2.out' });

    /* reflection block settles in below the reading */
    const next = drawCount === 1 ? els.reflect : els.reflect2;
    if (next.hidden) {
      next.hidden = false;
      gsap.fromTo(next,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }

  /* ═══════════════════════════════════════════════════════════
     PANEL HELPERS
     ═══════════════════════════════════════════════════════════ */
  function hidePanel() {
    clearTimeout(reflectTimer);
    [els.readingBody, els.reflect, els.reflect2, els.hesitate].forEach((b) => {
      b.hidden = true;
      gsap.set(b, { autoAlpha: 0, y: 0 });
    });
    els.panel.hidden = true;
    gsap.set(els.panel, { autoAlpha: 0, y: 0 });
  }

  function swapBlocks(from, to) {
    gsap.to(from, {
      autoAlpha: 0, duration: 0.4, ease: 'power2.out',
      onComplete: () => {
        from.hidden = true;
        to.hidden = false;
        gsap.fromTo(to, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     HESITATION — "Are you sure?"
     ═══════════════════════════════════════════════════════════ */
  function askAgain() {
    if (busy || drawCount !== 1) return;
    track('draw_again_clicked', { card: currentCard.id });
    swapBlocks(els.reflect, els.hesitate);
  }

  function keepCard() {
    track('keep_first_card_clicked', { card: currentCard.id });
    swapBlocks(els.hesitate, els.reflect);
  }

  /* ═══════════════════════════════════════════════════════════
     SECOND DRAW — the card returns to the deck
     ═══════════════════════════════════════════════════════════ */
  function returnToDeck(onDone) {
    const el = els.topCard;
    const r = el.getBoundingClientRect();
    const deckRect = els.deck.getBoundingClientRect();
    const dx = deckRect.left - r.left;
    const dy = deckRect.top - r.top;

    if (REDUCED) {
      resetDeck();
      onDone();
      return;
    }

    gsap.timeline()
      .to(el, { x: dx, y: dy, scale: 0.55, rotation: 0, duration: 0.85, ease: 'power3.inOut' }, 0)
      .to(els.inner, { rotationY: 0, duration: 0.7, ease: 'power2.inOut' }, 0.1)
      .add(() => { resetDeck(); onDone(); });
  }

  function resetDeck() {
    const el = els.topCard;
    el.classList.remove('dd-flying');
    gsap.set(el, { clearProps: 'all' });
    gsap.set(els.inner, { rotationY: 0 });
    els.scene.classList.remove('dd-revealed');
    document.body.classList.remove('dd-revealed');
    els.deck.appendChild(el);
    buildDeck();
    gsap.set('.dd-stack-card', { opacity: 1, y: 0, rotation: 0, scale: 1 });
    gsap.set([els.glow, els.shadow], { opacity: 1 });
    gsap.set(els.deck, { rotationZ: 0, scale: 1 });
    gsap.set('.dd-light-lift', { opacity: 0 });
    gsap.set('.dd-dim', { opacity: 0 });
    mistDriftTweens.forEach((t) => t.kill());
    mistDriftTweens = [];
    idleTweens.forEach((t) => t.kill());
    idleTweens = [];
    if (!REDUCED) {
      idleTweens.push(
        gsap.to(els.deck, { y: -10, rotation: 1.1, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
        gsap.to(els.shadow, { scaleX: 0.88, opacity: 0.45, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
        gsap.to(els.glow, { opacity: 0.55, duration: 5.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      );
      const drift = [
        { x: -60, y: -28, s: 1.05, d: 110 },
        { x: 70, y: -20, s: 1.04, d: 130 },
        { x: -50, y: 30, s: 1.06, d: 120 },
        { x: 55, y: 18, s: 1.04, d: 140 }
      ];
      mist.forEach((m, i) => {
        const cfg = drift[i] || drift[0];
        mistDriftTweens.push(
          gsap.fromTo(m,
            { x: 0, y: 0, scale: 1 },
            { x: cfg.x, y: cfg.y, scale: cfg.s, duration: cfg.d, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: 'center' }
          )
        );
      });
    }
    hidePanel();
    gsap.to($$('.dd-heading > *'), { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
    gsap.to(els.hint, { opacity: 1, duration: 0.5, delay: 0.3 });
  }

  function secondDraw() {
    if (busy || drawCount === 0) return;
    track('draw_again_clicked', { card: currentCard.id, count: drawCount });
    returnToDeck(() => startDraw(false));
  }

  /* ═══════════════════════════════════════════════════════════
     CONVERSION — smooth exit toward the existing pricing page
     ═══════════════════════════════════════════════════════════ */
  function goToPricing() {
    if (busy || !currentCard) return;
    busy = true;
    track('personal_reading_clicked', { card: currentCard.id, interest: currentCard.interest });

    const url = 'pricing.html';

    document.body.classList.add('dd-exiting');

    const tl = gsap.timeline({ onComplete: () => { window.location.assign(url); } });
    if (REDUCED) { tl.to({}, { duration: 0.2 }); return; }

    tl.to(els.topCard, { scale: 0.6, opacity: 0, y: -36, duration: 0.85, ease: 'power2.in' }, 0)
      .to(els.panel, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .fromTo('.dd-sweep', { xPercent: -140 }, { xPercent: 130, duration: 1.15, ease: 'power2.inOut' }, 0.15)
      .to('.dd-scene', { opacity: 0.25, duration: 0.95, ease: 'power2.out' }, 0.15)
      .to(mist, { x: (i) => (i % 2 ? 140 : -140), duration: 1.3, ease: 'power2.inOut' }, 0.1);
  }

  /* ═══════════════════════════════════════════════════════════
     SHARE
     ═══════════════════════════════════════════════════════════ */
  function shareWhatsApp() {
    if (!currentCard) return;
    track('share_card_clicked', { card: currentCard.id, method: 'whatsapp' });
    const msg = 'I just drew ' + currentCard.name + ' \u2728\nWhat card will you get?\n\n' + shareUrl();
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  }

  function shareLink() {
    if (!currentCard) return;
    track('share_card_clicked', { card: currentCard.id, method: 'link' });
    const url = shareUrl();
    const done = () => showToast('Link copied');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
    } else {
      fallbackCopy(url, done);
    }
  }

  function shareUrl() {
    return window.location.origin + window.location.pathname;
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
    ta.remove();
  }

  let toastTimer = null;
  function showToast(msg) {
    els.toast.textContent = msg;
    gsap.to(els.toast, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      gsap.to(els.toast, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' });
    }, 2400);
  }

  /* ═══════════════════════════════════════════════════════════
     EVENTS
     ═══════════════════════════════════════════════════════════ */
  function pickCard() {
    const pool = MAJOR_ARCANA.filter((c) => c.id !== prevId);
    const card = pool[Math.floor(Math.random() * pool.length)];
    prevId = card.id;
    return card;
  }

  function bindEvents() {
    els.topCard.addEventListener('click', () => startDraw(true));
    els.topCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startDraw(true); }
    });

    $('#dd-go-pricing').addEventListener('click', goToPricing);
    $('#dd-go-pricing-2').addEventListener('click', goToPricing);
    $('#dd-book-reading').addEventListener('click', goToPricing);
    $('#dd-again').addEventListener('click', askAgain);
    $('#dd-again-2').addEventListener('click', secondDraw);
    $('#dd-keep').addEventListener('click', keepCard);
    $('#dd-confirm').addEventListener('click', secondDraw);

    $('#dd-share-wa').addEventListener('click', shareWhatsApp);
    $('#dd-share-link').addEventListener('click', shareLink);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !els.hesitate.hidden) keepCard();
    });

    window.addEventListener('resize', () => {
      if (mode === 'revealed' && els.topCard.classList.contains('dd-flying')) {
        const t = revealPosition();
        gsap.to(els.topCard, { left: t.left, top: t.top, x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        els.scene.style.setProperty('--dd-reveal-top', t.top + 'px');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════════════════ */
  function init() {
    track('daily_draw_opened');

    buildDeck();
    setFrontContent(MAJOR_ARCANA[0]);
    initNav();
    initParticles();
    initIdle();
    initTilt();
    bindEvents();

    if (REDUCED) {
      gsap.set($$('.dd-heading > *'), { opacity: 1, y: 0 });
      gsap.set(els.hint, { opacity: 1 });
      return;
    }

    /* opening reveal */
    introTl = gsap.timeline({ delay: 0.35 })
      .fromTo($$('.dd-heading > *'),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' })
      .fromTo(els.deckZone,
        { opacity: 0, y: 34, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, 0.25)
      .fromTo(els.hint,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.9);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();