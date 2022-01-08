#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

version=$(npm run version:echo --silent)

sed --in-place --regexp-extended 's/(^  "version": ").+(",?$)/\1'"${version}"'\2/' manifest.json
