import shipImage from './sprites/ship.svg'

function Ship(config) {
  this.size = config.size
  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx
  this.moveRatio = 8
  this.health = 3
  this.protectUntil = (new Date()).getTime()

  this.image = new Image()
  this.image.src = shipImage
}

Ship.prototype.collide = function() {
  if (!this.isProtected()) {
    this.health--
    this.protectUntil = (new Date()).getTime() + 3000
  }
}

Ship.prototype.isProtected = function() {
  return this.protectUntil > (new Date()).getTime()
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
  this.size = config.size
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard
}

Ship.prototype.draw = function() {
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

export default Ship
