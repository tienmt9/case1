class UI {
    constructor() {

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
        document.getElementById('answer_a').addEventListener('click', () => callback(0));
        document.getElementById('answer_b').addEventListener('click', () => callback(1));
        document.getElementById('answer_c').addEventListener('click', () => callback(2));
        document.getElementById('answer_d').addEventListener('click', () => callback(3));
    }

}

export default UI;