import {entityManager} from "../../scripts/EntityManager.js";

function ResourceRenderSystem (delta, frame) {
    entityManager.resources.forEach(entity => {

        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const text = entity.getComponent("TextComponent");
        if (positionComponent === undefined || contextComponent === undefined || sizeComponent === undefined || text === undefined) return;
        contextComponent.context.fillStyle = 'yellow';
        contextComponent.context.fillRect(positionComponent.x, positionComponent.y, 
            sizeComponent.width, sizeComponent.height);
        contextComponent.context.fillStyle = 'black';
        contextComponent.context.font = '20px Orbitron';
        contextComponent.context.fillText(text.text, positionComponent.x + 15,
             positionComponent.y + 30);
    
   
    });
}

export default ResourceRenderSystem;