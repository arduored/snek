import Game from "./components/game"
import Snek from "./components/snek.js"
import Food from "./components/food.js"

document.addEventListener("keyup", inputListener)

const canvas = document.getElementById("game-canvas")
const game = new Game(canvas)
const food = new Food(game)
let snek = new Snek(game)
let lastInput = 0

function inputListener(e) {
    if (e.timeStamp - lastInput <= game.speed) return
    switch (e.keyCode) {
        case 87: // W
        case 38:
            if (game.direction.y !== 1) {
                game.direction.x = 0
                game.direction.y = -1
            }
            break
        case 65: // A
        case 37:
            if (game.direction.x !== 1) {
                game.direction.x = -1
                game.direction.y = 0
            }
            break
        case 83: // S
        case 40:
            if (game.direction.y !== -1) {
                game.direction.x = 0
                game.direction.y = 1
            }
            break
        case 68: // D
        case 39:
            if (game.direction.x !== -1) {
                game.direction.x = 1
                game.direction.y = 0
            }
            break
        case 32: // SPACE
            game.togglePauseState()
            break
        case 13: // ENTER
            if (game.state === game.STATES.GAMEOVER) {
                game.state = game.STATES.MENU
                game.ui.overlay.style.display = "none"
            }
            break
        default:
            console.warn(`${e.keyCode} is not a supported input`)
    }
    lastInput = e.timeStamp
}

let lastTime = 0
function update(timestamp) {
    const delta = timestamp - lastTime
    lastTime = timestamp
    switch (game.state) {
        case 1:
            game.update(delta, snek, food)
            break
        case 2:
            game.displayPause()
            break
        case 3:
            game.over(snek, food)
            break
        default:
            game.displayMenu()
            break
    }

    requestAnimationFrame(update)
}

requestAnimationFrame(update)
