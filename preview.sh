#!/usr/bin/env bash
set -euo pipefail

portfolio_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec python3 - "$portfolio_dir" "$@" <<'PY'
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from threading import Thread
import webbrowser

parser = argparse.ArgumentParser(description="Serve the portfolio locally for preview.")
parser.add_argument("directory", help=argparse.SUPPRESS)
parser.add_argument("port", nargs="?", type=int, default=8002)
args = parser.parse_args()

handler = partial(SimpleHTTPRequestHandler, directory=args.directory)
with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
    url = f"http://127.0.0.1:{server.server_port}/"
    print(f"Portfolio preview: {url}", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    if os.environ.get("BROWSER") or os.environ.get("DISPLAY") or os.environ.get("WAYLAND_DISPLAY"):
        Thread(target=webbrowser.open, args=(url,), daemon=True).start()
    else:
        print("Open the URL locally after forwarding the port over SSH.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
PY
