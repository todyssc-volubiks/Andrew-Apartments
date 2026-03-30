const express = require('express');
const router = express.Router();
const db = require('../db/database');

// View cart
router.get('/', (req, res) => {
  res.render('cart', { title: 'Shopping Cart' });
});

// Add to cart
router.post('/add/:id', (req, res) => {
  const apartmentId = req.params.id;
  
  db.get(`SELECT * FROM apartments WHERE id = ?`, [apartmentId], (err, apartment) => {
    if (err || !apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    
    // Check if already in cart
    const existingItem = req.session.cart.find(item => item.id === parseInt(apartmentId));
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.session.cart.push({
        id: apartment.id,
        title: apartment.title,
        price: apartment.price,
        image_url: apartment.image_url,
        quantity: 1,
        category: apartment.category
      });
    }
    
    res.json({ success: true, cartCount: req.session.cart.length });
  });
});

// Remove from cart
router.post('/remove/:id', (req, res) => {
  const apartmentId = parseInt(req.params.id);
  req.session.cart = req.session.cart.filter(item => item.id !== apartmentId);
  res.json({ success: true, cartCount: req.session.cart.length });
});

// Update cart quantity
router.post('/update/:id', (req, res) => {
  const apartmentId = parseInt(req.params.id);
  const quantity = parseInt(req.body.quantity) || 1;
  
  const item = req.session.cart.find(item => item.id === apartmentId);
  if (item) {
    if (quantity <= 0) {
      req.session.cart = req.session.cart.filter(item => item.id !== apartmentId);
    } else {
      item.quantity = quantity;
    }
  }
  
  res.json({ success: true });
});

module.exports = router;
