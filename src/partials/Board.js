import { setTimeout } from "timers";
import { Paddle } from "./Paddle.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Ball } from "./Ball.js";

export class Board{
    constructor(boardSvg, p1PaddleSvg, p2PaddleSvg, ballSvg, score1Svg, score2Svg){
        this.boardSvg = boardSvg;

        this.width = boardSvg.width();
        this.height = boardSvg.height();
        this.boardBox = this.boardSvg.rbox();

        this.score = new ScoreBoard(score1Svg, score2Svg);
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
             this.scores();
        }
    }

    scores(scoreSide){
        this.ball.reset();
        setTimeout(()=> this.ball.startMoving(scoreSide*-1), 1000); //TODO Colocar em Settings
        this.score.scores(scoreSide === -1 ? 2 : 1);
    }

    render() {
        this.score.render()
        this.paddle1.render();
        this.paddle2.render();
        this.ball.render();
    }
}
