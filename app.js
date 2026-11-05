(function () {
  "use strict";
  var app = document.getElementById("app");
  var titleEl = document.getElementById("title");

  var ICONS = { car: "🚗", parking: "🅿️", bed: "🛏️", bag: "🛍️", glass: "🍷", food: "🍝", music: "🎵",
    walk: "🚶", moto: "🏍️", home: "🏠", gelato: "🍨", coffee: "☕", ticket: "🎫", rain: "☔", rest: "🍽️" };

  // ---------- Safe storage (works even if the phone blocks it) ----------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  // ---------- Helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mapUrl(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function telUrl(n) { return "tel:+39" + n.replace(/\D/g, ""); }
  function mapBtn(q) { return q ? '<a class="btn" href="' + mapUrl(q) + '" target="_blank" rel="noopener">📍 Map</a>' : ""; }
  function telBtn(n) { return n ? '<a class="btn alt" href="' + telUrl(n) + '">📞 ' + esc(n) + "</a>" : ""; }
  function linkBtn(u, label) { return u ? '<a class="btn alt" href="' + esc(u) + '" target="_blank" rel="noopener">🔗 ' + esc(label || "Website") + "</a>" : ""; }
  function checkBadge(t) { return t ? '<span class="badge check">⚠️ ' + esc(t) + "</span>" : ""; }

  function photo(id) {
    var c = window.CREDITS[id] || {};
    return '<figure><img src="img/' + id + '.jpg" alt="' + esc(c.title || "") + '" loading="lazy" width="680" height="453">' +
      '<figcaption>Photo: <a href="' + esc(c.page) + '" target="_blank" rel="noopener">' + esc(c.artist) +
      '</a>, <a href="' + esc(c.licurl) + '" target="_blank" rel="noopener">' + esc(c.lic) + "</a></figcaption></figure>";
  }
  function photos(list) {
    if (!list || !list.length) return "";
    return '<div class="photos' + (list.length > 1 ? " multi" : "") + '">' + list.map(photo).join("") + "</div>";
  }

  // ---------- Time in Bergamo ----------
  // For testing you can add ?now=2026-11-07T11:40 to the address.
  function romeNow() {
    var m = location.search.match(/now=([\d-]+)T(\d\d:\d\d)/);
    if (m) return { date: m[1], time: m[2] };
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date())
      .forEach(function (x) { p[x.type] = x.value; });
    return { date: p.year + "-" + p.month + "-" + p.day, time: (p.hour === "24" ? "00" : p.hour) + ":" + p.minute };
  }

  // ---------- Stop card ----------
  function stopCard(s, state) {
    var flag = state === "now" ? '<div class="flag now">Now</div>' : state === "next" ? '<div class="flag next">Next</div>' : "";
    var icon = s.photos ? "" : '<div class="icon" aria-hidden="true">' + (ICONS[s.icon] || "📌") + "</div>";
    return '<article class="card ' + (state || "") + '"' + (state === "next" ? ' id="next"' : "") + ">" +
      photos(s.photos) +
      '<div class="body">' + flag +
      (s.photos && s.photos.length > 1 ? '<p class="tiny muted" style="margin:0 0 6px">👉 Swipe the photo to see ' + s.photos.length + ' photos</p>' : "") +
      '<div class="row"><div class="time">' + esc(s.t) + "</div>" +
      '<div style="flex:1"><p class="name">' + esc(s.name) + "</p>" +
      (s.note ? '<p class="note">' + esc(s.note) + "</p>" : "") + checkBadge(s.check) + "</div>" + icon + "</div>" +
      ((s.map || s.tel || s.url || s.link) ? '<div class="btns">' + mapBtn(s.map) + telBtn(s.tel) + linkBtn(s.url, s.urlLabel) +
        (s.link ? '<a class="btn alt" href="' + s.link + '">See options</a>' : "") + "</div>" : "") +
      "</div></article>";
  }

  function dayById(id) { return window.DAYS.filter(function (d) { return d.id === id; })[0]; }

  function timeline(day, now) {
    var isToday = now && now.date === day.date;
    var cur = -1, nxt = -1;
    if (isToday) {
      day.stops.forEach(function (s, i) { if (s.t <= now.time) cur = i; });
      nxt = cur + 1 < day.stops.length ? cur + 1 : -1;
      // Two stops can share a start time (parking options): mark both.
      if (nxt > -1) while (nxt + 1 < day.stops.length && day.stops[nxt + 1].t === day.stops[nxt].t) nxt++;
    }
    var nextT = nxt > -1 ? day.stops[nxt].t : null, curT = cur > -1 ? day.stops[cur].t : null;
    var firstNext = true;
    return day.stops.map(function (s, i) {
      var st = "";
      if (isToday) {
        if (nextT && s.t === nextT) st = "next";
        else if (curT && s.t === curT) st = "now";
        else if (i < cur) st = "past";
      }
      var html = stopCard(s, st);
      if (st === "next" && !firstNext) html = html.replace(' id="next"', "");
      if (st === "next") firstNext = false;
      return html;
    }).join("");
  }

  // ---------- Screens ----------
  function sundayChoice() { return store.get("sunday", "sunA"); }

  function screenToday() {
    var now = romeNow();
    var id = null, msg = "";
    if (now.date < "2026-11-06") {
      id = "fri";
      var days = Math.round((Date.parse("2026-11-06") - Date.parse(now.date)) / 86400000);
      msg = days === 1 ? "The trip starts tomorrow. Here is Friday." : "The trip starts in " + days + " days. Here is Friday.";
    } else if (now.date === "2026-11-06") id = "fri";
    else if (now.date === "2026-11-07") id = "sat";
    else if (now.date === "2026-11-08") id = sundayChoice();
    else { id = sundayChoice(); msg = "The trip is over. Welcome home! Here is the last day."; }
    var day = dayById(id);
    var c = window.CREDITS.citta_bassa;
    var html = '<div class="hero"><img src="img/citta_bassa.jpg" alt="View over Bergamo">' +
      '<div class="cap"><b>' + esc(day.title) + "</b>" + esc(day.subtitle) +
      '<br><small><a href="' + esc(c.page) + '" target="_blank" rel="noopener">Photo: ' + esc(c.artist) + ", " + esc(c.lic) + "</a></small></div></div>";
    if (msg) html += '<p class="sub">' + esc(msg) + "</p>";
    else html += '<p class="sub">Time in Bergamo now: <b>' + esc(now.time) + "</b></p>";
    if (day.date === "2026-11-08") {
      html += '<div class="seg"><a href="#" data-sun="sunA" class="' + (id === "sunA" ? "on" : "") + '">With EICMA</a>' +
        '<a href="#" data-sun="sunB" class="' + (id === "sunB" ? "on" : "") + '">Without EICMA</a></div>';
    }
    html += timeline(day, now);
    return { title: "Today", html: html, scrollNext: true };
  }

  function screenDays(sub) {
    var id = dayById(sub) ? sub : "fri";
    var day = dayById(id);
    var html = '<div class="seg">' + window.DAYS.map(function (d) {
      return '<a href="#days/' + d.id + '" class="' + (d.id === id ? "on" : "") + '">' + esc(d.tab) + "</a>";
    }).join("") + "</div>";
    html += "<h2>" + esc(day.title) + '</h2><p class="sub">' + esc(day.subtitle) + "</p>";
    html += timeline(day, romeNow());
    return { title: "Days", html: html };
  }

  function screenEat() {
    var html = '<h2>Restaurants</h2><p class="sub">All from the Localore list.</p>';
    html += window.RESTAURANTS.map(function (r) {
      return '<article class="card"><div class="body"><div class="row"><div class="icon" aria-hidden="true">' + (ICONS[r.icon] || ICONS.rest) + "</div>" +
        '<div style="flex:1"><p class="name">' + esc(r.name) + "</p>" +
        '<p class="note muted">' + esc(r.addr.replace(", Bergamo", "")) + (r.addrNote ? ". " + esc(r.addrNote) : "") + "</p>" +
        (r.hours ? '<p class="note">🕒 ' + esc(r.hours) + "</p>" : "") +
        (r.info ? '<p class="note">' + esc(r.info) + "</p>" : "") +
        '<span class="badge">For: ' + esc(r.use) + "</span>" + (r.price ? '<span class="badge">' + esc(r.price) + "</span>" : "") +
        checkBadge(r.check) + "</div></div>" +
        '<div class="btns">' + mapBtn((r.mapName || r.name) + ", " + r.addr) + telBtn(r.tel) + "</div></div></article>";
    }).join("");
    return { title: "Eat", html: html };
  }

  function screenEvenings() {
    var html = '<h2>Evenings</h2><p class="sub">After-dinner options.</p>';
    html += window.EVENINGS.map(function (e) {
      return '<article class="card"' + (e.top ? ' style="border:3px solid var(--accent)"' : "") + '><div class="body">' +
        '<span class="badge">' + esc(e.day) + "</span>" + (e.top ? '<span class="badge top">⭐ Top pick</span>' : "") +
        '<p class="name" style="margin-top:8px">' + esc(e.name) + "</p>" +
        '<p class="note">' + esc(e.what) + "</p>" +
        '<p class="note">' + esc(e.details) + "</p>" + checkBadge(e.check) +
        '<div class="btns">' + mapBtn(e.addr) + linkBtn(e.url, "Details") + "</div></div></article>";
    }).join("");
    return { title: "Evenings", html: html };
  }

  function screenShops() {
    var html = '<h2>Shops</h2><p class="sub">Grouped by street.</p>';
    html += window.SHOPS.map(function (g) {
      return "<h3>" + esc(g.street) + ' <span class="muted tiny">' + esc(g.area) + "</span></h3>" +
        '<article class="card">' + g.items.map(function (s, i) {
          return '<div class="body"' + (i ? ' style="border-top:1px solid var(--line)"' : "") + '><div class="row">' +
            '<div class="icon" aria-hidden="true">🛍️</div><div style="flex:1"><p class="name">' + esc(s.name) + "</p>" +
            (s.note ? '<p class="note">' + esc(s.note) + "</p>" : "") + "</div>" + mapBtn(s.map) + "</div></div>";
        }).join("") + "</article>";
    }).join("");
    return { title: "Shops", html: html };
  }

  function screenChecklist() {
    var done = store.get("checklist", {});
    var count = window.CHECKLIST.filter(function (c) { return done[c.id]; }).length;
    var html = '<h2>Checklist</h2><p class="sub" id="count">' + count + " of " + window.CHECKLIST.length + " done. Ticks are saved on this phone.</p>";
    html += '<article class="card">' + window.CHECKLIST.map(function (c, i) {
      return '<label class="check-item' + (done[c.id] ? " done" : "") + '"' + (i ? ' style="border-top:1px solid var(--line)"' : "") + ">" +
        '<input type="checkbox" data-id="' + c.id + '"' + (done[c.id] ? " checked" : "") + ">" +
        "<span>" + esc(c.text) + (c.url ? '<br><a class="tiny" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.url.replace(/^https?:\/\//, "")) + "</a>" : "") +
        "</span></label>";
    }).join("") + "</article>";
    return { title: "Checklist", html: html };
  }

  function screenPractical() {
    var html = '<h2>Practical</h2><p class="sub">Driving, parking, rain, tickets.</p>';
    html += window.PRACTICAL.map(function (p) {
      return '<article class="card"><div class="body"><div class="row"><div class="icon" aria-hidden="true">' + (ICONS[p.icon] || "ℹ️") + "</div>" +
        '<div style="flex:1"><p class="name">' + esc(p.title) + '</p><ul class="plain">' +
        p.lines.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></div></div>" +
        ((p.map || p.url) ? '<div class="btns">' + mapBtn(p.map) + linkBtn(p.url, p.urlLabel) + "</div>" : "") +
        "</div></article>";
    }).join("");
    return { title: "Practical", html: html };
  }

  function screenCredits() {
    var html = '<h2>Photo credits</h2><p class="sub">All photos come from Wikimedia Commons under free licences. They were resized and compressed for this app. Tap a name to see the original.</p>';
    html += '<article class="card"><div class="body"><ul class="plain credits">' + Object.keys(window.CREDITS).map(function (k) {
      var c = window.CREDITS[k];
      return '<li><a href="' + esc(c.page) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a><br>by " + esc(c.artist) +
        ', <a href="' + esc(c.licurl) + '" target="_blank" rel="noopener">' + esc(c.lic) + "</a></li>";
    }).join("") + "</ul></div></article>";
    html += '<p class="sub tiny">App icon and emoji icons: no photos used.</p>';
    return { title: "Credits", html: html };
  }

  function screenMore() {
    var items = [["#shops", "🛍️", "Shops"], ["#checklist", "✅", "Checklist"], ["#practical", "🚗", "Practical"], ["#credits", "📷", "Photo credits"]];
    var html = '<h2>More</h2><article class="card menu">' + items.map(function (x) {
      return '<a href="' + x[0] + '"><span class="icon" aria-hidden="true">' + x[1] + "</span>" + x[2] + '<span style="margin-left:auto" class="muted">›</span></a>';
    }).join("") + "</article>";
    return { title: "More", html: html };
  }

  var SCREENS = { today: screenToday, days: screenDays, eat: screenEat, evenings: screenEvenings, more: screenMore,
    shops: screenShops, checklist: screenChecklist, practical: screenPractical, credits: screenCredits };
  var TAB_FOR = { shops: "more", checklist: "more", practical: "more", credits: "more" };

  var currentKey = "";
  function render(keepScroll) {
    var parts = (location.hash.replace(/^#/, "") || "today").split("/");
    var key = SCREENS[parts[0]] ? parts[0] : "today";
    var y = window.scrollY;
    var s = SCREENS[key](parts[1]);
    app.innerHTML = s.html;
    titleEl.textContent = s.title === "Today" ? "Bergamo, 6 to 8 Nov" : s.title;
    var tab = TAB_FOR[key] || key;
    document.querySelectorAll(".tabs a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === tab); });
    if (keepScroll) { window.scrollTo(0, y); }
    else if (s.scrollNext && document.getElementById("next")) {
      var el = document.getElementById("next");
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64 - (app.querySelector(".seg") ? 70 : 0));
    } else window.scrollTo(0, 0);
    currentKey = location.hash;
  }

  // Clicks: Sunday switch and checklist ticks
  app.addEventListener("click", function (e) {
    var sun = e.target.closest("[data-sun]");
    if (sun) { e.preventDefault(); store.set("sunday", sun.getAttribute("data-sun")); render(true); }
  });
  app.addEventListener("change", function (e) {
    var id = e.target.getAttribute("data-id");
    if (!id) return;
    var done = store.get("checklist", {});
    done[id] = e.target.checked;
    store.set("checklist", done);
    e.target.closest(".check-item").classList.toggle("done", e.target.checked);
    var n = window.CHECKLIST.filter(function (c) { return done[c.id]; }).length;
    document.getElementById("count").textContent = n + " of " + window.CHECKLIST.length + " done. Ticks are saved on this phone.";
  });

  window.addEventListener("hashchange", function () { render(false); });
  // Refresh "Today" every minute so the next stop moves along.
  setInterval(function () {
    var k = (location.hash.replace(/^#/, "") || "today").split("/")[0];
    if (k === "today" || k === "days") render(true);
  }, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) render(true); });

  render(false);

  // Offline support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
