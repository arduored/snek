export default class Snek {
    constructor(gameWidth, gameHeight, gameObjectSize, gameSpeed) {
        this.x = gameWidth / 2
        this.y = gameHeight / 2
        this.size = gameObjectSize
        this.tail = [
            { x: gameWidth / 2, y: gameHeight / 2 - gameObjectSize },
            { x: gameWidth / 2, y: gameHeight / 2 - gameObjectSize * 2 },
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

    draw(ctx) {
        ctx.fillStyle = "#F00"
        ctx.fillRect(this.x, this.y, this.size, this.size)

        for (const rim of this.tail) {
            ctx.fillStyle = "#128"
            ctx.fillRect(rim.x, rim.y, this.size, this.size)
        }
    }

    eat(food) {
        this.tail.push(food)
    }

    hitBorder(gameWidth, gameHeight) {
        return (
            this.x + 10 > gameWidth ||
            this.x < 0 ||
            this.y + 10 > gameHeight ||
            this.y < 0
        )
    }

    biteSelf() {
        const contact = this.tail.find(
            (rim) => this.x === rim.x && this.y === rim.y
        )

        return contact
    }
}
