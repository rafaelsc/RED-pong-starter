import "./styles/game.css";
import KeyPressMapCallBack from "./util/KeyPressMapCallBack.js"
import {KEYS, GameSettings} from "./settings.js";
import Game from "./Pong/Game";

const game = new Game(GameSettings);

const keyMapCallBack = new KeyPressMapCallBack(new Map([
    [ KEYS.p1Up     , () => game.player1MoveUp()   ],
    [ KEYS.p1Down   , () => game.player1MoveDown() ],
    [ KEYS.p2Up     , () => game.player2MoveUp()   ],
    [ KEYS.p2Down   , () => game.player2MoveDown() ],
    [ KEYS.gameStart, () => game.startOrPause()    ],
    [ KEYS.addBall  , () => game.addBall()         ]
]));

document.body.addEventListener("keydown", function (e) {
    const isKeyIsMapped = keyMapCallBack.press(e.code);
    if(isKeyIsMapped){
        event.preventDefault();
    }
});
document.body.addEventListener("keyup", function (e) {
    keyMapCallBack.release(e.code);
});


(function gameLoop() {
    game.gameloop();
    requestAnimationFrame(gameLoop);
})();
