/* ============================================================================
   OneBrain Design System — emoji-picker.js
   Builds <div class="emoji-picker" data-emoji-picker> into a category-tabbed
   emoji grid with live search, a recents row (localStorage), a hovered/focused
   preview footer, and roving-tabindex keyboard nav (← → ↑ ↓ Enter). Picking an
   emoji writes it to data-emoji-target (an input) if present and fires "input".

   Emoji are CONTENT here (the picker's purpose) — the chrome stays on the
   system's mono type + section accent, never emoji-as-UI-icon. The category tab
   glyphs are the one labelled exception. Zero dependencies. Load before </body>.
   SECURITY: emoji + names are static constants; all dynamic text via textContent.
   ============================================================================ */
(function () {
  "use strict";

  var CATS = [
    { id: "smileys", tab: "😀", label: "Smileys & people", items: [
      ["😀","grinning"],["😄","smile"],["😁","beaming"],["😅","sweat smile"],["😂","joy"],["🙂","slight smile"],["😉","wink"],["😊","blush"],
      ["😍","heart eyes"],["😎","cool"],["🤔","thinking"],["🤨","raised brow"],["😴","sleeping"],["😇","innocent"],["🥳","party"],["🤖","robot"],
      ["👍","thumbs up"],["👏","clap"],["🙌","raised hands"],["🙏","thanks"],["👀","eyes"],["🧠","brain"],["💪","strong"],["🫡","salute"]
    ]},
    { id: "nature", tab: "🌿", label: "Animals & nature", items: [
      ["🌿","herb"],["🌱","seedling"],["🌳","tree"],["🍃","leaf"],["🌸","blossom"],["🌼","flower"],["⭐","star"],["🌙","moon"],
      ["☀️","sun"],["⚡","spark"],["🔥","fire"],["🌈","rainbow"],["🐱","cat"],["🐶","dog"],["🦊","fox"],["🐢","turtle"]
    ]},
    { id: "food", tab: "🍔", label: "Food & drink", items: [
      ["🍔","burger"],["🍕","pizza"],["🌮","taco"],["🍜","noodles"],["🍣","sushi"],["🥗","salad"],["🍎","apple"],["🍌","banana"],
      ["☕","coffee"],["🍵","tea"],["🍺","beer"],["🥤","soda"],["🍩","donut"],["🍪","cookie"],["🍰","cake"],["🧊","ice"]
    ]},
    { id: "activity", tab: "⚽", label: "Activity & travel", items: [
      ["⚽","soccer"],["🏀","basketball"],["🎮","game"],["🎯","target"],["🎲","dice"],["🏆","trophy"],["🥇","gold medal"],["🎧","headphones"],
      ["✈️","plane"],["🚀","rocket"],["🚗","car"],["🗺️","map"],["🏝️","island"],["⛰️","mountain"],["🏕️","camp"],["🧭","compass"]
    ]},
    { id: "objects", tab: "💡", label: "Objects", items: [
      ["💡","idea"],["🔋","battery"],["💻","laptop"],["🖥️","desktop"],["📱","phone"],["⌨️","keyboard"],["🖱️","mouse"],["💾","disk"],
      ["📁","folder"],["📂","open folder"],["📝","memo"],["📌","pin"],["🔗","link"],["🔑","key"],["🔒","lock"],["⚙️","gear"],
      ["📊","chart"],["📈","trend up"],["📉","trend down"],["🗂️","files"],["📦","package"],["🧩","puzzle"],["🔍","search"],["🛠️","tools"]
    ]},
    { id: "symbols", tab: "✅", label: "Symbols", items: [
      ["✅","check"],["❌","cross"],["⚠️","warning"],["❓","question"],["❗","exclaim"],["➕","plus"],["➖","minus"],["♻️","recycle"],
      ["💯","hundred"],["✨","sparkles"],["⭐","star"],["❤️","red heart"],["💜","purple heart"],["💙","blue heart"],["🔆","bright"],["🆕","new"]
    ]},
    { id: "flags", tab: "🏁", label: "Flags", items: [
      ["🏁","checkered"],["🚩","triangular"],["🏳️","white"],["🏴","black"],["🇹🇭","thailand"],["🇺🇸","united states"],["🇯🇵","japan"],["🇬🇧","united kingdom"]
    ]}
  ];

  var RECENT_KEY = "ob-emoji-recent";
  function getRecent() {
    try { return (JSON.parse(localStorage.getItem(RECENT_KEY)) || []).slice(0, 16); } catch (e) { return []; }
  }
  function pushRecent(e) {
    var r = getRecent().filter(function (x) { return x !== e; });
    r.unshift(e);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(r.slice(0, 16))); } catch (_) {}
  }
  function nameOf(emoji) {
    for (var i = 0; i < CATS.length; i++)
      for (var j = 0; j < CATS[i].items.length; j++)
        if (CATS[i].items[j][0] === emoji) return CATS[i].items[j][1];
    return "emoji";
  }

  function enhance(root) {
    var target = root.getAttribute("data-emoji-target");
    var targetEl = target ? document.querySelector(target) : null;
    root.textContent = "";

    // search
    var searchWrap = el("div", "ep-search");
    var search = document.createElement("input");
    search.type = "search"; search.placeholder = "Search emoji…";
    search.setAttribute("aria-label", "Search emoji");
    searchWrap.appendChild(search);
    root.appendChild(searchWrap);

    // category tabs
    var cats = el("div", "ep-cats"); cats.setAttribute("role", "tablist");
    var recentTab = catBtn("🕘", "Recent", "recent");
    cats.appendChild(recentTab);
    CATS.forEach(function (c) { cats.appendChild(catBtn(c.tab, c.label, c.id)); });
    root.appendChild(cats);

    var grid = el("div", "ep-grid"); grid.setAttribute("role", "grid");
    root.appendChild(grid);

    var foot = el("div", "ep-foot");
    var prev = el("span", "ep-prev"); prev.textContent = "😀";
    var fname = el("span", "ep-name"); fname.textContent = "Pick an emoji";
    foot.appendChild(prev); foot.appendChild(fname);
    root.appendChild(foot);

    var activeCat = "smileys";

    function cellFor(emoji, name) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ep-emoji"; b.textContent = emoji;
      b.tabIndex = -1; b.setAttribute("role", "gridcell");
      b.setAttribute("aria-label", name); b.setAttribute("data-name", name);
      return b;
    }

    function renderCells(list) {
      grid.textContent = "";
      if (!list.length) {
        var empty = el("div", "ep-empty"); empty.textContent = "No emoji match";
        grid.appendChild(empty); return;
      }
      list.forEach(function (it) { grid.appendChild(cellFor(it[0], it[1])); });
      var first = grid.querySelector(".ep-emoji"); if (first) first.tabIndex = 0;
    }

    function showCat(id) {
      activeCat = id;
      cats.querySelectorAll(".ep-cat").forEach(function (t) {
        var on = t.getAttribute("data-cat") === id;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      if (id === "recent") {
        var r = getRecent();
        renderCells(r.map(function (e) { return [e, nameOf(e)]; }));
      } else {
        var c = CATS.filter(function (x) { return x.id === id; })[0];
        renderCells(c ? c.items : []);
      }
    }

    function showSearch(q) {
      q = q.trim().toLowerCase();
      if (!q) { showCat(activeCat === "recent" ? "smileys" : activeCat); return; }
      cats.querySelectorAll(".ep-cat").forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      var hits = [];
      CATS.forEach(function (c) {
        c.items.forEach(function (it) { if (it[1].indexOf(q) !== -1) hits.push(it); });
      });
      renderCells(hits);
    }

    function preview(emoji, name) { prev.textContent = emoji; fname.textContent = name; }

    function choose(emoji, name) {
      pushRecent(emoji);
      preview(emoji, name);
      if (targetEl) {
        if ("value" in targetEl) { targetEl.value += emoji; targetEl.dispatchEvent(new Event("input", { bubbles: true })); }
        else targetEl.textContent += emoji;
      }
      root.dispatchEvent(new CustomEvent("ob:emoji", { bubbles: true, detail: { emoji: emoji, name: name } }));
    }

    cats.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".ep-cat") : null;
      if (t) { search.value = ""; showCat(t.getAttribute("data-cat")); }
    });
    search.addEventListener("input", function () { showSearch(search.value); });

    grid.addEventListener("click", function (e) {
      var c = e.target.closest ? e.target.closest(".ep-emoji") : null;
      if (c) choose(c.textContent, c.getAttribute("data-name"));
    });
    grid.addEventListener("mouseover", function (e) {
      var c = e.target.closest ? e.target.closest(".ep-emoji") : null;
      if (c) preview(c.textContent, c.getAttribute("data-name"));
    });
    grid.addEventListener("focusin", function (e) {
      var c = e.target.closest ? e.target.closest(".ep-emoji") : null;
      if (c) preview(c.textContent, c.getAttribute("data-name"));
    });

    grid.addEventListener("keydown", function (e) {
      var c = e.target.closest ? e.target.closest(".ep-emoji") : null;
      if (!c) return;
      var cells = Array.prototype.slice.call(grid.querySelectorAll(".ep-emoji"));
      var i = cells.indexOf(c), n = -1;
      if (e.key === "ArrowRight") n = i + 1;
      else if (e.key === "ArrowLeft") n = i - 1;
      else if (e.key === "ArrowDown") n = i + 8;
      else if (e.key === "ArrowUp") n = i - 8;
      else if (e.key === "Enter" || e.key === " ") { choose(c.textContent, c.getAttribute("data-name")); return e.preventDefault(); }
      else return;
      e.preventDefault();
      if (n >= 0 && n < cells.length) { cells.forEach(function (x) { x.tabIndex = -1; }); cells[n].tabIndex = 0; cells[n].focus(); }
    });

    showCat("smileys");
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function catBtn(glyph, label, id) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "ep-cat"; b.textContent = glyph;
    b.setAttribute("data-cat", id); b.setAttribute("role", "tab");
    b.setAttribute("aria-label", label); b.title = label;
    return b;
  }

  function init() {
    var list = document.querySelectorAll("[data-emoji-picker]");
    for (var i = 0; i < list.length; i++) enhance(list[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
