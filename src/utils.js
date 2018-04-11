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

export const injectFontFace = (fontName, fontUrl) => {
  const newStyle = document.createElement('style')
  newStyle.appendChild(
    document.createTextNode(`\
    @font-face {\
      font-family: "${fontName}";\
      src: url('${fontUrl}');\
    }`)
  )

  document.head.appendChild(newStyle)
}

export const numberToScore = (num, len) => {
  let output = num + ''
  while (output.length < len) {
    output = '0' + output
  }

  return output
}

export default {
  setupLoop,
  numberToScore,
  injectFontFace
}
