import {entityManager} from "../../EntityManager.js";

function ProjectileZombieCollisionSystem(delta, frame) {
    entityManager.projectiles.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            entityManager.zombies.forEach(entity2 => {
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
            })
    });       
}

    


export default ProjectileZombieCollisionSystem;