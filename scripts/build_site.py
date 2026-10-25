#!/usr/bin/env python3
"""Build the portfolio from its page sources and shared layout using Python 3."""

from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
PAGES = ("home", "phd", "ember", "sparkive")
STATIC_DIRECTORIES = {
    "content/stylesheets": "assets/css",
    "content/javascripts": "assets/js",
    "content/fonts": "assets/fonts",
    "content/sass": "assets/sass",
    "brand": "brand",
    "images": "images",
    "resumes": "resumes",
}


def build():
    """Assemble the HTML blocks verbatim to preserve the existing site and URLs."""
    layout = (ROOT / "overrides/index.html").read_text(encoding="utf-8")
    pages = {}
    for name in PAGES:
        marker = "{{ " + name + " }}"
        if layout.count(marker) != 1:
            raise ValueError(f"Expected exactly one {marker} in overrides/index.html")
        pages[marker] = (ROOT / "content" / name / "index.md").read_text(
            encoding="utf-8"
        ).removesuffix("\n")

    for marker, content in pages.items():
        layout = layout.replace(marker, content, 1)

    site = ROOT / "site"
    site.mkdir(exist_ok=True)
    (site / "index.html").write_text(layout, encoding="utf-8")
    for source, destination in STATIC_DIRECTORIES.items():
        shutil.copytree(ROOT / source, site / destination, dirs_exist_ok=True)
    return site


if __name__ == "__main__":
    print(f"Built portfolio: {build()}")
