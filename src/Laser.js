function Laser(config) {
  this.size = {
    width: (config.size && config.size.width) ? config.size.width : 4,
    height: (config.size && config.size.height) ? config.size.height : 12
  }
  this.moveRatio = config.moveRatio || 4

  this.coords = {
    x: config.coords.x,
    y: config.coords.y
  }
  this.playboard = config.playboard
  this.enemy = !!config.enemy
  this.ctx = config.ctx
  this.createdAt = (new Date()).getTime()

  this.image = new Image()
  this.image.src = '/sprites/laser.svg'
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
  this.size = {
    width: config.size.width || this.size.width,
    height: config.size.height || this.size.height
  }
  this.coords = {
    x: config.coords.x || this.coords.x,
    y: config.coords.y || this.coords.y
  }
  this.playboard = config.playboard || this.playboard
  this.enemy = config.enemy || this.enemy
  this.moveRatio = config.moveRatio || config.moveRatio
}

Laser.prototype.draw = function() {
  this.ctx.drawImage(
    this.image,
    this.coords.x - this.size.width / 2,
    this.coords.y - this.size.height / 2,
    this.size.width,
    this.size.height
  )
}

export default Laser
