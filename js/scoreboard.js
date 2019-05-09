class ScoreBoard {
  constructor(ctx, canvasW) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.x = this.canvasW - 100
    this.y = 75

    this.ctx.font = "30px sans-serif"
    this.score = undefined

    this.img = new Image()
    this.img.src = 'images/scoreboard/score.png'
  }

  draw(score) {
    this.ctx.drawImage(
      this.img,
      this.x - 52, this.y - 70,
      120, 120
    )

    this.score = score
    this.ctx.fillStyle = "white"
    this.ctx.fillText(this.score, this.x, this.y)
  }

}