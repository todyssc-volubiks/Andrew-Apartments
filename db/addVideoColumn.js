const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Add video_url column to apartments table if it doesn't exist
 */
function addVideoColumn() {
  const dbPath = path.join(__dirname, 'apartments.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
      process.exit(1);
    }

    // Check if video_url column exists
    db.all("PRAGMA table_info(apartments)", (err, rows) => {
      if (err) {
        console.error('Error checking table structure:', err);
        db.close();
        return;
      }

      const hasVideoColumn = rows.some(row => row.name === 'video_url');

      if (!hasVideoColumn) {
        // Add video_url column
        db.run('ALTER TABLE apartments ADD COLUMN video_url TEXT', (err) => {
          if (err) {
            console.error('Error adding video_url column:', err.message);
          } else {
            console.log('✓ video_url column added to apartments table');
          }
          db.close();
        });
      } else {
        console.log('✓ video_url column already exists');
        db.close();
      }
    });
  });
}

module.exports = { addVideoColumn };

// Run if called directly
if (require.main === module) {
  addVideoColumn();
}
