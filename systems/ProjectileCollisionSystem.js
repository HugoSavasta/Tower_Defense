import System from './System.js';

class ProjectileCollisionSystem extends System {
    constructor() {
        super();
    }
    
    update(zomby) {
        this.entities.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const projectileComponent = entity.getComponent("ProjectileComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
            
            if (collisionComponent && projectileComponent && sizeComponent) {
                if (
                            // 700 width of the canvas
                            positionComponent.x + sizeComponent.width > 900
                    ) {
         
                        entity.removeComponent("ProjectileComponent");
                        entity.getComponent("PositionComponent").x = entity.getComponent("PositionComponent").old_x;
                        entity.getComponent("PositionComponent").y = entity.getComponent("PositionComponent").old_y;
                      
                }
                
            }

            // normal dammage
            if(zomby && projectileComponent.type === 0){
                let healthComponent = zomby.getComponent("HealthComponent");
                if (
                    // 700 width of the canvas
                    positionComponent.x + sizeComponent.width > zomby.getComponent("PositionComponent").x &&
                    positionComponent.x < zomby.getComponent("PositionComponent").x + zomby.getComponent("SizeComponent").width
                  ){
                    if(healthComponent.health === 0){
                        System.removeEntity(zomby);
                    }
                    healthComponent -= 1;
                    entity.removeComponent("ProjectileComponent");
                    entity.getComponent("PositionComponent").x = entity.getComponent("PositionComponent").old_x;
                    entity.getComponent("PositionComponent").y = entity.getComponent("PositionComponent").old_y;
                  }
            }
               //more dammage
            if(zomby && projectileComponent.type === 1){}

        });
    }

    
}

export default ProjectileCollisionSystem;