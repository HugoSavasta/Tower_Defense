import {ctx1} from "../../utils.js";
import Entity from "../../Entity.js";
import PositionComponent from "../../components/PositionComponent.js";
import CollisionComponent from "../../components/CollisionComponent.js";
import SizeComponent from "../../components/SizeComponent.js";
import ContextComponent from "../../components/ContextComponent.js";
import VelocityComponent from "../../components/VelocityComponent.js";
import ProjectileComponent from "../../components/ProjectileComponent.js";
import {entityManager} from "../../EntityManager.js";

function ShootSystem(delta, frame) {
    if (entityManager.zombies.size === 0) return;
    let zombie = entityManager.zombies.entries().next().value[1];

    entityManager.defenders.forEach(entity => {           
        const animationComponent = entity.getComponent("AnimationComponent");
        if(frame % 30 === 0){
                const positionComponent = entity.getComponent("PositionComponent");
                const positionComponent2 = zombie.getComponent("PositionComponent");
                let directionX = positionComponent2.x - positionComponent.x;
                let directionY = positionComponent2.y - positionComponent.y;
            
                const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
                directionX /= magnitude;
                directionY /= magnitude;

                const projectile = new Entity("Projectile");
                projectile.addComponent(new ContextComponent(ctx1));               
                projectile.addComponent(new SizeComponent(1, 1));
                projectile.addComponent(new PositionComponent(positionComponent.x+50, 
                    positionComponent.y+50));
                projectile.addComponent(new CollisionComponent(3, false));
                const bulletVelocityX = directionX * 10;
                const bulletVelocityY = directionY * 10;
                projectile.addComponent(new VelocityComponent(bulletVelocityX, bulletVelocityY));
                projectile.addComponent(new ProjectileComponent());
                entityManager.add(projectile);
            }
    });
}



export default ShootSystem;