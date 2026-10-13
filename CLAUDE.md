# janvas

A static site: each page is a self-contained `index.html` (root, `page2/`,
`page3/`, …) with inline CSS and JS, no build step. `main` is what the site
publishes from.

`menu.js` at the root is the one shared file: every page loads it right after
`<body>` (`../menu.js` from a subpage) and it adds the hamburger menu. The
page list lives in its `PAGES` array, so a new page is added there.

## Git workflow

- Push finished work directly to `main`. No pull requests, no feature
  branches needed — the owner has made this the rule for this repo.
- If a session was started on a feature branch, still push the finished
  commits to `main` (`git push origin HEAD:main`), keeping history linear.
- Before pushing, load the changed page in headless Chromium and check it
  runs without console errors.
