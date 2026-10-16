// api/generate-pdf.js — Vercel Serverless Function for Consent PDF
'use strict';

const PDFDoc = require('pdfkit');
const { renderReferenceConsentForm } = require('../server.js');

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
  const filename = `Consent_Form_${name.replace(/\s+/g, '_')}.pdf`;

  const doc = new PDFDoc({
    size: 'LETTER',
    margins: { top: 48, bottom: 42, left: 54, right: 54 },
    info: { Title: 'Counselling Consent Form', Author: 'Montfort College' }
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  renderReferenceConsentForm(doc, a);
  doc.end();
};

