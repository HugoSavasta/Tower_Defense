import { observer } from "../Observable.js";
import {ctx, setZombies} from "../utils.js";
import Entity from "../Entity.js";
import PositionComponent from "../components/PositionComponent.js";
import CollisionComponent from "../components/CollisionComponent.js";
import SizeComponent from "../components/SizeComponent.js";
import ContextComponent from "../components/ContextComponent.js";
import VelocityComponent from "../components/VelocityComponent.js";
import ProjectileComponent from "../components/ProjectileComponent.js";

function mapValue(value, start1, stop1, start2, stop2, withinBounds) {
    const newValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  
    if (!withinBounds) {
      return newValue;
    }
  
    // Ensure the mapped value is within the bounds of the destination range
    return Math.min(stop2, Math.max(start2, newValue));
  }
  function findClosestZombie(entity, entities) {
    let closestZombie = null;
    let closestDistance = Infinity;

    entities.forEach(entity2 => {
        if (entity.id !== entity2.id && entity2.name === "Zombie") {
            const positionComponent = entity.getComponent("PositionComponent");
            const positionComponent2 = entity2.getComponent("PositionComponent");

            const distance = Math.sqrt(
                Math.pow(positionComponent2.x - positionComponent.x, 2) +
                Math.pow(positionComponent2.y - positionComponent.y, 2)
            );

            if (distance < closestDistance) {
                closestZombie = entity2;
                closestDistance = distance;
            }
        }
    });

    return closestZombie;
}


function GameSystem(entities, delta, frame) {
        let closest = null;
      
        entities.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const animationComponent = entity.getComponent("AnimationComponent");
            const contextComponent = entity.getComponent("ContextComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const healthComponent = entity.getComponent("HealthComponent");
            const text = entity.getComponent("TextComponent");
            const imageComponent = entity.getComponent("ImageComponent");
            const velocityComponent = entity.getComponent("VelocityComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");

            if(velocityComponent){
                positionComponent.x += velocityComponent.x * delta;
                positionComponent.y += velocityComponent.y * delta;
            }


            if(entity.name === "Projectile"){
                if (
                    positionComponent.x + sizeComponent.width > 900 ||
                    positionComponent.y < 0 || 
                    positionComponent.y + sizeComponent.height > 700
            ) {
              
                entities.delete(entity.id);
                
                }   

                if (frame % 3 === 0) {
                    positionComponent.x += velocityComponent.x * delta;
                    positionComponent.y += velocityComponent.y * delta;
                    positionComponent.old_x = positionComponent.x;
                    positionComponent.old_y = positionComponent.y;
   
                }
            }

            if(entity.name === "Zombie"){

                if(velocityComponent.x === 0){
                    velocityComponent.x = velocityComponent.old_x;
                }
                if ((
    
                        positionComponent.x + sizeComponent.width < 80
                    )
                    ) {
                        observer.notify("Game Over");
                }
            }

            if(entity.name === "Zombie"){
                let healthComponent = entity.getComponent("HealthComponent");
                if(healthComponent.health <= 0){
                        
                    if( entities.size > 0 
                            && entities.has(entity.id)){
                        setZombies(-1);
                        entities.delete(entity.id);
                        observer.notify("Scored");
                    }
                    
                }
            }
            
           let new_closest = findClosestZombie(entity, entities)
            if(new_closest !== closest){
                closest = new_closest;
            }
        
           if (entity.name === "Defender" && closest) {     
              

          
            if(frame % 20 === 0){
     
                let positionComponent2 = closest.getComponent("PositionComponent");
                let directionX = positionComponent2.x - positionComponent.x;
                let directionY = positionComponent2.y - positionComponent.y;
            
                // Normalize the direction vector
                const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
                directionX /= magnitude;
                directionY /= magnitude;
            
                // Set bullet velocity
                
                const projectile = new Entity("Projectile");
                projectile.addComponent(new ContextComponent(ctx));               
                projectile.addComponent(new SizeComponent(1, 1));
                projectile.addComponent(new PositionComponent(positionComponent.x+50, 
                    positionComponent.y + 50));
                projectile.addComponent(new CollisionComponent(3, false));
                const bulletVelocityX = directionX * 10 * delta;
                const bulletVelocityY = directionY * 10 * delta;
                projectile.addComponent(new VelocityComponent(bulletVelocityX, bulletVelocityY));
                if(Math.random() > 0.1){
                    projectile.addComponent(new ProjectileComponent(0));
                }else{
                    projectile.addComponent(new ProjectileComponent(1));
                }
                
                entities.set(projectile.id, projectile);
            
            }
        }
            //collisions with others
            entities.forEach(entity2 => {
            if(entity.id !== entity2.id){
                if(entity.name === "Projectile" && entity2.name === "Zombie"){
               
                        let healthComponent = entity2.getComponent("HealthComponent");
                        let positionComponent2 = entity2.getComponent("PositionComponent");
                        let sizeComponent2 = entity2.getComponent("SizeComponent");
                   
                        if (!(
                            positionComponent2.x > positionComponent.x + sizeComponent.width ||
                            positionComponent2.x + sizeComponent2.width < positionComponent.x ||
                            positionComponent2.y > positionComponent.y + sizeComponent.height ||
                            positionComponent2.y + sizeComponent2.height < positionComponent.y
                          )){
                            if(projectileComponent.type === 1){
                                healthComponent.health -= 100;
                                if(healthComponent.health <= 0){
                                    entities.delete(entity2.id);
                                    setZombies(-1);
                                }
                            }else{
                                healthComponent.health -= 15;
                                entities.delete(entity.id);
                            }
                        }   
                       //more dammage
                   
                }
                 
                  if(entity.name === "Zombie" && entity2.name === "Defender"){
                        const healthComponent2 = entity2.getComponent("HealthComponent");
                        const positionComponent2 = entity2.getComponent("PositionComponent");
                        const sizeComponent2 = entity2.getComponent("SizeComponent");
                        if (
                            positionComponent2.x < positionComponent.x + sizeComponent.width &&
                            positionComponent2.x + sizeComponent2.width > positionComponent.x &&
                            positionComponent.y < positionComponent2.y + sizeComponent2.height &&
                            positionComponent.y + sizeComponent.height > positionComponent2.y
                          ){
                     
                            if(healthComponent2.health <= 0){
                                entities.delete(entity2.id);
                            }
                     
                             healthComponent2.health -= 0.5;
                             if(healthComponent2.health >= 0){
                                velocityComponent.x = 0;
                             }
                           
                        }
                        
                    }
                }
            });
      
            // console.log(entity.name, projectileComponent ,positionComponent);
            // draw collision cell

            if(entity.name === "Cell"){
              
                contextComponent.context.strokeStyle = "black";
                contextComponent.context.lineWidth = 1;
                contextComponent.context.strokeRect(
                    positionComponent.x, 
                    positionComponent.y, 
                    sizeComponent.width, 
                    sizeComponent.height
                );
            }

            // draw sprite with no animation
            
            else if (entity.name === "Choose_plant_1") {
                
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
          
            else if(entity.name === "Projectile" && positionComponent){
                const projectileComponent = entity.getComponent("ProjectileComponent");
                if(projectileComponent.type === 1){
                    contextComponent.context.fillStyle = 'red';
                }else{
                    contextComponent.context.fillStyle = 'black';
                }
                contextComponent.context.beginPath();
                contextComponent.context.arc(positionComponent.x, 
                                             positionComponent.y, 10, 0, Math.PI * 2);
                contextComponent.context.fill();
            }
            else if(entity.name === "Resource" && positionComponent){
            

                contextComponent.context.fillStyle = 'yellow';
                contextComponent.context.fillRect(positionComponent.x, positionComponent.y, 
                    sizeComponent.width, sizeComponent.height);
                contextComponent.context.fillStyle = 'black';
                contextComponent.context.font = '20px Orbitron';
                contextComponent.context.fillText(text.text, positionComponent.x + 15, positionComponent.y + 30);
            }
            // draw sprite with animation
            else if (animationComponent && positionComponent && sizeComponent) {

                if(entity.name === "Defender"){
                  
                    contextComponent.context.fillStyle = 'gold';
                    contextComponent.context.font = '30px Orbitron';
                    contextComponent.context.fillText(
                        Math.floor(healthComponent.health),
                        positionComponent.x + 15, positionComponent.y - 10);
                      
                    contextComponent.context.drawImage(imageComponent.image, 
                        animationComponent.frameX * animationComponent.spriteWidth, 0, 
                        animationComponent.spriteWidth, animationComponent.spriteHeight, 
                        positionComponent.x, positionComponent.y, sizeComponent.width, 
                    sizeComponent.height);
                
                    if (frame % 4 === 0) { // change the number for more or less speed
                        if (animationComponent.frameX < animationComponent.maxFrame) {
                            animationComponent.frameX++;
                        }
                        else animationComponent.frameX = animationComponent.minFrame;
                    }
                }else if(entity.name === "Zombie"){ 
               
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
                }
            }
        });
}

export default GameSystem;