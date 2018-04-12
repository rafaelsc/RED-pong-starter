export class Board{
    constructor(boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg){
        this.svg = boardSvg;
        this.width = boardSvg.width();
        this.height = boardSvg.height();

        this.score = new ScoreBoard();

        this.paddle1 = new Paddle(p1PaddleSvg, this.height);
        this.paddle2 = new Paddle(p2PaddleSvg, this.height);
        this.ball = new Ball(ballSvg, this.width, this.height);
    }

    get player1() {
        return this.paddle1;
    }
    get player2() {
        return this.paddle2;
    }
    get scoreBoard() {
        return this.score;
    }

    reset() {
        this.score.reset()
        this.paddle1.reset();
        this.paddle2.reset();
        this.ball.reset();
    }

    render() {
        this.score.render()
        this.paddle1.render();
        this.paddle2.render();
        this.ball.render();
    }
}

export class ScoreBoard{
    constructor(){
        this.reset();
    }

    reset() {
        this.isDirty = true;
        this.player1 = 0;
        this.player2 = 0;
    }

    render() {
        if(!this.isDirty){
            return;
        }

    }
}

export class Ball{
    constructor(ballSvg, boardWidth, boardHeight){
        this.ballSvg = ballSvg;
        this.x = this.originalX = ballSvg.x();
        this.y = this.originalY = ballSvg.y();

        this.reset();
    }

    reset() {
        this.isDirty = true;
        this.x = this.originalX;
        this.y = this.originalY;
    }

    render() {
        if(!this.isDirty){
            return;
        }

    }
}

export class Paddle{
    constructor(paddleSvg, boardHeight) {
        this.paddleSvg = paddleSvg;
        this.boardHeight = boardHeight;

        this.height = paddleSvg.height();
        this.originalY = this.y = paddleSvg.y();

        this.speed = 10;

        this.reset();
    }

    moveUp() {
        this.isDirty = true;

        this.y = Math.max(0, (this.y - this.speed));

        console.log("MoveUp From Paddle." + this.paddleSvg.id() +" to:"+ this.y);
    }

    moveDown() {
        this.isDirty = true;

        this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed));

        console.log("MoveDown From Paddle." + this.paddleSvg.id() +" to:"+ this.y);
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
    }
}

