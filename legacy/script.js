(() => {
  const profile = window.PROFILE;
  if (!profile) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const safeText = (value) => (value == null ? "" : String(value));

  const setText = (sel, value) => {
    const el = $(sel);
    if (!el) return;
    el.textContent = safeText(value);
  };

  const setHTML = (sel, html) => {
    const el = $(sel);
    if (!el) return;
    el.innerHTML = html;
  };

  const icon = (name) => {
    if (name === "pin") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-4.44 7-11a7 7 0 1 0-14 0c0 6.56 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
    }
    if (name === "mail") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v10H4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
    }
    if (name === "link") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.9 3.03" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 11a5 5 0 0 0-7.07 0L4.8 13.13a5 5 0 0 0 7.07 7.07l1.1-1.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (name === "phone") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h3l2 5-2 2c1.5 3 3.5 5 6.5 6.5l2-2 5 2v3c0 1-1 2-2 2C10 22 2 14 2 4c0-1 1-1 2-1h3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
    }
    return "";
  };

  const toMailto = (email) => `mailto:${encodeURIComponent(email)}`;
  const toTel = (phone) => `tel:${phone.replace(/\s+/g, "")}`;

  // Theme
  const THEME_KEY = "hb_theme";
  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const btn = $(".theme-toggle");
    if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  const initTheme = () => {
    applyTheme(getPreferredTheme());
    const btn = $(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  };

  // Mobile nav
  const initNav = () => {
    const toggle = $(".nav-toggle");
    const panel = $("#nav-panel");
    if (!toggle || !panel) return;

    const close = () => {
      panel.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      panel.dataset.open = "true";
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
      if (panel.dataset.open === "true") close();
      else open();
    });

    panel.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") close();
    });

    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  const initActiveNav = () => {
    const current = (() => {
      const p = window.location.pathname || "";
      if (p.endsWith("/") || p === "") return "index.html";
      const last = p.split("/").filter(Boolean).pop();
      return last || "index.html";
    })();

    $$("a[data-nav]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const file = (() => {
        if (href === "./" || href === "/" || href === "") return "index.html";
        const cleaned = href.split("#")[0].split("?")[0];
        const last = cleaned.split("/").filter(Boolean).pop();
        return last || "index.html";
      })();

      a.dataset.active = file === current ? "true" : "false";
    });
  };

  const initReveal = () => {
    // Auto-mark common blocks for reveal animations (so you don't have to add the class everywhere).
    $$(".section-head, .page-hero .container > *, .hero-copy > *, .hero-card").forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });

    const els = $$(".reveal");
    if (els.length === 0) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.style.transitionDelay = "0ms";
        el.classList.add("in");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number(e.target.dataset.revealIndex || "0");
          e.target.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "80px 0px -10px 0px" },
    );

    els.forEach((el, i) => {
      el.dataset.revealIndex = String(i % 8);
      io.observe(el);
    });
  };

  // Content rendering
  const renderHero = () => {
    setText("#hero-kicker", profile.heroKicker || "HEY");
    setText("#hero-title", profile.heroTitle || (profile.preferredName ? `I’m ${profile.preferredName}.` : "I’m Hari."));
    setText("#hero-subtitle", profile.heroSubtitle || profile.roleHeadline || "");
    setText("#hero-summary", profile.heroSummary || profile.summary);
    setText("#card-name", profile.preferredName || profile.name);
    setText("#card-role", profile.roleHeadline);
    setText("#footer-name", profile.preferredName || profile.name);

    const meta = $("#hero-meta");
    if (meta) {
      const items = [];
      if (profile.location) items.push({ icon: "pin", text: profile.location });
      if (profile.email) items.push({ icon: "mail", text: profile.email });
      if (profile.phone) items.push({ icon: "phone", text: profile.phone });
      meta.innerHTML = items
        .map((it) => `<li>${icon(it.icon)}<span>${safeText(it.text)}</span></li>`)
        .join("");
    }

    const emailCta = $("#email-cta");
    if (emailCta && profile.email) emailCta.href = toMailto(profile.email);

    const links = $("#hero-links");
    if (links) {
      const linkItems = [];
      if (profile.linkedin) linkItems.push({ label: "LinkedIn", href: profile.linkedin });
      if (profile.github) linkItems.push({ label: "GitHub", href: profile.github });
      if (profile.email) linkItems.push({ label: "Email", href: toMailto(profile.email) });
      links.innerHTML = linkItems
        .map(
          (l) =>
            `<a href="${l.href}" target="_blank" rel="noreferrer">${icon("link")}<span>${l.label}</span></a>`,
        )
        .join("");
    }
  };

  const renderAbout = () => {
    setText("#about-summary", profile.summary);

    const tags = $("#about-tags");
    if (tags) {
      tags.innerHTML = (profile.highlights || [])
        .map((t) => `<span class="tag">${safeText(t)}</span>`)
        .join("");
    }

    const focus = $("#focus-areas");
    if (focus) {
      focus.innerHTML = (profile.focusAreas || []).map((i) => `<li>${safeText(i)}</li>`).join("");
    }
  };

  const renderTimeline = (targetSel, items) => {
    const root = $(targetSel);
    if (!root) return;

    root.innerHTML = (items || [])
      .map((it) => {
        const title = `${safeText(it.title || it.school || it.name || it.company)}${it.company ? ` — ${safeText(it.company)}` : ""}`;
        const meta = [
          it.location ? safeText(it.location) : "",
          it.start || it.end ? `${safeText(it.start || "")} — ${safeText(it.end || "")}` : "",
        ]
          .filter(Boolean)
          .join(" • ");

        const bullets = (it.bullets || it.notes || [])
          .map((b) => `<li>${safeText(b)}</li>`)
          .join("");

        const bodyParts = [];
        if (it.summary) bodyParts.push(`<p class="muted">${safeText(it.summary)}</p>`);
        if (bullets) bodyParts.push(`<ul>${bullets}</ul>`);

        return `<article class="item reveal">
          <div class="item-head">
            <div class="item-title">${title}</div>
            <div class="item-meta">${meta}</div>
          </div>
          <div class="item-body">${bodyParts.join("")}</div>
        </article>`;
      })
      .join("");
  };

  const scoreForSde = (p) => {
    const text = `${safeText(p.name)} ${safeText(p.tagline)} ${safeText(p.description)} ${(p.tech || []).join(" ")} ${(p.bullets || []).join(" ")}`.toLowerCase();
    const weights = [
      ["\\brest\\b", 6],
      ["api", 5],
      ["jwt", 6],
      ["auth", 5],
      ["spring", 6],
      ["flask", 5],
      ["mysql", 5],
      ["sqlite", 3],
      ["testing", 4],
      ["unit", 3],
      ["clean", 3],
      ["docker", 4],
      ["ci", 4],
      ["git", 3],
    ];
    return weights.reduce((sum, [pattern, w]) => {
      const re = new RegExp(pattern);
      return re.test(text) ? sum + w : sum;
    }, 0);
  };

  const renderProjects = (opts = {}) => {
    const grid = $("#project-grid");
    if (!grid) return;

    const projects = Array.isArray(opts.projects) ? opts.projects : profile.projects || [];
    grid.innerHTML = projects
      .map((p) => {
        const tech = (p.tech || []).map((t) => `<span class="tag">${safeText(t)}</span>`).join("");
        const bullets = (p.bullets || []).map((b) => `<li>${safeText(b)}</li>`).join("");
        const links = (p.links || [])
          .map((l) => `<a href="${l.href}" target="_blank" rel="noreferrer">${safeText(l.label)}</a>`)
          .join("");
        return `<article class="card reveal">
          <h3>${safeText(p.name)}</h3>
          <p class="muted">${safeText(p.tagline || "")}</p>
          <p class="muted" style="margin-top:10px">${safeText(p.description || "")}</p>
          <div class="tag-row" aria-label="Tech stack">${tech}</div>
          ${bullets ? `<ul class="list" style="margin-top:12px">${bullets}</ul>` : ""}
          ${links ? `<div class="project-links" aria-label="Project links">${links}</div>` : ""}
        </article>`;
      })
      .join("");
  };

  const renderSkills = () => {
    const grid = $("#skills-grid");
    if (!grid) return;

    grid.innerHTML = (profile.skills || [])
      .map((g) => {
        const tags = (g.items || []).map((t) => `<span class="tag">${safeText(t)}</span>`).join("");
        return `<article class="card reveal">
          <h3>${safeText(g.label)}</h3>
          <div class="tag-row">${tags}</div>
        </article>`;
      })
      .join("");
  };

  const renderCerts = () => {
    const list = $("#cert-list");
    if (!list) return;
    list.innerHTML = (profile.certifications || []).map((c) => `<li>${safeText(c)}</li>`).join("");
  };

  const renderContact = () => {
    const root = $("#contact-actions");
    if (!root) return;
    const parts = [];

    if (profile.email) parts.push(`<a class="btn btn-primary" href="${toMailto(profile.email)}">Email</a>`);
    if (profile.github) parts.push(`<a class="btn" href="${profile.github}" target="_blank" rel="noreferrer">GitHub</a>`);
    if (profile.linkedin)
      parts.push(`<a class="btn" href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>`);
    if (profile.phone) parts.push(`<a class="btn btn-ghost" href="${toTel(profile.phone)}">Call</a>`);

    root.innerHTML = parts.join("");
  };

  const initAboutExtras = () => {
    const list = $("#expectations");
    if (!list) return;
    const items = [
      "Readable code, small diffs, and clear commit history (Git-first).",
      "API-first thinking: contracts, edge cases, and clean error handling.",
      "Practical security: auth, permissions, and safe defaults.",
      "Performance-minded UX: responsive layouts and fast interactions.",
    ];
    list.innerHTML = items.map((i) => `<li>${safeText(i)}</li>`).join("");
  };

  const initProjectFilters = () => {
    const search = $("#project-search");
    const chipRoot = $("#tech-chips");
    const count = $("#project-count");
    if (!search || !chipRoot) return;

    const all = profile.projects || [];
    const techs = Array.from(
      new Set(
        all
          .flatMap((p) => p.tech || [])
          .map((t) => safeText(t).trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const state = {
      q: "",
      activeTech: new Set(),
      sortMode: "default",
    };

    const renderChips = () => {
      chipRoot.innerHTML = techs
        .map((t) => {
          const pressed = state.activeTech.has(t);
          return `<button class="chip" type="button" aria-pressed="${pressed ? "true" : "false"}" data-tech="${t}">${safeText(t)}</button>`;
        })
        .join("");
    };

    const matches = (p) => {
      const q = state.q.trim().toLowerCase();
      const hay = `${safeText(p.name)} ${safeText(p.tagline)} ${safeText(p.description)} ${(p.tech || []).join(" ")} ${(p.bullets || []).join(" ")}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (state.activeTech.size > 0) {
        const set = new Set((p.tech || []).map((t) => safeText(t)));
        for (const need of state.activeTech) if (!set.has(need)) return false;
      }
      return true;
    };

    const apply = () => {
      let filtered = all.filter(matches);
      if (state.sortMode === "sde") {
        filtered = filtered
          .slice()
          .sort((a, b) => scoreForSde(b) - scoreForSde(a));
      }
      renderProjects({ projects: filtered });
      initReveal();
      if (count) count.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} shown`;
    };

    renderChips();
    apply();

    chipRoot.addEventListener("click", (e) => {
      const btn = e.target && e.target.closest && e.target.closest("button[data-tech]");
      if (!btn) return;
      const tech = btn.dataset.tech;
      if (state.activeTech.has(tech)) state.activeTech.delete(tech);
      else state.activeTech.add(tech);
      state.sortMode = "default";
      renderChips();
      apply();
    });

    search.addEventListener("input", () => {
      state.q = search.value || "";
      state.sortMode = "default";
      apply();
    });

    const refine = $("#ai-refine");
    if (refine) {
      refine.addEventListener("click", () => {
        state.sortMode = "sde";
        if (state.q.trim() === "") state.q = "api";
        search.value = state.q;
        apply();
      });
    }

    const clear = $("#clear-filters");
    if (clear) {
      clear.addEventListener("click", () => {
        state.q = "";
        state.activeTech = new Set();
        state.sortMode = "default";
        search.value = "";
        renderChips();
        apply();
      });
    }
  };

  const renderJsonLd = () => {
    const el = $("#person-jsonld");
    if (!el) return;
    const json = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.preferredName || profile.name,
      email: profile.email ? `mailto:${profile.email}` : undefined,
      telephone: profile.phone || undefined,
      address: profile.location || undefined,
      url: profile.linkedin || undefined,
      sameAs: [profile.linkedin, profile.github].filter(Boolean),
    };
    el.textContent = JSON.stringify(json, null, 2);
  };

  const init = () => {
    initTheme();
    initNav();
    initActiveNav();

    renderHero();
    renderAbout();
    renderTimeline("#experience-list", profile.experience);
    renderProjects();
    renderSkills();
    renderTimeline("#education-list", profile.education);
    renderCerts();
    renderContact();
    initAboutExtras();
    initProjectFilters();
    renderJsonLd();
    initReveal();

    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Smooth scroll without breaking reduced-motion preference
    if (window.matchMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    // Improve focus on in-page anchor navigation
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", () => {
        const id = a.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        window.setTimeout(() => target.removeAttribute("tabindex"), 250);
      });
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
