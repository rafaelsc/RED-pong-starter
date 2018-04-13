import * as Model from "./models.js";
import SVG from "svg.js";

export default class Game {

	constructor() {
        const boardSvg = SVG.get("game-svg");
        const p1Paddle = SVG.get("p1Paddle");
        const p2Paddle = SVG.get("p2Paddle");
        const ball = SVG.get("ball");

        this.board = new Model.Board(boardSvg, p1Paddle, p2Paddle, ball);
	}

    player1MoveUp() {
        if(this.isPaused){
            return;
        }
        return this.board.player1.moveUp();
    }
    player1MoveDown() {
        if(this.isPaused){
            return;
        }
        return this.board.player1.moveDown();
    }
    player2MoveUp() {
        if(this.isPaused){
            return;
        }
        return this.board.player2.moveUp();
    }
    player2MoveDown() {
        if(this.isPaused){
            return;
        }
        return this.board.player2.moveDown();
    }

    // get scores() {
    //     return this.board.scoreBoard.scores;
    // }

    reset() {
        this.board.reset()
        this.isStarted = false;
        this.isPaused = true;
    }

    startOrPause() {
        if(!this.isStarted){
            this.reset();
            this.board.start();
        }
        this.isPaused = !this.isPaused;
        this.isStarted = true;
    }

	gameloop() {
        if(!this.isPaused && this.isStarted){
            this.board.update();
        }
        this.board.render();
	}
}
