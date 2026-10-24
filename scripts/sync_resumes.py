#!/usr/bin/env python3
"""Copy only the two compiled web resumes from a local private resume checkout."""

import argparse
from pathlib import Path


def main():
    portfolio = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "source",
        nargs="?",
        type=Path,
        default=portfolio.parent / "lebenslaufTemplate",
        help="Resume checkout containing resumeDEweb.pdf and resumeENweb.pdf",
    )
    args = parser.parse_args()

    # Validate both PDFs before changing either published copy.
    resumes = {}
    for language in ("DE", "EN"):
        name = f"resume{language}web.pdf"
        source = args.source / name
        try:
            content = source.read_bytes()
        except OSError as error:
            parser.error(f"Cannot read {source}: {error}")
        if not content.startswith(b"%PDF-"):
            parser.error(f"Not a PDF: {source}")
        resumes[name] = content

    destination = portfolio / "resumes"
    destination.mkdir(exist_ok=True)
    for name, content in resumes.items():
        target = destination / name
        target.write_bytes(content)
        print(f"Updated {target.relative_to(portfolio)}")


if __name__ == "__main__":
    main()
