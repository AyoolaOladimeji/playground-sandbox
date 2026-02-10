/* ============================================
   Classic XI Pro - Fixtures & Results Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFixturesPage();
});

let allFixtures = [];
let currentTab = 'upcoming';

function initFixturesPage() {
  loadFixtures();
  initFixtureTabs();
}

// Load fixtures
function loadFixtures() {
  const list = document.getElementById('fixturesList');
  if (!list) return;

  getData('fixtures').then(fixtures => {
    allFixtures = fixtures;
    renderFixtures('upcoming');
  });
}

// Render fixtures based on tab
function renderFixtures(tab) {
  const list = document.getElementById('fixturesList');
  if (!list) return;

  currentTab = tab;
  const filtered = allFixtures.filter(f => f.status === (tab === 'upcoming' ? 'upcoming' : 'completed'));

  // Sort: upcoming by date ascending, results by date descending
  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return tab === 'upcoming' ? dateA - dateB : dateB - dateA;
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-${tab === 'upcoming' ? 'calendar-times' : 'clipboard-list'}"></i>
        <h3>No ${tab === 'upcoming' ? 'upcoming fixtures' : 'results'}</h3>
        <p>${tab === 'upcoming' ? 'New fixtures will be added soon.' : 'No completed matches yet.'}</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(fixture => {
    const date = new Date(fixture.date);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

    if (fixture.status === 'upcoming') {
      return `
        <div class="fixture-item fade-in">
          <div class="fixture-date">
            <div class="day">${day}</div>
            <div class="month">${month}</div>
            ${fixture.time ? `<div class="time">${sanitize(fixture.time)}</div>` : ''}
          </div>
          <div class="fixture-teams">
            <div class="teams">Classic XI Pro <span class="vs">vs</span> ${sanitize(fixture.opponent)}</div>
            <div class="venue"><i class="fas fa-map-marker-alt"></i> ${sanitize(fixture.venue || 'TBD')}</div>
          </div>
          <div class="fixture-score">
            ${fixture.competition ? `<div class="fixture-competition">${sanitize(fixture.competition)}</div>` : ''}
          </div>
        </div>
      `;
    } else {
      const homeScore = fixture.homeScore ?? '-';
      const awayScore = fixture.awayScore ?? '-';
      let result = 'draw';
      let resultText = 'Draw';
      if (homeScore > awayScore) { result = 'win'; resultText = 'Win'; }
      else if (homeScore < awayScore) { result = 'loss'; resultText = 'Loss'; }

      return `
        <div class="fixture-item fade-in">
          <div class="fixture-date">
            <div class="day">${day}</div>
            <div class="month">${month}</div>
          </div>
          <div class="fixture-teams">
            <div class="teams">Classic XI Pro <span class="vs">vs</span> ${sanitize(fixture.opponent)}</div>
            <div class="venue"><i class="fas fa-map-marker-alt"></i> ${sanitize(fixture.venue || 'TBD')}</div>
          </div>
          <div class="fixture-score">
            <div class="score">${homeScore} - ${awayScore}</div>
            <span class="result-badge ${result}">${resultText}</span>
            ${fixture.competition ? `<div class="fixture-competition" style="margin-top: 5px;">${sanitize(fixture.competition)}</div>` : ''}
          </div>
        </div>
      `;
    }
  }).join('');

  initScrollAnimations();
}

// Tab switching
function initFixtureTabs() {
  const tabContainer = document.getElementById('fixtureTabs');
  if (!tabContainer) return;

  tabContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.fixture-tab');
    if (!tab) return;

    tabContainer.querySelectorAll('.fixture-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    renderFixtures(tab.dataset.tab);
  });
}
