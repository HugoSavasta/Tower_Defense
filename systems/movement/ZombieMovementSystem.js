import {entityManager} from "../../scripts/EntityManager.js";
function ZombieMovementSystem (delta, frame) {
    let tank = undefined;
    if(entityManager.defenders.size > 0){
        tank = entityManager.defenders.entries().next().value[1];
    }
 
    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        if (tank && tank.getComponent("DammageComponent") && tank.getComponent("DammageComponent").dammage === 15){
            const tankPositionComponent = tank.getComponent("PositionComponent");
            if (positionComponent && velocityComponent) {
                const dx = tankPositionComponent.x - positionComponent.x;
                const dy = tankPositionComponent.y - positionComponent.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                velocityComponent.x = dx / distance;
                velocityComponent.y = dy / distance;
            }
        }
        if (positionComponent && velocityComponent) {
            positionComponent.x += velocityComponent.x * delta;
            positionComponent.y += velocityComponent.y * delta;
        }
    });
}

    
export default ZombieMovementSystem;