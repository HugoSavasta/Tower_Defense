import {entityManager} from "../../EntityManager.js";

function ZombieBoundaryCollisionSystem (delta, frame) {
    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        entityManager.defenders.forEach(entity2 => {
                const healthComponent2 = entity2.getComponent("HealthComponent");
                const positionComponent2 = entity2.getComponent("PositionComponent");
                const sizeComponent2 = entity2.getComponent("SizeComponent");
                if (
                    positionComponent2.x < positionComponent.x + sizeComponent.width &&
                    positionComponent2.x + sizeComponent2.width > positionComponent.x &&
                    positionComponent.y < positionComponent2.y + sizeComponent2.height &&
                    positionComponent.y + sizeComponent.height > positionComponent2.y
                  ){
                    if(healthComponent2.health <= 0){
                        entityManager.remove(entity2);
                    }
                    healthComponent2.health -= 0.5;
                    if(healthComponent2.health >= 0){
                        velocityComponent.x = 0;
                        velocityComponent.y = 0;
                    }
                }
        });
    });
}


export default ZombieBoundaryCollisionSystem;