import "./styles/game.css";
import KeyPressMapCallBack from "./util/KeyPressMapCallBack.js"
import {KEYS, GameSettings} from "./settings.js";
import Game from "./Pong/Game";

document.addEventListener("DOMContentLoaded", function() {

    const game = new Game(GameSettings);

    const keyMapCallBack = new KeyPressMapCallBack(new Map([
        [ KEYS.p1Up     , () => game.player1MoveUp()   ],
        [ KEYS.p1Down   , () => game.player1MoveDown() ],
        [ KEYS.p1Fire   , () => game.player1FireBall() ],
        [ KEYS.p2Up     , () => game.player2MoveUp()   ],
        [ KEYS.p2Down   , () => game.player2MoveDown() ],
        [ KEYS.p2Fire   , () => game.player2FireBall() ],
        [ KEYS.gameStart, () => game.startOrPause()    ],
        [ KEYS.addBall  , () => game.addBall()         ],
        [ KEYS.reset    , () => game.reset()           ]
    ]));

    document.body.addEventListener("keydown", function (e) {
        const isKeyIsMapped = keyMapCallBack.press(e.code);
        if(isKeyIsMapped){
            e.preventDefault();
        }
    });
    document.body.addEventListener("keyup", function (e) {
        keyMapCallBack.release(e.code);
    });


    (function gameLoop() {
        game.gameloop();
        requestAnimationFrame(gameLoop);
    })();


});
