const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Home page
router.get('/', (req, res) => {
  db.all(`SELECT * FROM apartments LIMIT 6`, (err, apartments) => {
    if (err) {
      console.error(err);
      apartments = [];
    }
    res.render('index', { apartments, title: 'Home' });
  });
});

// Search functionality
router.get('/search', (req, res) => {
  const query = req.query.q || '';
  const category = req.query.category || '';
  
  let sql = `SELECT * FROM apartments WHERE title LIKE ? OR description LIKE ?`;
  let params = [`%${query}%`, `%${query}%`];
  
  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }
  
  db.all(sql, params, (err, apartments) => {
    if (err) {
      console.error(err);
      apartments = [];
    }
    res.render('search-results', { apartments, query, category, title: 'Search Results' });
  });
});

module.exports = router;
