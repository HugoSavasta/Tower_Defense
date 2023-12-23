import {ctx} from "./utils.js";
import Entity from "./Entity.js";
import PositionComponent from "./components/PositionComponent.js";
import AnimationComponent from "./components/AnimationComponent.js";
import CollisionComponent from "./components/CollisionComponent.js";
import ColorComponent from "./components/ColorComponent.js";
import SizeComponent from "./components/SizeComponent.js";
import ContextComponent from "./components/ContextComponent.js";
import HealthComponent from "./components/HealthComponent.js";
import ShootComponent from "./components/ShootComponent.js";
import VelocityComponent from "./components/VelocityComponent.js";


import ApplyOnClickSystem from "./systems/ApplyOnClickSystem.js";
import ApplyOnMouseSystem from "./systems/ApplyOnMouseSystem.js";
import ProjectileCollisionSystem from "./systems/ProjectileCollisionSystem.js";
import ProjectileSystem from "./systems/ProjectileSystem.js";
import ViewSystem from "./systems/ViewSystem.js";
import ZombySystem from "./systems/ZombySystem.js";
import ZombyCollisionSystem from "./systems/ZombyCollisionSystem.js";
import ShootSystem from "./systems/ShootSystem.js";
import { observer } from "./Observable.js";

const systems = [
    ShootSystem,
    ProjectileCollisionSystem,
    ProjectileSystem,
    ViewSystem, 
    ZombySystem,
    ZombyCollisionSystem,
];


const entities = new Map();
const canvas = document.getElementById("canvas");
canvas.width = 900;
canvas.height = 600;

let level = 1;
let score = 0;
let gameOver = false;
let winningScore = 50;
const cellSize = 100;
const cellGap = 3;
let numberOfResources = 300000;
const floatingMessages = [];
const resources = [];
let frame = 0
let enemiesInterval = 400

let frames_per_second = 60;
let previousTime = performance.now();

let frame_interval = 1000 / frames_per_second;
let delta_time_multiplier = 1;
let delta_time = 0;


const plant = new Entity("Choose_plant_1");
plant.addComponent(new ContextComponent(ctx, "assets/plant.png"));
plant.addComponent(new SizeComponent(70, 85));
plant.addComponent(new PositionComponent(10, 10));
entities.set(plant.id, plant);

const plant2 = new Entity("Choose_plant_2");
plant2.addComponent(new ContextComponent(ctx, "assets/plant.png"));
plant2.addComponent(new SizeComponent(70, 85));
plant2.addComponent(new PositionComponent(90, 10));
entities.set(plant2.id, plant2);

function createDefender(x, y) {
    
    const defender = new Entity("Defender");

    defender.addComponent(new ContextComponent(ctx, "assets/plant.png"));
    defender.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    defender.addComponent(new PositionComponent(x, y));
    defender.addComponent(new HealthComponent(100));
    defender.addComponent(new AnimationComponent(0, 0, 0, 1, 167, 243, 30));
    defender.addComponent(new CollisionComponent(2, false));
    defender.addComponent(new ShootComponent(true));
      //added shoot builder component
    defender.getComponent("ShootComponent").setShootNow(true).build()
  
    entities.set(defender.id, defender);

 

    observer.notify("Defender created at " + x + " " + y);
}


function createZomby(x, y) {
    
    const zomby = new Entity("Zomby");
    zomby.addComponent(new ContextComponent(ctx, "assets/zombie.png"));
    zomby.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    zomby.addComponent(new PositionComponent(x, y));
    let randomSpeed = Math.floor(Math.random() * 5 + 1)
    zomby.addComponent(new VelocityComponent(-randomSpeed, 0));
    let randomHealth = Math.floor(Math.random() * 500 + 100)
    zomby.addComponent(new HealthComponent(randomHealth));
    zomby.addComponent(new AnimationComponent(0, 0, 0, 7, 292, 410, 30));
    zomby.addComponent(new CollisionComponent(2, false));
    //added shoot builder component
    entities.set(zomby.id, zomby);
}


const mouse = new Entity("Mouse");
mouse.addComponent(new PositionComponent(0, 0));
mouse.addComponent(new SizeComponent(0.1, 0.1));

canvas.addEventListener('mousemove', function (e) {
    mouse.getComponent("PositionComponent").x = e.x - canvasPosition.left;
    mouse.getComponent("PositionComponent").y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function () {
    mouse.getComponent("PositionComponent").x = undefined;
    mouse.getComponent("PositionComponent").y = undefined;
});

document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        observer.notify('Space key pressed');
    }
});
  


class FloatingMessage {
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

function handleFloatingMessages() {
    for (let i = 0; i < floatingMessages.length; i++) {
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if (floatingMessages[i].lifeSpan >= 50) {
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}

function handleGameStatus(gaOv) {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Score: ' + score, 200, 40);
    ctx.fillText('Resources: ' + numberOfResources, 200, 80);
    if (gaOv) {
        ctx.fillStyle = 'blue';
        ctx.font = '90px Orbitron';
        ctx.fillText('GAME OVER!', 135, 330);
        ctx.font = '45px Orbitron';
        ctx.fillText('\n\nPress Space to Restart', 135, 430);
        gameOver = gaOv;
    }

    if (score >= winningScore) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Orbitron';
        ctx.fillText('LEVEL COMPLETE', 130, 300);
        ctx.font = '30px Orbitron';
        ctx.fillText('You win with ' + score + ' points!', 134, 340);
    }
}

const amounts = [20, 30, 40];
class Resource {
    constructor() {
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    }
    
    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Orbitron';
        ctx.fillText(this.amount, this.x + 15, this.y + 32);
    }
}

observer.subscribe((data) => {
    if(data){
       if(data === "Game Over"){
         handleGameStatus(true);
       }
       else if(data === "Space key pressed"){
              resetGame(level);
       }
       else if(data === "Scored"){
        score++;
       }
    }
});


canvas.addEventListener('click', function() {
    const pos = mouse.getComponent("PositionComponent")
    const gridPositionX = pos.x - (pos.x % cellSize) + cellGap;
    const gridPositionY = pos.y - (pos.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    if(!ApplyOnClickSystem(
        entities,
        pos.x,
        pos.y, 
        mouse.getComponent("SizeComponent").width,
        mouse.getComponent("SizeComponent").height
    )){
       
        let defenderCost = 100;
        if (numberOfResources >= defenderCost) {
            createDefender(gridPositionX, gridPositionY);
            numberOfResources -= defenderCost;
        } else {
            floatingMessages.push(new FloatingMessage('Need more resources',
             pos.x, pos.y, 20, 'red'));
        }
    }else{
        floatingMessages.push(new FloatingMessage('Cell is occupied', pos.x, pos.y, 20, 'red'));
    }
});

const pathPoints = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    // Ajoutez autant de points que nécessaire pour définir votre chemin
  ];

function drawPath() {
    ctx.beginPath();
    ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
    for (let i = 1; i < pathPoints.length; i++) {
      ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
  }

for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
        const cell = new Entity("Cell")
        cell.addComponent(new SizeComponent(cellSize - cellGap * 1, cellSize - cellGap * 1));
        cell.addComponent(new ContextComponent(ctx));
        cell.addComponent(new ColorComponent("black"));
        cell.addComponent(new PositionComponent(x, y));
        cell.addComponent(new CollisionComponent(1, false));
        entities.set(cell.id, cell);
    }
}


function resetGame(level) {
    if(gameOver){
        score = 0;
        gameOver = false;
        numberOfResources = 300000;
        entities.forEach(entity => {
            if(entity.name !== "Cell" && entity.name !== "Mouse" 
            && entity.name !== "Choose_plant_1" && entity.name !== "Choose_plant_2"){
                entities.delete(entity.id);
            }else{
                level++;
            }
        });
        observer.notify("Game Reset");  
        requestAnimationFrame(animate);
    }
}
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};



function animate(currentTime) {
    frame++;
 
    delta_time = currentTime - previousTime;
    delta_time_multiplier = delta_time / frame_interval;  
    previousTime = currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);

    if (entities.size > 47 && frame % enemiesInterval === 0 && entities.size > 0) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        createZomby(800, verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }

    if(entities){
        ApplyOnMouseSystem(
            entities,
            mouse.getComponent("PositionComponent").x,
            mouse.getComponent("PositionComponent").y, 
            mouse.getComponent("SizeComponent").width,
            mouse.getComponent("SizeComponent").height
        );
        systems.forEach(system => {
            system(entities, delta_time_multiplier, frame);
        });
      
    }
 

    drawPath();
    handleFloatingMessages();
    handleGameStatus();

    
    if(!gameOver){
        requestAnimationFrame(animate);
    }
}
requestAnimationFrame(animate);

let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});