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

export let score = 0;
export function setScore(value) {
    score = value;
}

export function incScore(value) {
    score += value;
}

export let enemiesInterval = 700;
export function setEnemiesInterval(value) {
    enemiesInterval = value;
}
export function decEnemiesInterval(value) {
    enemiesInterval -= value;
}


export let temp_ctx = null;
export let won = false;
export function setWon(value) {
    won = value;
}
export let gameOver = false;
export function setGameOver(value) {
    gameOver = value;
}
export let level = 1;
export function setLevel(value) {
    level = value;
}
export function incLevel(value) {
    level += value;
}

import {entityManager} from "./EntityManager.js";
import AllZombiesStopSoundSystem from "../systems/behaviours/AllZombiesStopSoundSystem.js";

export function resetGame() {
 

    AllZombiesStopSoundSystem();
    entityManager.defenders.clear();
    entityManager.projectiles.clear();
    entityManager.zombies.clear();
    entityManager.resources.clear();
    // observer.notify("Game Reset");  
 
    const tempCanvases = document.querySelectorAll('#temp_canvas');
    tempCanvases.forEach((canvas) => {
        canvas.parentNode.removeChild(canvas);
    });
 
    setScore(0);
    setGameOver(false);
    setWon(false);
    setResource(300);
    setLevel(1);
}
export function handleGameStatus(gO) {
    
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Score: ' + score, 600, 30);
    ctx.fillText('Resources: ' + numberOfResources, 600, 60);

    if (gO) {
        const temp_canvas = document.createElement('canvas');
        temp_canvas.id = 'temp_canvas';
        temp_canvas.width = canvas.width;
        temp_canvas.height = canvas.height/2;
        temp_ctx = temp_canvas.getContext('2d');
        temp_ctx.fillStyle = 'blue';
        temp_ctx.font = '90px Orbitron';
        temp_ctx.fillText('GAME OVER', 135, 100);
        temp_ctx.font = '45px Orbitron';
        temp_ctx.fillText('\n\nPress Space to Restart', 135, 160);
        setGameOver(gO);
        document.body.appendChild(temp_canvas);
        setScore(0);
    }

    if (won && !gO) {
        AllZombiesStopSoundSystem();
        const temp_canvas2 = document.createElement('canvas');
        temp_canvas2.id = 'temp_canvas';
        temp_canvas2.width = canvas.width;
        temp_canvas2.height = canvas.height/2;
        temp_ctx = temp_canvas2.getContext('2d');
        temp_ctx.fillStyle = 'black';
        temp_ctx.font = '60px Orbitron';
        temp_ctx.fillText('LEVEL COMPLETE', 130, 100);
        temp_ctx.font = '30px Orbitron';
        temp_ctx.fillText('You won with ' + score + ' points!', 134, 160);
        entityManager.projectiles.clear();
        entityManager.zombies.clear();
        entityManager.resources.clear();
        
        document.body.appendChild(temp_canvas2);
        setTimeout(() => {
            const tempCanvases = document.querySelectorAll('#temp_canvas');
            tempCanvases.forEach((canvas) => {
                canvas.parentNode.removeChild(canvas);
            });
            setEnemiesInterval(700);
            setWon(false);
        }, 3000);
    }
}