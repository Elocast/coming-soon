function Comet(config) {
  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx

  this.moveRatio = 8
  this.size = {
    height: 90,
    width: 90
  }
}

Comet.prototype.moveY = function() {
  let pos = this.coords.y + this.moveRatio

  this.coords = {
    ...this.coords,
    y: pos
  }
}

Comet.prototype.update = function(config) {
  this.coords = config.coords || this.coords
  this.playboard = config.playboard || this.playboard
  this.ctx = config.ctx || this.ctx
}

Comet.prototype.draw = function() {
  this.ctx.fillStyle = '#000'
  this.ctx.fillRect(this.coords.x - this.size.width / 2, this.coords.y - this.size.height / 2, this.size.width, this.size.height)
  this.ctx.fillStyle = '#fff'
  this.ctx.fillRect(this.coords.x, this.coords.y, this.size.width / 2, 1)
}

export default Comet
