window.onload = function () {

  const container = document.getElementById('container')
  const canvas = document.getElementById('canvas')

  const help = document.getElementById('help')
  const startButton = document.getElementById('start')
  const buttons = document.getElementsByClassName('button')

  buttons[1].onclick = () => {
    // Oculta el container
    container.style.display = 'none'
    // Muestra el canvas
    canvas.style.display = 'block'
  }

  buttons[0].onclick = () => {
    // Mueve los botones hacia la izquierda
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('button-moved')
    }
    // Muestra la ayuda
    help.style.display = 'block'

  }

  // Se crea la etiqueta canvas
  // const parentCanvas = document.getElementById('game-board')
  // parentCanvas.innerHTML = `<canvas id="canvas"></canvas>`
  Game.init("canvas");
};


updateGameOver = function (message) {
  const containerGameover = document.getElementById('container-gameover')
  const buttons1 = document.getElementsByClassName('button1')
  const canvas = document.getElementById('canvas')
  const text = document.getElementById('text')

  containerGameover.style.display = 'block'

  buttons1[0].onclick = () => {
    // Oculta todo menos el canvas
    container.style.display = 'none'
    containerGameover.style.display = 'none'

  }

  buttons1[1].onclick = () => {
    // oculta todo menos el menu principal
    containerGameover.style.display = 'none'
    canvas.style.display = 'none'
    container.style.display = 'block'

  }

  text.innerText = message

}
