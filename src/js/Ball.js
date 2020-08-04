export default class Ball {
    constructor(ctx, params) {
        this.ctx = ctx;
        this.params = params;
    }

    init() {
        const { x, y, radius } = this.params;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.params.color || 'red';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
