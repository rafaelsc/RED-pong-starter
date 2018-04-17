import { setTimeout } from "timers";
import Random from "random-js";

import { Paddle } from "./Paddle.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Ball } from "./Ball.js";

const random = new Random();

export class Board{
    constructor(gameSettings, boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg, score1Svg, score2Svg, p1WinnerSvg, p2WinnerSvg){
        this.gameSettings = gameSettings;

        this.boardSvg = boardSvg;
        this.boardBox = this.boardSvg.rbox();

        this.p1WinnerSvg = p1WinnerSvg;
        this.p2WinnerSvg = p2WinnerSvg;

        this.score = new ScoreBoard(score1Svg, score2Svg);
        this.paddle1 = new Paddle(p1PaddleSvg, this.boardBox.height, gameSettings.paddleSpeedCalculatorFunc);
        this.paddle2 = new Paddle(p2PaddleSvg, this.boardBox.height, gameSettings.paddleSpeedCalculatorFunc);

        this.balls = [];
        this.reset();
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

    player1FireBall() {
        this.fireBall(1);
    }
    player2FireBall() {
        this.fireBall(-1);
    }
    fireBall(direction){
        const playerFired = (direction < 0 ? this.player2 : this.player1);
        if(playerFired.currentShotBall){
            return;
        }
        const ball = Ball.createNewBallElement(this.boardSvg, this.gameSettings.firstBallRadius, false, this.gameSettings.isGameMute, playerFired.box.cx, playerFired.box.cy);
        playerFired.currentShotBall = ball;
        this.balls.push(ball);
        setTimeout(()=> ball.startMovingTo(direction), 1);
        return true;
    }

    addBall(radius = random.integer(this.gameSettings.randomBallMinRadius, this.gameSettings.randomBallMaxRadius)){
        if(this.balls.length >= this.gameSettings.maxOfBallsInGame){
            return false;
        }

        const ball = Ball.createNewBallElement(this.boardSvg, radius, true, this.gameSettings.isGameMute);
        this.balls.push(ball);

        const isExtraBall = (this.balls.length > 1);
        if(isExtraBall){
            setTimeout(()=> ball.startMoving(), this.gameSettings.intervalToNewBallStartInARoundInMs);
        }
        return true;
    }

    reset() {
        this.p1WinnerSvg.addClass("hidden");
        this.p2WinnerSvg.addClass("hidden");
        this.score.reset()
        this.paddle1.reset();
        this.paddle2.reset();
        this.removeBalls();
        this.addBall(this.gameSettings.firstBallRadius);
    }

    removeBalls() {
        this.balls.map(b => b.removeBall())
        this.balls = [];
    }

    start() {
        this.balls.map(b => b.startMoving());
    }

    update() {
        const paddle1Box = this.paddle1.box;
        const paddle2Box = this.paddle2.box;

        this.balls.map(ball => {
            const hitSide = ball.updatePos(this.boardBox, paddle1Box, paddle2Box);
            if(hitSide !== 0){
                this.scores(ball, hitSide);
            }
        });
    }

    scores(ball, hitSide){
        if(ball.autoRespawn){
            ball.reset();
            setTimeout(()=> ball.startMoving(hitSide*-1), this.gameSettings.intervalToWaitAfterScoreToNewRoundInMs);
        }else{
            ball.removeBall();
            this.balls.splice(this.balls.indexOf(ball), 1); //Remove from Board
            if(this.player1.currentShotBall === ball){
                this.player1.currentShotBall = null;
            }
            if(this.player2.currentShotBall === ball){
                this.player2.currentShotBall = null;
            }
        }

        this.score.scores(hitSide === -1 ? 2 : 1);

        this.paddle1.updateSize(this.score.player1.score, this.score.player2.score);
        this.paddle2.updateSize(this.score.player2.score, this.score.player1.score);

        const gameEnd = (this.score.maxScore === this.gameSettings.maxScore);
        if(gameEnd){
            this.endOfGame();
        }
    }

    endOfGame(){
        this.removeBalls();
        if(this.scoreBoard.winningPalyer === 1){
            this.p1WinnerSvg.removeClass("hidden");
        }else{
            this.p2WinnerSvg.removeClass("hidden");
        }
    }

    render() {
        this.score.render()
        this.paddle1.render();
        this.paddle2.render();
        this.balls.map(b => b.render());
    }
}
