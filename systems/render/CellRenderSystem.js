import {entityManager} from "../../EntityManager.js";

function CellRenderSystem (delta, frame) {
    entityManager.cells.forEach(entity => {

        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const sizeComponent = entity.getComponent("SizeComponent");

        contextComponent.context.strokeStyle = "black";
        contextComponent.context.lineWidth = 1;
        contextComponent.context.strokeRect(
            positionComponent.x, 
            positionComponent.y, 
            sizeComponent.width, 
            sizeComponent.height
        );
        
    });
}

export default CellRenderSystem;