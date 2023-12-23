import {ctx} from "../utils.js";
import Entity from "../Entity.js";
import PositionComponent from "../components/PositionComponent.js";
import CollisionComponent from "../components/CollisionComponent.js";
import ColorComponent from "../components/ColorComponent.js";
import SizeComponent from "../components/SizeComponent.js";
import ContextComponent from "../components/ContextComponent.js";
import VelocityComponent from "../components/VelocityComponent.js";
import ProjectileComponent from "../components/ProjectileComponent.js";

function ShootSystem(entities, delta, frame) {
    entities.forEach(entity => {
        if (entity.name === "Defender") {
            const animationComponent = entity.getComponent("AnimationComponent");
            if(frame % animationComponent.frameSpeed === 0){
                const positionComponent = entity.getComponent("PositionComponent");
                const projectile = new Entity("Projectile");
                projectile.addComponent(new ContextComponent(ctx));
                projectile.addComponent(new ColorComponent("black"));
               
                projectile.addComponent(new SizeComponent(1, 1));
                projectile.addComponent(new PositionComponent(positionComponent.x+50, 
                    positionComponent.y+50));
                projectile.addComponent(new CollisionComponent(3, false));
                projectile.addComponent(new VelocityComponent(5, 0));
                projectile.addComponent(new ProjectileComponent());
                entities.set(projectile.id, projectile);
            }
        }
    });
}



export default ShootSystem;