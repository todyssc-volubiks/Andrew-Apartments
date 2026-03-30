# 🚀 Andrew Apartments - Quick Start Guide

## ✅ Setup Complete!

Your real estate web application is ready to use. Here's what has been built:

### 📦 What's Included

1. **Full-Stack Web Application** (Node.js + Express + SQLite)
2. **Front-end Interface** with responsive design
3. **Admin Dashboard** for managing properties
4. **Database** with sample apartments
5. **Shopping Cart** system
6. **Search Functionality**
7. **Script Execution Engine** for backend operations

---

## 🎯 Getting Started (2 Steps)

### Step 1: Start the Server
```bash
npm start
```

### Step 2: Open in Browser
```
http://localhost:3000
```

---

## 📍 Key URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Home Page |
| `http://localhost:3000/rent` | Browse Rental Apartments |
| `http://localhost:3000/serviced` | Browse Serviced Apartments |
| `http://localhost:3000/sales` | Browse Apartments for Sale |
| `http://localhost:3000/cart` | Shopping Cart |
| `http://localhost:3000/admin/dashboard` | Admin Control Panel |

---

## 🎯 Main Features

### 👥 For Users
- ✅ Browse apartments in 3 categories (Rent, Serviced, Sales)
- ✅ View detailed apartment information
- ✅ Add properties to shopping cart
- ✅ Search for apartments
- ✅ Responsive mobile-friendly design

### 🛠️ For Admin
- ✅ Manage all apartments (add, edit, delete)
- ✅ View orders and customer inquiries
- ✅ Run custom scripts from the console
- ✅ Dashboard with statistics
- ✅ Bulk operations

---

## 📁 Project Structure

```
├── routes/           ← API endpoints & routes
├── views/            ← HTML templates (EJS)
├── public/           ← CSS, JS, images
├── db/               ← Database files
├── server.js         ← Main application file
└── package.json      ← Dependencies
```

---

## 💾 Database

The application uses **SQLite** with the following tables:

1. **categories** - Rent, Serviced, Sales
2. **apartments** - Property listings
3. **orders** - Customer orders
4. **cart_items** - Shopping cart data

---

## 🔧 Available Commands

```bash
# Start the server
npm start

# Start with auto-reload (requires nodemon)
npm run dev

# Initialize database with sample data
npm run init-db

# Install dependencies
npm install
```

---

## 🎨 Customization Tips

### 1. **Change Colors**
Edit `/public/css/style.css` and modify the `:root` CSS variables:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  /* Change these to customize colors */
}
```

### 2. **Add More Apartments**
- Go to `/admin/dashboard`
- Click "Apartments" tab
- Fill the form and submit

### 3. **Modify Header/Footer**
Edit the views in `/views/` folder (EJS templates)

---

## 📝 Admin Dashboard Guide

### Dashboard Tab
- View statistics about your listings
- See recent orders

### Apartments Tab
- Add new properties
- Edit existing properties
- Delete unwanted listings

### Orders Tab
- View all customer inquiries
- Track order status

### Scripts Tab
- Execute backend operations
- Run batch updates
- Generate reports

---

## 🚀 Next Steps

1. **Add Your Own Apartments**
   - Go to Admin Dashboard
   - Add real property information
   - Upload property images

2. **Customize Design**
   - Modify colors in CSS
   - Update company info in templates
   - Add your logo

3. **Connect Payment**
   - Integrate Stripe or PayPal
   - Add checkout process
   - Enable real transactions

4. **Add User Authentication**
   - Implement login/register
   - Track user favorites
   - Save property preferences

---

## 🆘 Troubleshooting

### Server won't start?
```bash
# Kill any process on port 3000
lsof -i :3000
kill -9 <PID>

# Try again
npm start
```

### Database issues?
```bash
# Reinitialize the database
npm run init-db
```

### Ports already in use?
```bash
# Use a different port
PORT=3001 npm start
```

---

## 📚 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Package Manager**: npm

---

## 🎓 Example Scripts

You can run scripts from the admin panel Scripts tab:

```javascript
// Update all prices by percentage
updateAllPrices(1.1)

// Generate monthly report
generateReport('monthly')

// Mark all as available
updateStatus('all', 'available')
```

---

## 📞 Support

For help:
- Check the main README.md
- Review the code comments
- Check client-side console for errors (F12)
- Check server logs in terminal

---

## 🎉 You're All Set!

Your real estate web application is ready to go live!

**Start the server and visit:** `http://localhost:3000`

---

Last Updated: March 30, 2026
