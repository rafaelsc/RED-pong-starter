export default class Score {
    constructor(scoreSvg) {
        this.scoreSvg = scoreSvg;
        this.score = 0;
        this.reset();
    }

    reset() {
        this.isDirty = true;

        this.score = 0;
    }

    scores(){
        this.isDirty = true;

        this.score++;
    }

    render() {
        if(!this.isDirty){
            return;
        }

        this.scoreSvg.text(this.score.toString());
        this.isDirty = false;
    }
}
