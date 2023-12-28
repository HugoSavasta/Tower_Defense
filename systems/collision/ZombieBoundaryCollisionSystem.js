import { observer } from "../../scripts/Observable.js";
import {entityManager} from "../../scripts/EntityManager.js";

function ZombieBoundaryCollisionSystem () {
    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        if (collisionComponent === undefined && positionComponent === undefined || sizeComponent === undefined) return;
        if(velocityComponent.x === 0){
            velocityComponent.x = velocityComponent.old_x;
        }
        if ((
                    positionComponent.x + sizeComponent.width < 80
            )
            ) {
                observer.notify("Game Over");
            }
        });
}

export default ZombieBoundaryCollisionSystem;