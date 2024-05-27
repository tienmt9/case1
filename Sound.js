class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    start(loop = false) {
        this.audioFileName.loop = loop;
        this.audioFileName.play();
        setTimeout(() => {
            this.audioFileName.pause();
            this.audioFileName.currentTime = 0;
        }, 10000);
    }

    stop() {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
    }

    restart() {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
        this.audioFileName.play();
        setTimeout(() => {
            this.audioFileName.pause();
            this.audioFileName.currentTime = 0;
        }, 10000);
    }

    addEndedListener(callback) {
        this.audioFileName.addEventListener('pause', callback);
    }
}

export default Sound;