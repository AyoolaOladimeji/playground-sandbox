/* ============================================
   Classic XI Pro - Gallery Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryPage();
});

let allPhotos = [];
let currentLightboxIndex = 0;

function initGalleryPage() {
  loadGallery();
  initGalleryFilters();
  initLightbox();
  initGalleryUpload();

  // Show upload button if logged in
  onAuthChange(user => {
    const uploadBtn = document.getElementById('galleryUploadBtn');
    if (uploadBtn) uploadBtn.style.display = user ? 'block' : 'none';
  });
}

// Load gallery photos
function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  getData('gallery').then(photos => {
    allPhotos = photos;
    renderGallery(photos);
  });
}

// Render gallery grid
function renderGallery(photos) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  if (photos.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="column-span: all;"><i class="fas fa-images"></i><h3>No photos yet</h3><p>Photos will appear here once uploaded.</p></div>';
    return;
  }

  // Vary aspect ratios for visual interest
  const aspects = ['4/3', '3/4', '16/9', '1/1', '4/5', '3/2'];

  grid.innerHTML = photos.map((photo, index) => `
    <div class="gallery-item fade-in" data-index="${index}" data-category="${sanitize(photo.category)}">
      ${photo.url
        ? `<img src="${sanitize(photo.url)}" alt="${sanitize(photo.caption)}" loading="lazy">`
        : `<div class="gallery-item-placeholder" style="aspect-ratio: ${aspects[index % aspects.length]};">
            <i class="fas fa-image"></i>
          </div>`
      }
      <div class="gallery-overlay">
        <h4>${sanitize(photo.caption)}</h4>
        <span>${sanitize(photo.category)} • ${formatDate(photo.date)}</span>
      </div>
    </div>
  `).join('');

  // Click handlers for lightbox
  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      openLightbox(index);
    });
  });

  initScrollAnimations();
}

// Gallery filters
function initGalleryFilters() {
  const filterContainer = document.getElementById('galleryFilters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    if (filter === 'all') {
      renderGallery(allPhotos);
    } else {
      renderGallery(allPhotos.filter(p => p.category === filter));
    }
  });
}

// Lightbox
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  currentLightboxIndex = index;
  const photo = allPhotos[index];

  if (photo.url) {
    img.src = photo.url;
  } else {
    // Placeholder for demo
    img.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%231a237e"><rect width="800" height="600"/><text x="400" y="300" text-anchor="middle" fill="%23ffd700" font-size="24" font-family="sans-serif">' + photo.caption + '</text></svg>')}`;
  }

  img.alt = photo.caption;
  caption.textContent = `${photo.caption} • ${photo.category}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = allPhotos.length - 1;
  if (currentLightboxIndex >= allPhotos.length) currentLightboxIndex = 0;
  openLightbox(currentLightboxIndex);
}

// Gallery upload
function initGalleryUpload() {
  const form = document.getElementById('uploadPhotoForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('photoFile');
    const caption = document.getElementById('photoCaption').value.trim();
    const category = document.getElementById('photoCategory').value;

    if (!fileInput.files[0] || !caption) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      const file = fileInput.files[0];
      const url = await uploadFile(`gallery/${Date.now()}_${file.name}`, file);

      await addData('gallery', {
        caption,
        category,
        url,
        date: new Date().toISOString().split('T')[0]
      });

      showToast('Photo uploaded successfully!', 'success');
      form.reset();
      document.getElementById('galleryUploadModal').classList.remove('active');
      loadGallery();
    } catch (error) {
      showToast('Upload failed: ' + error.message, 'error');
    }
  });
}
