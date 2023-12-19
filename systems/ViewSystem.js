import System from './System.js';

class ViewSystem extends System {
    constructor() {
        super();
        this.frame = 0;
    }
    
    render(delta) {
        this.frame++;
        this.entities.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const imageComponent = entity.getComponent("ImageComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const animationComponent = entity.getComponent("AnimationComponent");
            const contextComponent = entity.getComponent("ContextComponent");
            const colorComponent = entity.getComponent("ColorComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const healthComponent = entity.getComponent("HealthComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");
        
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
            if(colorComponent){
        
                // contextComponent.context.strokeStyle = colorComponent.color;
             
                // contextComponent.context.strokeRect(
                //     positionComponent.x, 
                //     positionComponent.y, 
                //     sizeComponent.width, 
                //     sizeComponent.height
                // );

            }
        
            // draw sprite with no animation
            if (!animationComponent && !collisionComponent && 
                positionComponent && imageComponent && sizeComponent) {
             
                if(entity.name === "Choose_plant_1"){
                    contextComponent.context.lineWidth = 1;
                    contextComponent.context.fillRect(
                        positionComponent.x, 
                        positionComponent.y, 
                        sizeComponent.width, sizeComponent.height);   
    
                        contextComponent.context.drawImage(imageComponent.img,
                            0, 0, 170, 243, 15, 15, 170 / 3, 243 / 4);   

                }else if(entity.name === "Choose_plant_2"){
                    contextComponent.context.lineWidth = 1;
                    contextComponent.context.fillRect(
                        positionComponent.x, 
                        positionComponent.y, 
                        sizeComponent.width, sizeComponent.height);   
    
                        contextComponent.context.drawImage(imageComponent.img,
                            0, 0, 334, 243, 15, 15, 334 / 3, 243 / 4);   
                
                }

            }
            // draw sprite with animation
            else if (animationComponent && positionComponent && imageComponent && sizeComponent) {

                if(entity.name === "Defender"){

                    contextComponent.context.fillStyle = 'gold';
                    contextComponent.context.font = '30px Orbitron';
                    contextComponent.context.fillText(
                        Math.floor(healthComponent.health),
                        positionComponent.x + 15, positionComponent.y - 10);
                    
                    contextComponent.context.drawImage(imageComponent.img, 
                        animationComponent.frameX * animationComponent.spriteWidth, 0, 
                        animationComponent.spriteWidth, animationComponent.spriteHeight, 
                        positionComponent.x, positionComponent.y, sizeComponent.width, 
                    sizeComponent.height);
                    if (this.frame % 30 === 0) { // change the number for more or less speed
                        if (animationComponent.frameX < animationComponent.maxFrame) {
                            animationComponent.frameX++;
                        }
                        else animationComponent.frameX = animationComponent.minFrame;
                    }
                }else if(entity.name === "Zomby"){  
                    contextComponent.context.drawImage(imageComponent.img, 
                        animationComponent.frameX * animationComponent.spriteWidth, 0, 
                        animationComponent.spriteWidth, animationComponent.spriteHeight, 
                        positionComponent.x, positionComponent.y, sizeComponent.width, 
                    sizeComponent.height);
                    if (this.frame % 30 === 0) { // change the number for more or less speed
                        if (animationComponent.frameX < animationComponent.maxFrame) {
                            animationComponent.frameX++;
                        }
                        else animationComponent.frameX = animationComponent.minFrame;
                    }
                }
            }
        });
    }
}

export default ViewSystem;