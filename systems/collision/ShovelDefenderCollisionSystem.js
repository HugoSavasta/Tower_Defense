import {entityManager} from "../../scripts/EntityManager.js";
import { incResource, FloatingMessage } from "../../scripts/utils.js";
import { floatingMessages } from "../../scripts/constants.js";

function ShovelDefenderCollisionSystem(mouseX, mouseY, mouseWidth, mouseHeight) {
    let collided = false;
    entityManager.defenders.forEach(entity => {
        const collisionComponent = entity.getComponent("CollisionComponent");
        const positionComponent = entity.getComponent("PositionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        
        if (collisionComponent === undefined || positionComponent === undefined ||
             sizeComponent === undefined) return;
        if (!(
            positionComponent.x > mouseX + mouseWidth ||
            positionComponent.x + sizeComponent.width < mouseX ||
            positionComponent.y > mouseY + mouseHeight ||
            positionComponent.y + sizeComponent.height < mouseY
         )
        ) {
        collided = true;
    }
    });
    return collided;
}

export default ShovelDefenderCollisionSystem;