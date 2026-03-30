// Main application JavaScript

// Cart management
function addToCart(apartmentId) {
  fetch(`/cart/add/${apartmentId}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('✓ Added to cart!');
      updateCartCount(data.cartCount);
    }
  })
  .catch(error => console.error('Error:', error));
}

function removeFromCart(apartmentId) {
  fetch(`/cart/remove/${apartmentId}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      location.reload();
    }
  })
  .catch(error => console.error('Error:', error));
}

function updateCartCount(count) {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    if (count > 0) {
      badge.innerText = count;
    } else {
      badge.remove();
    }
  }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Search form validation
const searchForms = document.querySelectorAll('.search-bar form');
searchForms.forEach(form => {
  form.addEventListener('submit', function(e) {
    const input = this.querySelector('input[name="q"]');
    if (!input.value.trim()) {
      e.preventDefault();
      alert('Please enter a search term');
    }
  });
});

// Image gallery
function openGalleryImage(src) {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <img src="${src}" alt="Gallery">
    </div>
  `;
  document.body.appendChild(modal);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
  element.addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = this.getAttribute('data-tooltip');
    this.appendChild(tooltip);
  });
  
  element.addEventListener('mouseleave', function() {
    const tooltip = this.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
  });
});

console.log('🏠 Andrew Apartments - Ready!');
