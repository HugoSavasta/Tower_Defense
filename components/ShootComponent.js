class Shoot {
    constructor(shooting, shootNow, shootDelay) {
        this.shooting = shooting;
        this.shootNow = shootNow;
        this.shootDelay = shootDelay;
    }
}
// Builder pattern
class ShootComponent {
    constructor(shooting = false) {

        this.shooting = shooting;

        this.setShootNow = function (shootNow) {
            this.shootNow = shootNow;
            return this;
        }

        this.setShootDelay = function (shootDelay) {
            this.shootDelay = shootDelay;
            return this;
        }

        this.build = function () {
            return new Shoot(this.shooting, this.shootNow, this.shootDelay);
        }
    }
}

export default ShootComponent;