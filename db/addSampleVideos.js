const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Add sample video URLs to apartments for demonstration
 */
function addSampleVideos() {
  const dbPath = path.join(__dirname, 'apartments.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
      process.exit(1);
    }

    // Sample video URLs (YouTube video IDs)
    const updates = [
      {
        id: 1,
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ' // Replace with real apartment tour video
      },
      {
        id: 2,
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ'
      },
      {
        id: 3,
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ'
      }
    ];

    console.log('🎬 Adding sample video URLs to apartments...\n');

    updates.forEach((update, index) => {
      db.run(
        'UPDATE apartments SET video_url = ? WHERE id = ?',
        [update.videoUrl, update.id],
        (err) => {
          if (err) {
            console.error(`❌ Error updating apartment ${update.id}:`, err.message);
          } else {
            console.log(`✓ Updated apartment ${update.id} with video link`);
          }

          // Close DB after last update
          if (index === updates.length - 1) {
            setTimeout(() => {
              db.close(() => {
                console.log('\n✨ Sample videos added successfully!');
                console.log('\n📝 To add your own videos:');
                console.log('   1. Get your YouTube video link');
                console.log('   2. Format: https://youtu.be/VIDEO_ID');
                console.log('   3. Update apartments table video_url column');
                process.exit(0);
              });
            }, 100);
          }
        }
      );
    });
  });
}

if (require.main === module) {
  addSampleVideos();
}

module.exports = { addSampleVideos };
