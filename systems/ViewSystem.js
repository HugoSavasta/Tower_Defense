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
              
                contextComponent.context.strokeStyle = colorComponent.color;
                contextComponent.context.lineWidth = 1;
                contextComponent.context.strokeRect(
                    positionComponent.x, 
                    positionComponent.y, 
                    sizeComponent.width, 
                    sizeComponent.height
                );
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