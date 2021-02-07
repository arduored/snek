export default class Food {
    constructor(game) {
        this.size = game.size
        this.xRange = game.width / 10
        this.yRange = game.height / 10
        this.x = this.getRandomCoordinate(this.xRange)
        this.y = this.getRandomCoordinate(this.yRange)
    }

    update() {
        this.x = this.getRandomCoordinate(this.xRange, this.size)
        this.y = this.getRandomCoordinate(this.yRange, this.size)
    }

    draw(ctx) {
        ctx.fillStyle = "#2ecc71"
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    getRandomCoordinate(max) {
        max = Math.floor(max)
        return Math.floor(Math.random() * max) * this.size
    }
}
