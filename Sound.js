class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    startSound(loop = false) {
        this.audioFileName.loop = loop;
        this.audioFileName.play();
    }

    start10() {
        this.audioFileName.play();
        setTimeout(() => {
            this.stopSound();
        }, 10000);
    }

    stopSound() {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
    }

    restartSound() {
        this.stopSound();
        this.audioFileName.play();
        setTimeout(() => {
            this.stopSound();
        }, 10000);

    }

    addPausedListener(callback) {
        this.audioFileName.addEventListener('pause', callback);
    }
}

export default Sound;