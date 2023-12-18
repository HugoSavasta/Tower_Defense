import System from './System.js';

class ProjectileSystem extends System {
    constructor() {
        super();
    }
    
    update() {
        this.frame++;
        this.entities.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
            const projectileComponent = entity.getComponent("ProjectileComponent");
           
           if (projectileComponent && positionComponent) {
                const velocityComponent = entity.getComponent("VelocityComponent");
                if (this.frame % 3 === 0) {
                    positionComponent.x += velocityComponent.x;
                    positionComponent.y += velocityComponent.y;
                }
            }

        });
    }

    
}

export default ProjectileSystem;