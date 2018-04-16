export const KEYS = {
    p1Up: "KeyA",
    p1Down: "KeyZ",
    p1Fire: "KeyS",
    p2Up: "ArrowUp",
    p2Down: "ArrowDown",
    p2Fire: "ArrowLeft",
    gameStart: "Space",
    addBall: "KeyB",
    reset: "KeyR"
}

export const GameSettings = {
    isGameMute: true,
    maxScore: 10,
    intervalToWaitAfterScoreToNewRoundInMs: 250,

    maxOfBallsInGame: 5,
    firstBallRadius: 6,
    randomBallMinRadius: 3,
    randomBallMaxRadius: 16,
    intervalToNewBallStartInARoundInMs: 500,

    paddleSpeedCalculatorFunc: (size) => {
        return Math.max(2, Math.min( (8/size*100) , 50))
    }
}
