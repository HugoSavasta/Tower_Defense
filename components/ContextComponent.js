class ContextComponent {
    constructor(ctx) {
        this.context = ctx;
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = 'high';
    }
}
export default ContextComponent;