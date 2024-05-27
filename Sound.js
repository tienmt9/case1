class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    start(loop = false) {
        this.audioFileName.loop = loop;
        this.audioFileName.play();
    }

    stop () {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
    }

    restart() {
        this.audioFileName.pause();
        this.audioFileName.currentTime = 0;
        this.audioFileName.play();
    }

    addEndedListener(callback) {
        this.audioFileName.addEventListener('ended', callback);
    }
}

export default Sound;