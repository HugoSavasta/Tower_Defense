import {entityManager} from "../../EntityManager.js";

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

        contextComponent.context.drawImage(imageComponent.image, 
            animationComponent.frameX * animationComponent.spriteWidth, 0, 
            animationComponent.spriteWidth, animationComponent.spriteHeight, 
            positionComponent.x, positionComponent.y, sizeComponent.width, 
        sizeComponent.height);

        contextComponent.context.save(); // Save the current transformation matrix

        // Scale the context to make the drawing two times bigger
        contextComponent.context.scale(2, 2);
        
        // Translate the scaled context
        let x = positionComponent.x + 65;
        let hy = positionComponent.y + 30;
        contextComponent.context.translate( x / 2, hy / 2); // Adjusted translation
        
        // Set stroke style for the background line
        contextComponent.context.strokeStyle = 'rgba(120, 120, 120, 0.5)';
        contextComponent.context.lineWidth = 4; // Adjust line width for the scaled context
        
        const y = -20 * 1.2;
        const xStart = -20;
        const xEnd = 8;
        
        // Draw the background line
        contextComponent.context.beginPath();
        contextComponent.context.moveTo(xStart, y);
        contextComponent.context.lineTo(xEnd, y);
        contextComponent.context.stroke();
        
        // Set stroke style for the health line
        if(healthComponent.health > 50){
            contextComponent.context.strokeStyle = 'rgba(0, 100, 50, 1)';
        }else if(healthComponent.health > 25){
            contextComponent.context.strokeStyle = 'rgba(100, 100, 0, 1)';
        }else{
            contextComponent.context.strokeStyle = 'rgba(100, 0, 0, 1)';
        }
  
        
        // Draw the health line based on the current health
        const healthX = mapValue(healthComponent.health, 0, 100, xStart, xEnd, true);
        
        contextComponent.context.beginPath();
        contextComponent.context.moveTo(xStart, y);
        contextComponent.context.lineTo(healthX, y);
        contextComponent.context.stroke();
        
        contextComponent.context.restore(); // Restore the saved transformation matrix
        

        if (frame % 5 === 0) { // change the number for more or less speed
            if (animationComponent.frameX < animationComponent.maxFrame) {
                animationComponent.frameX++;
            }else {
                animationComponent.frameX = animationComponent.minFrame;
            }
        }
    });
}

export default ZombieRenderSystem;