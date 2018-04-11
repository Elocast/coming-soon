import cometImage1 from './sprites/comet1.svg'
import cometImage2 from './sprites/comet2.svg'
import cometImage3 from './sprites/comet3.svg'

const COMET_TYPE = [
  {
    height: 105,
    width: 83,
    moveRatio: 10,
    src: cometImage1
  },
  {
    height: 59,
    width: 59,
    moveRatio: 4,
    src: cometImage2
  },
  {
    height: 70,
    width: 70,
    moveRatio: 8,
    src: cometImage3
  }
]

function Comet(config) {
  this.type = COMET_TYPE[config.type] ? config.type : Math.floor((Math.random() * 3))

  this.coords = config.coords
  this.playboard = config.playboard
  this.ctx = config.ctx

  this.moveRatio = COMET_TYPE[this.type].moveRatio
  this.size = {
    height: COMET_TYPE[this.type].height,
    width: COMET_TYPE[this.type].width
  }

  this.image = new Image()
  this.image.src = COMET_TYPE[this.type].src
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
  this.ctx.drawImage(
    this.image,
    this.coords.x - this.size.width / 2,
    this.coords.y - this.size.height / 2,
    this.size.width,
    this.size.height
  )
}

export default Comet
