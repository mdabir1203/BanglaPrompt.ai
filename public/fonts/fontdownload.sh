#!/usr/bin/env bash
set -euo pipefail

# Always place downloaded fonts next to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FONT_DIR="$SCRIPT_DIR"
FONT_CSS="$FONT_DIR/fonts.css"

mkdir -p "$FONT_DIR"

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"

# Start a fresh fonts.css file
echo "/* Font files are not committed. Download the matching .woff2 files (see README.md) and place them here. */" > "$FONT_CSS"

download_fonts() {
  local family="$1"
  local weights="$2"       # e.g., ":wght@400;500;600;700" or ""
  local css_url="https://fonts.googleapis.com/css2?family=${family}${weights}&display=swap"

  echo "Fetching CSS for ${family}${weights}"
  local css
  css=$(curl -s -H "User-Agent: $UA" "$css_url")

  # Download each referenced font file and swap remote URLs with local paths
  for url in $(echo "$css" | grep -oP 'https://fonts.gstatic.com/[^)]+'); do
    local file="$FONT_DIR/$(basename "$url")"
    echo "Downloading $(basename "$url")"
    curl -sL "$url" -o "$file"
    css=${css//$url/./$(basename "$url")}
  done

  echo "$css" >> "$FONT_CSS"
  echo >> "$FONT_CSS"
}

download_fonts "Inter" ":wght@400;500;600;700"
download_fonts "Hind+Siliguri" ":wght@400;500;600;700"
download_fonts "Noto+Sans+Bengali" ":wght@400;500;600;700"
download_fonts "Space+Mono" ":wght@400;700"
download_fonts "VT323" ""

echo "All fonts saved to $FONT_DIR"

