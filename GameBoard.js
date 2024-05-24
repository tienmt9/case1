import UI from "./UI.js";
import Sound from "./Sound.js";

class GameBoard {
    constructor() {
        this.ui = new UI();
        this.ui.showScreen('mainMenu');
        this.ui.clickOnStartBtn(() => {
            this.start();
        });
    }

    playBgMusic() {
        this.mdSound = new Sound('bat_dau.mp3');
        this.mdSound.start();
    }

    start() {
        this.ui.showScreen('question');
    }
}

export default GameBoard;