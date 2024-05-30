class Sound {
    constructor(fileName) {
        this.fileSoundName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileSoundName);
        this.timeoutSoundID = null;
    }

    startSound(loop = false) {
        this.audioFileName.loop = loop;
        this.audioFileName.play();
    }

    startSound_10() {
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
        clearTimeout(this.timeoutSoundID);
        this.timeoutSoundID = null;
        this.timeoutSoundID = setTimeout(() => {
            this.stopSound();
        }, 10000);
    }

    addPausedListener(callback) {
        this.audioFileName.addEventListener('pause', callback);
    }
}

export default Sound;