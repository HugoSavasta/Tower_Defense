class SoundComponent {
    constructor (src = "") {
        if(src === "") return alert("SoundComponent: src is empty");
        this.sound = new Howl({
            src: [src],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
            }
        });
    }
}
export default SoundComponent;