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
  keys: {
    TOP_KEY: 38,
    SPACE: 32
  },
  // Referente al obstaculo
  obstacleFence: undefined,
  urlObstacleFence: 'images/obstaculos/fence.png',
  obstaclesArray: undefined,
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
      // if (this.checkCollision()) this.gameOver()
      if (this.checkCollision()) alert('BOOOM')

    }, 1000 / this.fps)

  },

  //reseteamos todos los elementos del juego para empezar en un estado limpio
  reset: function () {
    this.generateBackground()
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys.SPACE)
    this.floor = new Floor(this.ctx, this.canvas.width, this.canvas.height, this.urlFloor, this.keys.SPACE, this.player.x)
    // Obstaculo de tipo fence
    this.obstacleFence = new ObstacleFence(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleFence, this.floor)
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

  //dibuja todos los assets del juego
  drawAll: function () {
    // this.backgroundArray.forEach(background => {
    //   background.draw()
    // })

    this.floor.draw()
    // obstaculos
    this.obstacleFence.draw()
    this.player.draw(this.framesCounter)
  },

  //mueve todos los objetos del escenario, el fondo, el jugador y los obstáculos
  moveAll: function () {
    // this.backgroundArray.forEach(background => {
    //   background.move()
    // })

    this.floor.move()
    this.player.move()
    // obstaculos
    this.obstacleFence.move()
  },


  checkCollision: function () {

    const gapX = 80
    const gapY = 20
    console.log(
      this.player.x + this.player.w >= this.floor.x + this.floor.floorW + gapX
      // this.floor.y0 >= this.floor.y,
      // this.floor.x + this.floor.floorW, this.floor.x,
      // this.floor.x + this.floorW + this.floor.enclineFloorW > this.floor.x
    )
    return (
      (
        // Colision con las vallas
        this.player.x + this.player.w >= this.obstacleFence.x + gapX &&
        this.obstacleFence.x + this.obstacleFence.w >= this.player.x &&
        (this.player.y + this.player.h >= this.obstacleFence.y + gapY && this.player.y + this.player.h <= this.obstacleFence.y + gapY + 5)
        && this.floor.velY <= 0
      )
      ||
      (
        // this.player.x + this.player.w >= this.floor.x + this.floor.floorW + gapX &&
        // this.floor.x + this.floor.floorW + this.floor.enclineFloorW >= this.player.x &&
        // // this.floor.y + this.floor.h >= this.player.y &&
        // this.player.y + this.player.h >= this.floor.y + gapY

        this.floor.y0 >= this.floor.y &&
        this.player.x + this.player.w / 2 >= this.floor.x + this.floor.floorW + gapX

        // Colision con las escaleras
        // this.player.x + this.player.w >= this.floor.x + gapX &&
        // this.floor.x + this.floor.w >= this.player.x &&
        // (this.player.y + this.player.h >= this.floor.y + gapY && this.player.y + this.player.h <= this.floor.y + gapY + 5)
      )
    )

  },

}