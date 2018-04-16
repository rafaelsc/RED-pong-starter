export default class Score {
    constructor(scoreSvg) {
        this.scoreSvg = scoreSvg;
        this.scoreInternal = 0;
        this.reset();
    }

    reset() {
        this.isDirty = true;

        this.scoreInternal = 0;
    }

    scores(){
        this.isDirty = true;

        this.scoreInternal++;
    }

    get score () {
        return this.scoreInternal;
    }

    render() {
        if(!this.isDirty){
            return;
        }

        this.scoreSvg.text(this.score.toString());
        this.isDirty = false;
    }
}
