import Ship from './Ship'
import Laser from './Laser'
import Comet from './Comet'
import Star from './Star'
import Footer from './Footer'
import WelcomeScreen from './WelcomeScreen'

import bgImage from './sprites/bg.svg'

function Game(canvas) {
  if (!canvas.getContext) {
    throw new Error('Canvas not supported. Quit.')
  }

  this.canvas = canvas
  this.canvas.tabIndex = 1000
  this.canvas.focus()

  this.height = this.canvas.height = 547
  this.width = this.canvas.width = 572

  this.ctx = canvas.getContext('2d')

  this.started = false
  this.paused = false
  this.score = 0
  this.scoreMultiplier = 1

  this.keys = []
  this.lasers = []
  this.comets = []
  this.stars = []

  this.loops = 0
  this.nextGameTick = (new Date()).getTime()
  this.startTime = (new Date()).getTime()
  this.fps = 60
  this.maxFrameSkip = 10
  this.skipTicks = 1000 / this.fps

  this.bgImage = new Image()
  this.bgImage.src = bgImage

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
      y: this.height - 90
    }
  })

  this.footer = new Footer({
    ctx: this.ctx,
    health: this.ship.health,
    score: this.score,
    scoreMultiplier: this.scoreMultiplier,
    playboard: {
      height: this.height,
      width: this.width
    }
  })

  this.welcomeScreen = new WelcomeScreen({
    ctx: this.ctx,
    playboard: {
      height: this.height,
      width: this.width
    }
  })

  this.genRandomStars()

  this.canvas.addEventListener('keyup', this.keyUp.bind(this))
  this.canvas.addEventListener('keydown', this.keyDown.bind(this))
}

Game.prototype.keyUp = function(e) {
  this.keys[e.keyCode] = false
}

Game.prototype.keyDown = function(e) {
  this.keys[e.keyCode] = true
}

Game.prototype.genRandomStars = function() {
  for (let i = 0; i < 10; i++) {
    this.stars.push(new Star({
      coords: {
        y: Math.floor(Math.random() * (this.height - 0)),
        x: Math.floor(Math.random() * (this.width - 0))
      },
      ctx: this.ctx
    }))
  }
}

// start the game
Game.prototype.start = function() {
  this.started = true
  this.footer.update({
    health: this.ship.health
  })
}

Game.prototype.update = function() {
  this.stars.forEach(s => s.moveY())
  this.stars = this.stars.filter(s => !(s.coords.y >= this.height))

  if (!this.ship.isProtected() && this.ship.isAlive()) {
    this.comets.forEach(c => {
      if (this.ship.coords.x - (this.ship.size.width / 2) < c.coords.x + (c.size.width / 2) &&
        this.ship.coords.x + (this.ship.size.width / 2) > c.coords.x - (c.size.width / 2) &&
        this.ship.coords.y - (this.ship.size.height / 2) < c.coords.y + (c.size.height / 2) &&
        this.ship.coords.y + (this.ship.size.height / 2) > c.coords.y - (c.size.height / 2)
      ) {
        this.ship.collide()
        this.scoreMultiplier = 1
      }
    })
  }

  this.comets.forEach(c => c.moveY())
  this.comets = this.comets.filter(c => !(c.coords.y >= this.height))

  this.lasers.forEach((l, lIndex) => {
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

        this.lasers = [
          ...this.lasers.slice(0, lIndex),
          ...this.lasers.slice(lIndex + 1)
        ]

        this.scoreMultiplier = this.scoreMultiplier < 5 ? this.scoreMultiplier + 1 : 5
        this.score += (c.points || 50) * this.scoreMultiplier
      }
    })
  })

  this.lasers.forEach(l => l.moveY())
  this.lasers = this.lasers.filter(l => !(l.coords.y === 0))

  if (this.keys[37]) {
    if (this.ship.isAlive() && this.started) {
      this.ship.moveX(true)
    }
  }

  if (this.keys[39]) {
    if (this.ship.isAlive() && this.started) {
      this.ship.moveX(false)
    }
  }

  if (this.keys[88]) {
    if (this.ship.isAlive() && this.started) {
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
    } else if (!this.started) {
      this.start()
    }
  }

  if (this.stars.length < 10) {
    const nConfig = {
      coords: {
        x: Math.random() * (this.width - 0),
        y: Math.floor(Math.random() * (-this.height - -90))
      }
    }

    this.stars.push(new Star({
      coords: nConfig.coords,
      ctx: this.ctx
    }))
  }

  if (this.ship.isAlive() && this.started) {
    if (this.comets.length < 5 && !Math.round(Math.random())) {
      const nConfig = {
        coords: {
          x: Math.random() * (this.width - 0),
          y: Math.floor(Math.random() * (-this.height - -90))
        },
        ctx: this.ctx,
        playboard: {
          height: this.height,
          width: this.width
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
        this.comets.push(new Comet(nConfig))
      }
    }
  }

  this.ship.update({})

  this.footer.update({
    score: this.score,
    scoreMultiplier: this.scoreMultiplier,
    health: this.ship.health
  })
}

Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.width, this.height)
  this.ctx.drawImage(this.bgImage, 0, 0)
  this.stars.forEach(s => s.draw())
  this.lasers.forEach(l => l.draw())
  this.comets.forEach(c => c.draw())
  this.ship.draw()
  this.footer.draw()
  if (!this.started) {
    this.welcomeScreen.draw()
  }
}

export default Game
