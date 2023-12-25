class ImageComponent {
    constructor(url = null) {
        try {
            this.image = new Image();
            this.image.src = url;   
        } catch (error) {
            alert(error);
        }
    }
}
export default ImageComponent;