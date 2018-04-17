export class Paddle{
    constructor(paddleSvg, boardHeight, paddleSpeedFunction) {
        this.paddleSvg = paddleSvg;
        this.boardHeight = boardHeight;

        this.originHeight = paddleSvg.height();
        this.originalY = this.y = paddleSvg.y();

        this.paddleSpeedFunction = paddleSpeedFunction;

        this.reset();
    }

    get box() {
        return this.paddleSvg.bbox();
    }

    set currentShotBall(ball){
        this.currentShotBallInternal = ball;
    }
    get currentShotBall(){
        return this.currentShotBallInternal;
    }

    calculateSpeed() {
        return this.paddleSpeedFunction(this.box.height);
    }

    moveUp() {
        this.isDirty = true;

        this.y = Math.max(0, (this.y - this.calculateSpeed()));
    }

    moveDown() {
        this.isDirty = true;

        this.y = Math.min((this.boardHeight - this.box.height), (this.y + this.calculateSpeed()));
    }

    reset() {
        this.isDirty = true;

        this.updateSize();
        this.y = this.originalY;

        this.currentShotBallInternal = null;
    }

    updateSize(myScore=0, opponentScore=0){
        this.isDirty = true;

        const ajust = (5 * (opponentScore-myScore));
        let newH = this.originHeight + ajust;
        newH = Math.max(Math.min(newH, (this.boardHeight*0.7)), (this.boardHeight*0.1));
        this.paddleSvg.height(newH);

        if(this.box.y2 >= this.boardHeight){
            this.moveDown();
        }
    }

    render() {
        if(!this.isDirty){
            return;
        }
        this.paddleSvg.y(this.y);

        this.isDirty = false;
    }
}
