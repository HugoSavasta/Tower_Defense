import {entityManager} from "../../scripts/EntityManager.js";

function DefenderRenderSystem (delta, frame) {
    entityManager.defenders.forEach(entity => {

        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const animationComponent = entity.getComponent("AnimationComponent");
        const healthComponent = entity.getComponent("HealthComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const imageComponent = entity.getComponent("ImageComponent");
        if (positionComponent === undefined || contextComponent === undefined || animationComponent === undefined || healthComponent === undefined || sizeComponent === undefined || imageComponent === undefined) return;
        contextComponent.context.fillStyle = 'gold';
        contextComponent.context.font = '30px Orbitron';
 
        contextComponent.context.fillText(
            Math.floor(healthComponent.health),
            positionComponent.x + 15, positionComponent.y - 10);
          
        contextComponent.context.drawImage(imageComponent.image, 
            animationComponent.frameX * animationComponent.spriteWidth,
            0, 
            animationComponent.spriteWidth, 
            animationComponent.spriteHeight, 
            positionComponent.x,
             positionComponent.y, 
             sizeComponent.width, 
             sizeComponent.height);
    
        if (frame % (100 - animationComponent.frameSpeed ) === 0) { // change the number for more or less speed
            if (animationComponent.frameX < animationComponent.maxFrame) {
                animationComponent.frameX++;
            }
            else animationComponent.frameX = animationComponent.minFrame;
        }
    });
}

export default DefenderRenderSystem;