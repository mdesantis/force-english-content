#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

sudo apt-get install -y bash curl inkscape jq

if ! command -v node &> /dev/null; then
  nodejs_latest_lts_major=$(
    curl -fsSL https://nodejs.org/dist/index.json | \
    jq --raw-output 'map(select(.lts)) | sort_by(.lts) | .[-1].version' | \
    cut -d '.' -f 1 | \
    tr -d 'v'
  )
  curl -fsSL "https://deb.nodesource.com/setup_$nodejs_latest_lts_major.x" | sudo -E bash -
  sudo apt-get install -y nodejs
fi

npm install
