import logoRetroImage from './sprites/logo_retro.svg'

export function GameOverScreen(config) {
  this.ctx = config.ctx
  this.playboard = config.playboard

  this.logoImage = new Image()
  this.logoImage.src = logoRetroImage
}

GameOverScreen.prototype.draw = function() {
  this.ctx.textAlign = 'center'
  this.ctx.font = '18px EloCastRETRO'
  this.ctx.fillStyle = '#fff'
  this.ctx.fillText(`You died but it's OK.`, this.playboard.width / 2, 160)

  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  this.ctx.fillRect(1, 215, this.playboard.width - 2, 165)

  this.ctx.fillStyle = '#fff'
  this.ctx.font = '35px EloCastRETRO'
  this.ctx.drawImage(this.logoImage, (this.playboard.width - this.logoImage.width) / 2, 245)

  this.ctx.font = '20px EloCastRETRO'
  this.ctx.fillText(`COMING SOON...`, this.playboard.width / 2, 345)
}

export default GameOverScreen
