import { Board } from "./Board.js";
import SVG from "svg.js";

export default class Game {

	constructor(gameSettings) {
        const boardSvg = SVG.get("game-svg");
        const p1PaddleSvg = SVG.get("p1Paddle");
        const p2PaddleSvg = SVG.get("p2Paddle");
        const ballSvg = SVG.get("ball");
        const score1Svg = SVG.get("p1Score");
        const score2Svg = SVG.get("p2Score");
        const p1WinnerSvg = SVG.get("p1Winner");
        const p2WinnerSvg = SVG.get("p2Winner");

        this.gamePauseTextSvg = SVG.get("gamePauseText");

        this.gameSettings = gameSettings;
        this.board = new Board(gameSettings, boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg, score1Svg, score2Svg, p1WinnerSvg, p2WinnerSvg);

        this.reset();
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

    reset() {
        this.gamePauseTextSvg.addClass("hidden");
        this.board.reset()
        this.isStarted = false;
        this.isPaused = true;
    }

    startOrPause() {
        if(!this.isStarted){
            this.reset();
            this.board.start();
        }else{
            this.gamePauseTextSvg.toggleClass("hidden");
        }
        this.isPaused = !this.isPaused;
        this.isStarted = true;
    }

    addBall() {
        if(this.isPaused){
            return;
        }
        return this.board.addBall();
    }

	gameloop() {
        if(!this.isPaused && this.isStarted){
            this.board.update();
        }
        this.board.render();
	}
}
