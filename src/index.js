import "./styles/game.css";
import { KEYS } from "./settings.js";
import Game from "./partials/Game";

const game = new Game();
game.reset();

document.addEventListener("keydown", event => {
    console.log(event);

    switch (event.code) {
        case KEYS.a:    game.player1.moveUp();   break;
        case KEYS.z:    game.player1.moveDown(); break;
        case KEYS.up:   game.player2.moveUp();   break;
        case KEYS.down: game.player2.moveDown(); break;
      }

    game.render();
});


//TODO, Only Start the render Render after start the game

(function gameLoop() {
    game.render();
    //requestAnimationFrame(gameLoop);
})();
