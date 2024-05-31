import UI from "./UI.js";
import Sound from "./Sound.js";
import ImageGame from "./Image.js";

class GameBoard {
    constructor() {
        this.ui = new UI();
        this.ui.showScreen('mainMenu');
        this.ui.clickOnGuideBtn(() => {
            this.ui.hideScreen('mainMenu');
            this.ui.showScreen('guide');
            this.ui.clickOnReturnBtn(() => {
                this.ui.showScreen('mainMenu');
            })
        });
        this.ui.clickOnStartBtn(() => {
            this.ui.hideScreen('mainMenu');
            this.playBgMusic();
            this.logo.showImage()
            this.bdSound.addPausedListener(() => {
                this.logo.hideImage();
                this.shuffleQuestions();
                this.changeScoreQuestions();
                this.startGame();
            });
            // this.startGame();
        });

        this.waitAnswer_1to5 = new Sound("1-5.mp3");
        this.chooseAnswer = new Sound("chon_dap_an.mp3");
        this.correctAnswer = new Sound("dung.mp3");
        this.wrongAnswer = new Sound("sai.mp3");
        this.sayGoodBye = new Sound("loi_tam_biet.mp3")
        this.logo = new ImageGame('logo.png', '1200px', '580px');
        this.currentQuestion = 0;
        this.currentAnswer = null;
        this.timeoutID_1 = null;
        this.timeoutID_2 = null;
        this.timeoutID_3 = null;
        this.timeoutID_4 = null;
        this.timeInterval = null;
        this.timeLeft = 30;

        const skinDiv = document.getElementById('skin');
        skinDiv.appendChild(this.logo.img);
    }

    playBgMusic() {
        this.bdSound = new Sound('bat_dau.mp3');
        this.bdSound.startSound_10();
    }

    startGame() {
        this.ui.showScreen('questionScreen');
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.startTime();
        this.waitAnswer_1to5.startSound(true);
        this.ui.clickOnAnswer((answer) => {
            this.currentAnswer = answer;
            this.waitAnswer_1to5.stopSound();
            this.chooseAnswer.restartSound();
            this.ui.selectAnswer(answer);
            if (this.timeLeft > 10) {
                this.clearAllTimeouts();
                this.timeoutID_1 = setTimeout(() => {
                    this.checkAnswer(this.currentAnswer);
                    // }, 500);
                }, 10500);
            } else {
                this.chooseAnswer.stopSound();
                this.checkAnswer(this.currentAnswer);
            }
        });
    }

    checkAnswer(answer) {
        clearInterval(this.timeInterval);
        if (this.isCorrectAnswer(answer, questions[this.currentQuestion].correct)) {
            this.correctAnswer.startSound();
            this.ui.rightResult(answer);
            this.currentQuestion++;
            if (this.currentQuestion < questions.length - 1) {
                this.clearAllTimeouts();
                this.timeoutID_2 = setTimeout(() => {
                    // this.ui.resetBgAnswer(answer);
                    // this.ui.resetBgAnswer(questions[this.currentQuestion - 1].correct);

                    this.ui.resetAllBgAnswer();

                    this.timeLeft = 30;
                    this.startGame();
                }, 2100);
            } else {
                this.clearAllTimeouts();
                this.timeoutID_4 = setTimeout(() => {
                    this.ui.showScreen('final');
                    this.ui.showFinal(questions[this.currentQuestion]);
                    this.sayGoodBye.startSound(false);
                    this.ui.clickOnReplayBtn(() => {
                        this.sayGoodBye.stopSound();
                        this.ui.resetBgAnswer(answer);
                        this.ui.resetScore();
                        this.currentQuestion = 0;
                        this.timeLeft = 30;
                        this.shuffleQuestions();
                        this.changeScoreQuestions();
                        this.startGame();
                    });
                }, 1100);
            }
        } else {
            this.wrongAnswer.startSound();
            this.ui.showResult(answer, questions[this.currentQuestion].correct);
            this.clearAllTimeouts();
            this.timeoutID_3 = setTimeout(() => {
                this.ui.showScreen('final');
                this.ui.showFinal(questions[this.currentQuestion]);
                this.sayGoodBye.startSound(false);
                this.ui.clickOnReplayBtn(() => {
                    this.sayGoodBye.stopSound();
                    // this.ui.resetBgAnswer(answer);
                    // this.ui.resetBgAnswer(questions[this.currentQuestion].correct);

                    this.ui.resetAllBgAnswer();

                    this.ui.resetScore();

                    this.currentQuestion = 0;
                    this.timeLeft = 30;
                    this.shuffleQuestions();
                    this.changeScoreQuestions()
                    this.startGame();
                });
            }, 1100);
        }
    }

    clearAllTimeouts() {
        if (this.timeoutID_1) {
            clearTimeout(this.timeoutID_1);
            this.timeoutID_1 = null;
        }
        if (this.timeoutID_2) {
            clearTimeout(this.timeoutID_2);
            this.timeoutID_2 = null;
        }
        if (this.timeoutID_3) {
            clearTimeout(this.timeoutID_3);
            this.timeoutID_3 = null;
        }
        if (this.timeoutID_4) {
            clearTimeout(this.timeoutID_4);
            this.timeoutID_4 = null;
        }
    }

    isCorrectAnswer(selectedAnswer, correctAnswers) {
        for (let i = 0; i < correctAnswers.length; i++) {
            if (selectedAnswer === correctAnswers[i]) {
                return true;
            }
        }
        return false;
    }

    startTime() {
        document.getElementById('countdown').textContent = this.timeLeft;
        this.timeInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('countdown').textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                clearInterval(this.timeInterval);
                this.timeOver();
            }
        }, 1000);
    }

    timeOver() {
        this.ui.showScreen('final');
        this.ui.showFinal(questions[this.currentQuestion]);
        this.sayGoodBye.startSound(false);
        this.ui.clickOnReplayBtn(() => {
            this.sayGoodBye.stopSound();
            this.ui.resetAllBgAnswer();
            this.ui.resetScore();
            this.currentQuestion = 0;
            this.timeLeft = 30;
            this.clearAllTimeouts();
            this.startGame();
        });
    }

    shuffleQuestions() {
        for (let i = questions.length - 3; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    changeScoreQuestions() {
        for (let i = 0; i < questions.length; i++) {
            questions[i].score = scores[i];
        }
    }
}

const questions = [{
    question: 'Đâu là một loại hình chợ tạm tự phát thường xuất hiện trong các khu dân cư?',
    score: 0,
    answer: ['A. Ếch', 'B. Cóc', 'C. Thằn lằn', 'D. Nhái'],
    correct: ['b']
}, {
    question: 'Đâu là tên một bãi biển đẹp ở Quảng Bình?',
    score: 2000,
    answer: ['A. Đá Lăn', 'B. Đá Chạy', 'C. Đá Nhảy', 'D. Đá Bò'],
    correct: ['c']
}, {
    question: 'Haiku là thể thơ truyền thống của nước nào?',
    score: 4000,
    answer: ['A. Nhật Bản', 'B. Mông Cổ', 'C. Trung Quốc', 'D. Hàn Quốc'],
    correct: ['a']
}, {
    question: 'Chiến trường Đắk Tô - Tân Cảnh, nơi diễn ra chiến thắng vang đội năm 1972, nay thuộc địa bàn tỉnh nào ở Tây Nguyên?',
    score: 6000,
    answer: ['A. Kon Tum', 'B. Đắk Lắk', 'C. Đắk Nông', 'D. Gia Lai'],
    correct: ['a']
}, {
    question: 'Đâu là tên một loại bánh Huế?',
    score: 10000,
    answer: ['A. Sướng', 'B. Vui', 'C. Thích', 'D. Khoái'],
    correct: ['d']
}, {
    question: 'Tượng đài Chiến thắng Điện Biên Phủ được dựng trên ngọn đồi nào?',
    score: 20000,
    answer: ['A. C1', 'B. E1', 'C. D1', 'D. A1'],
    correct: ['c']
}, {
    question: 'Màu chủ đạo của tờ tiền Polymer mệnh giá 500.000 đồng là gì?',
    score: 30000,
    answer: ['A. Xanh', 'B. Vàng', 'C. Đỏ', 'D. Tím'],
    correct: ['a']
}, {
    question: 'Bảo tàng Hồ Chí Minh được thiết kế theo dáng một loài hoa nào?',
    score: 60000,
    answer: ['A. Hoa đào', 'B. Hoa sen', 'C. Hoa hướng dương', 'D. Hoa hồng'],
    correct: ['b']
}, {
    question: 'Tổng thống Ukraine Volodymyr Zelensky làm nghề gì trước khi nhậm chức?',
    score: 100000,
    answer: ['A. Võ sĩ quyền anh', 'B. Diễn viên hài', 'C. Bác sĩ phẫu thuật', 'D. Doanh nhân'],
    correct: ['b']
}, {
    question: 'Đâu là tên một loại đồ chơi dân gian của trẻ em?',
    score: 140000,
    answer: ['A. Tò vò', 'B. Tến tò', 'C. Tò he', 'D. Tò mò'],
    correct: ['c']
}, {
    question: 'Đâu không phải là một tác phẩm của họa sĩ Trần Văn Cẩn?',
    score: 220000,
    answer: ['A. Em Thúy', 'B. Em gái tôi', 'C. Đôi bạn', 'D. Mẹ'],
    correct: ['c']
}, {
    question: 'Trung tâm IT tốt nhất Sài Gòn?',
    score: 300000,
    answer: ['A. CodeGym', 'B. CodeGym', 'C. CodeGym', 'D. CodeGym'],
    correct: ['a', 'b', 'c', 'd']
}, {
    score: 999000,
}]

const scores = [0, 2000, 4000, 6000, 10000, 20000, 30000, 60000, 100000, 140000, 220000, 300000, 999000]

export default GameBoard;