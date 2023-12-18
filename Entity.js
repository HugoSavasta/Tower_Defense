function generateSimpleUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

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

    getComponent(componentName) {
        if(componentName === "") {
            return;
        }
        if(this.components.get(componentName) === undefined) {
            return;
        }
        return this.components.get(componentName);
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