import {entityManager} from "../../scripts/EntityManager.js";

function DefenderLifeSystem (delta, frame) {
    entityManager.defenders.forEach(entity => {
        let healthComponent = entity.getComponent("HealthComponent");
        if (healthComponent === undefined) return;
        if(healthComponent.health <= 0){
            entityManager.remove(entity);
        }
    });
}
export default DefenderLifeSystem;