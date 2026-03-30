const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { generateSeoMetadata } = require('../utils/socialShare');

// Rent apartments listing
router.get('/', (req, res) => {
  db.all(`SELECT * FROM apartments WHERE category = 'Rent' AND available = 1`, (err, apartments) => {
    if (err) {
      console.error(err);
      apartments = [];
    }
    res.render('category', { apartments, category: 'Rent', title: 'Rental Apartments' });
  });
});

// Rent - Single apartment details
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM apartments WHERE id = ? AND category = 'Rent'`, [id], (err, apartment) => {
    if (err || !apartment) {
      return res.status(404).render('404');
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const seoData = generateSeoMetadata(apartment, baseUrl);
    res.render('apartment-details', { apartment, category: 'Rent', title: apartment.title, shareUrls: seoData.shareUrls, seoData });
  });
});

module.exports = router;
