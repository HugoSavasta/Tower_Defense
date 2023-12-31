import {entityManager} from "../../scripts/EntityManager.js";
import { incScore } from "../../scripts/utils.js";
import StopZombieSoundSystem from "./StopZombieSoundSystem.js";

function ZombieLifeSystem () {
    entityManager.zombies.forEach(entity => {
        const healthComponent = entity.getComponent("HealthComponent");
        if (healthComponent === undefined) return;
        if(healthComponent.health <= 0){
            StopZombieSoundSystem(entity);
            entityManager.remove(entity);
            incScore(1);
        }
    });
}
export default ZombieLifeSystem;