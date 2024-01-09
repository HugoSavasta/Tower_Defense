import {entityManager} from "../../scripts/EntityManager.js";
import {ctx} from "../../scripts/utils.js";

class CanvasContextFactory {
    constructor(context) {
        this.context = context;
    }

    createDrawImageFunction() {
        return (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
            this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        };
    }
}

const factory = new CanvasContextFactory(ctx);
const contextDrawImageFactory = factory.createDrawImageFunction();

function ChooseDefenderRenderSystem (delta, frame) {
    entityManager.chooses.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const imageComponent = entity.getComponent("ImageComponent");
        const costComponent = entity.getComponent("CostComponent");
            
        if (positionComponent === undefined || contextComponent === undefined || 
            imageComponent === undefined || costComponent === undefined) return;

   
        if (entity.name === "Choose_plant_1") {
            contextDrawImageFactory(imageComponent.image,
                0, 0, 334/2, 243, positionComponent.x, 0, 334 / 4, 243 / 3)
        }
        else if (entity.name === "Choose_plant_2") {
            contextDrawImageFactory(imageComponent.image,
                0, 0, 700, 1026, positionComponent.x, 3, 400 / 4, 300 / 3)  
        }
        else if (entity.name === "Choose_plant_3") {
            contextDrawImageFactory(imageComponent.image,
                0, 0, 700/2, 274, positionComponent.x, 0, 761 / 9, 243 / 3)
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