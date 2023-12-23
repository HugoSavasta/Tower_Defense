
function ZombyCollisionSystem (entities, delta, frame) {
        entities.forEach(entity => {
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
                      
                        entity.removeComponent("ProjectileComponent");
                        entity.getComponent("PositionComponent").x = entity.getComponent("PositionComponent").old_x;
                        entity.getComponent("PositionComponent").y = entity.getComponent("PositionComponent").old_y;
                      
                }
            }

        });
}


export default ZombyCollisionSystem;