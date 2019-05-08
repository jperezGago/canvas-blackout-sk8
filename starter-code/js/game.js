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
  // Referente al background
  backgroundArray: [],
  urlBackgroundFixed: 'images/parallax/cga_2back_dungeon/2_1.png',
  urlBackgroundBottom: 'images/parallax/cga_2back_dungeon/2_5.png',
  urlBackgroundTop: 'images/parallax/cga_2back_dungeon/2_4.png',
  // Referente a Floor
  floor: undefined,
  urlFloor: 'images/floor/floor.png',
  // Referente al player
  player: undefined,
  urlPlayer: 'images/player/skater-skating.png',
  keys: {
    TOP_KEY: 38,
    SPACE: 32
  },
  numSpriteFrames: 13,
  // Referente al obstaculo
  obstacleFence: undefined,
  urlObstacleFence: 'images/obstaculos/fence.png',
  obstaclesArray: undefined,
  obstacleBench: undefined,
  urlObstacleBench: 'images/obstaculos/bench.png',
  // Referente al Scoreboard
  scoreBoard: undefined,
  score: undefined,

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

    // Update 
    this.update = setInterval(() => {
      // Aumenta en 1 el contador
      this.framesCounter++;
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // controlamos la velocidad de generación de obstáculos y el score cada segundo
      // if (this.framesCounter % 100 === 0) {
      //   this.score++
      //   this.generateObstacle();
      // }

      // Borra el canvas
      this.clear()
      // Llamadas a los metodos de dibujar y mover
      this.drawAll()
      this.moveAll()

      // eliminamos obstáculos fuera del canvas
      // this.clearObstacles();

      // Chequea las colisiones
      this.checkCollision()

      // Chequea los grinds
      if (this.checkGrind()) this.grind()
      // Si esta grindando y se ha terminado la valla
      if ((this.floor.y0 == this.floor.yin + 90) && !this.checkGrind()) this.floor.y0 = this.floor.yin


    }, 1000 / this.fps)

  },

  //reseteamos todos los elementos del juego para empezar en un estado limpio
  reset: function () {
    this.generateBackground()
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys.SPACE)
    this.floor = new Floor(this.ctx, this.canvas.width, this.canvas.height, this.urlFloor, this.keys.SPACE, this.player.x)
    // Obstaculo de tipo fence
    this.obstacleFence = new ObstacleFence(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleFence, this.floor)
    this.obstacleBench = new ObstacleBench(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleBench, this.floor)
  },

  //limpieza de la pantalla
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.player.draw(this.urlPlayer, this.framesCounter, this.numSpriteFrames)
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

  /**************************************************************************************
  /* Separar esta funcion en checkCollision y checkGrind
  ***************************************************************************************/
  checkCollision: function () {
    const gapX = 80
    const gapY = 20

    // Colision con las vallas
    // if (this.checkValla()) this.grind()

    // Si esta grindando y se ha terminado la valla
    // if ((this.floor.y0 == this.floor.yin + 90) && !this.checkValla()) this.floor.y0 = this.floor.yin

    // Colision con el desnivel
    if (
      this.floor.y0 >= this.floor.y &&
      this.player.x + this.player.w / 2 >= this.floor.x + this.floor.floorW + gapX) {
      this.dawnFall()
    }
  },

  checkGrind: function () {
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

  // checkValla: function () {
  //   const gapX = 80
  //   const gapY = 20

  //   if (
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

  dawnFall: function () {
    this.urlPlayer = 'images/player/downfall.png'
    this.numSpriteFrames = 16
    // alert('BOOM!')
  },

  grind: function () {
    this.floor.y0 = this.floor.yin + 90
  },

  reseteaGrindada: function () {
    this.floor.y0 = this.floor.yin
  }

}