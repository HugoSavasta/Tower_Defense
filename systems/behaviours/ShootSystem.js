import {ctx} from "../../scripts/utils.js";
import Entity from "../../scripts/Entity.js";
import PositionComponent from "../../components/PositionComponent.js";
import CollisionComponent from "../../components/CollisionComponent.js";
import SizeComponent from "../../components/SizeComponent.js";
import ContextComponent from "../../components/ContextComponent.js";
import VelocityComponent from "../../components/VelocityComponent.js";
import ProjectileComponent from "../../components/ProjectileComponent.js";
import DammageComponent from "../../components/DammageComponent.js";
import {entityManager} from "../../scripts/EntityManager.js";

function ShootSystem(delta, frame) {
    if (entityManager.zombies.size === 0) return;
    const zombie = entityManager.zombies.entries().next().value[1];
    const zombies = Array.from(entityManager.zombies.values()); // convert values to an array
    const randomZombie = zombies[Math.floor(Math.random() * zombies.length)]; // select a random index
    if(randomZombie === undefined || zombie === undefined) return;
    
    entityManager.defenders.forEach(entity => {   
        const shootComponent = entity.getComponent("ShootComponent");
        const dammageComponent = entity.getComponent("DammageComponent");
        if(shootComponent === undefined) return;        
        if(frame % (100 - shootComponent.shootDelay) === 0){
                let positionComponent2; 
                             
                if(dammageComponent.dammage >= 20){
                    positionComponent2 = randomZombie.getComponent("PositionComponent")
                }else if(dammageComponent.dammage >= 15){
                    positionComponent2 = randomZombie.getComponent("PositionComponent")
                }else{
                    positionComponent2 = zombie.getComponent("PositionComponent")
                }
                const positionComponent = entity.getComponent("PositionComponent");
                //const positionComponent2 = Math.random() > 0.5 ? zombie.getComponent("PositionComponent") : randomZombie.getComponent("PositionComponent"); 
                                                            
             
                let directionX = positionComponent2.x - positionComponent.x;
                let directionY = positionComponent2.y - positionComponent.y;
            
                const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
                directionX /= magnitude;
                directionY /= magnitude;

                const projectile = new Entity("Projectile");
                projectile.addComponent(new DammageComponent(dammageComponent.dammage));
                projectile.addComponent(new ContextComponent(ctx));               
                projectile.addComponent(new SizeComponent(1, 1));
                projectile.addComponent(new PositionComponent(positionComponent.x+50, 
                    positionComponent.y+50));
                projectile.addComponent(new CollisionComponent(3, false));
                let bulletVelocityX = directionX;
                let bulletVelocityY = directionY;
                let type = 0;

                if(dammageComponent.dammage >= 20){
                    type = 1;
                    bulletVelocityX *= 100 * delta;
                    bulletVelocityY *= 100 * delta;
                }else if(dammageComponent.dammage >= 15){
                    type = 2;
                    bulletVelocityX *= 15 * delta;
                    bulletVelocityY *= 15 * delta;
                }else{
                    type = 0;
                    bulletVelocityX *= 20 * delta;
                    bulletVelocityY *= 20 * delta;
                }
                projectile.addComponent(new VelocityComponent(bulletVelocityX, bulletVelocityY));
                projectile.addComponent(new ProjectileComponent(type));
                entityManager.add(projectile);
            }
    });
}



export default ShootSystem;