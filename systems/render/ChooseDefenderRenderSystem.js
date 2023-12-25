import {entityManager} from "../../EntityManager.js";

function ChooseDefenderRenderSystem (delta, frame) {
    entityManager.chooses.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const imageComponent = entity.getComponent("ImageComponent");

        if (entity.name === "Choose_plant_1") {
                
            contextComponent.context.lineWidth = 1;
            contextComponent.context.fillRect(
                positionComponent.x, 
                positionComponent.y, 
                sizeComponent.width, sizeComponent.height);   

                contextComponent.context.drawImage(imageComponent.image,
                    0, 0, 170, 243, 15, 15, 170 / 3, 243 / 4);   
        }
        else if (entity.name === "Choose_plant_2") {
            contextComponent.context.lineWidth = 1;
            contextComponent.context.fillRect(
                positionComponent.x, 
                positionComponent.y, 
                sizeComponent.width, sizeComponent.height);   

                contextComponent.context.drawImage(imageComponent.image,
                    0, 0, 334, 243, 15, 15, 334 / 3, 243 / 4);   
        }
    });
}

export default ChooseDefenderRenderSystem;