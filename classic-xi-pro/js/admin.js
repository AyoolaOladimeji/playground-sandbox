/* ============================================
   Classic XI Pro - Admin Dashboard Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

function initAdmin() {
  // Check authentication
  onAuthChange(user => {
    const authCheck = document.getElementById('adminAuthCheck');
    const dashboard = document.getElementById('adminDashboard');

    if (user) {
      if (authCheck) authCheck.style.display = 'none';
      if (dashboard) dashboard.style.display = 'block';
      loadAdminData();
    } else {
      // Redirect to login
      showToast('Please log in to access the dashboard', 'error');
      setTimeout(() => window.location.href = 'login.html', 1500);
    }
  });

  initAdminTabs();
  initAdminForms();
  initAdminLogout();
}

// ============================================
// Admin Tabs
// ============================================
function initAdminTabs() {
  const tabContainer = document.getElementById('adminTabs');
  if (!tabContainer) return;

  tabContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.admin-tab');
    if (!tab) return;

    tabContainer.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const section = tab.dataset.section;
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById(`panel-${section}`);
    if (panel) panel.classList.remove('hidden');
  });
}

// ============================================
// Load Admin Data
// ============================================
function loadAdminData() {
  loadAdminPlayers();
  loadAdminGallery();
  loadAdminVideos();
  loadAdminFixtures();
  loadAdminNews();
  loadAdminSponsors();
}

// Players Table
function loadAdminPlayers() {
  getData('players').then(players => {
    const tbody = document.getElementById('playersTableBody');
    if (!tbody) return;

    tbody.innerHTML = players.map(player => `
      <tr>
        <td>
          <div class="admin-avatar">
            ${player.photo
              ? `<img src="${sanitize(player.photo)}" alt="${sanitize(player.name)}">`
              : `<i class="fas fa-user"></i>`
            }
          </div>
        </td>
        <td><strong>${sanitize(player.name)}</strong></td>
        <td>${sanitize(player.position)}</td>
        <td>#${sanitize(String(player.number))}</td>
        <td>
          <div class="admin-actions">
            <button class="btn btn-sm btn-secondary" onclick="editPlayer('${sanitize(player.id)}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deletePlayer('${sanitize(player.id)}', '${sanitize(player.name)}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  });
}

// Gallery Grid
function loadAdminGallery() {
  getData('gallery').then(photos => {
    const grid = document.getElementById('adminGalleryGrid');
    if (!grid) return;

    grid.innerHTML = photos.map(photo => `
      <div class="admin-gallery-item">
        ${photo.url
          ? `<img src="${sanitize(photo.url)}" alt="${sanitize(photo.caption)}">`
          : `<div class="admin-gallery-placeholder"><i class="fas fa-image"></i></div>`
        }
        <div class="admin-gallery-overlay">
          <span>${sanitize(photo.caption)}</span>
          <button class="btn btn-sm btn-danger" onclick="deleteGalleryItem('${sanitize(photo.id)}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  });
}

// Videos Table
function loadAdminVideos() {
  getData('videos').then(videos => {
    const tbody = document.getElementById('videosTableBody');
    if (!tbody) return;

    tbody.innerHTML = videos.map(video => `
      <tr>
        <td><strong>${sanitize(video.title)}</strong></td>
        <td>${sanitize(video.category)}</td>
        <td>${formatDate(video.date)}</td>
        <td>
          <div class="admin-actions">
            <button class="btn btn-sm btn-danger" onclick="deleteVideo('${sanitize(video.id)}', '${sanitize(video.title)}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  });
}

// Fixtures Table
function loadAdminFixtures() {
  getData('fixtures').then(fixtures => {
    const tbody = document.getElementById('fixturesTableBody');
    if (!tbody) return;

    fixtures.sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = fixtures.map(fixture => {
      const score = fixture.status === 'completed'
        ? `${fixture.homeScore} - ${fixture.awayScore}`
        : '<span style="color: var(--mid-gray);">Upcoming</span>';

      return `
        <tr>
          <td>${formatDate(fixture.date)}</td>
          <td><strong>${sanitize(fixture.opponent)}</strong></td>
          <td>${sanitize(fixture.venue || 'TBD')}</td>
          <td>${score}</td>
          <td>
            <div class="admin-actions">
              <button class="btn btn-sm btn-secondary" onclick="editFixture('${sanitize(fixture.id)}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteFixture('${sanitize(fixture.id)}', '${sanitize(fixture.opponent)}')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  });
}

// News Table
function loadAdminNews() {
  getData('news').then(news => {
    const tbody = document.getElementById('newsTableBody');
    if (!tbody) return;

    tbody.innerHTML = news.map(item => `
      <tr>
        <td><strong>${sanitize(item.title)}</strong></td>
        <td>${formatDate(item.date)}</td>
        <td>
          <div class="admin-actions">
            <button class="btn btn-sm btn-danger" onclick="deleteNews('${sanitize(item.id)}', '${sanitize(item.title)}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  });
}

// Sponsors Table
function loadAdminSponsors() {
  getData('sponsors').then(sponsors => {
    const tbody = document.getElementById('sponsorsTableBody');
    if (!tbody) return;

    tbody.innerHTML = sponsors.map(sponsor => `
      <tr>
        <td>
          <div class="admin-avatar">
            ${sponsor.logo
              ? `<img src="${sanitize(sponsor.logo)}" alt="${sanitize(sponsor.name)}">`
              : `<i class="fas fa-building"></i>`
            }
          </div>
        </td>
        <td><strong>${sanitize(sponsor.name)}</strong></td>
        <td><span class="tier-badge tier-${sanitize(sponsor.tier)}">${sanitize(sponsor.tier)}</span></td>
        <td>
          <div class="admin-actions">
            <button class="btn btn-sm btn-danger" onclick="deleteSponsor('${sanitize(sponsor.id)}', '${sanitize(sponsor.name)}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  });
}

// ============================================
// Admin Forms
// ============================================
function initAdminForms() {
  // Add Player button
  const addPlayerBtn = document.getElementById('addPlayerBtn');
  if (addPlayerBtn) {
    addPlayerBtn.addEventListener('click', () => {
      document.getElementById('playerFormTitle').textContent = 'Add Player';
      document.getElementById('playerForm').reset();
      document.getElementById('playerId').value = '';
      document.getElementById('playerFormModal').classList.add('active');
    });
  }

  // Player form submit
  const playerForm = document.getElementById('playerForm');
  if (playerForm) {
    playerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await savePlayer();
    });
  }

  // Add Photo button
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', () => {
      const modal = document.getElementById('galleryUploadModal');
      if (modal) {
        const form = modal.querySelector('form');
        if (form) form.reset();
        modal.classList.add('active');
      }
    });
  }

  // Photo upload form submit
  const adminPhotoForm = document.getElementById('adminUploadPhotoForm');
  if (adminPhotoForm) {
    adminPhotoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('adminPhotoFile');
      const caption = document.getElementById('adminPhotoCaption').value.trim();
      const category = document.getElementById('adminPhotoCategory').value;

      if (!fileInput.files[0] || !caption) {
        showToast('Please select a photo and add a caption', 'error');
        return;
      }

      try {
        const file = fileInput.files[0];
        const url = await uploadFile('gallery/' + Date.now() + '_' + file.name, file);
        await addData('gallery', {
          caption,
          category,
          url,
          date: new Date().toISOString().split('T')[0]
        });
        showToast('Photo uploaded successfully!', 'success');
        adminPhotoForm.reset();
        document.getElementById('galleryUploadModal').classList.remove('active');
        loadAdminGallery();
      } catch (error) {
        showToast('Upload failed: ' + error.message, 'error');
      }
    });
  }

  // Add Video button
  const addVideoBtn = document.getElementById('addVideoBtn');
  if (addVideoBtn) {
    addVideoBtn.addEventListener('click', () => {
      const modal = document.getElementById('videoAddModal');
      if (modal) {
        const form = modal.querySelector('form');
        if (form) form.reset();
        modal.classList.add('active');
      }
    });
  }

  // Video add form submit
  const adminVideoForm = document.getElementById('adminAddVideoForm');
  if (adminVideoForm) {
    adminVideoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('adminVideoTitle').value.trim();
      const url = document.getElementById('adminVideoUrl').value.trim();
      const category = document.getElementById('adminVideoCategory').value;
      const duration = document.getElementById('adminVideoDuration').value.trim();

      if (!title || !url) {
        showToast('Please fill in the title and YouTube URL', 'error');
        return;
      }

      // Extract YouTube ID
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/);
      const youtubeId = match ? match[1] : null;
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
        adminVideoForm.reset();
        document.getElementById('videoAddModal').classList.remove('active');
        loadAdminVideos();
      } catch (error) {
        showToast('Failed to add video: ' + error.message, 'error');
      }
    });
  }

  // Add Fixture button
  const addFixtureBtn = document.getElementById('addFixtureBtn');
  if (addFixtureBtn) {
    addFixtureBtn.addEventListener('click', () => {
      document.getElementById('fixtureFormTitle').textContent = 'Add Fixture';
      document.getElementById('fixtureForm').reset();
      document.getElementById('fixtureId').value = '';
      document.getElementById('fixtureFormModal').classList.add('active');
    });
  }

  // Fixture form submit
  const fixtureForm = document.getElementById('fixtureForm');
  if (fixtureForm) {
    fixtureForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveFixture();
    });
  }

  // Add News button
  const addNewsBtn = document.getElementById('addNewsBtn');
  if (addNewsBtn) {
    addNewsBtn.addEventListener('click', () => {
      document.getElementById('newsForm').reset();
      document.getElementById('newsId').value = '';
      document.getElementById('newsFormModal').classList.add('active');
    });
  }

  // News form submit
  const newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveNews();
    });
  }

  // Add Sponsor button
  const addSponsorBtn = document.getElementById('addSponsorBtn');
  if (addSponsorBtn) {
    addSponsorBtn.addEventListener('click', () => {
      document.getElementById('sponsorForm').reset();
      document.getElementById('sponsorId').value = '';
      document.getElementById('sponsorFormModal').classList.add('active');
    });
  }

  // Sponsor form submit
  const sponsorForm = document.getElementById('sponsorForm');
  if (sponsorForm) {
    sponsorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveSponsor();
    });
  }
}

// ============================================
// Save Functions
// ============================================
async function savePlayer() {
  const id = document.getElementById('playerId').value;
  const photoInput = document.getElementById('playerPhoto');

  const playerData = {
    name: document.getElementById('playerName').value.trim(),
    number: parseInt(document.getElementById('playerNumber').value),
    position: document.getElementById('playerPosition').value,
    nationality: document.getElementById('playerNationality').value.trim(),
    dob: document.getElementById('playerDob').value,
    foot: document.getElementById('playerFoot').value,
    height: parseInt(document.getElementById('playerHeight').value) || null,
    weight: parseInt(document.getElementById('playerWeight').value) || null,
    appearances: parseInt(document.getElementById('playerApps').value) || 0,
    goals: parseInt(document.getElementById('playerGoals').value) || 0,
    assists: parseInt(document.getElementById('playerAssists').value) || 0,
    bio: document.getElementById('playerBio').value.trim()
  };

  try {
    // Upload photo if provided
    if (photoInput.files[0]) {
      const file = photoInput.files[0];
      playerData.photo = await uploadFile(`players/${Date.now()}_${file.name}`, file);
    }

    if (id) {
      await updateData('players', id, playerData);
      showToast('Player updated successfully!', 'success');
    } else {
      await addData('players', playerData);
      showToast('Player added successfully!', 'success');
    }

    document.getElementById('playerFormModal').classList.remove('active');
    loadAdminPlayers();
  } catch (error) {
    showToast('Failed to save player: ' + error.message, 'error');
  }
}

async function saveFixture() {
  const id = document.getElementById('fixtureId').value;

  const fixtureData = {
    opponent: document.getElementById('fixtureOpponent').value.trim(),
    date: document.getElementById('fixtureDate').value,
    time: document.getElementById('fixtureTime').value,
    venue: document.getElementById('fixtureVenue').value.trim(),
    competition: document.getElementById('fixtureCompetition').value.trim(),
    status: document.getElementById('fixtureStatus').value
  };

  const homeScore = document.getElementById('fixtureHomeScore').value;
  const awayScore = document.getElementById('fixtureAwayScore').value;
  if (homeScore !== '') fixtureData.homeScore = parseInt(homeScore);
  if (awayScore !== '') fixtureData.awayScore = parseInt(awayScore);

  try {
    if (id) {
      await updateData('fixtures', id, fixtureData);
      showToast('Fixture updated successfully!', 'success');
    } else {
      await addData('fixtures', fixtureData);
      showToast('Fixture added successfully!', 'success');
    }

    document.getElementById('fixtureFormModal').classList.remove('active');
    loadAdminFixtures();
  } catch (error) {
    showToast('Failed to save fixture: ' + error.message, 'error');
  }
}

async function saveNews() {
  const id = document.getElementById('newsId').value;

  const newsData = {
    title: document.getElementById('newsTitle').value.trim(),
    content: document.getElementById('newsContent').value.trim(),
    icon: document.getElementById('newsIcon').value.trim() || 'fas fa-bolt',
    date: new Date().toISOString().split('T')[0]
  };

  try {
    if (id) {
      await updateData('news', id, newsData);
      showToast('News updated!', 'success');
    } else {
      await addData('news', newsData);
      showToast('News added!', 'success');
    }

    document.getElementById('newsFormModal').classList.remove('active');
    loadAdminNews();
  } catch (error) {
    showToast('Failed to save news: ' + error.message, 'error');
  }
}

async function saveSponsor() {
  const id = document.getElementById('sponsorId').value;
  const logoInput = document.getElementById('sponsorLogo');

  const sponsorData = {
    name: document.getElementById('sponsorName').value.trim(),
    tier: document.getElementById('sponsorTier').value,
    url: document.getElementById('sponsorUrl').value.trim()
  };

  try {
    if (logoInput.files[0]) {
      const file = logoInput.files[0];
      sponsorData.logo = await uploadFile(`sponsors/${Date.now()}_${file.name}`, file);
    }

    if (id) {
      await updateData('sponsors', id, sponsorData);
      showToast('Sponsor updated!', 'success');
    } else {
      await addData('sponsors', sponsorData);
      showToast('Sponsor added!', 'success');
    }

    document.getElementById('sponsorFormModal').classList.remove('active');
    loadAdminSponsors();
  } catch (error) {
    showToast('Failed to save sponsor: ' + error.message, 'error');
  }
}

// ============================================
// Edit Functions
// ============================================
function editPlayer(id) {
  getData('players').then(players => {
    const player = players.find(p => p.id === id);
    if (!player) return;

    document.getElementById('playerFormTitle').textContent = 'Edit Player';
    document.getElementById('playerId').value = player.id;
    document.getElementById('playerName').value = player.name || '';
    document.getElementById('playerNumber').value = player.number || '';
    document.getElementById('playerPosition').value = player.position || 'Forward';
    document.getElementById('playerNationality').value = player.nationality || '';
    document.getElementById('playerDob').value = player.dob || '';
    document.getElementById('playerFoot').value = player.foot || 'Right';
    document.getElementById('playerHeight').value = player.height || '';
    document.getElementById('playerWeight').value = player.weight || '';
    document.getElementById('playerApps').value = player.appearances || 0;
    document.getElementById('playerGoals').value = player.goals || 0;
    document.getElementById('playerAssists').value = player.assists || 0;
    document.getElementById('playerBio').value = player.bio || '';

    document.getElementById('playerFormModal').classList.add('active');
  });
}

function editFixture(id) {
  getData('fixtures').then(fixtures => {
    const fixture = fixtures.find(f => f.id === id);
    if (!fixture) return;

    document.getElementById('fixtureFormTitle').textContent = 'Edit Fixture';
    document.getElementById('fixtureId').value = fixture.id;
    document.getElementById('fixtureOpponent').value = fixture.opponent || '';
    document.getElementById('fixtureDate').value = fixture.date || '';
    document.getElementById('fixtureTime').value = fixture.time || '';
    document.getElementById('fixtureVenue').value = fixture.venue || '';
    document.getElementById('fixtureCompetition').value = fixture.competition || '';
    document.getElementById('fixtureStatus').value = fixture.status || 'upcoming';
    document.getElementById('fixtureHomeScore').value = fixture.homeScore ?? '';
    document.getElementById('fixtureAwayScore').value = fixture.awayScore ?? '';

    document.getElementById('fixtureFormModal').classList.add('active');
  });
}

// ============================================
// Delete Functions
// ============================================
function deletePlayer(id, name) {
  if (!confirm(`Are you sure you want to delete ${name}?`)) return;
  deleteData('players', id).then(() => {
    showToast('Player deleted', 'success');
    loadAdminPlayers();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

function deleteGalleryItem(id) {
  if (!confirm('Delete this photo?')) return;
  deleteData('gallery', id).then(() => {
    showToast('Photo deleted', 'success');
    loadAdminGallery();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

function deleteVideo(id, title) {
  if (!confirm(`Delete "${title}"?`)) return;
  deleteData('videos', id).then(() => {
    showToast('Video deleted', 'success');
    loadAdminVideos();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

function deleteFixture(id, opponent) {
  if (!confirm(`Delete fixture vs ${opponent}?`)) return;
  deleteData('fixtures', id).then(() => {
    showToast('Fixture deleted', 'success');
    loadAdminFixtures();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

function deleteNews(id, title) {
  if (!confirm(`Delete "${title}"?`)) return;
  deleteData('news', id).then(() => {
    showToast('News deleted', 'success');
    loadAdminNews();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

function deleteSponsor(id, name) {
  if (!confirm(`Delete ${name}?`)) return;
  deleteData('sponsors', id).then(() => {
    showToast('Sponsor deleted', 'success');
    loadAdminSponsors();
  }).catch(err => showToast('Delete failed: ' + err.message, 'error'));
}

// ============================================
// Admin Logout
// ============================================
function initAdminLogout() {
  const logoutBtn = document.getElementById('adminLogout');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', async () => {
    try {
      if (isFirebaseReady()) {
        await firebaseAuth.signOut();
      }
      localStorage.removeItem('classicxi_demo_user');
      currentUser = null;
      showToast('Logged out', 'info');
      setTimeout(() => window.location.href = 'index.html', 500);
    } catch (error) {
      showToast('Logout failed', 'error');
    }
  });
}
