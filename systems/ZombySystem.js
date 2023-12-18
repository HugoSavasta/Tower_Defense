import System from './System.js';

class ZombySystem extends System {
    constructor() {
        super();
    }
    
    update(delta) {
        this.frame++;
        
        this.entities.forEach(entity => {
            const positionComponent = entity.getComponent("PositionComponent");
      
           if (positionComponent) {
                const velocityComponent = entity.getComponent("VelocityComponent");
                if (this.frame % 3 === 0) {
                    positionComponent.x += velocityComponent.x * delta;
                    positionComponent.y += velocityComponent.y * delta;
                   
                } 
          
            }

        });
    }

    
}

export default ZombySystem;