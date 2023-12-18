class  ImageComponent {
    constructor(url) {
        try {
            this.img = new Image();
            this.img.src = url;
        } catch (error) {
            alert(error);
        }
    }
};

export default ImageComponent;