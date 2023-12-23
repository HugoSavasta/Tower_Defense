function ProjectileCollisionSystem(entities, delta, frame) {

        entities.forEach(entity => {
         if(entity.name === "Projectile"){
            const positionComponent = entity.getComponent("PositionComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
                // console.log(collisionComponent && projectileComponent && sizeComponent);
                if (collisionComponent && sizeComponent) {
               
                    if (
                                // 700 width of the canvas
                                positionComponent.x + sizeComponent.width > 900
                        ) {
                     
                            entities.delete(entity.id);
              
                    }         
                }
                     
                // normal dammage
                //entities is map 
    
                entities.forEach(entity2 => {
                    if(entity2.name === "Zomby" && entity.name === "Projectile"){
               
                    if(entity2){
                        let healthComponent = entity2.getComponent("HealthComponent");
                        let positionComponent2 = entity2.getComponent("PositionComponent");
                        let sizeComponent2 = entity2.getComponent("SizeComponent");
                   
                        if (!(
                            positionComponent2.x > positionComponent.x + sizeComponent.width ||
                            positionComponent2.x + sizeComponent2.width < positionComponent.x ||
                            positionComponent2.y > positionComponent.y + sizeComponent.height ||
                            positionComponent2.y + sizeComponent2.height < positionComponent.y
                          )){
                            
                            if(healthComponent.health <= 0){
                               
                                if( entities.size > 0 
                                        && entities.has(entity2.id)){
                                    entities.delete(entity2.id);
                                }
                               
                            }
                        
                            // healthComponent.health -= 25;
                            entities.delete(entity.id);
                        }
                    }   
                       //more dammage
                    if(entity2 && projectileComponent && projectileComponent.type === 1){}
                }
                });
         }
  
        });
       
    }

    


export default ProjectileCollisionSystem;