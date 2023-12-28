import {entityManager} from "../../scripts/EntityManager.js";
import { canvas } from "../../scripts/utils.js";
function ProjectileBoundaryCollisionSystem() {
    entityManager.projectiles.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            if (positionComponent === undefined || collisionComponent === undefined || sizeComponent === undefined) return;
            if (
                positionComponent.x + sizeComponent.width > canvas.width ||
                positionComponent.x + sizeComponent.width < -1 ||
                positionComponent.y < 0 || 
                positionComponent.y + sizeComponent.height > canvas.height
            ) {
                entityManager.remove(entity);   
            }  
    });
}

    


export default ProjectileBoundaryCollisionSystem;