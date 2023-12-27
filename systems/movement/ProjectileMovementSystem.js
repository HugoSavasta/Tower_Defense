import {entityManager} from "../../scripts/EntityManager.js";

function ProjectileMovementSystem(delta, frame) {
    entityManager.projectiles.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");
            const velocityComponent = entity.getComponent("VelocityComponent");
       
           if (projectileComponent && positionComponent && velocityComponent) {
                positionComponent.x += velocityComponent.x * delta;
                positionComponent.y += velocityComponent.y * delta;
                positionComponent.old_x = positionComponent.x;
                positionComponent.old_y = positionComponent.y;
            }
        });
    }

    

export default ProjectileMovementSystem;