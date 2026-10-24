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
```

For a different resume checkout, pass its directory to the script:

```sh
python3 scripts/sync_resumes.py /path/to/lebenslauf
```

The script requires both web PDFs and never falls back to the full versions.
It preserves their names as `resumes/resumeDEweb.pdf` and `resumes/resumeENweb.pdf`.
Commit and push the updated PDFs along with the portfolio to publish them through
GitHub Pages. The resume buttons open the web PDFs in a new tab.

