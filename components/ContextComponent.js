class ContextComponent {
    constructor(ctx, url = null) {
        this.context = ctx;
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = 'high';
        if(url){
            this.image = new Image();
            this.image.src = url;
        }
    }
}
export default ContextComponent;