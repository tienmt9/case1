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

    clickOnStartBtn(callback) {
        let startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', callback);
    }
}

export default UI;