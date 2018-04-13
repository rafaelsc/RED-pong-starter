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

    get player1() {
        return this.board.player1;
    }
    get player2() {
        return this.board.player2
    }

    get scoreBoard() {
        return this.board.player2
    }

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
