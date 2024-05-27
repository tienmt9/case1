class UI {
    constructor() {
        this.previousSelectedAnswer = null;
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

    showQuestion(question) {
        document.getElementById('question').innerHTML = question.question;
        document.getElementById('answer_a').innerHTML = question.answer[0];
        document.getElementById('answer_b').innerHTML = question.answer[1];
        document.getElementById('answer_c').innerHTML = question.answer[2];
        document.getElementById('answer_d').innerHTML = question.answer[3];
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
}

export default UI;