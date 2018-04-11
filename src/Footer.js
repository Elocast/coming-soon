import { numberToScore } from './utils'

import footerImage from './sprites/footer.svg'
import heartImage from './sprites/heart.svg'
import emptyHeartImage from './sprites/empty_heart.svg'

export function Footer(config) {
  this.ctx = config.ctx
  this.scoreMultiplier = config.scoreMultiplier || 1
  this.score = config.score || 0
  this.health = config.health || 0
  this.playboard = config.playboard

  this.footerImage = new Image()
  this.footerImage.src = footerImage

  this.heartImage = new Image()
  this.heartImage.src = heartImage

  this.emptyHeartImage = new Image()
  this.emptyHeartImage.src = emptyHeartImage
}

Footer.prototype.update = function(config) {
  this.scoreMultiplier = config.scoreMultiplier || this.scoreMultiplier
  this.score = config.score || this.score
  this.health = (typeof config.health === 'number') ? config.health : this.health
  this.playboard = config.playboard || this.playboard
}

Footer.prototype.draw = function() {
  this.ctx.drawImage(this.footerImage, 0, this.playboard.height - this.footerImage.height)
  for (let i = 0; i < 3; i++) {
    this.ctx.drawImage(
      ((i + 1) <= this.health) ? this.heartImage : this.emptyHeartImage,
      this.playboard.width - ((this.heartImage.width + 5) * (i + 1)) - 5,
      this.playboard.height - this.heartImage.height - 10
    )
  }

  this.ctx.font = '18px EloCastRETRO'
  if (this.scoreMultiplier > 1) {
    this.ctx.fillStyle = '#fe898a'
    this.ctx.fillText(`x${this.scoreMultiplier}`, 7, this.playboard.height - 38)
  }

  this.ctx.fillStyle = '#fff'
  this.ctx.fillText(numberToScore(this.score, 6), 9, this.playboard.height - 10)
}

export default Footer
