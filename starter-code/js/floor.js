class Floor {

  constructor(ctx, canvasW, canvasH, url, key, playerX) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.url = url
    this.key = key
    this.playerX = playerX

    this.floorW = this.canvasW + 2000
    this.floorH = this.canvasH

    this.enclineFloorW = 500
    // this.enclineFloorH = this.canvasH - 50  // para la imagen corta
    this.enclineFloorH = this.canvasH + 360

    this.x = 0
    this.velX = 10

    // this.x0 = -760 
    // this.xf = -960
    this.x0 = -this.floorW + this.playerX + 10
    this.xf = this.x0 - this.enclineFloorW + 10

    this.yin = this.canvasH * .5 - 6
    this.yf = this.yin - 330

    this.y0 = this.yin
    this.y = this.y0
    this.velY = -10


    this.gravity = -0.4

    this.img = new Image()
    this.img.src = url

    this.img2 = new Image()
    this.img2.src = 'images/floor/encline-floor.png'


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
    // console.log(this.yin)
    // Dibuja el floor
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.floorW, this.floorH
    )
    this.ctx.drawImage(
      this.img2,
      this.x + this.floorW, this.y,
      this.enclineFloorW, this.enclineFloorH
    )
    this.ctx.drawImage(
      this.img,
      this.x + this.floorW + this.enclineFloorW, this.y + 330,
      this.floorW, this.floorH
    )

  }

  move() {
    // console.log(this.x)
    // console.log(this.y)

    // Mueve el suelo en el eje X
    this.x -= this.velX

    // Mueve el suelo en el eje Y
    // if (this.x >= this.x0) this.y0 = this.yin
    if (this.x < this.x0 && this.x >= this.xf) {
      this.y0 = (this.x - this.x0) * (this.yf - this.yin) / (this.xf - this.x0) + this.yin
    }
    // else if (this.x < this.xf) this.y0 = this.yf
    // else this.y0 = this.yf

    // Mueve el suelo en el eje Y
    // solo salta cuando el personaje está en el suelo
    if (this.y <= this.y0) {
      this.velY = -10;
      this.y = this.y0;
    }
    else {
      this.y += this.velY;
      this.velY += this.gravity;
    }


    // Si la primera imagen ha llegado a su final reinicia
    if (this.x <= -this.floorW - this.enclineFloorW) {
      // this.y = this .y + (this.yf - this.yin)
      this.x = 0
      this.y0 = this.yin
      this.y += 340
    }
  }

}
