import {handleGameStatus} from "../../scripts/utils.js";
import {entityManager} from "../../scripts/EntityManager.js";
import {gamePublisher} from "../../scripts/Observable.js";
import AllZombiesStopSoundSystem from "../behaviors/AllZombiesStopSoundSystem.js";

function ZombieBoundaryCollisionSystem () {
    entityManager.zombies.forEach(entity => {
        const positionComponent = entity.getComponent("PositionComponent");
        const collisionComponent = entity.getComponent("CollisionComponent");
        const sizeComponent = entity.getComponent("SizeComponent");
        const velocityComponent = entity.getComponent("VelocityComponent");
        const soundComponent = entity.getComponent("SoundComponent");
        if (collisionComponent === undefined || positionComponent === undefined 
            || sizeComponent === undefined || velocityComponent === undefined) return;
        if(velocityComponent.x === 0){
            velocityComponent.x = velocityComponent.old_x;
        }
        if ((
                positionComponent.x + sizeComponent.width < 80
            )
            ) {
                handleGameStatus(true);
                if(soundComponent && soundComponent.sound.playing()) soundComponent.sound.stop();
             
                gamePublisher.notifyObservers({ message: "Game Over!" });
                gamePublisher.unsubscribe("game");
                AllZombiesStopSoundSystem();
            }
        });
}

export default ZombieBoundaryCollisionSystem;