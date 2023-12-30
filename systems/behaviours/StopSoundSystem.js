function StopSoundSystem (entity) {
    const soundComponent = entity.getComponent("SoundComponent");
    if (soundComponent === undefined) return;
    if(soundComponent.sound.playing()) soundComponent.sound.stop();
}
export default StopSoundSystem;