(function () {
  "use strict";
  var head = document.getElementById("head");
  var app = document.getElementById("app");
  var nav = document.getElementById("nav");

  // ---------- Line icons (from the Claude Design file) ----------
  var P = {
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    web: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    umbrella: '<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
    today: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="12" cy="15.5" r="1.5"/>',
    days: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><path d="M5 8v8M10 6h11M10 12h8M10 18h11"/>',
    fork: '<path d="M6 3v7a3 3 0 0 0 6 0V3M9 13v8M9 3v7M18 21V3c-2.2 1-3.5 4-3.5 8H18"/>',
    dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    cup: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    car: '<path d="M3 17v-4l2.5-6h13L21 13v4z"/><path d="M3 17v2h3v-2M18 17v2h3v-2"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    check: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12l3 3 5-6"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>'
  };
  function ic(n, s, w) {
    return '<svg width="' + (s || 20) + '" height="' + (s || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + "</svg>";
  }

  // ---------- Safe storage ----------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  // ---------- Theme: auto (follows the phone), light or dark ----------
  function applyTheme() {
    var t = store.get("theme", "auto");
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }
  function isDark() {
    var t = store.get("theme", "auto");
    if (t !== "auto") return t === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  applyTheme();

  // ---------- Helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mapUrl(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function telUrl(n) { return "tel:+39" + n.replace(/\D/g, ""); }
  var EXT = ' target="_blank" rel="noopener"';
  function roundMap(q, label) {
    return q ? '<a class="round fill" href="' + mapUrl(q) + '"' + EXT + ' aria-label="Open ' + esc(label) + ' in Google Maps">' + ic("pin", 20, 2) + "</a>" : "";
  }
  function warnTag(t) { return t ? '<span class="tag warn">' + esc(t) + "</span>" : ""; }

  function figure(id) {
    var c = window.CREDITS[id] || {};
    return '<figure><img src="img/' + id + '.jpg" alt="' + esc(c.title || "") + '" loading="lazy" width="680" height="453">' +
      '<figcaption>Photo: <a href="' + esc(c.page) + '"' + EXT + ">" + esc(c.artist) +
      '</a>, <a href="' + esc(c.licurl) + '"' + EXT + ">" + esc(c.lic) + "</a></figcaption></figure>";
  }
  function photos(list) {
    if (!list || !list.length) return "";
    return '<div class="photos' + (list.length > 1 ? " multi" : "") + '">' + list.map(figure).join("") + "</div>" +
      (list.length > 1 ? '<div class="small">Swipe the photo to see ' + list.length + " photos</div>" : "");
  }
  function stopPills(s) {
    var h = "";
    if (s.map) h += '<a class="pill" href="' + mapUrl(s.map) + '"' + EXT + ">" + ic("pin", 18, 2) + "Map</a>";
    if (s.tel) h += '<a class="pill" href="' + telUrl(s.tel) + '">' + ic("phone", 18, 2) + esc(s.tel) + "</a>";
    if (s.url) h += '<a class="pill" href="' + esc(s.url) + '"' + EXT + ">" + ic("web", 18, 2) + esc(s.urlLabel || "Website") + "</a>";
    if (s.link) h += '<a class="pill" href="' + s.link + '">' + ic("fork", 18, 2) + "See options</a>";
    return h ? '<div class="pills">' + h + "</div>" : "";
  }

  // ---------- Time in Bergamo (add ?now=2026-11-07T11:40 to test) ----------
  function romeNow() {
    var m = location.search.match(/now=([\d-]+)T(\d\d:\d\d)/);
    if (m) return { date: m[1], time: m[2] };
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date())
      .forEach(function (x) { p[x.type] = x.value; });
    return { date: p.year + "-" + p.month + "-" + p.day, time: (p.hour === "24" ? "00" : p.hour) + ":" + p.minute };
  }
  function dayById(id) { return window.DAYS.filter(function (d) { return d.id === id; })[0]; }
  function sundayChoice() { return store.get("sunday", "sunA"); }
  function tripDayId(now) {
    if (now.date === "2026-11-06") return "fri";
    if (now.date === "2026-11-07") return "sat";
    if (now.date === "2026-11-08") return sundayChoice();
    return null;
  }
  // Index of the current stop and of the next stop.
  function progress(day, now) {
    if (now.date < day.date) return { cur: -1, next: 0 };
    if (now.date > day.date) return { cur: day.stops.length, next: -1 };
    var cur = -1;
    day.stops.forEach(function (s, i) { if (s.t <= now.time) cur = i; });
    return { cur: cur, next: cur + 1 < day.stops.length ? cur + 1 : -1 };
  }

  // ---------- Header ----------
  function header(o) {
    var dark = isDark();
    return '<div class="wrap top' + (o.lined ? " lined" : "") + '"><div class="top-row"><div>' +
      (o.kicker ? '<div class="kicker">' + esc(o.kicker) + "</div>" : "") + "<h1>" + esc(o.title) + "</h1></div>" +
      '<button type="button" class="round" data-act="theme" aria-label="Switch to ' + (dark ? "light" : "dark") + ' mode">' +
      ic(dark ? "sun" : "moon", 22) + "</button></div>" + (o.controls ? '<div class="controls">' + o.controls + "</div>" : "") + "</div>";
  }

  // ---------- Today ----------
  var DAYTXT = { fri: "Fri 6 Nov · Day 1 of 3", sat: "Sat 7 Nov · Day 2 of 3", sunA: "Sun 8 Nov · Day 3 of 3", sunB: "Sun 8 Nov · Day 3 of 3" };
  function screenToday() {
    var now = romeNow();
    var id = tripDayId(now), kicker;
    if (!id && now.date < "2026-11-06") {
      id = "fri";
      var n = Math.round((Date.parse("2026-11-06") - Date.parse(now.date)) / 86400000);
      kicker = n === 1 ? "Trip starts tomorrow" : "Trip starts in " + n + " days";
    } else if (!id) { id = sundayChoice(); kicker = "The trip is over. Welcome home!"; }
    else kicker = DAYTXT[id];
    var day = dayById(id), pr = progress(day, now), isToday = now.date === day.date, h = "";

    if (day.date === "2026-11-08") {
      h += '<div class="seg" role="radiogroup" aria-label="Sunday plan">' +
        '<button type="button" role="radio" data-sun="sunA" class="' + (id === "sunA" ? "on" : "") + '" aria-checked="' + (id === "sunA") + '">With EICMA</button>' +
        '<button type="button" role="radio" data-sun="sunB" class="' + (id === "sunB" ? "on" : "") + '" aria-checked="' + (id === "sunB") + '">Without EICMA</button></div>';
    }
    h += '<div class="banner">' + ic("umbrella", 28) + "<div><b>Rain all weekend, 6 to 14 °C</b>" +
      "<span>Use the Sentierone arcades and the funicular rather than the stone stairs.</span></div></div>";

    var nx = pr.next > -1 ? day.stops[pr.next] : null;
    h += "<section><h2>" + (now.date < day.date ? "First stop on " + esc(day.title.split(" ")[0]) : "Next up") + "</h2>";
    if (isToday && pr.cur > -1) {
      var cs = day.stops[pr.cur];
      h += '<div class="nowline"><b>Now:</b> ' + esc(cs.t) + " " + esc(cs.name) + "</div>";
    }
    if (nx) {
      h += '<div class="hero">' + (nx.photos ? '<div class="photo">' + figure(nx.photos[0]).replace('loading="lazy"', 'loading="eager"') + "</div>" : "") +
        '<div class="meta"><span class="time">' + esc(nx.t) + "</span>" + (isToday ? '<span class="tag next">Next</span>' : "") + "</div>" +
        '<div><div class="title">' + esc(nx.name) + "</div>" + (nx.note ? '<div class="sub">' + esc(nx.note) + "</div>" : "") + "</div>" +
        warnTag(nx.check) +
        (nx.map ? '<a class="btn" href="' + mapUrl(nx.map) + '"' + EXT + ">" + ic("pin", 20, 2) + "Open in Google Maps</a>" : "") +
        ((nx.tel || nx.url || nx.link) ? stopPills({ tel: nx.tel, url: nx.url, urlLabel: nx.urlLabel, link: nx.link }) : "") + "</div>";
    } else {
      h += '<div class="hero"><div class="title">That was the last stop today.</div></div>';
    }
    h += "</section>";

    var later = pr.next > -1 ? day.stops.slice(pr.next + 1) : [];
    if (later.length) {
      h += '<section style="gap:4px"><h2>' + (isToday ? "Later today" : "Then") + '</h2><div class="rows">' + later.map(function (s) {
        return '<div class="rowi"><div class="t">' + esc(s.t) + '</div><div class="c"><div class="n">' + esc(s.name) + "</div>" +
          (s.note ? '<div class="s">' + esc(s.note) + "</div>" : "") + warnTag(s.check) + "</div>" + roundMap(s.map, s.name) + "</div>";
      }).join("") + "</div></section>";
    }
    h += '<a class="btn outline" href="#days/' + id + '">See the full day</a>';

    var dk = id === "fri" ? "fri" : id === "sat" ? "sat" : null;
    if (dk) {
      var ev = window.EVENINGS.filter(function (e) { return e.days.indexOf(dk) > -1; });
      h += "<section><h2>" + (isToday ? "Tonight" : "That evening") + "</h2>" + ev.map(function (e) {
        return '<div class="card" style="flex-direction:row;align-items:center;gap:14px;padding:14px;border-radius:16px">' +
          '<div class="tile" style="width:52px;height:52px;border-radius:12px">' + ic(e.top ? "music" : "moon", 24) + "</div>" +
          '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px"><div style="font-size:16px;font-weight:700">' + esc(e.name) + "</div>" +
          '<div class="muted" style="font-size:14px">' + (e.top ? "Top pick. " : "") + esc(e.details) + "</div>" + warnTag(e.check) + "</div>" +
          roundMap(e.addr, e.name) + "</div>";
      }).join("") + '<a class="textlink" href="#evenings">All evening options</a></section>';
    }
    return { head: header({ kicker: kicker, title: "Today" }), html: h, tab: "today" };
  }

  // ---------- Days ----------
  var TABS = { fri: ["Fri 6", "Lower town"], sat: ["Sat 7", "Upper town"], sunA: ["Sun A", "EICMA"], sunB: ["Sun B", "No EICMA"] };
  function screenDays(sub) {
    var now = romeNow();
    var id = dayById(sub) ? sub : (tripDayId(now) || "fri");
    var day = dayById(id), pr = progress(day, now), isToday = now.date === day.date;
    var controls = '<div class="daytabs" role="tablist" aria-label="Choose a day">' + window.DAYS.map(function (d) {
      return '<a role="tab" class="daytab' + (d.id === id ? " on" : "") + '" aria-selected="' + (d.id === id) + '" href="#days/' + d.id + '"><b>' +
        TABS[d.id][0] + "</b><span>" + TABS[d.id][1] + "</span></a>";
    }).join("") + "</div>";
    var nextT = isToday && pr.next > -1 ? day.stops[pr.next].t : null;
    var h = '<h2 class="day-h">' + esc(day.title) + '</h2><p class="day-sub">' + esc(day.subtitle) + "</p>";
    h += '<div class="timeline">' + day.stops.map(function (s, i) {
      var st = "";
      if (isToday) {
        if (nextT && s.t === nextT) st = "next";
        else if (i === pr.cur) st = "now";
        else if (i < pr.cur) st = "past";
      }
      return '<div class="stop ' + st + '"' + (st === "next" && i === pr.next ? ' id="next"' : "") + '><div class="rail"><b>' + esc(s.t) + "</b><i></i></div>" +
        '<div class="c">' + (st === "next" ? '<span class="tag next">Next</span>' : st === "now" ? '<span class="tag now">Now</span>' : "") +
        '<div class="n">' + esc(s.name) + "</div>" + (s.note ? '<div class="s">' + esc(s.note) + "</div>" : "") +
        warnTag(s.check) + photos(s.photos) + stopPills(s) + "</div></div>";
    }).join("") + "</div>";
    return { head: header({ kicker: "Bergamo · 6 to 8 Nov", title: "Days", lined: true, controls: controls }), html: h, tab: "days", scrollNext: isToday };
  }

  // ---------- Eat ----------
  var eatF = "all";
  function screenEat() {
    var F = [["all", "All"], ["dinner", "Dinner"], ["lunch", "Lunch"], ["sweet", "Coffee and sweets"]];
    var controls = '<div class="chips">' + F.map(function (f) {
      return '<button type="button" class="chip' + (f[0] === eatF ? " on" : "") + '" aria-pressed="' + (f[0] === eatF) + '" data-eat="' + f[0] + '">' + f[1] + "</button>";
    }).join("") + "</div>";
    var h = window.RESTAURANTS.filter(function (r) { return eatF === "all" || r.cats.indexOf(eatF) > -1; }).map(function (r) {
      var info = [r.hours, r.info, r.addrNote].filter(Boolean).join(" ");
      return '<article class="card"><div class="head"><div class="tile">' + ic(r.cats[0] === "sweet" ? "cup" : "fork", 26) + "</div>" +
        '<div class="c"><h3>' + esc(r.name) + '</h3><div class="meta">' + (r.price ? esc(r.price) + " · " : "") +
        esc(r.addr.replace(", Bergamo", "")) + "</div></div></div>" +
        (info ? '<div class="info">' + esc(info) + "</div>" : "") +
        '<div class="tags"><span class="tag">' + esc(r.use) + "</span>" + warnTag(r.check) + "</div>" +
        '<div class="grid2"><a class="btn ink" href="' + mapUrl((r.mapName || r.name) + ", " + r.addr) + '"' + EXT + ' aria-label="Open ' + esc(r.name) + ' in Google Maps">' + ic("pin", 18, 2) + "Map</a>" +
        (r.tel ? '<a class="btn line" href="' + telUrl(r.tel) + '" aria-label="Call ' + esc(r.name) + '">' + ic("phone", 18, 2) + "Call</a>"
          : '<span class="btn soft">No phone listed</span>') + "</div>" +
        (r.tel ? '<div class="small">' + esc(r.tel) + "</div>" : "") + "</article>";
    }).join("");
    return { head: header({ kicker: "From the Localore list", title: "Eat", lined: true, controls: controls }), html: h, tab: "eat" };
  }

  // ---------- Evenings ----------
  var eveF = "all";
  function screenEvenings() {
    var F = [["all", "All"], ["fri", "Friday"], ["sat", "Saturday"]];
    var controls = '<div class="chips">' + F.map(function (f) {
      return '<button type="button" class="chip' + (f[0] === eveF ? " on" : "") + '" aria-pressed="' + (f[0] === eveF) + '" data-eve="' + f[0] + '">' + f[1] + "</button>";
    }).join("") + "</div>";
    var list = window.EVENINGS.filter(function (e) { return eveF === "all" || e.days.indexOf(eveF) > -1; });
    list = list.filter(function (e) { return e.top; }).concat(list.filter(function (e) { return !e.top; }));
    var h = list.map(function (e) {
      var btns = '<div class="grid2"><a class="btn ' + (e.top ? "" : "ink") + '" href="' + mapUrl(e.addr) + '"' + EXT + ">" + ic("pin", 18, 2) + "Map</a>" +
        '<a class="btn ' + (e.top ? "acc-line" : "line") + '" href="' + esc(e.url) + '"' + EXT + ">" + ic("web", 18, 2) + "Details</a></div>";
      if (e.top) {
        return '<article class="toppick"><div class="band"><span class="badge">Top pick · ' + esc(e.day) + "</span>" +
          '<svg class="big" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P.music + "</svg>" +
          '<div class="d">' + esc(e.details) + '</div></div><div class="body"><h3>' + esc(e.name) + "</h3>" +
          '<div class="muted" style="font-size:15px">' + esc(e.addr) + ".</div>" + btns + "</div></article>";
      }
      return '<article class="card"><div class="head"><div class="tile"><small>' + esc(e.day.replace(" or ", "/")) + "</small><b>" + esc(e.start) + "</b></div>" +
        '<div class="c"><h3>' + esc(e.name) + '</h3><div class="meta">' + esc(e.addr.replace(", Bergamo", "")) + "</div></div></div>" +
        '<div class="info">' + esc(e.what) + " " + esc(e.details) + "</div>" + (e.check ? '<div class="tags">' + warnTag(e.check) + "</div>" : "") + btns + "</article>";
    }).join("");
    return { head: header({ kicker: "Friday and Saturday night", title: "Evenings", lined: true, controls: controls }), html: h, tab: "evenings" };
  }

  // ---------- More (checklist inline, links to the rest) ----------
  function checklistHtml() {
    var done = store.get("checklist", {});
    var n = window.CHECKLIST.filter(function (c) { return done[c.id]; }).length;
    return '<section style="gap:4px"><div style="display:flex;align-items:baseline;justify-content:space-between"><h2>Checklist</h2>' +
      '<span class="muted" style="font-size:14px;font-weight:700" id="count">' + n + " of " + window.CHECKLIST.length + " done</span></div>" +
      window.CHECKLIST.map(function (c) {
        return '<label class="check' + (done[c.id] ? " done" : "") + '"><input type="checkbox" data-id="' + c.id + '"' + (done[c.id] ? " checked" : "") + ">" +
          "<span>" + esc(c.text) + (c.url ? '<br><a href="' + esc(c.url) + '"' + EXT + ">" + esc(c.url.replace(/^https?:\/\//, "")) + "</a>" : "") + "</span></label>";
      }).join("") + '<p class="small" style="margin-top:8px">Ticks are saved on this phone.</p></section>';
  }
  function screenMore() {
    var theme = store.get("theme", "auto");
    var items = [["#shops", "bag", "Shops", "Grouped by street"], ["#practical", "car", "Practical", "Driving, parking, rain, tickets"], ["#credits", "camera", "Photo credits", "Wikimedia Commons"]];
    var h = checklistHtml();
    h += '<section><h2>More</h2><div class="menu">' + items.map(function (x) {
      return '<a href="' + x[0] + '"><div class="ic">' + ic(x[1], 24) + '</div><div style="flex:1"><b>' + x[2] + "</b><span>" + x[3] + "</span></div>" + ic("chev", 20, 2) + "</a>";
    }).join("") + "</div></section>";
    h += '<section><h2>Appearance</h2><div class="seg" role="radiogroup" aria-label="Appearance">' + [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]].map(function (o) {
      return '<button type="button" role="radio" aria-checked="' + (theme === o[0]) + '" class="' + (theme === o[0] ? "on" : "") + '" data-theme-set="' + o[0] + '">' + o[1] + "</button>";
    }).join("") + '</div><p class="small">Auto follows your iPhone setting.</p></section>';
    return { head: header({ kicker: "Checklist, shops, practical", title: "More" }), html: h, tab: "more" };
  }
  function backLink() { return '<a class="back" href="#more">' + ic("back", 18, 2) + "More</a>"; }

  function screenShops() {
    var h = backLink() + window.SHOPS.map(function (g) {
      return '<section style="gap:0"><h2>' + esc(g.street) + '</h2><div class="small">' + esc(g.area) + '</div><div class="rows">' + g.items.map(function (s) {
        return '<div class="rowi"><div class="c"><div class="n">' + esc(s.name) + "</div>" + (s.note ? '<div class="s">' + esc(s.note) + "</div>" : "") + "</div>" + roundMap(s.map, s.name) + "</div>";
      }).join("") + "</div></section>";
    }).join("");
    return { head: header({ kicker: "Grouped by street", title: "Shops" }), html: h, tab: "more" };
  }

  var PICON = { car: "car", parking: "car", ticket: "check", rain: "umbrella", bag: "bag" };
  function screenPractical() {
    var h = backLink() + window.PRACTICAL.map(function (p) {
      return '<div class="card fill"><div style="display:flex;align-items:center;gap:10px">' + ic(PICON[p.icon] || "check", 22) +
        '<h3 style="font-size:16px">' + esc(p.title) + "</h3></div>" +
        '<ul class="plain muted" style="font-size:14px">' + p.lines.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>" +
        ((p.map || p.url) ? '<div class="pills">' + (p.map ? '<a class="pill" href="' + mapUrl(p.map) + '"' + EXT + ">" + ic("pin", 18, 2) + "Map</a>" : "") +
          (p.url ? '<a class="pill" href="' + esc(p.url) + '"' + EXT + ">" + ic("web", 18, 2) + esc(p.urlLabel) + "</a>" : "") + "</div>" : "") + "</div>";
    }).join("");
    return { head: header({ kicker: "Driving, parking, rain, tickets", title: "Practical" }), html: h, tab: "more" };
  }

  function screenCredits() {
    var h = backLink() + '<p class="muted" style="margin:0;font-size:15px">All photos come from Wikimedia Commons under free licences. They were resized and compressed for this app. Tap a title to see the original.</p>' +
      '<ul class="plain credits">' + Object.keys(window.CREDITS).map(function (k) {
        var c = window.CREDITS[k];
        return '<li><a href="' + esc(c.page) + '"' + EXT + ">" + esc(c.title) + '</a><br><span class="muted">by ' + esc(c.artist) +
          ', <a href="' + esc(c.licurl) + '"' + EXT + ">" + esc(c.lic) + "</a></span></li>";
      }).join("") + '</ul><p class="small">Font: Plus Jakarta Sans (SIL Open Font License).</p>';
    return { head: header({ kicker: "Wikimedia Commons", title: "Photo credits" }), html: h, tab: "more" };
  }

  // ---------- Router ----------
  var SCREENS = { today: screenToday, days: screenDays, eat: screenEat, evenings: screenEvenings, more: screenMore,
    shops: screenShops, checklist: screenMore, practical: screenPractical, credits: screenCredits };
  var NAV = [["today", "today", "Today"], ["days", "days", "Days"], ["eat", "fork", "Eat"], ["evenings", "moon", "Evenings"], ["more", "dots", "More"]];

  function render(keepScroll) {
    var parts = (location.hash.replace(/^#/, "") || "today").split("/");
    var key = SCREENS[parts[0]] ? parts[0] : "today";
    var y = window.scrollY;
    var s = SCREENS[key](parts[1]);
    head.innerHTML = s.head;
    app.innerHTML = s.html;
    nav.innerHTML = NAV.map(function (n) {
      return '<a href="#' + n[0] + '" class="' + (s.tab === n[0] ? "on" : "") + '"' + (s.tab === n[0] ? ' aria-current="page"' : "") + ">" + ic(n[1], 26) + n[2] + "</a>";
    }).join("");
    if (keepScroll) window.scrollTo(0, y);
    else if (s.scrollNext && document.getElementById("next")) {
      window.scrollTo(0, document.getElementById("next").getBoundingClientRect().top + window.scrollY - 16);
    } else window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act],[data-sun],[data-eat],[data-eve],[data-theme-set]");
    if (!el) return;
    if (el.hasAttribute("data-act")) { store.set("theme", isDark() ? "light" : "dark"); applyTheme(); render(true); }
    else if (el.hasAttribute("data-sun")) { store.set("sunday", el.getAttribute("data-sun")); render(true); }
    else if (el.hasAttribute("data-eat")) { eatF = el.getAttribute("data-eat"); render(true); }
    else if (el.hasAttribute("data-eve")) { eveF = el.getAttribute("data-eve"); render(true); }
    else if (el.hasAttribute("data-theme-set")) { store.set("theme", el.getAttribute("data-theme-set")); applyTheme(); render(true); }
  });
  app.addEventListener("change", function (e) {
    var id = e.target.getAttribute("data-id");
    if (!id) return;
    var done = store.get("checklist", {});
    done[id] = e.target.checked;
    store.set("checklist", done);
    e.target.closest(".check").classList.toggle("done", e.target.checked);
    var n = window.CHECKLIST.filter(function (c) { return done[c.id]; }).length;
    document.getElementById("count").textContent = n + " of " + window.CHECKLIST.length + " done";
  });

  window.addEventListener("hashchange", function () { render(false); });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", function () { render(true); });
  }
  setInterval(function () {
    var k = (location.hash.replace(/^#/, "") || "today").split("/")[0];
    if (k === "today" || k === "days") render(true);
  }, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) render(true); });

  render(false);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
