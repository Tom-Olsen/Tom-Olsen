# Portfolio project context

## Purpose
This repository builds a personal portfolio at https://tom-olsen.github.io/Tom-Olsen/. It presents selected doctoral work and other technical projects. Selected Work uses equally styled compact rows in navigation order: doctoral research, Ember, Sparkive.

## Content boundaries
- Keep the landing page concise and visual.
- Use the portfolio for concise, approachable project summaries and links. Full Ember feature demonstrations and media belong in the Ember project website's Showcase section.
- Keep detailed Ember documentation in the Ember repository, not in this portfolio.
- Link interested readers to Ember's source, showcase, and documentation, and to Sparkive for general lessons on computer science, mathematics, and physics.
- Do not invent biographical details, research claims, project status, or contact information. Ask when facts are missing.

## Ember links
- Source: https://github.com/Tom-Olsen/Ember
- Documentation: https://tom-olsen.github.io/Ember/docs/
- Showcase: https://tom-olsen.github.io/Ember/showcase/
- Sparkive: https://tom-olsen.github.io/sparkive/

## Site structure
- Each page has its own source: `content/home/index.md`, `content/phd/index.md`, `content/ember/index.md`, and `content/sparkive/index.md`.
- The page sources contain raw HTML blocks to preserve the existing markup. `scripts/build_site.py` inserts them verbatim into `overrides/index.html`, which holds the shared header, profile sidebar, and footer.
- `content/stylesheets/main.css` controls the appearance and responsive layout.
- `content/javascripts/main.js` controls hash-based section navigation, active links, and focus management. Without JavaScript, all sections remain readable.
- `content/stylesheets/header.css` and `content/javascripts/header.js` mirror the Ember/Sparkive banner: shrinking brand, search, and mobile section drawer. Keep their dimensions, controls, and breakpoints aligned with those sites.
- `content/javascripts/theme.js` applies the saved/system palette before rendering and cycles between automatic, light, and dark modes. Page colors use theme tokens in `content/stylesheets/main.css`.
- `content/fonts/` and `content/sass/` hold fonts and legacy Sass sources.
- `brand/` contains the Ember and Sparkive logos.
- `images/portrait.jpg` is the profile portrait.
- `images/` contains background and project media.
- The unused legacy assets come from the original HTML5 UP Dimension template. The current design is independent of that template.
- `site/` is generated output and is ignored by Git. The build preserves the public `assets/css/`, `assets/js/`, `assets/fonts/`, `assets/sass/`, `brand/`, `images/`, and `resumes/` URLs, as well as the existing hash links.
- `.github/workflows/docs.yml` builds and deploys `site/` with GitHub Actions, analogous to Sparkive. GitHub Pages must use GitHub Actions as its source.
- `readme.md` is the public GitHub profile README. Keep it short and focused on the repository's intent. Development and resume instructions live in `scripts/README.md`.

## Development approach
- This is a static site with a Python 3 standard-library build; no third-party dependencies are required.
- Run `python3 scripts/build_site.py` to build `site/`. Edit the sources rather than the generated files.
- Run `./preview.sh` for a local HTTP preview on port 8002, or `./preview.sh 8003` to choose another port. Reload the browser after editing; the preview rebuilds on page requests.
- The layout and page files are assembled without Markdown conversion so that the generated HTML remains unchanged by the structural refactor.
- Make changes in small, understandable steps so user can learn the relevant HTML, CSS, and JavaScript concepts.
- The current page uses its own CSS and JavaScript; do not reintroduce the Dimension modal layout or its dependencies.
- Prefer semantic HTML, accessible labels and alternative text, responsive layouts, and external links protected with `rel="noopener noreferrer"`.
- Check both desktop and narrow mobile layouts after visual changes.
