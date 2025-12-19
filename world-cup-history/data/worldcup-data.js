const worldCupData = [
  {
    year: 1930,
    host: "Uruguay",
    winner: "Uruguay",
    runnerUp: "Argentina",
    thirdPlace: "USA",
    fourthPlace: "Yugoslavia",
    goldenBoot: { player: "Guillermo Stábile", country: "Argentina", goals: 8 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 70,
    totalMatches: 18,
    teams: 13,
    finalScore: "4-2",
    topScorers: [
      { player: "Guillermo Stábile", country: "Argentina", goals: 8 },
      { player: "Pedro Cea", country: "Uruguay", goals: 5 },
      { player: "Bert Patenaude", country: "USA", goals: 4 }
    ]
  },
  {
    year: 1934,
    host: "Italy",
    winner: "Italy",
    runnerUp: "Czechoslovakia",
    thirdPlace: "Germany",
    fourthPlace: "Austria",
    goldenBoot: { player: "Oldřich Nejedlý", country: "Czechoslovakia", goals: 5 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 70,
    totalMatches: 17,
    teams: 16,
    finalScore: "2-1 (aet)",
    topScorers: [
      { player: "Oldřich Nejedlý", country: "Czechoslovakia", goals: 5 },
      { player: "Edmund Conen", country: "Germany", goals: 4 },
      { player: "Angelo Schiavio", country: "Italy", goals: 4 }
    ]
  },
  {
    year: 1938,
    host: "France",
    winner: "Italy",
    runnerUp: "Hungary",
    thirdPlace: "Brazil",
    fourthPlace: "Sweden",
    goldenBoot: { player: "Leônidas", country: "Brazil", goals: 7 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 84,
    totalMatches: 18,
    teams: 15,
    finalScore: "4-2",
    topScorers: [
      { player: "Leônidas", country: "Brazil", goals: 7 },
      { player: "Gino Colaussi", country: "Italy", goals: 5 },
      { player: "György Sárosi", country: "Hungary", goals: 5 }
    ]
  },
  {
    year: 1950,
    host: "Brazil",
    winner: "Uruguay",
    runnerUp: "Brazil",
    thirdPlace: "Sweden",
    fourthPlace: "Spain",
    goldenBoot: { player: "Ademir", country: "Brazil", goals: 9 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 88,
    totalMatches: 22,
    teams: 13,
    finalScore: "2-1",
    topScorers: [
      { player: "Ademir", country: "Brazil", goals: 9 },
      { player: "Estanislao Basora", country: "Spain", goals: 5 },
      { player: "Oscar Míguez", country: "Uruguay", goals: 5 }
    ]
  },
  {
    year: 1954,
    host: "Switzerland",
    winner: "West Germany",
    runnerUp: "Hungary",
    thirdPlace: "Austria",
    fourthPlace: "Uruguay",
    goldenBoot: { player: "Sándor Kocsis", country: "Hungary", goals: 11 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 140,
    totalMatches: 26,
    teams: 16,
    finalScore: "3-2",
    topScorers: [
      { player: "Sándor Kocsis", country: "Hungary", goals: 11 },
      { player: "Max Morlock", country: "West Germany", goals: 6 },
      { player: "Erich Probst", country: "Austria", goals: 6 }
    ]
  },
  {
    year: 1958,
    host: "Sweden",
    winner: "Brazil",
    runnerUp: "Sweden",
    thirdPlace: "France",
    fourthPlace: "West Germany",
    goldenBoot: { player: "Just Fontaine", country: "France", goals: 13 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 126,
    totalMatches: 35,
    teams: 16,
    finalScore: "5-2",
    topScorers: [
      { player: "Just Fontaine", country: "France", goals: 13 },
      { player: "Pelé", country: "Brazil", goals: 6 },
      { player: "Helmut Rahn", country: "West Germany", goals: 6 }
    ]
  },
  {
    year: 1962,
    host: "Chile",
    winner: "Brazil",
    runnerUp: "Czechoslovakia",
    thirdPlace: "Chile",
    fourthPlace: "Yugoslavia",
    goldenBoot: { player: "Garrincha / Vavá / Leonel Sánchez / Flórián Albert / Valentin Ivanov / Dražan Jerković", country: "Various", goals: 4 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 89,
    totalMatches: 32,
    teams: 16,
    finalScore: "3-1",
    topScorers: [
      { player: "Garrincha", country: "Brazil", goals: 4 },
      { player: "Vavá", country: "Brazil", goals: 4 },
      { player: "Leonel Sánchez", country: "Chile", goals: 4 }
    ]
  },
  {
    year: 1966,
    host: "England",
    winner: "England",
    runnerUp: "West Germany",
    thirdPlace: "Portugal",
    fourthPlace: "Soviet Union",
    goldenBoot: { player: "Eusébio", country: "Portugal", goals: 9 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 89,
    totalMatches: 32,
    teams: 16,
    finalScore: "4-2 (aet)",
    topScorers: [
      { player: "Eusébio", country: "Portugal", goals: 9 },
      { player: "Helmut Haller", country: "West Germany", goals: 5 },
      { player: "Geoff Hurst", country: "England", goals: 4 }
    ]
  },
  {
    year: 1970,
    host: "Mexico",
    winner: "Brazil",
    runnerUp: "Italy",
    thirdPlace: "West Germany",
    fourthPlace: "Uruguay",
    goldenBoot: { player: "Gerd Müller", country: "West Germany", goals: 10 },
    goldenBall: null,
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 95,
    totalMatches: 32,
    teams: 16,
    finalScore: "4-1",
    topScorers: [
      { player: "Gerd Müller", country: "West Germany", goals: 10 },
      { player: "Jairzinho", country: "Brazil", goals: 7 },
      { player: "Teófilo Cubillas", country: "Peru", goals: 5 }
    ]
  },
  {
    year: 1974,
    host: "West Germany",
    winner: "West Germany",
    runnerUp: "Netherlands",
    thirdPlace: "Poland",
    fourthPlace: "Brazil",
    goldenBoot: { player: "Grzegorz Lato", country: "Poland", goals: 7 },
    goldenBall: { player: "Johan Cruyff", country: "Netherlands" },
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 97,
    totalMatches: 38,
    teams: 16,
    finalScore: "2-1",
    topScorers: [
      { player: "Grzegorz Lato", country: "Poland", goals: 7 },
      { player: "Johan Neeskens", country: "Netherlands", goals: 5 },
      { player: "Andrzej Szarmach", country: "Poland", goals: 5 }
    ]
  },
  {
    year: 1978,
    host: "Argentina",
    winner: "Argentina",
    runnerUp: "Netherlands",
    thirdPlace: "Brazil",
    fourthPlace: "Italy",
    goldenBoot: { player: "Mario Kempes", country: "Argentina", goals: 6 },
    goldenBall: { player: "Mario Kempes", country: "Argentina" },
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 102,
    totalMatches: 38,
    teams: 16,
    finalScore: "3-1 (aet)",
    topScorers: [
      { player: "Mario Kempes", country: "Argentina", goals: 6 },
      { player: "Teófilo Cubillas", country: "Peru", goals: 5 },
      { player: "Rob Rensenbrink", country: "Netherlands", goals: 5 }
    ]
  },
  {
    year: 1982,
    host: "Spain",
    winner: "Italy",
    runnerUp: "West Germany",
    thirdPlace: "Poland",
    fourthPlace: "France",
    goldenBoot: { player: "Paolo Rossi", country: "Italy", goals: 6 },
    goldenBall: { player: "Paolo Rossi", country: "Italy" },
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 146,
    totalMatches: 52,
    teams: 24,
    finalScore: "3-1",
    topScorers: [
      { player: "Paolo Rossi", country: "Italy", goals: 6 },
      { player: "Karl-Heinz Rummenigge", country: "West Germany", goals: 5 },
      { player: "Zbigniew Boniek", country: "Poland", goals: 4 }
    ]
  },
  {
    year: 1986,
    host: "Mexico",
    winner: "Argentina",
    runnerUp: "West Germany",
    thirdPlace: "France",
    fourthPlace: "Belgium",
    goldenBoot: { player: "Gary Lineker", country: "England", goals: 6 },
    goldenBall: { player: "Diego Maradona", country: "Argentina" },
    goldenGlove: null,
    bestYoungPlayer: null,
    totalGoals: 132,
    totalMatches: 52,
    teams: 24,
    finalScore: "3-2",
    topScorers: [
      { player: "Gary Lineker", country: "England", goals: 6 },
      { player: "Diego Maradona", country: "Argentina", goals: 5 },
      { player: "Careca", country: "Brazil", goals: 5 }
    ]
  },
  {
    year: 1990,
    host: "Italy",
    winner: "West Germany",
    runnerUp: "Argentina",
    thirdPlace: "Italy",
    fourthPlace: "England",
    goldenBoot: { player: "Salvatore Schillaci", country: "Italy", goals: 6 },
    goldenBall: { player: "Salvatore Schillaci", country: "Italy" },
    goldenGlove: { player: "Sergio Goycochea", country: "Argentina" },
    bestYoungPlayer: null,
    totalGoals: 115,
    totalMatches: 52,
    teams: 24,
    finalScore: "1-0",
    topScorers: [
      { player: "Salvatore Schillaci", country: "Italy", goals: 6 },
      { player: "Tomáš Skuhravý", country: "Czechoslovakia", goals: 5 },
      { player: "Roger Milla", country: "Cameroon", goals: 4 }
    ]
  },
  {
    year: 1994,
    host: "USA",
    winner: "Brazil",
    runnerUp: "Italy",
    thirdPlace: "Sweden",
    fourthPlace: "Bulgaria",
    goldenBoot: { player: "Oleg Salenko / Hristo Stoichkov", country: "Russia / Bulgaria", goals: 6 },
    goldenBall: { player: "Romário", country: "Brazil" },
    goldenGlove: { player: "Michel Preud'homme", country: "Belgium" },
    bestYoungPlayer: null,
    totalGoals: 141,
    totalMatches: 52,
    teams: 24,
    finalScore: "0-0 (3-2 pen)",
    topScorers: [
      { player: "Oleg Salenko", country: "Russia", goals: 6 },
      { player: "Hristo Stoichkov", country: "Bulgaria", goals: 6 },
      { player: "Romário", country: "Brazil", goals: 5 }
    ]
  },
  {
    year: 1998,
    host: "France",
    winner: "France",
    runnerUp: "Brazil",
    thirdPlace: "Croatia",
    fourthPlace: "Netherlands",
    goldenBoot: { player: "Davor Šuker", country: "Croatia", goals: 6 },
    goldenBall: { player: "Ronaldo", country: "Brazil" },
    goldenGlove: { player: "Fabien Barthez", country: "France" },
    bestYoungPlayer: { player: "Michael Owen", country: "England" },
    totalGoals: 171,
    totalMatches: 64,
    teams: 32,
    finalScore: "3-0",
    topScorers: [
      { player: "Davor Šuker", country: "Croatia", goals: 6 },
      { player: "Gabriel Batistuta", country: "Argentina", goals: 5 },
      { player: "Christian Vieri", country: "Italy", goals: 5 }
    ]
  },
  {
    year: 2002,
    host: "South Korea / Japan",
    winner: "Brazil",
    runnerUp: "Germany",
    thirdPlace: "Turkey",
    fourthPlace: "South Korea",
    goldenBoot: { player: "Ronaldo", country: "Brazil", goals: 8 },
    goldenBall: { player: "Oliver Kahn", country: "Germany" },
    goldenGlove: { player: "Oliver Kahn", country: "Germany" },
    bestYoungPlayer: { player: "Landon Donovan", country: "USA" },
    totalGoals: 161,
    totalMatches: 64,
    teams: 32,
    finalScore: "2-0",
    topScorers: [
      { player: "Ronaldo", country: "Brazil", goals: 8 },
      { player: "Rivaldo", country: "Brazil", goals: 5 },
      { player: "Miroslav Klose", country: "Germany", goals: 5 }
    ]
  },
  {
    year: 2006,
    host: "Germany",
    winner: "Italy",
    runnerUp: "France",
    thirdPlace: "Germany",
    fourthPlace: "Portugal",
    goldenBoot: { player: "Miroslav Klose", country: "Germany", goals: 5 },
    goldenBall: { player: "Zinedine Zidane", country: "France" },
    goldenGlove: { player: "Gianluigi Buffon", country: "Italy" },
    bestYoungPlayer: { player: "Lukas Podolski", country: "Germany" },
    totalGoals: 147,
    totalMatches: 64,
    teams: 32,
    finalScore: "1-1 (5-3 pen)",
    topScorers: [
      { player: "Miroslav Klose", country: "Germany", goals: 5 },
      { player: "Hernán Crespo", country: "Argentina", goals: 3 },
      { player: "Thierry Henry", country: "France", goals: 3 }
    ]
  },
  {
    year: 2010,
    host: "South Africa",
    winner: "Spain",
    runnerUp: "Netherlands",
    thirdPlace: "Germany",
    fourthPlace: "Uruguay",
    goldenBoot: { player: "Thomas Müller", country: "Germany", goals: 5 },
    goldenBall: { player: "Diego Forlán", country: "Uruguay" },
    goldenGlove: { player: "Iker Casillas", country: "Spain" },
    bestYoungPlayer: { player: "Thomas Müller", country: "Germany" },
    totalGoals: 145,
    totalMatches: 64,
    teams: 32,
    finalScore: "1-0 (aet)",
    topScorers: [
      { player: "Thomas Müller", country: "Germany", goals: 5 },
      { player: "David Villa", country: "Spain", goals: 5 },
      { player: "Wesley Sneijder", country: "Netherlands", goals: 5 }
    ]
  },
  {
    year: 2014,
    host: "Brazil",
    winner: "Germany",
    runnerUp: "Argentina",
    thirdPlace: "Netherlands",
    fourthPlace: "Brazil",
    goldenBoot: { player: "James Rodríguez", country: "Colombia", goals: 6 },
    goldenBall: { player: "Lionel Messi", country: "Argentina" },
    goldenGlove: { player: "Manuel Neuer", country: "Germany" },
    bestYoungPlayer: { player: "Paul Pogba", country: "France" },
    totalGoals: 171,
    totalMatches: 64,
    teams: 32,
    finalScore: "1-0 (aet)",
    topScorers: [
      { player: "James Rodríguez", country: "Colombia", goals: 6 },
      { player: "Thomas Müller", country: "Germany", goals: 5 },
      { player: "Neymar", country: "Brazil", goals: 4 }
    ]
  },
  {
    year: 2018,
    host: "Russia",
    winner: "France",
    runnerUp: "Croatia",
    thirdPlace: "Belgium",
    fourthPlace: "England",
    goldenBoot: { player: "Harry Kane", country: "England", goals: 6 },
    goldenBall: { player: "Luka Modrić", country: "Croatia" },
    goldenGlove: { player: "Thibaut Courtois", country: "Belgium" },
    bestYoungPlayer: { player: "Kylian Mbappé", country: "France" },
    totalGoals: 169,
    totalMatches: 64,
    teams: 32,
    finalScore: "4-2",
    topScorers: [
      { player: "Harry Kane", country: "England", goals: 6 },
      { player: "Antoine Griezmann", country: "France", goals: 4 },
      { player: "Romelu Lukaku", country: "Belgium", goals: 4 }
    ]
  },
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
    topScorers: [
      { player: "Kylian Mbappé", country: "France", goals: 8 },
      { player: "Lionel Messi", country: "Argentina", goals: 7 },
      { player: "Olivier Giroud", country: "France", goals: 4 }
    ]
  }
];

// Country statistics
const countryStats = {
  "Brazil": { wins: 5, finals: 7, years: [1958, 1962, 1970, 1994, 2002] },
  "Germany": { wins: 4, finals: 8, years: [1954, 1974, 1990, 2014], note: "Includes West Germany" },
  "Italy": { wins: 4, finals: 6, years: [1934, 1938, 1982, 2006] },
  "Argentina": { wins: 3, finals: 6, years: [1978, 1986, 2022] },
  "France": { wins: 2, finals: 3, years: [1998, 2018] },
  "Uruguay": { wins: 2, finals: 2, years: [1930, 1950] },
  "England": { wins: 1, finals: 1, years: [1966] },
  "Spain": { wins: 1, finals: 1, years: [2010] }
};

// All-time top scorers in World Cup history
const allTimeTopScorers = [
  { player: "Miroslav Klose", country: "Germany", goals: 16, tournaments: "2002-2014" },
  { player: "Ronaldo", country: "Brazil", goals: 15, tournaments: "1998-2006" },
  { player: "Gerd Müller", country: "Germany", goals: 14, tournaments: "1970-1974" },
  { player: "Just Fontaine", country: "France", goals: 13, tournaments: "1958" },
  { player: "Pelé", country: "Brazil", goals: 12, tournaments: "1958-1970" },
  { player: "Kylian Mbappé", country: "France", goals: 12, tournaments: "2018-2022" },
  { player: "Lionel Messi", country: "Argentina", goals: 13, tournaments: "2006-2022" },
  { player: "Sándor Kocsis", country: "Hungary", goals: 11, tournaments: "1954" },
  { player: "Jürgen Klinsmann", country: "Germany", goals: 11, tournaments: "1990-1998" },
  { player: "Helmut Rahn", country: "Germany", goals: 10, tournaments: "1954-1958" }
];

// Fun facts
const worldCupFacts = [
  "Brazil is the only country to have played in every World Cup tournament.",
  "The fastest goal in World Cup history was scored by Hakan Şükür of Turkey in 11 seconds (2002).",
  "The 2022 Qatar World Cup was the first to be held in the Middle East and in November-December.",
  "Just Fontaine's 13 goals in a single World Cup (1958) remains an unbroken record.",
  "Germany's 7-1 victory over Brazil in 2014 was Brazil's worst ever World Cup defeat.",
  "The 1950 World Cup had no official final - it used a final round-robin format.",
  "Pelé is the only player to have won three World Cups (1958, 1962, 1970).",
  "The 2022 final between Argentina and France is considered one of the greatest finals ever played.",
  "Roger Milla became the oldest World Cup goalscorer at 42 years old in 1994.",
  "The iconic World Cup trophy was redesigned in 1974 after Brazil won it permanently."
];
