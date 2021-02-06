import Snek from "./components/snek.js"
import Food from "./components/food.js"

const score = document.getElementById("score")
const overlay = document.getElementById("overlay")

document.addEventListener("keyup", inputListener)
overlay.style.display = "none"

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width
const HEIGHT = canvas.height
const SIZE = 10
let SPEED = 200

const STATES = {
    MENU: 0,
    PLAY: 1,
    PAUSE: 2,
    FINISHED: 3,
}

let GAME_STATE = 0
let SCORE = 0
let DIRECTION = { x: 0, y: 1 }

let snek = new Snek(WIDTH, HEIGHT, SIZE)
const food = new Food(WIDTH, HEIGHT, SIZE)

let lastInput = 0
function inputListener(e) {
    if (e.timeStamp - lastInput <= SPEED) return
    switch (e.keyCode) {
        case 87: // W
        case 38:
            if (DIRECTION.y !== 1) {
                DIRECTION.x = 0
                DIRECTION.y = -1
            }
            break
        case 65: // A
        case 37:
            if (DIRECTION.x !== 1) {
                DIRECTION.x = -1
                DIRECTION.y = 0
            }
            break
        case 83: // S
        case 40:
            if (DIRECTION.y !== -1) {
                DIRECTION.x = 0
                DIRECTION.y = 1
            }
            break
        case 68: // D
        case 39:
            if (DIRECTION.x !== -1) {
                DIRECTION.x = 1
                DIRECTION.y = 0
            }
            break
        case 32: // SPACE
            toggleGameState()
            break
        case 13: // ENTER
            overlay.style.display = "none"
            break
        default:
            console.warn(`${e.keyCode} is not a supported input`)
    }
    lastInput = e.timeStamp
}

function resetScore() {
    score.innerText = ""
}

function refreshScore() {
    score.innerText = `Score: ${SCORE}`
}

function play(timestamp) {
    const delta = timestamp - lastTime
    lastTime = timestamp
    elapsedTime += delta
    refreshScore()

    if (elapsedTime >= SPEED) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        if (snek.x === food.x && snek.y === food.y) {
            snek.eat(food)
            food.update(WIDTH, HEIGHT, SIZE)
            SCORE += 10
            SPEED = SPEED > 10 ? SPEED - 5 : 10
            refreshScore()
        }

        if (snek.hitBorder(WIDTH, HEIGHT) || snek.biteSelf()) {
            GAME_STATE = 3
        }

        food.draw(ctx)
        snek.update(DIRECTION)
        snek.draw(ctx)

        elapsedTime = 0
    }
}

function toggleGameState() {
    GAME_STATE = GAME_STATE === 1 ? 2 : 1
    overlay.style.display = GAME_STATE === 1 ? "none" : "block"
    requestAnimationFrame(update)
}

function resetGame() {
    GAME_STATE = 0
    SCORE = 0
    SPEED = 200
    DIRECTION = { x: 0, y: 1 }
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    resetScore()
    snek = new Snek(WIDTH, HEIGHT, SIZE)
    food.update()
}

function displayMenu() {
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "#000"
    ctx.fillText("PRESS `SPACE` TO PLAY", canvas.width / 2, canvas.height / 2)
}

let lastTime = 0
let elapsedTime = 0

function update(timestamp) {
    switch (GAME_STATE) {
        case 1:
            play(timestamp)
            break
        case 2:
            overlay.innerHTML = "<h1>PAUSE</h1>"
            overlay.style.display = "block"
            break
        case 3:
            overlay.innerHTML =
                "<h1>GAME OVER !!!</h1> <h3>PRESS `ENTER` FOR MENU</h3><h3>PRESS `SPACE` TO RESTART</h3>"
            overlay.style.display = "block"
            resetGame()
            break
        default:
            displayMenu()
            break
    }

    requestAnimationFrame(update)
}

requestAnimationFrame(update)
