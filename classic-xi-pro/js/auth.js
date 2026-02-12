/* ============================================
   Classic XI Pro - Authentication Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoginPage();
});

function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const loggedInSection = document.getElementById('loggedInSection');
  const loginError = document.getElementById('loginError');
  const loginSuccess = document.getElementById('loginSuccess');

  // Check current auth state
  onAuthChange(user => {
    if (user) {
      // Already logged in
      if (loginForm) loginForm.style.display = 'none';
      if (loggedInSection) loggedInSection.style.display = 'block';
      if (loginSuccess) {
        loginSuccess.style.display = 'block';
        loginSuccess.textContent = 'Logged in as ' + (user.email || user.name || 'Team Member');
      }
    } else {
      if (loginForm) loginForm.style.display = 'block';
      if (loggedInSection) loggedInSection.style.display = 'none';
    }
  });

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const submitBtn = document.getElementById('loginBtn');

      // Reset errors
      if (loginError) loginError.style.display = 'none';

      // Validate
      if (!email || !password) {
        showLoginError('Please fill in all fields.');
        return;
      }

      // Disable button
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;"></div> Signing in...';

      try {
        if (isFirebaseReady()) {
          // Firebase auth
          await firebaseAuth.signInWithEmailAndPassword(email, password);
          showToast('Login successful!', 'success');
          setTimeout(() => window.location.href = 'admin.html', 1000);
        } else {
          // Demo mode login
          if (email === 'admin@classicxipro.com' && password === 'ClassicAdmin1@1') {
            const demoUser = { email, name: 'Admin', uid: 'demo_admin' };
            localStorage.setItem('classicxi_demo_user', JSON.stringify(demoUser));
            currentUser = demoUser;
            showToast('Login successful! (Demo Mode)', 'success');
            setTimeout(() => window.location.href = 'admin.html', 1000);
          } else {
            showLoginError('Invalid credentials. Please check your email and password.');
          }
        }
      } catch (error) {
        let message = 'Login failed. Please try again.';
        if (error.code === 'auth/user-not-found') message = 'No account found with this email.';
        else if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
        else if (error.code === 'auth/invalid-email') message = 'Invalid email address.';
        else if (error.code === 'auth/too-many-requests') message = 'Too many attempts. Please try again later.';
        showLoginError(message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
      }
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        if (isFirebaseReady()) {
          await firebaseAuth.signOut();
        }
        localStorage.removeItem('classicxi_demo_user');
        currentUser = null;
        showToast('Logged out successfully', 'info');
        setTimeout(() => window.location.href = 'index.html', 500);
      } catch (error) {
        showToast('Logout failed', 'error');
      }
    });
  }
}

function showLoginError(message) {
  const errorEl = document.getElementById('loginError');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}
