export const setupLoop = function() {
  let onEveryFrame
  if (window.requestAnimationFrame) {
    onEveryFrame = function(cb) {
      const _cb = function() {
        cb()
        requestAnimationFrame(_cb)
      }
      _cb()
    }
  } else if (window.mozRequestAnimationFrame) {
    onEveryFrame = function(cb) {
      const _cb = function() {
        cb()
        mozRequestAnimationFrame(_cb)
      }
      _cb()
    }
  } else {
    onEveryFrame = function(cb) {
      setInterval(cb, 1000 / 60)
    }
  }

  window.onEveryFrame = onEveryFrame
}

export default {
  setupLoop
}
