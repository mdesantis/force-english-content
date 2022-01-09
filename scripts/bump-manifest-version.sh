#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

version=$(npm run version:echo --silent)
tempfile=$(mktemp)

jq '.version = "'"${version}"'"' manifest.json > "${tempfile}"
mv "${tempfile}" manifest.json
