import Ship from './Ship'
import Laser from './Laser'
import Comet from './Comet'

function Game(canvas) {
  if (!canvas.getContext) {
    throw new Error('Canvas not supported. Quit.')
  }

  this.canvas = canvas
  this.canvas.tabIndex = 1000
  this.canvas.focus()

  this.height = this.canvas.height = 540
  this.width = this.canvas.width = 500

  this.ctx = canvas.getContext('2d')

  this.paused = false
  this.keys = []
  this.lasers = []
  this.comets = []

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
    size: {
      height: 60,
      width: 52
    },
    ctx: this.ctx,
    playboard: {
      height: this.height,
      width: this.width
    },
    coords: {
      x: (this.width / 2),
      y: this.height - 120
    }
  })
}

Game.prototype.update = function() {
  if (!this.ship.isProtected()) {
    this.comets.forEach(c => {
      if (this.ship.coords.x - (this.ship.width / 2) < c.coords.x + (c.size.width / 2) &&
        this.ship.coords.x + (this.ship.size.width / 2) > c.coords.x - (c.size.width / 2) &&
        this.ship.coords.y - (this.ship.size.width / 2) < c.coords.y + (c.size.height / 2) &&
        this.ship.coords.y + (this.ship.size.width / 2) > c.coords.y + (c.size.height / 2)
      ) {
        this.ship.collide()
      }
    })
  }

  this.comets.forEach(c => c.moveY())
  this.comets = this.comets.filter(c => !(c.coords.y >= this.height))

  this.lasers.forEach(l => {
    this.comets.forEach((c, cIndex) => {
      if (l.coords.x < c.coords.x + (c.size.width / 2) &&
        l.coords.x + (l.size.width) > c.coords.x - (c.size.width / 2) &&
        l.coords.y < c.coords.y + (c.size.height / 2) &&
        l.coords.y + (l.size.height) > c.coords.y - (c.size.height / 2)
      ) {
        this.comets = [
          ...this.comets.slice(0, cIndex),
          ...this.comets.slice(cIndex + 1)
        ]
      }
    })
  })

  this.lasers.forEach(l => l.moveY())
  this.lasers = this.lasers.filter(l => !(l.coords.y === 0))

  if (this.keys[37]) {
    this.ship.moveX(true)
  }

  if (this.keys[39]) {
    this.ship.moveX(false)
  }

  if (this.keys[88]) {
    if (this.lasers.length < 1 ||
      (new Date()).getTime() - this.lasers.slice().pop().createdAt >= 200
    ) {
      this.lasers.push(new Laser({
        coords: {
          ...this.ship.coords,
          y: this.ship.coords.y - (this.ship.size.height / 2)
        },
        ctx: this.ctx,
        playboard: {
          height: this.height,
          width: this.width
        },
        moveRatio: 18
      }))
    }
  }

  if (this.comets.length < 2 && !Math.round(Math.random())) {
    const nConfig = {
      coords: {
        x: Math.random() * (this.width - 0),
        y: -90
      }
    }

    let collision = false
    this.comets.forEach(c => {
      if (c.coords.x < nConfig.coords.x + 90 &&
        c.coords.x + (c.size.width) > nConfig.coords.x &&
        c.coords.y < nConfig.coords.y + 90 &&
        c.coords.y + (c.size.height) > nConfig.coords.y
      ) {
        collision = true
      }
    })

    if (!collision) {
      this.comets.push(new Comet({
        coords: {
          x: Math.random() * (this.width - 0),
          y: -90
        },
        ctx: this.ctx,
        playboard: {
          height: this.height,
          width: this.width
        }
      }))
    }
  }
}

Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.width, this.height)
  this.lasers.forEach(l => l.draw())
  this.comets.forEach(c => c.draw())
  this.ship.draw()
}

export default Game
