class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    start(loop = false) {
        this.audioFileName.loop = loop;
        this.audioFileName.play();
    }

    start10() {
        this.audioFileName.play();
        setTimeout(() => {
            this.stop();
        }, 10000);
    }

    stop() {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
    }

    restart() {
        this.stop();
        this.audioFileName.play();
        setTimeout(() => {
            this.stop();
        }, 10000);
    }

    addPausedListener(callback) {
        this.audioFileName.addEventListener('pause', callback);
    }

    addEndedListener(callback) {
        this.audioFileName.addEventListener('ended', callback);
    }
}

export default Sound;