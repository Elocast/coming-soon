import Game from './Game'
import { setupLoop, injectFontFace } from './utils'

import elocastRetroFont from './fonts/elocast_retro.ttf'

setupLoop()
injectFontFace('EloCastRETRO', elocastRetroFont)

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('canvas')
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
