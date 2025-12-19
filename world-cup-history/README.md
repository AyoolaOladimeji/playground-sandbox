# FIFA World Cup History Website

A complete, interactive website that tracks the history of all FIFA World Cup tournaments from 1930 to 2022, including winners, top scorers, and individual awards.

## Features

- **Complete Tournament History**: All 22 World Cup tournaments from Uruguay 1930 to Qatar 2022
- **Interactive Tournament Cards**: Click any tournament to see detailed information
- **Winners by Country**: Visual display of all winning nations and their titles
- **All-Time Top Scorers**: Comprehensive table of the greatest World Cup goalscorers
- **Individual Awards**: Golden Boot, Golden Ball, Golden Glove, and Best Young Player
- **Statistics Dashboard**: Total goals, matches, and host countries
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects and animated counters

## Project Structure

```
world-cup-history/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styling
├── js/
│   └── app.js              # JavaScript functionality
├── data/
│   └── worldcup-data.js    # World Cup historical data
├── images/                 # (Optional) For any images
└── README.md               # This file
```

## Quick Start

### Option 1: Open Directly in Browser

1. Navigate to the `world-cup-history` folder
2. Double-click `index.html` to open in your default browser

### Option 2: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Using Python's Built-in Server

```bash
cd world-cup-history
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 4: Using Node.js (http-server)

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
cd world-cup-history
http-server -p 8000
```
Then open http://localhost:8000 in your browser.

### Option 5: Using PHP Built-in Server

```bash
cd world-cup-history
php -S localhost:8000
```
Then open http://localhost:8000 in your browser.

## Data Structure

The World Cup data is stored in `data/worldcup-data.js` and includes:

```javascript
{
  year: 2022,
  host: "Qatar",
  winner: "Argentina",
  runnerUp: "France",
  thirdPlace: "Croatia",
  fourthPlace: "Morocco",
  goldenBoot: { player: "Kylian Mbappé", country: "France", goals: 8 },
  goldenBall: { player: "Lionel Messi", country: "Argentina" },
  goldenGlove: { player: "Emiliano Martínez", country: "Argentina" },
  bestYoungPlayer: { player: "Enzo Fernández", country: "Argentina" },
  totalGoals: 172,
  totalMatches: 64,
  teams: 32,
  finalScore: "3-3 (4-2 pen)",
  topScorers: [...]
}
```

## Customization

### Adding Future World Cups

Edit `data/worldcup-data.js` and add a new entry to the `worldCupData` array:

```javascript
{
  year: 2026,
  host: "USA / Canada / Mexico",
  winner: "TBD",
  // ... other fields
}
```

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
  --primary-color: #1a472a;      /* Main green color */
  --secondary-color: #c9a227;    /* Gold accent color */
  --accent-color: #8b0000;       /* Red accent */
  /* ... more variables */
}
```

### Adding New Statistics

1. Add data to `data/worldcup-data.js`
2. Update the rendering functions in `js/app.js`
3. Add corresponding HTML elements in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6+)**: DOM manipulation, Event handling
- **Google Fonts**: Poppins font family

## Deployment Options

### GitHub Pages

1. Create a GitHub repository
2. Push the project files
3. Go to Settings > Pages
4. Select the branch and folder
5. Your site will be live at `https://username.github.io/repository-name`

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `world-cup-history` folder
3. Your site is instantly deployed

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Traditional Web Hosting

Upload all files via FTP to your web hosting provider's public folder (usually `public_html` or `www`).

## Performance Optimization

The site is already optimized with:
- Minimal dependencies (no frameworks)
- CSS animations using transforms (GPU accelerated)
- Lazy loading animations with Intersection Observer
- Efficient DOM manipulation

For further optimization:
- Minify CSS and JS files
- Enable GZIP compression on your server
- Add caching headers

## License

This project is open source and available for personal and educational use.

## Data Sources

Historical data compiled from official FIFA records and archives.

---

Built with vanilla HTML, CSS, and JavaScript - no frameworks required!
