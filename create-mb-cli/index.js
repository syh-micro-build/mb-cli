#! /usr/bin/env node
import * as banners from './utils/banners.js'
async function init(params) {
  console.log()
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? banners.gradientBanner
      : banners.defaultBanner
  )
  console.log()

  await import('@mb-cli/core')
}

init().catch((e) => {
  console.error(e)
})