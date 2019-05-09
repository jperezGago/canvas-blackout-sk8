class ScoreBoard {
  constructor(ctx, canvasW) {
    this.ctx = ctx
    this.canvasW = canvasW

    this.ctx.font = "30px sans-serif"
    this.score = undefined
  }

  draw(score) {
    this.score = score
    this.ctx.fillStyle = "blue"
    this.ctx.fillText(this.score, this.canvasW - 200, 100)
  }

}