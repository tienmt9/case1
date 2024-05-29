class UI {
    constructor() {
        this.previousSelectedAnswer = null;
        this.highestScore = 0;
    }

    showScreen(screenName) {
        let screens = document.querySelectorAll('#skin > div');
        screens.forEach((screen) => {
            screen.style.display = 'none';
        });

        let currentScreen = document.getElementById(screenName);
        currentScreen.style.display = 'block';
    }

    hideScreen(screenName) {
        let currentScreen = document.getElementById(screenName);
        currentScreen.style.display = 'none';
    }

    clickOnStartBtn(callback) {
        let startBtn = document.getElementById("startBtn");
        startBtn.addEventListener('click', callback);
    }

    clickOnReplayBtn(callback) {
        let replayBtn = document.getElementById("replayBtn");
        replayBtn.addEventListener('click', callback);
    }

    showQuestion(question) {
        document.getElementById('question').innerHTML = question.question;
        document.getElementById('score').innerHTML = `kVND: ${question.score}`;
        document.getElementById('answer_a').innerHTML = question.answer[0];
        document.getElementById('answer_b').innerHTML = question.answer[1];
        document.getElementById('answer_c').innerHTML = question.answer[2];
        document.getElementById('answer_d').innerHTML = question.answer[3];
    }

    showFinal(question) {
        document.getElementById('finalScore').innerHTML = `Bạn nhận được giải thưởng là ${question.score / 1000} triệu đồng`;
        document.getElementById('finalScore').style.color = "white";
        if (this.highestScore < question.score) this.highestScore = question.score;
        document.getElementById('highestScore').innerHTML = `Kỷ lục đạt được là ${this.highestScore / 1000} triệu đồng`;
        document.getElementById('highestScore').style.color = "white";
    }

    clickOnAnswer(callback) {
        document.getElementById('answer_a').addEventListener('click', () => callback('a'));
        document.getElementById('answer_b').addEventListener('click', () => callback('b'));
        document.getElementById('answer_c').addEventListener('click', () => callback('c'));
        document.getElementById('answer_d').addEventListener('click', () => callback('d'));
    }

    selectAnswer(answer) {
        if (this.previousSelectedAnswer !== null) {
            this.previousSelectedAnswer.style.backgroundColor = '#00BFFF';
            this.previousSelectedAnswer.style.color = 'black';
        }
        let answerSpan = document.getElementById('answer_' + answer);
        answerSpan.style.backgroundColor = '#00FF00';
        answerSpan.style.color = '#F5F5F5';
        this.previousSelectedAnswer = answerSpan;
    }

    resetBgAnswer(answer) {
        let previousAnswer = document.getElementById('answer_' + answer);
        previousAnswer.style.backgroundColor = '#00BFFF';
        previousAnswer.style.color = 'black';
    }

    showResult(wrongAnswer, correctAnswer) {
        document.getElementById('answer_' + wrongAnswer).style.backgroundColor = "#FF4500";
        document.getElementById('answer_' + wrongAnswer).style.color = "black";

        document.getElementById('answer_' + correctAnswer).style.backgroundColor = "#00FF7F";
        document.getElementById('answer_' + correctAnswer).style.color = "white";
    }

    rightResult(rightAnswer) {
        document.getElementById('answer_' + rightAnswer).classList.add('blink-bg');
        setTimeout(() => {
            document.getElementById('answer_' + rightAnswer).classList.remove('blink-bg');
        }, 1100);
    }
}

export default UI;