#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

new_version="${1-}"

if [ -z "${new_version}" ]; then
    echo "Usage: $0 <NEW_VERSION>"
    exit 1
fi

sed --in-place --regexp-extended 's/(^  "version": ").+(",?$)/\1'"${new_version}"'\2/' manifest.json package.json

npm install
