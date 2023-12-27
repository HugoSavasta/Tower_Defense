import {entityManager} from "../../scripts/EntityManager.js";


function ChooseDefenderRenderSystem (delta, frame) {
    entityManager.chooses.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const imageComponent = entity.getComponent("ImageComponent");
        const animationComponent = entity.getComponent("AnimationComponent");
        const costComponent = entity.getComponent("CostComponent");
                

        if (entity.name === "Choose_plant_1") {

            contextComponent.context.drawImage(imageComponent.image,
                0, 0, 334/2, 243, positionComponent.x, 0, 334 / 4, 243 / 3
            );    
        }
        else if (entity.name === "Choose_plant_2") {


            contextComponent.context.drawImage(imageComponent.image,
                0, 0, 21525/21, 1026, positionComponent.x, 15, 334 / 4, 243 / 3
            );     
        }
        else if (entity.name === "Choose_plant_3") {

            contextComponent.context.drawImage(imageComponent.image,
                0, 0, 761/2, 274, positionComponent.x, 0, 761 / 9, 274 / 3
            );   
        }
       
        contextComponent.context.strokeStyle = 'white';
        contextComponent.context.lineWidth = 2;
        contextComponent.context.fillStyle = 'black';
        contextComponent.context.font = '20px Orbitron';
        contextComponent.context.fillText(
            costComponent.cost,
            positionComponent.x+50, positionComponent.y+70);  
    });
}

export default ChooseDefenderRenderSystem;