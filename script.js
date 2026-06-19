/* ============================================================
   Enoden Portfolio â€” script.js
   Motor de recorrido, i18n, mapa de ruta y ambiente.
   ============================================================ */
(() => {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  const STATIONS = DATA.stations;
  const COUNT = STATIONS.length;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lang = "es";

  /* ---------- Paletas de cielo por tema ---------- */
  const THEMES = {
    dawn:       { top: "#ffd9a0", bottom: "#ff9e7a", accent: "#ff9e7a", stars: 0,   sun: 0.85, moon: 0 },
    neon:       { top: "#1a1036", bottom: "#3a1b5c", accent: "#b06bff", stars: 0.85, sun: 0, moon: 0.9 },
    datacenter: { top: "#0a1a2f", bottom: "#102a4a", accent: "#2bd4ff", stars: 0.35, sun: 0, moon: 0.85 },
    startup:    { top: "#8fd0ff", bottom: "#dff3ff", accent: "#ffd45e", stars: 0,   sun: 0.95, moon: 0 },
    sunset:     { top: "#ff9a6b", bottom: "#6b3fa0", accent: "#ff7a4e", stars: 0.1, sun: 0.7, moon: 0 },
    garage:     { top: "#2a1f1a", bottom: "#4a3526", accent: "#ffb14e", stars: 0.25, sun: 0, moon: 0 },
    future:     { top: "#ffb87a", bottom: "#ff7a5e", accent: "#ffd45e", stars: 0,   sun: 0, moon: 0 },
  };

  /* ---------- i18n registry ---------- */
  const i18nNodes = [];
  const L = (v) => (v && typeof v === "object" && ("es" in v || "en" in v) ? v[lang] : v);
  function reg(el, value, mode) {
    const node = { el, value, mode: mode || "text" };
    i18nNodes.push(node);
    applyNode(node);
    return el;
  }
  function applyNode(n) {
    const text = L(n.value);
    if (n.mode === "html") n.el.innerHTML = text;
    else n.el.textContent = text;
  }
  function applyLang() {
    document.documentElement.lang = lang;
    i18nNodes.forEach(applyNode);
  }

  /* ---------- Helpers DOM ---------- */
  const $ = (sel) => document.querySelector(sel);
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  

  /* ============================================================
     ESCENOGRAFÃA por tema (pixel art CSS)
     ============================================================ */
  function scene(theme) {
    switch (theme) {
      case "dawn": return `
        ${skylineFar("#caa6cf", 0.2)}
        <!-- sakuras fondo (más chicos, más atrás) -->
        <div class="tree sakura" style="left:1%;transform:scale(.5);opacity:.5"></div>
        <div class="tree sakura" style="left:10%;transform:scale(.55);opacity:.5"></div>
        <div class="tree sakura" style="left:22%;transform:scale(.6);opacity:.45"></div>
        <div class="tree sakura" style="left:38%;transform:scale(.5);opacity:.5"></div>
        <div class="tree sakura" style="left:50%;transform:scale(.55);opacity:.45"></div>
        <div class="tree sakura" style="left:65%;transform:scale(.6);opacity:.5"></div>
        <div class="tree sakura" style="left:78%;transform:scale(.5);opacity:.5"></div>
        <div class="tree sakura" style="left:90%;transform:scale(.55);opacity:.45"></div>
        <!-- sakuras primer plano (variedad de tamaños) -->
        <div class="tree sakura" style="left:0%;transform:scale(.75)"></div>
        <div class="tree sakura" style="left:7%;transform:scale(1.15)"></div>
        <div class="tree sakura" style="left:15%;transform:scale(.9)"></div>
        <div class="tree sakura" style="left:22%;transform:scale(1.25)"></div>
        <div class="tree sakura" style="left:30%;transform:scale(.7)"></div>
        <div class="tree sakura" style="left:36%;transform:scale(1.05)"></div>
        <div class="tree sakura" style="left:44%;transform:scale(.85)"></div>
        <div class="tree sakura" style="left:52%;transform:scale(1.2)"></div>
        <div class="tree sakura" style="left:59%;transform:scale(.65)"></div>
        <div class="tree sakura" style="left:64%;transform:scale(1.1)"></div>
        <div class="tree sakura" style="left:72%;transform:scale(.95)"></div>
        <div class="tree sakura" style="left:79%;transform:scale(1.3)"></div>
        <div class="tree sakura" style="left:86%;transform:scale(.8)"></div>
        <div class="tree sakura" style="left:92%;transform:scale(1.0)"></div>
        <div class="tree sakura" style="left:97%;transform:scale(.6)"></div>
        <!-- pétalos cayendo -->
        <div class="petal" style="left:4%;top:8%;animation-delay:0s"></div>
        <div class="petal" style="left:10%;top:5%;animation-delay:.3s"></div>
        <div class="petal" style="left:16%;top:12%;animation-delay:.6s"></div>
        <div class="petal" style="left:22%;top:3%;animation-delay:.9s"></div>
        <div class="petal" style="left:28%;top:10%;animation-delay:1.2s"></div>
        <div class="petal" style="left:34%;top:6%;animation-delay:1.5s"></div>
        <div class="petal" style="left:40%;top:14%;animation-delay:1.8s"></div>
        <div class="petal" style="left:46%;top:4%;animation-delay:2.1s"></div>
        <div class="petal" style="left:52%;top:11%;animation-delay:2.4s"></div>
        <div class="petal" style="left:58%;top:7%;animation-delay:2.7s"></div>
        <div class="petal" style="left:64%;top:13%;animation-delay:3.0s"></div>
        <div class="petal" style="left:70%;top:5%;animation-delay:3.3s"></div>
        <div class="petal" style="left:76%;top:9%;animation-delay:3.6s"></div>
        <div class="petal" style="left:82%;top:3%;animation-delay:3.9s"></div>
        <div class="petal" style="left:88%;top:11%;animation-delay:4.2s"></div>
        <div class="petal" style="left:94%;top:7%;animation-delay:4.5s"></div>
        <div class="petal" style="left:12%;top:20%;animation-delay:.5s"></div>
        <div class="petal" style="left:30%;top:18%;animation-delay:1.4s"></div>
        <div class="petal" style="left:48%;top:22%;animation-delay:2.3s"></div>
        <div class="petal" style="left:66%;top:16%;animation-delay:0.8s"></div>
        <div class="petal" style="left:84%;top:20%;animation-delay:1.9s"></div>
        <div class="bird" style="left:30%;top:14%"></div>
        <div class="bird" style="left:36%;top:10%;animation-delay:.7s"></div>
        <div class="bird" style="left:68%;top:12%;animation-delay:1.4s"></div>
        <div class="cat" style="left:50%;bottom:14%"><span class="b"></span><span class="h"></span><span class="t"></span><span class="eye"></span></div>`;

      case "neon": return `
        ${houseSkyline("#1a1230", 0.6)}
        <!-- casas bajas de barrio nocturno -->
        <div class="house" style="left:2%;width:48px;height:26%;background:#1f1a2e">${winGrid(2,3)}</div>
        <div class="house" style="left:9%;width:42px;height:22%;background:#241e34">${winGrid(2,2)}</div>
        <div class="house" style="left:15%;width:56px;height:28%;background:#1a1428">${winGrid(2,3)}</div>
        <div class="house" style="left:64%;width:44px;height:24%;background:#1f1a2e">${winGrid(2,2)}</div>
        <div class="house" style="left:73%;width:52px;height:26%;background:#241e34">${winGrid(2,3)}</div>
        <div class="house" style="left:82%;width:48px;height:22%;background:#1a1428">${winGrid(2,2)}</div>
        <div class="house" style="right:2%;width:42px;height:24%;background:#1f1a2e">${winGrid(2,2)}</div>
        <!-- algunos edificios bajos -->
        <div class="bldg" style="left:24%;width:80px;height:36%;background:#161025">${winGrid(3,5)}<span class="rooftop" style="background:#ff4d9d"></span></div>
        <div class="bldg" style="left:44%;width:70px;height:32%;background:#121020">${winGrid(2,4)}<span class="rooftop" style="background:#43e0ff"></span></div>
        <!-- neón sobre las casas -->
        <div class="vsign" style="left:6%;top:13%;color:#ff4d9d">居酒屋</div>
        <div class="vsign" style="left:18%;top:9%;color:#43e0ff">電脳街</div>
        <div class="vsign" style="right:10%;top:10%;color:#ffd44d">情報</div>
        <div class="vsign" style="right:3%;top:28%;color:#7cff6b">ラーメン</div>
        <div class="lantern" style="left:26%;top:42%"></div>
        <div class="lantern" style="left:30%;top:46%;animation-delay:.6s"></div>
        <div class="lantern" style="right:22%;top:44%;animation-delay:.9s"></div>
        <div class="clock">22:00</div>
        <div class="board" style="left:55%;top:54%;width:166px">; UNLaM Â· 22:00<br>MOV AX, 1<br>ADD AX, BX<br>INT 21h<br>JMP loop</div>
        <div class="vending" style="left:38%"></div>
        <div class="vending" style="right:8%"></div>
        <div class="lamp" style="left:60%"></div>
        <div class="lamp" style="left:90%"></div>
        <div class="person" style="left:28%"></div>
        <div class="person" style="left:55%;opacity:.7"></div>
        <div class="person" style="left:78%;opacity:.5"></div>
        <div class="cat" style="left:48%;bottom:14%;transform:scale(.8)"><span class="b"></span><span class="h"></span><span class="t"></span><span class="eye"></span></div>`;

      case "datacenter": return `
        ${skylineFar("#071828", 0.5)}
        <!-- paredes del DC -->
        <div class="dc-wall left"></div>
        <div class="dc-wall right"></div>
        <div class="dc-floor"></div>
        <!-- racks de servidores muchos -->
        <div class="rack tall" style="left:4%">${rackInner()}</div>
        <div class="rack tall" style="left:10%">${rackInner()}</div>
        <div class="rack tall" style="left:16%">${rackInner()}</div>
        <div class="rack tall" style="left:22%">${rackInner()}</div>
        <div class="rack tall" style="right:4%">${rackInner()}</div>
        <div class="rack tall" style="right:10%">${rackInner()}</div>
        <div class="rack tall" style="right:16%">${rackInner()}</div>
        <div class="rack tall" style="right:22%">${rackInner()}</div>
        <!-- cableado y tuberÃ­as -->
        <div class="pipe" style="left:3%;width:26%;top:8%"></div>
        <div class="pipe" style="right:3%;width:26%;top:8%"></div>
        <div class="pipe" style="left:3%;width:26%;top:14%"></div>
        <div class="pipe" style="right:3%;width:26%;top:14%"></div>
        <div class="dc-airflow" style="left:28%"></div>
        <div class="dc-airflow" style="right:28%"></div>
        <!-- cubos de datos flotando (TM1) -->
        <div class="cube" style="left:38%;top:22%"></div>
        <div class="cube" style="left:50%;top:38%;animation-delay:1s"></div>
        <div class="cube" style="left:58%;top:18%;animation-delay:2s"></div>
        <div class="cube" style="left:44%;top:50%;animation-delay:1.5s;transform:scale(.7)"></div>
        <div class="board" style="left:36%;top:60%;width:180px;color:#2bd4ff">SELECT * FROM cube<br>WHERE region='AR'<br>&gt; 2,481,003 rows<br>[TM1] CONNECTED âœ“</div>
        <div class="monitor" style="left:34%;bottom:28%"></div>
        <div class="monitor" style="left:56%;bottom:28%"></div>`;

      case "startup": return `
        ${skylineFar("#5a7a9a", 0.35)}
        <div class="cloud" style="left:50%;top:12%"></div>
        <div class="cloud" style="left:76%;top:8%;transform:scale(.7)"></div>
        <!-- máquinas petroleras (pumpjacks) -->
        <div class="pumpjack" style="left:50%"></div>
        <div class="pumpjack" style="left:66%;transform:scale(.8)"></div>
        <div class="pumpjack" style="right:4%;transform:scale(.9)"></div>
        <!-- estación de servicio -->
        <div class="gasstation" style="left:72%"></div>
        <!-- torre petrolera al fondo -->
        <div class="tower" style="right:10%"><span class="leg l"></span><span class="leg r"></span><span class="top"></span><span class="beam"></span></div>
        <div class="tower" style="left:56%;transform:scale(.7)"><span class="leg l"></span><span class="leg r"></span><span class="top"></span><span class="beam"></span></div>
        <!-- pipeline industrial -->
        <div class="pipe thick" style="left:0%;width:100%;top:72%"></div>
        <div class="person" style="left:60%"></div>
        <div class="person" style="left:82%;opacity:.7"></div>
        <div class="cat" style="left:76%;bottom:14%;transform:scale(.8)"><span class="b"></span><span class="h"></span><span class="t"></span><span class="eye"></span></div>`;

      case "sunset": return `
        ${corpoSkyline("#3a2540", 0.7)}
        <!-- muchos edificios altos corporativos -->
        <div class="bldg corpo" style="left:0%;width:70px;height:72%;background:#1c1728">${winGridLit(2,14)}</div>
        <div class="bldg corpo" style="left:10%;width:90px;height:80%;background:#221d30">${winGridLit(3,16)}<span class="rooftop" style="background:#ffd45e"></span></div>
        <div class="bldg corpo" style="left:22%;width:110px;height:68%;background:#1a152a">${winGridLit(4,14)}</div>
        <div class="bldg corpo" style="left:40%;width:80px;height:74%;background:#201a2e">${winGridLit(3,15)}<span class="rooftop" style="background:#ff6b4e"></span></div>
        <div class="bldg corpo" style="left:56%;width:100px;height:82%;background:#1c1728">${winGridLit(3,16)}</div>
        <div class="bldg corpo" style="right:10%;width:86px;height:76%;background:#221d30">${winGridLit(3,15)}<span class="rooftop" style="background:#2bd4ff"></span></div>
        <div class="bldg corpo" style="right:0%;width:72px;height:64%;background:#1a152a">${winGridLit(2,13)}</div>
        <div class="bank-logo" style="left:25%;top:12%">PROVINCIA</div>
        <div class="bank-logo" style="right:15%;top:10%;font-size:7px;opacity:.7">BAPRO</div>
        <div class="dash" style="right:12%;top:28%"></div>
        <div class="dash" style="left:42%;top:26%"></div>
        <div class="robot" style="left:70%"><span class="head"><span class="eye" style="left:6px"></span><span class="eye" style="right:6px"></span></span><span class="body"></span><span class="antenna"></span></div>
        <div class="cat" style="left:35%;bottom:14%"><span class="b"></span><span class="h"></span><span class="t"></span><span class="eye"></span></div>
        <div class="person" style="left:50%"></div>
        <div class="person" style="left:56%;opacity:.6"></div>
        <div class="person" style="left:84%;opacity:.5"></div>`;

      case "garage": return `
        ${skylineFar("#3a2820", 0.3)}
        <div class="window-night" style="left:44%;top:12%"></div>
        <div class="bookshelf tall" style="left:1%"></div>
        <div class="bookshelf tall" style="left:14%"></div>
        <div class="bookshelf tall" style="left:27%"></div>
        <div class="bookshelf tall" style="left:58%"></div>
        <div class="bookshelf tall" style="left:71%"></div>
        <div class="bookshelf tall" style="left:84%"></div>
        <div class="lampdesk" style="left:44%;bottom:30%"></div>
        <div class="desk" style="left:38%"></div>
        <div class="coffee" style="left:52%;bottom:30%"></div>
        <div class="cat sleep" style="left:54%;bottom:28%"><span class="b"></span><span class="h"></span><span class="t"></span><span class="zzz">z</span></div>
        <div class="plant" style="left:36%"></div>
        <div class="plant" style="right:4%"></div>`;

      case "future": return `
        <!-- amanecer sobre el mar -->
        <div class="sea sunrise"></div>
        <div class="sun-glow"></div>
        <div class="cloud" style="left:10%;top:20%"></div>
        <div class="cloud" style="left:60%;top:15%;transform:scale(.7)"></div>
        <div class="cloud" style="right:5%;top:22%;transform:scale(.6)"></div>
        <div class="bird" style="left:40%;top:24%"></div>
        <div class="bird" style="left:46%;top:20%;animation-delay:.7s"></div>
        <div class="bird" style="left:52%;top:26%;animation-delay:1.4s"></div>
        <div class="person" style="left:30%;opacity:.6"></div>
        <div class="person" style="left:36%;opacity:.5"></div>`;
      default: return "";
    }
  }

  /* carteles de estación (se renderizan en una capa aparte, SIN pixelar) */
  function signs(theme) {
    return "";
  }

  function winGrid(cols, rows, mostlyOff) {
    let s = "";
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const off = mostlyOff ? Math.random() > 0.25 : Math.random() > 0.5;
        s += `<span class="win${off ? " off" : ""}" style="left:${8 + c * 22}px;bottom:${8 + r * 16}px"></span>`;
      }
    return s;
  }

  function winGridLit(cols, rows) {
    const anims = ["twinkle", "twinkle-cold", "twinkle-warm"];
    let s = "";
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const rnd = Math.random();
        let cls = "win";
        if (rnd < 0.12) cls += " off";
        else if (rnd < 0.35) cls += " " + anims[Math.floor(Math.random() * 3)];
        const delay = rnd > 0.12 && rnd < 0.35 ? `;animation-delay:${(Math.random() * 4).toFixed(1)}s` : "";
        const bPct = (4 + r * (90 / rows)).toFixed(1);
        s += `<span class="${cls}" style="left:${8 + c * 22}px;bottom:${bPct}%${delay}"></span>`;
      }
    return s;
  }

  function rackInner() {
    let s = "";
    for (let i = 0; i < 9; i++) s += `<span class="slot" style="top:${8 + i * 16}px"></span><span class="led" style="top:${11 + i * 16}px;animation-delay:${i * 0.15}s"></span>`;
    return s;
  }

  /* skyline lejano: silueta de edificios con ventanas encendidas */
  function skylineFar(color, opacity) {
    let b = "", x = -2;
    while (x < 100) {
      const w = 5 + Math.random() * 8;
      const hh = 28 + Math.random() * 58;
      b += `<div class="sky-bldg" style="left:${x.toFixed(1)}%;width:${w.toFixed(1)}%;height:${hh.toFixed(0)}%;background:${color}">${litDots()}</div>`;
      x += w + Math.random() * 1.5;
    }
    return `<div class="skyline-layer" style="opacity:${opacity}">${b}</div>`;
  }

  /* skyline barrial (casas + algÃºn edif bajo) para UNLaM */
  function houseSkyline(color, opacity) {
    let b = "", x = -2;
    while (x < 100) {
      const w = 3 + Math.random() * 5;
      const hh = 14 + Math.random() * 22; // casas bajas
      b += `<div class="sky-bldg" style="left:${x.toFixed(1)}%;width:${w.toFixed(1)}%;height:${hh.toFixed(0)}%;background:${color}">${litDots()}</div>`;
      x += w + Math.random() * 1;
    }
    return `<div class="skyline-layer" style="opacity:${opacity}">${b}</div>`;
  }

  /* skyline corporativo (edificios altos densos) para banco */
  function corpoSkyline(color, opacity) {
    let b = "", x = -2;
    while (x < 100) {
      const w = 4 + Math.random() * 7;
      const hh = 45 + Math.random() * 45; // edificios MUY altos
      b += `<div class="sky-bldg" style="left:${x.toFixed(1)}%;width:${w.toFixed(1)}%;height:${hh.toFixed(0)}%;background:${color}">${litDots()}</div>`;
      x += w + Math.random() * 0.8;
    }
    return `<div class="skyline-layer" style="opacity:${opacity}">${b}</div>`;
  }

  function litDots() {
    let s = "", n = Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) s += `<i class="lw" style="left:${8 + Math.random() * 76}%;top:${12 + Math.random() * 74}%"></i>`;
    return s;
  }

  /* ============================================================
     RENDER de estaciones
     ============================================================ */
  function buildStations() {
    const wrap = $("#stations");
    STATIONS.forEach((st, i) => {
      const section = el("section", "station");
      section.dataset.theme = st.theme;
      section.dataset.index = i;
      section.id = "st-" + st.id;

      const sc = el("div", "station__scene");
      sc.innerHTML = scene(st.theme);
      section.appendChild(sc);
      section.appendChild(el("div", "station__ground"));

      // plataforma de estación con cartel
      if (!st.isHeader) {
        const plat = el("div", "station-platform");
        plat.innerHTML =
          `<span class="station-platform__roof"></span>` +
          `<span class="station-platform__pillar"></span>` +
          `<span class="station-platform__pillar"></span>` +
          `<span class="station-platform__sign"><span class="kanji">${st.kanji}</span>${L(st.name)}</span>` +
          `<span class="station-platform__bench"></span>`;
        section.appendChild(plat);
      }

      // capa de carteles
      const sg = signs(st.theme);
      if (sg) {
        const signLayer = el("div", "station__signs");
        signLayer.innerHTML = sg;
        section.appendChild(signLayer);
      }

      section.appendChild(st.isHeader ? buildHero() : buildPanel(st));
      wrap.appendChild(section);
    });
  }

  function buildHero() {
    const h = el("div", "hero");
    h.innerHTML = `<h1 class="hero__name">Donatella<br>Fragassi</h1>`;
    const img = el("img", "hero__photo");
    img.src = "download20260605124750.png";
    img.alt = "Donatella Fragassi";
    h.appendChild(img);
    const role = el("p", "hero__role");
    reg(role, DATA.ui.role);
    h.appendChild(role);
    return h;
  }

  function buildPanel(st) {
    const p = el("div", "panel");

    // head
    const head = el("div", "panel__head");
    head.innerHTML = `<span class="panel__kanji kanji">${st.kanji}</span>`;
    const name = el("span", "panel__name");
    reg(name, st.name);
    head.appendChild(name);
    p.appendChild(head);

    // meta
    const meta = el("div", "panel__meta");
    if (st.period) {
      const per = el("span");
      per.innerHTML = `<span class="lbl">${L(DATA.ui.period)}</span>`;
      const b = el("b");
      reg(b, st.period);
      per.appendChild(b);
      reg(per.querySelector(".lbl"), DATA.ui.period);
      meta.appendChild(per);
    }
    if (st.role) {
      const ro = el("span");
      const lbl = el("span", "lbl");
      reg(lbl, DATA.ui.roleLabel);
      const b = el("b");
      reg(b, st.role);
      ro.appendChild(lbl); ro.appendChild(b);
      meta.appendChild(ro);
    }
    p.appendChild(meta);

    // nueva lÃ­nea badge
    if (st.newLine) {
      const line = DATA.lines[st.newLine];
      const badge = el("div", "panel__newline");
      badge.style.background = line.color;
      reg(badge, { es: `${DATA.ui.newLine.es} Â· ${line.label.es}`, en: `${DATA.ui.newLine.en} Â· ${line.label.en}` });
      p.appendChild(badge);
    }

    // descripciÃ³n
    if (st.description) {
      const d = el("p", "panel__desc");
      reg(d, st.description);
      p.appendChild(d);
    }

    // tags
    if (st.tags) {
      const tags = el("div", "tags");
      st.tags.forEach((tg) => {
        const t = el("span", "tag");
        t.dataset.line = tg.l;
        t.textContent = tg.t;
        tags.appendChild(t);
      });
      p.appendChild(tags);
    }

    // proyectos
    if (st.projects) {
      const pr = el("div", "projects");
      st.projects.forEach((proj) => {
        const btn = el("span", "proj-btn");
        const lbl = el("span");
        reg(lbl, proj);
        const soon = el("small");
        reg(soon, DATA.ui.soon);
        btn.appendChild(lbl); btn.appendChild(soon);
        pr.appendChild(btn);
      });
      p.appendChild(pr);
    }

    // contacto
    if (st.isContact) {
      const c = el("div", "contact");
      c.innerHTML = `
        <a class="c-linkedin" href="${DATA.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        <a class="c-email" href="${DATA.contact.email}">Email</a>`;
      p.appendChild(c);
    }

    return p;
  }

  /* ============================================================
     MAPA DE RUTA
     ============================================================ */
  function buildRoute() {
    reg($("#routeTitle"), DATA.ui.routeTitle);
    const list = $("#routeList");
    STATIONS.forEach((st, i) => {
      const li = el("li", "route__item");
      li.dataset.index = i;
      const dot = el("span", "route__dot");
      const label = el("span", "route__label");
      const kj = el("span", "route__kanji kanji");
      kj.textContent = st.kanji;
      const nm = el("span");
      reg(nm, st.name);
      label.appendChild(kj); label.appendChild(nm);
      li.appendChild(dot); li.appendChild(label);
      li.addEventListener("click", () => goToStation(i));
      list.appendChild(li);
    });
  }

  /* ============================================================
     VÃA del tren (una sola, baja)
     ============================================================ */
  function buildRails() {
    const wrap = $("#rails");
    wrap.innerHTML = `
      <div class="track-ballast"></div>
      <div class="track-ties"></div>
      <div class="track-rail top"></div>
      <div class="track-rail bottom"></div>`;
    // rails stay in #world (not in #stations) so they don't translateX
  }

  /* ============================================================
     TREN Enoden — vagones por estación completada
     ============================================================ */
  // Vagones que se suman al PASAR cada estación (después de dejarla)
  // Cada entrada: { label, color }
  const WAGON_CONFIG = [
    // station 0 (inicio): nada
    [],
    // station 1 (UNLaM)
    [{ label: "Fundamentos", color: "#b06bff" }],
    // station 2 (CTI)
    [{ label: "Experiencia", color: "#2bd4ff" }],
    // station 3 (Circo)
    [{ label: "Crecimiento", color: "#ffb830" }],
    // station 4 (BAPRO)
    [{ label: "Expertise", color: "#ff7a4e" }, { label: "Liderazgo", color: "#ff5533" }],
    // station 5 (Propios)
    [{ label: "Autonomía", color: "#66ff9e" }],
    // station 6 (Futuro)
    [{ label: "Aspiraciones", color: "#ff9ed0" }],
  ];

  function buildTrain() { updateTrain(); }

  function updateTrain() {
    const t = $("#train");
    // vagones se agregan cuando el tren llega a la estación (scrollP >= i)
    const wagonList = [];
    for (let i = 1; i < COUNT; i++) {
      if (scrollP >= i) {
        WAGON_CONFIG[i].forEach((cfg, j) => wagonList.push({ key: `S${i}W${j}`, ...cfg }));
      }
    }
    wagonList.reverse(); // nuevos vagones se agregan atrás (cola)

    const desired = wagonList.map(w => w.key);
    const currentKeys = new Set(
      Array.from(t.querySelectorAll(".wagon:not(.is-engine)")).map(c => c.dataset.key)
    );
    const desiredSet = new Set(desired);

    // asegurar que la locomotora exista al final
    let engine = t.querySelector(".wagon.is-engine");
    if (!engine) { engine = makeWagon(null); t.appendChild(engine); }

    // nada cambió
    if (desired.length === currentKeys.size && desired.every(k => currentKeys.has(k))) return;

    // quitar vagones que ya no corresponden
    t.querySelectorAll(".wagon:not(.is-engine)").forEach(w => {
      if (!desiredSet.has(w.dataset.key)) w.remove();
    });

    // agregar vagones faltantes (al inicio = atrás de la cola)
    const existing = new Set(
      Array.from(t.querySelectorAll(".wagon:not(.is-engine)")).map(c => c.dataset.key)
    );
    for (let k = desired.length - 1; k >= 0; k--) {
      if (!existing.has(desired[k])) {
        const cfg = wagonList.find(w => w.key === desired[k]);
        const newW = makeWagon(cfg);
        t.insertBefore(newW, t.firstChild);
      }
    }
  }

  function makeWagon(cfg) {
    const w = el("div", "wagon");
    if (cfg !== null && cfg.label) {
      w.dataset.key = cfg.key;
      w.innerHTML =
        `<span class="wagon__roof"></span>` +
        `<span class="wagon__body"></span>` +
        `<span class="wagon__wheels"></span>` +
        `<span class="wagon__band" style="background:${cfg.color};box-shadow:0 0 6px ${cfg.color}"></span>` +
        `<span class="wagon__flag" style="background:${cfg.color};border-color:${cfg.color}">${cfg.label}</span>`;
    } else {
      w.classList.add("is-engine");
      w.dataset.key = "engine";
      w.innerHTML =
        `<span class="wagon__panto"></span>` +
        `<span class="wagon__roof"></span>` +
        `<span class="wagon__body"></span>` +
        `<span class="wagon__wheels"></span>` +
        `<span class="wagon__head"></span>`;
    }
    return w;
  }

  /* ============================================================
     MOTOR DE SCROLL
     ============================================================ */
  const journey = $("#journey");
  const stationsEl = $("#stations");
  const railsEl = $("#rails");
  const far = $("#far");
  const sky = $("#sky");
  const skyStars = $("#skyStars");
  const skySun = $("#skySun");
  const skyMoon = $("#skyMoon");
  const sections = [];
  let mode = "h";
  let maxReached = 0;
  let currentStation = 0;
  let scrollP = 0; // posición continua del scroll (0..COUNT)
  let ticking = false;

  const mqMobile = window.matchMedia("(max-width: 880px)");

  function setMode() {
    mode = mqMobile.matches ? "v" : "h";
    document.body.classList.toggle("mode-horizontal", mode === "h");
    document.body.classList.toggle("mode-vertical", mode === "v");
    layout();
    onScroll();
  }

  function layout() {
    if (mode === "h") {
      // scroll generoso: estaciones + extra para que la última se pase bien
      journey.style.height = (COUNT * 100 + 50) + "vh";
    } else {
      journey.style.height = "";
    }
  }

  /* ---- interpolaciÃ³n de color ---- */
  function hexToRgb(h) {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function mixHex(h1, h2, t) {
    const a = hexToRgb(h1), b = hexToRgb(h2);
    return `rgb(${lerp(a[0], b[0], t)},${lerp(a[1], b[1], t)},${lerp(a[2], b[2], t)})`;
  }
  function applySky(p) {
    const idx = Math.min(COUNT - 1, Math.floor(p));
    const next = Math.min(COUNT - 1, idx + 1);
    const t = p - idx;
    const a = THEMES[STATIONS[idx].theme];
    const b = THEMES[STATIONS[next].theme];
    sky.style.setProperty("--sky-top", mixHex(a.top, b.top, t));
    sky.style.setProperty("--sky-bottom", mixHex(a.bottom, b.bottom, t));
    sky.style.setProperty("--accent", mixHex(a.accent, b.accent, t));
    skyStars.style.opacity = (a.stars + (b.stars - a.stars) * t).toFixed(2);
    skySun.style.opacity = (a.sun + (b.sun - a.sun) * t).toFixed(2);
    skyMoon.style.opacity = (a.moon + (b.moon - a.moon) * t).toFixed(2);
  }

  function setActive(index) {
    if (index > maxReached) maxReached = Math.min(index, COUNT - 1);
    currentStation = index; // puede ser COUNT ("pasó la última")
    const ci = Math.min(index, COUNT - 1); // clamped para arrays
    // estaciones: revelar panel (permanente)
    sections.forEach((s, i) => {
      if (i <= Math.min(maxReached, COUNT - 1)) s.classList.add("is-active");
    });
    sections[ci] && sections[ci].classList.add("is-active");
    // route
    document.querySelectorAll(".route__item").forEach((li, i) => {
      li.classList.toggle("is-active", i === ci);
      li.classList.toggle("is-visited", i < ci || (i <= maxReached && i !== ci));
    });
    // tren: enganchar/desenganchar vagones según posición actual
    updateTrain();
  }

  function onScroll() {
    if (mode === "h") {
      const vw = window.innerWidth;
      const total = journey.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - journey.offsetTop, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const p = progress * COUNT;
      const pClamped = Math.min(p, COUNT - 1);

      const tx = -(pClamped / (COUNT - 1)) * (COUNT - 1) * vw;
      stationsEl.style.transform = `translateX(${tx}px)`;
      far.style.transform = `translateX(${(-(pClamped / (COUNT - 1)) * vw * 0.25).toFixed(1)}px)`;

      // tren avanza continuamente dentro del viewport
      const trainEl = $("#train");
      const trainProgress = Math.min(progress, 1);
      const trainX = (0.15 + trainProgress * 0.70) * vw;
      const trainW = trainEl.scrollWidth || 96;
      trainEl.style.transform = `translateX(${(trainX - trainW).toFixed(0)}px)`;

      applySky(pClamped);
      scrollP = p;
      setActive(Math.round(p));
    } else {
      // vertical: scroll nativo
      far.style.transform = `translateY(${(-window.scrollY * 0.05).toFixed(1)}px)`;
    }
    // ocultar hint al avanzar
    if (window.scrollY > 40) hint.classList.add("is-hidden");
    else hint.classList.remove("is-hidden");
  }

  function requestScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }
  }

  function goToStation(i) {
    if (mode === "h") {
      const total = journey.offsetHeight - window.innerHeight;
      const y = journey.offsetTop + (i / COUNT) * total;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      sections[i].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  /* ---- IntersectionObserver para modo vertical ---- */
  function setupObserver() {
    const io = new IntersectionObserver((entries) => {
      if (mode !== "v") return;
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = +e.target.dataset.index;
          const th = THEMES[STATIONS[i].theme];
          sky.style.setProperty("--sky-top", th.top);
          sky.style.setProperty("--sky-bottom", th.bottom);
          sky.style.setProperty("--accent", th.accent);
          skyStars.style.opacity = th.stars;
          skySun.style.opacity = th.sun;
          skyMoon.style.opacity = th.moon;
          setActive(i);
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => io.observe(s));
  }

  /* ============================================================
     AMBIENTE: pÃ©talos de cerezo
     ============================================================ */
  function setupAmbient() {
    if (reduceMotion) return;
    const canvas = $("#ambient");
    const ctx = canvas.getContext("2d");
    let w, h, petals = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const n = Math.min(40, Math.floor(w / 40));
      petals = Array.from({ length: n }, () => spawn());
    }
    function spawn() {
      return {
        x: Math.random() * w, y: Math.random() * h,
        s: 3 + Math.random() * 4, vy: 0.4 + Math.random() * 0.9,
        vx: -0.4 + Math.random() * 0.8, rot: Math.random() * 6.28,
        vr: -0.04 + Math.random() * 0.08,
        c: Math.random() > 0.5 ? "#ffc3dd" : "#ff9ec7",
      };
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.y += p.vy; p.x += p.vx; p.rot += p.vr;
        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c; ctx.globalAlpha = 0.85;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); // pÃ©talo pixelado
        ctx.restore();
      });
      requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);
    resize(); tick();
  }

  /* ============================================================
     INIT
     ============================================================ */
  const hint = $("#scrollHint");

  function init() {
    // CSS var con el nÃºmero de estaciones
    document.documentElement.style.setProperty("--station-count", COUNT);

    buildStations();
    buildRoute();
    buildRails();
    buildTrain();

    sections.push(...document.querySelectorAll(".station"));

    // textos UI estÃ¡ticos
    reg($("#scrollHintText"), DATA.ui.scrollHint);

    // toggle de idioma
    $("#langToggle").addEventListener("click", () => {
      lang = lang === "es" ? "en" : "es";
      document.querySelectorAll(".lang-toggle__opt").forEach((o) =>
        o.classList.toggle("is-active", o.dataset.lang === lang));
      applyLang();
    });

    // reproductor de música (sin autoplay ni triggers automáticos)
    const audioTrack = $("#audioTrack");
    const playBtn = $("#playBtn");

    function syncMusicButton() {
      playBtn.textContent = audioTrack.paused ? "▶" : "⏸";
    }

    audioTrack.addEventListener("play", syncMusicButton);
    audioTrack.addEventListener("pause", syncMusicButton);
    audioTrack.addEventListener("ended", syncMusicButton);

    playBtn.addEventListener("click", () => {
      if (audioTrack.paused) audioTrack.play();
      else audioTrack.pause();
    });

    // pequeño cartel flotante junto a los botones que dura 5s
    const musicHint = $("#musicHint");
    if (musicHint) {
      // aseguramos que esté visible y se oculte después de 5s
      musicHint.classList.remove('hidden');
      setTimeout(() => musicHint.classList.add('hidden'), 5000);
    }

    applyLang();
    setMode();
    setupObserver();
    setupAmbient();

    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", () => { setMode(); requestScroll(); });
    mqMobile.addEventListener("change", setMode);

    setActive(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
