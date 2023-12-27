import {entityManager} from "../../scripts/EntityManager.js";

function MouseDefenderCollisionSystem(mouseX, mouseY, mouseWidth, mouseHeight) {
    let collided = false;
    entityManager.defenders.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
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

// function MouseDefenderCollisionSystem(entities, mouseX, mouseY, mouseWidth, mouseHeight) {

//     entities.forEach(entity => {
//         if(entity.name !== "Defender") return;
//         const positionComponent = entity.getComponent("PositionComponent");
//         const sizeComponent = entity.getComponent("SizeComponent");
        
//         if (!(
//             positionComponent.x > mouseX + mouseWidth ||
//             positionComponent.x + sizeComponent.width < mouseX ||
//             positionComponent.y > mouseY + mouseHeight ||
//             positionComponent.y + sizeComponent.height < mouseY
//          )
//         ) {
//         return true;
//     }
//     });
//     return false;
// }
export default MouseDefenderCollisionSystem;