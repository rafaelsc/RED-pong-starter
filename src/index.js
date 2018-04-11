import "./styles/game.css";
import Game from "./partials/Game";

// create a game instance
const gameElement = document.getElementById("game");
const game = new Game(gameElement, gameElement.clientWidth, gameElement.clientHeight);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();
