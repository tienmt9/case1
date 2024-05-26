class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    start() {
        this.audioFileName.play();
    }

    // onEnd() {
    //     this.audioFileName.currentTime = 0;
    // }
}

export default Sound;