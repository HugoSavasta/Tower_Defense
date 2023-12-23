function ApplyOnClickSystem(entities, mouseX, mouseY, mouseWidth, mouseHeight) {
    let collided = false;
    entities.forEach(entity => {
        if(entity.name === "Defender"){
            const positionComponent = entity.getComponent("PositionComponent");
            const sizeComponent = entity.getComponent("SizeComponent");
            const collisionComponent = entity.getComponent("CollisionComponent");

            if (collisionComponent && mouseX && mouseY) {
                if (!(
                            positionComponent.x > mouseX + mouseWidth ||
                            positionComponent.x + sizeComponent.width < mouseX ||
                            positionComponent.y > mouseY + mouseHeight ||
                            positionComponent.y + sizeComponent.height < mouseY
                    )
                    ) {
                        collided = true;
                        return collided;
                }
            }
          
        }

    });
    return collided;
}

export default ApplyOnClickSystem;