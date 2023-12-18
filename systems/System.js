class System {
    constructor() {
        this.entities = new Map();
        this.frame = 0;
    }

    addEntity(entity) {
        this.entities.set(entity.id, entity);
    }

    removeEntity(entity) {
        this.entities.delete(entity.id);
    }

    update(delta){}
}

export default System;