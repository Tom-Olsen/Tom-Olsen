# Building and previewing the portfolio

The source follows Sparkive's separation of page content, shared templates, and generated output:

```text
content/
  home/index.md
  phd/index.md
  ember/index.md
  sparkive/index.md
  stylesheets/
  javascripts/
  fonts/
  sass/
overrides/index.html
brand/
images/
resumes/
scripts/build_site.py
site/                    # generated, ignored by Git
```

Each `index.md` contains its page's existing HTML block. The shared layout in
`overrides/index.html` has one `{{ home }}`, `{{ phd }}`, `{{ ember }}`, and
`{{ sparkive }}` insertion point. The Python build inserts each block verbatim,
without Markdown conversion, preserving the design, accessibility markup,
search, theme switching, and hash navigation. Links and media paths in the page
sources are relative to the generated site root.

Build with Python 3; there are no third-party dependencies:

```sh
python3 scripts/build_site.py
./preview.sh
```

The preview serves `site/` at `http://127.0.0.1:8002/`. Reload the browser after
editing a source file to rebuild. Stop with **Ctrl+C**. Use `./preview.sh 8003`
to choose a different port. Both scripts work from any current directory.

The build maps `content/stylesheets/`, `content/javascripts/`, `content/fonts/`,
and `content/sass/` back to their original public paths under `assets/`.
Brand files, images, and resumes keep their existing public paths as well.
The four page folders are source organization; published page links remain
`#home`, `#phd`, `#ember`, and `#sparkive`.

For GitHub Pages, select **GitHub Actions** under **Settings → Pages → Source**.
The workflow in `.github/workflows/docs.yml` builds and deploys `site/` on pushes
to `main` that change site sources, or when run manually. Do not publish the
source directory or edit the generated output.

# Updating the public resumes

The portfolio serves `resumes/resumeDEweb.pdf` and `resumes/resumeENweb.pdf` directly.
These public copies come from `resumeDEweb.pdf` and `resumeENweb.pdf`, which omit
the email address and phone number. The full `resumeDE.pdf` and `resumeEN.pdf` in
the resume repository are for applications and are never copied by the workflow
or sync script. The resume repository and LaTeX source can stay private.

The private `lebenslauf` repository includes a `Publish portfolio resumes`
workflow. Once its `PORTFOLIO_TOKEN` Actions secret is configured, every push to
`master` copies the two committed web PDFs here and commits any changes to `main`.
Only the web PDFs are published; the resume source stays private. Build all four PDFs
before pushing the resume repository. The workflow does not compile LaTeX.

One-time setup is documented in `.github/RESUME_PUBLISHING.md` in the private
resume repository. Portfolio publication then follows its normal GitHub Pages
configuration.

For a local manual refresh, run these commands from the portfolio checkout:

```sh
make -C ../lebenslaufTemplate
python3 scripts/sync_resumes.py
python3 scripts/build_site.py
```

For a different resume checkout, pass its directory to the script:

```sh
python3 scripts/sync_resumes.py /path/to/lebenslauf
```

The script requires both web PDFs and never falls back to the full versions.
It preserves their names as `resumes/resumeDEweb.pdf` and `resumes/resumeENweb.pdf`.
Commit and push the updated PDFs along with the portfolio to publish them through
GitHub Pages. The resume buttons open the web PDFs in a new tab.

