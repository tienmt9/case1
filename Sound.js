class Sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.audioFileName = new Audio('sound/' + this.fileName);
    }

    start() {
        this.audioFileName.play();
    }
}

export default Sound;