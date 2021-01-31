import Snek from "./snek.js"
import Food from "./food.js"

const score = document.getElementById("score")

document.addEventListener("keyup", inputListener)

const canvas = document.getElementById("game-canvas")
const screenPause = document.getElementById("pause-screen")
const ctx = canvas.getContext("2d")

const WIDTH = 800
const HEIGHT = 600
let SPEED = 200
const SIZE = 10

const STATES = {
    MENU: 0,
    PLAY: 1,
    PAUSE: 2,
    FINISHED: 3,
}

let GAME_STATE = 0
let SCORE = 0

let snek = new Snek(WIDTH, HEIGHT, SIZE, SPEED)
const food = new Food(WIDTH, HEIGHT, SIZE)
const direction = { x: 0, y: 1 }

function inputListener(e) {
    switch (e.keyCode) {
        case 87: // W
        case 38:
            if (direction.y !== 1) {
                direction.x = 0
                direction.y = -1
            }
            break
        case 65: // A
        case 37:
            if (direction.x !== 1) {
                direction.x = -1
                direction.y = 0
            }
            break
        case 83: // S
        case 40:
            if (direction.y !== -1) {
                direction.x = 0
                direction.y = 1
            }
            break
        case 68: // D
        case 39:
            if (direction.x !== -1) {
                direction.x = 1
                direction.y = 0
            }
            break
        case 32:
            toggleGameState()
            break
        default:
            console.warn(`${e.keyCode} is not a supported input`)
    }
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

    if (elapsedTime > SPEED) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        if (snek.x === food.x && snek.y === food.y) {
            snek.eat(food)
            food.update(WIDTH, HEIGHT, SIZE)
            SCORE += 10
            refreshScore()
        }

        if (snek.hitBorder(WIDTH, HEIGHT) || snek.biteSelf()) {
            GAME_STATE = 3
        }

        food.draw(ctx)

        snek.update(direction)
        snek.draw(ctx)

        elapsedTime = 0
    }
}

function toggleGameState() {
    GAME_STATE = GAME_STATE === 1 ? 2 : 1

    requestAnimationFrame(update)
}

function resetGame() {
    GAME_STATE = 0
    SCORE = 0
    SPEED = 200
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    resetScore()
    snek = new Snek(WIDTH, HEIGHT, SIZE, SPEED)
    food.update(WIDTH, HEIGHT, SIZE)
}

let lastTime = 0
let elapsedTime = 0

function update(timestamp) {
    switch (GAME_STATE) {
        case 1:
            play(timestamp)
            break
        case 2:
            //display pause screen
            break
        case 3:
            alert("GAME OVER!!")
            resetGame()
            break
        default:
            //display menu
            break
    }

    requestAnimationFrame(update)
}

requestAnimationFrame(update)
