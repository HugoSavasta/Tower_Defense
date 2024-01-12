import {entityManager} from "../../scripts/EntityManager.js";
import {floatingMessages} from "../../scripts/constants.js";
import { FloatingMessage} from "../../scripts/utils.js";
function ZombieDefenderCollisionSystem () {

    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        const dammageComponent = entity.getComponent("DammageComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        if (collisionComponent === undefined || positionComponent === undefined 
            || sizeComponent === undefined) return;
        entityManager.defenders.forEach(entity2 => {
                const healthComponent2 = entity2.getComponent("HealthComponent");
                const positionComponent2 = entity2.getComponent("PositionComponent");
                const sizeComponent2 = entity2.getComponent("SizeComponent");
                const collisionComponent2 = entity2.getComponent("CollisionComponent");
                if (collisionComponent2 === undefined || positionComponent2 === undefined || sizeComponent2 === undefined) return;
             
                if (
                    positionComponent2.x < positionComponent.x + sizeComponent.width &&
                    positionComponent2.x + sizeComponent2.width > positionComponent.x &&
                    positionComponent.y < positionComponent2.y + sizeComponent2.height &&
                    positionComponent.y + sizeComponent.height > positionComponent2.y
                  ){
                    if(healthComponent2 === undefined) {
                        velocityComponent.x = 0;
                        velocityComponent.y = 0;
                        return;
                    }
                    if(healthComponent2.health >= 0){
                        velocityComponent.x = 0;
                        velocityComponent.y = 0;
                    }
                    if(dammageComponent === undefined) return;
                    let dammage = 0.01 * dammageComponent.dammage;
                    healthComponent2.health -= dammage
                }
        });

    });
}


export default ZombieDefenderCollisionSystem;