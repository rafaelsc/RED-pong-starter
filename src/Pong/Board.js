import { setTimeout } from "timers";
import { Paddle } from "./Paddle.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Ball } from "./Ball.js";

export class Board{
    constructor(gameSettings, boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg, score1Svg, score2Svg){
        this.gameSettings = gameSettings;

        this.boardSvg = boardSvg;
        this.boardBox = this.boardSvg.rbox();

        this.score = new ScoreBoard(score1Svg, score2Svg);
        this.paddle1 = new Paddle(p1PaddleSvg, this.boardBox.height);
        this.paddle2 = new Paddle(p2PaddleSvg, this.boardBox.height);

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

    addBall(radius = 0){
        this.balls.push(Ball.createNewBallElement(this.boardSvg, radius));
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
        const paddle1Box = this.paddle1.bbox();
        const paddle2Box = this.paddle2.bbox();

        this.balls.map(ball => {
            let hitSide = ball.updatePos(this.boardBox, paddle1Box, paddle2Box);
            if(hitSide !== 0){
                this.scores(ball, hitSide);
            }
        });
    }

    scores(ball, hitSide){
        ball.reset();
        setTimeout(()=> ball.startMoving(hitSide*-1), this.gameSettings.intervalToWaitAfterScoreTimeInMs);
        this.score.scores(hitSide === -1 ? 2 : 1);
    }

    render() {
        this.score.render()
        this.paddle1.render();
        this.paddle2.render();
        this.balls.map(b => b.render());
    }
}
