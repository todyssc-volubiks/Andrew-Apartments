# Social Media Sharing & SEO Guide

## Overview

Each apartment listing now includes integrated social media sharing with SEO optimization. When users share an apartment on social media, the listing displays with optimized metadata including property details, images, and descriptions.

## Features Implemented

### 1. **Social Media Share Buttons**

Eight sharing platforms integrated:
- 📘 **Facebook** - Share with Open Graph preview
- 𝕏 **Twitter/X** - Tweet with hashtags
- 💼 **LinkedIn** - Professional network sharing
- 💬 **WhatsApp** - Direct messaging
- ✈️ **Telegram** - Instant messaging
- 📌 **Pinterest** - Visual sharing
- ✉️ **Email** - Email sharing with pre-filled subject
- 📋 **Copy Link** - Copy to clipboard for manual sharing

### 2. **Search Engine Optimization (SEO)**

#### Meta Tags
Each apartment page includes:
- **Title**: `Apartment Title - Andrew Apartments`
- **Description**: 160 characters of apartment description
- **Keywords**: Apartment, Category, Location, Real Estate
- **Canonical URL**: Proper canonical link for search engines
- **Robots**: Index and follow directives

#### Open Graph Meta Tags
For Facebook, LinkedIn, and general social media:
- `og:title` - Apartment title
- `og:description` - Property description
- `og:image` - Apartment image (displayed in preview)
- `og:url` - Shareable link
- `og:type` - Website
- `og:site_name` - "Andrew Apartments"
- Property-specific: Price and currency

#### Twitter Card Meta Tags
For Twitter/X sharing:
- `twitter:card` - Summary with large image
- `twitter:title` - Apartment title
- `twitter:description` - Property description
- `twitter:image` - Featured image
- `twitter:creator` - Account handle

#### Schema.org JSON-LD
Rich snippets for search engines:
```json
{
  "@context": "https://schema.org/",
  "@type": "RealEstateAgent",
  "name": "Apartment Title",
  "description": "Full description",
  "image": "Image URL",
  "priceRange": "$Price",
  "areaServed": "Location",
  "amenityFeature": [...]
}
```

## How It Works

### Backend (Node.js)

**File**: `utils/socialShare.js`

Key functions:
```javascript
// Generate share URLs for all platforms
generateShareUrls(apartment, baseUrl)

// Create Open Graph meta tags
generateOpenGraphTags(apartment, baseUrl)

// Create Twitter Card tags
generateTwitterCardTags(apartment, baseUrl)

// Generate Schema.org markup
generateSchemaMarkup(apartment, baseUrl)

// Complete SEO metadata package
generateSeoMetadata(apartment, baseUrl)
```

**Routes Updated**:
- `/rent/:id` - Rent apartment details
- `/sales/:id` - Sales apartment details
- `/serviced/:id` - Serviced apartment details

### Frontend (EJS Template)

**File**: `views/apartment-details.ejs`

```html
<!-- Meta tags automatically injected -->
<meta property="og:title" content="<%= seoData.openGraph['og:title'] %>">

<!-- Share buttons section -->
<div class="share-section">
  <button onclick="shareToSocial('facebook')">Share on Facebook</button>
  <!-- Additional buttons... -->
</div>

<!-- Social sharing JavaScript -->
<script>
  function shareToSocial(platform) {
    // Opens social media share dialog
  }
</script>
```

## Usage for Users

### Sharing an Apartment

1. **Browse to apartment details** - Click on any apartment listing
2. **Scroll to share section** - "📱 Share This Property"
3. **Choose platform** and click:
   - Platform shares open in new window
   - Social media shows property preview
   - Link is pre-filled

### What Others See

When shared on social media, viewers see:
- ✅ Apartment title and price
- ✅ Description preview
- ✅ High-quality image
- ✅ Direct link to listing
- ✅ Professional presentation

**Example Facebook Share:**
```
🏠 Luxury 3-Bedroom Apartment - $2,500
Beautiful apartment in Downtown area with modern amenities...

[Image of apartment]
[Link to Andrew Apartments]
```

## SEO Benefits

### Search Engine Rankings
- Rich snippets in Google search results
- Structured data helps crawlers understand content
- Proper meta tags improve indexing
- Canonical URLs prevent duplicate content issues

### Social Media Visibility
- Open Graph tags ensure proper preview
- Twitter Cards display formatted posts
- LinkedIn integrates with professional network
- Better click-through rates on social media

### User Trust
- Professional presentation on social media
- Verified property information
- Clear pricing and location
- High-quality images

## Technical Implementation

### Database Fields Used
```
apartment.title           - Listed title
apartment.description     - Full description
apartment.price          - Property price
apartment.location       - Address/Location
apartment.image_url      - Featured image
apartment.category       - Rent/Sales/Serviced
apartment.features       - Amenities list
apartment.bedrooms       - Number of bedrooms
apartment.bathrooms      - Number of bathrooms
apartment.id             - Unique identifier
```

### URL Structure
```
https://yourdomain.com/rent/1
https://yourdomain.com/sales/2
https://yourdomain.com/serviced/3
```

## Configuration Options

### Customize Share Text

Edit `utils/socialShare.js`:

```javascript
// Change Twitter hashtags
twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=customhashtag,yourtag`

// Change email subject
email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
```

### Add More Platforms

To add a new social platform:

1. **Generate share URL**
   ```javascript
   tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedTitle}`
   ```

2. **Add button in template**
   ```html
   <button class="share-btn tumblr" onclick="shareToSocial('tumblr')">
     Tumblr
   </button>
   ```

3. **Add share function** (already handles dynamic URLs)

## Monitoring Share Performance

### Google Search Console
- Monitor CTR from search results
- Check rich snippet display
- Review structured data validation

### Social Media Analytics
- Track shares from Facebook Insights
- Monitor Twitter engagement
- LinkedIn analytics dashboard

### Google Analytics
Track shares as custom events:
```javascript
ga('send', 'event', 'social', 'share', 'facebook');
```

## Best Practices

### Image Optimization
- Use high-quality apartment photos (1200x630px recommended)
- Ensure images load quickly
- Test with social media debuggers

### Description Quality
- Write compelling property descriptions
- Keep descriptions under 160 characters for previews
- Include key selling points
- Use natural language

### Link Testing
- Test shares on each platform
- Use Facebook Share Debugger
- Use Twitter Card Validator
- Test in Google Search Console

## Debugging Tools

### Validate Meta Tags
1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **Google**: https://search.google.com/structured-data/testing-tool

### Check in Browser
```javascript
// Open browser console and run:
document.title
document.querySelector('meta[property="og:title"]').content
document.querySelector('meta[name="twitter:card"]').content
```

## Performance Impact

- **Minimal server overhead**: Meta tags generated during page render
- **No database queries**: Utility functions use existing apartment data
- **Fast rendering**: Schema markup is JSON, not embedded HTML
- **Browser caching**: Share buttons are client-side only

## Future Enhancements

Potential additions:
- [ ] Social media feed integration
- [ ] Share count tracking
- [ ] Advanced analytics
- [ ] User testimonials on shares
- [ ] Referral tracking for shares
- [ ] Share rewards/points system
- [ ] Video sharing capability
- [ ] 360° virtual tour sharing

## Troubleshooting

### Shares Not Displaying Preview
1. Check meta tags in page source
2. Validate with platform debugger
3. Ensure image URL is accessible
4. Check og:url matches actual URL

### Wrong Image Showing
1. Verify `apartment.image_url` is correct
2. Ensure image is HTTP/HTTPS accessible
3. Clear social media cache
4. Re-share after fixes

### Links Not Working
1. Verify `baseUrl` is correctly formed
2. Check apartment IDs are valid
3. Test direct link accessibility
4. Verify URL encoding in shares

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org Real Estate](https://schema.org/RealEstateAgent)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Social Media Best Practices](https://blog.hootsuite.com/social-media-best-practices/)
