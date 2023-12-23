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
import ProjectileComponent from "./components/ProjectileComponent.js";


import ApplyOnClickSystem from "./systems/ApplyOnClickSystem.js";
import ApplyOnMouseSystem from "./systems/ApplyOnMouseSystem.js";
import ProjectileCollisionSystem from "./systems/ProjectileCollisionSystem.js";
import ProjectileSystem from "./systems/ProjectileSystem.js";
import ViewSystem from "./systems/ViewSystem.js";
import ZombySystem from "./systems/ZombySystem.js";
import ZombyCollisionSystem from "./systems/ZombyCollisionSystem.js";
import ShootSystem from "./systems/ShootSystem.js";

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
    defender.addComponent(new AnimationComponent(0, 0, 0, 1, 167, 243));
    defender.addComponent(new CollisionComponent(2, false));
    defender.addComponent(new ShootComponent(true));
    defender.getComponent("ShootComponent").setShootNow(true).build()
    //added shoot builder component
    entities.set(defender.id, defender);

 

    console.log("Defender created at " + x + " " + y);
}


function createZomby(x, y) {
    
    const zomby = new Entity("Zomby");
    zomby.addComponent(new AnimationComponent(0, 0, 0, 7, 167, 243));
    zomby.addComponent(new ContextComponent(ctx, "assets/zombie.png"));
    zomby.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    zomby.addComponent(new PositionComponent(x, y));
    zomby.addComponent(new VelocityComponent(-4, 0));
    zomby.addComponent(new HealthComponent(100));
    zomby.addComponent(new AnimationComponent(0, 0, 0, 7, 292, 410));
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

const cellSize = 100;
const cellGap = 3;
canvas.addEventListener('click', function() {
    const gridPositionX = mouse.getComponent("PositionComponent").x - (mouse.getComponent("PositionComponent").x % cellSize) + cellGap;
    const gridPositionY = mouse.getComponent("PositionComponent").y - (mouse.getComponent("PositionComponent").y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    if(!ApplyOnClickSystem(
        entities,
        mouse.getComponent("PositionComponent").x,
        mouse.getComponent("PositionComponent").y, 
        mouse.getComponent("SizeComponent").width,
        mouse.getComponent("SizeComponent").height
    )){
        createDefender(gridPositionX, gridPositionY);
    }else{
        console.log("Cell is occupied");
    }
   
    // let defenderCost = 100;
    // if (numberOfResources >= defenderCost) {
    //     defenders.push(new Defender(gridPositionX, gridPositionY));
    //     numberOfResources -= defenderCost;
    // } else {
    //     floatingMessages.push(new FloatingMessage('need more resources', mouse.x, mouse.y, 20, 'red'));
    // }
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
        if(Math.random() > 0.9) {
            cell.addComponent(new ColorComponent("black"));
        }else{
            cell.addComponent(new ColorComponent("green"));
        }
       
        cell.addComponent(new PositionComponent(x, y));
        cell.addComponent(new CollisionComponent(1, false));
        entities.set(cell.id, cell);
    }
}
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};

let frame = 0
let enemiesInterval = 600

let frames_per_second = 60;
let previousTime = performance.now();

let frame_interval = 1000 / frames_per_second;
let delta_time_multiplier = 1;
let delta_time = 0;

function animate(currentTime) {
    frame++;
 
    delta_time = currentTime - previousTime;
    delta_time_multiplier = delta_time / frame_interval;  
    previousTime = currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);

    if (frame % enemiesInterval === 0 && entities.size > 0) {
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
 
 
    drawPath()
    console.log(entities.size);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});