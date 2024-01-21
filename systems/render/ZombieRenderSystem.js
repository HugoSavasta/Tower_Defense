import {entityManager} from "../../scripts/EntityManager.js";

function mapValue(value, start1, stop1, start2, stop2, withinBounds) {
    const newValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  
    if (!withinBounds) {
      return newValue;
    }
  
    // Ensure the mapped value is within the bounds of the destination range
    return Math.min(stop2, Math.max(start2, newValue));
  }
  
function ZombieRenderSystem (delta, frame) {
    entityManager.zombies.forEach(entity => {

        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        const animationComponent = entity.getComponent("AnimationComponent");
        const healthComponent = entity.getComponent("HealthComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const imageComponent = entity.getComponent("ImageComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        const orientationComponent = entity.getComponent("OrientationComponent");


        if (positionComponent === undefined || contextComponent === undefined || 
            animationComponent === undefined ||
             sizeComponent === undefined || imageComponent === undefined) return;
    


        if(velocityComponent && orientationComponent){

            if (orientationComponent.x < 0) {
              
            
            
                contextComponent.context.drawImage(imageComponent.image,
                                                   animationComponent.frameX * animationComponent.spriteWidth, 0,
                                                   animationComponent.spriteWidth, animationComponent.spriteHeight,
                                                   positionComponent.x, positionComponent.y, sizeComponent.width,
                                                   sizeComponent.height);
               
            } 
            else if (orientationComponent.x > 0)
            {

                contextComponent.context.save();
            
 
                contextComponent.context.translate(positionComponent.x + sizeComponent.width / 2,
                                                    positionComponent.y + sizeComponent.height / 2);

                contextComponent.context.scale(-1, 1);
                contextComponent.context.drawImage(imageComponent.image,
                                                   animationComponent.frameX * animationComponent.spriteWidth, 0,
                                                   animationComponent.spriteWidth, animationComponent.spriteHeight,
                                                   -sizeComponent.width / 2, -sizeComponent.height / 2,
                                                   sizeComponent.width, sizeComponent.height);
                contextComponent.context.restore();
            }
        }else{
            contextComponent.context.drawImage(imageComponent.image, 
                animationComponent.frameX * animationComponent.spriteWidth, 0, 
                animationComponent.spriteWidth, animationComponent.spriteHeight, 
                positionComponent.x, positionComponent.y, sizeComponent.width, 
            sizeComponent.height);
        }
 

        
        if (frame % 5 === 0) { 
            if (animationComponent.frameX < animationComponent.maxFrame) {
                animationComponent.frameX++;
            }else {
                animationComponent.frameX = animationComponent.minFrame;
            }
        }
        if (healthComponent === undefined ) return;
        contextComponent.context.save(); 

        contextComponent.context.scale(2, 2);
            
      

        let x = positionComponent.x + 65;
        let hy = positionComponent.y + 30;
        contextComponent.context.translate( x / 2, hy / 2);
        

        contextComponent.context.strokeStyle = 'rgba(120, 120, 120, 0.5)';
        contextComponent.context.lineWidth = 4; 
        
        const y = -20 * 1.2;
        const xStart = -20;
        const xEnd = 8;
        

        contextComponent.context.beginPath();
        contextComponent.context.moveTo(xStart, y);
        contextComponent.context.lineTo(xEnd, y);
        contextComponent.context.stroke();
        
      

        if(healthComponent.health > 50){
            contextComponent.context.strokeStyle = 'rgba(0, 100, 50, 1)';
        }else if(healthComponent.health > 25){
            contextComponent.context.strokeStyle = 'rgba(100, 100, 0, 1)';
        }else{
            contextComponent.context.strokeStyle = 'rgba(100, 0, 0, 1)';
        }
  
        
   
        const healthX = mapValue(healthComponent.health, 0, 100, xStart, xEnd, true);
        
        contextComponent.context.beginPath();
        contextComponent.context.moveTo(xStart, y);
        contextComponent.context.lineTo(healthX, y);
        contextComponent.context.stroke();
        
        contextComponent.context.restore(); 
        

    });
}

export default ZombieRenderSystem;