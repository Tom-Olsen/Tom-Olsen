# Tom Olsen

Source for my personal portfolio website: [tom-olsen.github.io/Tom-Olsen](https://tom-olsen.github.io/Tom-Olsen/).

A static portfolio with a shared profile sidebar and Home, PhD, Ember, and Sparkive sections. Open `index.html` in a browser, or run `./preview.sh` (requires Python 3) to serve it at `http://127.0.0.1:8002/`. Ember uses port 8000 and Sparkive uses port 8001, so all three previews can run together. Use `./preview.sh 8003` to choose another port. The script uses the configured `BROWSER` helper, including VS Code's SSH browser integration, or the default browser when a graphical display is available. With plain SSH, forward port 8002 (`ssh -L 8002:127.0.0.1:8002 user@host`) and open the URL locally. No build step or third-party dependencies are required.

Edit content in `index.html`, page styles in `assets/css/main.css`, and section navigation in `assets/js/main.js`. The Ember/Sparkive-style banner lives in `assets/css/header.css` and `assets/js/header.js`; `assets/js/theme.js` restores the automatic/light/dark preference before rendering. Search indexes the page content directly. Project logos live in `brand/`.
