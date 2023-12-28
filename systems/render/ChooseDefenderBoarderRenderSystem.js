function ChooseDefenderBoarderRenderSystem (entity) {
    const positionComponent = entity.getComponent("PositionComponent");
    const contextComponent = entity.getComponent("ContextComponent");
    const sizeComponent = entity.getComponent("SizeComponent");
    if (positionComponent === undefined || contextComponent === undefined || sizeComponent === undefined) return;
    
    contextComponent.context.strokeStyle = "black";
    contextComponent.context.lineWidth = 1;
    contextComponent.context.strokeRect(
        positionComponent.x, 
        positionComponent.y, 
        sizeComponent.width, 
        sizeComponent.height
    ); 
}

export default ChooseDefenderBoarderRenderSystem;