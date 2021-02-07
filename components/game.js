export default class Game {
    DEFAULT_SPEED = 200
    DEFAULT_SIZE = 10
    DEFAULT_DIRECTION = { x: 0, y: 1 }
    STATES = {
        MENU: 0,
        PLAY: 1,
        PAUSE: 2,
        GAMEOVER: 3,
    }

    ui = {
        score: document.getElementById("score"),
        overlay: document.getElementById("overlay"),
    }
    elapsedTime = 0

    constructor(canvas) {
        this.width = canvas.width
        this.height = canvas.height
        this.ctx = canvas.getContext("2d")
        this.speed = this.DEFAULT_SPEED
        this.size = this.DEFAULT_SIZE
        this.direction = { ...this.DEFAULT_DIRECTION }
        this.state = this.STATES.MENU
        this.score = 0
        this.ui.overlay.style.display = "none"
    }

    displayMenu() {
        this.ctx.font = "30px Arial"
        this.ctx.textAlign = "center"
        this.ctx.fillStyle = "#000"
        this.ctx.fillText(
            "PRESS `SPACE` TO PLAY",
            this.width / 2,
            this.height / 2
        )
    }

    displayPause() {
        this.ui.overlay.innerHTML = "<h1>PAUSE</h1>"
        this.ui.overlay.style.display = "block"
    }

    over(snek, food) {
        this.ui.overlay.innerHTML =
            "<h1>GAME OVER !!!</h1> <h3>PRESS `ENTER` FOR MENU</h3><h3>PRESS `SPACE` TO RESTART</h3>"
        this.ui.overlay.style.display = "block"
        this.reset(snek, food)
    }

    refreshScore() {
        this.ui.score.innerText = `Score: ${this.score}`
    }

    reset(snek, food) {
        this.ui.score.innerText = ""
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.speed = this.DEFAULT_SPEED
        this.direction = { ...this.DEFAULT_DIRECTION }
        this.score = 0
        snek.reset(this)
        food.update()
    }

    togglePauseState() {
        this.state =
            this.state === this.STATES.PLAY
                ? this.STATES.PAUSE
                : this.STATES.PLAY
        this.ui.overlay.style.display =
            this.state === this.STATES.PLAY ? "none" : "block"
    }

    update(delta, snek, food) {
        this.elapsedTime += delta
        this.refreshScore()
        if (this.elapsedTime >= this.speed) {
            this.ctx.clearRect(0, 0, this.width, this.height)
            if (snek.x === food.x && snek.y === food.y) {
                snek.eat(food)
                food.update()
                this.score += 10
                this.speed = this.speed > 10 ? this.speed - 5 : 10
                this.refreshScore()
            }

            if (snek.hitBorder(this) || snek.biteSelf()) {
                this.state = this.STATES.GAMEOVER
            }

            food.draw(this.ctx)
            snek.update(this.direction)
            snek.draw(this.ctx)

            this.elapsedTime = 0
        }
    }
}
