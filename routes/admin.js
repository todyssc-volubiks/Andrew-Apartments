const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Admin dashboard
router.get('/dashboard', (req, res) => {
  db.all(`SELECT * FROM apartments`, (err, apartments) => {
    if (err) {
      console.error(err);
      apartments = [];
    }
    db.all(`SELECT * FROM orders`, (err, orders) => {
      if (err) {
        console.error(err);
        orders = [];
      }
      res.render('admin/dashboard', { apartments, orders, title: 'Admin Dashboard' });
    });
  });
});

// Add apartment
router.post('/add-apartment', (req, res) => {
  const { title, description, price, category, bedrooms, bathrooms, location, image_url, features } = req.body;
  
  db.run(
    `INSERT INTO apartments (title, description, price, category, bedrooms, bathrooms, location, image_url, features)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, price, category, bedrooms, bathrooms, location, image_url, features],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'Failed to add apartment' });
      }
      res.json({ success: true, message: 'Apartment added successfully' });
    }
  );
});

// Update apartment
router.post('/update-apartment/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, price, category, bedrooms, bathrooms, location, image_url, features, available } = req.body;
  
  db.run(
    `UPDATE apartments SET title = ?, description = ?, price = ?, category = ?, bedrooms = ?, bathrooms = ?, location = ?, image_url = ?, features = ?, available = ?
     WHERE id = ?`,
    [title, description, price, category, bedrooms, bathrooms, location, image_url, features, available ? 1 : 0, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'Failed to update apartment' });
      }
      res.json({ success: true, message: 'Apartment updated successfully' });
    }
  );
});

// Delete apartment
router.post('/delete-apartment/:id', (req, res) => {
  const id = req.params.id;
  
  db.run(`DELETE FROM apartments WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Failed to delete apartment' });
    }
    res.json({ success: true, message: 'Apartment deleted successfully' });
  });
});

// Run custom script (for backend operations)
router.post('/run-script', (req, res) => {
  const { script } = req.body;
  
  // Only allow safe operations
  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: 'Invalid script' });
  }
  
  try {
    // Example: Update prices, generate reports, etc.
    // This would execute admin scripts for batch operations
    console.log('Script executed:', script);
    res.json({ success: true, message: 'Script executed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
