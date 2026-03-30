const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

/**
 * Reads inventory data from Excel file and syncs with database
 * Expected Excel columns: Title, Category, Available, Price, Location
 */
function syncInventoryFromExcel(excelFilePath) {
  return new Promise((resolve, reject) => {
    try {
      // Verify file exists
      if (!fs.existsSync(excelFilePath)) {
        throw new Error(`Excel file not found: ${excelFilePath}`);
      }

      // Read Excel file
      console.log(`📖 Reading Excel file: ${excelFilePath}`);
      const workbook = xlsx.readFile(excelFilePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      if (!data || data.length === 0) {
        throw new Error('Excel file is empty or has no data');
      }

      console.log(`✓ Loaded ${data.length} products from Excel`);

      // Connect to database
      const dbPath = path.join(__dirname, '../db/apartments.db');
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(new Error(`Database connection failed: ${err.message}`));
          return;
        }

        // Create inventory table if it doesn't exist
        db.run(`
          CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT UNIQUE NOT NULL,
            category TEXT,
            available INTEGER DEFAULT 0,
            price REAL,
            location TEXT,
            last_synced DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            reject(err);
            return;
          }

          console.log('📊 Syncing inventory with database...\n');

          let synced = 0;
          let updated = 0;
          let errors = 0;
          let processed = 0;

          // Process each row
          data.forEach((row, index) => {
            try {
              const title = row.Title?.trim() || row.title?.trim();
              const category = row.Category?.trim() || row.category?.trim() || 'Other';
              const available = parseInt(row.Available || row.available || 0);
              const price = parseFloat(row.Price || row.price || 0);
              const location = row.Location?.trim() || row.location?.trim() || '';

              if (!title) {
                console.warn('⚠️  Skipping row: Missing title', row);
                errors++;
                processed++;
                if (processed === data.length) finalize();
                return;
              }

              // Check if exists
              db.get('SELECT id FROM inventory WHERE title = ?', [title], (err, row) => {
                if (err) {
                  console.error(`❌ Error checking product: ${title}`, err.message);
                  errors++;
                } else if (row) {
                  // Update
                  db.run(
                    `UPDATE inventory SET available = ?, price = ?, location = ?, category = ?, last_synced = CURRENT_TIMESTAMP WHERE title = ?`,
                    [available, price, location, category, title],
                    (err) => {
                      if (err) {
                        console.error(`❌ Error updating: "${title}"`, err.message);
                        errors++;
                      } else {
                        updated++;
                        console.log(`✅ Updated: "${title}" - Available: ${available}`);
                      }
                      processed++;
                      if (processed === data.length) finalize();
                    }
                  );
                } else {
                  // Insert
                  db.run(
                    `INSERT INTO inventory (title, category, available, price, location) VALUES (?, ?, ?, ?, ?)`,
                    [title, category, available, price, location],
                    (err) => {
                      if (err) {
                        console.error(`❌ Error adding: "${title}"`, err.message);
                        errors++;
                      } else {
                        synced++;
                        console.log(`✨ Added: "${title}" - Available: ${available}`);
                      }
                      processed++;
                      if (processed === data.length) finalize();
                    }
                  );
                }
              });
            } catch (error) {
              console.error(`❌ Error processing row:`, error.message);
              errors++;
              processed++;
              if (processed === data.length) finalize();
            }
          });

          function finalize() {
            db.close((err) => {
              console.log(`\n📈 Sync Summary:`);
              console.log(`   Added: ${synced}`);
              console.log(`   Updated: ${updated}`);
              console.log(`   Errors: ${errors}`);
              console.log(`✓ Inventory sync complete!\n`);

              if (err) {
                reject(err);
              } else {
                resolve({ synced, updated, errors });
              }
            });
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get available count for a specific product by title
 */
function getAvailable(title, callback) {
  try {
    const dbPath = path.join(__dirname, '../db/apartments.db');
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        callback(null);
        return;
      }
      
      db.get('SELECT available FROM inventory WHERE title = ?', [title], (err, row) => {
        db.close();
        if (err) {
          callback(null);
        } else {
          callback(row ? row.available : null);
        }
      });
    });
  } catch (error) {
    callback(null);
  }
}

/**
 * Get all available inventory grouped by category
 */
function getAllInventory(callback) {
  try {
    const dbPath = path.join(__dirname, '../db/apartments.db');
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        callback([]);
        return;
      }
      
      db.all('SELECT title, category, available, price, location FROM inventory ORDER BY category, title', (err, rows) => {
        db.close();
        if (err) {
          callback([]);
        } else {
          callback(rows || []);
        }
      });
    });
  } catch (error) {
    callback([]);
  }
}

/**
 * Check if product is in stock (returns boolean via callback)
 */
function isInStock(title, callback) {
  getAvailable(title, (available) => {
    callback(available !== null && available > 0);
  });
}

module.exports = {
  syncInventoryFromExcel,
  getAvailable,
  getAllInventory,
  isInStock
};
