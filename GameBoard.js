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
                this.startGame();
            });
            // this.start();
        });

        this.waitAnswer_1to5 = new Sound("1-5.mp3");
        this.chooseAnswer = new Sound("chon_dap_an.mp3");
        this.correctAnswer = new Sound("dung.mp3");
        this.wrongAnswer = new Sound("sai.mp3");
        this.currentQuestion = 0;
        this.currentAnswer = null;
        this.timeoutID = null;
    }

    playBgMusic() {
        this.bdSound = new Sound('bat_dau.mp3');
        this.bdSound.start10();
    }

    startGame() {
        this.ui.showScreen('questionScreen');
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.waitAnswer_1to5.startSound(true);
        this.ui.clickOnAnswer((answer) => {
            this.currentAnswer = answer;
            this.waitAnswer_1to5.stopSound();
            this.chooseAnswer.restartSound();
            this.ui.selectAnswer(answer);
            this.timeoutID = setTimeout(() => {
                this.checkAnswer(this.currentAnswer);
                clearTimeout(this.timeoutID);
            }, 10500);
        });
    }

    checkAnswer(answer) {
        if (this.currentQuestion < questions.length) {
            if (answer === questions[this.currentQuestion].correct) {
                this.correctAnswer.startSound();
            } else {
                this.wrongAnswer.startSound();
                this.ui.showResult(answer, questions[this.currentQuestion].correct);
            }
            setTimeout(() => {
                this.ui.resetBgAnswer(answer);
                this.ui.resetBgAnswer(questions[this.currentQuestion].correct);
                this.currentQuestion++;
                this.startGame();
            }, 2100);
        } else {
            setTimeout(() => {
                alert('chuc mung');
            }, 2100);
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