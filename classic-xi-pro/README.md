# Classic XI Pro - Soccer Team Website

A modern, responsive website for **Classic XI Pro** football club built with HTML, CSS, and JavaScript with Firebase integration for dynamic content management.

## Features

- **Home Page** - Hero section, animated stats, news ticker, featured players, upcoming fixtures
- **Squad Page** - Player profiles with position filters, detailed profile modals
- **Photo Gallery** - Masonry layout with lightbox viewer and category filters
- **Videos** - YouTube embeds with categories (Highlights, Full Match, Training, Interviews)
- **Fixtures & Results** - Upcoming matches and past results with scores
- **Sponsors** - Tiered sponsor display (Platinum, Gold, Silver)
- **Admin Dashboard** - Full CRUD management for all content
- **Authentication** - Secure login for team members
- **Responsive Design** - Works on all devices (mobile, tablet, desktop)

## Quick Start

### Option 1: Open directly in browser
Simply open `index.html` in your web browser. The site works with demo data out of the box.

### Option 2: Local development server

**Using Python:**
```bash
cd classic-xi-pro
python3 -m http.server 8000
```
Then visit: http://localhost:8000

**Using Node.js:**
```bash
npx serve classic-xi-pro
```

**Using VS Code:**
Install the "Live Server" extension and click "Go Live".

## Demo Mode

The site works immediately with sample data - no Firebase setup required!

**Demo Login Credentials:**
- Email: `admin@classicxipro.com`
- Password: `admin123`

## Testing Guide (Step by Step)

### 1. Open the site
Open `index.html` in your browser (or use a local server - see Quick Start above).

### 2. Test the Home Page
- Scroll down to see animated stat counters (156 Matches, 98 Wins, 312 Goals, 5 Trophies)
- Watch the scrolling news ticker below the hero
- See the "About" section, featured players cards, and upcoming fixtures
- Check the sponsors strip at the bottom

### 3. Test the Squad Page
- Click **Squad** in the navigation
- You'll see all 13 demo players displayed as cards
- Click the filter buttons (Goalkeepers, Defenders, Midfielders, Forwards) to filter
- **Click any player card** to open a detailed profile modal with bio, stats, and personal details
- Press Escape or click outside to close

### 4. Test the Gallery
- Click **Gallery** in the navigation
- Browse photo placeholders (these become real photos once you upload images)
- Click the filter buttons to filter by category
- **Click any photo** to open the lightbox viewer
- Use arrow keys or the left/right buttons to navigate, Escape to close

### 5. Test the Videos
- Click **Videos** in the navigation
- See video cards with YouTube thumbnails
- Click the filter buttons for categories
- **Click any video card** to open the YouTube player modal

### 6. Test Fixtures & Results
- Click **Fixtures** in the navigation
- Default view shows **Upcoming** matches (4 fixtures)
- Click **Results** tab to see past match results with scores and Win/Loss/Draw badges

### 7. Test the Sponsors Page
- Click **Sponsors** in the navigation
- See sponsors organized by tier: Platinum, Gold, Silver
- Scroll down to the "Become a Sponsor" call-to-action section

### 8. Test Login & Admin Dashboard
1. Click **Login** in the navigation
2. Enter: `admin@classicxipro.com` / `admin123`
3. Click **Sign In** - you'll be redirected to the Admin Dashboard
4. In the dashboard you can:
   - **Players tab**: See all players in a table, click Edit to modify, or Add Player to create new
   - **Gallery tab**: See uploaded photos, delete them
   - **Videos tab**: Manage video entries
   - **Fixtures tab**: Add new fixtures, edit existing ones, add scores to completed matches
   - **News tab**: Add news items that appear in the ticker
   - **Sponsors tab**: Add/remove sponsors with tier selection
5. Click **Logout** to sign out

### 9. Test Responsive Design
- Resize your browser window to see the mobile layout
- On mobile: the navigation collapses into a hamburger menu
- All grids and layouts adapt to smaller screens

> **Note:** In demo mode, changes you make in the admin dashboard persist only during the current browser session. Refreshing the page resets to the original demo data. To make changes permanent, set up Firebase (see below).

## Adding Your Team Logo

### Option A: Replace the logo file directly
1. Prepare your logo image (PNG, SVG, or JPG recommended, ideally square or shield-shaped)
2. Name your logo file `logo-placeholder.svg` (or `logo-placeholder.png`)
3. Copy it to the `assets/` folder, replacing the existing file
4. If using a different file format (e.g., `.png` instead of `.svg`), update the references in every HTML file:
   - Search for `assets/logo-placeholder.svg` and replace with `assets/logo-placeholder.png`
   - Files to update: `index.html`, `players.html`, `gallery.html`, `videos.html`, `fixtures.html`, `sponsors.html`, `login.html`, `admin.html`

### Option B: Use a different filename
1. Place your logo in the `assets/` folder (e.g., `assets/classic-xi-pro-logo.png`)
2. Do a find-and-replace across all HTML files:
   - Find: `assets/logo-placeholder.svg`
   - Replace with: `assets/classic-xi-pro-logo.png`

**Tip:** For best results, use an SVG logo (scales perfectly at any size) or a PNG with transparent background, at least 200x200 pixels.

## Updating Player Profiles

### Method 1: Via the Admin Dashboard (Recommended)
1. Log in at `login.html` (demo: `admin@classicxipro.com` / `admin123`)
2. Go to the **Dashboard** (you're redirected after login)
3. Click the **Players** tab
4. To **add a new player**: Click the gold "Add Player" button, fill in the form:
   - Full Name, Jersey Number, Position (required)
   - Nationality, Date of Birth, Preferred Foot, Height, Weight (optional)
   - Appearances, Goals, Assists (stats)
   - Profile Photo (upload an image file)
   - Biography (text description)
   - Click **Save Player**
5. To **edit an existing player**: Click the blue Edit button next to their name
6. To **delete a player**: Click the red Delete button and confirm

### Method 2: Edit the demo data directly in code
Open `js/firebase-config.js` and find the `DEMO_DATA.players` array (around line 60). Each player object looks like this:

```javascript
{
  id: "p1",
  name: "Samuel Adeyemi",       // Full name
  number: 1,                     // Jersey number
  position: "Goalkeeper",        // Goalkeeper, Defender, Midfielder, or Forward
  nationality: "Nigerian",       // Country
  dob: "1995-03-15",            // Date of birth (YYYY-MM-DD)
  height: 188,                   // Height in cm
  weight: 82,                    // Weight in kg
  foot: "Right",                 // Right, Left, or Both
  appearances: 45,               // Number of matches played
  goals: 0,                      // Goals scored
  assists: 1,                    // Assists
  bio: "Description of the player...",
  photo: "",                     // Leave empty for placeholder, or paste image URL
  featured: false                // Set to true to show on home page
}
```

To add a new player, copy an existing entry, change the `id` to something unique (e.g., `"p14"`), and fill in the details.

### Adding Player Photos
- **Via Admin Dashboard**: Use the Profile Photo file input when adding/editing a player
- **Via code**: Set the `photo` field to a direct image URL, e.g.:
  ```javascript
  photo: "https://example.com/photos/player-name.jpg"
  ```
- **Using local files**: Place photos in an `assets/players/` folder and reference them:
  ```javascript
  photo: "assets/players/samuel-adeyemi.jpg"
  ```

## Updating Other Content

### Fixtures & Results
- **Admin Dashboard**: Fixtures tab > Add Fixture or Edit existing
- **Code**: Edit `DEMO_DATA.fixtures` in `js/firebase-config.js`
  - Set `status: "upcoming"` for future matches
  - Set `status: "completed"` and add `homeScore` / `awayScore` for results

### Gallery Photos
- **Admin Dashboard**: Gallery tab > Upload Photo (select file, add caption, choose category)
- **Code**: Edit `DEMO_DATA.gallery` in `js/firebase-config.js` and add a `url` field pointing to your image

### Videos
- **Admin Dashboard**: Videos tab > Add Video (paste YouTube URL, set title and category)
- **Code**: Edit `DEMO_DATA.videos` in `js/firebase-config.js`
  - `youtubeId` is the YouTube video ID (the part after `v=` in the URL)

### News Ticker
- **Admin Dashboard**: News tab > Add News
- **Code**: Edit `DEMO_DATA.news` in `js/firebase-config.js`

### Sponsors
- **Admin Dashboard**: Sponsors tab > Add Sponsor (name, tier, website, logo image)
- **Code**: Edit `DEMO_DATA.sponsors` in `js/firebase-config.js`
  - Tiers: `"platinum"`, `"gold"`, or `"silver"`

## Firebase Setup (For Production)

To enable persistent data storage, authentication, and file uploads:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" and follow the setup wizard
3. Name your project (e.g., "classic-xi-pro")

### 2. Enable Services
- **Authentication**: Go to Authentication > Sign-in method > Enable "Email/Password"
- **Firestore**: Go to Firestore Database > Create database > Start in test mode
- **Storage**: Go to Storage > Get started

### 3. Get Config
1. Go to Project Settings > General
2. Scroll to "Your apps" > Click the web icon (`</>`)
3. Register your app and copy the config object

### 4. Update Config
Open `js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 5. Add Firebase SDK
Add these scripts to each HTML file before the closing `</body>` tag (before other scripts):

```html
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-storage-compat.js"></script>
```

### 6. Create Admin Account
In Firebase Console > Authentication > Add user with your email/password.

## Free Hosting Options

### GitHub Pages
1. Push code to a GitHub repository
2. Go to Settings > Pages
3. Set source to "main" branch
4. Your site will be at `https://username.github.io/repo-name`

### Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop the `classic-xi-pro` folder
3. Get a free `.netlify.app` URL

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Project Structure

```
classic-xi-pro/
├── index.html              # Home page
├── players.html            # Squad / player profiles
├── gallery.html            # Photo gallery
├── videos.html             # Match videos
├── fixtures.html           # Fixtures & results
├── sponsors.html           # Sponsors page
├── admin.html              # Admin dashboard
├── login.html              # Authentication page
├── css/
│   ├── styles.css          # Main stylesheet
│   └── admin.css           # Admin-specific styles
├── js/
│   ├── firebase-config.js  # Firebase config & demo data
│   ├── app.js              # Shared utilities
│   ├── auth.js             # Authentication logic
│   ├── players.js          # Players page logic
│   ├── gallery.js          # Gallery page logic
│   ├── videos.js           # Videos page logic
│   ├── fixtures.js         # Fixtures page logic
│   └── admin.js            # Admin dashboard logic
├── assets/
│   └── logo-placeholder.svg # Team logo
└── README.md
```

## Customization

### Team Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --primary: #1a237e;      /* Main color (Navy Blue) */
  --accent: #ffd700;       /* Accent color (Gold) */
}
```

### Team Logo
Replace `assets/logo-placeholder.svg` with your actual team logo.

### Team Information
Update the demo data in `js/firebase-config.js` to reflect your actual team details.

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties, Animations)
- JavaScript (ES6+)
- Firebase (Authentication, Firestore, Storage)
- Google Fonts (Poppins, Inter)
- Font Awesome 6 Icons

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+
