import './style.css'

import Game from './Game'
import { setupLoop, injectFontFace } from './utils'

import elocastRetroFont from './fonts/elocast_retro.ttf'

setupLoop()
injectFontFace('EloCastRETRO', elocastRetroFont)

let canvas = null

function onResize() {
  if (!canvas) {
    return onResize()
  }

  const body = document.querySelector('body')
  const bodyWidth = body.clientWidth

  let width = canvas.width
  let height = canvas.height

  if (bodyWidth < canvas.width) {
    const ratio = canvas.height / canvas.width
    height = bodyWidth * ratio
    width = bodyWidth
  }

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
}

window.addEventListener('load', onResize, false)
window.addEventListener('resize', onResize, false)

document.addEventListener('DOMContentLoaded', function() {
  canvas = document.querySelector('canvas')
  const game = new Game(canvas)

  const mainLoop = (function() {
    const skipTicks = 1000 / game.fps
    let loops = 0
    let maxFrameSkip = 10
    let nextGameTick = (new Date()).getTime()

    return function() {
      loops = 0

      while (!game.paused &&
        (new Date()).getTime() > nextGameTick &&
        loops < maxFrameSkip
      ) {
        game.update()
        nextGameTick += skipTicks
        loops++
      }

      game.draw()
    }
  })()

  window.onEveryFrame(mainLoop)
})
