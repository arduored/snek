import Snek from "./snek.js"
import Food from "./food.js"

document.addEventListener("keyup", inputListener)

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

const WIDTH = 800
const HEIGHT = 600
const SPEED = 200
const SIZE = 10

const snek = new Snek(WIDTH, HEIGHT, SIZE, SPEED)
const food = new Food(WIDTH, HEIGHT, SIZE)
const direction = { x: 0, y: 1 }

function inputListener(e) {
    switch (e.keyCode) {
        case 87: // W
        case 38:
            direction.x = 0
            direction.y = -1
            break
        case 65: // A
        case 37:
            direction.x = -1
            direction.y = 0
            break
        case 83: // S
        case 40:
            direction.x = 0
            direction.y = 1
            break
        case 68: // D
        case 39:
            direction.x = 1
            direction.y = 0
            break
        default:
            console.warn("Not a supported input")
    }
}

let lastTime = 0
let elapsedTime = 0

function update(timestamp) {
    const delta = timestamp - lastTime
    lastTime = timestamp
    elapsedTime += delta

    if (elapsedTime > SPEED) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        if (snek.x === food.x && snek.y === food.y) {
            snek.eat(food)
            food.update(WIDTH, HEIGHT, SIZE)
        }

        if (snek.hitBorder(WIDTH, HEIGHT)) {
            alert("GAME OVER !!!")
        }

        food.draw(ctx)

        snek.update(direction)
        snek.draw(ctx)

        elapsedTime = 0
    }
    requestAnimationFrame(update)
}

requestAnimationFrame(update)
