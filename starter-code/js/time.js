class Time {
  constructor(ctx, canvasW) {
    this.ctx = ctx
    this.canvasW = canvasW

    this.ctx.font = "50px sans-serif"
    this.time = undefined
  }

  draw(time) {
    this.time = time
    this.ctx.fillStyle = "green"
    this.ctx.fillText(this.time, this.canvasW * .5, 100)
  }

}