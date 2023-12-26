const canvas1 = document.getElementById("canvas");
canvas1.width = 900;
canvas1.height = 600;

const canvas2 = document.getElementById("ui");
canvas2.width = 900;
canvas2.height = 600;


const ctx1 = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

ctx1.webkitImageSmoothingEnabled = false;
ctx1.mozImageSmoothingEnabled = false;
ctx1.imageSmoothingEnabled = false;

ctx2.webkitImageSmoothingEnabled = false;
ctx2.mozImageSmoothingEnabled = false;
ctx2.imageSmoothingEnabled = false;

export {canvas1, canvas2, ctx1, ctx2};


export class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

export function generateSimpleUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


export class FloatingMessage {
    constructor(value, x, y, size, color) {
        if (FloatingMessage.instance) {
            return FloatingMessage.instance;
        }
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }
    
    update() {
        this.y -= 0.3;
        this.lifeSpan += 1;
        if (this.opacity > 0.03) this.opacity -= 0.01;
    }
    
    draw() {
        ctx2.globalAlpha = this.opacity;
        ctx2.fillStyle = this.color;
        ctx2.font = this.size + 'px Orbitron';
        ctx2.fillText(this.value, this.x, this.y);
        ctx2.globalAlpha = 1;
    }
}

export function handleFloatingMessages() {
    for (let i = 0; i < floatingMessages.length; i++) {
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if (floatingMessages[i].lifeSpan >= 50) {
            floatingMessages.splice(i, 1);
            i--;
        }
    }
};


export const floatingMessages = [];
export let numberOfResources = 300;

export function setResource(value) {
    numberOfResources = value;
}

export function incResource(value) {
    numberOfResources += value;
}
export function decResource(value) {
    numberOfResources -= value;
}


export let numberOfZombies = 0;
export function setZombies(value) {
    numberOfZombies += value;
}

