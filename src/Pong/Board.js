import { setTimeout } from "timers";
import Random from "random-js";

import { Paddle } from "./Paddle.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Ball } from "./Ball.js";

const random = new Random();

export class Board{
    constructor(gameSettings, boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg, score1Svg, score2Svg){
        this.gameSettings = gameSettings;

        this.boardSvg = boardSvg;
        this.boardBox = this.boardSvg.rbox();

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

    addBall(radius = random.integer(this.gameSettings.randomBallMinRadius, this.gameSettings.randomBallMaxRadius)){
        if(this.balls.length >= this.gameSettings.maxOfBallsInGame){
            return false;
        }

        const ball = Ball.createNewBallElement(this.boardSvg, radius, this.gameSettings.isGameMute);
        this.balls.push(ball);

        const isExtraBall = (this.balls.length > 1);
        if(isExtraBall){
            setTimeout(()=> ball.startMoving(), this.gameSettings.intervalToNewBallStartInARoundInMs);
        }
        return true;
    }

    reset() {
        this.score.reset()
        this.paddle1.reset();
        this.paddle2.reset();
        this.balls.map(b => b.removeBall())
        this.balls = [];
        this.addBall(this.gameSettings.firstBallRadius);
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
        ball.reset();
        setTimeout(()=> ball.startMoving(hitSide*-1), this.gameSettings.intervalToWaitAfterScoreToNewRoundInMs);
        this.score.scores(hitSide === -1 ? 2 : 1);

        this.paddle1.updateSize(this.score.player1.score, this.score.player2.score);
        this.paddle2.updateSize(this.score.player2.score, this.score.player1.score);
    }

    render() {
        this.score.render()
        this.paddle1.render();
        this.paddle2.render();
        this.balls.map(b => b.render());
    }
}
