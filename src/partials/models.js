export class Board{
    constructor(){
        this.score = new ScoreBoard();
        this
    }
}

export class ScoreBoard{

}

export class Ball{
    constructor(element){
        this.element = element;
        this.x = this.y = 0;
    }

    get size() {
        return 8;
    }

    get x() {
        return this.x;
    }

    get y() {
        return this.y;
    }
}

export class Paddle{

    get  height() {
        return 56;
    }

    get width() {
        return 8;
    }
}

