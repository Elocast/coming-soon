import shipImage from './sprites/ship.svg'

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

function Ship(config) {
  this.size = config.size
  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx
  this.moveRatio = 8
  this.health = 30
  this.explosionTime = 800
  this.protectTime = 2000
  this.protectStart = (new Date()).getTime()
  this.protectUntil = (new Date()).getTime()

  this.image = new Image()
  this.image.src = shipImage
}

Ship.prototype.collide = function() {
  if (!this.isProtected()) {
    this.health--
    this.protectStart = (new Date()).getTime()
    this.protectUntil = (new Date()).getTime() + this.protectTime
  }
}

Ship.prototype.isProtected = function() {
  return this.protectUntil > (new Date()).getTime()
}

Ship.prototype.isAlive = function() {
  return this.health > 0
}

Ship.prototype.moveX = function(left) {
  let pos = this.coords.x + (left ? -this.moveRatio : this.moveRatio)
  if (pos < this.size.width / 2) {
    pos = this.size.width / 2
  }

  if (pos + this.size.width / 2 >= this.playboard.width) {
    pos = this.playboard.width - this.size.width / 2
  }

  this.coords = {
    ...this.coords,
    x: pos
  }
}

Ship.prototype.update = function(config) {
  this.size = config.size || this.size
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard

  if (this.isProtected()) {
    if ((this.protectStart + this.explosionTime) < (new Date()).getTime()) {
      this.coords = {
        ...this.coords,
        x: (this.playboard.width / 2)
      }
    }
  }
}

Ship.prototype.draw = function() {
  if (this.isProtected()) {
    const animationStep = 100 / EXPLOSION_ANIMATION.length
    const animationPerc = (((this.protectStart + this.explosionTime) - (new Date()).getTime()) / ((this.protectStart + this.explosionTime) - this.protectStart)) * 100
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
    if (this.health > 0) {
      this.ctx.drawImage(
        this.image,
        this.coords.x - this.size.width / 2,
        this.coords.y - this.size.height / 2,
        this.size.width,
        this.size.height
      )
    }
  }
}

export default Ship
