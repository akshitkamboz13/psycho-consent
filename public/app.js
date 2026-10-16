'use strict';

/* ══════════════════════════════════════════
   SLIDE DEFINITIONS
   Each object = one screen
   Types: intro | text | number | choice | date | terms | sig | confirm | done
══════════════════════════════════════════ */
const SLIDES = [
  // ── Intro ──────────────────────────────
  {
    type: 'intro',
    q:    'Counselling\nConsent Form.',
    hint: 'Press → to begin'
  },

  // ── Client Info ────────────────────────
  {
    type:     'text',
    id:       'name',
    q:        'What is your\nfull name?',
    ph:       'Your name here',
    required: true
  },
  {
    type:     'number',
    id:       'age',
    q:        'How old\nare you?',
    ph:       '—',
    min:      1,
    max:      120,
    required: true
  },
  {
    type:     'choice',
    id:       'gender',
    q:        'What is your\ngender?',
    options:  ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
    required: true
  },
  {
    type:     'text',
    id:       'phone',
    q:        'Your phone\nnumber?',
    ph:       '+91 00000 00000',
    inputmode:'tel',
    required: true
  },
  {
    type:     'text',
    id:       'address',
    q:        'Your home\naddress?',
    ph:       'Street, City',
    required: true
  },
  {
    type:     'text',
    id:       'guardian_name',
    q:        'Parent or legal guardian\'s\nname? (if applicable)',
    ph:       'Leave blank if not applicable',
    optional: true,
    group:    'guardian',
    groupFields: ['guardian_name', 'guardian_date'],
    skipTo:   'emergency_intro'
  },
  {
    type:     'text',
    id:       'guardian_date',
    q:        'Parent or guardian\'s\ndate? (if applicable)',
    ph:       'YYYY-MM-DD or today\'s date',
    group:    'guardian',
    groupFields: ['guardian_name', 'guardian_date']
  },

  // ── Emergency Contact ──────────────────
  {
    type:  'intro',
    id:    'emergency_intro',
    q:     'Emergency\nContact.',
    hint:  'In case we need to reach someone'
  },
  {
    type:     'text',
    id:       'em_name',
    q:        'Emergency contact\nperson\'s name?',
    ph:       'Their full name',
    required: true
  },
  {
    type:     'text',
    id:       'em_rel',
    q:        'What is their\nrelationship to you?',
    ph:       'e.g. Parent, Spouse',
    required: true
  },
  {
    type:     'text',
    id:       'em_phone',
    q:        'Their phone\nnumber?',
    ph:       '+91 00000 00000',
    inputmode:'tel',
    required: true
  },

  // ── Terms ──────────────────────────────
  {
    type: 'terms',
    q:    'Please read\nbefore signing.',
    body: `<p>The counselling service is intended to provide psychological support for personal, emotional, interpersonal, educational, and adjustment-related concerns. It is a confidential and collaborative process. You will receive counselling from a trainee counsellor enrolled in the MSc Counselling Psychology programme at <strong>Montfort College</strong> under the supervision of qualified faculty members.</p>
<p>Information shared during counselling will remain confidential except:</p>
<ul>
  <li>when there is a risk of serious harm to yourself or others;</li>
  <li>when disclosure is required by law; or</li>
  <li>for professional supervision and training purposes.</li>
</ul>
<p>Your counsellor is a trainee working under close supervision. If your needs are beyond the scope of supervised trainee practice or there are concerns about your immediate safety, you may be referred to a more appropriate mental health professional or service. This is to ensure you receive the safest and most appropriate care.</p>
<p><strong>Recording (Optional):</strong> Sessions may be audio/video recorded for supervision and training purposes only. I understand that I may withdraw this consent at any time.</p>
<p>I have read and understood the above information. I have had the opportunity to ask questions, understand the limits of confidentiality, and voluntarily consent to receive counselling from a trainee counsellor under supervision.</p>`
  },

  // ── Signatures ─────────────────────────
  {
    type:     'date',
    id:       'client_date',
    q:        'Today\'s date?',
    required: true
  },
  {
    type:     'sig',
    id:       'sig_client',
    q:        'Sign your name\nbelow.',
    hint:     'Draw with finger or mouse',
    required: true
  },
  {
    type:     'text',
    id:       'counsellor_name',
    q:        'Trainee counsellor\'s\nfull name?',
    ph:       'Counsellor name',
    optional: true,
    group:    'counsellor',
    groupFields: ['counsellor_name', 'sig_counsellor'],
    skipTo:   'safety_intro'
  },
  {
    type:     'sig',
    id:       'sig_counsellor',
    q:        'Counsellor —\nsign below.',
    hint:     'Draw with finger or mouse',
    group:    'counsellor',
    groupFields: ['counsellor_name', 'sig_counsellor'],
    requiredWhen: 'counsellor'
  },

  // ── Safety Planning Contract ───────────────
  {
    type: 'intro',
    id:   'safety_intro',
    q:    'Safety Planning\nContract.',
    hint: 'Please read and acknowledge the agreement'
  },
  {
    type: 'confirm',
    id:   'safety_agreement',
    q:    'I understand and agree to\nmy safety commitments.',
    body: `<p>This is an agreement between the client and counsellor to support the client's safety and well-being, and a mutual understanding to take steps to prevent self-harm.</p>
<p><strong>My Commitments as a Client — I agree that:</strong></p>
<ul>
  <li>I will not harm myself or attempt suicide as long as I am in counselling.</li>
  <li>If I feel overwhelmed with thoughts of harming myself, I will first try to use the coping strategies we have discussed.</li>
  <li>If these strategies are not enough, I will immediately contact a trusted family member or close friend. If I feel I cannot stay safe, I will call an emergency helpline.</li>
  <li>I will continue attending counselling sessions and remain honest about my feelings.</li>
  <li>I will continue talking with as many people as I can for as long as necessary. I understand my counsellor will keep a copy.</li>
</ul>
<p><strong>Emergency helplines:</strong> Arpita Foundation (Bengaluru) 080 23655557 / 080 23656667; Cadabam's Mental Health Helpline +91 96111 94949; A-MUDRA Yuva Helpline +91 98803 96331; Tele-MANAS 14416 or 1800 891 4416; Vandrevala Foundation +91 9999 666 555.</p>
<p><strong>My Counsellor's Commitments — as your counsellor, I agree to:</strong> Support you in developing coping strategies and safety plans; be available during agreed working hours and provide crisis-helpline information; respect your confidentiality, but involve family/guardian or emergency services if your life is in immediate danger.</p>`,
    required: true
  },

  // ── Done ──────────────────────────────
  {
    type: 'done',
    q:    'All done.\nThank you.'
  }
];

/* ══════════════════════════════════════════
   ICONS & DYNAMIC FAVICON
══════════════════════════════════════════ */
const ALL_ICONS = [
  'airplane-svgrepo-com.svg',
  'bench-svgrepo-com.svg',
  'cocktail-svgrepo-com.svg',
  'coconut-tree-svgrepo-com.svg',
  'emu-svgrepo-com.svg',
  'ice-cream-svgrepo-com.svg',
  'indicator-svgrepo-com.svg',
  'lighthouse-svgrepo-com.svg',
  'milk-tea-svgrepo-com.svg',
  'polaroid-svgrepo-com.svg',
  'snow-mountain-svgrepo-com.svg',
  'suitcase-svgrepo-com.svg',
  'surf-svgrepo-com.svg',
  'suv-svgrepo-com.svg',
  'take-a-bath-svgrepo-com.svg',
  'the-trees-svgrepo-com.svg',
  'villa-svgrepo-com.svg',
  'wallet-svgrepo-com.svg',
  'wine-svgrepo-com.svg'
];

let chosenFavicon = '';
let remainingScatterIcons = [];

function initIconsAndFavicon() {
  const chosenIndex = Math.floor(Math.random() * ALL_ICONS.length);
  chosenFavicon = ALL_ICONS[chosenIndex];
  remainingScatterIcons = ALL_ICONS.filter((_, idx) => idx !== chosenIndex);

  let link = document.getElementById('app-favicon') || document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/svg+xml';
  link.href = `icons-favicons/${chosenFavicon}`;

  // Preload all icons into browser cache
  ALL_ICONS.forEach(file => {
    const img = new Image();
    img.src = `icons-favicons/${file}`;
  });
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSlideScatterIcons(parentEl) {
  const container = document.createElement('div');
  container.className = 'scatter-icons-container';
  container.setAttribute('aria-hidden', 'true');

  const iconsToScatter = shuffleArray(remainingScatterIcons);
  const isMobile = window.innerWidth < 768;

  iconsToScatter.forEach((iconFile, idx) => {
    let left, top;

    if (isMobile) {
      // Mobile: 9 icons top cluster (rows 0-2), 9 icons bottom cluster (rows 3-5)
      // Completely leaves middle zone (30% to 66%) empty for question & input
      if (idx < 9) {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const baseTop = [8, 17, 26][row];
        const baseLeft = (col + 0.5) * (100 / 3);
        left = Math.max(9, Math.min(91, baseLeft + (Math.random() - 0.5) * 12));
        top = Math.max(6, Math.min(28, baseTop + (Math.random() - 0.5) * 4));
      } else {
        const sub = idx - 9;
        const row = Math.floor(sub / 3);
        const col = sub % 3;
        const baseTop = [69, 79, 89][row];
        const baseLeft = (col + 0.5) * (100 / 3);
        left = Math.max(9, Math.min(91, baseLeft + (Math.random() - 0.5) * 12));
        top = Math.max(67, Math.min(94, baseTop + (Math.random() - 0.5) * 4));
      }
    } else {
      // Desktop: 6 top edge, 6 bottom edge, 3 left flank, 3 right flank
      // Completely leaves central area (left 18-82%, top 25-73%) empty
      if (idx < 6) {
        // Top perimeter strip
        const baseLeft = (idx + 0.5) * (100 / 6);
        left = Math.max(7, Math.min(93, baseLeft + (Math.random() - 0.5) * 6));
        top = Math.max(7, Math.min(20, 13 + (Math.random() - 0.5) * 7));
      } else if (idx < 12) {
        // Bottom perimeter strip
        const sub = idx - 6;
        const baseLeft = (sub + 0.5) * (100 / 6);
        left = Math.max(7, Math.min(93, baseLeft + (Math.random() - 0.5) * 6));
        top = Math.max(79, Math.min(92, 85 + (Math.random() - 0.5) * 7));
      } else if (idx < 15) {
        // Left flank
        const sub = idx - 12;
        left = Math.max(6, Math.min(14, 10 + (Math.random() - 0.5) * 5));
        top = Math.max(30, Math.min(68, [34, 49, 64][sub] + (Math.random() - 0.5) * 5));
      } else {
        // Right flank
        const sub = idx - 15;
        left = Math.max(86, Math.min(94, 90 + (Math.random() - 0.5) * 5));
        top = Math.max(30, Math.min(68, [34, 49, 64][sub] + (Math.random() - 0.5) * 5));
      }
    }

    const size = isMobile
      ? Math.round(32 + Math.random() * 22)
      : Math.round(42 + Math.random() * 38);

    const rot = Math.round(Math.random() * 70 - 35);
    const delay = (0.04 + idx * 0.035 + Math.random() * 0.06).toFixed(3);

    const img = document.createElement('img');
    img.src = `icons-favicons/${iconFile}`;
    img.className = 'scatter-icon';
    img.alt = '';
    img.style.setProperty('--icon-left', `${left.toFixed(1)}%`);
    img.style.setProperty('--icon-top', `${top.toFixed(1)}%`);
    img.style.setProperty('--icon-size', `${size}px`);
    img.style.setProperty('--icon-rot', `${rot}deg`);
    img.style.setProperty('--icon-delay', `${delay}s`);

    container.appendChild(img);
  });

  parentEl.appendChild(container);
}

// Initialize favicon immediately
initIconsAndFavicon();

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let current     = 0;
let direction   = 1;           // 1 = forward, -1 = backward
const answers   = {};          // keyed by slide id
const sigPads   = {};          // keyed by slide id
let currentEl   = null;        // DOM node of active slide

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // default today's date
  answers['client_date'] = new Date().toISOString().split('T')[0];

  buildSlide(current, null, 'active');

  // Keyboard: Enter / Right = next, Left = back
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextSlide();
      return;
    }
    if (e.key === 'ArrowRight') {
      if (!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
        nextSlide();
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      if (!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
        prevSlide();
      }
      return;
    }
  });
});

/* ══════════════════════════════════════════
   BUILD A SLIDE DOM NODE
══════════════════════════════════════════ */
function buildSlide(index, previousEl, enterClass) {
  const s    = SLIDES[index];
  const el   = document.createElement('div');
  el.className = `slide ${enterClass}`;
  el.dataset.index = index;

  /* ── Question label & slide numbers ── */
  const isOpeningSlide = s.type === 'intro' && index === 0;
  const label = document.createElement('div');
  label.className = 'q-label';

  const numVisible = SLIDES.filter((s, i) =>
    i > 0 && i <= index && s.type !== 'intro' && s.type !== 'done'
  ).length;
  const totalQ = SLIDES.filter(s => s.type !== 'intro' && s.type !== 'done').length;

  /* ── Scatter icons for requested slides (1-10, 12-15) and last page (done) ── */
  const POPUP_QUESTION_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];
  const shouldShowPopups = (s.type !== 'intro' && s.type !== 'done' && POPUP_QUESTION_NUMS.includes(numVisible)) || s.type === 'done';

  if (shouldShowPopups) {
    buildSlideScatterIcons(el);
  }

  if (!isOpeningSlide && s.type !== 'intro' && s.type !== 'done') {
    const num = document.createElement('span');
    num.className = 'q-num';
    num.textContent = `${numVisible} / ${totalQ}`;
    label.appendChild(num);
  }

  if (!isOpeningSlide) {
    const txt = document.createElement('span');
    let qText = s.q;
    if (s.id === 'guardian_name') {
      const ageVal = parseInt(answers.age, 10);
      const isMinor = !isNaN(ageVal) && ageVal < 18;
      qText = isMinor
        ? "Parent or legal guardian's\nname? (required for under 18)"
        : "Parent or legal guardian's\nname? (if applicable)";
    }
    if (s.id === 'guardian_date') {
      const ageVal = parseInt(answers.age, 10);
      const isMinor = !isNaN(ageVal) && ageVal < 18;
      qText = isMinor
        ? "Parent or guardian's\ndate? (required for under 18)"
        : "Parent or guardian's\ndate? (if applicable)";
    }
    txt.innerHTML = qText.replace(/\n/g, '<br>');
    label.appendChild(txt);
    el.appendChild(label);
  }

  /* ── Body by type ── */
  switch (s.type) {

    case 'intro': {
      if (isOpeningSlide) {
        buildOpeningAnimation(el);
        break;
      }
      if (s.hint) {
        const hint = document.createElement('div');
        hint.className = 'q-hint';
        hint.textContent = s.hint;
        el.appendChild(hint);
      }
      break;
    }

    case 'text':
    case 'number': {
      const inp = document.createElement('input');
      inp.type      = s.type === 'number' ? 'number' : 'text';
      inp.className = 'q-input';
      const ageVal = parseInt(answers.age, 10);
      const isMinor = !isNaN(ageVal) && ageVal < 18;
      if (s.id === 'guardian_name') {
        inp.placeholder = isMinor ? "Parent or guardian's full name" : (s.ph || '');
      } else {
        inp.placeholder = s.ph || '';
      }
      inp.value     = answers[s.id] || '';
      if (s.inputmode) inp.inputMode = s.inputmode;
      if (s.min !== undefined) inp.min = s.min;
      if (s.max !== undefined) inp.max = s.max;
      inp.addEventListener('input', () => {
        answers[s.id] = inp.value.trim();
        if (s.group) answers[`${s.group}_skipped`] = false;
      });
      el.appendChild(inp);
      if (s.optional) {
        const canSkip = s.id === 'guardian_name' ? !isMinor : true;
        if (canSkip) {
          const skipBtn = document.createElement('button');
          skipBtn.className = 'skip-btn';
          skipBtn.textContent = 'Skip this section';
          skipBtn.addEventListener('click', () => skipOptionalGroup(s));
          el.appendChild(skipBtn);
        }
      }
      // auto-focus after transition
      setTimeout(() => inp.focus(), 560);
      break;
    }

    case 'date': {
      const inp = document.createElement('input');
      inp.type      = 'date';
      inp.className = 'q-input';
      inp.value     = answers[s.id] || new Date().toISOString().split('T')[0];
      answers[s.id] = inp.value;
      inp.addEventListener('change', () => { answers[s.id] = inp.value; });
      el.appendChild(inp);
      setTimeout(() => inp.focus(), 560);
      break;
    }

    case 'choice': {
      const wrap = document.createElement('div');
      wrap.className = 'q-choices';
      s.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'q-choice';
        btn.textContent = opt;
        if (answers[s.id] === opt) btn.classList.add('selected');
        btn.addEventListener('click', () => {
          wrap.querySelectorAll('.q-choice').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          answers[s.id] = opt;
          setTimeout(() => nextSlide(), 280);
        });
        wrap.appendChild(btn);
      });
      el.appendChild(wrap);
      break;
    }

    case 'terms': {
      const box = document.createElement('div');
      box.className = 'q-terms';
      box.innerHTML = s.body;
      el.appendChild(box);

      const agreeBtn = document.createElement('button');
      agreeBtn.className = 'q-choice terms-agree-btn';
      agreeBtn.textContent = answers.terms_agreed ? 'Agreed ✓' : 'I agree to these terms';
      if (answers.terms_agreed) agreeBtn.classList.add('selected');
      agreeBtn.addEventListener('click', () => {
        answers.terms_agreed = true;
        agreeBtn.classList.add('selected');
        agreeBtn.textContent = 'Agreed ✓';
        clearError();
        updateChrome(current);
      });
      el.appendChild(agreeBtn);
      break;
    }

    case 'confirm': {
      const box = document.createElement('div');
      box.className = 'q-terms';
      box.innerHTML = s.body;
      el.appendChild(box);

      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'q-choice confirm-agree-btn';
      confirmBtn.textContent = answers[s.id] ? 'Agreed ✓' : 'I agree to these commitments';
      if (answers[s.id]) confirmBtn.classList.add('selected');
      confirmBtn.addEventListener('click', () => {
        answers[s.id] = true;
        confirmBtn.classList.add('selected');
        confirmBtn.textContent = 'Agreed ✓';
        clearError();
      });
      el.appendChild(confirmBtn);
      break;
    }

    case 'sig': {
      const wrap = document.createElement('div');
      wrap.className = 'sig-wrap';

      const box = document.createElement('div');
      box.className = 'sig-canvas-box';

      const canvas = document.createElement('canvas');
      canvas.className = 'sig-canvas';
      box.appendChild(canvas);

      const ghost = document.createElement('div');
      ghost.className = 'sig-ghost';
      ghost.textContent = 'Draw here';
      box.appendChild(ghost);

      wrap.appendChild(box);

      // controls
      const ctrl = document.createElement('div');
      ctrl.className = 'sig-controls';

      const clearBtn = document.createElement('button');
      clearBtn.className = 'sig-ctrl-btn';
      clearBtn.textContent = 'Clear';
      ctrl.appendChild(clearBtn);

      const uploadLbl = document.createElement('label');
      uploadLbl.className = 'sig-ctrl-btn';
      uploadLbl.textContent = 'Upload photo';
      uploadLbl.style.cursor = 'pointer';
      const fileInp = document.createElement('input');
      fileInp.type   = 'file';
      fileInp.accept = 'image/*';
      fileInp.style.display = 'none';
      uploadLbl.appendChild(fileInp);
      ctrl.appendChild(uploadLbl);

      wrap.appendChild(ctrl);
      el.appendChild(wrap);

      // Init SignaturePad after element is in DOM
      setTimeout(() => {
        const ratio  = Math.max(window.devicePixelRatio || 1, 1);
        const w      = box.offsetWidth  || canvas.offsetWidth  || 600;
        const h      = box.offsetHeight || canvas.offsetHeight || 160;
        canvas.width  = w * ratio;
        canvas.height = h * ratio;
        canvas.getContext('2d').scale(ratio, ratio);

        const pad = new SignaturePad(canvas, {
          backgroundColor: 'rgba(255,255,255,0)',
          penColor: '#0D0D0D',
          minWidth: 1.5,
          maxWidth: 3
        });
        sigPads[s.id] = pad;

        // restore previous sig
        if (answers[s.id]) {
          pad.fromDataURL(answers[s.id]);
          ghost.style.opacity = '0';
        }

        pad.addEventListener('beginStroke', () => { ghost.style.opacity = '0'; });
        pad.addEventListener('endStroke', () => {
          answers[s.id] = pad.isEmpty() ? null : pad.toDataURL();
        });

        clearBtn.addEventListener('click', () => {
          pad.clear();
          answers[s.id] = null;
          ghost.style.opacity = '1';
        });

        fileInp.addEventListener('change', e => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = ev => {
            pad.fromDataURL(ev.target.result);
            answers[s.id] = ev.target.result;
            ghost.style.opacity = '0';
          };
          reader.readAsDataURL(file);
        });
      }, 80);

      if (s.hint) {
        const hint = document.createElement('div');
        hint.className = 'q-hint';
        hint.textContent = s.hint;
        el.appendChild(hint);
      }
      break;
    }

    case 'done': {
      const acts = document.createElement('div');
      acts.className = 'done-actions';

      const waBtn = document.createElement('button');
      waBtn.className = 'done-btn primary mobile-only';
      waBtn.innerHTML = '<span>Share both PDFs</span><span>→</span>';
      waBtn.addEventListener('click', shareBothPDFs);

      const pdfBtn = document.createElement('button');
      pdfBtn.className = 'done-btn';
      pdfBtn.innerHTML = '<span>Download Consent PDF</span><span>→</span>';
      pdfBtn.addEventListener('click', () => generateConsentPDF());

      const safetyBtn = document.createElement('button');
      safetyBtn.className = 'done-btn';
      safetyBtn.innerHTML = '<span>Download Safety Plan PDF</span><span>→</span>';
      safetyBtn.addEventListener('click', () => generateSafetyPDF());

      const bothBtn = document.createElement('button');
      bothBtn.className = 'done-btn desktop-primary';
      bothBtn.innerHTML = '<span>Download Both PDFs</span><span>→</span>';
      bothBtn.addEventListener('click', () => downloadBothPDFs());

      const previewBtn = document.createElement('button');
      previewBtn.className = 'done-btn';
      previewBtn.innerHTML = '<span>Preview Both PDFs</span><span>→</span>';
      previewBtn.addEventListener('click', () => previewBothPDFs());

      const restartBtn = document.createElement('button');
      restartBtn.className = 'done-btn';
      restartBtn.innerHTML = '<span>Start over</span><span>→</span>';
      restartBtn.addEventListener('click', () => {
        Object.keys(answers).forEach(key => delete answers[key]);
        answers.client_date = new Date().toISOString().split('T')[0];
        Object.keys(sigPads).forEach(key => delete sigPads[key]);
        current = 0;
        transitionTo(0, 1);
      });

      acts.appendChild(waBtn);
      acts.appendChild(pdfBtn);
      acts.appendChild(safetyBtn);
      acts.appendChild(bothBtn);
      acts.appendChild(previewBtn);
      acts.appendChild(restartBtn);
      el.appendChild(acts);
      break;
    }
  }

  /* ── Add to DOM ── */
  document.getElementById('stage').appendChild(el);
  currentEl = el;

  // Animate in if transitioning
  if (enterClass !== 'active') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.remove('enter', 'enter-back');
        el.classList.add('active');
      });
    });
  }

  updateChrome(index);
}

function buildOpeningAnimation(el) {
  const scene = document.createElement('div');
  scene.className = 'opening-scene';
  const fontSize = Math.max(56, Math.min(130, window.innerWidth * 0.105));
  const iCount = Math.ceil((window.innerWidth * 2.8 + fontSize * 2) / (fontSize * 0.43));
  const restCount = Math.max(1, iCount - 1);
  const startStream = 1.10;
  const endStream = 2.20;
  const stepDelay = (endStream - startStream) / restCount;

  let restMarkup = '';
  for (let idx = 0; idx < restCount; idx++) {
    const d = (startStream + idx * stepDelay).toFixed(3);
    restMarkup += `<span class="opening-i" style="--delay:${d}s">i</span>`;
  }

  const wordMarkup = (text, startDelay) => text.split(' ').map((word, index) =>
    `<span class="opening-copy-word" style="--word-delay:${(startDelay + index * 0.18).toFixed(2)}s">${word}</span>`
  ).join(' ');
  scene.innerHTML = `
    <div class="opening-word" aria-label="Hiiii">
      <span class="opening-h">H</span>
      <span class="opening-first-i">
        <span class="opening-i-stem">i</span>
        <span class="opening-i-dot">i</span>
      </span>
      <span class="opening-rest-i">${restMarkup}</span>
      <span class="opening-cursor"></span>
    </div>
    <div class="opening-copy">
      <div class="opening-greeting">${wordMarkup('How are you?', 3.2)}</div>
      <div class="opening-detail">${wordMarkup('Take a quiet moment to check in with yourself.', 3.7)}</div>
      <div class="opening-detail">${wordMarkup('We’ll begin with a few questions before your consent form.', 4.2)}</div>
    </div>
    <div class="opening-next">Consent Form <span>→</span></div>
  `;

  el.appendChild(scene);

  const skip = document.createElement('button');
  skip.className = 'opening-skip';
  skip.textContent = 'Skip intro →';
  skip.addEventListener('click', nextSlide);
  el.appendChild(skip);

  const nextBanner = scene.querySelector('.opening-next');
  if (nextBanner) {
    nextBanner.addEventListener('click', nextSlide);
  }

  // Load SVGs on intro page when intro animation completes and all text is visible (~4.8s)
  setTimeout(() => {
    if (current === 0 && currentEl === el) {
      buildSlideScatterIcons(el);
    }
  }, 4800);
}

/* ══════════════════════════════════════════
   UPDATE PROGRESS BAR + ARROW VISIBILITY
══════════════════════════════════════════ */
function updateChrome(index) {
  const pct = (index / (SLIDES.length - 1)) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  const backBtn = document.getElementById('btn-back');
  const nextBtn = document.getElementById('btn-next');

  backBtn.classList.toggle('hidden', index === 0);

  const isTermsUnagreed = SLIDES[index].type === 'terms' && !answers.terms_agreed;
  nextBtn.classList.toggle('hidden', index === 0 || isTermsUnagreed);
  nextBtn.classList.toggle('done', SLIDES[index].type === 'done');
}

/* ══════════════════════════════════════════
   NAVIGATE
══════════════════════════════════════════ */
function nextSlide() {
  if (current >= SLIDES.length - 1) return;

  const s = SLIDES[current];

  // Guardian linkage (6/16 & 7/16) based on age (<18 compulsory, >=18 skippable)
  if (s.id === 'guardian_name') {
    const ageVal = parseInt(answers.age, 10);
    const isMinor = !isNaN(ageVal) && ageVal < 18;
    const nameVal = (answers.guardian_name || '').toString().trim();

    if (isMinor && !nameVal) {
      showError('Parent or guardian name is required for minors (under 18)');
      const inp = currentEl.querySelector('.q-input');
      if (inp) { inp.focus(); shake(inp); }
      return;
    }

    if (!nameVal) {
      answers.guardian_name = '';
      answers.guardian_date = '';
      answers.guardian_skipped = true;
      const target = SLIDES.findIndex(item => item.id === 'emergency_intro');
      transitionTo(target >= 0 ? target : current + 2, 1);
      return;
    } else {
      answers.guardian_skipped = false;
      transitionTo(current + 1, 1);
      return;
    }
  }

  if (s.id === 'guardian_date') {
    const ageVal = parseInt(answers.age, 10);
    const isMinor = !isNaN(ageVal) && ageVal < 18;
    const nameVal = (answers.guardian_name || '').toString().trim();
    const dateVal = (answers.guardian_date || '').toString().trim();
    if ((isMinor || nameVal) && !dateVal) {
      showError('This field is required');
      const inp = currentEl.querySelector('.q-input');
      if (inp) { inp.focus(); shake(inp); }
      return;
    }
  }

  // Validate terms agreement (11/16)
  if (s.type === 'terms' && !answers.terms_agreed) {
    showError('Please agree to the terms before continuing');
    return;
  }

  if (s.optional && !(answers[s.id] || '').toString().trim()) {
    skipOptionalGroup(s);
    return;
  }

  // Validate required fields
  const conditionallyRequired = s.requiredWhen && !answers[`${s.requiredWhen}_skipped`];
  if (s.required || conditionallyRequired) {
    if (s.type === 'choice' && !answers[s.id]) {
      showError('Please pick an option');
      return;
    }
    if (['text','number','date'].includes(s.type)) {
      const val = (answers[s.id] || '').toString().trim();
      if (!val) {
        showError('This field is required');
        // shake the input
        const inp = currentEl.querySelector('.q-input');
        if (inp) { inp.focus(); shake(inp); }
        return;
      }
    }
    if (s.type === 'sig' && !answers[s.id]) {
      showError('Please sign before continuing');
      return;
    }
    if (s.type === 'confirm' && !answers[s.id]) {
      showError('Please acknowledge the safety commitments');
      return;
    }
  }

  transitionTo(current + 1, 1);
}

function skipOptionalGroup(slide) {
  if (slide.id === 'guardian_name') {
    const ageVal = parseInt(answers.age, 10);
    const isMinor = !isNaN(ageVal) && ageVal < 18;
    if (isMinor) {
      showError('Parent or guardian name is required for minors (under 18)');
      const inp = currentEl.querySelector('.q-input');
      if (inp) { inp.focus(); shake(inp); }
      return;
    }
  }
  const group = slide.group;
  if (!group) return;
  (slide.groupFields || [slide.id]).forEach(id => { answers[id] = null; });
  answers[`${group}_skipped`] = true;
  const target = SLIDES.findIndex(item => item.id === slide.skipTo);
  transitionTo(target >= 0 ? target : current + 1, 1);
}

function prevSlide() {
  if (current <= 0) return;
  let target = current - 1;
  while (target > 0) {
    const slide = SLIDES[target];
    const isSkippedChild = slide.group &&
      answers[`${slide.group}_skipped`] &&
      slide.id !== (slide.groupFields || [])[0];
    if (!isSkippedChild) break;
    target -= 1;
  }
  transitionTo(target, -1);
}

function transitionTo(index, dir) {
  clearError();
  direction = dir;
  const old = currentEl;

  // Exit old
  if (old) {
    old.classList.remove('active');
    old.classList.add(dir === 1 ? 'exit' : 'exit-back');
    setTimeout(() => old.remove(), 600);
  }

  current = index;
  buildSlide(current, old, dir === 1 ? 'enter' : 'enter-back');
}

/* ══════════════════════════════════════════
   ERROR
══════════════════════════════════════════ */
let errTimer;
function showError(msg) {
  const el = document.getElementById('error-hint');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(errTimer);
  errTimer = setTimeout(() => el.classList.remove('show'), 2400);
}
function clearError() {
  document.getElementById('error-hint').classList.remove('show');
}
function shake(el) {
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' }
  ], { duration: 380, easing: 'ease-in-out' });
}

/* ══════════════════════════════════════════
   CLIENT-SIDE PDF GENERATION (pdf-lib)
══════════════════════════════════════════ */
function drawWrappedPdfText(page, text, { x, y, size, font, color, maxWidth, lineHeight }) {
  const paragraphs = text.split('\n');
  let curY = y;
  for (const para of paragraphs) {
    if (!para.trim()) {
      curY -= lineHeight;
      continue;
    }
    const words = para.split(' ');
    let line = '';
    for (const w of words) {
      const testLine = line ? `${line} ${w}` : w;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && line) {
        page.drawText(line, { x, y: curY, size, font, color });
        curY -= lineHeight;
        line = w;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x, y: curY, size, font, color });
      curY -= lineHeight;
    }
  }
  return curY;
}

async function embedPdfSig(doc, page, dataUrl, x, y, maxW, maxH) {
  if (!dataUrl || typeof dataUrl !== 'string') return;
  try {
    const raw = dataUrl.split(',')[1];
    if (!raw) return;
    const bytes = Uint8Array.from(atob(raw), c => c.charCodeAt(0));
    let img;
    try {
      img = await doc.embedPng(bytes);
    } catch (_e) {
      img = await doc.embedJpg(bytes);
    }
    if (img) {
      page.drawImage(img, { x, y, width: maxW || 115, height: maxH || 28 });
    }
  } catch (e) {
    console.warn('Signature embed error:', e);
  }
}

async function renderPdfConsentPage(doc, a) {
  const { StandardFonts, rgb } = PDFLib;
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const color = rgb(0.07, 0.07, 0.07);
  const left = 54;
  const width = 504;
  const line = (val = '', len = 28) => val || '_'.repeat(len);

  // Title
  const title = 'Consent Form';
  const titleW = fontBold.widthOfTextAtSize(title, 15);
  page.drawText(title, { x: (612 - titleW) / 2, y: 746, size: 15, font: fontBold, color });

  // Details
  let y = 708;
  page.drawText(`Name: ${line(a.name, 26)}    Age: ${line(a.age, 9)}`, { x: left, y, size: 11.5, font, color });
  y -= 27;
  page.drawText(`Gender: ${line(a.gender, 23)}    Phone: ${line(a.phone, 18)}`, { x: left, y, size: 11.5, font, color });
  y -= 27;
  page.drawText(`Address: ${line(a.address, 58)}`, { x: left, y, size: 11.5, font, color });
  y -= 27;
  page.drawText(`Emergency Contact: ${line(a.em_name, 17)}    Relationship: ${line(a.em_rel, 17)}`, { x: left, y, size: 11.5, font, color });
  y -= 27;
  page.drawText(`Emergency Contact Number: ${line(a.em_phone, 18)}`, { x: left, y, size: 11.5, font, color });

  y -= 26;
  const body = [
    'The counselling service is intended to provide psychological support for personal, emotional, interpersonal, educational, and adjustment-related concerns. It is a confidential and collaborative process. You will receive counselling from a trainee counsellor enrolled in the MSc Counselling Psychology programme at Montfort College under the supervision of qualified faculty members.',
    'Information shared during counselling will remain confidential except:\n• when there is a risk of serious harm to yourself or others;\n• when disclosure is required by law; or\n• for professional supervision and training purposes.',
    'Your counsellor is a trainee working under close supervision. If your needs are beyond the scope of supervised trainee practice or there are concerns about your immediate safety, you may be referred to a more appropriate mental health professional or service. This is to ensure you receive the safest and most appropriate care.',
    'Recording (Optional): Sessions may be audio/video recorded for supervision and training purposes only. I understand that I may withdraw this consent at any time.',
    'I have read and understood the above information. I have had the opportunity to ask questions, understand the limits of confidentiality, and voluntarily consent to receive counselling from a trainee counsellor under supervision.'
  ];

  for (const p of body) {
    y = drawWrappedPdfText(page, p, { x: left, y, size: 10, font, color, maxWidth: width, lineHeight: 13.5 });
    y -= 6;
  }

  // Signatures
  y -= 6;
  const sigY = y;
  page.drawText('Client Signature: ____________________', { x: left, y: sigY, size: 10.5, font, color });
  if (a.sig_client) await embedPdfSig(doc, page, a.sig_client, 142, sigY - 6, 100, 24);
  page.drawText(`Date: ${line(a.client_date, 17)}`, { x: 300, y: sigY, size: 10.5, font, color });

  y -= 28;
  page.drawText(`Parent/Legal Guardian (if applicable): ${line(a.guardian_name, 20)}    Date: ${line(a.guardian_date, 17)}`, { x: left, y, size: 10.5, font, color });

  y -= 28;
  const couSigY = y;
  if (a.counsellor_name || a.sig_counsellor) {
    page.drawText(`Trainee Counsellor: ${line(a.counsellor_name, 20)}`, { x: left, y: couSigY, size: 10.5, font, color });
    if (a.sig_counsellor) await embedPdfSig(doc, page, a.sig_counsellor, 155, couSigY - 6, 100, 24);
    page.drawText(`Date: ${line(a.client_date, 17)}`, { x: 300, y: couSigY, size: 10.5, font, color });
  } else {
    page.drawText('Trainee Counsellor: ____________________    Date: __________________', { x: left, y: couSigY, size: 10.5, font, color });
  }

  y -= 26;
  page.drawText('In case of emergencies, please contact emergency helplines:', { x: left, y, size: 10.5, font, color });
  y -= 15;
  page.drawText('-    Arpita Foundation Suicide Helpline (9am–9pm, all days) — 080 23655557 / 080 23656667', { x: 80, y, size: 9.5, font, color });
  y -= 13;
  page.drawText("-    Cadabam's Suicide Prevention Crisis Helpline (24x7) — 97414 76476", { x: 80, y, size: 9.5, font, color });
}

async function renderPdfSafetyPage(doc, a) {
  const { StandardFonts, rgb } = PDFLib;
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const color = rgb(0.07, 0.07, 0.07);
  const left = 54;
  const width = 504;
  const line = (val = '', len = 38) => val || '_'.repeat(len);

  // Title
  const title = 'Safety Planning Contract';
  const titleW = fontBold.widthOfTextAtSize(title, 15);
  page.drawText(title, { x: (612 - titleW) / 2, y: 746, size: 15, font: fontBold, color });

  let y = 708;
  page.drawText(`Client Name: ${line(a.name)}`, { x: left, y, size: 10.5, font, color });
  y -= 24;
  page.drawText(`Counsellor Name: ${line(a.counsellor_name)}`, { x: left, y, size: 10.5, font, color });
  y -= 24;
  page.drawText(`Date: ${line(a.client_date, 34)}`, { x: left, y, size: 10.5, font, color });

  y -= 24;
  y = drawWrappedPdfText(page, "This is an agreement between the client and counsellor to support the client's safety and well-being, and a mutual understanding to take steps to prevent self-harm.", { x: left, y, size: 10, font, color, maxWidth: width, lineHeight: 13.5 });

  y -= 6;
  page.drawText('My Commitments as a Client — I agree that:', { x: left, y, size: 10, font: fontBold, color });
  y -= 15;
  const clientBullets = [
    'I will not harm myself or attempt suicide as long as I am in counselling.',
    'If I feel overwhelmed with thoughts of harming myself, I will first try to use the coping strategies we have discussed.',
    'If these strategies are not enough, I will immediately contact a trusted family member or close friend. If I feel I cannot stay safe, I will call an emergency helpline (listed below).',
    'I will continue attending counselling sessions and remain honest about my feelings.',
    'I will continue talking with as many people as I can for as long as necessary. I have been given this form and understand my counsellor will keep a copy.'
  ];
  for (const b of clientBullets) {
    y = drawWrappedPdfText(page, `-    ${b}`, { x: 74, y, size: 9.5, font, color, maxWidth: width - 20, lineHeight: 13 });
    y -= 3;
  }

  y -= 5;
  page.drawText('Emergency helplines:', { x: left, y, size: 10, font: fontBold, color });
  y -= 14;
  const helplines = [
    'Arpita Foundation (Bengaluru) 080 23655557 / 080 23656667 Available daily, 9:00 AM to 9:00 PM.',
    "Cadabam's Mental Health Helpline +91 96111 94949 Available 24×7.",
    'A-MUDRA Yuva Helpline +91 98803 96331 Monday to Saturday, 9:00 AM to 6:00 PM.',
    'Tele-MANAS (Government of India) 14416 or 1800 891 4416 Available 24×7, free mental health support.',
    'Vandrevala Foundation +91 9999 666 555 Available 24×7 via phone and WhatsApp.'
  ];
  for (const h of helplines) {
    y = drawWrappedPdfText(page, `-    ${h}`, { x: 74, y, size: 9, font, color, maxWidth: width - 20, lineHeight: 12 });
    y -= 2;
  }

  y -= 5;
  page.drawText("My Counsellor's Commitments — as your counsellor, I agree to:", { x: left, y, size: 10, font: fontBold, color });
  y -= 14;
  const couBullets = [
    'Support you in developing coping strategies and safety plans.',
    'Be available during agreed working hours, and provide crisis-helpline information for after-hours emergencies.',
    'Respect your confidentiality, but if I believe your life is in immediate danger, I may need to involve your family/guardian or emergency services to ensure your safety.'
  ];
  for (const b of couBullets) {
    y = drawWrappedPdfText(page, `-    ${b}`, { x: 74, y, size: 9.5, font, color, maxWidth: width - 20, lineHeight: 13 });
    y -= 3;
  }

  y -= 10;
  const cltSigY = y;
  page.drawText("Client's Signature and Date: _______________________________", { x: left, y: cltSigY, size: 10, font, color });
  if (a.sig_client) await embedPdfSig(doc, page, a.sig_client, 215, cltSigY - 6, 100, 24);

  y -= 26;
  const couSigY = y;
  const couText = a.counsellor_name || a.sig_counsellor ? '_____________________________' : '(section skipped)';
  page.drawText(`Counsellor's Signature and Date: ${couText}`, { x: left, y: couSigY, size: 10, font, color });
  if (a.sig_counsellor) await embedPdfSig(doc, page, a.sig_counsellor, 235, couSigY - 6, 100, 24);
}

async function generateConsentPdfBlob(a = answers) {
  if (typeof PDFLib !== 'undefined') {
    const doc = await PDFLib.PDFDocument.create();
    await renderPdfConsentPage(doc, a);
    const bytes = await doc.save();
    return new Blob([bytes], { type: 'application/pdf' });
  }
  return fetchPdfBlob('/api/generate-pdf');
}

async function generateSafetyPdfBlob(a = answers) {
  if (typeof PDFLib !== 'undefined') {
    const doc = await PDFLib.PDFDocument.create();
    await renderPdfSafetyPage(doc, a);
    const bytes = await doc.save();
    return new Blob([bytes], { type: 'application/pdf' });
  }
  return fetchPdfBlob('/api/generate-safety-pdf');
}

async function generateBothPdfBlob(a = answers) {
  if (typeof PDFLib !== 'undefined') {
    const doc = await PDFLib.PDFDocument.create();
    await renderPdfConsentPage(doc, a);
    await renderPdfSafetyPage(doc, a);
    const bytes = await doc.save();
    return new Blob([bytes], { type: 'application/pdf' });
  }
  return fetchPdfBlob('/api/generate-both-pdf');
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ══════════════════════════════════════════
   USER ACTIONS (100% Client-Side)
══════════════════════════════════════════ */
async function generateConsentPDF() {
  try {
    const blob = await generateConsentPdfBlob();
    const name = (answers.name || 'Client').replace(/\s+/g, '_');
    saveBlob(blob, `Consent_Form_${name}.pdf`);
  } catch (err) {
    console.error(err);
    showError('Could not generate Consent PDF');
  }
}

async function generateSafetyPDF() {
  try {
    const blob = await generateSafetyPdfBlob();
    const name = (answers.name || 'Client').replace(/\s+/g, '_');
    saveBlob(blob, `Safety_Planning_Contract_${name}.pdf`);
  } catch (err) {
    console.error(err);
    showError('Could not generate Safety Planning PDF');
  }
}

async function downloadBothPDFs() {
  try {
    const [consent, safety] = await Promise.all([
      generateConsentPdfBlob(),
      generateSafetyPdfBlob()
    ]);
    const name = (answers.name || 'Client').replace(/\s+/g, '_');
    saveBlob(consent, `Consent_Form_${name}.pdf`);
    setTimeout(() => {
      saveBlob(safety, `Safety_Planning_Contract_${name}.pdf`);
    }, 500);
  } catch (err) {
    console.error(err);
    showError('Could not download both PDFs');
  }
}

let previewModalEl = null;
let currentPreviewBlobUrl = null;

function closePdfPreviewModal() {
  if (previewModalEl) {
    previewModalEl.classList.remove('open');
    setTimeout(() => {
      if (previewModalEl) {
        previewModalEl.remove();
        previewModalEl = null;
      }
      if (currentPreviewBlobUrl) {
        URL.revokeObjectURL(currentPreviewBlobUrl);
        currentPreviewBlobUrl = null;
      }
    }, 220);
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewModalEl && previewModalEl.classList.contains('open')) {
    closePdfPreviewModal();
  }
});

async function previewBothPDFs() {
  try {
    const blob = await generateBothPdfBlob();
    if (currentPreviewBlobUrl) {
      URL.revokeObjectURL(currentPreviewBlobUrl);
    }
    const url = URL.createObjectURL(blob);
    currentPreviewBlobUrl = url;

    if (!previewModalEl) {
      previewModalEl = document.createElement('div');
      previewModalEl.id = 'pdf-preview-modal';
      previewModalEl.innerHTML = `
        <div class="pdf-modal-backdrop"></div>
        <div class="pdf-modal-container">
          <div class="pdf-modal-header">
            <span class="pdf-modal-title">Combined PDF Preview</span>
            <div class="pdf-modal-actions">
              <button type="button" class="pdf-modal-btn" id="pdf-modal-download-btn">Download</button>
              <button type="button" class="pdf-modal-btn" id="pdf-modal-tab-btn">Open in Tab</button>
              <button type="button" class="pdf-modal-close" id="pdf-modal-close-btn" aria-label="Close">✕</button>
            </div>
          </div>
          <iframe id="pdf-modal-frame" src="${url}" title="Combined PDF Preview"></iframe>
        </div>
      `;
      document.body.appendChild(previewModalEl);

      previewModalEl.querySelector('.pdf-modal-backdrop').addEventListener('click', closePdfPreviewModal);
      previewModalEl.querySelector('#pdf-modal-close-btn').addEventListener('click', closePdfPreviewModal);
      previewModalEl.querySelector('#pdf-modal-download-btn').addEventListener('click', () => {
        const name = (answers.name || 'Client').replace(/\s+/g, '_');
        saveBlob(blob, `Combined_Counselling_Forms_${name}.pdf`);
      });
      previewModalEl.querySelector('#pdf-modal-tab-btn').addEventListener('click', () => {
        const win = window.open(url, '_blank');
        if (!win || win.closed) {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      });
    } else {
      const frame = previewModalEl.querySelector('#pdf-modal-frame');
      if (frame) frame.src = url;
    }

    requestAnimationFrame(() => {
      previewModalEl.classList.add('open');
    });
  } catch (err) {
    console.error(err);
    showError('Could not preview combined PDF');
  }
}

async function shareBothPDFs() {
  const name = answers['name'] || 'Client';
  try {
    const [consent, safety] = await Promise.all([
      generateConsentPdfBlob(),
      generateSafetyPdfBlob()
    ]);
    const safeName = (name || 'Client').replace(/\s+/g, '_');
    const files = [
      new File([consent], `Consent_Form_${safeName}.pdf`, { type: 'application/pdf' }),
      new File([safety], `Safety_Planning_Contract_${safeName}.pdf`, { type: 'application/pdf' })
    ];
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files }))) {
      await navigator.share({
        title: 'Counselling Forms',
        text: `Completed counselling forms for ${name}`,
        files
      });
      return;
    }
  } catch (err) {
    if (err.name === 'AbortError') return;
    console.warn('Direct PDF sharing unavailable:', err);
  }

  showError('Direct PDF sharing not supported on this browser; downloading both PDFs instead');
  await downloadBothPDFs();
}

// Backwards-compatible name for existing callers/tests.
function generatePDF() {
  return generateConsentPDF();
}

async function fetchPdfBlob(endpoint) {
  const candidates = [
    endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`,
    endpoint
  ];
  let lastErr;
  for (const ep of candidates) {
    try {
      const response = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      if (response.ok) return await response.blob();
      lastErr = new Error(`PDF request to ${ep} failed with status: ${response.status}`);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error('PDF request failed');
}
