#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

version=$(npm run version:echo --silent)

for browser in chrome firefox; do
  dir=dist-"$browser"

  cp -r dist "$dir"
  cp manifest-"$browser".json "$dir"/manifest.json
  npx web-ext build --source-dir "$dir" --artifacts-dir web-ext-artifacts/"$browser" --overwrite-dest --filename force_english_content-"$version"-"$browser".zip
done
