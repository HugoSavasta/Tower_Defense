class Shoot {
    constructor(shooting, shootNow) {
        this.shooting = shooting;
        this.shootNow = shootNow;
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
        this.build = function () {
            return new Shoot(this.shooting, this.shootNow);
        }
    }
}

export default ShootComponent;