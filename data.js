// All trip content lives here. Edit text in this file to change the app.
// Writing rule: no em dash characters anywhere.

window.DAYS = [
  {
    id: "fri", date: "2026-11-06", tab: "Fri", title: "Friday 6 November", subtitle: "Città Bassa",
    stops: [
      { t: "07:30", name: "Leave Zagreb", icon: "car" },
      { t: "14:45", name: "Arrive and park", note: "Our garage.", icon: "parking" },
      { t: "15:00", name: "Check in and rest", note: "Head out at 16:30.", icon: "bed" },
      { t: "16:30", name: "Piazza Pontida and lower Via Sant'Alessandro",
        note: "Boutiques and cheese shops. Look for Strachitunt, Formai de Mut and Branzi.",
        photos: ["pontida", "santalessandro"], map: "Piazza Pontida, Bergamo" },
      { t: "16:50", name: "Via XX Settembre", note: "Mostly chains.", photos: ["xxsettembre"],
        map: "Via XX Settembre, Bergamo" },
      { t: "17:05", name: "Via Sant'Orsola", note: "KI Concept (no. 11/B), Rock'n'rose, Hosio.", icon: "bag",
        map: "Via Sant'Orsola, Bergamo" },
      { t: "17:25", name: "Via Borfuro", note: "M'Gibi.", icon: "bag", map: "Via Borfuro, Bergamo" },
      { t: "17:35", name: "Piazza Dante", note: "Tiziana Fausti, The F1rst.", photos: ["dante"],
        map: "Piazza Dante, Bergamo" },
      { t: "17:50", name: "Sentierone arcades",
        note: "Li-Mon Concept Store (no. 46). Buy a torta Donizetti at Balzer.", photos: ["sentierone"],
        map: "Sentierone, Bergamo" },
      { t: "18:10", name: "Piazza Matteotti to Porta Nuova",
        note: "Teatro Donizetti, the Quadriportico, Piazza Vittorio Veneto and the Torre dei Caduti, Porta Nuova.",
        photos: ["teatro", "matteotti", "vveneto", "torre", "porta_nuova"], map: "Teatro Donizetti, Piazza Cavour 15, Bergamo" },
      { t: "18:30", name: "Aperitivo", note: "Balzer or Barrier.", icon: "glass", map: "Caffè Balzer, Sentierone, Bergamo" },
      { t: "19:00", name: "Dinner (we book)", note: "Da Giuliana, Dal Carlo or Osteria al GiGianca. See Eat.", icon: "food", link: "#eat" }
    ]
  },
  {
    id: "sat", date: "2026-11-07", tab: "Sat", title: "Saturday 7 November", subtitle: "Città Alta (rain plan)",
    stops: [
      { t: "08:30", name: "Funicular up", note: "From the lower station on Viale Vittorio Emanuele II. ATB ticket.",
        photos: ["funicolare"], map: "Funicolare Città Alta, Viale Vittorio Emanuele II, Bergamo" },
      { t: "08:45", name: "Piazza Vecchia", photos: ["piazza_vecchia"], map: "Piazza Vecchia, Bergamo" },
      { t: "09:00", name: "Cathedral and Baptistery", note: "Piazza Duomo.", photos: ["duomo", "battistero"],
        map: "Duomo di Bergamo, Piazza Duomo, Bergamo" },
      { t: "09:30", name: "Cappella Colleoni", photos: ["colleoni"], map: "Cappella Colleoni, Piazza Duomo, Bergamo" },
      { t: "10:00", name: "Basilica di Santa Maria Maggiore", photos: ["smm"],
        map: "Basilica di Santa Maria Maggiore, Piazza Duomo, Bergamo" },
      { t: "10:40", name: "Tempietto di Santa Croce and the old Bishop's Palace", photos: ["santa_croce"],
        map: "Tempietto di Santa Croce, Bergamo" },
      { t: "11:00", name: "Museo Donizettiano", note: "Via Arena 9.", check: "Check, hours not confirmed.",
        icon: "music", map: "Museo Donizettiano, Via Arena 9, Bergamo" },
      { t: "11:30", name: "Campanone and Palazzo del Podestà", note: "Saturday 10:00 to 19:00, €9.",
        photos: ["campanone"], map: "Campanone, Piazza Vecchia, Bergamo" },
      { t: "12:15", name: "Via Gombito and Via Colleoni",
        note: "Tiziana Fausti Glam (Via Colleoni 3), Serafino (Via Colleoni 32a). Stracciatella gelato at La Marianna, Largo Colle Aperto.",
        photos: ["gombito"], map: "Via Gombito, Bergamo" },
      { t: "12:45", name: "Lunch at Antica Trattoria La Colombina",
        note: "Via Borgo Canale 12. We book.", tel: "035 261402", icon: "food",
        map: "Antica Trattoria La Colombina, Via Borgo Canale 12, Bergamo" },
      { t: "14:00", name: "Venetian walls",
        note: "Porta Sant'Alessandro, along the walls past Porta San Giacomo to Porta Sant'Agostino.",
        photos: ["mura", "porta_sagostino"], map: "Porta Sant'Alessandro, Bergamo" },
      { t: "14:30", name: "Option 1: Palazzo Moroni", note: "Via Porta Dipinta 12. Wed to Sun 10:00 to 18:00, last entry 17:00.",
        photos: ["moroni"], map: "Palazzo Moroni, Via Porta Dipinta 12, Bergamo" },
      { t: "15:30", name: "Walk down Via Pignolo", note: "Antiques, galleries.", icon: "walk",
        map: "Via Pignolo, Bergamo" },
      { t: "15:50", name: "Option 2: GAMeC", note: "Via San Tomaso 53. Weekends 10:00 to 19:00, €7.",
        photos: ["gamec"], map: "GAMeC, Via San Tomaso 53, Bergamo" },
      { t: "17:15", name: "Hotel", note: "Rest until 18:45.", icon: "bed" },
      { t: "19:00", name: "Dinner (we book)", note: "See Eat.", icon: "food", link: "#eat" }
    ]
  },
  {
    id: "sunA", date: "2026-11-08", tab: "Sun A", title: "Sunday 8 November, Version A", subtitle: "With EICMA",
    stops: [
      { t: "08:00", name: "Check out, get the car", icon: "bed" },
      { t: "08:30", name: "Drive towards Milan on the A4", icon: "car" },
      { t: "09:15", name: "Parking option 1 (free)",
        note: "ATM metro car park Molino Dorino (or Lampugnano if full), booked free with the EICMA tickets in the North-West zone. Red M1 line to Rho Fieramilano; tap a bank card at the gate. Adds about 20 to 30 minutes.",
        photos: ["fiera"], map: "Parcheggio Molino Dorino, Milano",
        url: "https://ticketseicma.it/en/28171-eicma2/p-979-eicma-parking/", urlLabel: "Book parking" },
      { t: "09:15", name: "Parking option 2 (paid)",
        note: "Park at the fair. Exit Pero-Fiera Milano on the A4. About €14.50 to 20 a day.", icon: "parking",
        map: "Fiera Milano, Rho" },
      { t: "09:30", name: "EICMA, Fiera Milano Rho", note: "09:30 to 12:30. Tickets €20 + €1.50 online.",
        icon: "moto", map: "Fiera Milano, Strada Statale del Sempione 28, Rho",
        url: "https://www.eicma.it", urlLabel: "EICMA site" },
      { t: "12:30", name: "Eat at the fair, then drive home", note: "Coffee stop on the motorway.", icon: "car" },
      { t: "19:30", name: "Zagreb", note: "About 20 minutes later with parking option 1.", icon: "home" }
    ]
  },
  {
    id: "sunB", date: "2026-11-08", tab: "Sun B", title: "Sunday 8 November, Version B", subtitle: "Without EICMA",
    stops: [
      { t: "09:30", name: "Check out", note: "The car stays in the garage.", icon: "bed" },
      { t: "10:00", name: "Donizetti's birthplace", note: "Via Borgo Canale 14. Sundays only, 10:00 to 13:00 and 14:00 to 17:00.",
        photos: ["casa_donizetti"], map: "Casa natale di Gaetano Donizetti, Via Borgo Canale 14, Bergamo" },
      { t: "10:45", name: "Sentierone, coffee at Balzer", photos: ["sentierone"], map: "Caffè Balzer, Sentierone, Bergamo" },
      { t: "12:00", name: "Lunch (we choose and book)",
        note: "Parietti, La Colombina or Dal Carlo. If La Colombina, do the Sentierone first and the birthplace at 11:00 (they are next door).",
        icon: "food", link: "#eat" },
      { t: "13:30", name: "Drive home", icon: "car" },
      { t: "19:30", name: "Zagreb", icon: "home" }
    ]
  }
];

window.RESTAURANTS = [
  { cats: ["dinner"], name: "Trattoria D'Ambrosio da Giuliana", addr: "Via Broseta 58, Bergamo", hours: "From 19:00, queue from 18:30.",
    info: "No bookings, cash only.", check: "Check: Localore says to book.", price: "€", use: "Fri or Sat dinner" },
  { cats: ["dinner","lunch"], name: "Ristorante Dal Carlo", addr: "Via San Lazzaro 8, Bergamo", tel: "035 242452", hours: "Closed Mondays.",
    price: "€€", use: "Dinner or Sunday B lunch" },
  { cats: ["dinner"], name: "Osteria al GiGianca", addr: "Via Broseta 113, Bergamo", tel: "035 568 4928",
    hours: "Dinner from 19:30, closed Sundays.", price: "€€€", use: "Dinner" },
  { cats: ["lunch"], name: "Antica Trattoria La Colombina", addr: "Via Borgo Canale 12, Bergamo", tel: "035 261402",
    hours: "Tue to Sun 12:00 to 14:15 and 19:30 to 22:15, closed Mondays.", price: "€€€", use: "Saturday lunch" },
  { cats: ["lunch"], name: "Trattoria Parietti", addr: "Via Sudorno, Bergamo", addrNote: "Above Città Alta.", tel: "035 221072",
    hours: "Sunday lunch 12:00 to 14:00.", info: "Parking very hard.", price: "€€", use: "Sunday B lunch" },
  { cats: ["dinner","lunch"], name: "Il Circolino di Città Alta", addr: "Vicolo Sant'Agata 19, Bergamo", tel: "035 218568", use: "Backup" },
  { cats: ["sweet"], name: "La Marianna", addr: "Largo Colle Aperto, Bergamo", use: "Gelato (stracciatella)", icon: "gelato" },
  { cats: ["sweet"], name: "Balzer", addr: "Sentierone, Bergamo", use: "Café, torta Donizetti", icon: "coffee", mapName: "Caffè Balzer" }
];

window.EVENINGS = [
  { day: "Fri or Sat", days: ["fri","sat"], start: "18:30", name: "Francesco Jodice \"Clichés\"", what: "Photography at Ex Monastero di Astino.",
    addr: "Ex Monastero di Astino, Via Astino, Bergamo", details: "Free, daily 18:30 to 23:00.",
    url: "https://www.visitbergamo.net/en/oggetto/francesco-jodice-cliches/" },
  { day: "Fri", days: ["fri"], start: "?", name: "The Jazz Room", what: "Sinatra and Armstrong tribute at Daste.",
    addr: "Daste, Via Daste e Spalenga 15, Bergamo", details: "€32.", check: "Check, no start time listed.",
    url: "https://feverup.com/en/bergamo/the-jazz-room" },
  { day: "Sat", days: ["sat"], start: "22:00", top: true, name: "Calibro 35 \"Ellroy vs L.A.\"", what: "Concert at Druso.",
    addr: "Druso, Via Antonio Locatelli 17, Ranica", details: "Doors 20:30, show 22:00, €25.",
    url: "https://www.cheventi.it/eventi/2026-calibro-35-vs-la-in-concerto-al-druso-di-bergamo-ranica-bg/" },
  { day: "Sat", days: ["sat"], start: "21:00", name: "Born to Be '80s", what: "At NXT Station.", addr: "NXT Station, Piazzale degli Alpini, Bergamo",
    details: "Free, 21:00 to 23:00.", url: "https://www.visitbergamo.net/en/oggetto/born-to-be-80s/" },
  { day: "Sat", days: ["sat"], start: "21:00", name: "The Emotional Gym", what: "Piano by Gloria Campaner, then talks (probably in Italian).",
    addr: "Via San Bernardino 141, Bergamo", details: "Free, 21:00 to 23:00.",
    url: "https://www.visitbergamo.net/en/oggetto/the-emotional-gym/" }
];

window.SHOPS = [
  { street: "Via Sant'Alessandro (lower)", area: "Città Bassa", items: [
    { name: "Boutiques and cheese shops", note: "Look for Strachitunt, Formai de Mut and Branzi.", map: "Via Sant'Alessandro, Bergamo" } ] },
  { street: "Via XX Settembre", area: "Città Bassa", items: [
    { name: "Mostly chains", map: "Via XX Settembre, Bergamo" } ] },
  { street: "Via Sant'Orsola", area: "Città Bassa", items: [
    { name: "KI Concept", note: "No. 11/B.", map: "KI Concept, Via Sant'Orsola 11/B, Bergamo" },
    { name: "Rock'n'rose", map: "Rock'n'rose, Via Sant'Orsola, Bergamo" },
    { name: "Hosio", map: "Hosio, Via Sant'Orsola, Bergamo" } ] },
  { street: "Via Borfuro", area: "Città Bassa", items: [
    { name: "M'Gibi", map: "M'Gibi, Via Borfuro, Bergamo" } ] },
  { street: "Piazza Dante", area: "Città Bassa", items: [
    { name: "Tiziana Fausti", map: "Tiziana Fausti, Piazza Dante, Bergamo" },
    { name: "The F1rst", map: "The F1rst, Piazza Dante, Bergamo" } ] },
  { street: "Sentierone", area: "Città Bassa", items: [
    { name: "Li-Mon Concept Store", note: "No. 46.", map: "Li-Mon Concept Store, Sentierone 46, Bergamo" },
    { name: "Balzer", note: "Torta Donizetti.", map: "Caffè Balzer, Sentierone, Bergamo" } ] },
  { street: "Via Colleoni", area: "Città Alta", items: [
    { name: "Tiziana Fausti Glam", note: "Via Colleoni 3.", map: "Tiziana Fausti Glam, Via Colleoni 3, Bergamo" },
    { name: "Serafino", note: "Via Colleoni 32a.", map: "Serafino, Via Colleoni 32a, Bergamo" } ] },
  { street: "Via Pignolo", area: "Città Bassa", items: [
    { name: "Antiques and galleries", map: "Via Pignolo, Bergamo" } ] }
];

window.CHECKLIST = [
  { id: "fri-dinner", text: "Book Friday dinner." },
  { id: "sat-dinner", text: "Book Saturday dinner." },
  { id: "colombina", text: "Book La Colombina, Saturday 12:45." },
  { id: "eicma", text: "Buy 2 EICMA Sunday tickets, and book free parking at the same time if we use option 1.",
    url: "https://www.eicma.it" },
  { id: "sunb-lunch", text: "Sunday B only: book lunch." },
  { id: "vignette", text: "Slovenian e-vignette (7 days, €16).", url: "https://evinjeta.dars.si" },
  { id: "calibro", text: "Calibro 35 tickets, if we go." },
  { id: "rain", text: "Umbrellas and waterproof shoes." }
];

window.PRACTICAL = [
  { title: "Slovenia", icon: "car", lines: [
    "Slovenian e-vignette needed. Buy only on the official DARS site, linked to the plate." ],
    url: "https://evinjeta.dars.si", urlLabel: "DARS e-vignette" },
  { title: "Italian tolls (A4)", icon: "car", lines: [
    "Take a ticket in, pay by card at the exit (not the yellow Telepass lanes).",
    "About €35 to 45 each way from the border to Bergamo, plus €10 to 15 on Sunday via Rho." ] },
  { title: "Parking", icon: "parking", lines: [
    "Car is in a separate garage near the apartment.",
    "Watch the ZTL gates.",
    "Backup: Piazza della Libertà underground car park, entry from Via Zelasco." ],
    map: "Parcheggio Piazza della Libertà, Via Zelasco, Bergamo" },
  { title: "Tickets", icon: "ticket", lines: [
    "One ATB ticket covers buses and both funiculars." ],
    url: "https://www.atb.bergamo.it", urlLabel: "ATB site" },
  { title: "Rain", icon: "rain", lines: [
    "Rain all weekend, 6 to 14 °C.",
    "Use the Sentierone arcades and the funicular rather than the stone stairs." ] },
  { title: "Shops on Sunday", icon: "bag", lines: [
    "Città Alta shops open on Sunday, Città Bassa only partly." ] }
];
