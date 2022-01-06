#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

sudo apt-get install -y inkscape

if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

npm install
