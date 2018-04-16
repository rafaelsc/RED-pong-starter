import Score from "./Score";

export class ScoreBoard{
    constructor(score1Svg, score2Svg){
        this.player1 = new Score(score1Svg);
        this.player2 = new Score(score2Svg);

        this.reset();
    }

    reset() {
        this.player1.reset();
        this.player2.reset();
    }

    scores(playerThatScore){
        if(playerThatScore === 1){
            this.player1.scores();
        }
        if(playerThatScore === 2){
            this.player2.scores();
        }
    }

    render() {
        this.player1.render();
        this.player2.render();
    }
}
