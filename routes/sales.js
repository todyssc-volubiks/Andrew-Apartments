const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { generateSeoMetadata } = require('../utils/socialShare');

// Sales apartments listing
router.get('/', (req, res) => {
  db.all(`SELECT * FROM apartments WHERE category = 'Sales' AND available = 1`, (err, apartments) => {
    if (err) {
      console.error(err);
      apartments = [];
    }
    res.render('category', { apartments, category: 'Sales', title: 'Apartments for Sale' });
  });
});

// Sales - Single apartment details
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM apartments WHERE id = ? AND category = 'Sales'`, [id], (err, apartment) => {
    if (err || !apartment) {
      return res.status(404).render('404');
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const seoData = generateSeoMetadata(apartment, baseUrl);
    res.render('apartment-details', { apartment, category: 'Sales', title: apartment.title, shareUrls: seoData.shareUrls, seoData });
  });
});

module.exports = router;
