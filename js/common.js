// Спільні хелпери для дерева та сторінки людини.
(function () {
  const DATA = window.FAMILY || { people: [] };
  const people = DATA.people;
  const byId = new Map(people.map(p => [p.id, p]));

  // Шлюби симетричні: достатньо вказати spouses в одного з пари.
  const marriages = new Map(people.map(p => [p.id, []]));
  for (const p of people) {
    for (const s of p.spouses || []) {
      if (!byId.has(s.id)) continue;
      const info = { married: s.married, divorced: s.divorced };
      if (!marriages.get(p.id).some(m => m.id === s.id)) marriages.get(p.id).push({ id: s.id, ...info });
      if (!marriages.get(s.id).some(m => m.id === p.id)) marriages.get(s.id).push({ id: p.id, ...info });
    }
  }

  const MONTHS = ["січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Дата "1925-03-14", "1925-03", "1925" або без року "--03-14".
  const year = d => (String(d || "").match(/^\d{4}/) || [""])[0];
  // Без року народження йдуть у кінець.
  const birthKey = p => (year(p.birth?.date) ? String(p.birth.date) : "9999");
  const byBirth = (a, b) => birthKey(a).localeCompare(birthKey(b));

  const FT = {
    data: DATA,
    esc,
    year,
    get: id => byId.get(id),
    all: () => people,

    shortName: p => [p.firstName, p.lastName].filter(Boolean).join(" "),
    fullName: p => [p.lastName, p.firstName, p.patronymic].filter(Boolean).join(" "),

    formatDate(d) {
      if (!d) return "";
      const [y, m, day] = String(d).replace(/^--/, "-").split("-");
      if (day) return `${+day} ${MONTHS[+m - 1]}${y ? " " + y : ""}`;
      if (m) return `${MONTHS[+m - 1]} ${y}`;
      return `${y}`;
    },

    lifespan(p) {
      const b = year(p.birth?.date), d = year(p.death?.date);
      if (p.death && !b) return d ? `пом. ${d}` : "";
      if (p.death || FT.surelyDeceased(p)) return `${b} – ${d || "?"}`;
      return b ? `нар. ${b}` : "";
    },

    // Дата смерті невідома, але людина народилась понад 105 років тому.
    surelyDeceased: p => !p.death && year(p.birth?.date) && new Date().getFullYear() - year(p.birth.date) > 105,

    age(p) {
      const b = p.birth?.date;
      if (!year(b) || FT.surelyDeceased(p)) return null;
      const end = p.death ? p.death.date : new Date().toISOString().slice(0, 10);
      if (!end) return null;
      const [by, bm = 1, bd = 1] = String(b).split("-").map(Number);
      const [ey, em = 12, ed = 31] = String(end).split("-").map(Number);
      let a = ey - by;
      if (em < bm || (em === bm && ed < bd)) a--;
      return a >= 0 ? a : null;
    },

    yearsWord(n) {
      const t = n % 100, u = n % 10;
      if (t >= 11 && t <= 14) return "років";
      if (u === 1) return "рік";
      if (u >= 2 && u <= 4) return "роки";
      return "років";
    },

    parents: p => [p.fatherId, p.motherId].map(id => byId.get(id)).filter(Boolean),
    children: p => people.filter(c => c.fatherId === p.id || c.motherId === p.id).sort(byBirth),
    spouses: p => (marriages.get(p.id) || []).map(m => ({ ...m, person: byId.get(m.id) })),
    siblings: p => people.filter(s => s.id !== p.id &&
      ((p.fatherId && s.fatherId === p.fatherId) || (p.motherId && s.motherId === p.motherId))).sort(byBirth),

    byBirth,

    // Людина, від якої будується дерево за замовчуванням.
    defaultStart: () => byId.get(DATA.startId) || people[0],

    // Хто потрапляє в дерево від start: start, брати й сестри, їхні нащадки, подружжя і всі предки.
    chartIds(start) {
      const ids = new Set();
      const down = [start, ...FT.siblings(start)];
      while (down.length) {
        const s = down.pop();
        if (ids.has(s.id)) continue;
        ids.add(s.id);
        FT.spouses(s).forEach(m => ids.add(m.id));
        down.push(...FT.children(s));
      }
      const stack = [start];
      while (stack.length) {
        for (const x of FT.parents(stack.pop())) {
          if (ids.has(x.id)) continue;
          ids.add(x.id);
          // Брати й сестри предка з подружжям і всіма нащадками.
          const side = FT.siblings(x);
          while (side.length) {
            const s = side.pop();
            if (ids.has(s.id)) continue;
            ids.add(s.id);
            FT.spouses(s).forEach(m => ids.add(m.id));
            side.push(...FT.children(s));
          }
          stack.push(x);
        }
      }
      return ids;
    },

    initials: p => ((p.firstName || "")[0] || "") + ((p.lastName || "")[0] || ""),

    avatar(p, cls = "") {
      const g = p.gender === "f" ? "f" : "m";
      if (p.photo) return `<img class="avatar ${cls}" src="${esc(p.photo)}" alt="${esc(FT.shortName(p))}" loading="lazy">`;
      return `<span class="avatar avatar-empty ${g} ${cls}" aria-hidden="true">${esc(FT.initials(p))}</span>`;
    },

    personUrl: p => `person.html?id=${encodeURIComponent(p.id)}`,
    treeUrl(p) {
      const id = encodeURIComponent(p.id);
      if (FT.chartIds(FT.defaultStart()).has(p.id)) return `index.html?focus=${id}`;
      return `index.html?start=${id}&focus=${id}`;
    },

    search(q) {
      q = q.trim().toLowerCase();
      if (!q) return [];
      return people.filter(p =>
        [p.firstName, p.lastName, p.patronymic, p.maidenName].filter(Boolean).join(" ").toLowerCase().includes(q));
    }
  };

  window.FT = FT;
})();
