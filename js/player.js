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
      runningImg: new Image(),
      // manualTrick: new Image(),
      shoveitTrickImg: new Image(),
      treflipTrickImg: new Image(),
      downImg: new Image(),
      lowLifeImg: new Image(),
    }


    // Img Skating
    this.imgs.skatingImg.src = 'images/player/skating.png'
    this.imgs.skatingImg.frames = 13
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
    // Img Running
    this.imgs.runningImg.src = 'images/player/running.png'
    this.imgs.runningImg.frames = 12
    this.imgs.runningImg.frameIndex = 0
    // Img shoveitTrick
    this.imgs.shoveitTrickImg.src = 'images/player/shoveit.png'
    this.imgs.shoveitTrickImg.frames = 8
    this.imgs.shoveitTrickImg.frameIndex = 0
    // Img treflipTrick
    this.imgs.treflipTrickImg.src = 'images/player/treflip.png'
    this.imgs.treflipTrickImg.frames = 12
    this.imgs.treflipTrickImg.frameIndex = 0
    // Img Down
    this.imgs.downImg.src = 'images/player/down.png'
    this.imgs.downImg.frames = 1
    this.imgs.downImg.frameIndex = 0

    // Img lowLife
    this.imgs.lowLifeImg.src = 'images/player/lowLife.png'
    this.imgs.lowLifeImg.frames = 13
    this.imgs.lowLifeImg.frameIndex = 0

    this.endSprite = false
    // Nomdre de los trucos
    this.ctx.font = "200px sans-serif"
    // this.score = undefined
  }




  draw(keyImg, framesCounter) {
    const img = this.imgs[keyImg]

    // Evita que el sprite de la caida se vea mas pequenho que los demas
    if (keyImg == 'dawnFallingImg') {
      this.w = 200
      this.h = 130
    }
    else {
      this.w = 120
      this.h = 120
    }

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
    this.animateImg(framesCounter, img)
  }

  animateImg(framesCounter, img) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 5 === 0) {
      img.frameIndex += 1

      // Si el frame es el último, se vuelve al primero
      if (img.frameIndex > img.frames - 1) {
        img.frameIndex = 0
        // Evita que las imagenes con un solo frame activen este valor
        if (img.frames > 1) this.endSprite = true
      } else this.endSprite = false
    }
  }


  move() {
  }

  printTricks(trick) {
    this.trick = trick
    this.ctx.fillStyle = "white"
    this.ctx.fillText(trick, this.canvasW * .5, this.canvasH - 100)
  }

}
