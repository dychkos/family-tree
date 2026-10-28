(function () {
  const { esc } = FT;
  const main = document.getElementById("person");
  const p = FT.get(new URLSearchParams(location.search).get("id"));

  if (!p) {
    main.innerHTML = `<section class="panel empty"><h1>Людину не знайдено</h1><p><a href="index.html">Повернутися до дерева</a></p></section>`;
    return;
  }

  document.title = `${FT.shortName(p)} · ${FT.data.title || "Родинне дерево"}`;
  document.getElementById("back").href = FT.treeUrl(p);

  const f = p.gender === "f";
  const age = FT.age(p);

  function place(pl) { return pl ? `<span class="place">${esc(pl)}</span>` : ""; }

  function mini(person, note) {
    return `<a class="mini ${person.gender === "f" ? "f" : "m"}" href="${FT.personUrl(person)}">
      ${FT.avatar(person, "avatar-sm")}
      <span><b>${esc(FT.shortName(person))}</b><small>${esc([note, FT.lifespan(person)].filter(Boolean).join(" · "))}</small></span>
    </a>`;
  }

  function group(title, items) {
    if (!items.length) return "";
    return `<div class="rel-group"><h3>${title}</h3><div class="mini-list">${items.join("")}</div></div>`;
  }

  const parents = FT.parents(p).map(x => mini(x, x.gender === "f" ? "мати" : "батько"));
  const spouses = FT.spouses(p).map(s => {
    const note = [s.married && `шлюб ${FT.formatDate(s.married)}`, s.divorced && `розлучення ${FT.formatDate(s.divorced)}`]
      .filter(Boolean).join(", ");
    return mini(s.person, note);
  });
  const siblings = FT.siblings(p).map(x => mini(x, x.gender === "f" ? "сестра" : "брат"));
  const children = FT.children(p).map(x => mini(x, x.gender === "f" ? "донька" : "син"));

  const facts = Object.entries(p.facts || {});
  const bio = (p.bio || "").split(/\n\s*\n/).filter(s => s.trim());
  const events = p.events || [];
  const gallery = p.gallery || [];

  main.innerHTML = `
    <section class="hero">
      <div class="hero-photo">${FT.avatar(p, "avatar-xl")}</div>
      <div class="hero-text">
        <h1>${esc(p.firstName || "")} <span>${esc(p.lastName || "")}</span></h1>
        ${p.patronymic ? `<p class="patronymic">${esc(p.patronymic)}</p>` : ""}
        ${p.maidenName ? `<p class="maiden">${f ? "дівоче прізвище" : "прізвище при народженні"}: ${esc(p.maidenName)}</p>` : ""}
        <dl class="vitals">
          ${p.birth ? `<div><dt>${f ? "Народилася" : "Народився"}</dt><dd>${esc(FT.formatDate(p.birth.date))}${place(p.birth.place)}</dd></div>` : ""}
          ${p.death ? `<div><dt>${f ? "Померла" : "Помер"}</dt><dd>${esc(FT.formatDate(p.death.date))}${place(p.death.place)}</dd></div>` : ""}
          ${p.death?.burial ? `<div><dt>Поховання</dt><dd>${esc(p.death.burial)}</dd></div>` : ""}
          ${age !== null ? `<div><dt>${p.death ? "Прожито" : "Вік"}</dt><dd>${age} ${FT.yearsWord(age)}</dd></div>` : ""}
        </dl>
      </div>
    </section>

    ${facts.length ? `<section class="panel">
      <h2>Факти</h2>
      <dl class="facts">${facts.map(([k, v]) => Array.isArray(v)
        ? `<div class="wide"><dt>${esc(k)}</dt><dd><ul>${v.map(x => `<li>${esc(x)}</li>`).join("")}</ul></dd></div>`
        : `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    </section>` : ""}

    ${bio.length ? `<section class="panel">
      <h2>Історія</h2>
      <div class="bio">${bio.map(t => `<p>${esc(t)}</p>`).join("")}</div>
    </section>` : ""}

    ${events.length ? `<section class="panel">
      <h2>Події життя</h2>
      <ol class="timeline">${events.map(e => `<li>
        <time>${esc(FT.formatDate(e.date))}</time>
        <div><b>${esc(e.title || "")}</b>${e.text ? `<p>${esc(e.text)}</p>` : ""}</div>
      </li>`).join("")}</ol>
    </section>` : ""}

    ${parents.length + spouses.length + siblings.length + children.length ? `<section class="panel">
      <h2>Родина</h2>
      ${group("Батьки", parents)}
      ${group(spouses.length > 1 ? "Подружжя" : (f ? "Чоловік" : "Дружина"), spouses)}
      ${group("Брати й сестри", siblings)}
      ${group("Діти", children)}
    </section>` : ""}

    ${gallery.length ? `<section class="panel">
      <h2>Світлини</h2>
      <div class="gallery">${gallery.map(g => `<figure>
        <a href="${esc(g.src)}" target="_blank" rel="noopener"><img src="${esc(g.src)}" alt="${esc(g.caption || "")}" loading="lazy"></a>
        ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
      </figure>`).join("")}</div>
    </section>` : ""}

    <p class="to-tree"><a href="${FT.treeUrl(p)}">Показати в дереві →</a></p>
  `;
})();
