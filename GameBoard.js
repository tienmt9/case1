import UI from "./UI.js";
import Sound from "./Sound.js";

class GameBoard {
    constructor() {
        this.ui = new UI();
        this.ui.showScreen('mainMenu');
        this.ui.clickOnStartBtn(() => {
            this.ui.hideScreen('mainMenu');
            this.playBgMusic();
            this.bdSound.addPausedListener(() => {
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
        this.bdSound.start10();
    }

    start() {
        this.ui.showScreen('questionScreen');
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.waitAnswer_1to5.start(true);

        this.ui.clickOnAnswer((answer) => {
            this.currentAnswer = answer;
            this.waitAnswer_1to5.stop();
            this.chooseAnswer.restart();
            this.ui.selectAnswer(answer);

            // this.chooseAnswer.audioFileName.onpause = null;
            // this.chooseAnswer.audioFileName.onended = null;
            // this.correctAnswer.audioFileName.onended = null;
            // this.wrongAnswer.audioFileName.onended = null;

            // this.chooseAnswer.clearListeners();
            // this.correctAnswer.clearListeners();
            // this.wrongAnswer.clearListeners();

            this.chooseAnswer.addPausedListener(() => {
                this.checkAnswer(answer);
            });
        });
    }

    checkAnswer(answer) {
        if (this.currentAnswer == questions[this.currentQuestion].correct) {
            this.correctAnswer.start();
            this.correctAnswer.addEndedListener(() => {
                if (this.currentQuestion < questions.length) {
                    this.ui.resetBgAnswer(answer);
                    this.currentQuestion++;
                    this.start();
                }
            });
        } else {
            this.wrongAnswer.start();
            this.wrongAnswer.addEndedListener(() => {
                if (this.currentQuestion < questions.length) {
                    this.ui.resetBgAnswer(answer);
                    this.currentQuestion++;
                    this.start();
                }
            });
        }
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
        correct: 'b'
    },
    {
        question: 'Đâu là tên một bãi biển đẹp ở Quảng Bình?',
        answer: [
            'Đá Lăn',
            'Đá Chạy',
            'Đá Nhảy',
            'Đá Bò'
        ],
        correct: 'c'
    },
    {
        question: 'Haiku là thể thơ truyền thống của nước nào?',
        answer: [
            'Nhật Bản',
            'Mông Cổ',
            'Trung Quốc',
            'Hàn Quốc'
        ],
        correct: 'a'
    }
]

export default GameBoard;