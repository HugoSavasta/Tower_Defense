import {observer} from "../../scripts/Observable.js";
import { incResource, FloatingMessage } from "../../scripts/utils.js";
import { floatingMessages } from "../../scripts/constants.js";
import { entityManager } from "../../scripts/EntityManager.js";

function MouseResouceCollisionSystem(mouseX, mouseY, mouseWidth, mouseHeight) {

    entityManager.resources.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const textComponent = entity.getComponent("TextComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        if (collisionComponent === undefined || positionComponent === undefined || 
            sizeComponent === undefined || textComponent === undefined) return;
        if (!(
            positionComponent.x > mouseX + mouseWidth ||
            positionComponent.x + sizeComponent.width < mouseX ||
            positionComponent.y > mouseY + mouseHeight ||
            positionComponent.y + sizeComponent.height < mouseY
         ))
        {
            observer.notify("Recource taken");
            entityManager.remove(entity);
            floatingMessages.push(new FloatingMessage('+' + textComponent.text,
            positionComponent.x, positionComponent.y, 
            30, 'green'));
            incResource(parseInt(textComponent.text));
        }
    });
}


export default MouseResouceCollisionSystem;