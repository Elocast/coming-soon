function Ship(config) {
  this.width = config.width
  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx
  this.moveRatio = 8
  this.health = 3
  this.protectUntil = (new Date()).getTime()
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
  if (pos < this.width / 2) {
    pos = this.width / 2
  }

  if (pos + this.width / 2 >= this.playboard.width) {
    pos = this.playboard.width - this.width / 2
  }

  this.coords = {
    ...this.coords,
    x: pos
  }
}

Ship.prototype.update = function(config) {
  this.width = config.width || this.width
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard
}

Ship.prototype.draw = function() {
  if (this.health > 0) {
    this.ctx.fillStyle = !this.isProtected() ? 'red' : 'blue'
    this.ctx.fillRect(this.coords.x - this.width / 2, this.coords.y - this.width / 2, this.width, this.width)
  }
}

export default Ship
