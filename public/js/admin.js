// Admin panel JavaScript

// Edit apartment function
function editApartment(id) {
  alert('Edit feature - Coming soon!');
  // This would open an edit modal or redirect to edit page
}

// Delete apartment with confirmation
function deleteApartment(id) {
  if (confirm('Are you sure you want to delete this apartment? This action cannot be undone.')) {
    fetch(`/admin/delete-apartment/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('✓ Apartment deleted successfully');
        location.reload();
      } else {
        alert('Error deleting apartment');
      }
    })
    .catch(error => alert('Error: ' + error.message));
  }
}

// Run script in script console
function runScript() {
  const scriptInput = document.getElementById('scriptInput');
  const scriptOutput = document.getElementById('scriptOutput');
  
  if (!scriptInput.value.trim()) {
    alert('Please enter a script to execute');
    return;
  }

  scriptOutput.innerHTML = '<p class="running">⏳ Executing script...</p>';
  
  fetch('/admin/run-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script: scriptInput.value })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      scriptOutput.innerHTML = '<p class="success">✓ ' + (data.message || 'Script executed successfully') + '</p>';
    } else {
      scriptOutput.innerHTML = '<p class="error">✗ Error: ' + (data.error || 'Unknown error') + '</p>';
    }
  })
  .catch(error => {
    scriptOutput.innerHTML = '<p class="error">✗ Error: ' + error.message + '</p>';
  });
}

// Show specific section
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active from all nav items
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Show selected section
  const section = document.getElementById(`section-${sectionId}`);
  if (section) {
    section.classList.add('active');
  }
  
  // Mark nav item as active
  event.target.classList.add('active');
}

// Form submission for adding apartments
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('addApartmentForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      try {
        const response = await fetch('/admin/add-apartment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        if (result.success) {
          alert('✓ Apartment added successfully!');
          this.reset();
          // Show apartments section
          document.querySelector('#section-apartments').scrollIntoView();
          setTimeout(() => location.reload(), 500);
        } else {
          alert('Error: ' + (result.error || 'Failed to add apartment'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl + K to focus search
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-bar input');
      if (searchInput) searchInput.focus();
    }
  });
});

console.log('🛠️ Admin Panel - Loaded!');
