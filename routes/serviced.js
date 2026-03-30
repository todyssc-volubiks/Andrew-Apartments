const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { generateSeoMetadata } = require('../utils/socialShare');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Helper to get inventory count
function getInventoryCount(title, callback) {
  const dbPath = path.join(__dirname, '../db/apartments.db');
  const invDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      callback(0);
      return;
    }
    invDb.get('SELECT available FROM inventory WHERE title = ?', [title], (err, row) => {
      invDb.close();
      callback(row ? row.available : 0);
    });
  });
}

// Serviced apartments listing
router.get('/', (req, res) => {
  db.all(`SELECT * FROM apartments WHERE category = 'Serviced' AND available = 1`, (err, apartments) => {
    if (err) {
      console.error(err);
      return res.render('category', { apartments: [], category: 'Serviced', title: 'Serviced Apartments' });
    }
    
    // Enrich apartments with inventory counts
    let processed = 0;
    apartments.forEach((apt, index) => {
      getInventoryCount(apt.title, (count) => {
        apartments[index].inventoryCount = count;
        processed++;
        if (processed === apartments.length) {
          // Filter to show only products with available inventory
          const filtered = apartments.filter(a => a.inventoryCount > 0);
          res.render('category', { apartments: filtered, category: 'Serviced', title: 'Serviced Apartments' });
        }
      });
    });
    
    if (apartments.length === 0) {
      res.render('category', { apartments: [], category: 'Serviced', title: 'Serviced Apartments' });
    }
  });
});

// Serviced - Single apartment details
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM apartments WHERE id = ? AND category = 'Serviced'`, [id], (err, apartment) => {
    if (err || !apartment) {
      return res.status(404).render('404');
    }
    
    // Get inventory count
    getInventoryCount(apartment.title, (count) => {
      apartment.inventoryCount = count;
      
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const seoData = generateSeoMetadata(apartment, baseUrl);
      res.render('apartment-details', { 
        apartment, 
        category: 'Serviced', 
        title: apartment.title, 
        shareUrls: seoData.shareUrls, 
        seoData 
      });
    });
  });
});

module.exports = router;
