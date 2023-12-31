import {entityManager} from "../../scripts/EntityManager.js";

function ProjectileRenderSystem (delta, frame) {
    entityManager.projectiles.forEach(entity => {
        const projectileComponent = entity.getComponent("ProjectileComponent");
        const positionComponent = entity.getComponent("PositionComponent");
        const contextComponent = entity.getComponent("ContextComponent");
        if (projectileComponent === undefined && positionComponent === undefined 
            || contextComponent === undefined) return;
        if(projectileComponent.type === 0){
            contextComponent.context.fillStyle = 'black';
        }
        else if(projectileComponent.type === 1)
        {
            contextComponent.context.fillStyle = 'yellow';
        }
        else if(projectileComponent.type === 2)
        {
            contextComponent.context.fillStyle = 'red';
        }
        contextComponent.context.beginPath();
        contextComponent.context.arc(positionComponent.x, 
                                     positionComponent.y, 10, 0, Math.PI * 2);
        contextComponent.context.fill();
    });
}

export default ProjectileRenderSystem;