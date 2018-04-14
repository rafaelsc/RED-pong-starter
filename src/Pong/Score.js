export default class Score {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }

    reset() {
        this.isDirty = true;

        this.score = 0;
    }

    render() {
        if(!this.isDirty){
            return;
        }

        this.isDirty = false;
    }
}
