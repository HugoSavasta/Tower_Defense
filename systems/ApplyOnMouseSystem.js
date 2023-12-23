function ApplyOnMouseSystem(entities, mouseX, mouseY, mouseWidth, mouseHeight) {
   
    entities.forEach(entity => {
        if(entity.name === "Cell"){
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            if (collisionComponent){
                collisionComponent.collide = false;
            }
          
            if (collisionComponent && mouseX && mouseY) {
                if (!(
                            positionComponent.x > mouseX + mouseWidth ||
                            positionComponent.x + sizeComponent.width < mouseX ||
                            positionComponent.y > mouseY + mouseHeight ||
                            positionComponent.y + sizeComponent.height < mouseY
                    )
                    ) {
                        collisionComponent.collide = true;
                }
            }
        }
        else if(entity.name === "Defender"){
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");
            if (collisionComponent){
                collisionComponent.collide = false;
            }
            if (collisionComponent && mouseX && mouseY) {
           
                if (!(
                            positionComponent.x > mouseX + mouseWidth ||
                            positionComponent.x + sizeComponent.width < mouseX ||
                            positionComponent.y > mouseY + mouseHeight ||
                            positionComponent.y + sizeComponent.height < mouseY
                    )
                    ) {
                        collisionComponent.collide = true;
                }
            }
        }

    });
}
export default ApplyOnMouseSystem;