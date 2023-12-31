import {entityManager} from "../../scripts/EntityManager.js";

function ZombieSoundSystem () {
    entityManager.zombies_sound.forEach(entity => {
        const soundComponent = entity.getComponent("SoundComponent");
        if (soundComponent === undefined) return;
        if(soundComponent.sound.playing()) return;
        soundComponent.sound.play();
    });
}
export default ZombieSoundSystem;