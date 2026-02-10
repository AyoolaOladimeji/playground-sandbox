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
    {
      id: "p1",
      name: "Samuel Adeyemi",
      number: 1,
      position: "Goalkeeper",
      nationality: "Nigerian",
      dob: "1995-03-15",
      height: 188,
      weight: 82,
      foot: "Right",
      appearances: 45,
      goals: 0,
      assists: 1,
      bio: "A commanding presence between the posts, Samuel has been our first-choice goalkeeper for three seasons. Known for his incredible reflexes and vocal leadership from the back.",
      photo: ""
    },
    {
      id: "p2",
      name: "James Okonkwo",
      number: 4,
      position: "Defender",
      nationality: "Nigerian",
      dob: "1997-08-22",
      height: 185,
      weight: 80,
      foot: "Right",
      appearances: 52,
      goals: 3,
      assists: 5,
      bio: "A rock-solid center back with excellent reading of the game. James is the captain and heart of our defense.",
      photo: ""
    },
    {
      id: "p3",
      name: "Daniel Mensah",
      number: 5,
      position: "Defender",
      nationality: "Ghanaian",
      dob: "1998-01-10",
      height: 183,
      weight: 78,
      foot: "Left",
      appearances: 40,
      goals: 2,
      assists: 8,
      bio: "An athletic left-back who loves getting forward. Daniel's pace and crossing ability make him a constant threat down the flank.",
      photo: ""
    },
    {
      id: "p4",
      name: "Michael Torres",
      number: 3,
      position: "Defender",
      nationality: "Colombian",
      dob: "1996-06-05",
      height: 182,
      weight: 79,
      foot: "Right",
      appearances: 38,
      goals: 1,
      assists: 3,
      bio: "A versatile defender comfortable at both center-back and right-back. Michael brings South American flair to our backline.",
      photo: ""
    },
    {
      id: "p5",
      name: "Ahmed Hassan",
      number: 6,
      position: "Midfielder",
      nationality: "Egyptian",
      dob: "1999-04-18",
      height: 176,
      weight: 72,
      foot: "Both",
      appearances: 48,
      goals: 5,
      assists: 12,
      bio: "The engine of our midfield. Ahmed covers every blade of grass and his passing range is second to none in the team.",
      photo: ""
    },
    {
      id: "p6",
      name: "David Okafor",
      number: 10,
      position: "Midfielder",
      nationality: "Nigerian",
      dob: "1998-11-30",
      height: 178,
      weight: 73,
      foot: "Right",
      appearances: 50,
      goals: 15,
      assists: 20,
      bio: "Our creative maestro and playmaker. David's vision, technique, and ability to unlock defenses make him the most valuable player in our squad.",
      photo: "",
      featured: true
    },
    {
      id: "p7",
      name: "Ryan Williams",
      number: 8,
      position: "Midfielder",
      nationality: "British",
      dob: "1997-09-12",
      height: 180,
      weight: 76,
      foot: "Right",
      appearances: 42,
      goals: 8,
      assists: 6,
      bio: "A box-to-box midfielder with an eye for goal. Ryan's energy and determination set the tempo for the entire team.",
      photo: ""
    },
    {
      id: "p8",
      name: "Carlos Silva",
      number: 7,
      position: "Forward",
      nationality: "Brazilian",
      dob: "2000-02-28",
      height: 175,
      weight: 70,
      foot: "Left",
      appearances: 35,
      goals: 18,
      assists: 7,
      bio: "A tricky winger with blistering pace and devastating skill moves. Carlos terrorizes defenders with his direct running style.",
      photo: "",
      featured: true
    },
    {
      id: "p9",
      name: "Marcus Johnson",
      number: 9,
      position: "Forward",
      nationality: "American",
      dob: "1999-07-04",
      height: 184,
      weight: 81,
      foot: "Right",
      appearances: 30,
      goals: 22,
      assists: 4,
      bio: "Our deadly number 9. Marcus is a natural goalscorer with incredible positioning and finishing ability. A constant nightmare for opposing defenders.",
      photo: "",
      featured: true
    },
    {
      id: "p10",
      name: "Kwame Asante",
      number: 11,
      position: "Forward",
      nationality: "Ghanaian",
      dob: "2001-05-20",
      height: 177,
      weight: 71,
      foot: "Right",
      appearances: 28,
      goals: 12,
      assists: 9,
      bio: "A young and exciting talent with incredible potential. Kwame's speed and creativity on the right wing have earned him rave reviews.",
      photo: "",
      featured: true
    },
    {
      id: "p11",
      name: "Ibrahim Diallo",
      number: 14,
      position: "Midfielder",
      nationality: "Senegalese",
      dob: "1998-12-03",
      height: 181,
      weight: 75,
      foot: "Right",
      appearances: 32,
      goals: 2,
      assists: 4,
      bio: "A tough-tackling defensive midfielder who shields the back four with authority. Ibrahim reads the game superbly.",
      photo: ""
    },
    {
      id: "p12",
      name: "Luis Fernandez",
      number: 2,
      position: "Defender",
      nationality: "Spanish",
      dob: "1996-10-15",
      height: 179,
      weight: 74,
      foot: "Right",
      appearances: 44,
      goals: 1,
      assists: 10,
      bio: "An experienced right-back with a cultured left foot. Luis brings composure and experience to the defense.",
      photo: ""
    },
    {
      id: "p13",
      name: "Peter Okechukwu",
      number: 25,
      position: "Goalkeeper",
      nationality: "Nigerian",
      dob: "2002-08-08",
      height: 190,
      weight: 85,
      foot: "Right",
      appearances: 8,
      goals: 0,
      assists: 0,
      bio: "A promising young goalkeeper with great shot-stopping ability. Peter is developing rapidly as our second-choice keeper.",
      photo: ""
    }
  ],

  fixtures: [
    { id: "f1", opponent: "Eagle FC", date: "2026-02-15", time: "15:00", venue: "Classic XI Pro Stadium", competition: "Regional League", status: "upcoming" },
    { id: "f2", opponent: "Thunder United", date: "2026-02-22", time: "16:30", venue: "Thunder Arena", competition: "Regional League", status: "upcoming" },
    { id: "f3", opponent: "Phoenix FC", date: "2026-03-01", time: "15:00", venue: "Classic XI Pro Stadium", competition: "Cup Quarter-Final", status: "upcoming" },
    { id: "f4", opponent: "Royal Stars", date: "2026-03-08", time: "14:00", venue: "Stars Stadium", competition: "Regional League", status: "upcoming" },
    { id: "f5", opponent: "Victory FC", date: "2026-01-25", time: "15:00", venue: "Classic XI Pro Stadium", competition: "Regional League", homeScore: 3, awayScore: 1, status: "completed" },
    { id: "f6", opponent: "Dynamo City", date: "2026-01-18", time: "16:00", venue: "Dynamo Park", competition: "Regional League", homeScore: 2, awayScore: 2, status: "completed" },
    { id: "f7", opponent: "Storm FC", date: "2026-01-11", time: "15:00", venue: "Classic XI Pro Stadium", competition: "Cup Round 3", homeScore: 4, awayScore: 0, status: "completed" },
    { id: "f8", opponent: "Falcon Athletic", date: "2026-01-04", time: "14:30", venue: "Falcon Nest", competition: "Regional League", homeScore: 1, awayScore: 2, status: "completed" },
    { id: "f9", opponent: "United Warriors", date: "2025-12-28", time: "15:00", venue: "Classic XI Pro Stadium", competition: "Regional League", homeScore: 5, awayScore: 0, status: "completed" },
    { id: "f10", opponent: "Metro FC", date: "2025-12-21", time: "16:00", venue: "Metro Stadium", competition: "Regional League", homeScore: 2, awayScore: 1, status: "completed" }
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

// Data access functions (works with both Firebase and demo data)
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
  // Demo mode: add to local array
  const id = 'demo_' + Date.now();
  const newItem = { id, ...data };
  if (DEMO_DATA[collection]) {
    DEMO_DATA[collection].push(newItem);
  }
  return Promise.resolve(newItem);
}

function updateData(collection, id, data) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).doc(id).update(data);
  }
  // Demo mode: update local array
  if (DEMO_DATA[collection]) {
    const index = DEMO_DATA[collection].findIndex(item => item.id === id);
    if (index > -1) {
      DEMO_DATA[collection][index] = { ...DEMO_DATA[collection][index], ...data };
    }
  }
  return Promise.resolve();
}

function deleteData(collection, id) {
  if (isFirebaseReady()) {
    return firebaseDb.collection(collection).doc(id).delete();
  }
  // Demo mode: remove from local array
  if (DEMO_DATA[collection]) {
    DEMO_DATA[collection] = DEMO_DATA[collection].filter(item => item.id !== id);
  }
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
