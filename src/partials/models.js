export class Board{
    constructor(boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg){
        this.boardSvg = boardSvg;

        this.width = boardSvg.width();
        this.height = boardSvg.height();
        this.boardBox = this.boardSvg.rbox();

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

    start() {
        this.ball.startMoving();
    }

    update() {
        const paddle1Box = this.paddle1.bbox();
        const paddle2Box = this.paddle2.bbox();

        let scoreSide = this.ball.updatePos(this.boardBox, paddle1Box, paddle2Box);
        if(scoreSide !== 0){
            console.log("SCORE!");
        }
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

        this.isDirty = false;
    }
}

export class Ball{
    constructor(ballSvg, boardWidth, boardHeight){
        this.ballSvg = ballSvg;
        this.cx = this.originalCX = ballSvg.cx();
        this.cy = this.originalCY = ballSvg.cy();
        this.vx = this.vy = 0;
        this.direction = 0;
        this.reset();
    }

    bbox() {
        return this.ballSvg.bbox();
    }

    reset() {
        this.isDirty = true;

        this.cx = this.originalCX;
        this.cy = this.originalCY;
        this.vx = this.vy = 0;
        this.direction = 0;
    }

    startMoving() {
        this.isDirty = true;

        this.direction = (Math.random() > .5 ? 1 : -1);
        // console.log("Direction:"+ this.direction);

        while(this.vy === 0){
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    updatePos(boardBox, paddle1Box, paddle2Box){
        this.isDirty = true;
        const ballBox = this.bbox();

        const scoreSide = this.checkforWallCollision(ballBox, boardBox);

        this.checkforPaddleCollision(ballBox, paddle1Box, paddle2Box)

        this.cx += this.vx;
        this.cy += this.vy;

        return scoreSide;
    }

    checkforWallCollision(ballBox, boardBox) {
		const hitLeft = ballBox.x <= 0;
		const hitRight = ballBox.x2 >= boardBox.width;
		const hitTop = ballBox.y <= 0;
		const hitBottom = ballBox.y2 >= boardBox.height;

        //TODO
		if (hitLeft || hitRight) {
            this.vx *= -1;
            this.direction *= -1;
            return hitLeft ? -1 : 1;
		} else if (hitTop || hitBottom) {
			this.vy *= -1;
        }

        return 0;
    }

    checkforPaddleCollision(ballBox, paddle1Box, paddle2Box){
        const hitP1PadBySide = ballBox.x <= paddle1Box.x2 && (ballBox.y2 >= paddle1Box.y && ballBox.y <= paddle1Box.y2 )
        const hitP2PadBySide = ballBox.x2 >= paddle2Box.x && (ballBox.y2 >= paddle2Box.y && ballBox.y <= paddle2Box.y2 )

        // console.log(hitP1PadBySide, hitP2PadBySide);
        if(hitP1PadBySide || hitP2PadBySide){
            this.vx *= -1;
            this.direction *= -1;
            // console.log("HitPaddle!");
        }
    }

    render() {
        if(!this.isDirty){
            return;
        }
        this.ballSvg.center(this.cx, this.cy);

        this.isDirty = (this.vx !== 0 || this.vy !== 0);
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

