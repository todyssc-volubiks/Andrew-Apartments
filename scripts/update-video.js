const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const readline = require('readline');

/**
 * Interactive utility to update apartment videos
 */
function updateApartmentVideo() {
  const dbPath = path.join(__dirname, 'apartments.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Database Error:', err.message);
      process.exit(1);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\n🎬 === Apartment Video Manager ===\n');

    // Show all apartments
    db.all('SELECT id, title, video_url FROM apartments', (err, apartments) => {
      if (err) {
        console.error('❌ Error fetching apartments:', err);
        rl.close();
        db.close();
        return;
      }

      console.log('📋 Available Apartments:\n');
      apartments.forEach(apt => {
        const status = apt.video_url ? '✓ Has video' : '✗ No video';
        console.log(`  [${apt.id}] ${apt.title}`);
        console.log(`      ${status}\n`);
      });

      // Ask for apartment ID
      rl.question('Enter apartment ID to update (or "list" to show only apartments without videos): ', (input) => {
        if (input.toLowerCase() === 'list') {
          const noVideo = apartments.filter(a => !a.video_url);
          console.log('\n📹 Apartments without videos:\n');
          noVideo.forEach(apt => {
            console.log(`  [${apt.id}] ${apt.title}`);
          });
          rl.close();
          db.close();
          return;
        }

        const apartmentId = parseInt(input);
        const apartment = apartments.find(a => a.id === apartmentId);

        if (!apartment) {
          console.error('❌ Apartment not found');
          rl.close();
          db.close();
          return;
        }

        console.log(`\n✓ Selected: ${apartment.title}`);
        console.log(`  Current video: ${apartment.video_url || 'None'}\n`);

        // Ask for video URL
        rl.question('Enter YouTube URL (or leave blank to remove): ', (videoUrl) => {
          if (videoUrl.trim() === '') {
            // Remove video
            db.run(
              'UPDATE apartments SET video_url = NULL WHERE id = ?',
              [apartmentId],
              (err) => {
                if (err) {
                  console.error('❌ Error:', err);
                } else {
                  console.log('\n✓ Video removed from ' + apartment.title);
                }
                rl.close();
                db.close();
              }
            );
          } else {
            // Update video
            db.run(
              'UPDATE apartments SET video_url = ? WHERE id = ?',
              [videoUrl.trim(), apartmentId],
              (err) => {
                if (err) {
                  console.error('❌ Error:', err);
                } else {
                  console.log(`\n✓ Updated ${apartment.title} with video link`);
                  console.log(`   URL: ${videoUrl.trim()}`);
                }
                rl.close();
                db.close();
              }
            );
          }
        });
      });
    });
  });
}

if (require.main === module) {
  updateApartmentVideo();
}

module.exports = { updateApartmentVideo };
