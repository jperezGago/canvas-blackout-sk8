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

  // // Captura el boton controls
  // const controlsButton = document.getElementById('controls')
  buttons[0].onclick = () => {
    console.log(buttons)
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
