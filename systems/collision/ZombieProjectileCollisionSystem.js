import {entityManager} from "../../EntityManager.js";

function ZombieProjectileCollisionSystem(delta, frame) {

    entityManager.zombies.forEach(entity2 => {
        entityManager.projectiles.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            let healthComponent = entity2.getComponent("HealthComponent");
            let positionComponent2 = entity2.getComponent("PositionComponent");
            let sizeComponent2 = entity2.getComponent("SizeComponent");
            if (!(
                positionComponent2.x > positionComponent.x + sizeComponent.width ||
                positionComponent2.x + sizeComponent2.width < positionComponent.x ||
                positionComponent2.y > positionComponent.y + sizeComponent.height ||
                positionComponent2.y + sizeComponent2.height < positionComponent.y
              )){
                healthComponent.health -= 15;
                entityManager.remove(entity);
            } 
        });   
    })      
}

    


export default ZombieProjectileCollisionSystem;