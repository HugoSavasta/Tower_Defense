class EntityManager {
    constructor() {
        this.entities = new Map();
    }

    addEntity(entity) {
        if(entity === undefined) {
            console.log("Cannot add undefined entity");
            return;
        }
        this.entitys.set(entity.id, entity);
    }


    removeEntity(entity) {
        this.entities.delete(entity.id); 
    }
}

export const entityManger = new EntityManager();