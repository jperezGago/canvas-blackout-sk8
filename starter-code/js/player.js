class Player {

  constructor(ctx, canvasW, canvasH, key) {
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.ctx = ctx
    this.key = key

    // medidas de la imagen a representar en el canvas
    this.w = 120
    this.h = 120

    this.x = 50
    // this.y0 = this.canvasH * .5 - this.h
    this.y = this.canvasH * .5 - this.h

    this.vel0 = 0
    this.velJump = 10
    this.velY = this.vel0

    this.gravity = 0.4
    this.imgs = {
      skatingImg: new Image(),
      dawnFallingImg: new Image(),
      stopedImg: new Image(),
      jumpImg: new Image()
    }

    // Img patinando
    this.imgs.skatingImg.src = 'images/player/skater-skating.png'
    this.imgs.skatingImg.frames = 13
    this.imgs.skatingImg.frameIndex = 0
    // Img caida
    this.imgs.dawnFallingImg.src = 'images/player/downfall.png'
    this.imgs.dawnFallingImg.frames = 16
    this.imgs.dawnFallingImg.frameIndex = 0
    // Img parado
    this.imgs.stopedImg.src = 'images/player/stoped.png'
    this.imgs.stopedImg.frames = 1
    this.imgs.stopedImg.frameIndex = 0
    // Img saltando
    this.imgs.jumpImg.src = 'images/player/flip.png'
    this.imgs.jumpImg.frames = 31
    this.imgs.jumpImg.frameIndex = 0
  }

  draw(keyImg, framesCounter) {
    console.log(keyImg)
    const img = this.imgs[keyImg]

    this.ctx.drawImage(
      img,
      img.frameIndex * Math.floor(img.width / img.frames),
      0,
      Math.floor(img.width / img.frames),
      img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
    // Animar los sprite
    this.animateImg(framesCounter, img);
  }

  animateImg(framesCounter, img) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 3 === 0) {
      img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (img.frameIndex > img.frames - 1) img.frameIndex = 0;
    }
  }


  move() {
    // this.velY += this.gravity
    // this.y += this.velY

    // solo salta cuando el personaje está en el suelo
    // if (this.y >= this.y0) {
    //   this.velY = 1;
    //   this.y = this.y0;
    // }
    // else {
    //   this.velY += this.gravity;
    //   this.y += this.velY;
    // }
  }

}
