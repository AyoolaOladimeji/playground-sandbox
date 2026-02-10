/* ============================================
   Classic XI Pro - Videos Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initVideosPage();
});

let allVideos = [];

function initVideosPage() {
  loadVideos();
  initVideoFilters();
  initVideoModal();
  initAddVideo();

  // Show add button if logged in
  onAuthChange(user => {
    const addBtn = document.getElementById('videoAddBtn');
    if (addBtn) addBtn.style.display = user ? 'block' : 'none';
  });
}

// Load videos
function loadVideos() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  getData('videos').then(videos => {
    allVideos = videos;
    renderVideos(videos);
  });
}

// Render video cards
function renderVideos(videos) {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  if (videos.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-video-slash"></i><h3>No videos yet</h3><p>Videos will appear here once added.</p></div>';
    return;
  }

  grid.innerHTML = videos.map((video, index) => {
    const thumbnailUrl = video.youtubeId
      ? `https://img.youtube.com/vi/${sanitize(video.youtubeId)}/hqdefault.jpg`
      : '';

    return `
      <div class="video-card fade-in" data-index="${index}" data-category="${sanitize(video.category)}">
        <div class="video-thumbnail">
          ${thumbnailUrl
            ? `<img src="${thumbnailUrl}" alt="${sanitize(video.title)}" loading="lazy">`
            : `<div class="video-thumbnail-placeholder"><i class="fas fa-film" style="font-size: 3rem; color: var(--accent); opacity: 0.5;"></i></div>`
          }
          <button class="video-play-btn"><i class="fas fa-play"></i></button>
          ${video.duration ? `<span class="video-duration">${sanitize(video.duration)}</span>` : ''}
        </div>
        <div class="video-card-info">
          <h3>${sanitize(video.title)}</h3>
          <div class="video-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(video.date)}</span>
          </div>
          <span class="video-category">${sanitize(video.category)}</span>
        </div>
      </div>
    `;
  }).join('');

  // Click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index);
      openVideoModal(index);
    });
  });

  initScrollAnimations();
}

// Video filters
function initVideoFilters() {
  const filterContainer = document.getElementById('videoFilters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    if (filter === 'all') {
      renderVideos(allVideos);
    } else {
      renderVideos(allVideos.filter(v => v.category === filter));
    }
  });
}

// Video player modal
function initVideoModal() {
  const modal = document.getElementById('videoPlayerModal');
  const closeBtn = document.getElementById('videoModalClose');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideoModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

function openVideoModal(index) {
  const video = allVideos[index];
  if (!video || !video.youtubeId) {
    showToast('Video not available', 'info');
    return;
  }

  const modal = document.getElementById('videoPlayerModal');
  const content = document.getElementById('videoModalContent');

  content.innerHTML = `<iframe src="https://www.youtube.com/embed/${sanitize(video.youtubeId)}?autoplay=1&rel=0" title="${sanitize(video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoPlayerModal');
  const content = document.getElementById('videoModalContent');

  modal.classList.remove('active');
  content.innerHTML = '';
  document.body.style.overflow = '';
}

// Extract YouTube ID from URL
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Add video form
function initAddVideo() {
  const form = document.getElementById('addVideoForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('videoTitle').value.trim();
    const url = document.getElementById('videoUrl').value.trim();
    const category = document.getElementById('videoCategory').value;
    const duration = document.getElementById('videoDuration').value.trim();

    if (!title || !url) {
      showToast('Please fill in required fields', 'error');
      return;
    }

    const youtubeId = extractYouTubeId(url);
    if (!youtubeId) {
      showToast('Invalid YouTube URL', 'error');
      return;
    }

    try {
      await addData('videos', {
        title,
        youtubeId,
        category,
        duration,
        date: new Date().toISOString().split('T')[0]
      });

      showToast('Video added successfully!', 'success');
      form.reset();
      document.getElementById('videoAddModal').classList.remove('active');
      loadVideos();
    } catch (error) {
      showToast('Failed to add video: ' + error.message, 'error');
    }
  });
}
