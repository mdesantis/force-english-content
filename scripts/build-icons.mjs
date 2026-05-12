#!/usr/bin/env node
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { Resvg } from '@resvg/resvg-js'

const sizes = [16, 32, 48, 64, 96, 128]
const svg = readFileSync('icon.svg')

mkdirSync('dist', { recursive: true })

for (const size of sizes) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  })
  writeFileSync(`dist/icon${size}.png`, resvg.render().asPng())
}
