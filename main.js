import {ctx, canvas} from "./scripts/utils.js";
import { gamePublisher, Observer } from "./scripts/Observable.js";
import {cellSize, cellGap, frame_interval, floatingMessages} from "./scripts/constants.js";
import { score, won, setWon, level, incLevel, gameOver, enemiesInterval, decEnemiesInterval,  
    incResource, decResource, numberOfResources, FloatingMessage,
   resetGame, handleFloatingMessages, handleGameStatus, mouse, mouseleave, mousemove } from "./scripts/utils.js";

import Entity from "./scripts/Entity.js";
import {entityManager} from "./scripts/EntityManager.js";

//components
import DammageComponent from "./components/DammageComponent.js";
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
import CostComponent from "./components/CostComponent.js";
import SoundComponent from "./components/SoundComponent.js";

//collisions system

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
import ChooseDefenderBoarderRenderSystem from "./systems/render/ChooseDefenderBoarderRenderSystem.js";

// behaviour system
import ShootSystem from "./systems/behaviors/ShootSystem.js";
import ZombieLifeSystem from "./systems/behaviors/ZombieLifeSystem.js";
import DefenderLifeSystem from "./systems/behaviors/DefenderLifeSystem.js";
import ZombieSoundSystem from "./systems/behaviors/ZombieSoundSystem.js";
import OrientationComponent from "./components/OrientationComponent.js";
import ChooseShovelRenderSystem from "./systems/render/ChooseShovelRenderSystem.js";


const systems = [
    ProjectileBoundaryCollisionSystem,
    ZombieProjectileCollisionSystem,
    ZombieBoundaryCollisionSystem,
    ZombieDefenderCollisionSystem,
    ProjectileMovementSystem,
    ZombieMovementSystem,
    CellRenderSystem,
    ChooseDefenderRenderSystem,
    ChooseShovelRenderSystem,
    DefenderRenderSystem,
    ProjectileRenderSystem,
    ResourceRenderSystem,
    ZombieRenderSystem,
    ShootSystem,
    ZombieLifeSystem,
    DefenderLifeSystem,
    ZombieSoundSystem,
];









let frame = 0
let previousTime = performance.now();

let delta_time_multiplier = 1;
let delta_time = 0;

const plant_img = new ImageComponent("assets/plant.png")
const plant2_img = new ImageComponent("assets/sunflower_shot.png")
const plant3_img = new ImageComponent("assets/plant3.png")
const shovel_img = new ImageComponent("assets/Shovel.png")

const plant = new Entity("Choose_plant_1");
plant.addComponent(new ContextComponent(ctx));
plant.addComponent(plant_img);
plant.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
plant.addComponent(new PositionComponent(0, 0));
plant.addComponent(new CostComponent(100));
plant.addComponent(new CollisionComponent());
entityManager.add(plant);


const plant2 = new Entity("Choose_plant_2");
plant2.addComponent(new ContextComponent(ctx));
plant2.addComponent(new CollisionComponent());
plant2.addComponent(plant2_img);
plant2.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
plant2.addComponent(new PositionComponent(100, 0));
plant2.addComponent(new CostComponent(200));
entityManager.add(plant2);

const plant3 = new Entity("Choose_plant_3");
plant3.addComponent(new ContextComponent(ctx));
plant3.addComponent(plant3_img);
plant3.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
plant3.addComponent(new PositionComponent(200, 0));
plant3.addComponent(new CostComponent(300));
plant3.addComponent(new CollisionComponent());
entityManager.add(plant3);

const shovel = new Entity("Choose_shovel");
shovel.addComponent(new ContextComponent(ctx));
shovel.addComponent(shovel_img);
shovel.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
shovel.addComponent(new PositionComponent(300, 0));
shovel.addComponent(new CollisionComponent());
entityManager.add(shovel);




function createDefender(type, x, y) {

    if(entityManager.defenders.size === 0) {
        
        gamePublisher.subscribe(new Observer("game"));
        gamePublisher.notifyObservers({ message: "Level started!" });

    }

    const defender = new Entity("Defender");


    if(type === 0){
        defender.addComponent(plant_img);
        defender.addComponent(new AnimationComponent(0, 0, 0, 1, 167, 243, 60));
        defender.addComponent(new DammageComponent(25));
        defender.addComponent(new ShootComponent(true));
        if(defender.getComponent("ShootComponent")){
            defender.getComponent("ShootComponent").setShootNow(true).setShootDelay(210).build();
        }
        defender.addComponent(new HealthComponent(200));
        defender.addComponent(new CostComponent(100));
    }
    else  if(type === 1){
        defender.addComponent(plant2_img);
        defender.addComponent(new AnimationComponent(0, 0, 0, 2, 690, 800, 60));
        defender.addComponent(new DammageComponent(35));
        defender.addComponent(new ShootComponent(true));
        if(defender.getComponent("ShootComponent")){
            defender.getComponent("ShootComponent").setShootNow(true).setShootDelay(200).build();
        }
        defender.addComponent(new HealthComponent(100));
        defender.addComponent(new CostComponent(200));
    }
    else if(type === 2){
        defender.addComponent(plant3_img);
        defender.addComponent(new AnimationComponent(0, 0, 0, 1, 735/2, 277, 60));
        defender.addComponent(new DammageComponent(15));
        defender.addComponent(new ShootComponent(true));
        if(defender.getComponent("ShootComponent")){
            defender.getComponent("ShootComponent").setShootNow(true).setShootDelay(190).build();
        }
        defender.addComponent(new HealthComponent(500));
        defender.addComponent(new CostComponent(300));
    }
      
  
    defender.addComponent(new ContextComponent(ctx));
    defender.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    defender.addComponent(new PositionComponent(x, y));
    
    defender.addComponent(new CollisionComponent(2, false));
    
    entityManager.add(defender);


}

let choosedDefender = [];

function createZombie(x, y) {
    const zombie = new Entity("Zombie");

    zombie.addComponent(new ContextComponent(ctx));
    if(Math.random() > 0.5){
        zombie.addComponent(new ImageComponent("assets/zombie.png"));
        zombie.addComponent(new DammageComponent(10));
    }else{
        zombie.addComponent(new ImageComponent("assets/zombie2.png"));
        zombie.addComponent(new DammageComponent(20));
    }


    zombie.addComponent(new AnimationComponent(0, 0, 0, 7, 292, 410, 30));

    zombie.addComponent(new SizeComponent(cellSize - cellGap * 2, cellSize - cellGap * 2));
    zombie.addComponent(new PositionComponent(x, y));
    let randomSpeed = Math.random() * 1.1 + 1;
    zombie.addComponent(new VelocityComponent(-randomSpeed, 0));
    zombie.addComponent(new OrientationComponent(-1, 1));
    zombie.addComponent(new HealthComponent(100));
   
    zombie.addComponent(new CollisionComponent(2, false));
    

    //added shoot builder component
    entityManager.add(zombie);
    if (entityManager.zombies_sound.size <= 10){
        const zombieSound = new Entity("ZombieSound");
        zombieSound.addComponent(new SoundComponent("./sounds/Horde.mp3"));
        entityManager.add(zombieSound);
    }
}







mousemove.start();
mouseleave.start();



document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        if( gameOver ){
            resetGame();
            choosedDefender = [];
        }
    }
});
  


const amounts = [40, 50, 60];


function handleResources() {
    if (frame % 400 === 0 && !won) {
        const resource = new Entity("Resource");
        resource.addComponent(new ContextComponent(ctx));
        resource.addComponent(new SizeComponent(cellSize * 0.6, cellSize * 0.6));
        resource.addComponent(new PositionComponent(
        Math.random() * (canvas.width - cellSize), 
        (Math.floor(Math.random() * 5) + 1) * cellSize + 25));
        resource.addComponent(new CollisionComponent(1, false));
        resource.addComponent(new TextComponent(amounts[Math.floor(Math.random() * amounts.length)]));
        entityManager.add(resource);
 
    }        
}



canvas.addEventListener('click', function() {
   
    const pos = mouse.getComponent("PositionComponent")
    const size = mouse.getComponent("SizeComponent")


    const selectedDefender = MouseChooseDefenderCollisionSystem(
        pos.x,
        pos.y, 
        size.width,
        size.height
    );

    if(selectedDefender !== null){
        if(choosedDefender.length > 0){
            if(choosedDefender[0].name !== selectedDefender.name){
                choosedDefender[0] = selectedDefender;
            }
        }else{
            choosedDefender.push(selectedDefender);
        }
    }
 
    const gridPositionX = pos.x - (pos.x % cellSize) + cellGap;
    const gridPositionY = pos.y - (pos.y % cellSize) + cellGap;
    if(gridPositionX === undefined || gridPositionY === undefined) return;
    if(gridPositionY < cellSize) return;
    const collidedEntity = MouseDefenderCollisionSystem(
        gridPositionX,
        gridPositionY, 
        size.width,
        size.height
    )
    if(!collidedEntity) 
    {

   
        let defenderCost = 100;

       if (numberOfResources >= defenderCost) {
            const pos = mouse.getComponent("PositionComponent")
            
            if(choosedDefender.length === 0){
                floatingMessages.push(new FloatingMessage('Please choose defender',
                pos.x, pos.y, 20, 'red'));
                return;
            }
            const CostComponent = choosedDefender[0].getComponent("CostComponent");
            if(choosedDefender[0].name === "Choose_plant_1"){
                if (CostComponent.cost <= numberOfResources){
                    createDefender(0, gridPositionX, gridPositionY);
                    decResource(CostComponent.cost);
                }else{
                    floatingMessages.push(new FloatingMessage('Need more resources',
                    pos.x, pos.y, 20, 'red'));
                }
              
            }else  if(choosedDefender[0].name === "Choose_plant_2"){
                if (CostComponent.cost <= numberOfResources){
                    createDefender(1, gridPositionX, gridPositionY);
                    decResource(CostComponent.cost);
                }else{
                    floatingMessages.push(new FloatingMessage('Need more resources',
                    pos.x, pos.y, 20, 'red'));
                }
            }else  if(choosedDefender[0].name === "Choose_plant_3"){
                if (CostComponent.cost <= numberOfResources){
                    createDefender(2, gridPositionX, gridPositionY);
                    decResource(CostComponent.cost);
                }else{
                    floatingMessages.push(new FloatingMessage('Need more resources',
                    pos.x, pos.y, 20, 'red'));
                }
            }

        } else {
            floatingMessages.push(new FloatingMessage('Need more resources',
             pos.x, pos.y, 20, 'red'));
        }
    }else  {
        if(choosedDefender.length === 0){
            floatingMessages.push(new FloatingMessage('Please choose defender',
            pos.x, pos.y, 20, 'red'));
            return;
        }
        if(choosedDefender[0].name === "Choose_shovel" && collidedEntity){
            const costComponent = collidedEntity.getComponent("CostComponent");
            const positionComponent = collidedEntity.getComponent("PositionComponent");
            if((numberOfResources - costComponent.cost / 50) >= 100){
           
             
                floatingMessages.push(new FloatingMessage('+' + costComponent.cost/2,
                positionComponent.x, positionComponent.y, 
                30, 'green'));
                incResource(parseInt(costComponent.cost/2));
                entityManager.remove(collidedEntity);
            }else{
                floatingMessages.push(new FloatingMessage('You cannot remove it!', pos.x, pos.y, 20, 'red'));
            }

        }else{
            floatingMessages.push(new FloatingMessage('Cell is occupied!', pos.x, pos.y, 20, 'red'));
        }

    }
});




for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
        const cell = new Entity("Cell")
        cell.addComponent(new SizeComponent(cellSize - cellGap * 1, cellSize - cellGap * 1));
        cell.addComponent(new ContextComponent(ctx));
        cell.addComponent(new PositionComponent(x, y));
        cell.addComponent(new CollisionComponent(1, false));
        entityManager.add(cell);
    }
}



function animate(currentTime) {

    frame++;
    delta_time = currentTime - previousTime;
    delta_time_multiplier = delta_time / frame_interval;  
    previousTime = currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

 
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, cellSize)
   
  
    if(choosedDefender.length > 0) 
    {
        ChooseDefenderBoarderRenderSystem(choosedDefender[0]);
    }

    if (frame % enemiesInterval === 0 && entityManager.defenders.size > 0 
        && enemiesInterval > 0) {
       for (let i = 0; i < level; i++) {
        let verticalPosition = Math.floor(Math.random() * 5) * cellSize+cellSize + cellGap;
        createZombie(850 - Math.floor(Math.random() * 5), verticalPosition);
       }
       decEnemiesInterval(50);
    }

    if (!won && !gameOver && score > 1 && enemiesInterval <= 0 && entityManager.zombies.size === 0){
        setWon(true);
        incLevel(1);
    }
    const pos = mouse.getComponent("PositionComponent");
    if (entityManager.resources.size > 0 && pos.x && pos.y){
        MouseResouceCollisionSystem(
            pos.x,
            pos.y, 
            mouse.getComponent("SizeComponent").width,
            mouse.getComponent("SizeComponent").height
        );
    }

    systems.forEach(system => {
        system(delta_time_multiplier, frame);
    });
 
   
  
    handleGameStatus(false);

    if (entityManager.defenders.size > 0){
        handleResources();
    }
    handleFloatingMessages();

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);