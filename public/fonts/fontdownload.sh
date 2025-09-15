#!/usr/bin/env bash
set -euo pipefail

FONT_DIR="public/fonts"
mkdir -p "$FONT_DIR"

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"

download_fonts() {
  local family="$1"
  local weights="$2"       # e.g., ":wght@400;500;600;700" or ""
  local css="https://fonts.googleapis.com/css2?family=${family}${weights}&display=swap"

  curl -s -H "User-Agent: $UA" "$css" \
    | grep -oP 'https://fonts.gstatic.com/[^)]+' \
    | while read -r url; do
        file="$FONT_DIR/$(basename "$url")"
        echo "Downloading $(basename "$url")"
        curl -sL "$url" -o "$file"
      done
}

download_fonts "Inter" ":wght@400;500;600;700"
download_fonts "Noto+Sans+Bengali" ":wght@400;500;600;700"
download_fonts "Space+Mono" ":wght@400;700"
download_fonts "VT323" ""
echo "All fonts saved to $FONT_DIR"
