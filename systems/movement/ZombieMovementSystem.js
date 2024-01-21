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
        const orientationComponent = entity.getComponent("OrientationComponent");
        let vx = undefined;
        let vy = undefined;
        let oldX = velocityComponent.x;
        let oldY = velocityComponent.y;

        if (tank && tank.getComponent("DammageComponent") && tank.getComponent("DammageComponent").dammage === 15 && collisionComponent && !collisionComponent.collide){
            const tankPositionComponent = tank.getComponent("PositionComponent");
            if (positionComponent && velocityComponent) {
                const dx = tankPositionComponent.x - positionComponent.x;
                const dy = tankPositionComponent.y - positionComponent.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                vx = dx / distance;
                vy = dy / distance;
            }
        }else{
            velocityComponent.x = oldX;
            velocityComponent.y = oldY;
        }

        if( vx && vy  && positionComponent){
            positionComponent.x += vx * delta;
            positionComponent.y += vy * delta;
        }else{
            if (positionComponent && velocityComponent) {
                positionComponent.x += velocityComponent.x * delta;
                positionComponent.y += velocityComponent.y * delta;
            }
        }
        if(tank){
            const tankPositionComponent = tank.getComponent("PositionComponent");
            if(orientationComponent && tankPositionComponent){
                
                if(vx && vy){
                    if(vx >= 0 && tankPositionComponent.x > positionComponent.x){
                        orientationComponent.x = 1;
                    }
                    else if(vx <= -1){
                        orientationComponent.x = -1;
                    }
                }else{
                    if(velocityComponent.x >= 0 && tankPositionComponent.x > positionComponent.x){
                        orientationComponent.x = 1;
                    }
                    else if(velocityComponent.x <= -1){
                        orientationComponent.x = -1;
                    }
                }
            }
        }else{
            if(orientationComponent){
                if(velocityComponent.x >= 0){
                    orientationComponent.x = 1;
                }
                else if(velocityComponent.x <= -1){
                    orientationComponent.x = -1;
                }
            }
        }
       
    });
}

    
export default ZombieMovementSystem;