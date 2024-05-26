import UI from "./UI.js";
import Sound from "./Sound.js";

class GameBoard {
    constructor() {
        this.ui = new UI();
        this.ui.showScreen('mainMenu');
        this.ui.clickOnStartBtn(() => {
            this.playBgMusic();
            // this.ui.hideScreen('mainMenu');
            // this.bdSound.onEnd(() => {
            //     if (this.bdSound.currentTime == 0) {
            //         this.start();
            //     }
            // });
            this.start();
        });

        this.waitAnswer_1to5 = new Sound("1-5.mp3");
        this.currentQuestion = 0;
    }

    playBgMusic() {
        this.bdSound = new Sound('bat_dau.mp3');
        this.bdSound.start();
    }

    start() {
        this.ui.showScreen('questionScreen');
        this.waitAnswer_1to5.start();
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.ui.clickOnAnswer((answer)=>{
            console.log(answer);
        })
    }
}

const questions = [
    {
        question: 'CodeGym',
        answer: [
            'C',
            'O',
            'D',
            'E'
        ],
        correct: 1
    }
]

export default GameBoard;