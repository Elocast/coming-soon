import cometImage1 from './sprites/comet1.svg'
import cometImage2 from './sprites/comet2.svg'
import cometImage3 from './sprites/comet3.svg'

import shipExplosionImage1 from './sprites/ship_explosion1.svg'
import shipExplosionImage2 from './sprites/ship_explosion2.svg'
import shipExplosionImage3 from './sprites/ship_explosion3.svg'
import shipExplosionImage4 from './sprites/ship_explosion4.svg'

const EXPLOSION_ANIMATION = [
  shipExplosionImage4,
  shipExplosionImage3,
  shipExplosionImage2,
  shipExplosionImage1
]

const COMET_TYPE = [
  {
    height: 105,
    width: 83,
    moveRatio: 10,
    points: 150,
    src: cometImage1
  },
  {
    height: 59,
    width: 59,
    moveRatio: 4,
    points: 50,
    src: cometImage2
  },
  {
    height: 70,
    width: 70,
    moveRatio: 8,
    points: 100,
    src: cometImage3
  }
]

function Comet(config) {
  this.type = COMET_TYPE[config.type] ? config.type : Math.floor((Math.random() * 3))

  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx
  this.explosionTime = 800

  this.moveRatio = COMET_TYPE[this.type].moveRatio
  this.size = {
    height: COMET_TYPE[this.type].height,
    width: COMET_TYPE[this.type].width
  }

  this.image = new Image()
  this.image.src = COMET_TYPE[this.type].src
  this.points = COMET_TYPE[this.type].points || 50
}

Comet.prototype.collide = function() {
  this.exploded = true
  this.explodeStart = (new Date()).getTime()
}

Comet.prototype.moveY = function() {
  if (!this.exploded) {
    let pos = this.coords.y + this.moveRatio
  
    this.coords = {
      ...this.coords,
      y: pos
    }
  }
}

Comet.prototype.update = function(config) {
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard
  this.ctx = config.ctx || this.ctx
}

Comet.prototype.draw = function() {
  if (this.exploded) {
    const animationStep = 100 / EXPLOSION_ANIMATION.length
    const animationPerc = (((this.explodeStart + this.explosionTime) - (new Date()).getTime()) / ((this.explodeStart + this.explosionTime) - this.explodeStart)) * 100
    const index = Math.round(animationPerc / animationStep)

    const image = new Image()
    const sprite = EXPLOSION_ANIMATION[index - 1]

    if (sprite) {
      image.src = sprite
      this.ctx.drawImage(
        image,
        this.coords.x - this.size.width / 2,
        this.coords.y - this.size.height / 2,
        this.size.width,
        this.size.height
      )
    }

  } else {
    this.ctx.drawImage(
      this.image,
      this.coords.x - this.size.width / 2,
      this.coords.y - this.size.height / 2,
      this.size.width,
      this.size.height
    )
  }
}

export default Comet
