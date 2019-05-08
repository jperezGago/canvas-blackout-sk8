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
      stoppedImg: new Image(),
      jumpImg: new Image(),
      movingImg: new Image(),
      grindingImg: new Image(),
    }


    // Img Skating
    this.imgs.skatingImg.src = 'images/player/skating.png'
    this.imgs.skatingImg.frames = 1
    this.imgs.skatingImg.frameIndex = 0
    // Img Falldown
    this.imgs.dawnFallingImg.src = 'images/player/falldawn.png'
    this.imgs.dawnFallingImg.frames = 16
    this.imgs.dawnFallingImg.frameIndex = 0
    // Img Stopped
    this.imgs.stoppedImg.src = 'images/player/stopped.png'
    this.imgs.stoppedImg.frames = 1
    this.imgs.stoppedImg.frameIndex = 0
    // Img Jumping
    this.imgs.jumpImg.src = 'images/player/jump.png'
    this.imgs.jumpImg.frames = 10
    this.imgs.jumpImg.frameIndex = 0
    // Img Moving
    this.imgs.movingImg.src = 'images/player/moving.png'
    this.imgs.movingImg.frames = 1
    this.imgs.movingImg.frameIndex = 0
    // Img Grinding
    this.imgs.grindingImg.src = 'images/player/grind.png'
    this.imgs.grindingImg.frames = 1
    this.imgs.grindingImg.frameIndex = 0

    this.currentSprite = undefined

  }

  draw(keyImg, framesCounter) {
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

    // Actualiza el sprite actual
    this.currentSprite = keyImg
    // Animar los sprite
    this.animateImg(framesCounter, img)
  }

  animateImg(framesCounter, img) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 6 === 0) {
      img.frameIndex += 1

      // Si el frame es el último, se vuelve al primero
      if (img.frameIndex > img.frames - 1) img.frameIndex = 0
    }
  }


  move() {
    // this.velY += this.gravity
    // this.y += this.velY

    // solo salta cuando el personaje está en el suelo
    // if (this.y >= this.y0) {
    //   this.velY = 1
    //   this.y = this.y0
    // }
    // else {
    //   this.velY += this.gravity
    //   this.y += this.velY
    // }
  }

}
