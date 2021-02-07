export default class Snek {
    constructor(game) {
        this.x = game.width / 2
        this.y = game.height / 2
        this.size = game.size
        this.tail = [
            { x: game.width / 2, y: game.height / 2 - game.size },
            { x: game.width / 2, y: game.height / 2 - game.size * 2 },
        ]
    }

    biteSelf() {
        return this.tail.find((rim) => this.x === rim.x && this.y === rim.y)
    }

    draw(ctx) {
        ctx.fillStyle = "#e84393"
        ctx.fillRect(this.x, this.y, this.size, this.size)

        for (const rim of this.tail) {
            ctx.fillStyle = "#81ecec"
            ctx.fillRect(rim.x, rim.y, this.size, this.size)
        }
    }

    eat(food) {
        this.tail.push(food)
    }

    hitBorder(game) {
        return (
            this.x + 10 > game.width ||
            this.x < 0 ||
            this.y + 10 > game.height ||
            this.y < 0
        )
    }

    reset(game) {
        this.x = game.width / 2
        this.y = game.height / 2
        this.size = game.size
        this.tail = [
            { x: game.width / 2, y: game.height / 2 - game.size },
            { x: game.width / 2, y: game.height / 2 - game.size * 2 },
        ]
    }

    update(direction) {
        let previous = { x: this.x, y: this.y }
        for (let i = 0; i < this.tail.length; i++) {
            const current = this.tail[i]
            this.tail[i] = { x: previous.x, y: previous.y }
            previous = current
        }

        this.x += this.size * direction.x
        this.y += this.size * direction.y
    }
}
