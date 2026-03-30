# Andrew Apartments - Real Estate Web App

A modern full-stack web application for managing rental apartments, serviced apartments, and properties for sale. Built with Node.js, Express, SQLite, and EJS.

## 🚀 Features

- **Multi-Category Listings**: Browse apartments by category (Rent, Serviced, Sales)
- **Product Pages**: Detailed apartment listings with images, amenities, and features
- **Shopping Cart**: Add properties to cart for bulk inquiries
- **Search Functionality**: Search apartments by title, description, and category
- **Admin Dashboard**: Manage apartments, orders, and run custom scripts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Session Management**: Cart persistence across browser sessions
- **Database Driven**: SQLite for data persistence

## 📋 Project Structure

```
andrew-apartments/
├── data/                   # Data files and backups
├── db/
│   ├── database.js        # Database connection
│   ├── init.js            # Database initialization
│   └── apartments.db      # SQLite database
├── public/
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   └── admin.css      # Admin panel styles
│   ├── js/
│   │   ├── main.js        # Main application JS
│   │   └── admin.js       # Admin panel JS
│   └── images/            # Static images
├── routes/
│   ├── index.js           # Home & search routes
│   ├── rent.js            # Rental apartments routes
│   ├── serviced.js        # Serviced apartments routes
│   ├── sales.js           # Sales apartments routes
│   ├── cart.js            # Shopping cart routes
│   └── admin.js           # Admin routes & scripts
├── views/
│   ├── index.ejs          # Home page
│   ├── category.ejs       # Category listing page
│   ├── apartment-details.ejs  # Single apartment page
│   ├── cart.ejs           # Shopping cart page
│   ├── search-results.ejs # Search results page
│   ├── 404.ejs            # 404 error page
│   ├── 500.ejs            # 500 error page
│   └── admin/
│       └── dashboard.ejs  # Admin dashboard
├── server.js              # Express application setup
├── package.json           # Dependencies
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Initialize Database**
```bash
npm run init-db
```

This creates the SQLite database and inserts sample apartments.

3. **Start the Application**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. **Access the Application**
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/dashboard

## 📱 Pages & Routes

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/rent` | Rental apartments listing |
| `/serviced` | Serviced apartments listing |
| `/sales` | Apartments for sale listing |
| `/rent/:id` | Single rental apartment details |
| `/serviced/:id` | Single serviced apartment details |
| `/sales/:id` | Single sales apartment details |
| `/cart` | Shopping cart |
| `/search` | Search results |

### Admin Routes
| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Admin dashboard |
| `/admin/add-apartment` | Add new apartment (POST) |
| `/admin/update-apartment/:id` | Update apartment (POST) |
| `/admin/delete-apartment/:id` | Delete apartment (POST) |
| `/admin/run-script` | Execute custom scripts (POST) |

## 🗄️ Database Schema

### Categories Table
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT, UNIQUE)
- description (TEXT)
- icon (TEXT)
```

### Apartments Table
```sql
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- description (TEXT)
- price (REAL)
- category (TEXT) - Foreign Key to categories.name
- bedrooms (INTEGER)
- bathrooms (INTEGER)
- location (TEXT)
- image_url (TEXT)
- features (TEXT) - Comma-separated
- available (BOOLEAN)
- created_at (DATETIME)
```

### Cart Items Table
```sql
- id (INTEGER PRIMARY KEY)
- session_id (TEXT)
- apartment_id (INTEGER) - Foreign Key to apartments.id
- quantity (INTEGER)
- added_at (DATETIME)
```

### Orders Table
```sql
- id (INTEGER PRIMARY KEY)
- customer_name (TEXT)
- customer_email (TEXT)
- customer_phone (TEXT)
- total_price (REAL)
- status (TEXT)
- apartment_id (INTEGER) - Foreign Key to apartments.id
- created_at (DATETIME)
```

## 🎨 Customization

### Styling
- Main styles: `/public/css/style.css`
- Admin styles: `/public/css/admin.css`
- Color scheme uses CSS variables in `:root` for easy customization

### Adding Apartments
1. Go to Admin Dashboard: `/admin/dashboard`
2. Navigate to "Apartments" tab
3. Fill in the form and click "Add Apartment"

### Running Custom Scripts
1. Go to Admin Dashboard
2. Navigate to "Scripts" tab
3. Enter your script in the console
4. Click "Execute Script"

## 🔒 Security Features

- Session-based cart management
- CSRF protection ready
- Input validation on forms
- SQL injection prevention with parameterized queries
- Error handling with error pages

## 📊 Sample Data

The database is pre-populated with sample apartments across all three categories:
- **Rent**: Studio and 1-bedroom apartments
- **Serviced**: Luxury serviced apartments
- **Sales**: Family homes and properties for sale

## 🚀 Future Enhancements

- User authentication & accounts
- Email notifications
- Payment integration
- Advanced filtering & sorting
- Image upload functionality
- Wishlist feature
- Property comparison tool
- Virtual tours
- Reviews & ratings

## 📝 License

All rights reserved © 2026 Andrew Apartments

## 📧 Support

For support and inquiries:
- Email: info@andrewaps.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ using Node.js & Express
