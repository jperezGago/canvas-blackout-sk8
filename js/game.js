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
  urlBackgroundFixed: 'images/parallax/1/layers/l1_background.png',
  urlBackground1: 'images/parallax/1/layers/l3_buildings01.png',
  urlBackground2: 'images/parallax/1/layers/l4_buildings02.png',
  urlBackground3: 'images/parallax/1/layers/l6_houses.png',
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
    P: 112,
    A: 97,
    S: 115
  },
  currentTrick: '',
  // ostaculos
  obstacleFence: undefined,
  urlObstacleFence: 'images/obstaculos/fence.png',
  obstaclesArray: undefined,
  obstacleBench: undefined,
  urlObstacleBench: 'images/obstaculos/bench.png',
  // scoreboard
  scoreBoard: undefined,
  score: undefined,
  scoresSaved: [],
  // time
  timeBoard: undefined,
  time: undefined,
  timeStart: 60,
  // Tiempo de Sprites
  timeSprite: 0,
  // Juego comenzado
  gameStarted: false,




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

    // Llama al listener de teclado
    this.setListeners();

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

      // Cada medio segundo actualiza el tiempo
      if (this.framesCounter % 30 == 0 && this.gameStarted) this.updateTime()

      // Borra el canvas
      this.clear()
      // Llamadas a los metodos de dibujar y mover
      this.drawAll()
      this.moveAll()

      // Chequea las colisiones
      this.checkCollision()
      this.checkGrind()

      // Actualiza los sprites si es necesario
      this.updateSprites(undefined)

    }, 1000 / this.fps)

  },

  //reseteamos todos los elementos del juego para empezar en un estado limpio
  reset: function () {
    this.framesCounter = 0;
    //player
    this.keyImgPlayer = 'stoppedImg'
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys.SPACE)
    // Floor
    this.floor = new Floor(this.ctx, this.canvas.width, this.canvas.height, this.urlFloor, this.keys, this.player.x)
    //background
    this.generateBackground()
    // Obstaculo de tipo fence
    this.obstacleFence = new ObstacleFence(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleFence, this.floor)
    this.obstacleBench = new ObstacleBench(this.ctx, this.canvas.width, this.canvas.height, this.urlObstacleBench, this.floor)
    // Score
    this.scoreBoard = new ScoreBoard(this.ctx, this.canvas.width)
    this.score = 0;
    // Time
    this.timeBoard = new Time(this.ctx, this.canvas.width)
    this.time = this.timeStart;
    this.gameStarted = false;
  },

  //limpieza de la pantalla
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  // Listener de teclado
  setListeners: function () {
    document.onkeypress = e => {
      // Down
      if (e.keyCode == this.keys.SPACE && this.floor.y == this.floor.y0) {
        this.updateSprites('downImg')
      }
      // Stop 
      if (e.keyCode == this.keys.P) {
        this.stopGame()
      }
      // Continue
      if (e.keyCode == this.keys.ENTER) {
        this.continue()
      }
      // Shove-it trick
      if (e.keyCode == this.keys.A) {
        this.doTrick('shoveitTrickImg')
        this.currentTrick = 'X1 Pop Shove-it!'
      }
      // Tre-Flip trick
      if (e.keyCode == this.keys.S) {
        this.doTrick('treflipTrickImg')
        this.currentTrick = 'X1 Tre flip!'

      }
    }
    document.onkeyup = e => {
      // Jump
      if (e.keyCode == this.keys.SPACE && this.floor.y == this.floor.y0) {
        this.jump()
      }
    }
  },

  // Introduce en el array de background la instancia de los backgrounds
  generateBackground: function () {
    this.backgroundArray.push(
      new BackgroundFixed(this.ctx, this.canvas.width, this.canvas.height, this.urlBackgroundFixed, this.floor),
      new Background1(this.ctx, this.canvas.width, this.canvas.height, this.urlBackground1, this.floor),
      new Background2(this.ctx, this.canvas.width, this.canvas.height, this.urlBackground2, this.floor),
      new Background3(this.ctx, this.canvas.width, this.canvas.height, this.urlBackground3, this.floor)
    )
  },

  drawAll: function () {
    this.backgroundArray.forEach(background => {
      background.draw()
    })
    this.floor.draw()
    this.obstacleFence.draw()
    this.obstacleBench.draw()
    this.player.draw(this.keyImgPlayer, this.framesCounter)
    this.scoreBoard.draw(this.score)
    this.timeBoard.draw(this.time)
    this.player.printTricks(this.currentTrick)

  },

  moveAll: function () {
    this.backgroundArray.forEach(background => {
      background.move()
    })
    this.floor.move()
    this.player.move()
    this.obstacleFence.move()
    this.obstacleBench.move()
  },

  checkCollision: function () {
    const gapX = 80
    const gapY = 20

    // Si esta cayendose, esperar a que se muestre el sprite entero
    if (this.keyImgPlayer == 'dawnFallingImg' && this.player.endSprite) {
      this.stopGame()
      this.updateSprites('movingImg')
      // Colision con las escaleras
    } else if (this.floor.y0 >= this.floor.y &&
      this.player.x >= this.floor.x + this.floor.floorW &&
      this.player.x <= this.floor.x + this.floor.floorW + this.floor.enclineFloorW) {
      this.updateSprites('dawnFallingImg')
    }
    // Colisiones en los trucos
    else if ((this.keyImgPlayer == 'shoveitTrickImg' || this.keyImgPlayer == 'treflipTrickImg') && this.floor.y <= this.floor.y0) {
      this.updateSprites('dawnFallingImg')
      this.updateTime('collision')
    }


  },

  checkGrind: function () {

    if (this.isGrinding()) {
      this.grind()
      this.updateSprites('grindingImg')
    }
    // Si esta grindando y se ha terminado la valla
    if ((this.floor.y0 == this.floor.yin + 90) && !this.isGrinding()) {
      this.floor.y0 = this.floor.yin
      // actualiza el Score
      this.updateScore()
      this.updateTime('trick')
    }
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

  grind: function () {
    this.floor.y0 = this.floor.yin + 90
    // Actualiza el nombre del truco que se va a imprimir
    this.currentTrick = 'X1 Grind!'
  },

  updateSprites: function (keyImg) {
    const gapX = 5

    if (keyImg == undefined) {

      if ((this.keyImgPlayer == 'jumpImg') && this.floor.y <= this.floor.y0) this.keyImgPlayer = 'movingImg'

      // Tras grindar
      if (this.keyImgPlayer == 'grindingImg' && this.floor.y0 == this.floor.yin) this.keyImgPlayer = 'movingImg'
      // Si esta corriendo
      if (this.keyImgPlayer == 'runningImg') {
        this.timeSprite++
        if (this.timeSprite >= 60) {
          this.keyImgPlayer = 'skatingImg'
          this.timeSprite = 0
        }
      }
      // Si esta patinando
      if (this.keyImgPlayer == 'skatingImg') {
        this.timeSprite++
        if (this.timeSprite >= 100) {
          this.keyImgPlayer = 'movingImg'
          this.timeSprite = 0
        }
      }

      // Si esta haciendo un truco
      if ((this.keyImgPlayer == 'shoveitTrickImg' || this.keyImgPlayer == 'treflipTrickImg') && this.player.endSprite)
        this.keyImgPlayer = 'movingImg'



    } else this.keyImgPlayer = keyImg
  },

  updateScore: function () {
    this.score += 5
  },

  updateTime: function (update) {
    if (update == 'collision') {
      this.time -= 22
    }
    else if (update == 'trick') {
      this.time += 2
    } else this.time--

    if (this.time < 0) this.gameOver()
  },

  stopGame: function () {
    this.updateSprites('stoppedImg')
    this.floor.stop()
  },

  continue: function () {
    // Si no ha comenzado el juego, lo comienza
    if (this.time == this.timeStart) this.goStart()

    // this.keyImgPlayer = 'movingImg'
    this.updateSprites('runningImg')
    this.floor.continue()
  },

  jump: function () {
    this.updateSprites('jumpImg')
    this.floor.jump()
  },

  goStart: function () {
    this.gameStarted = true
  },

  doTrick: function (trick) {
    if (this.floor.y > this.floor.y0) {
      this.updateSprites(trick)
      this.updateScore()
      this.updateTime('trick')
    }
  },

  gameOver: function () {
    let message
    // Record
    if (+localStorage.getItem("Player score") <= this.score) {
      localStorage.setItem('Player score', this.score)
      console.log("Nuevo record:"), this.score;
      // this.drawRecord(`Nuevo record: ${this.score}`)
      message = `Nuevo record: ${this.score}`

    } else console.log("El record sigue siendo:", localStorage.getItem("Player score"))

    console.log(localStorage.getItem("Player score"))
    clearInterval(this.update)

    this.start();
    this.stopGame()

    // Funcion que vuelve a la pantalla principal
    updateGameOver(message)

  },

  drawRecord: function (message) {
    this.ctx.font = "100px sans-serif"

    this.ctx.fillStyle = "white"
    this.ctx.fillText(message, this.x, this.y)
  }



}