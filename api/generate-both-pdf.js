// api/generate-both-pdf.js — Vercel Serverless Function for Both PDFs (Combined/Preview)
'use strict';

const PDFDoc = require('pdfkit');
const { renderReferenceConsentForm, renderReferenceSafetyPlan } = require('../server.js');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) {}
  }
  const a = body?.answers || body || {};

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
};

