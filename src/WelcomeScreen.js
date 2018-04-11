export function WelcomeScreen(config) {
  this.ctx = config.ctx
  this.playboard = config.playboard
}

WelcomeScreen.prototype.draw = function() {
  this.ctx.textAlign = 'center'
  this.ctx.font = '18px EloCastRETRO'
  this.ctx.fillStyle = '#fff'
  this.ctx.fillText(`We're not done yet,`, this.playboard.width / 2, 120)
  this.ctx.fillText(`but meanwhile...`, this.playboard.width / 2, 160)

  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  this.ctx.fillRect(1, 215, this.playboard.width - 2, 100)

  this.ctx.fillStyle = '#fff'
  this.ctx.fillText(`Press    to start`, this.playboard.width / 2, 275)

  let cornerRadius = 16

  this.ctx.lineJoin = 'round'
  this.ctx.lineWidth = cornerRadius

  this.ctx.fillStyle = '#23BCC1'
  this.ctx.strokeStyle = '#23BCC1'
  this.ctx.strokeRect(235 + (cornerRadius / 2), 250 + (cornerRadius / 2), 48 - cornerRadius, 32 - cornerRadius)
  this.ctx.fillRect(235 + (cornerRadius / 2), 250 + (cornerRadius / 2), 48 - cornerRadius, 32 - cornerRadius)

  this.ctx.fillStyle = '#268082'
  this.ctx.fillText(`X`, 260, 275)
}

export default WelcomeScreen
