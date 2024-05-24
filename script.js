import GameBoard from "./GameBoard.js";

let gameBoard = new GameBoard();
let startBtn = document.getElementById("startBtn");

startBtn.addEventListener('click', () => {
    gameBoard.playBgMusic();
});