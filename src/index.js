import "./styles/game.css";
import { KEYS } from "./settings.js";
import Game from "./partials/Game";
import KeyPressMapCallBack from "./util/KeyPressMapCallBack.js"


const game = new Game();
game.reset();


const keyMapCallBack = new KeyPressMapCallBack(new Map([
    [ KEYS.p1Up  , () => game.player1MoveUp()   ],
    [ KEYS.p1Down, () => game.player1MoveDown() ],
    [ KEYS.p2Up  , () => game.player2MoveUp()   ],
    [ KEYS.p2Down, () => game.player2MoveDown() ],
    [ KEYS.gameStart, () => game.startOrPause()  ]
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

//TODO, Only Start the render Render after start the game

(function gameLoop() {
    game.gameloop();
    requestAnimationFrame(gameLoop);
})();
