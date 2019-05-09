class Time {
  constructor(ctx, canvasW) {
    this.ctx = ctx
    this.canvasW = canvasW

    this.x = this.canvasW - 260
    this.y = 70

    this.img = new Image()
    this.img.src = 'images/scoreboard/clock.png'

    this.ctx.font = "30px sans-serif"
    this.time = undefined
  }

  draw(time) {
    this.ctx.drawImage(
      this.img,
      this.x - 40, this.y - 80,
      130, 130
    )

    this.time = time
    this.ctx.fillStyle = "blue"
    this.ctx.fillText(this.time, this.x, this.y)
  }

}