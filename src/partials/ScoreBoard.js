export class ScoreBoard{
    constructor(score1Svg, score2Svg){
        this.score1Svg = score1Svg;
        this.score2Svg = score2Svg;
        this.reset();
    }

    reset() {
        this.isDirty = true;
        this.player1 = 0;
        this.player2 = 0;
    }

    scores(playerThatScore){
        this.isDirty = true;

        if(playerThatScore === 1){
            this.player1++;
        }
        if(playerThatScore === 2){
            this.player2++;
        }
    }

    render() {
        if(!this.isDirty){
            return;
        }

        this.score1Svg.text(this.player1.toString());
        this.score2Svg.text(this.player2.toString());

        this.isDirty = false;
    }
}
