import {entityManager} from "../../scripts/EntityManager.js";
import {ctx} from "../../scripts/utils.js";

class CanvasContext {
    constructor(context) {
        this.context = context;
        if (CanvasContext.instance) {
            return CanvasContext.instance;
          }
          CanvasContext.instance = this;
    }

    createDrawImageFunction() {
        return (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
            this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        };
    }
}

const img_class = new CanvasContext(ctx);
const contextDrawImage = img_class.createDrawImageFunction();

function ChooseShovelRenderSystem (delta, frame) {
    entityManager.chooses.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const imageComponent = entity.getComponent("ImageComponent");
     
            
        if (positionComponent === undefined || contextComponent === undefined || 
            imageComponent === undefined) return;

   
        if (entity.name === "Choose_shovel") {
            contextDrawImage(imageComponent.image,
                0, 0, 300, 300, positionComponent.x, 0, 260 / 2, 243 / 3)
        }
       
        // contextComponent.context.strokeStyle = 'white';
        // contextComponent.context.lineWidth = 2;
        // contextComponent.context.fillStyle = 'black';
        // contextComponent.context.font = '20px Orbitron';
        // contextComponent.context.fillText(
        //     costComponent.cost,
        //     positionComponent.x+50, positionComponent.y+70);  
    });
}

export default ChooseShovelRenderSystem;