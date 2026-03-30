/**
 * Social Media Sharing Utilities
 * Generates shareable URLs and meta tags for social platforms
 */

/**
 * Generate social share URLs for different platforms
 */
function generateShareUrls(apartment, baseUrl = 'http://localhost:3000') {
  const apartmentUrl = `${baseUrl}/${apartment.category.toLowerCase()}/${apartment.id}`;
  const encodedUrl = encodeURIComponent(apartmentUrl);
  const encodedTitle = encodeURIComponent(`${apartment.title} - ${apartment.price}`);
  const encodedDescription = encodeURIComponent(apartment.description.substring(0, 200));

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=apartments,realestate`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
    copy: apartmentUrl
  };
}

/**
 * Generate Open Graph meta tags for SEO
 */
function generateOpenGraphTags(apartment, baseUrl = 'http://localhost:3000') {
  const apartmentUrl = `${baseUrl}/${apartment.category.toLowerCase()}/${apartment.id}`;
  
  const tags = {
    'og:title': apartment.title,
    'og:description': apartment.description.substring(0, 160),
    'og:image': apartment.image_url || `${baseUrl}/images/default-apartment.jpg`,
    'og:url': apartmentUrl,
    'og:type': 'website',
    'og:site_name': 'Andrew Apartments',
    'og:locale': 'en_US',
    'property:price:amount': apartment.price,
    'property:price:currency': 'USD'
  };

  return tags;
}

/**
 * Generate Twitter Card meta tags for SEO
 */
function generateTwitterCardTags(apartment, baseUrl = 'http://localhost:3000') {
  const apartmentUrl = `${baseUrl}/${apartment.category.toLowerCase()}/${apartment.id}`;
  
  const tags = {
    'twitter:card': 'summary_large_image',
    'twitter:title': apartment.title,
    'twitter:description': apartment.description.substring(0, 200),
    'twitter:image': apartment.image_url || `${baseUrl}/images/default-apartment.jpg`,
    'twitter:url': apartmentUrl,
    'twitter:creator': '@andrewaps',
    'twitter:site': '@andrewaps'
  };

  return tags;
}

/**
 * Generate Schema.org JSON-LD markup for Rich Snippets
 */
function generateSchemaMarkup(apartment, baseUrl = 'http://localhost:3000') {
  const apartmentUrl = `${baseUrl}/${apartment.category.toLowerCase()}/${apartment.id}`;
  
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'RealEstateAgent',
    'name': apartment.title,
    'description': apartment.description,
    'image': apartment.image_url,
    'url': apartmentUrl,
    'priceRange': `$${apartment.price}`,
    'areaServed': apartment.location,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': apartment.location,
      'addressCountry': 'US'
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'USD',
      'price': apartment.price.toString()
    },
    'amenityFeature': apartment.features ? apartment.features.split(',').map(f => ({
      '@type': 'LocationFeatureSpecification',
      'name': f.trim()
    })) : []
  };

  return schema;
}

/**
 * Format meta tags for HTML head
 */
function formatMetaTags(tags) {
  return Object.entries(tags)
    .map(([key, value]) => {
      if (key.startsWith('property:')) {
        return `<meta property="${key}" content="${escapeHtml(value)}" />`;
      }
      return `<meta name="${key}" content="${escapeHtml(value)}" />`;
    })
    .join('\n');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Generate complete SEO metadata for apartment
 */
function generateSeoMetadata(apartment, baseUrl = 'http://localhost:3000') {
  return {
    title: `${apartment.title} - Andrew Apartments`,
    description: apartment.description.substring(0, 160),
    keywords: `${apartment.category}, apartment, real estate, ${apartment.location}`,
    canonical: `${baseUrl}/${apartment.category.toLowerCase()}/${apartment.id}`,
    shareUrls: generateShareUrls(apartment, baseUrl),
    openGraph: generateOpenGraphTags(apartment, baseUrl),
    twitterCard: generateTwitterCardTags(apartment, baseUrl),
    schema: generateSchemaMarkup(apartment, baseUrl)
  };
}

/**
 * Copy to clipboard helper for frontend
 */
const clipboardScript = `
<script>
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text || window.location.href;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('✓ Copied to clipboard!');
}

function shareToSocial(platform) {
  const shareUrls = {
    facebook: '<%=shareUrls.facebook%>',
    twitter: '<%=shareUrls.twitter%>',
    linkedin: '<%=shareUrls.linkedin%>',
    whatsapp: '<%=shareUrls.whatsapp%>',
    telegram: '<%=shareUrls.telegram%>',
    pinterest: '<%=shareUrls.pinterest%>',
    email: '<%=shareUrls.email%>'
  };
  
  if (platform === 'copy') {
    copyToClipboard('<%=shareUrls.copy%>');
  } else if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}
</script>
`;

module.exports = {
  generateShareUrls,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateSchemaMarkup,
  generateSeoMetadata,
  formatMetaTags,
  escapeHtml,
  clipboardScript
};
