
export class Ball{
    constructor(ballSvg){
        this.ballSvg = ballSvg;
        this.cx = this.originalCX = ballSvg.cx();
        this.cy = this.originalCY = ballSvg.cy();
        this.direction = this.vx = this.vy = 0;
        this.reset();

        this.pingSounds = [ new Audio("public/sounds/pong-01.wav"),
                            new Audio("public/sounds/pong-02.wav"),
                            new Audio("public/sounds/pong-03.wav")];
    }

    static createNewBallElement(boardSvg, radiosSize = 0) {
        radiosSize = radiosSize === 0 ? (3 + Math.random() * 16) : radiosSize;
        const ballSvg = boardSvg.circle(radiosSize).center(boardSvg.width/2, boardSvg.height/2);
        return new Ball(ballSvg);
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

    startMoving(direction = null) {
        this.isDirty = true;

        this.direction = direction || (Math.random() > .5 ? 1 : -1);
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
        const hitP1PadBySide = ballBox.x <= paddle1Box.x2 && (ballBox.y2 >= paddle1Box.y && ballBox.y <= paddle1Box.y2 )
        const hitP2PadBySide = ballBox.x2 >= paddle2Box.x && (ballBox.y2 >= paddle2Box.y && ballBox.y <= paddle2Box.y2 )

        if(hitP1PadBySide || hitP2PadBySide){
            this.vx *= -1;
            this.direction *= -1;
            this.collisionDetected();
            // console.log("HitPaddle!");
        }
    }

    collisionDetected(){
        const sound = this.pingSounds.shift();
        sound.play();
        this.pingSounds.push(sound);
    }

    render() {
        if(!this.isDirty){
            return;
        }
        this.ballSvg.center(this.cx, this.cy);

        this.isDirty = (this.vx !== 0 || this.vy !== 0);
    }
}
