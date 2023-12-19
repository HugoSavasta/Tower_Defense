import Entity from "./Entity.js";
import PositionComponent from "./components/PositionComponent.js";
import ImageComponent from "./components/ImageComponent.js";
import AnimationComponent from "./components/AnimationComponent.js";
import CollisionComponent from "./components/CollisionComponent.js";
import ColorComponent from "./components/ColorComponent.js";
import SizeComponent from "./components/SizeComponent.js";
import ContextComponent from "./components/ContextComponent.js";
import HealthComponent from "./components/HealthComponent.js";
import ShootComponent from "./components/ShootComponent.js";
import ShootSystem from "./systems/ShootSystem.js";
import ProjectileComponent from "./components/ProjectileComponent.js";
import VelocityComponent from "./components/VelocityComponent.js";

import CellCollisionSystem from "./systems/CellCollisionSystem.js";
import ProjectileCollisionSystem from "./systems/ProjectileCollisionSystem.js";
import ProjectileSystem from "./systems/ProjectileSystem.js";
import ViewSystem from "./systems/ViewSystem.js";
import ZombySystem from "./systems/ZombySystem.js";

const canvas = document.getElementById("canvas");
canvas.width = 900;
canvas.height = 600;

const ctx = canvas.getContext("2d");
const viewSystem = new ViewSystem();
const cellCollisionSystem = new CellCollisionSystem();
const shootSystem = new ShootSystem();
const projectileSystem = new ProjectileSystem();
const projectileCollisionSystem = new ProjectileCollisionSystem();
const zombySystem = new ZombySystem();

const plant = new Entity("Choose_plant_1");
plant.addComponent(new ImageComponent("assets/plant.png"));
plant.addComponent(new ContextComponent(ctx));
plant.addComponent(new SizeComponent(70, 85));
plant.addComponent(new PositionComponent(10, 10));
viewSystem.addEntity(plant);

const plant2 = new Entity("Choose_plant_2");
plant2.addComponent(new ImageComponent("assets/plant.png"));
plant2.addComponent(new ContextComponent(ctx));
plant2.addComponent(new SizeComponent(70, 85));
plant2.addComponent(new PositionComponent(90, 10));
viewSystem.addEntity(plant2);

function createDefender(x, y) {
    
    const defender = new Entity("Defender");
    defender.addComponent(new ImageComponent("assets/plant.png"));
    defender.addComponent(new ContextComponent(ctx));
    defender.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    defender.addComponent(new PositionComponent(x, y));
    defender.addComponent(new HealthComponent(100));
    defender.addComponent(new AnimationComponent(0, 0, 0, 1, 167, 243));
    defender.addComponent(new CollisionComponent(2, false));
    //added shoot builder component
    cellCollisionSystem.addEntity(defender);
    viewSystem.addEntity(defender);

    const defenderShoot = new Entity("DefenderShoot");
    defenderShoot.addComponent(new ContextComponent(ctx));
    defenderShoot.addComponent(new ColorComponent("black"));
    defenderShoot.addComponent(new ProjectileComponent());
    defenderShoot.addComponent(new SizeComponent(1, 1));
    defenderShoot.addComponent(new PositionComponent(x+50, y+50));
    defenderShoot.addComponent(new CollisionComponent(3, false));
    defenderShoot.addComponent(new VelocityComponent(50, 0));
    defenderShoot.addComponent(new ShootComponent(true));
    defenderShoot.getComponent("ShootComponent").setShootNow(true).build()
    shootSystem.addEntity(defenderShoot);
    projectileCollisionSystem.addEntity(defenderShoot);
    projectileSystem.addEntity(defenderShoot);
    viewSystem.addEntity(defenderShoot);

    console.log("Defender created at " + x + " " + y);
}


function createZomby(x, y) {
    
    const zomby = new Entity("Zomby");
    zomby.addComponent(new ImageComponent("assets/zombie.png"));
    zomby.addComponent(new AnimationComponent(0, 0, 0, 7, 167, 243));
    zomby.addComponent(new ContextComponent(ctx));
    zomby.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    zomby.addComponent(new PositionComponent(x, y));
    zomby.addComponent(new VelocityComponent(-0.4, 0));
    zomby.addComponent(new HealthComponent(100));
    zomby.addComponent(new AnimationComponent(0, 0, 0, 1, 292, 410));
    zomby.addComponent(new CollisionComponent(2, false));
    //added shoot builder component
    cellCollisionSystem.addEntity(zomby);
    zombySystem.addEntity(zomby);
    projectileSystem.addEntity(zomby);
    viewSystem.addEntity(zomby);
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
    if(!cellCollisionSystem.applyOnClick(
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



for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
        const cell = new Entity("Cell")
        cell.addComponent(new SizeComponent(cellSize - cellGap * 1, cellSize - cellGap * 1));
        cell.addComponent(new ContextComponent(ctx));
        cell.addComponent(new ColorComponent("black"));
        cell.addComponent(new PositionComponent(x, y));
        cell.addComponent(new CollisionComponent(1, false));
        viewSystem.addEntity(cell);
        cellCollisionSystem.addEntity(cell);
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
    viewSystem.render(delta_time_multiplier);
   
    if (frame % enemiesInterval === 0 && projectileCollisionSystem.entities.size > 0) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        createZomby(800, verticalPosition);
        if (enemiesInterval > 120) enemiesInterval -= 50;
    }
    cellCollisionSystem.applyOnMouse(
        mouse.getComponent("PositionComponent").x,
        mouse.getComponent("PositionComponent").y, 
        mouse.getComponent("SizeComponent").width,
        mouse.getComponent("SizeComponent").height
    );
    zombySystem.update(delta_time_multiplier);
    if(zombySystem.entities.size > 0){
        shootSystem.update(delta_time_multiplier);
        projectileSystem.update(delta_time_multiplier);
        projectileCollisionSystem.update();
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});