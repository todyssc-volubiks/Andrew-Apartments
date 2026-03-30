# 🔧 Script Execution Guide

The **Andrew Apartments** web app includes a built-in script execution engine that allows you to run custom operations on your backend.

## 📋 What You Can Do With Scripts

1. **Batch Update Operations**
   - Update prices across all apartments
   - Change property status
   - Bulk edit descriptions

2. **Data Analysis**
   - Generate reports
   - Calculate statistics
   - Export data

3. **Automation**
   - Auto-update availability
   - Send notifications
   - Archive old listings

4. **Maintenance**
   - Database cleanup
   - Performance optimization
   - Data migration

---

## 🚀 How to Run Scripts

### Method 1: Admin Panel (Easiest)

1. Open Admin Dashboard: `http://localhost:3000/admin/dashboard`
2. Click on **Scripts** tab
3. Enter your script in the console
4. Click **Execute Script**

### Method 2: API Call

```javascript
fetch('/admin/run-script', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    script: 'your_script_here' 
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

---

## 📝 Example Scripts

### 1. Update All Prices (10% Increase)

```javascript
updateAllPrices(1.1)
```

**What it does**: Multiplies all apartment prices by 1.1 (10% increase)

### 2. Generate Monthly Report

```javascript
generateReport('monthly')
```

**What it does**: Creates a report of sales, rentals, and inquiries for the month

### 3. Update All Listings Status

```javascript
updateStatus('all', 'available')
```

**What it does**: Marks all apartments as available (or any status you specify)

### 4. Get Statistics

```javascript
getStatistics()
```

**What it does**: Returns count of apartments per category and total value

### 5. Archive Old Listings

```javascript
archiveOldListings(30)
```

**What it does**: Archives apartments not updated in the last 30 days

### 6. Update Location

```javascript
updateLocationByCategory('Rent', 'Downtown')
```

**What it does**: Updates all rental apartments to show location as "Downtown"

### 7. Duplicate Apartment

```javascript
duplicateApartment(1, 5)
```

**What it does**: Duplicates apartment with ID 1 five times (for similar properties)

### 8. Get Revenue Report

```javascript
getRevenueReport()
```

**What it does**: Calculates total value of all available properties

---

## 🔐 Security Notes

- Scripts are executed on the server-side
- Current implementation allows basic operations
- For production, add authentication and validation
- Only trusted users should have access to script execution

---

## 💡 Writing Custom Scripts

### Template Structure

```javascript
// Your script here
// You can use variables and logic

// Database operations would be performed server-side
// Results are returned as JSON

// Example:
if (condition) {
  // perform action
  // return success
}
```

### Available Operations

The backend supports:
- Reading apartment data
- Updating apartment information
- Calculating statistics
- Generating reports
- Managing orders

---

## 📊 Response Format

When you execute a script, you'll receive a response like:

**Success**:
```json
{
  "success": true,
  "message": "Script executed successfully",
  "data": { /* operation results */ }
}
```

**Error**:
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## 🛑 Common Issues & Solutions

### Issue: "Script not executing"
- Check if you're logged in to admin
- Verify syntax is correct
- Check browser console for errors

### Issue: "Permission denied"
- Ensure you have admin access
- Check server logs for details

### Issue: "Database locked"
- Wait a moment and try again
- Close other database connections

---

## 🚀 Advanced Use Cases

### Bulk Property Import

```javascript
// Import multiple properties at once
importProperties([
  { title: "Apt 1", price: 1200, category: "Rent" },
  { title: "Apt 2", price: 2500, category: "Serviced" }
])
```

### Price Tier Update

```javascript
// Update prices based on category
updatePricesByCategory({
  "Rent": 1.05,
  "Serviced": 1.08,
  "Sales": 1.03
})
```

### Seasonal Pricing

```javascript
// Apply seasonal discounts
applySeason('summer', 0.9)  // 10% discount for summer
```

---

## 📖 Best Practices

1. **Test First**: Run scripts on a small dataset first
2. **Backup Data**: Backup database before bulk operations
3. **Monitor Results**: Check results after running scripts
4. **Document Changes**: Keep logs of what scripts you run
5. **Schedule Wisely**: Run heavy scripts during off-peak hours

---

## 🔄 Integration with External Systems

You can extend the script system to:

1. **Import from CSV**
```javascript
importFromCSV('/data/apartments.csv')
```

2. **Export to JSON**
```javascript
exportToJSON('all')
```

3. **Sync with External API**
```javascript
syncWithAPI('https://api.example.com/properties')
```

4. **Send Emails**
```javascript
sendBulkEmails('new_listings')
```

---

## 📚 More Information

See the main [README.md](./README.md) and [QUICKSTART.md](./QUICKSTART.md) for more details about the application.

---

**Remember**: With great scripting power comes great responsibility! Always review what your script does before executing it on production data.

Last Updated: March 30, 2026
