class Background {

  constructor(ctx, canvasW, canvasH, url, floor) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.img = new Image()
    this.img.src = url

    this.x = 0
    this.y = 0

    this.velX = undefined
    this.velX0 = undefined

    this.floor = floor

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
    if (!this.floor.velX) this.velX = 0
    else this.velX = this.velX0
    // Mueve el background
    this.x -= this.velX
    // Si la primera imagen ha llegado a su final reinicia
    if (this.x <= -this.canvasW) this.x = 0
  }

}

class BackgroundFixed extends Background {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)
    this.velX = 0
    this.velX0 = this.velX
  }

}

class Background1 extends Background {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)
    this.velX = 1
    this.velX0 = this.velX

  }

}

class Background2 extends Background {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)
    this.velX = 2
    this.velX0 = this.velX

  }

}

class Background3 extends Background {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)
    this.velX = 6
    this.velX0 = this.velX

  }

}