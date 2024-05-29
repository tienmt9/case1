class ImageGame {
    constructor(fileName, width, height) {
        this.fileImageName = fileName;
        this.img = new Image();
        this.img.src = 'img/' + this.fileImageName;
        this.img.style.display = 'none';
        this.img.style.width = width;
        this.img.style.height = height;
        document.body.appendChild(this.img);
    }

    showImage(){
        this.img.style.display = 'block';
    }

    hideImage() {
        this.img.style.display = 'none';
    }
}

export default ImageGame;