function Ship(config) {
  this.width = config.width
  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx
  this.moveRatio = 8
}

Ship.prototype.moveX = function(left) {
  let pos = this.coords.x + (left ? -this.moveRatio : this.moveRatio)
  if (pos < 0) {
    pos = 0
  }

  if (pos + this.width >= this.playboard.width) {
    pos = this.playboard.width - this.width
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
  this.ctx.fillStyle = '#000'
  this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.width)
}

export default Ship
