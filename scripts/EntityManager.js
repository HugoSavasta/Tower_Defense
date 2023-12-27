class EntityManager {
    constructor() {
        this.defenders = new Map();
        this.zombies = new Map();
        this.projectiles = new Map();
        this.resources = new Map();
        this.cells = new Map();
        this.chooses = new Map();
    }
    add(entity){
        if(entity === undefined) {
            console.log("Cannot add undefined entity");
            return;
        }
        if(entity.name === "Defender") {
            this.defenders.set(entity.id, entity);
        } else if(entity.name === "Zombie") {
            this.zombies.set(entity.id, entity);
        } else if(entity.name === "Projectile") {
            this.projectiles.set(entity.id, entity);
        } else if(entity.name === "Cell") {
            this.cells.set(entity.id, entity);
        } else if(entity.name === "Resource") {
            this.resources.set(entity.id, entity);
            //entity.name starts with Choose
            
        } else if(entity.name.startsWith("Choose")) {
            this.chooses.set(entity.id, entity);
        }
    }

    remove(entity){
        if(entity === undefined) {
            console.log("Cannot remove undefined entity");
            return;
        }
        if(entity.name === "Defender") {
            this.defenders.delete(entity.id);
        } else if(entity.name === "Zombie") {
            this.zombies.delete(entity.id);
        } else if(entity.name === "Projectile") {
            this.projectiles.delete(entity.id);
        } else if(entity.name === "Cell") {
            this.cells.delete(entity.id);
        } else if(entity.name === "Resource") {
            this.resources.delete(entity.id);
        } else if(entity.name.startsWith("Choose")) {
            this.chooses.delete(entity.id, entity);
        }
    }
}

export const entityManager = new EntityManager();