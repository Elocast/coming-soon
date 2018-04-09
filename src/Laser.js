function Laser(config) {
  this.width = 4
  this.height = 8
  this.moveRatio = config.moveRatio || 4

  this.coords = {
    x: config.coords.x - this.width / 2,
    y: config.coords.y - this.height - 4
  }
  this.playboard = config.playboard
  this.enemy = !!config.enemy
  this.ctx = config.ctx
  this.createdAt = (new Date()).getTime()
}

Laser.prototype.moveY = function() {
  let pos = this.coords.y + (!this.enemy ? -this.moveRatio : this.moveRatio)

  if (pos < 0) {
    pos = 0
  }

  if (pos + this.width >= this.playboard.width) {
    pos = this.playboard.width - this.width
  }

  this.coords = {
    ...this.coords,
    y: pos
  }
}

Laser.prototype.update = function(config) {
  this.width = config.width || this.width
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard
  this.enemy = config.enemy || this.enemy
  this.moveRatio = config.moveRatio || config.moveRatio
}

Laser.prototype.draw = function() {
  this.ctx.fillStyle = '#fff'
  this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height)
}

export default Laser
