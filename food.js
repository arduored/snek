export default class Food {
    constructor(width, height, size) {
        this.x = this.getRandomCoordinate(width / 10, size)
        this.y = this.getRandomCoordinate(height / 10, size)
        this.size = size
    }

    update(width, height, size) {
        this.x = this.getRandomCoordinate(width / 10, size)
        this.y = this.getRandomCoordinate(height / 10, size)
    }

    draw(ctx) {
        ctx.fillStyle = "#2ecc71"
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    getRandomCoordinate(max, size) {
        max = Math.floor(max)
        return Math.floor(Math.random() * max) * size
    }
}
