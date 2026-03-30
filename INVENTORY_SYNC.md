# Inventory Sync System - Excel Integration Guide

## Overview
The Andrew Apartments application now syncs product inventory directly from Excel files. This allows you to:
- Upload an Excel spreadsheet with apartment availability data
- Automatically sync with the database
- Display exact inventory counts on product listings and detail pages
- Filter products to show only available items (based on Excel data)

## Quick Start

### 1. Prepare Your Excel File
Create an Excel file in the `public/` folder with the following columns:
- **Title** - Apartment/property name (must match database)
- **Category** - Rent, Sales, or Serviced
- **Available** - Number of units available (integer)
- **Price** - Listing price (number)
- **Location** - Geographic location (text)

**Example file: `public/inventory.xlsx`**
```
Title                | Category | Available | Price  | Location
Royal Penthouse      | Rent     | 3         | 5000   | Downtown
Modern Studio        | Rent     | 8         | 1200   | Midtown
Luxury Mansion       | Sales    | 1         | 850000 | Uptown
Garden Apartment     | Serviced | 5         | 1800   | Riverside
Beach House          | Sales    | 2         | 650000 | Coastal
```

### 2. Sync Inventory from Excel

**Option A: Sync default file (public/inventory.xlsx)**
```bash
npm run sync-inventory
```

**Option B: Sync specific Excel file**
```bash
npm run sync-inventory ./path/to/your/inventory.xlsx
```

### 3. View Results
The CLI will show:
```
📖 Reading Excel file: public/inventory.xlsx
✓ Loaded 5 products from Excel
📊 Syncing inventory with database...

✨ Added: "Royal Penthouse" - Available: 3
✅ Updated: "Modern Studio" - Available: 8
✨ Added: "Luxury Mansion" - Available: 1
...

📈 Sync Summary:
   Added: 3
   Updated: 2
   Errors: 0
✓ Inventory sync complete!
```

## How It Works

### Database Schema
The system creates an `inventory` table with:
```sql
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  category TEXT,
  available INTEGER,
  price REAL,
  location TEXT,
  last_synced DATETIME
);
```

### Sync Process
1. **Read Excel**: Reads all rows from the first sheet
2. **Validate**: Checks for required "Title" column
3. **Check Existing**: Queries database for matching product
4. **Insert or Update**: 
   - New product → INSERT into inventory table
   - Existing product → UPDATE available count
5. **Log Results**: Shows summary of added/updated/errored products

### Display Logic
When users visit product pages:
1. Routes fetch apartments from main database
2. For each apartment, query inventory table by title
3. Get available count from inventory table
4. Filter to show only products with available > 0
5. Pass count to template for display

## Product Display Features

### Card Badges (Category Listings)
Each apartment card shows:
- Green availability badge with unit count: "3 Available"
- Position: Bottom-right corner of image
- Style: Green gradient with white text

### Detail Pages
Apartment detail view shows:
```
✓ X units available
```
- Appears below price information
- Green checkmark icon
- Shows singular/plural correctly

## API Reference

### inventorySync.js Functions

#### `syncInventoryFromExcel(excelFilePath)`
**Sync entire Excel file to database**
```javascript
const { syncInventoryFromExcel } = require('./utils/inventorySync');

await syncInventoryFromExcel('./public/inventory.xlsx')
  .then(result => {
    console.log(`Added: ${result.synced}, Updated: ${result.updated}`);
  })
  .catch(err => console.error(err));
```

#### `getAvailable(title, callback)`
**Get available count for specific product**
```javascript
const { getAvailable } = require('./utils/inventorySync');

getAvailable('Royal Penthouse', (count) => {
  console.log(`Available: ${count}`);
});
```

#### `getAllInventory(callback)`
**Get all inventory records**
```javascript
const { getAllInventory } = require('./utils/inventorySync');

getAllInventory((inventory) => {
  inventory.forEach(item => {
    console.log(`${item.title}: ${item.available} units`);
  });
});
```

#### `isInStock(title, callback)`
**Check if product has stock**
```javascript
const { isInStock } = require('./utils/inventorySync');

isInStock('Royal Penthouse', (inStock) => {
  console.log(inStock ? 'In stock!' : 'Out of stock');
});
```

## File Structure
```
andrew-apartments/
├── public/
│   ├── inventory.xlsx          ← Your inventory data
│   ├── inventory-sample.json   ← Sample format reference
│   └── css/
│       ├── style.css           ← Updated with teal accent
│       └── admin.css           ← Updated with teal accent
├── routes/
│   ├── rent.js                 ← Updated with inventory
│   ├── sales.js                ← Updated with inventory
│   └── serviced.js             ← Updated with inventory
├── utils/
│   └── inventorySync.js        ← New inventory utility
├── scripts/
│   └── sync-inventory.js       ← New CLI script
└── db/
    └── apartments.db           ← Contains inventory table
```

## Troubleshooting

### "Excel file not found"
- Make sure file exists in public folder or provide full path
- Check file permissions (readable by application)
- Use absolute path: `/path/to/inventory.xlsx`

### "Missing title" warning on rows
- Verify all products have a Title column filled
- Check for extra blank rows in Excel
- Title is the unique identifier for products

### Inventory not showing on products
- Run sync command: `npm run sync-inventory`
- Check that apartment titles EXACTLY match Excel titles (case-sensitive)
- Ensure available count is > 0
- Restart server after sync

### "Products not displaying"
- Products only show if available > 0 in Excel
- Check inventory sync ran successfully
- Verify database has inventory table: `SELECT COUNT(*) FROM inventory;`

### Database errors
- Delete old inventory table: Keep backup first!
- Clear database and reinitialize: `npm run init-db`
- Check file permissions on database

## Color System Update
The accent color has been changed from pink to **teal (#17a2b8)**:
- All buttons now use teal gradients
- Share buttons display in teal
- Header accents changed to teal
- Admin panel updated with teal theme

## Best Practices

1. **Keep Excel Organized**
   - Use single sheet
   - No merged cells
   - Header row in first row
   - One product per row

2. **Title Matching**
   - Titles must EXACTLY match database
   - Case-sensitive: "Royal Penthouse" ≠ "royal penthouse"
   - Update Excel when adding new products

3. **Regular Syncing**
   - Sync whenever inventory changes
   - Run before major sales/promotions
   - Keep Excel as source of truth

4. **Backup Data**
   - Save Excel with timestamps: `inventory_2024-03-30.xlsx`
   - Backup database before major syncs
   - Keep version history

## Example Workflow

### Initial Setup
```bash
# 1. Create inventory.xlsx with your data
# 2. Place in public/ folder
# 3. Run sync
npm run sync-inventory

# 4. Check results on http://localhost:3000
```

### Daily Updates
```bash
# 1. Update inventory.xlsx with latest counts
# 2. Save file
# 3. Run sync (replaces old counts)
npm run sync-inventory

# 4. Apartments automatically show updated availability
```

### Adding New Products
```bash
# 1. Add to database first (manual or through admin)
# 2. Add row to inventory.xlsx with same title
# 3. Run sync
npm run sync-inventory

# 4. Product shows with correct inventory
```

## Support
For issues or questions:
1. Check "Troubleshooting" section above
2. Review Excel format requirements
3. Verify file paths and permissions
4. Check sync command output for specific errors
