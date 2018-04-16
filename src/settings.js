export const KEYS = {
    p1Up: "KeyA",
    p1Down: "KeyZ",
    p2Up: "ArrowUp",
    p2Down: "ArrowDown",
    gameStart: "Space",
    addBall: "KeyB",
    reset: "KeyR"
}

export const GameSettings = {
    isGameMute: true,
    maxScroe: 10,
    intervalToWaitAfterScoreToNewRoundInMs: 250,

    maxOfBallsInGame: 5,
    firstBallRadius: 6,
    randomBallMinRadius: 3,
    randomBallMaxRadius: 16,
    intervalToNewBallStartInARoundInMs: 500,

    paddleSpeedCalculatorFunc: (size) => {
        return Math.max(2, Math.min( (6/size*100) , 40))
    }
}
