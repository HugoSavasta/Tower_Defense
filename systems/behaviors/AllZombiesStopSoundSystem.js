import {entityManager} from "../../scripts/EntityManager.js";

function AllZombiesStopSoundSystem() {
    entityManager.zombies_sound.forEach(entity => {
        const soundComponent = entity.getComponent("SoundComponent");
        if(soundComponent !== undefined) soundComponent.sound.stop();
    });
}
export default AllZombiesStopSoundSystem;