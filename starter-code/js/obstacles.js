class Obstacle {

  constructor(ctx, canvasW, canvasH, url) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH

    this.img = new Image()
    this.img.src = url

    this.w = undefined
    this.h = undefined

    this.x = undefined
    this.y = undefined

    this.velX = 10
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
    super(ctx, canvasW, canvasH, url)

    this.w = 500
    this.h = 100

    this.floor = floor
    this.y = this.floor.y - this.h
    this.x = this.floor.floorW * 0.40
  }

  move() {
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
    super(ctx, canvasW, canvasH, url)

    this.w = 200
    this.h = 100

    this.floor = floor
    this.y = this.floor.y - this.h
    this.x = this.floor.floorW * 0.75
  }

  move() {
    // La posicion X e Y sigue a la X e Y del suelo
    this.y = this.floor.y - this.h
    this.x -= this.velX

    if (this.x + this.w < 0) {
      this.x = this.floor.x + this.floor.floorW + this.floor.enclineFloorW + this.floor.floorW * 0.75
    }
  }

}
