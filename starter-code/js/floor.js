class Floor {

  constructor(ctx, canvasW, canvasH, url, key) {
    this.ctx = ctx
    this.canvasW = canvasW + 500
    this.canvasH = canvasH
    this.url = url
    this.key = key

    this.x = 0
    this.velX = 5


    this.y0 = this.canvasH * .5
    this.y = this.y0
    this.velY = -10

    this.x0 = -760
    this.xf = -960

    this.yin = this.y0
    this.yf = this.yin - 310

    this.gravity = -0.4

    this.img = new Image()
    this.img.src = url

    // Llamada a el setListener de las teclas
    this.setListeners();
  }

  setListeners() {
    document.onkeydown = e => {
      if (e.keyCode === this.key && this.y == this.y0) {
        this.y++;
        this.velY = 10;
      }
    }
  }

  draw() {
    // Dibuja el background
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.canvasW, this.canvasH
    )

  }

  move() {
    console.log(this.x)
    console.log(this.y)
    // Mueve el suelo en el eje X
    this.x -= this.velX
    // console.log(this.x)

    if (this.x >= this.x0) this.y0 = this.y0
    else if (this.x < this.x0 && this.x >= this.xf) {
      this.y0 = (this.x - this.x0) * (this.yf - this.yin) / (this.xf - this.x0) + this.yin
    } else this.y0 = this.yf


    // Mueve el suelo en el eje Y
    // solo salta cuando el personaje está en el suelo
    if (this.y <= this.y0) {
      this.velY = -10;
      this.y = this.y0;
    }
    else {
      this.velY += this.gravity;
      this.y += this.velY;
    }
  }

}
