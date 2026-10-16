// server.js — Express + PDFKit backend for the consent form
'use strict';

const express = require('express');
const path    = require('path');
const fs      = require('fs');
const cors    = require('cors');
const PDFDoc  = require('pdfkit');

const app  = express();
const PORT = 3333;

app.use(cors());
app.use(express.json({ limit: '10mb' }));                 // accept base64 signatures
app.use(express.static(path.join(__dirname, 'public')));    // serve static assets from public/
app.use(express.static(path.join(__dirname)));             // fallback to root if needed

/* ────────────────────────────────────────────────
   POST /generate-pdf
   Body: { answers: { name, age, gender, phone,
                       address, em_name, em_rel,
                       em_phone, client_date,
                       counsellor_name?,
                       sig_client?, sig_counsellor? } }
   Response: application/pdf stream
──────────────────────────────────────────────── */
app.post(['/generate-pdf', '/api/generate-pdf'], (req, res) => {
  const a = req.body.answers || {};

  const name      = a.name           || '';
  const age       = a.age            || '';
  const gender    = a.gender         || '';
  const phone     = a.phone          || '';
  const address   = a.address        || '';
  const emName    = a.em_name        || '';
  const emRel     = a.em_rel         || '';
  const emPhone   = a.em_phone       || '';
  const cDate     = a.client_date    || new Date().toISOString().split('T')[0];
  const couName   = a.counsellor_name|| '';
  const sigClt    = a.sig_client     || null;   // base64 PNG data-URL or null
  const sigCou    = a.sig_counsellor || null;

  const filename  = `Consent_Form_${(name || 'Client').replace(/\s+/g,'_')}.pdf`;

  // ── PDFKit document ─────────────────────────
  const doc = new PDFDoc({
    size:    'LETTER',
    margins: { top: 48, bottom: 42, left: 54, right: 54 },
    info:    { Title: 'Counselling Consent Form', Author: 'Montfort College' }
  });

  res.setHeader('Content-Type',        'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  // Keep the exported form visually consistent with forms to fill/Consent Form.pdf.
  // This is intentionally a simple one-page Letter document: Times typography,
  // centered title, underlined fields, and uninterrupted paragraph flow.
  renderReferenceConsentForm(doc, a);
  doc.end();
  return;

  const W = doc.page.width - 120;   // usable width
  const PAGE_W = doc.page.width;
  let y = doc.y;

  // ── Helpers ───────────────────────────────
  const gap = (n = 8) => { doc.moveDown(n / 12); };

  function rule(color = '#CCCCCC') {
    doc.moveTo(60, doc.y).lineTo(PAGE_W - 60, doc.y).strokeColor(color).lineWidth(0.5).stroke();
    gap(6);
  }

  function sectionTitle(text) {
    gap(14);
    doc.rect(60, doc.y, W, 18).fill('#111111');
    doc.fill('#FFFFFF').font('Helvetica-Bold').fontSize(8)
       .text(text.toUpperCase(), 68, doc.y - 15, { width: W - 16, lineBreak: false });
    doc.fill('#000000');
    gap(10);
  }

  function row(label, value, opts = {}) {
    const labelW = opts.labelW || 130;
    const top    = doc.y;
    doc.font('Helvetica-Bold').fontSize(9).fill('#555555')
       .text(label, 60, top, { width: labelW, lineBreak: false });
    doc.font('Helvetica').fontSize(10).fill('#111111')
       .text(value || '—', 60 + labelW, top, { width: W - labelW });
    gap(4);
  }

  function twoCol(l1, v1, l2, v2) {
    const half = W / 2 - 10;
    const top  = doc.y;
    doc.font('Helvetica-Bold').fontSize(9).fill('#555555').text(l1, 60, top, { width: 90, lineBreak: false });
    doc.font('Helvetica').fontSize(10).fill('#111111').text(v1 || '—', 150, top, { width: half - 90 });

    const rTop = top;
    doc.font('Helvetica-Bold').fontSize(9).fill('#555555').text(l2, 60 + half + 10, rTop, { width: 90, lineBreak: false });
    doc.font('Helvetica').fontSize(10).fill('#111111').text(v2 || '—', 150 + half + 10, rTop, { width: half - 90 });
    gap(4);
  }

  function bodyText(text) {
    doc.font('Helvetica').fontSize(9.5).fill('#222222').lineGap(2).text(text, 60, doc.y, {
      width: W, align: 'justify', lineBreak: true
    });
    gap(8);
  }

  function bullet(text) {
    const bx = 68, tx = 80;
    const top = doc.y;
    doc.font('Helvetica').fontSize(9).fill('#111').text('•', bx, top, { width: 10, lineBreak: false });
    doc.font('Helvetica').fontSize(9).fill('#222').text(text, tx, top, { width: W - 20 });
    gap(3);
  }

  function helplineItem(label, value) {
    const top = doc.y;
    doc.font('Helvetica-Bold').fontSize(8.5).fill('#7c2d12').text(label, 68, top, { width: 160, lineBreak: false });
    doc.font('Helvetica').fontSize(8.5).fill('#222').text(value, 230, top, { width: W - 170 });
    gap(2);
  }

  async function embedSig(dataUrl, x, sigY, maxW = 180, maxH = 55) {
    if (!dataUrl) return;
    try {
      // dataUrl = "data:image/png;base64,AAA..."
      const base64 = dataUrl.split(',')[1];
      if (!base64) return;
      const buf = Buffer.from(base64, 'base64');
      doc.image(buf, x, sigY, { fit: [maxW, maxH] });
    } catch (e) {
      console.error('Sig embed error:', e.message);
    }
  }

  // ─────────────────────────────────────────────
  //  PAGE CONTENT
  // ─────────────────────────────────────────────

  // ── Header ────────────────────────────────────
  doc.rect(0, 0, PAGE_W, 70).fill('#111111');
  doc.fill('#FFFFFF').font('Helvetica-Bold').fontSize(18)
     .text('COUNSELLING INFORMED CONSENT FORM', 60, 22, { width: W, align: 'center' });
  doc.fill('#AAAAAA').font('Helvetica').fontSize(9)
     .text('MSc Counselling Psychology Programme  ·  Montfort College', 60, 46, { width: W, align: 'center' });
  doc.y = 80;
  doc.fill('#000000');

  // ── Client Details ────────────────────────────
  sectionTitle('Client Information');
  twoCol('Full Name',   name,   'Age / Gender', `${age} / ${gender}`);
  twoCol('Phone',       phone,  'Address',       address);
  twoCol('Emerg. Contact', `${emName} (${emRel})`, 'Emerg. Phone', emPhone);
  rule();

  // ── Terms ─────────────────────────────────────
  sectionTitle('Counselling & Confidentiality Terms');
  bodyText(
    'The counselling service is intended to provide psychological support for personal, emotional, interpersonal, educational, and adjustment-related concerns. It is a confidential and collaborative process. You will receive counselling from a trainee counsellor enrolled in the MSc Counselling Psychology programme at Montfort College under the supervision of qualified faculty members.'
  );

  doc.font('Helvetica-Bold').fontSize(9.5).fill('#111').text('Information shared during counselling will remain confidential except:', 60, doc.y, { width: W });
  gap(4);
  bullet('When there is a risk of serious harm to yourself or others;');
  bullet('When disclosure is required by law; or');
  bullet('For professional supervision and training purposes.');
  gap(4);

  doc.font('Helvetica-Bold').fontSize(9.5).fill('#111').text('Recording (Optional):', 60, doc.y, { continued: true });
  doc.font('Helvetica').fill('#222').text(' Sessions may be audio/video recorded for supervision and training purposes only. You may withdraw this consent at any time.', { width: W });
  gap(8);

  // ── Emergency helplines ───────────────────────
  sectionTitle('Emergency Helplines');
  doc.rect(60, doc.y, W, 2).fill('#FDBA74'); gap(4);
  helplineItem('Arpita Foundation (Suicide Helpline):', '080 23655557 / 080 23656667  (9am – 9pm, all days)');
  helplineItem('Cadabam\'s Crisis Helpline:', '97414 76476  (24×7)');
  helplineItem('Tele-MANAS (Govt. of India):', '14416 or 1800 891 4416  (24×7)');
  helplineItem('Vandrevala Foundation:', '+91 9999 666 555  (24×7 — Call & WhatsApp)');
  helplineItem('A-MUDRA Yuva Helpline:', '+91 98803 96331  (Mon–Sat, 9am–6pm)');
  gap(4);
  doc.rect(60, doc.y, W, 2).fill('#FDBA74');
  gap(14);
  rule();

  // ── Signatures ────────────────────────────────
  sectionTitle('Signatures');

  const sigBoxTop = doc.y;
  const half2     = (W - 20) / 2;

  // Left: Client
  doc.rect(60, sigBoxTop, half2, 90).stroke('#CCCCCC');
  doc.font('Helvetica-Bold').fontSize(8).fill('#555').text('CLIENT SIGNATURE', 66, sigBoxTop + 4);
  if (sigClt) embedSig(sigClt, 66, sigBoxTop + 16, half2 - 12, 55);
  doc.font('Helvetica').fontSize(8).fill('#111')
     .text(`Date: ${cDate}`, 66, sigBoxTop + 78);

  // Right: Counsellor (may be blank)
  const rx = 60 + half2 + 20;
  doc.rect(rx, sigBoxTop, half2, 90).stroke('#CCCCCC');
  if (couName || sigCou) {
    doc.font('Helvetica-Bold').fontSize(8).fill('#555').text('COUNSELLOR SIGNATURE', rx + 6, sigBoxTop + 4);
    if (sigCou) embedSig(sigCou, rx + 6, sigBoxTop + 16, half2 - 12, 55);
    doc.font('Helvetica').fontSize(8).fill('#111')
       .text(`Name: ${couName || '—'}`, rx + 6, sigBoxTop + 72);
    doc.text(`Date: ${cDate}`, rx + 6, sigBoxTop + 82);
  } else {
    doc.font('Helvetica').fontSize(8).fill('#AAAAAA')
       .text('(Counsellor section skipped)', rx + 6, sigBoxTop + 38, { width: half2 - 12, align: 'center' });
  }

  doc.y = sigBoxTop + 100;
  gap(16);

  // ── Metadata footer ───────────────────────────
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  doc.rect(60, doc.y, W, 28).fill('#F5F5F5');
  doc.fill('#888888').font('Helvetica').fontSize(7.5)
     .text(`Submission timestamp: ${ts}  ·  Generated by Montfort College Client Care Portal`,
           68, doc.y - 22, { width: W - 16 });

  // ── Finalize ──────────────────────────────────
  doc.end();
});

function renderReferenceConsentForm(doc, a) {
  const left = 54;
  const width = doc.page.width - 108;
  const line = (value = '', length = 28) => value || '_'.repeat(length);

  doc.font('Times-Bold').fontSize(15).text('Consent Form', 0, 46, {
    width: doc.page.width,
    align: 'center'
  });

  doc.font('Times-Roman').fontSize(11.5).fillColor('#111111');
  doc.text(`Name: ${line(a.name, 26)} Age: ${line(a.age, 9)}`, left, 84, { width });
  doc.text(`Gender: ${line(a.gender, 23)} Phone: ${line(a.phone, 18)}`, left, 111, { width });
  doc.text(`Address: ${line(a.address, 58)}`, left, 138, { width });
  doc.text(`Emergency Contact: ${line(a.em_name, 17)} Relationship: ${line(a.em_rel, 17)}`, left, 165, { width });
  doc.text(`Emergency Contact Number: ${line(a.em_phone, 18)}`, left, 192, { width });

  const body = [
    'The counselling service is intended to provide psychological support for personal, emotional, interpersonal, educational, and adjustment-related concerns. It is a confidential and collaborative process. You will receive counselling from a trainee counsellor enrolled in the MSc Counselling Psychology programme at Montfort College under the supervision of qualified faculty members.',
    'Information shared during counselling will remain confidential except:',
    '• when there is a risk of serious harm to yourself or others;\n• when disclosure is required by law; or\n• for professional supervision and training purposes.',
    'Your counsellor is a trainee working under close supervision. If your needs are beyond the scope of supervised trainee practice or there are concerns about your immediate safety, you may be referred to a more appropriate mental health professional or service. This is to ensure you receive the safest and most appropriate care.',
    'Recording (Optional): Sessions may be audio/video recorded for supervision and training purposes only. I understand that I may withdraw this consent at any time.',
    'I have read and understood the above information. I have had the opportunity to ask questions, understand the limits of confidentiality, and voluntarily consent to receive counselling from a trainee counsellor under supervision.'
  ];

  let y = 220;
  const paragraphs = [
    { text: body[0], gap: 8 },
    { text: body[1], gap: 9 },
    { text: body[2], gap: 9 },
    { text: body[3], gap: 9 },
    { text: body[4], gap: 9 },
    { text: body[5], gap: 10 }
  ];
  paragraphs.forEach(({ text, gap }) => {
    doc.text(text, left, y, { width, lineGap: 2.5, align: 'left' });
    y = doc.y + gap;
  });

  const clientSigY = y;
  doc.text('Client Signature: ____________________', left, y, { width: 230 });
  if (a.sig_client) {
    embedSignature(doc, a.sig_client, 142, clientSigY - 16);
  }
  doc.text(`Date: ${line(a.client_date, 17)}`, 290, y, { width: 220 });
  y += 34;

  doc.text(`Parent/Legal Guardian (if applicable): ${line(a.guardian_name, 20)} Date: ${line(a.guardian_date, 17)}`, left, y, { width });
  y += 34;

  const counsellorSigY = y;
  if (a.counsellor_name || a.sig_counsellor) {
    doc.text(`Trainee Counsellor: ${line(a.counsellor_name, 20)}`, left, y, { width: 230 });
    if (a.sig_counsellor) {
      embedSignature(doc, a.sig_counsellor, 155, counsellorSigY - 16);
    }
    doc.text(`Date: ${line(a.client_date, 17)}`, 290, y, { width: 220 });
  } else {
    doc.text('Trainee Counsellor: ____________________ Date: __________________', left, y, { width });
  }
  y += 36;

  doc.text('In case of emergencies, please contact emergency helplines:', left, y, { width });
  y += 24;
  doc.text('-    Arpita Foundation Suicide Helpline (9am–9pm, all days) — 080 23655557 / 080\n     23656667', 108, y, { width: width - 54, lineGap: 2.5 });
  y = doc.y + 8;
  doc.text("-    Cadabam's Suicide Prevention Crisis Helpline (24x7) — 97414 76476", 108, y, { width: width - 54 });
}

app.post(['/generate-safety-pdf', '/api/generate-safety-pdf'], (req, res) => {
  const a = req.body.answers || {};
  const name = a.name || 'Client';
  const filename = `Safety_Planning_Contract_${name.replace(/\s+/g, '_')}.pdf`;
  const doc = new PDFDoc({
    size: 'LETTER',
    margins: { top: 48, bottom: 42, left: 54, right: 54 },
    info: { Title: 'Safety Planning Contract', Author: 'Montfort College' }
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);
  renderReferenceSafetyPlan(doc, a);
  doc.end();
});

app.post(['/generate-both-pdf', '/api/generate-both-pdf'], (req, res) => {
  const a = req.body.answers || {};
  const name = a.name || 'Client';
  const filename = `Counselling_Forms_${name.replace(/\s+/g, '_')}.pdf`;
  const doc = new PDFDoc({
    size: 'LETTER',
    margins: { top: 48, bottom: 42, left: 54, right: 54 },
    info: { Title: 'Counselling Consent & Safety Planning', Author: 'Montfort College' },
    autoFirstPage: false
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  doc.pipe(res);

  doc.addPage({ size: 'LETTER', margins: { top: 48, bottom: 42, left: 54, right: 54 } });
  renderReferenceConsentForm(doc, a);

  doc.addPage({ size: 'LETTER', margins: { top: 48, bottom: 42, left: 54, right: 54 } });
  renderReferenceSafetyPlan(doc, a);

  doc.end();
});

// Serve frontend fallback for any non-API GET request
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/generate') || req.path.startsWith('/api')) {
    return next();
  }
  const pubPath = path.join(__dirname, 'public', 'index.html');
  const rootPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(pubPath)) return res.sendFile(pubPath);
  if (fs.existsSync(rootPath)) return res.sendFile(rootPath);
  next();
});

function renderReferenceSafetyPlan(doc, a) {
  const left = 54;
  const width = doc.page.width - 108;
  const line = (value = '', length = 38) => value || '_'.repeat(length);

  doc.font('Times-Bold').fontSize(15).text('Safety Planning Contract', 0, 46, {
    width: doc.page.width,
    align: 'center'
  });

  doc.font('Times-Roman').fontSize(11).fillColor('#111111');
  doc.text(`Client Name: ${line(a.name)}`, left, 84, { width });
  doc.text(`Counsellor Name: ${line(a.counsellor_name)}`, left, 111, { width });
  doc.text(`Date: ${line(a.client_date, 34)}`, left, 138, { width });

  let y = 165;
  const paragraph = (text, gap = 10) => {
    doc.font('Times-Roman');
    doc.text(text, left, y, { width, lineGap: 2.5 });
    y = doc.y + gap;
  };
  const bullet = (text, gap = 2) => {
    doc.text(`-    ${text}`, 108, y, { width: width - 54, lineGap: 2.5 });
    y = doc.y + gap;
  };

  paragraph("This is an agreement between the client and counsellor to support the client's safety and well-being, and a mutual understanding to take steps to prevent self-harm.", 13);
  paragraph('My Commitments as a Client — I agree that:', 3);
  bullet('I will not harm myself or attempt suicide as long as I am in counselling.');
  bullet('If I feel overwhelmed with thoughts of harming myself, I will first try to use the coping strategies we have discussed.');
  bullet('If these strategies are not enough, I will immediately contact a trusted family member or close friend. If I feel I cannot stay safe, I will call an emergency helpline (listed below).');
  bullet('I will continue attending counselling sessions and remain honest about my feelings.');
  bullet('I will continue talking with as many people as I can for as long as necessary. I have been given this form and understand my counsellor will keep a copy.', 13);

  paragraph('Emergency helplines:', 3);
  bullet('Arpita Foundation (Bengaluru) 080 23655557 / 080 23656667 Available daily, 9:00 AM to 9:00 PM.');
  bullet("Cadabam's Mental Health Helpline +91 96111 94949 Available 24×7.");
  bullet('A-MUDRA Yuva Helpline +91 98803 96331 Monday to Saturday, 9:00 AM to 6:00 PM.');
  bullet('Tele-MANAS (Government of India) 14416 or 1800 891 4416 Available 24×7, free mental health support.');
  bullet('Vandrevala Foundation +91 9999 666 555 Available 24×7 via phone and WhatsApp.', 13);

  doc.font('Times-Bold').text("My Counsellor's Commitments — as your counsellor, I agree to:", left, y, { width });
  y = doc.y + 5;
  paragraph('Support you in developing coping strategies and safety plans.', 5);
  paragraph('Be available during agreed working hours, and provide crisis-helpline information for after-hours emergencies.', 5);
  paragraph('Respect your confidentiality, but if I believe your life is in immediate danger, I may need to involve your family/guardian or emergency services to ensure your safety.', 14);

  const clientSigY = y;
  doc.font('Times-Roman').text('Client\'s Signature and Date: _______________________________', left, y, { width });
  if (a.sig_client) embedSignature(doc, a.sig_client, 215, clientSigY - 16);
  y += 28;
  const counsellorSigY = y;
  doc.text(`Counsellor's Signature and Date: ${a.counsellor_name || a.sig_counsellor ? '_____________________________' : '(section skipped)'}`, left, y, { width });
  if (a.sig_counsellor) embedSignature(doc, a.sig_counsellor, 235, counsellorSigY - 16);
}

function embedSignature(doc, dataUrl, x, y) {
  if (!dataUrl || typeof dataUrl !== 'string') return;
  try {
    const base64 = dataUrl.split(',')[1];
    if (base64) doc.image(Buffer.from(base64, 'base64'), x, y, { fit: [115, 28] });
  } catch (err) {
    console.error('Signature embed error:', err.message);
  }
}

// ── Export & Start ─────────────────────────────
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n✅  Consent Form Server running at http://localhost:${PORT}\n`);
  });
}
