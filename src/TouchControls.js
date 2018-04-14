import controlXImage from './controls/x.png'
import controlLeftImage from './controls/left.png'
import controlRightImage from './controls/right.png'

export function TouchControls(config) {
  this.ctx = config.ctx
  this.playboard = config.playboard
  this.scaleRatio = config.scaleRatio
  this.onKeyTouch = config.onKeyTouch

  this.xImage = new Image()
  this.xImage.src = controlXImage

  this.leftImage = new Image()
  this.leftImage.src = controlLeftImage

  this.rightImage = new Image()
  this.rightImage.src = controlRightImage

  this.keySize = 80

  this.keyPosition = [
    {
      key: 'x',
      keyCode: 88,
      x: this.playboard.width - this.keySize - 20,
      y: this.playboard.height - 120
    },
    {
      key: 'left',
      keyCode: 37,
      x: 20,
      y: this.playboard.height - 120
    },
    {
      key: 'right',
      keyCode: 39,
      x: 20 + this.keySize + 10,
      y: this.playboard.height - 120
    }
  ]
}

TouchControls.prototype.onTouch = function(e) {
  const keys = {}

  Object.keys(e.touches).forEach(tIndex => {
    const tPos = {
      x: e.touches[tIndex].pageX * this.scaleRatio - (e.target.offsetLeft * this.scaleRatio),
      y: (e.touches[tIndex].pageY * this.scaleRatio) - (e.target.offsetTop * this.scaleRatio)
    }

    this.keyPosition.forEach(k => {
      keys[k.keyCode] = !!(
        tPos.x < k.x + this.keySize &&
        tPos.x > k.x &&
        tPos.y < k.y + this.keySize &&
        tPos.y > k.y
      )
    })
  })

  this.onKeyTouch(keys)
}

TouchControls.prototype.update = function(config) {
  this.scaleRatio = config.scaleRatio || this.scaleRatio
  this.playboard = config.playboard || this.playboard
}

TouchControls.prototype.draw = function() {
  this.ctx.drawImage(this.leftImage, this.keyPosition[1].x, this.keyPosition[1].y, this.keySize, this.keySize)
  this.ctx.drawImage(this.rightImage, this.keyPosition[2].x, this.keyPosition[2].y, this.keySize, this.keySize)
  this.ctx.drawImage(this.xImage, this.keyPosition[0].x, this.keyPosition[0].y, this.keySize, this.keySize)
}

export default TouchControls
