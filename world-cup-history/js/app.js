// ===== World Cup History Application =====

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderTournamentCards();
  renderWinnersGrid();
  renderScorersTable();
  renderAwardsGrid();
  calculateStatistics();
  initFactsTicker();
  initFilters();
  initModal();
  initMobileMenu();
  initSmoothScroll();
}

// ===== Tournament Cards =====
function renderTournamentCards() {
  const grid = document.getElementById('tournamentGrid');
  if (!grid) return;

  grid.innerHTML = worldCupData
    .slice()
    .reverse()
    .map(tournament => createTournamentCard(tournament))
    .join('');
}

function createTournamentCard(tournament) {
  return `
    <div class="tournament-card fade-in" data-year="${tournament.year}" onclick="openModal(${tournament.year})">
      <div class="tournament-card-header">
        <div class="tournament-year">${tournament.year}</div>
        <div class="tournament-host">${tournament.host}</div>
      </div>
      <div class="tournament-card-body">
        <div class="tournament-winner">
          <span class="winner-trophy">🏆</span>
          <div class="winner-info">
            <div class="winner-label">Winner</div>
            <div class="winner-name">${tournament.winner}</div>
          </div>
        </div>
        <div class="tournament-final">
          <span>Final: ${tournament.finalScore}</span>
          <span>vs ${tournament.runnerUp}</span>
        </div>
      </div>
    </div>
  `;
}

// ===== Filter Functionality =====
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filterTournaments(filter);
    });
  });
}

function filterTournaments(filter) {
  const cards = document.querySelectorAll('.tournament-card');

  cards.forEach(card => {
    const year = parseInt(card.dataset.year);
    let show = true;

    if (filter !== 'all') {
      const [start, end] = filter.split('-').map(Number);
      show = year >= start && year <= end;
    }

    card.style.display = show ? 'block' : 'none';
  });
}

// ===== Modal Functionality =====
function initModal() {
  const modal = document.getElementById('tournamentModal');
  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(year) {
  const modal = document.getElementById('tournamentModal');
  const modalBody = document.getElementById('modalBody');
  const tournament = worldCupData.find(t => t.year === year);

  if (!tournament) return;

  modalBody.innerHTML = createModalContent(tournament);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('tournamentModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function createModalContent(t) {
  const goldenBall = t.goldenBall
    ? `<div class="award-item">
        <span class="award-icon">⚽</span>
        <div class="award-info">
          <div class="award-name">Golden Ball (Best Player)</div>
          <div class="award-winner">${t.goldenBall.player}</div>
          <div class="award-country">${t.goldenBall.country}</div>
        </div>
      </div>` : '';

  const goldenGlove = t.goldenGlove
    ? `<div class="award-item">
        <span class="award-icon">🧤</span>
        <div class="award-info">
          <div class="award-name">Golden Glove (Best Goalkeeper)</div>
          <div class="award-winner">${t.goldenGlove.player}</div>
          <div class="award-country">${t.goldenGlove.country}</div>
        </div>
      </div>` : '';

  const bestYoung = t.bestYoungPlayer
    ? `<div class="award-item">
        <span class="award-icon">🌟</span>
        <div class="award-info">
          <div class="award-name">Best Young Player</div>
          <div class="award-winner">${t.bestYoungPlayer.player}</div>
          <div class="award-country">${t.bestYoungPlayer.country}</div>
        </div>
      </div>` : '';

  return `
    <div class="modal-header">
      <div class="modal-year">${t.year}</div>
      <div class="modal-host">${t.host}</div>
    </div>

    <div class="modal-section">
      <h4>Final Match</h4>
      <div class="final-result">
        <div class="final-team winner">
          <div class="team-name">${t.winner}</div>
          <div class="team-label">Winner</div>
        </div>
        <div class="final-score">${t.finalScore}</div>
        <div class="final-team">
          <div class="team-name">${t.runnerUp}</div>
          <div class="team-label">Runner-up</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h4>Final Standings</h4>
      <div class="podium">
        <div class="podium-item">
          <span class="podium-position gold">1st</span>
          <span>${t.winner}</span>
        </div>
        <div class="podium-item">
          <span class="podium-position silver">2nd</span>
          <span>${t.runnerUp}</span>
        </div>
        <div class="podium-item">
          <span class="podium-position bronze">3rd</span>
          <span>${t.thirdPlace}</span>
        </div>
        <div class="podium-item">
          <span class="podium-position fourth">4th</span>
          <span>${t.fourthPlace}</span>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h4>Individual Awards</h4>
      <div class="awards-list">
        <div class="award-item">
          <span class="award-icon">👟</span>
          <div class="award-info">
            <div class="award-name">Golden Boot (Top Scorer)</div>
            <div class="award-winner">${t.goldenBoot.player}</div>
            <div class="award-country">${t.goldenBoot.country} - ${t.goldenBoot.goals} goals</div>
          </div>
        </div>
        ${goldenBall}
        ${goldenGlove}
        ${bestYoung}
      </div>
    </div>

    <div class="modal-section">
      <h4>Top Scorers</h4>
      <div class="top-scorers-list">
        ${t.topScorers.map((scorer, index) => `
          <div class="scorer-item">
            <div class="scorer-info">
              <span class="scorer-name">${index + 1}. ${scorer.player}</span>
              <span class="scorer-country">${scorer.country}</span>
            </div>
            <span class="scorer-goals">${scorer.goals} goals</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h4>Tournament Statistics</h4>
      <div class="tournament-stats">
        <div class="stat-item">
          <div class="value">${t.totalMatches}</div>
          <div class="label">Matches</div>
        </div>
        <div class="stat-item">
          <div class="value">${t.totalGoals}</div>
          <div class="label">Goals</div>
        </div>
        <div class="stat-item">
          <div class="value">${t.teams}</div>
          <div class="label">Teams</div>
        </div>
      </div>
    </div>
  `;
}

// Make openModal globally accessible
window.openModal = openModal;

// ===== Winners Grid =====
function renderWinnersGrid() {
  const grid = document.getElementById('winnersGrid');
  if (!grid) return;

  const sortedCountries = Object.entries(countryStats)
    .sort((a, b) => b[1].wins - a[1].wins);

  grid.innerHTML = sortedCountries.map(([country, stats]) => `
    <div class="winner-card fade-in">
      <div class="winner-card-country">${country}</div>
      <div class="winner-card-wins">
        <span class="wins-count">${stats.wins}</span>
        <span class="wins-label">${stats.wins === 1 ? 'Title' : 'Titles'}</span>
      </div>
      <div class="winner-years">
        ${stats.years.map(year => `<span class="year-badge">${year}</span>`).join('')}
      </div>
      ${stats.note ? `<p style="font-size: 0.75rem; color: var(--text-light); margin-top: 10px;">${stats.note}</p>` : ''}
    </div>
  `).join('');
}

// ===== Scorers Table =====
function renderScorersTable() {
  const tbody = document.querySelector('#scorersTable tbody');
  if (!tbody) return;

  tbody.innerHTML = allTimeTopScorers.map((scorer, index) => {
    let rankClass = 'default';
    if (index === 0) rankClass = 'gold';
    else if (index === 1) rankClass = 'silver';
    else if (index === 2) rankClass = 'bronze';

    return `
      <tr class="fade-in">
        <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
        <td><strong>${scorer.player}</strong></td>
        <td>${scorer.country}</td>
        <td><span class="goals-count">${scorer.goals}</span></td>
        <td>${scorer.tournaments}</td>
      </tr>
    `;
  }).join('');
}

// ===== Awards Grid =====
function renderAwardsGrid() {
  const grid = document.getElementById('awardsGrid');
  if (!grid) return;

  // Filter tournaments that have at least Golden Ball (from 1974 onwards mostly)
  const tournamentsWithAwards = worldCupData
    .filter(t => t.goldenBall || t.goldenGlove)
    .slice()
    .reverse();

  grid.innerHTML = tournamentsWithAwards.map(t => `
    <div class="awards-card fade-in">
      <div class="awards-card-header">
        <span class="awards-card-year">${t.year}</span>
        <span class="awards-card-host">${t.host}</span>
      </div>
      <div class="awards-card-content">
        <div class="awards-card-item">
          <span class="icon">👟</span>
          <span class="label">Golden Boot:</span>
          <span class="value">${t.goldenBoot.player}</span>
        </div>
        ${t.goldenBall ? `
          <div class="awards-card-item">
            <span class="icon">⚽</span>
            <span class="label">Golden Ball:</span>
            <span class="value">${t.goldenBall.player}</span>
          </div>
        ` : ''}
        ${t.goldenGlove ? `
          <div class="awards-card-item">
            <span class="icon">🧤</span>
            <span class="label">Golden Glove:</span>
            <span class="value">${t.goldenGlove.player}</span>
          </div>
        ` : ''}
        ${t.bestYoungPlayer ? `
          <div class="awards-card-item">
            <span class="icon">🌟</span>
            <span class="label">Best Young:</span>
            <span class="value">${t.bestYoungPlayer.player}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// ===== Statistics =====
function calculateStatistics() {
  const totalGoals = worldCupData.reduce((sum, t) => sum + t.totalGoals, 0);
  const totalMatches = worldCupData.reduce((sum, t) => sum + t.totalMatches, 0);

  // Count unique hosts
  const uniqueHosts = new Set(
    worldCupData.flatMap(t => t.host.split(' / '))
  );

  // Animate counters
  animateCounter('totalGoals', totalGoals);
  animateCounter('totalMatches', totalMatches);
  animateCounter('hostCountries', uniqueHosts.size);
}

function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== Facts Ticker =====
function initFactsTicker() {
  const ticker = document.getElementById('factsTicker');
  if (!ticker) return;

  // Double the facts for seamless loop
  const facts = [...worldCupFacts, ...worldCupFacts];

  ticker.innerHTML = facts.map(fact => `<span>${fact}</span>`).join('');
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // Close menu when clicking a link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observe elements after they're added to DOM
setTimeout(() => {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}, 100);
