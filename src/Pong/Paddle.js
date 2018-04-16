export class Paddle{
    constructor(paddleSvg, boardHeight) {
        this.paddleSvg = paddleSvg;
        this.boardHeight = boardHeight;

        this.height = paddleSvg.height();
        this.originalY = this.y = paddleSvg.y();

        this.speed = (this.height/5);

        this.reset();
    }

    bbox() {
        return this.paddleSvg.bbox();
    }

    moveUp() {
        this.isDirty = true;

        this.y = Math.max(0, (this.y - this.speed));
    }

    moveDown() {
        this.isDirty = true;

        this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed));
    }

    reset() {
        this.isDirty = true;

        this.y = this.originalY;
    }

    render() {
        if(!this.isDirty){
            return;
        }
        this.paddleSvg.y(this.y);

        this.isDirty = false;
    }
}
