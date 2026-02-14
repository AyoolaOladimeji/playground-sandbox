/* ============================================
   Firebase Configuration
   Replace with your Firebase project credentials
   ============================================ */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase state
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseStorage = null;
let firebaseReady = false;

// Initialize Firebase (only if configured)
function initFirebase() {
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.log("Firebase not configured. Running in demo mode with sample data.");
    console.log("To enable Firebase, update the config in js/firebase-config.js");
    return false;
  }

  try {
    // Firebase SDK loaded via CDN in HTML
    if (typeof firebase !== 'undefined') {
      firebaseApp = firebase.initializeApp(firebaseConfig);
      firebaseAuth = firebase.auth();
      firebaseDb = firebase.firestore();
      firebaseStorage = firebase.storage();
      firebaseReady = true;
      console.log("Firebase initialized successfully");
      return true;
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
  return false;
}

// Check if Firebase is available
function isFirebaseReady() {
  return firebaseReady;
}

// ============================================
// DEMO DATA (used when Firebase is not configured)
// ============================================

const DEMO_DATA = {
  players: [
    { id: "p1", name: "Papi", number: 0, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p2", name: "Bobinho", number: 1, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p3", name: "Don P", number: 2, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p4", name: "SOJ", number: 3, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p5", name: "HHFK", number: 4, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p6", name: "Tula", number: 5, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p7", name: "Gabriel", number: 6, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p8", name: "Enchy", number: 7, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p9", name: "Niyi", number: 8, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p10", name: "Obyno", number: 9, position: "Forward", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p11", name: "BaldRalph", number: 10, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "", featured: true },
    { id: "p12", name: "VgBc", number: 11, position: "Forward", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p13", name: "Oladimeji", number: 12, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "", featured: true },
    { id: "p14", name: "Frank", number: 13, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p15", name: "Dayo", number: 14, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p16", name: "Big Mike", number: 15, position: "Forward", appearances: 0, goals: 0, assists: 0, bio: "", photo: "", featured: true },
    { id: "p17", name: "Ajiboy", number: 16, position: "Goalkeeper", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p18", name: "Olusoji", number: 17, position: "Defender", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p19", name: "Oluwasegun", number: 19, position: "Forward", appearances: 0, goals: 0, assists: 0, bio: "", photo: "" },
    { id: "p20", name: "John C.", number: 20, position: "Midfielder", appearances: 0, goals: 0, assists: 0, bio: "", photo: "", featured: true }
  ],

  fixtures: [
    { id: "f1", opponent: "SA New Team 40", date: "2026-02-15", time: "16:00", venue: "Harold Patterson Sports Complex HP 19", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f2", opponent: "Leones FC 40", date: "2026-02-22", time: "16:00", venue: "Harold Patterson Sports Complex HP 18", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f3", opponent: "Internacional 40", date: "2026-03-01", time: "16:00", venue: "Harold Patterson Sports Complex HP 03", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f4", opponent: "Guadalajara FC 40", date: "2026-03-08", time: "14:00", venue: "Harold Patterson Sports Complex HP 02", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f5", opponent: "Viet Club 40", date: "2026-03-15", time: "16:00", venue: "Harold Patterson Sports Complex HP 02", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f6", opponent: "Leones FC 40", date: "2026-03-22", time: "16:00", venue: "Harold Patterson Sports Complex HP 19", competition: "Arlington U40 League", status: "upcoming" },
    { id: "f7", opponent: "Internacional 40", date: "2026-03-29", time: "16:00", venue: "Harold Patterson Sports Complex HP 23", competition: "Arlington U40 League", status: "upcoming" }
  ],

  gallery: [
    { id: "g1", caption: "Team Celebration - Cup Victory", category: "Match Day", date: "2026-01-25" },
    { id: "g2", caption: "Pre-season Training Camp", category: "Training", date: "2025-12-01" },
    { id: "g3", caption: "Annual Team Photo 2026", category: "Team Photos", date: "2026-01-01" },
    { id: "g4", caption: "Captain Lifting the Trophy", category: "Events", date: "2026-01-25" },
    { id: "g5", caption: "Matchday Warmup vs Victory FC", category: "Match Day", date: "2026-01-25" },
    { id: "g6", caption: "Youth Academy Graduation", category: "Events", date: "2025-11-15" },
    { id: "g7", caption: "Skills Training Session", category: "Training", date: "2025-12-10" },
    { id: "g8", caption: "Fan Meet & Greet", category: "Events", date: "2025-12-20" },
    { id: "g9", caption: "Goal Celebration vs Storm FC", category: "Match Day", date: "2026-01-11" }
  ],

  videos: [
    { id: "v1", title: "Classic XI Pro vs Victory FC - Highlights", youtubeId: "dQw4w9WgXcQ", category: "Highlights", duration: "8:45", date: "2026-01-25" },
    { id: "v2", title: "Storm FC 0-4 Classic XI Pro - Full Highlights", youtubeId: "dQw4w9WgXcQ", category: "Highlights", duration: "12:30", date: "2026-01-11" },
    { id: "v3", title: "Pre-Season Training Day 1", youtubeId: "dQw4w9WgXcQ", category: "Training", duration: "5:20", date: "2025-12-01" },
    { id: "v4", title: "Marcus Johnson - All Goals This Season", youtubeId: "dQw4w9WgXcQ", category: "Highlights", duration: "15:40", date: "2026-01-30" },
    { id: "v5", title: "Post-Match Interview: Captain Okonkwo", youtubeId: "dQw4w9WgXcQ", category: "Interview", duration: "6:15", date: "2026-01-25" },
    { id: "v6", title: "Classic XI Pro vs Metro FC - Full Match", youtubeId: "dQw4w9WgXcQ", category: "Full Match", duration: "90:00", date: "2025-12-21" }
  ],

  news: [
    { id: "n1", title: "Classic XI Pro wins the Regional Cup Final 3-1!", icon: "fas fa-trophy", date: "2026-01-25" },
    { id: "n2", title: "New signing: Marcus Johnson joins from City United", icon: "fas fa-star", date: "2026-01-15" },
    { id: "n3", title: "Player of the Month: David Okafor - 5 goals in 3 matches", icon: "fas fa-medal", date: "2026-01-31" },
    { id: "n4", title: "Youth Academy open trials announced for March", icon: "fas fa-users", date: "2026-02-01" },
    { id: "n5", title: "New partnership announced with SportTech Global", icon: "fas fa-handshake", date: "2026-02-05" }
  ],

  sponsors: [
    { id: "s1", name: "SportTech Global", tier: "platinum", url: "#" },
    { id: "s2", name: "Elite Fitness", tier: "platinum", url: "#" },
    { id: "s3", name: "ProKit Sports", tier: "gold", url: "#" },
    { id: "s4", name: "City Motors", tier: "gold", url: "#" },
    { id: "s5", name: "Fresh Foods Co.", tier: "gold", url: "#" },
    { id: "s6", name: "Swift Logistics", tier: "silver", url: "#" },
    { id: "s7", name: "TechHub Solutions", tier: "silver", url: "#" },
    { id: "s8", name: "Green Energy Ltd", tier: "silver", url: "#" },
    { id: "s9", name: "Metro Bank", tier: "silver", url: "#" }
  ]
};

// ============================================
// LocalStorage persistence for demo mode
// ============================================
const STORAGE_KEY = 'classicxi_data';

function loadPersistedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge saved data into DEMO_DATA
      Object.keys(parsed).forEach(key => {
        if (DEMO_DATA[key] !== undefined) {
          DEMO_DATA[key] = parsed[key];
        }
      });
    }
  } catch (e) {
    console.log('Could not load persisted data:', e);
  }
}

function persistData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DATA));
  } catch (e) {
    console.log('Could not persist data:', e);
  }
}

// Load any previously saved data on startup
loadPersistedData();

// ============================================
// Data access functions (works with both Firebase and demo data)
// ============================================
function getData(collection) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).get()
      .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }
  return Promise.resolve(DEMO_DATA[collection] || []);
}

function addData(collection, data) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(docRef => ({ id: docRef.id, ...data }));
  }
  // Demo mode: add to local array and persist
  const id = 'demo_' + Date.now();
  const newItem = { id, ...data };
  if (DEMO_DATA[collection]) {
    DEMO_DATA[collection].push(newItem);
  }
  persistData();
  return Promise.resolve(newItem);
}

function updateData(collection, id, data) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).doc(id).update(data);
  }
  // Demo mode: update local array and persist
  if (DEMO_DATA[collection]) {
    const index = DEMO_DATA[collection].findIndex(item => item.id === id);
    if (index > -1) {
      DEMO_DATA[collection][index] = { ...DEMO_DATA[collection][index], ...data };
    }
  }
  persistData();
  return Promise.resolve();
}

function deleteData(collection, id) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).doc(id).delete();
  }
  // Demo mode: remove from local array and persist
  if (DEMO_DATA[collection]) {
    DEMO_DATA[collection] = DEMO_DATA[collection].filter(item => item.id !== id);
  }
  persistData();
  return Promise.resolve();
}

function uploadFile(path, file) {
  if (isFirebaseReady()) {
    const ref = firebaseStorage.ref(path);
    return ref.put(file).then(snapshot => snapshot.ref.getDownloadURL());
  }
  // Demo mode: return a data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

// Initialize on load
initFirebase();
