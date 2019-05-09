class Obstacle {

  constructor(ctx, canvasW, canvasH, url, floor) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH

    this.img = new Image()
    this.img.src = url

    this.w = undefined
    this.h = undefined

    this.floor = floor

    this.x = undefined
    this.y = undefined

    // Pone la velocidad del suelo
    this.velX = this.floor.velX
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.w, this.h
    )

  }

  // move() {
  // La posicion X e Y sigue a la X e Y del suelo
  // this.y = this.floor.y - this.h
  // this.x -= this.velX

  // if (this.x + this.w < 0) {
  //   this.x = this.floor.x + this.floor.floorW + this.floor.enclineFloorW + this.floor.floorW * 0.25
  //   this.x = this.floor.x + this.floor.floorW + this.floor.enclineFloorW + this.floor.floorW * 0.75
  // }
  // }

}

class ObstacleFence extends Obstacle {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)

    this.w = 500
    this.h = 100

    this.floor = floor
    this.y = this.floor.y - this.h
    this.x = this.floor.floorW * 0.40
  }

  move() {
    // Pone la velocidad del suelo, por si esta es cambiada en el transcurso del juego
    this.velX = this.floor.velX

    // La posicion X e Y sigue a la X e Y del suelo
    this.y = this.floor.y - this.h
    this.x -= this.velX

    if (this.x + this.w < 0) {
      this.x = this.floor.x + this.floor.floorW + this.floor.enclineFloorW + this.floor.floorW * 0.40
    }
  }

}


class ObstacleBench extends Obstacle {

  constructor(ctx, canvasW, canvasH, url, floor) {
    super(ctx, canvasW, canvasH, url, floor)

    this.w = 200
    this.h = 100

    this.floor = floor
    this.y = this.floor.y - this.h
    this.x = this.floor.floorW * 0.75
  }

  move() {
    // Pone la velocidad del suelo, por si esta es cambiada en el transcurso del juego
    this.velX = this.floor.velX

    // La posicion X e Y sigue a la X e Y del suelo
    this.y = this.floor.y - this.h
    this.x -= this.velX

    if (this.x + this.w < 0) {
      this.x = this.floor.x + this.floor.floorW + this.floor.enclineFloorW + this.floor.floorW * 0.75
    }
  }

}
