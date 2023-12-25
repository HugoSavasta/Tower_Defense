import {entityManager} from "../../EntityManager.js";
import { observer } from "../../Observable.js";
function ZombieLifeSystem (delta, frame) {
    entityManager.zombies.forEach(entity => {
        let healthComponent = entity.getComponent("HealthComponent");
        if(healthComponent.health <= 0){
            entityManager.remove(entity);
            observer.notify("Scored");
        }
    });
}
export default ZombieLifeSystem;