(function () {
  const { esc } = FT;
  const params = new URLSearchParams(location.search);
  const start = FT.get(params.get("start")) || FT.defaultStart();
  const focusId = params.get("focus");

  const viewport = document.getElementById("viewport");
  const tree = document.getElementById("tree");

  document.getElementById("title").textContent = FT.data.title || "Родинне дерево";
  document.getElementById("subtitle").textContent = FT.data.subtitle || "";
  document.title = FT.data.title || document.title;

  // ---------- Розмітка дерева ----------

  const RINGS = `<span class="rings" aria-hidden="true"><svg viewBox="0 0 28 16"><circle cx="10" cy="8" r="6"/><circle cx="18" cy="8" r="6"/></svg></span>`;

  const GHOST = `<span class="card ghost"><span class="avatar avatar-empty">?</span><span class="card-name">Невідомо</span></span>`;

  function card(p, note, side) {
    const cls = ["card", p.gender === "f" ? "f" : "m", p.death ? "deceased" : "", p === start ? "me" : "", side ? "side" : ""].join(" ");
    return `<a class="${cls}" href="${FT.personUrl(p)}" data-id="${esc(p.id)}">
      ${FT.avatar(p)}
      <span class="card-name">${esc(p.firstName || "")}<b>${esc(p.lastName || "")}</b></span>
      ${note ? `<span class="card-note">${esc(note)}</span>` : ""}
      <span class="card-years">${esc(FT.lifespan(p))}</span>
    </a>`;
  }

  const SIB = `<span class="sib-dash" aria-hidden="true"></span>`;

  const couple = (list, side, note) =>
    `<div class="couple">${list.map((x, i) => card(x, i === 0 ? note : "", side)).join(RINGS)}</div>`;

  // Людина з подружжям, над ними їхні діти, онуки і далі вгору.
  function family(p, seen, side, note) {
    const group = [p, ...FT.spouses(p).map(m => m.person)].filter(x => !seen.has(x.id));
    group.forEach(x => seen.add(x.id));
    const kids = FT.children(p).filter(c => !seen.has(c.id)).map(c => `<li>${family(c, seen, side)}</li>`);
    return `${kids.length ? `<ul class="sibs has-parents">${kids.join("")}</ul>` : ""}${couple(group, side, note)}`;
  }

  // Брати й сестри предка з їхніми сім'ями стоять поруч: у батька зліва, у матері справа.
  function sideBranches(p, seen) {
    return FT.siblings(p).filter(s => !seen.has(s.id))
      .map(s => `<div class="side-group">${family(s, seen, true, s.gender === "f" ? "сестра" : "брат")}</div>`);
  }

  // Батьки людини, під ними їхні батьки: лінія батька зліва, матері справа.
  function parentsNode(p, seen) {
    const pair = [FT.get(p.fatherId), FT.get(p.motherId)].filter(Boolean);
    if (!pair.length || pair.some(x => seen.has(x.id))) return "";
    pair.forEach(x => seen.add(x.id));
    const left = pair.length > 1 ? sideBranches(pair[0], seen) : [];
    const right = sideBranches(pair[pair.length - 1], seen);
    const up = pair.map(x => parentsNode(x, seen));
    const branches = up.some(Boolean)
      ? `<ul>${up.map(u => u || `<li>${GHOST}</li>`).join("")}</ul>`
      : "";
    // Сітка з рівними боковими колонками тримає пару по центру над лініями.
    return `<li>
      <div class="gen-row">
        <div class="gen-side left">${left.map(b => b + SIB).join("")}</div>
        <div class="gen-mid">${couple(pair)}</div>
        <div class="gen-side right">${right.map(b => SIB + b).join("")}</div>
      </div>
      ${branches}
    </li>`;
  }

  if (!start) {
    tree.innerHTML = `<p class="empty">Додайте людей у файл data/family.js</p>`;
    return;
  }

  const seen = new Set();
  const top = [start, ...FT.siblings(start)].sort(FT.byBirth).map(s => `<li>${family(s, seen)}</li>`);
  const anc = parentsNode(start, seen);
  tree.innerHTML = `<ul class="sibs${anc ? " has-parents" : ""}">${top.join("")}</ul>${anc ? `<ul class="anc">${anc}</ul>` : ""}`;

  // ---------- Масштаб і переміщення ----------

  let scale = 1, tx = 0, ty = 0;
  const MIN = 0.2, MAX = 2.5;
  const apply = () => { tree.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`; };

  function fit() {
    const vw = viewport.clientWidth, vh = viewport.clientHeight;
    const w = tree.offsetWidth, h = tree.offsetHeight;
    scale = Math.max(MIN, Math.min(1, (vw - 48) / w, (vh - 48) / h));
    tx = (vw - w * scale) / 2;
    ty = Math.max(24, (vh - h * scale) / 2);
    apply();
  }

  function zoomAt(factor, cx, cy) {
    const next = Math.min(MAX, Math.max(MIN, scale * factor));
    tx = cx - (cx - tx) * (next / scale);
    ty = cy - (cy - ty) * (next / scale);
    scale = next;
    apply();
  }

  function zoomCenter(factor) {
    zoomAt(factor, viewport.clientWidth / 2, viewport.clientHeight / 2);
  }

  function focusOn(id) {
    const el = tree.querySelector(`[data-id="${CSS.escape(id)}"]`);
    if (!el) return false;
    tree.querySelectorAll(".focused").forEach(c => c.classList.remove("focused"));
    el.classList.add("focused");
    const t = tree.getBoundingClientRect(), r = el.getBoundingClientRect();
    const x = (r.left - t.left + r.width / 2) / scale, y = (r.top - t.top + r.height / 2) / scale;
    scale = Math.max(scale, 0.9);
    tx = viewport.clientWidth / 2 - x * scale;
    ty = viewport.clientHeight / 2 - y * scale;
    tree.classList.add("animate");
    apply();
    setTimeout(() => tree.classList.remove("animate"), 400);
    return true;
  }

  document.getElementById("zoom-in").onclick = () => zoomCenter(1.25);
  document.getElementById("zoom-out").onclick = () => zoomCenter(0.8);
  document.getElementById("zoom-fit").onclick = fit;

  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  // Перетягування мишею/пальцем, щипок двома пальцями.
  const pointers = new Map();
  let dragged = false, pinchDist = 0;

  viewport.addEventListener("pointerdown", e => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged = false;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });

  viewport.addEventListener("pointermove", e => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.set(e.pointerId, cur);

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = viewport.getBoundingClientRect();
      if (pinchDist) zoomAt(d / pinchDist, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinchDist = d;
      dragged = true;
      return;
    }

    const dx = cur.x - prev.x, dy = cur.y - prev.y;
    if (!dragged && Math.hypot(dx, dy) < 3) {
      pointers.set(e.pointerId, prev);
      return;
    }
    if (!dragged) {
      dragged = true;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("dragging");
    }
    tx += dx; ty += dy;
    apply();
  });

  const release = e => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (!pointers.size) viewport.classList.remove("dragging");
  };
  viewport.addEventListener("pointerup", release);
  viewport.addEventListener("pointercancel", release);

  // Клік після перетягування не повинен відкривати сторінку людини.
  viewport.addEventListener("click", e => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
  }, true);

  window.addEventListener("resize", fit);

  // ---------- Пошук ----------

  const input = document.getElementById("search");
  const results = document.getElementById("search-results");

  function choose(p) {
    results.hidden = true;
    input.value = FT.shortName(p);
    if (!focusOn(p.id)) location.href = FT.treeUrl(p);
  }

  input.addEventListener("input", () => {
    const found = FT.search(input.value).slice(0, 8);
    results.innerHTML = found.map(p => `<li><button data-id="${esc(p.id)}">
        ${FT.avatar(p, "avatar-sm")}
        <span>${esc(FT.fullName(p))}<small>${esc(FT.lifespan(p))}</small></span>
      </button></li>`).join("") || (input.value.trim() ? `<li class="none">Нікого не знайдено</li>` : "");
    results.hidden = !results.innerHTML;
  });

  results.addEventListener("click", e => {
    const b = e.target.closest("button[data-id]");
    if (b) choose(FT.get(b.dataset.id));
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const first = results.querySelector("button[data-id]");
      if (first) choose(FT.get(first.dataset.id));
    }
    if (e.key === "Escape") results.hidden = true;
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".search")) results.hidden = true;
  });

  // ---------- Старт ----------

  const init = () => {
    fit();
    if (focusId) focusOn(focusId);
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(init);
  else init();
})();
