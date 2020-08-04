export default class Earth {
    constructor(ctx, params) {
        this.ctx = ctx;
        this.params = params;
    }

    init() {
        const {
            x, y, width, height,
        } = this.params;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
