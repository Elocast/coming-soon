(function() {
  var onEveryFrame
  if (window.webkitRequestAnimationFrame) {
    onEveryFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb) }
      _cb()
    }
  } else if (window.mozRequestAnimationFrame) {
    onEveryFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb) }
      _cb()
    }
  } else {
    onEveryFrame = function(cb) {
      setInterval(cb, 1000 / 60)
    }
  }

  window.onEveryFrame = onEveryFrame
})()
