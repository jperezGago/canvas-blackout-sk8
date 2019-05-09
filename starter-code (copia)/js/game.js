var Game = {
  canvas: undefined,
  ctx: undefined,
  canvasSizes: {
    w: undefined,
    h: undefined
  },
  fps: undefined,
  update: undefined,
  framesCounter: 0,
  // background
  backgroundArray: [],
  urlBackgroundFixed: 'images/parallax/cga_2back_dungeon/2_1.png',
  urlBackgroundBottom: 'images/parallax/cga_2back_dungeon/2_5.png',
  urlBackgroundTop: 'images/parallax/cga_2back_dungeon/2_4.png',
  // floor
  floor: undefined,
  urlFloor: 'images/floor/floor.png',
  // player
  player: undefined,
  keyImgPlayer: undefined,
  keys: {
    TOP_KEY: 38,
    SPACE: 32,
    ENTER: 13,
    P: 112
  },
  // ostaculos
  obstacleFence: undefined,
  urlObstacleFence: 'images/obstaculos/fence.png',
  obstaclesArray: undefined,
  obstacleBench: undefined,
  urlObstacleBench: 'images/obstaculos/bench.png',
  // scoreboard
  scoreBoard: undefined,
  score: undefined,
  // time
  timeBoard: undefined,
  time: undefined,


  init: function (canvasId) {
    // Obtenemos el id del canvas, extraemos el objeto canvas y el contexto
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    // Inicializaciones
    this.canvasSizes.w = window.innerWidth
    this.canvasSizes.h = window.innerHeight
    this.fps = 60

    // llamadas de inicializacion
    this.setDimensions()
    this.setHandlers()

    // Start
    this.start()
  },

  // Edita las dimensiones en el canvas
  setDimensions: function () {
    this.canvas.setAttribute('width', this.canvasSizes.w)
    this.canvas.setAttribute('height', this.canvasSizes.h)
  },

  // Redimensiona el canvas con las modificaciones del ancho de pantall
  setHandlers: function () {
    window.onresize = () => this.setDimensions()
  },

  start: function () {
    // Resetea todos los elementos del juego
    this.reset()

    // Llama al listener de teclado
    this.setListeners();


    // Update 
    this.update = setInterval(() => {
      // Aumenta en 1 el contador
      this.framesCounter++;
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 60 == 0 && this.time < 100) this.time--


      // controlamos la velocidad de generación de obstáculos y el score cada segundo
      // if (this.framesCounter % 100 === 0) {
      //   this.score++
      //   this.generateObstacle();
      // }

      // eliminamos obstáculos fuera del canvas
      // this.clearObstacles();

      // Borra el canvas
      this.clear()
      // Llamadas a los metodos de dibujar y mover
      this.drawAll()
      this.moveAll()

      // Chequea las colisiones
      this.checkCollision()
      // Chequea los grinds
      // if (this.checkGrind()) this.grind()
      // Si esta grindando y se ha terminado la valla
      // if ((this.floor.y0 == this.floor.yin + 90) && !this.checkGrind()) this.floor.y0 = this.floor.yin
      this.checkGrind()

      // Actualiza los sprites si es necesario
      this.updateSprites(undefined)

    }, 1000 / this.fps)

  },

  //reseteamos todos los elementos del juego para empezar en un estado limpio
  reset: function () {
    this.framesCounter = 0;
    //background
    this.generateBackground()
    //player
    this.keyImgPlayer = 'stoppedImg'
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys.SPACE)
    this.floor = new Floor(this.ctx, this.canvas.width, this.canvas.height, this.urlFloor, this.keys, this.player.x)
    // Obstaculo de tipo fence
    this.obstacleFence = new ObstacleFence(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleFence, this.floor)
    this.obstacleBench = new ObstacleBench(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleBench, this.floor)
    // Score
    this.scoreBoard = new ScoreBoard(this.ctx, this.canvas.width)
    this.score = 0;
    // Time
    this.timeBoard = new Time(this.ctx, this.canvas.width)
    this.time = 100;
  },

  //limpieza de la pantalla
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  // Listener de teclado
  setListeners: function () {
    document.onkeypress = e => {
      // Jump
      if (e.keyCode == this.keys.SPACE) {
        // this.keyImgPlayer = 'jumpImg'
        // this.updateSprites('jumpImg')
        // this.floor.jump()
        this.jump()
      }
      // Stop 
      if (e.keyCode == this.keys.P) {
        // this.keyImgPlayer = 'stopedImg'
        // this.updateSprites('stoppedImg')
        // this.floor.stop()
        this.stop()
      }
      // Continue
      if (e.keyCode == this.keys.ENTER) {
        // this.keyImgPlayer = 'movingImg'
        // this.updateSprites('movingImg')
        // this.floor.continue()
        this.continue()
      }
    }
  },

  // Introduce en el array de background la instancia de los backgrounds
  generateBackground: function () {
    this.backgroundArray.push(
      new BackgroundFixed(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundFixed),
      new BackgroundBottom(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundBottom),
      new BackgroundTop(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundTop, this.urlObstacleFence)
    )
  },

  drawAll: function () {
    // this.backgroundArray.forEach(background => {
    //   background.draw()
    // })
    this.floor.draw()
    this.obstacleFence.draw()
    this.obstacleBench.draw()
    this.player.draw(this.keyImgPlayer, this.framesCounter)
    this.scoreBoard.draw(this.score)
    this.timeBoard.draw(this.time)
  },

  moveAll: function () {
    // this.backgroundArray.forEach(background => {
    //   background.move()
    // })
    this.floor.move()
    this.player.move()
    this.obstacleFence.move()
    this.obstacleBench.move()
  },

  checkCollision: function () {
    const gapX = 80
    const gapY = 20

    // Colision con el desnivel
    if (
      this.floor.y0 >= this.floor.y &&
      this.player.x + this.player.w / 2 >= this.floor.x + this.floor.floorW + gapX
    )
      this.updateScore('collision')

    if (this.keyImgPlayer == 'dawnFallingImg' && this.floor.y0 == this.floor.yin)
      this.stop()

  },

  // checkGrind: function () {
  //   const gapX = 80
  //   const gapY = 20

  //   return (
  //     this.player.x + this.player.w >= this.obstacleFence.x + gapX &&
  //     this.obstacleFence.x + this.obstacleFence.w >= this.player.x &&
  //     (this.player.y + this.player.h >= this.obstacleFence.y && this.player.y + this.player.h <= this.obstacleFence.y + gapY + 10) &&
  //     // Direccion hacia abajo
  //     this.floor.velY <= 0
  //     ||
  //     this.player.x + this.player.w >= this.obstacleBench.x + gapX &&
  //     this.obstacleBench.x + this.obstacleBench.w >= this.player.x &&
  //     (this.player.y + this.player.h >= this.obstacleBench.y && this.player.y + this.player.h <= this.obstacleBench.y + gapY + 10) &&
  //     // Direccion hacia abajo
  //     this.floor.velY <= 0
  //   )
  // },

  checkGrind: function () {

    if (this.isGrinding()) {
      this.grind()
      this.updateSprites('grindingImg')
    }
    // Si esta grindando y se ha terminado la valla
    if ((this.floor.y0 == this.floor.yin + 90) && !this.isGrinding()) this.floor.y0 = this.floor.yin
  },

  isGrinding: function () {
    const gapX = 80
    const gapY = 20

    return (
      this.player.x + this.player.w >= this.obstacleFence.x + gapX &&
      this.obstacleFence.x + this.obstacleFence.w >= this.player.x &&
      (this.player.y + this.player.h >= this.obstacleFence.y && this.player.y + this.player.h <= this.obstacleFence.y + gapY + 10) &&
      // Direccion hacia abajo
      this.floor.velY <= 0
      ||
      this.player.x + this.player.w >= this.obstacleBench.x + gapX &&
      this.obstacleBench.x + this.obstacleBench.w >= this.player.x &&
      (this.player.y + this.player.h >= this.obstacleBench.y && this.player.y + this.player.h <= this.obstacleBench.y + gapY + 10) &&
      // Direccion hacia abajo
      this.floor.velY <= 0
    )
  },



  // dawnFall: function () {
  //   // Actualizar Score

  // },

  grind: function () {
    this.floor.y0 = this.floor.yin + 90
  },

  reseteaGrindada: function () {
    this.floor.y0 = this.floor.yin
  },

  updateSprites: function (keyImg) {
    const gapX = 5

    if (keyImg == undefined) {
      // Chequea que esta en el suelo para actualizar la imagen
      // if (this.player.currentSprite == 'jumpImg' && this.floor.onTheFloor()) this.keyImgPlayer = 'movingImg'
      if (this.player.currentSprite == 'jumpImg' && this.floor.y <= this.floor.y0) this.keyImgPlayer = 'movingImg'
      // Colision con el desnivel
      if (this.floor.y0 >= this.floor.y &&
        this.player.x + this.player.w / 2 >= this.floor.x + this.floor.floorW + gapX)
        this.keyImgPlayer = 'dawnFallingImg'
      // Tras caer por el desnivel
      if (this.keyImgPlayer == 'dawnFallingImg' && this.floor.y0 == this.floor.yin) this.keyImgPlayer = 'movingImg'
      // Tras grindar
      if (this.keyImgPlayer == 'grindingImg' && this.floor.y0 == this.floor.yin) this.keyImgPlayer = 'movingImg'

    } else this.keyImgPlayer = keyImg
  },

  updateScore: function (update) {
    if (update == 'collision') this.score -= 10
  },

  stop: function () {
    // this.keyImgPlayer = 'stoppedImg'
    this.updateSprites('stoppedImg')
    this.floor.stop()
  },

  continue: function () {
    // Si no ha comenzado el juego, lo comienza
    if (this.time == 100) this.goStart()

    // this.keyImgPlayer = 'movingImg'
    this.updateSprites('runningImg')
    this.floor.continue()
  },

  jump: function () {
    this.updateSprites('jumpImg')
    this.floor.jump()
  },

  goStart: function () {
    // this.updateSprites('runningImg')
    this.time--
  }


}