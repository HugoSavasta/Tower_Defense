import {entityManager} from "../../scripts/EntityManager.js";

function ZombieProjectileCollisionSystem(delta, frame) {

    entityManager.zombies.forEach(entity2 => {
        const healthComponent2 = entity2.getComponent("HealthComponent");
        const positionComponent2 = entity2.getComponent("PositionComponent");
        const sizeComponent2 = entity2.getComponent("SizeComponent");
        const collisionComponent2 = entity2.getComponent("CollisionComponent");
    

        if (collisionComponent2 === undefined || positionComponent2 === undefined
             || sizeComponent2 === undefined ) return;
        entityManager.projectiles.forEach(entity => {
    
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const dammageComponent = entity.getComponent("DammageComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
    
            if (collisionComponent === undefined || positionComponent === undefined 
                || sizeComponent === undefined || dammageComponent === undefined) return;
            if (!(
                positionComponent2.x > positionComponent.x + sizeComponent.width ||
                positionComponent2.x + sizeComponent2.width < positionComponent.x ||
                positionComponent2.y > positionComponent.y + sizeComponent.height ||
                positionComponent2.y + sizeComponent2.height < positionComponent.y
              )){
                entityManager.remove(entity);
                if (healthComponent2 === undefined) return;
                healthComponent2.health -= dammageComponent.dammage;
             
            } 
        });   
    })      
}

    


export default ZombieProjectileCollisionSystem;