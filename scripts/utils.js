const canvas = document.getElementById("canvas");
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext("2d");



ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


export {canvas, ctx};



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
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'px Orbitron';
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAlpha = 1;
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

