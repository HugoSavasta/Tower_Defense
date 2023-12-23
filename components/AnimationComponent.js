class AnimationComponent {
    constructor(frameX = 0, frameY = 0, minFrame = 0, maxFrame = 0,
         spriteWidth = 100, spriteHeight = 100, frameSpeed = 0) {    
        this.frameX = frameX;
        this.frameY = frameY;
        this.minFrame = minFrame;
        this.maxFrame = maxFrame;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.frameSpeed = frameSpeed;
    }
}

export default AnimationComponent;