import {entityManager} from "../../scripts/EntityManager.js";

function ProjectileBoundaryCollisionSystem(delta, frame) {
    entityManager.projectiles.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            if (collisionComponent && sizeComponent) {
                if (
                        positionComponent.x + sizeComponent.width > 900 ||
                        positionComponent.y < 0 || 
                        positionComponent.y + sizeComponent.height > 700
                    ) {
                        entityManager.remove(entity);   
                }         
            }
    });
}

    


export default ProjectileBoundaryCollisionSystem;