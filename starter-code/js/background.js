class Background {

  constructor(ctx, canvasW, canvasH, url) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.img = new Image()
    this.img.src = url

    this.x = 0
    this.y = 0

    this.velX = undefined
  }

  draw() {
    // Dibuja el background
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.canvasW, this.canvasH
    )
    // Dibuja el background complementario
    this.ctx.drawImage(
      this.img,
      this.x + this.canvasW, this.y,
      this.canvasW, this.canvasH
    )
  }

  move() {
    // Mueve el background
    this.x -= this.velX
    // Si la primera imagen ha llegado a su final reinicia
    if (this.x <= -this.canvasW) this.x = 0

  }

}


class BackgroundTop extends Background {
  constructor(ctx, canvasW, canvasH, url) {
    super(ctx, canvasW, canvasH, url)

    this.velX = 10
  }
}



class BackgroundBottom extends Background {
  constructor(ctx, canvasW, canvasH, url) {
    super(ctx, canvasW, canvasH, url)

    this.velX = 5
  }
}