/* ============================================
   Classic XI Pro - Shared Application Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollHeader();
  initScrollAnimations();
  initCounterAnimations();
  initHomePage();
});

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = btn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// ============================================
// Scroll Header Effect
// ============================================
function initScrollHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ============================================
// Animated Counters
// ============================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ============================================
// Home Page Initialization
// ============================================
function initHomePage() {
  const featuredGrid = document.getElementById('featuredPlayersGrid');
  const upcomingFixtures = document.getElementById('upcomingFixtures');
  const sponsorsStrip = document.getElementById('sponsorsStrip');

  if (featuredGrid) loadFeaturedPlayers(featuredGrid);
  if (upcomingFixtures) loadUpcomingFixtures(upcomingFixtures);
  if (sponsorsStrip) loadSponsorsStrip(sponsorsStrip);
}

// Load Featured Players on Home Page
function loadFeaturedPlayers(container) {
  getData('players').then(players => {
    const featured = players.filter(p => p.featured).slice(0, 4);
    const displayPlayers = featured.length > 0 ? featured : players.slice(0, 4);

    container.innerHTML = displayPlayers.map(player => `
      <div class="player-card fade-in" onclick="window.location.href='players.html'">
        <div class="player-card-img">
          ${player.photo
            ? `<img src="${sanitize(player.photo)}" alt="${sanitize(player.name)}">`
            : `<div class="player-placeholder"><i class="fas fa-user"></i></div>`
          }
          <div class="player-number">${sanitize(String(player.number))}</div>
        </div>
        <div class="player-card-info">
          <h3>${sanitize(player.name)}</h3>
          <div class="position">${sanitize(player.position)}</div>
          <div class="nationality"><i class="fas fa-globe"></i> ${sanitize(player.nationality)}</div>
        </div>
      </div>
    `).join('');

    initScrollAnimations();
  });
}

// Load Upcoming Fixtures on Home Page
function loadUpcomingFixtures(container) {
  getData('fixtures').then(fixtures => {
    const upcoming = fixtures
      .filter(f => f.status === 'upcoming')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    if (upcoming.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>No upcoming fixtures</h3><p>Check back soon for new matches</p></div>';
      return;
    }

    container.innerHTML = upcoming.map(fixture => {
      const date = new Date(fixture.date);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      return `
        <div class="upcoming-card fade-in">
          <div class="match-date">${sanitize(dateStr)} ${fixture.time ? '• ' + sanitize(fixture.time) : ''}</div>
          <div class="match-teams">
            Classic XI Pro <span class="vs">vs</span> ${sanitize(fixture.opponent)}
          </div>
          <div class="match-venue"><i class="fas fa-map-marker-alt"></i> ${sanitize(fixture.venue || 'TBD')}</div>
          ${fixture.competition ? `<span class="match-competition">${sanitize(fixture.competition)}</span>` : ''}
        </div>
      `;
    }).join('');

    initScrollAnimations();
  });
}

// Load Sponsors Strip on Home Page
function loadSponsorsStrip(container) {
  getData('sponsors').then(sponsors => {
    container.innerHTML = sponsors.map(sponsor =>
      `<span class="sponsor-logo-item">${sanitize(sponsor.name)}</span>`
    ).join('');
  });
}

// Populate sponsors page
function loadSponsorsPage() {
  const platinumContainer = document.getElementById('platinumSponsors');
  const goldContainer = document.getElementById('goldSponsors');
  const silverContainer = document.getElementById('silverSponsors');

  if (!platinumContainer) return;

  getData('sponsors').then(sponsors => {
    const renderSponsor = (sponsor) => `
      <a href="${sanitize(sponsor.url || '#')}" target="_blank" rel="noopener" class="sponsor-card ${sponsor.tier === 'platinum' ? 'platinum' : ''}">
        ${sponsor.logo
          ? `<img src="${sanitize(sponsor.logo)}" alt="${sanitize(sponsor.name)}">`
          : `<div class="sponsor-placeholder">${sanitize(sponsor.name.substring(0, 2).toUpperCase())}</div>`
        }
        <div class="sponsor-name">${sanitize(sponsor.name)}</div>
      </a>
    `;

    platinumContainer.innerHTML = sponsors.filter(s => s.tier === 'platinum').map(renderSponsor).join('');
    goldContainer.innerHTML = sponsors.filter(s => s.tier === 'gold').map(renderSponsor).join('');
    silverContainer.innerHTML = sponsors.filter(s => s.tier === 'silver').map(renderSponsor).join('');
  });
}

// Auto-init sponsors page
if (document.getElementById('platinumSponsors')) {
  document.addEventListener('DOMContentLoaded', loadSponsorsPage);
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${sanitize(message)}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================
// Utility: Sanitize HTML to prevent XSS
// ============================================
function sanitize(str) {
  if (str === null || str === undefined) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

// ============================================
// Utility: Format date
// ============================================
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ============================================
// Auth state tracking
// ============================================
let currentUser = null;

function isLoggedIn() {
  return currentUser !== null;
}

function onAuthChange(callback) {
  if (isFirebaseReady() && firebaseAuth) {
    firebaseAuth.onAuthStateChanged(user => {
      currentUser = user;
      callback(user);
    });
  } else {
    // Demo mode: check localStorage
    const demoUser = localStorage.getItem('classicxi_demo_user');
    if (demoUser) {
      currentUser = JSON.parse(demoUser);
    }
    callback(currentUser);
  }
}

// Track auth state on all pages
onAuthChange(() => {});
