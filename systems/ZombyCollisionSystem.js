import { observer } from "../Observable.js";

function ZombyCollisionSystem (entities, delta, frame) {
        entities.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
            if (collisionComponent && entity.name === "Zomby" && sizeComponent) {
                if(velocityComponent.x === 0){
                    velocityComponent.x = velocityComponent.old_x;
                }
                if ((

                            positionComponent.x + sizeComponent.width < 80
                    )
                    ) {
                        observer.notify("Game Over");
                }

                entities.forEach(entity2 => {
                    if(entity2.name === "Defender"){
                        const healthComponent2 = entity2.getComponent("HealthComponent");
                        const positionComponent2 = entity2.getComponent("PositionComponent");
                        const sizeComponent2 = entity2.getComponent("SizeComponent");
                        // const collisionComponent2 = entity2.getComponent("CollisionComponent");
                  
    
                        if (
                            positionComponent2.x < positionComponent.x + sizeComponent.width &&
                            positionComponent2.x + sizeComponent2.width > positionComponent.x &&
                            positionComponent.y < positionComponent2.y + sizeComponent2.height &&
                            positionComponent.y + sizeComponent.height > positionComponent2.y
                          ){
                     
                            if(healthComponent2.health <= 0){
                                if( entities.has(entity2.id) ){
                                   
                                     entities.delete(entity2.id);
                                }
                  
                            }
                     
                             healthComponent2.health -= 0.5;
                             if(healthComponent2.health >= 0){
                                velocityComponent.x = 0;
                             }
                           
                        }
                        
                    }
                  
                });
       
            }
        });
}


export default ZombyCollisionSystem;