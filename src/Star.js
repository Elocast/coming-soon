const COLORS = [
  '#fff',
  '#24bcc1',
  '#91dee0'
]

function Star(config) {
  this.size = {
    height: (config.size && config.size.height) ? config.size.height : Math.floor(Math.random() * (20 - 2) + 2),
    width: (config.size && config.size.width) ? config.size.width : Math.floor(Math.random() * (6 - 2) + 4)
  }

  this.coords = config.coords
  this.ctx = config.ctx
  this.color = config.color || COLORS[Math.floor((Math.random() * 3))]

  this.moveRatio = 4
}

Star.prototype.moveY = function() {
  let pos = this.coords.y + this.moveRatio

  this.coords = {
    ...this.coords,
    y: pos
  }
}

Star.prototype.draw = function() {
  this.ctx.fillStyle = this.color
  this.ctx.fillRect(this.coords.x, this.coords.y, this.size.width, this.size.height)
}

export default Star
