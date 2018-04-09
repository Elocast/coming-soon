import Ship from './Ship'

function Game(canvas) {
  if (!canvas.getContext) {
    throw new Error('Canvas not supported. Quit.')
  }

  this.canvas = canvas
  this.canvas.tabIndex = 1000

  this.height = this.canvas.height = 540
  this.width = this.canvas.width = 500

  this.ctx = canvas.getContext('2d')

  this.paused = false
  this.keys = []

  this.loops = 0
  this.nextGameTick = (new Date()).getTime()
  this.startTime = (new Date()).getTime()
  this.fps = 60
  this.maxFrameSkip = 10
  this.skipTicks = 1000 / this.fps

  this.canvas.addEventListener('keyup', this.keyUp.bind(this))
  this.canvas.addEventListener('keydown', this.keyDown.bind(this))
}

Game.prototype.keyUp = function(e) {
  this.keys[e.keyCode] = false
}

Game.prototype.keyDown = function(e) {
  this.keys[e.keyCode] = true
}

// start the game
Game.prototype.start = function() {
  this.ship = new Ship({
    width: 60,
    ctx: this.ctx,
    playboard: {
      height: this.height,
      width: this.width
    },
    coords: {
      x: (this.width / 2) - 30,
      y: this.height - 120
    }
  })
}

Game.prototype.update = function() {
  if (this.keys[37]) {
    this.ship.moveX(true)
  }

  if (this.keys[39]) {
    this.ship.moveX(false)
  }
}

Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.width, this.height)
  this.ship.draw()
}

export default Game
