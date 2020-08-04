export default class Brick {
    constructor(ctx, params) {
        this.ctx = ctx;
        this.params = params;
    }

    init() {
        const {
            x, y, width, height, color,
        } = this.params;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = color || 'red';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
