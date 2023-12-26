import {ctx1, canvas1, ctx2, canvas2} from "./utils.js";
import { observer } from "./Observable.js";
import { numberOfZombies, setZombies, setResource, decResource, numberOfResources, FloatingMessage, floatingMessages, handleFloatingMessages } from "./utils.js";

import Entity from "./Entity.js";
import {entityManager} from "./EntityManager.js";
import PositionComponent from "./components/PositionComponent.js";
import AnimationComponent from "./components/AnimationComponent.js";
import CollisionComponent from "./components/CollisionComponent.js";
import SizeComponent from "./components/SizeComponent.js";
import ContextComponent from "./components/ContextComponent.js";
import HealthComponent from "./components/HealthComponent.js";
import ShootComponent from "./components/ShootComponent.js";
import VelocityComponent from "./components/VelocityComponent.js";
import TextComponent from "./components/TextComponent.js";
import ImageComponent from "./components/ImageComponent.js";

//collisions system
import MouseCellCollisionSystemSystem from "./systems/collision/MouseCellCollisionSystem.js";
import MouseChooseDefenderCollisionSystem from "./systems/collision/MouseChooseDefenderCollisionSystem.js";
import MouseDefenderCollisionSystem from "./systems/collision/MouseDefenderCollisionSystem.js";
import MouseResouceCollisionSystem from "./systems/collision/MouseResourceCollisionSystem.js";
import ProjectileBoundaryCollisionSystem from "./systems/collision/ProjectileBoundaryCollisionSystem.js";
import ZombieProjectileCollisionSystem from "./systems/collision/ZombieProjectileCollisionSystem.js";
import ZombieBoundaryCollisionSystem from "./systems/collision/ZombieBoundaryCollisionSystem.js";
import ZombieDefenderCollisionSystem from "./systems/collision/ZombieDefenderCollisionSystem.js";

// movement system
import ProjectileMovementSystem from "./systems/movement/ProjectileMovementSystem.js";
import ZombieMovementSystem from "./systems/movement/ZombieMovementSystem.js";

//render system
import CellRenderSystem from "./systems/render/CellRenderSystem.js";
import ChooseDefenderRenderSystem from "./systems/render/ChooseDefenderRenderSystem.js";
import DefenderRenderSystem from "./systems/render/DefenderRenderSystem.js";
import ProjectileRenderSystem from "./systems/render/ProjectileRenderSystem.js";
import ResourceRenderSystem from "./systems/render/ResourceRenderSystem.js";
import ZombieRenderSystem from "./systems/render/ZombieRenderSystem.js";

// behaviour system
import ShootSystem from "./systems/behaviours/ShootSystem.js";
import ZombieLifeSystem from "./systems/behaviours/ZombieLifeSystem.js";
import DefenderLifeSystem from "./systems/behaviours/DefenderLifeSystem.js";

// import GameSystem from "./systems/GameSystem.js";
export const entities = new Map();

const systems = [
    ProjectileBoundaryCollisionSystem,
    ZombieProjectileCollisionSystem,
    ZombieBoundaryCollisionSystem,
    ZombieDefenderCollisionSystem,
    ProjectileMovementSystem,
    ZombieMovementSystem,
    CellRenderSystem,
    ChooseDefenderRenderSystem,
    DefenderRenderSystem,
    ProjectileRenderSystem,
    ResourceRenderSystem,
    ZombieRenderSystem,
    ShootSystem,
    ZombieLifeSystem,
    DefenderLifeSystem,
];




let level = 1;
let score = 0;
let gameOver = false;
let winningScore = 5000000;
const cellSize = 100;
const cellGap = 3;



let frame = 0
let enemiesInterval = 200;

let frames_per_second = 60;
let previousTime = performance.now();

let frame_interval = 1000 / frames_per_second;
let delta_time_multiplier = 1;
let delta_time = 0;


const plant = new Entity("Choose_plant_1");
plant.addComponent(new ContextComponent(ctx1));
plant.addComponent(new ImageComponent("assets/plant.png"));
plant.addComponent(new SizeComponent(70, 85));
plant.addComponent(new PositionComponent(10, 10));
entityManager.add(plant);
entities.set(plant.id, plant);

const plant2 = new Entity("Choose_plant_2");
plant2.addComponent(new ContextComponent(ctx1));
plant2.addComponent(new ImageComponent("assets/plant.png"));
plant2.addComponent(new SizeComponent(70, 85));
plant2.addComponent(new PositionComponent(90, 10));
entityManager.add(plant2);
entities.set(plant2.id, plant2);


function createDefender(x, y) {
    
    const defender = new Entity("Defender");

    defender.addComponent(new ContextComponent(ctx1));
    defender.addComponent(new ImageComponent("assets/sunflower_shot.png"));
    defender.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    defender.addComponent(new PositionComponent(x, y));
    defender.addComponent(new HealthComponent(100));
    defender.addComponent(new AnimationComponent(0, 0, 0, 20, 21525/21, 1025, 30));
    defender.addComponent(new CollisionComponent(2, false));
    defender.addComponent(new ShootComponent(true));
      //added shoot builder component
    defender.getComponent("ShootComponent").setShootNow(true).build()
  
    entityManager.add(defender);
    entities.set(defender.id, defender);
 
    console.log("Defender created at " + x + " " + y);
    observer.notify("Defender created at " + x + " " + y);
}

;
function createZombie(x, y) {
    
    const zombie = new Entity("Zombie");
    zombie.addComponent(new ContextComponent(ctx1));
    zombie.addComponent(new ImageComponent("assets/zombie.png"));
    zombie.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    zombie.addComponent(new PositionComponent(x, y));
    let randomSpeed = 0.5
    zombie.addComponent(new VelocityComponent(-randomSpeed, 0));
    let randomHealth = Math.floor(Math.random() * 500 + 100)
    zombie.addComponent(new HealthComponent(randomHealth));
    zombie.addComponent(new AnimationComponent(0, 0, 0, 7, 292, 410, 30));
    zombie.addComponent(new CollisionComponent(2, false));
    //added shoot builder component
    entityManager.add(zombie);
    entities.set(zombie.id, zombie);
    setZombies(1);
}

let canvasPosition = canvas.getBoundingClientRect();

const mouse = new Entity("Mouse");
mouse.addComponent(new PositionComponent(0, 0));
mouse.addComponent(new SizeComponent(0.1, 0.1));

canvas2.addEventListener('mousemove', function (e) {
    mouse.getComponent("PositionComponent").x = e.x - canvasPosition.left;
    mouse.getComponent("PositionComponent").y = e.y - canvasPosition.top;
});

canvas2.addEventListener('mouseleave', function () {
    mouse.getComponent("PositionComponent").x = undefined;
    mouse.getComponent("PositionComponent").y = undefined;
});

document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        observer.notify('Space key pressed');
    }
});
  

function handleGameStatus(gaOv) {
    ctx2.fillStyle = 'gold';
    ctx2.font = '30px Orbitron';
    ctx2.fillText('Score: ' + score, 200, 40);
    ctx2.fillText('Resources: ' + numberOfResources, 200, 80);
    if (gaOv) {
        ctx2.fillStyle = 'blue';
        ctx2.font = '90px Orbitron';
        ctx2.fillText('GAME OVER', 135, 330);
        ctx2.font = '45px Orbitron';
        ctx2.fillText('\n\nPress Space to Restart', 135, 430);
        gameOver = gaOv;
    }

    if (score >= winningScore) {
        ctx2.fillStyle = 'black';
        ctx2.font = '60px Orbitron';
        ctx2.fillText('LEVEL COMPLETE', 130, 300);
        ctx2.font = '30px Orbitron';
        ctx2.fillText('You won with ' + score + ' points!', 134, 340);
    }
}

const amounts = [20, 30, 40];


function handleResources() {
    if (frame % 500 === 0 && score < winningScore) {
        const resource = new Entity("Resource");
        resource.addComponent(new ContextComponent(ctx2));
        resource.addComponent(new SizeComponent(cellSize * 0.6, cellSize * 0.6));
        resource.addComponent(new PositionComponent(
        Math.random() * (canvas.width - cellSize), 

        (Math.floor(Math.random() * 5) + 1) * cellSize + 25));
        resource.addComponent(new CollisionComponent(1, false));
        resource.addComponent(new TextComponent(amounts[Math.floor(Math.random() * amounts.length)]));
        entityManager.add(resource);
        entities.set(resource.id, resource);
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
       else if(data === "Resource taken"){
       
       }
    }
});


canvas2.addEventListener('click', function() {
    const pos = mouse.getComponent("PositionComponent")
    const size = mouse.getComponent("SizeComponent")
    const gridPositionX = pos.x - (pos.x % cellSize) + cellGap;
    const gridPositionY = pos.y - (pos.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;

    // if(!MouseDefenderCollisionSystem(
    //     entities,
    //     pos.x,
    //     pos.y, 
    //     mouse.getComponent("SizeComponent").width,
    //     mouse.getComponent("SizeComponent").height
    // ))
 
    if(!MouseDefenderCollisionSystem(
        gridPositionX,
        gridPositionY, 
        size.width,
        size.height
    )) 
    {
        let defenderCost = 100;
        if (numberOfResources >= defenderCost) {
            createDefender(gridPositionX, gridPositionY);
            decResource(defenderCost);
        } else {
            floatingMessages.push(new FloatingMessage('Need more resources',
             pos.x, pos.y, 20, 'red'));
        }
    }else{
        floatingMessages.push(new FloatingMessage('Cell is occupied', pos.x, pos.y, 20, 'red'));
    }
});

canvas2.addEventListener('click', function() {
    const pos = mouse.getComponent("PositionComponent")
    const size = mouse.getComponent("SizeComponent")
    const choosedDefender = MouseChooseDefenderCollisionSystem(
        pos.x,
        pos.y, 
        size.width,
        size.height
    );
  
    if(choosedDefender) 
    {
        console.log(choosedDefender);
    }
});


function generateProceduralPath(numSteps) {
    const startPoint = { x: 0, y: 0 };
    const pathPoints = [startPoint];
    let x = 0
    let y = canvas.height / 2
    for (let i = 0; i < numSteps; i++) {
        const prevPoint = pathPoints[pathPoints.length - 1];
        const randomChoice =  (Math.floor(Math.random() * 2) + Math.floor(Math.random() * 2));
        if(randomChoice === 0 && Math.floor(Math.random()) === 0){
            x += 2
        }
        if(randomChoice === 0 && Math.floor(Math.random()) === 1){
            x -= 2
        }
        else if(randomChoice === 1 && Math.floor(Math.random()) === 0 && y < canvas.height - cellSize){
            y += 1
        }
        else if(randomChoice === 2 && Math.floor(Math.random()) === 1 && y + cellSize > 0){
            y -= 1
        }
        const nextPoint = {
            x: x,
            y: y,
        };
    
        pathPoints.push(nextPoint);
    }

    return pathPoints;
}

function drawPath(pathPoints) {
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
        cell.addComponent(new ContextComponent(ctx1));
        cell.addComponent(new PositionComponent(x, y));
        cell.addComponent(new CollisionComponent(1, false));
        entityManager.add(cell);
        entities.set(cell.id, cell);
    }
}


function resetGame(level) {
    if(gameOver){
        enemiesInterval = 800;
        score = 0;
        gameOver = false;
        setResource(300);
        entities.forEach(entity => {
            if(entity.name === "Defender" || entity.name === "Zombie" 
            || entity.name === "Projectile" || entity.name === "Resource"){
                entityManager.remove(entity);
                entities.delete(entity.id);
            }
        });
        setZombies(-numberOfZombies);
        entityManager.defenders.clear();
        entityManager.projectiles.clear();
        entityManager.zombies.clear();
        observer.notify("Game Reset");  
        requestAnimationFrame(animate);
    }
}
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};


// const generatedPath = generateProceduralPath(1500);
// drawPath(generatedPath);


function animate(currentTime) {

    frame++;
    delta_time = currentTime - previousTime;
    delta_time_multiplier = delta_time / frame_interval;  
    previousTime = currentTime;
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    ctx1.fillStyle = 'red';
    ctx1.fillRect(0, 0, controlsBar.width, controlsBar.height);
  
    if (frame % enemiesInterval === 0) {
       
        for (let i = 0; i < 1; i++) {
            let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
                createZombie(900, verticalPosition);
                setZombies(1);
        }
        // if (enemiesInterval > 20) enemiesInterval -= 10;
    }

    if (entityManager.resources.size > 0 && mouse.getComponent("PositionComponent").x && mouse.getComponent("PositionComponent").y){
        MouseResouceCollisionSystem(
            mouse.getComponent("PositionComponent").x,
            mouse.getComponent("PositionComponent").y, 
            mouse.getComponent("SizeComponent").width,
            mouse.getComponent("SizeComponent").height
        );
    }

    // if (entities.size > 0 && mouse.getComponent("PositionComponent").x && mouse.getComponent("PositionComponent").y){
    //     MouseResouceCollisionSystem(
    //         entities,
    //         mouse.getComponent("PositionComponent").x,
    //         mouse.getComponent("PositionComponent").y, 
    //         mouse.getComponent("SizeComponent").width,
    //         mouse.getComponent("SizeComponent").height
    //     );
    // }

    systems.forEach(system => {
        system(delta_time_multiplier, frame);
    });
 
   
    // GameSystem(entities, delta_time_multiplier, frame);
  
    handleFloatingMessages();
    handleGameStatus();
    handleResources();
    
    if(!gameOver){
        requestAnimationFrame(animate);
    }
}
requestAnimationFrame(animate);




window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});