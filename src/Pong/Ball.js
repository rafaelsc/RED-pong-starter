import Random from "random-js";

const random = new Random();

export class Ball{
    constructor(ballSvg, isMute = false){
        this.ballSvg = ballSvg;
        this.isMute = isMute;

        this.cx = this.originalCX = ballSvg.cx();
        this.cy = this.originalCY = ballSvg.cy();
        this.direction = this.vx = this.vy = 0;
        this.reset();

        this.pingSounds = [ new Audio("public/sounds/pong-01.wav"),
                            new Audio("public/sounds/pong-02.wav"),
                            new Audio("public/sounds/pong-03.wav")];
    }

    static createNewBallElement(boardSvg, radiusSize = 6, isMute = false) {
        const ballSvg = boardSvg.circle(radiusSize*2)
                                .center(boardSvg.width()/2, boardSvg.height()/2);
        return new Ball(ballSvg, isMute);
    }

    removeBall(){
        this.ballSvg.remove();
    }

    bbox() {
        return this.ballSvg.bbox();
    }

    reset() {
        this.isDirty = true;

        this.cx = this.originalCX;
        this.cy = this.originalCY;
        this.direction = this.vx = this.vy = 0;
    }

    get isMoving(){
        return (this.vx !== 0 || this.vy !== 0)
    }

    startMoving(direction = null) {
        if(this.isMoving){
            return;
        }
        this.isDirty = true;

        this.direction = direction || (random.bool() ? 1 : -1);
        while(Math.abs(this.vy) < 0.8){
            this.vy = random.real(-5, 5, true);
        }
        this.vx = this.direction * (random.real(Math.abs(this.vy), this.bbox().height/4));
    }

    updatePos(boardBox, paddle1Box, paddle2Box){
        this.isDirty = true;

        const ballBox = this.bbox();
        const hitSide = this.checkforWallCollision(ballBox, boardBox);
        this.checkforPaddleCollision(ballBox, paddle1Box, paddle2Box)

        this.cx += this.vx;
        this.cy += this.vy;

        return hitSide;
    }

    checkforWallCollision(ballBox, boardBox) {
		const hitLeft = ballBox.x <= 0;
		const hitRight = ballBox.x2 >= boardBox.width;
		const hitTop = ballBox.y <= 0;
		const hitBottom = ballBox.y2 >= boardBox.height;

		if (hitLeft) {
            return -1;
        } else if (hitRight) {
            return 1;
		} else if (hitTop || hitBottom) {
            this.vy *= -1;
            this.collisionDetected();
        }

        return 0;
    }

    checkforPaddleCollision(ballBox, paddle1Box, paddle2Box){

        const hitP1PadBySide  = ballBox.x <= paddle1Box.x2 && ballBox.y2 >= paddle1Box.y && ballBox.y  <= paddle1Box.y2 && this.vx < 0;
        // const hitP1FromTop    = ballBox.x <= paddle1Box.x2 && ballBox.x2 >= paddle1Box.x && ballBox.y  <  paddle1Box.y  && ballBox.y2 >= paddle1Box.y  && ballBox.cy <= paddle1Box.cy && this.vy > 0;
        // const hitP1FromBotton = ballBox.x <= paddle1Box.x2 && ballBox.x2 >= paddle1Box.x && ballBox.y2 >  paddle1Box.y2 && ballBox.y  <= paddle1Box.y2 && ballBox.cy >= paddle1Box.cy && this.vy < 0;

        const hitP2PadBySide  = ballBox.x2 >= paddle2Box.x && ballBox.y2 >= paddle2Box.y  && ballBox.y  <= paddle2Box.y2 && this.vx > 0;
        // const hitP2FromTop    = ballBox.x2 >= paddle2Box.x && ballBox.x  >= paddle2Box.x2 && ballBox.y  <  paddle1Box.y  && ballBox.y2 >= paddle1Box.y  && ballBox.cy <= paddle1Box.cy && this.vy > 0;
        // const hitP2FromBotton = ballBox.x2 >= paddle2Box.x && ballBox.x  >= paddle1Box.x2 && ballBox.y2 >  paddle2Box.y2 && ballBox.y  <= paddle2Box.y2 && ballBox.cy >= paddle2Box.cy && this.vy < 0;

        // if(hitP1FromTop || hitP2FromTop){
        //     this.vy *= -1;
        //     this.collisionDetected();
        //     console.log("HitPaddle! Front Top");
        //     return;
        // }
        // if(hitP1FromBotton || hitP2FromBotton){
        //     this.vy *= -1;
        //     this.collisionDetected();
        //     console.log("HitPaddle! Front Botton");
        //     return;
        // }
        if(hitP1PadBySide || hitP2PadBySide){
            this.vx *= -1;
            this.direction *= -1;
            this.collisionDetected();
            console.log("HitPaddle! Front Side");
            return;
        }

    }

    collisionDetected(){
        const sound = this.pingSounds.shift();
        this.pingSounds.push(sound);
        if(!this.isMute){
            sound.play();
        }
    }

    render() {
        if(!this.isDirty){
            return;
        }
        this.ballSvg.center(this.cx, this.cy);

        this.isDirty = this.isMoving;
    }
}
