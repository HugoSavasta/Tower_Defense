import System from './System.js';
import LooseComponent from '../components/LooseComponent.js';

class ProjectileCollisionSystem extends System {
    constructor() {
        super();
    }
    
    update() {
        this.entities.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const projectileComponent = entity.getComponent("ProjectileComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
 
            if (collisionComponent && projectileComponent && sizeComponent) {

        
                if ((
                            // 700 width of the canvas
                            positionComponent.x + sizeComponent.width < 900
                    )
                    ) {
                        entity.addComponent(new LooseComponent());
                        entity.removeComponent("ProjectileComponent");
                        entity.getComponent("PositionComponent").x = entity.getComponent("PositionComponent").old_x;
                        entity.getComponent("PositionComponent").y = entity.getComponent("PositionComponent").old_y;
                      
                }
            }

        });
    }

    
}

export default ProjectileCollisionSystem;