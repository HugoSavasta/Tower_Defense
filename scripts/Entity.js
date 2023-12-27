import { generateSimpleUUID } from "../scripts/utils.js";

class Entity {
    constructor(name = "") {
        this.id = generateSimpleUUID();
        this.name = name;
        this.components = new Map();
        // console.log((name !== "" ? name + " " : "") + "Entity with id:" + this.id + " created");
    }

    addComponent(component) {
        if(component === undefined) {
            console.log("Cannot add undefined component");
            return;
        }
        this.components.set(component.constructor.name, component);
    }

    getComponent(identifier) {
        if (identifier === "") {
            return;
        }
        return this.components.get(identifier);
    }

    removeComponent(componentName) {
        if(componentName === "") {
            return;
        }
        if(this.components.get(componentName) === undefined) {
            return;
        };
        this.components.delete(componentName); 
    }
}

export default Entity;