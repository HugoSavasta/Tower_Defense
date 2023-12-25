import {entityManager} from "../../EntityManager.js";

function ProjectileRenderSystem (delta, frame) {
    entityManager.projectiles.forEach(entity => {
        const projectileComponent = entity.getComponent("ProjectileComponent");
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        if(projectileComponent.type === 1){
            contextComponent.context.fillStyle = 'red';
        }else{
            contextComponent.context.fillStyle = 'black';
        }
        contextComponent.context.beginPath();
        contextComponent.context.arc(positionComponent.x, 
                                     positionComponent.y, 10, 0, Math.PI * 2);
        contextComponent.context.fill();
    });
}

export default ProjectileRenderSystem;