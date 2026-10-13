// The site menu: a hamburger button in the top-left corner that opens a
// list of every page. Each page loads this one script (src="../menu.js",
// or "menu.js" from the root), so the page list lives only here: add a new
// page by adding a line to PAGES.
(function () {
  const PAGES = [
    ["", "triangles", "△"],
    ["page2/", "orbit pairs", "◎"],
    ["page3/", "kasuri", "絣"],
    ["page4/", "motes", "塵"],
    ["page5/", "meadow", "花火"],
    ["page6/", "garden", "枯山水"],
  ];

  // Links are relative to the site root, which is where this script lives.
  const root = new URL(".", document.currentScript.src);
  const here = location.pathname.replace(/index\.html$/, "");
  const urls = PAGES.map(([path]) => new URL(path, root));
  const current = urls.findIndex((u) => u.pathname === here);

  const css = `
    .jv-menu-btn {
      position: fixed; top: 8px; left: 10px; z-index: 20;
      width: 38px; height: 38px; padding: 0; min-height: 0;
      display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px;
      background: rgba(245, 244, 240, 0.85); border: 1px solid #ddd9d0; border-radius: 4px;
      cursor: pointer;
    }
    .jv-menu-btn span { display: block; width: 16px; height: 1.5px; background: #2b2b2b; transition: transform .2s, opacity .2s; }
    .jv-menu-btn[aria-expanded="true"] span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
    .jv-menu-btn[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
    .jv-menu-btn[aria-expanded="true"] span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }
    .jv-menu {
      position: fixed; top: 52px; left: 10px; z-index: 20;
      min-width: 200px; padding: 6px 0; margin: 0;
      background: #f5f4f0; border: 1px solid #ddd9d0; border-radius: 4px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      list-style: none;
    }
    .jv-menu[hidden] { display: none; }
    .jv-menu a {
      display: flex; align-items: baseline; gap: 10px;
      padding: 9px 16px; color: #2b2b2b; text-decoration: none;
      font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .jv-menu a:hover, .jv-menu a:focus-visible { background: #ebe8e0; outline: none; }
    .jv-menu a[aria-current="page"] { font-weight: 600; }
    .jv-menu a[aria-current="page"]::before { content: ""; width: 4px; height: 4px; border-radius: 50%; background: #2b2b2b; align-self: center; margin-left: -10px; margin-right: -4px; }
    .jv-menu .n { width: 14px; color: #8a8578; font-size: 10px; }
    .jv-menu .mark { margin-left: auto; color: #8a8578; letter-spacing: 0.05em; text-transform: none; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "jv-menu-btn";
  btn.setAttribute("aria-label", "Pages");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "jv-menu");
  btn.innerHTML = "<span></span><span></span><span></span>";

  const list = document.createElement("ul");
  list.className = "jv-menu";
  list.id = "jv-menu";
  list.hidden = true;
  PAGES.forEach(([, name, mark], i) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = urls[i].href;
    if (i === current) a.setAttribute("aria-current", "page");
    a.innerHTML = `<span class="n">${i + 1}</span><span>${name}</span><span class="mark">${mark}</span>`;
    li.appendChild(a);
    list.appendChild(li);
  });

  const open = (on) => {
    list.hidden = !on;
    btn.setAttribute("aria-expanded", String(on));
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); open(list.hidden); });
  document.addEventListener("click", (e) => { if (!list.hidden && !list.contains(e.target)) open(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });

  document.body.prepend(list);
  document.body.prepend(btn);
})();
