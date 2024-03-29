import { floatingMessages } from "./constants.js";

import Entity from "./Entity.js";
import PositionComponent from "../components/PositionComponent.js";
import SizeComponent from "../components/SizeComponent.js";

const canvas = document.getElementById("canvas");
canvas.width = 900;
canvas.height = 600;
let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});

const ctx = canvas.getContext("2d");



ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


export {canvas, ctx};

const mouse = new Entity("Mouse");
mouse.addComponent(new PositionComponent(0, 0));
mouse.addComponent(new SizeComponent(0.1, 0.1));
export {mouse};

class MouseFactory {
    create(type) {
      switch (type) {
        case 'move':
          return new Move();
        case 'leave':
          return new Leave();
        default:
          throw new Error('Type not supported');
      }
    }
  }
  

  class Interface {
    start() {
      throw new Error('Method "start" must be implemented');
    }
  }
  
  class Move extends Interface {
    start() {
        canvas.addEventListener('mousemove', function (e) {
            mouse.getComponent("PositionComponent").x = e.x - canvasPosition.left;
            mouse.getComponent("PositionComponent").y = e.y - canvasPosition.top;
        });
    }
  }

  class Leave extends Interface {
    start() {
        canvas.addEventListener('mouseleave', function () {
            mouse.getComponent("PositionComponent").x = undefined;
            mouse.getComponent("PositionComponent").y = undefined;
        });
    }
  }
  
 
const mouseFactory = new MouseFactory();
const mousemove = mouseFactory.create('move');
const mouseleave = mouseFactory.create('leave');

export {mousemove, mouseleave};

export class FloatingMessage {

    constructor(value, x, y, size, color) {
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
import AllZombiesStopSoundSystem from "../systems/behaviors/AllZombiesStopSoundSystem.js";

export function resetGame() {
 
    setScore(0);
    setGameOver(false);
    setWon(false);
    setResource(300);
    setLevel(1);


    AllZombiesStopSoundSystem();
    entityManager.defenders.clear();
    entityManager.projectiles.clear();
    entityManager.zombies.clear();
    entityManager.zombies_sound.clear();
    entityManager.resources.clear();
    const tempCanvases = document.querySelectorAll('#temp_canvas');
    tempCanvases.forEach((canvas) => {
        canvas.parentNode.removeChild(canvas);
    });
 

}
export function handleGameStatus(gO) {
    
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Level: ' + level, 400, 30);
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
        
        setEnemiesInterval(700);

        AllZombiesStopSoundSystem();
        entityManager.defenders.clear();
        entityManager.projectiles.clear();
        entityManager.zombies.clear();
        entityManager.resources.clear();
        entityManager.zombies_sound.clear();
     
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
        temp_ctx.fillText('You completed the level ' + (level-1), 134, 160);
        entityManager.projectiles.clear();
        entityManager.zombies.clear();
        entityManager.zombies_sound.clear();
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