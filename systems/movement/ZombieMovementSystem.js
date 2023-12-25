import {entityManager} from "../../EntityManager.js";
function ZombieMovementSystem (delta, frame) {

    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        if (positionComponent && velocityComponent) {
            positionComponent.x += velocityComponent.x * delta;
            positionComponent.y += velocityComponent.y * delta;
        }
    });
}

    
export default ZombieMovementSystem;