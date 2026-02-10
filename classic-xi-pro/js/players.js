/* ============================================
   Classic XI Pro - Players Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPlayersPage();
});

let allPlayers = [];

function initPlayersPage() {
  loadPlayers();
  initPlayerFilters();
  initPlayerModal();
}

// Load all players
function loadPlayers() {
  const grid = document.getElementById('playersGrid');
  if (!grid) return;

  getData('players').then(players => {
    allPlayers = players;
    renderPlayers(players);
  });
}

// Render player cards
function renderPlayers(players) {
  const grid = document.getElementById('playersGrid');
  if (!grid) return;

  if (players.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-users-slash"></i>
        <h3>No players found</h3>
        <p>No players match the selected filter.</p>
      </div>
    `;
    return;
  }

  // Sort by position order then by number
  const posOrder = { 'Goalkeeper': 1, 'Defender': 2, 'Midfielder': 3, 'Forward': 4 };
  players.sort((a, b) => (posOrder[a.position] || 5) - (posOrder[b.position] || 5) || a.number - b.number);

  grid.innerHTML = players.map(player => `
    <div class="player-card fade-in" data-player-id="${sanitize(player.id)}" data-position="${sanitize(player.position)}">
      <div class="player-card-img">
        ${player.photo
          ? `<img src="${sanitize(player.photo)}" alt="${sanitize(player.name)}" loading="lazy">`
          : `<div class="player-placeholder"><i class="fas fa-user"></i></div>`
        }
        <div class="player-number">${sanitize(String(player.number))}</div>
      </div>
      <div class="player-card-info">
        <h3>${sanitize(player.name)}</h3>
        <div class="position">${sanitize(player.position)}</div>
        <div class="nationality"><i class="fas fa-globe"></i> ${sanitize(player.nationality || 'N/A')}</div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
      const playerId = card.dataset.playerId;
      openPlayerModal(playerId);
    });
  });

  initScrollAnimations();
}

// Filter buttons
function initPlayerFilters() {
  const filterContainer = document.getElementById('positionFilters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    if (filter === 'all') {
      renderPlayers(allPlayers);
    } else {
      renderPlayers(allPlayers.filter(p => p.position === filter));
    }
  });
}

// Player Modal
function initPlayerModal() {
  const modal = document.getElementById('playerModal');
  const closeBtn = document.getElementById('modalClose');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}

function openPlayerModal(playerId) {
  const player = allPlayers.find(p => p.id === playerId);
  if (!player) return;

  const modal = document.getElementById('playerModal');

  // Set player image
  const imgContainer = document.getElementById('modalPlayerImg');
  if (player.photo) {
    imgContainer.innerHTML = `<img src="${sanitize(player.photo)}" alt="${sanitize(player.name)}">`;
  } else {
    imgContainer.innerHTML = '<i class="fas fa-user"></i>';
  }

  // Set basic info
  document.getElementById('modalPlayerName').textContent = player.name;
  document.getElementById('modalPlayerPosition').textContent = player.position;
  document.getElementById('modalPlayerNumber').textContent = `Jersey #${player.number}`;

  // Set stats
  document.getElementById('modalApps').textContent = player.appearances || 0;
  document.getElementById('modalGoals').textContent = player.goals || 0;
  document.getElementById('modalAssists').textContent = player.assists || 0;

  // Set details
  const detailsContainer = document.getElementById('modalDetails');
  const details = [];

  if (player.nationality) details.push({ icon: 'fa-globe', label: 'Nationality', value: player.nationality });
  if (player.dob) details.push({ icon: 'fa-birthday-cake', label: 'Date of Birth', value: formatDate(player.dob) });
  if (player.height) details.push({ icon: 'fa-ruler-vertical', label: 'Height', value: `${player.height} cm` });
  if (player.weight) details.push({ icon: 'fa-weight', label: 'Weight', value: `${player.weight} kg` });
  if (player.foot) details.push({ icon: 'fa-shoe-prints', label: 'Preferred Foot', value: player.foot });
  details.push({ icon: 'fa-tshirt', label: 'Jersey Number', value: `#${player.number}` });

  detailsContainer.innerHTML = details.map(d => `
    <div class="modal-detail">
      <i class="fas ${sanitize(d.icon)}"></i>
      <div>
        <div class="detail-label">${sanitize(d.label)}</div>
        <div class="detail-value">${sanitize(d.value)}</div>
      </div>
    </div>
  `).join('');

  // Set bio
  const bioContainer = document.getElementById('modalBio');
  bioContainer.innerHTML = `
    <h4>Biography</h4>
    <p>${sanitize(player.bio || 'No biography available.')}</p>
  `;

  modal.classList.add('active');
}
