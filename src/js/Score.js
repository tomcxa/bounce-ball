export default class Score {
    constructor(ctx, params) {
        this.ctx = ctx;
        this.params = params;
    }

    init() {
        const {
            font, color, text, position, maxScore,
        } = this.params;
        this.ctx.fillStyle = color || '#000';
        this.ctx.font = font || '24px Verdana';
        this.ctx.fillText(`Счет: ${text}/${maxScore}`, 10, position);
    }
}
