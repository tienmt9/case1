class UI {
    constructor() {

    }

    showScreen(screenName) {
        let currentScreen = document.getElementById(screenName);
        currentScreen.style.display = 'block';
    }

    clickOnStartBtn (callback){
        let startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', callback);
    }
}

export default UI;