# Media Gallery System - Images & YouTube Videos

## Overview
Your Andrew Apartments application now has a professional media gallery system that displays both images and YouTube videos. Users can click on apartment thumbnails to switch between viewing images and videos, with videos playing in a full-screen modal.

## Features

✅ **Dual Media Display**
- Show apartment images and videos together
- Switch between image and video with thumbnail clicks
- Clean, professional gallery layout

✅ **YouTube Integration**
- Embed YouTube videos directly
- Auto-extract video IDs from various YouTube URL formats
- No video hosting needed - uses YouTube's streaming

✅ **Interactive Video Player**
- Full-screen modal video player
- Play button overlay on thumbnail
- Autoplay when clicked
- Keyboard support (ESC to close)
- Click outside to close

✅ **Professional UI**
- Teal play button with hover effects
- Video badge indicator
- Smooth animations
- Responsive design

## How to Use

### 1. Get Your YouTube Video Link

**Steps:**
1. Go to your video on YouTube
2. Click "Share" button
3. Copy the link in any of these formats:
   - `https://youtu.be/VIDEO_ID`
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://www.youtube.com/embed/VIDEO_ID`

**Example:**
- YouTube URL: `https://youtu.be/dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

### 2. Add Video to Apartment

**Option A: Using Database Console**
```sql
UPDATE apartments 
SET video_url = 'https://youtu.be/dQw4w9WgXcQ' 
WHERE id = 1;
```

**Option B: Using Update Script** (coming soon)
Create a script to update videos programmatically.

**Option C: Through Admin Panel** (coming soon)
Add video URLs through admin dashboard.

### 3. View on Web App

- Visit apartment detail page
- See both image and video thumbnails
- Click image thumbnail to show main image
- Click video thumbnail to show overlay with play button
- Click play button to open full-screen video player
- Press ESC or click outside to close player

## Database Schema

### New Column Added
```sql
ALTER TABLE apartments ADD COLUMN video_url TEXT;
```

### Data Structure
```
apartments table:
- id: INTEGER PRIMARY KEY
- title: TEXT
- description: TEXT
- price: REAL
- category: TEXT
- bedrooms: INTEGER
- bathrooms: INTEGER
- location: TEXT
- image_url: TEXT (existing)
- video_url: TEXT (NEW - stores YouTube URL)
- features: TEXT
- available: BOOLEAN
- created_at: DATETIME
```

## Supported URL Formats

All these formats work automatically:
```
✓ https://youtu.be/dQw4w9WgXcQ
✓ https://www.youtube.com/watch?v=dQw4w9WgXcQ
✓ https://youtube.com/watch?v=dQw4w9WgXcQ
✓ https://www.youtube.com/embed/dQw4w9WgXcQ
✓ https://youtube.com/embed/dQw4w9WgXcQ
```

## Quick Start

### Add Sample Videos
```bash
npm run add-videos
```

This adds demo videos to the first 3 apartments so you can test the system.

### Update Video for Apartment
```bash
# Using SQLite CLI
sqlite3 db/apartments.db
> UPDATE apartments SET video_url = 'https://youtu.be/YOUR_VIDEO_ID' WHERE id = 1;
```

## UI Components

### Image Display
```html
<div class="main-image">
  <!-- High-quality apartment photo -->
  <img src="image.jpg">
</div>
```

### Video Overlay
```html
<div class="video-overlay" onclick="openVideoModal()">
  <div class="play-button">▶</div>
  <span class="video-badge">VIDEO</span>
</div>
```

### Gallery Thumbnails
```html
<div class="gallery-thumbs">
  <!-- Image thumbnail -->
  <div class="thumb-item active">
    <img src="image.jpg" class="thumb">
    <span class="media-type">📷</span>
  </div>
  
  <!-- Video thumbnail -->
  <div class="thumb-item">
    <svg class="thumb-video"><!-- Play icon --></svg>
    <span class="media-type">🎬</span>
  </div>
</div>
```

### Video Modal
```html
<div id="videoModal" class="video-modal">
  <div class="video-modal-content">
    <button class="video-modal-close" onclick="closeVideoModal()">×</button>
    <iframe id="videoFrame" class="video-iframe"></iframe>
  </div>
</div>
```

## JavaScript Functions

### `changeMedia(element, url, type)`
Switch between image and video display
```javascript
changeMedia(thumbElement, imageUrl, 'image');
changeMedia(thumbElement, videoUrl, 'video');
```

### `openVideoModal()`
Open full-screen video player
```javascript
openVideoModal();
```

### `closeVideoModal()`
Close video modal
```javascript
closeVideoModal();
```

### `extractYouTubeId(url)`
Extract video ID from any YouTube URL format
```javascript
const videoId = extractYouTubeId('https://youtu.be/dQw4w9WgXcQ');
// Returns: 'dQw4w9WgXcQ'
```

## Styling

### Color Scheme
- Play Button: Teal (#17a2b8)
- Hover State: Light Teal (#5dade2)
- Overlay Background: Semi-transparent dark
- Video Badge: Teal background

### Responsive Design
- Desktop: Full-width gallery with large thumbnails
- Tablet: Adjusted spacing, smaller thumbnails
- Mobile: Stacked layout, touch-friendly

## Best Practices

### Video Content
✓ Use high-quality apartment tour videos
✓ Keep videos 1-5 minutes long
✓ Shoot in landscape (16:9) format
✓ Include walkthrough of key areas
✓ Good lighting and stable camera

### URL Management
✓ Store full YouTube URL in database
✓ Use youtu.be format for short links
✓ Test link before saving
✓ Keep consistent URL format

### SEO Optimization
✓ Videos improve engagement
✓ Include video titles in metadata
✓ Add video descriptions
✓ Use relevant keywords in titles

## Technical Details

### Player Features
- **Autoplay**: Video plays automatically when clicked
- **Keyboard Control**: ESC to close modal
- **Click Outside**: Click background to close
- **Responsive**: Scales to device size
- **Encrypted Media**: Support for DRM content

### URL Processing
- Extracts video ID from any YouTube format
- Reconstructs as embed URL: `youtube.com/embed/{id}`
- Handles query parameters and timestamps
- URL validation before iframe creation

### Performance
- Zero hosting/upload needed
- Uses YouTube's CDN
- Lazy loading of video embeds
- Smooth animations with CSS transitions

## File Structure
```
andrew-apartments/
├── views/
│   └── apartment-details.ejs       ← Gallery + Modal
├── public/css/
│   └── style.css                   ← Gallery + Modal styles
├── db/
│   ├── addVideoColumn.js           ← Schema update
│   └── addSampleVideos.js          ← Sample data
└── package.json                    ← New script
```

## Maintenance

### Update Apartment Video
```bash
sqlite3 db/apartments.db
UPDATE apartments SET video_url = 'https://youtu.be/NEW_ID' WHERE id = 1;
.exit
```

### Remove Video
```bash
sqlite3 db/apartments.db
UPDATE apartments SET video_url = NULL WHERE id = 1;
.exit
```

### View All Videos
```bash
sqlite3 db/apartments.db
SELECT id, title, video_url FROM apartments WHERE video_url IS NOT NULL;
```

## Troubleshooting

### Video Won't Play
- ✓ Check YouTube URL is correct
- ✓ Verify video is public or unlisted
- ✓ Test URL in browser first
- ✓ Check for typos in database

### Play Button Doesn't Show
- ✓ Verify video_url is set in database
- ✓ Check that URL is not NULL
- ✓ Refresh browser cache

### Modal Doesn't Close
- ✓ Try pressing ESC
- ✓ Click outside the video
- ✓ Check browser console for errors

### Wrong Video Plays
- ✓ Verify correct video URL in database
- ✓ Check URL format is supported
- ✓ Ensure no extra spaces in URL

## Future Enhancements

- [ ] Admin panel video upload interface
- [ ] Multiple videos per apartment
- [ ] Video gallery with carousel
- [ ] Video analytics tracking
- [ ] Custom video player branding
- [ ] Video playlist support
- [ ] Thumbnail image extraction from YouTube
- [ ] Automatic video SEO metadata

## Support

For issues or questions, refer to:
- Check database has video_url column: `PRAGMA table_info(apartments);`
- Test YouTube URL directly in browser
- Verify internet connection for YouTube streaming
- Check browser console for JavaScript errors

---

**System Ready:** ✅ Complete  
**Video Support:** ✅ Enabled  
**Sample Videos:** ✅ Added  
**UI/UX:** ✅ Polished  

Your apartment gallery now supports professional video tours! 🎬
