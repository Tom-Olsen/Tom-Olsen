# Updating the public resumes

The portfolio serves `resumes/resumeDE.pdf` and `resumes/resumeEN.pdf` directly.
The resume repository and LaTeX source can stay private.

The private `lebenslauf` repository includes a `Publish portfolio resumes`
workflow. Once its `PORTFOLIO_TOKEN` Actions secret is configured, every push to
`master` copies the two committed PDFs here and commits any changes to `main`.
Only the PDFs are published; the resume source stays private. Build both PDFs
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

The script copies only the two named PDFs. Commit and push the updated PDFs along
with the portfolio to publish them through GitHub Pages. The resume buttons keep
the same URLs and open the published PDFs in a new tab.

