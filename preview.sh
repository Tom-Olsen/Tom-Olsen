#!/usr/bin/env bash
set -euo pipefail

portfolio_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec firefox "$portfolio_dir/index.html"
