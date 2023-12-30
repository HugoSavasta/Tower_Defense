import {entityManager} from "../../scripts/EntityManager.js";

function AllZombiesStopSoundSystem() {
    entityManager.zombies.forEach(entity => {
        const soundComponent = entity.getComponent("SoundComponent");
        if(soundComponent !== undefined && soundComponent.sound.playing()) soundComponent.sound.stop();
    });
}
export default AllZombiesStopSoundSystem;