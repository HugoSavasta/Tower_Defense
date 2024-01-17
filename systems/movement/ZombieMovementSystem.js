import {entityManager} from "../../scripts/EntityManager.js";
function ZombieMovementSystem (delta, frame) {
    let tank = undefined;
    if(entityManager.defenders.size > 0){
        entityManager.defenders.forEach((value, key) => {
            if(value.getComponent("DammageComponent") && value.getComponent("DammageComponent").dammage === 15){
                tank = value;
            }
            return;
        });
    }
 
    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        let vx = undefined;
        let vy = undefined;
        if (tank && tank.getComponent("DammageComponent") && tank.getComponent("DammageComponent").dammage === 15 && collisionComponent && !collisionComponent.collide){
            const tankPositionComponent = tank.getComponent("PositionComponent");
            if (positionComponent && velocityComponent) {
                const dx = tankPositionComponent.x - positionComponent.x;
                const dy = tankPositionComponent.y - positionComponent.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                vx = dx / distance;
                vy = dy / distance;
            }
        }
        if( vx && vy ){
            positionComponent.x += vx * delta;
            positionComponent.y += vy * delta;
        }
        else if (positionComponent && velocityComponent) {
            positionComponent.x += velocityComponent.x * delta;
            positionComponent.y += velocityComponent.y * delta;
        }

    });
}

    
export default ZombieMovementSystem;