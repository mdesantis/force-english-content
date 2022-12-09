#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

version=$(npm run version:echo --silent)

for browser in chrome firefox; do
  tmpfile=$(mktemp)

  jq '.version = "'"$version"'"' manifest-$browser.json > "$tmpfile"
  mv "$tmpfile" manifest-$browser.json
done
