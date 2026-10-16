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
   WHATSAPP SHARE & PDF HELPERS
══════════════════════════════════════════ */
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
      if (!response.ok) {
        lastErr = new Error(`PDF request to ${ep} failed with status: ${response.status}`);
        continue;
      }

      // A hosting rewrite can return index.html with HTTP 200. Do not save or
      // preview that HTML document as though it were a PDF.
      const contentType = response.headers.get('content-type') || '';
      const blob = await response.blob();
      const signature = await blob.slice(0, 5).text();
      if (contentType.includes('application/pdf') && signature === '%PDF-') {
        return blob;
      }
      lastErr = new Error(`PDF request to ${ep} returned ${contentType || 'an invalid response'}`);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error('PDF request failed');
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function downloadBothPDFs() {
  try {
    const [consent, safety] = await Promise.all([
      fetchPdfBlob('/generate-pdf'),
      fetchPdfBlob('/generate-safety-pdf')
    ]);
    const name = (answers.name || 'Client').replace(/\s+/g, '_');
    saveBlob(consent, `Consent_Form_${name}.pdf`);
    setTimeout(() => {
      saveBlob(safety, `Safety_Planning_Contract_${name}.pdf`);
    }, 700);
  } catch (err) {
    console.error(err);
    // Let each action use its own browser-export fallback if a serverless
    // endpoint is temporarily unavailable.
    await generateConsentPDF();
    await generateSafetyPDF();
  }
}

async function shareBothPDFs() {
  const name = answers['name'] || 'Client';
  try {
    const [consent, safety] = await Promise.all([
      fetchPdfBlob('/generate-pdf'),
      fetchPdfBlob('/generate-safety-pdf')
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

async function previewBothPDFs() {
  const win = window.open('about:blank', '_blank');
  if (win) {
    try {
      win.document.write('<p style="font-family:sans-serif;padding:32px;color:#555;">Preparing PDF preview...</p>');
    } catch (e) {}
  }
  try {
    const blob = await fetchPdfBlob('/generate-both-pdf');
    const url = URL.createObjectURL(blob);
    if (win && !win.closed) {
      win.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  } catch (err) {
    console.error(err);
    // Keep the window created by the click gesture and show the two valid
    // documents when the optional combined endpoint is unavailable.
    try {
      const [consent, safety] = await Promise.all([
        fetchPdfBlob('/generate-pdf'),
        fetchPdfBlob('/generate-safety-pdf')
      ]);
      if (!win || win.closed) throw new Error('Preview window was closed');
      const consentUrl = URL.createObjectURL(consent);
      const safetyUrl = URL.createObjectURL(safety);
      win.document.open();
      win.document.write(`<!doctype html><title>Counselling forms preview</title>
        <style>body{margin:0;background:#f4f4f4;font:16px system-ui;color:#222}h1{margin:0;padding:16px 24px;font-size:18px;background:#fff}main{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px}section{height:calc(100vh - 85px);background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px #bbb}h2{font-size:14px;margin:0;padding:12px 16px}iframe{border:0;width:100%;height:calc(100% - 43px)}@media(max-width:800px){main{grid-template-columns:1fr}section{height:80vh}}</style>
        <h1>Counselling forms</h1><main><section><h2>Consent Form</h2><iframe src="${consentUrl}"></iframe></section><section><h2>Safety Planning Contract</h2><iframe src="${safetyUrl}"></iframe></section></main>`);
      win.document.close();
      setTimeout(() => {
        URL.revokeObjectURL(consentUrl);
        URL.revokeObjectURL(safetyUrl);
      }, 120000);
    } catch (fallbackErr) {
      if (win) win.close();
      console.error(fallbackErr);
      showError('Could not preview the PDFs');
    }
  }
}

/* ══════════════════════════════════════════
   PDF GENERATION
══════════════════════════════════════════ */
async function generateConsentPDF() {
  try {
    const blob = await fetchPdfBlob('/generate-pdf');
    const name = answers.name || 'Client';
    saveBlob(blob, `Consent_Form_${name.replace(/\s+/g, '_')}.pdf`);
    return;
  } catch (err) {
    console.warn('Server PDF export unavailable; using browser export.', err);
  }

  if (typeof html2pdf !== 'function') {
    showError('PDF export is unavailable');
    return;
  }

  const name           = answers['name']           || '________________';
  const age            = answers['age']            || '____';
  const gender         = answers['gender']         || '________________';
  const phone          = answers['phone']          || '________________';
  const address        = answers['address']        || '________________';
  const emName         = answers['em_name']        || '________________';
  const emRel          = answers['em_rel']         || '________________';
  const emPhone        = answers['em_phone']       || '________________';
  const clientDate     = answers['client_date']    || '________________';
  const couName        = answers['counsellor_name']|| '________________';
  const sigClient      = answers['sig_client']     || null;
  const sigCounsellor  = answers['sig_counsellor'] || null;

  const sigClientHtml = sigClient
    ? `<img src="${sigClient}" style="max-height:55px;max-width:200px;display:block;margin-bottom:6px;object-fit:contain;">`
    : '<div style="height:35px;color:#aaa;font-style:italic;font-size:10px;">[No Signature]</div>';

  const sigCouHtml = sigCounsellor
    ? `<img src="${sigCounsellor}" style="max-height:55px;max-width:200px;display:block;margin-bottom:6px;object-fit:contain;">`
    : '<div style="height:35px;color:#aaa;font-style:italic;font-size:10px;">[No Signature]</div>';

  const meta = {
    ts: new Date().toLocaleString(),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  const html = `
    <div style="text-align:center;border-bottom:2px solid #000;padding-bottom:12px;margin-bottom:20px;">
      <h1 style="font-size:18px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Counselling Informed Consent Form</h1>
      <p style="font-size:11px;color:#555;">MSc Counselling Psychology — Montfort College</p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:12px;">
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;width:28%;color:#111;">Client Name</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${name}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;width:20%;">Age / Gender</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${age} / ${gender}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;">Phone</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${phone}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;">Address</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${address}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;">Emergency Contact</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${emName} (${emRel})</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;font-weight:700;">Emergency Phone</td>
        <td style="padding:6px 8px;border-bottom:1px solid #e0e0e0;">${emPhone}</td>
      </tr>
    </table>

    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:16px 0 6px;background:#f5f5f5;padding:4px 8px;border-left:4px solid #000;">
      Counselling &amp; Confidentiality Terms
    </div>
    <div style="font-size:11px;line-height:1.6;color:#222;margin-bottom:10px;text-align:justify;">
      Counselling provides psychological support for personal, emotional, interpersonal, educational, and adjustment-related concerns.
      You will work with a trainee counsellor under qualified faculty supervision at Montfort College.
    </div>
    <div style="font-size:11px;line-height:1.6;color:#222;margin-bottom:10px;text-align:justify;">
      <strong>Confidentiality exceptions:</strong> Risk of harm to self or others · Disclosure required by law · Supervision purposes.
    </div>
    <div style="font-size:11px;line-height:1.6;color:#222;margin-bottom:10px;">
      <strong>Recording:</strong> Sessions may be recorded for supervision only. Consent may be withdrawn at any time.
    </div>

    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:16px 0 6px;background:#f5f5f5;padding:4px 8px;border-left:4px solid #000;">
      Emergency Helplines
    </div>
    <div style="font-size:10px;line-height:1.7;color:#222;">
      • Arpita Foundation: 080 23655557 / 080 23656667 (9am–9pm)<br>
      • Cadabam's Crisis Helpline: 97414 76476 (24×7)
    </div>

    <div style="margin-top:28px;display:flex;justify-content:space-between;gap:20px;">
      <div style="flex:1;border-top:1px solid #000;padding-top:8px;font-size:11px;">
        ${sigClientHtml}
        <strong>Client Signature</strong><br>Date: ${clientDate}
      </div>
      <div style="flex:1;border-top:1px solid #000;padding-top:8px;font-size:11px;">
        ${sigCouHtml}
        <strong>Trainee Counsellor:</strong> ${couName}<br>Date: ${clientDate}
      </div>
    </div>

    <div style="margin-top:24px;padding:8px 12px;background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;font-size:9px;color:#666;display:grid;grid-template-columns:1fr 1fr;gap:4px;">
      <div><strong>Submitted:</strong> ${meta.ts}</div>
      <div><strong>Timezone:</strong> ${meta.tz}</div>
    </div>
  `;

  const renderArea = document.getElementById('pdf-render-area');
  renderArea.innerHTML = html;
  renderArea.style.display = 'block';
  // html2canvas cannot reliably paint display:none, negative z-index, or
  // off-screen fixed elements. Keep the target in the document viewport while
  // it is being captured, then move it back out of the way afterwards.
  renderArea.style.position = 'absolute';
  renderArea.style.top = '0';
  renderArea.style.left = '0';
  renderArea.style.zIndex = '1000';

  const opts = {
    margin:      10,
    filename:    `Consent_Form_${name.replace(/\s+/g,'_')}.pdf`,
    image:       { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF:       { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  // Give the browser one paint so html2canvas sees the temporary render area.
  await new Promise(resolve => setTimeout(resolve, 200));
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await html2pdf().set(opts).from(renderArea).save();
  } catch (err) {
    console.error(err);
    showError('Could not create PDF');
  } finally {
    renderArea.style.display = 'none';
    renderArea.style.position = 'fixed';
    renderArea.style.top = '-9999px';
    renderArea.style.left = '-9999px';
    renderArea.style.zIndex = '-1';
  }
}

// Backwards-compatible name for existing callers/tests.
function generatePDF() {
  return generateConsentPDF();
}

async function generateSafetyPDF() {
  try {
    const blob = await fetchPdfBlob('/generate-safety-pdf');
    const name = (answers.name || 'Client').replace(/\s+/g, '_');
    saveBlob(blob, `Safety_Planning_Contract_${name}.pdf`);
  } catch (err) {
    console.warn('Server safety-plan PDF export unavailable; using browser export.', err);
  }

  if (typeof html2pdf !== 'function') {
    showError('Safety-plan PDF export is unavailable');
    return;
  }

  const name = answers.name || '________________';
  const counsellor = answers.counsellor_name || '________________';
  const date = answers.client_date || '________________';
  const clientSignature = answers.sig_client
    ? `<img src="${answers.sig_client}" style="max-height:50px;max-width:180px;object-fit:contain;vertical-align:middle;">`
    : '_______________________________';
  const counsellorSignature = answers.sig_counsellor
    ? `<img src="${answers.sig_counsellor}" style="max-height:50px;max-width:180px;object-fit:contain;vertical-align:middle;">`
    : '_______________________________';
  const renderArea = document.getElementById('pdf-render-area');
  renderArea.innerHTML = `
    <div style="font-family:Times New Roman,serif;color:#111;font-size:11pt;line-height:1.4;">
      <h1 style="text-align:center;font-size:16pt;margin:0 0 24px;">Safety Planning Contract</h1>
      <p>Client Name: ${name}</p><p>Counsellor Name: ${counsellor}</p><p>Date: ${date}</p>
      <p>This is an agreement between the client and counsellor to support the client's safety and well-being, and a mutual understanding to take steps to prevent self-harm.</p>
      <p><strong>My Commitments as a Client — I agree that:</strong></p>
      <ul><li>I will not harm myself or attempt suicide as long as I am in counselling.</li><li>If I feel overwhelmed with thoughts of harming myself, I will first use the coping strategies we have discussed.</li><li>If these strategies are not enough, I will immediately contact a trusted family member or close friend. If I cannot stay safe, I will call an emergency helpline.</li><li>I will continue attending counselling sessions and remain honest about my feelings.</li></ul>
      <p><strong>Emergency helplines:</strong></p>
      <ul><li>Arpita Foundation: 080 23655557 / 080 23656667 (9:00 AM–9:00 PM)</li><li>Cadabam's Mental Health Helpline: +91 96111 94949 (24×7)</li><li>Tele-MANAS: 14416 or 1800 891 4416 (24×7)</li><li>Vandrevala Foundation: +91 9999 666 555 (24×7)</li></ul>
      <p><strong>My Counsellor's Commitments</strong></p><p>Support you in developing coping strategies and safety plans; provide crisis-helpline information; and respect confidentiality, except where immediate safety requires involving family, guardians, or emergency services.</p>
      <p style="margin-top:32px;">Client's Signature and Date: ${clientSignature} &nbsp; ${date}</p>
      <p>Counsellor's Signature and Date: ${counsellorSignature} &nbsp; ${date}</p>
    </div>`;
  renderArea.style.display = 'block';
  renderArea.style.position = 'absolute';
  renderArea.style.top = '0';
  renderArea.style.left = '0';
  renderArea.style.zIndex = '1000';
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await html2pdf().set({
      margin: 10,
      filename: `Safety_Planning_Contract_${name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
    }).from(renderArea).save();
  } catch (fallbackErr) {
    console.error(fallbackErr);
    showError('Could not create safety planning PDF');
  } finally {
    renderArea.style.display = 'none';
    renderArea.style.position = 'fixed';
    renderArea.style.top = '-9999px';
    renderArea.style.left = '-9999px';
    renderArea.style.zIndex = '-1';
  }
}
