import System from './System.js';
import ProjectileComponent from "../components/ProjectileComponent.js";

class ShootSystem extends System {
    constructor() {
        super();
    }
    
    update() {
        this.frame++;
        this.entities.forEach(entity => {
            const shootComponent = entity.getComponent("ShootComponent");
           if (shootComponent) {
                entity.addComponent(new ProjectileComponent());
            }
        });
    }


}

export default ShootSystem;