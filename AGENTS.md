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
- `index.html` contains the page content and semantic structure.
- `assets/css/main.css` controls the appearance and responsive layout.
- `assets/js/main.js` controls hash-based section navigation, active links, and focus management. Without JavaScript, all sections remain readable.
- `assets/css/header.css` and `assets/js/header.js` mirror the Ember/Sparkive banner: shrinking brand, search, and mobile section drawer. Keep their dimensions, controls, and breakpoints aligned with those sites.
- `assets/js/theme.js` applies the saved/system palette before rendering and cycles between automatic, light, and dark modes. Page colors use theme tokens in `assets/css/main.css`.
- `brand/` contains the Ember and Sparkive logos.
- `images/portrait.jpg` is the profile portrait.
- `images/` contains background and project media.
- `README.txt` and the unused legacy assets document the original HTML5 UP Dimension template. The current design is independent of that template.
- `README.md` is the public GitHub profile README. Keep it short and focused on the repository's intent.

## Development approach
- This is a static site: no package manager, framework, compilation, or build step is currently required.
- Open `index.html` directly for a quick preview. Use a local HTTP server when browser behavior differs from GitHub Pages.
- Make changes in small, understandable steps so user can learn the relevant HTML, CSS, and JavaScript concepts.
- The current page uses its own CSS and JavaScript; do not reintroduce the Dimension modal layout or its dependencies.
- Prefer semantic HTML, accessible labels and alternative text, responsive layouts, and external links protected with `rel="noopener noreferrer"`.
- Check both desktop and narrow mobile layouts after visual changes.
