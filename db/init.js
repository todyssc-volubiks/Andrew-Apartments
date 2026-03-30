const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'apartments.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database.');
});

// Create tables
const initTables = () => {
  // Categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT
    )
  `, (err) => {
    if (err) console.error('Categories table error:', err);
    else console.log('✓ Categories table created');
  });

  // Apartments table
  db.run(`
    CREATE TABLE IF NOT EXISTS apartments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      bedrooms INTEGER,
      bathrooms INTEGER,
      location TEXT,
      image_url TEXT,
      features TEXT,
      available BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category) REFERENCES categories(name)
    )
  `, (err) => {
    if (err) console.error('Apartments table error:', err);
    else console.log('✓ Apartments table created');
  });

  // Cart items table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      apartment_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(apartment_id) REFERENCES apartments(id)
    )
  `, (err) => {
    if (err) console.error('Cart items table error:', err);
    else console.log('✓ Cart items table created');
  });

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      apartment_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(apartment_id) REFERENCES apartments(id)
    )
  `, (err) => {
    if (err) console.error('Orders table error:', err);
    else console.log('✓ Orders table created');
  });

  // Insert default categories
  const categories = [
    { name: 'Rent', description: 'Short and long-term rental apartments', icon: '🏠' },
    { name: 'Serviced', description: 'Fully serviced and furnished apartments', icon: '⭐' },
    { name: 'Sales', description: 'Apartments for purchase', icon: '🏡' }
  ];

  categories.forEach(cat => {
    db.run(
      `INSERT OR IGNORE INTO categories (name, description, icon) VALUES (?, ?, ?)`,
      [cat.name, cat.description, cat.icon],
      (err) => {
        if (err) console.error('Category insert error:', err);
        else console.log(`✓ Category "${cat.name}" inserted/exists`);
      }
    );
  });

  // Insert sample apartments
  const apartments = [
    {
      title: 'Modern Studio - Central Location',
      description: 'Bright and spacious studio with kitchen and bathroom.',
      price: 1200,
      category: 'Rent',
      bedrooms: 0,
      bathrooms: 1,
      location: 'Downtown',
      image_url: '/images/apt1.jpg',
      features: 'WiFi, AC, Parking, Security'
    },
    {
      title: 'Luxury 2-Bedroom Apartment',
      description: 'Fully furnished luxury apartment with premium amenities.',
      price: 2500,
      category: 'Serviced',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Uptown',
      image_url: '/images/apt2.jpg',
      features: 'WiFi, AC, Parking, Security, Housekeeping, Gym'
    },
    {
      title: 'Family Home - 3 Bedrooms',
      description: 'Perfect family home with spacious rooms and garden.',
      price: 450000,
      category: 'Sales',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Suburban Area',
      image_url: '/images/apt3.jpg',
      features: 'Garden, Garage, Security, Modern Kitchen'
    },
    {
      title: 'Cozy 1-Bedroom Apartment',
      description: 'Comfortable apartment perfect for singles or couples.',
      price: 1500,
      category: 'Rent',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Midtown',
      image_url: '/images/apt4.jpg',
      features: 'WiFi, AC, Parking, Security'
    }
  ];

  apartments.forEach(apt => {
    db.run(
      `INSERT INTO apartments (title, description, price, category, bedrooms, bathrooms, location, image_url, features)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [apt.title, apt.description, apt.price, apt.category, apt.bedrooms, apt.bathrooms, apt.location, apt.image_url, apt.features],
      (err) => {
        if (err) console.error('Apartment insert error:', err);
      }
    );
  });

  console.log('✓ Sample data inserted');
};

// Initialize
initTables();

// Close database
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('✓ Database initialization complete');
    process.exit(0);
  });
}, 1000);
