const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Global middleware to pass cart data
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.locals.cart = req.session.cart;
  res.locals.cartCount = req.session.cart.length;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/rent', require('./routes/rent'));
app.use('/serviced', require('./routes/serviced'));
app.use('/sales', require('./routes/sales'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));

// 404 Page
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏠 Andrew Apartments running on http://localhost:${PORT}`);
});

module.exports = app;
