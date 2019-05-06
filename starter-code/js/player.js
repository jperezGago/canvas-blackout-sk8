class Player {

  constructor(ctx, canvasW, canvasH, key) {
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.ctx = ctx
    this.key = key

    // medidas de la imagen a representar en el canvas
    this.w = 120;
    this.h = 120;

    this.x = 50
    this.y0 = this.canvasH * .5 - this.w - 10
    this.y = 0

    this.vel0 = 0
    this.velJump = 10
    this.velY = this.vel0

    this.gravity = 0.4

    this.img = new Image()
    this.img.src = 'images/player/skater-skating.png'

    // número de imágenes diferentes
    this.img.frames = 13;
    this.img.frameIndex = 0;


    // Llamada a el setListener de las teclas
    // this.setListeners();
  }

  // setListeners() {
  //   document.onkeydown = e => {
  //     if (e.keyCode === this.key && this.y == this.y0) {
  //       this.y--;
  //       this.velY = -10;
  //     }
  //   }
  // }

  draw(framesCounter) {
    // this.ctx.drawImage(
    //   this.img,
    //   this.x, this.y,
    //   this.w, this.h
    // )

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.animateImg(framesCounter);

  }

  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 0) this.img.frameIndex = 0;
    }
  }


  move() {
    // this.velY += this.gravity
    // this.y += this.velY

    // solo salta cuando el personaje está en el suelo
    if (this.y >= this.y0) {
      this.velY = 1;
      this.y = this.y0;
    }
    else {
      this.velY += this.gravity;
      this.y += this.velY;
    }
  }

}