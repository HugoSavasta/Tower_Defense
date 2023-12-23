function ZombySystem (entities, delta, frame) {

        entities.forEach(entity => {
    
            const positionComponent = entity.getComponent("PositionComponent");
            const velocityComponent = entity.getComponent("VelocityComponent");
           if (positionComponent && velocityComponent) {
               
        
                positionComponent.x += velocityComponent.x * delta;
                positionComponent.y += velocityComponent.y * delta;
          
            }

        });
    }

    


export default ZombySystem;