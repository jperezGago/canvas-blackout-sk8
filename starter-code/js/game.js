var Game = {
  canvas: undefined,
  ctx: undefined,
  canvasSizes: {
    w: undefined,
    h: undefined
  },
  fps: undefined,
  update: undefined,
  framesCounter: undefined,
  // Referente al background
  backgroundArray: [],
  urlBackgroundTop: 'images/parallax/cga_2back_dungeon/2_4.png',
  urlBackgroundBottom: 'images/parallax/cga_2back_dungeon/2_5.png',
  // Referente al player
  player: undefined,
  keys: {
    // TOP_KEY: 38,
    // SPACE: 32
  },
  // Referente al obstaculo
  obstacle: undefined,
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
      if (this.framesCounter % 100 === 0) {
        this.score++
        this.generateObstacle();
      }

      // Borra el canvas
      this.clear()
      // Llamadas a los metodos de dibujar y mover
      this.drawAll()
      this.moveAll()

      // eliminamos obstáculos fuera del canvas
      // this.clearObstacles();

      // Chequea las colisiones
      // if (this.checkCollision()) this.gameOver()

    }, 1000 / this.fps)

  },

  //reseteamos todos los elementos del juego para empezar en un estado limpio
  reset: function () {
    this.generateBackground()

  },

  //limpieza de la pantalla
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  // Introduce en el array de background la instancia de los backgrounds
  generateBackground: function () {
    this.backgroundArray.push(
      new Background(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundTop)
    )
    this.backgroundArray.push(
      new Background(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundBottom)
    )
  },

  //dibuja todos los assets del juego
  drawAll: function () {
    this.backgroundArray.forEach(background => {
      background.draw()
    })
  },

  //mueve todos los objetos del escenario, el fondo, el jugador y los obstáculos
  moveAll: function () {
    this.backgroundArray.forEach(background => {
      background.move()
    })
  },



}