import UI from "./UI.js";
import Sound from "./Sound.js";

class GameBoard {
    constructor() {
        this.ui = new UI();
        this.ui.showScreen('mainMenu');
        this.ui.clickOnStartBtn(() => {
            this.ui.hideScreen('mainMenu');
            this.playBgMusic();
            this.bdSound.addEndedListener(() => {
                this.start();
            });
            // this.start();
        });

        this.waitAnswer_1to5 = new Sound("1-5.mp3");
        this.chooseAnswer = new Sound("chon_dap_an.mp3");
        this.correctAnswer = new Sound("dung.mp3");
        this.wrongAnswer = new Sound("sai.mp3");
        this.currentQuestion = 0;
        this.currentAnswer = null;
    }

    playBgMusic() {
        this.bdSound = new Sound('bat_dau.mp3');
        this.bdSound.start();
    }

    start() {
        this.ui.showScreen('questionScreen');
        this.waitAnswer_1to5.start(true);
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.ui.clickOnAnswer((answer) => {
            this.currentAnswer = answer;
            this.waitAnswer_1to5.stop();
            this.chooseAnswer.restart();
            this.ui.selectAnswer(answer);
            this.chooseAnswer.addEndedListener(() => {
                this.checkAnswer();
            });
        });
    }

    checkAnswer() {
        if (this.currentAnswer == questions[this.currentQuestion].correct) {
            this.correctAnswer.start();
        } else this.wrongAnswer.start();
    }
}

const questions = [
    {
        question: 'Đâu là một loại hình chợ tạm tự phát thường xuất hiện trong các khu dân cư?',
        answer: [
            'Ếch',
            'Cóc',
            'Thằn lằn',
            'Nhái'
        ],
        correct: 'a'
    }
]

export default GameBoard;