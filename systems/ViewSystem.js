function mapValue(value, start1, stop1, start2, stop2, withinBounds) {
    const newValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  
    if (!withinBounds) {
      return newValue;
    }
  
    // Ensure the mapped value is within the bounds of the destination range
    return Math.min(stop2, Math.max(start2, newValue));
  }

  
function ViewSystem(entities, delta, frame) {
      
        entities.forEach(entity => {
            
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const animationComponent = entity.getComponent("AnimationComponent");
            const contextComponent = entity.getComponent("ContextComponent");
            const colorComponent = entity.getComponent("ColorComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const healthComponent = entity.getComponent("HealthComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");
   
            // console.log(entity.name, projectileComponent ,positionComponent);
            // draw collision cell

            if(colorComponent && collisionComponent && collisionComponent.collide && !projectileComponent){
              
                // contextComponent.context.strokeStyle = colorComponent.color;
                // contextComponent.context.lineWidth = 1;
                // contextComponent.context.strokeRect(
                //     positionComponent.x, 
                //     positionComponent.y, 
                //     sizeComponent.width, 
                //     sizeComponent.height
                // );
            }

            if(colorComponent && entity.name !== "Projectile" ){
        
                contextComponent.context.strokeStyle = colorComponent.color;
             
                contextComponent.context.strokeRect(
                    positionComponent.x, 
                    positionComponent.y, 
                    sizeComponent.width, 
                    sizeComponent.height
                );

            }
        
            // draw sprite with no animation
            if (!animationComponent && !collisionComponent && 
                positionComponent  && sizeComponent) {
             
                if(entity.name === "Choose_plant_1"){
                    contextComponent.context.lineWidth = 1;
                    contextComponent.context.fillRect(
                        positionComponent.x, 
                        positionComponent.y, 
                        sizeComponent.width, sizeComponent.height);   
    
                        contextComponent.context.drawImage(contextComponent.image,
                            0, 0, 170, 243, 15, 15, 170 / 3, 243 / 4);   

                }else if(entity.name === "Choose_plant_2"){
                    contextComponent.context.lineWidth = 1;
                    contextComponent.context.fillRect(
                        positionComponent.x, 
                        positionComponent.y, 
                        sizeComponent.width, sizeComponent.height);   
    
                        contextComponent.context.drawImage(contextComponent.image,
                            0, 0, 334, 243, 15, 15, 334 / 3, 243 / 4);   
                
                }

            }
          
            else if(entity.name === "Projectile" && positionComponent){
            
                contextComponent.context.fillStyle = 'black';
                contextComponent.context.beginPath();
                contextComponent.context.arc(positionComponent.x, 
                                             positionComponent.y, 10, 0, Math.PI * 2);
                contextComponent.context.fill();
            }
            // draw sprite with animation
            else if (animationComponent && positionComponent && sizeComponent) {

                if(entity.name === "Defender"){

                    contextComponent.context.fillStyle = 'gold';
                    contextComponent.context.font = '30px Orbitron';
                    contextComponent.context.fillText(
                        Math.floor(healthComponent.health),
                        positionComponent.x + 15, positionComponent.y - 10);
                    
                    contextComponent.context.drawImage(contextComponent.image, 
                        animationComponent.frameX * animationComponent.spriteWidth, 0, 
                        animationComponent.spriteWidth, animationComponent.spriteHeight, 
                        positionComponent.x, positionComponent.y, sizeComponent.width, 
                    sizeComponent.height);
                    
                    if (frame % 30 === 0) { // change the number for more or less speed
                        if (animationComponent.frameX < animationComponent.maxFrame) {
                            animationComponent.frameX++;
                        }
                        else animationComponent.frameX = animationComponent.minFrame;
                    }
                }else if(entity.name === "Zomby"){ 
               
                    contextComponent.context.drawImage(contextComponent.image, 
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
                }
            }
        });
}

export default ViewSystem;