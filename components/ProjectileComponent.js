import Component from './Component.js';
class ProjectileComponent extends Component {
    constructor(type = 0) {
        super();
        this.type = type;
    }
}
export default ProjectileComponent;