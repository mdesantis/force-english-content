#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

mkdir -p dist

for SIZE in 16 32 48 64 96 128; do
	inkscape --export-width "${SIZE}" --export-height "${SIZE}" --export-filename dist/icon"${SIZE}".png icon.svg
done
