"use strict";

import "./styles/game.css";
// import Game from "./partials/Game";
import * as SVG from "svg.js"

document.addEventListener("DOMContentLoaded", function() {
    // code...

    const svg = SVG("game").size(300, 300);
    var rect = svg.rect(100, 100).attr({ fill: '#f06' });

});




// other work here...

//let draw = svg("game-board-svg");




// // create a game instance
// const gameElement = document.getElementById("game");
// const game = new Game(gameElement, gameElement.clientWidth, gameElement.clientHeight);

// (function gameLoop() {
//     game.render();
//     requestAnimationFrame(gameLoop);
// })();
