/*

Dimmer
minLevel
maxLevel

Bulb

.setLevel(5)


*/
class Dimmer {
    minLevel;
    maxLevel;
    listOfBulbs;
    mapOfBulbs;
    constructor(minLevel, maxLevel) {
        if (minLevel !== maxLevel) {
            this.minLevel = minLevel;
            this.maxLevel = maxLevel;
            this.listOfBulbs = [];
            this.mapOfBulbs = new Map();
        }
        else {
            throw new Error("minLevel and maxLevel can't be the same number");
        }
    }
    setLevel(level) {
        let percentage = (level - this.minLevel) / (this.maxLevel - this.minLevel);
        for (let b of this.listOfBulbs) {
            b.setPercentage(percentage);
        }
    }
    addBulb(b) {
        let index = this.listOfBulbs.length;
        this.listOfBulbs.push(b);
        this.mapOfBulbs.set(b, index);
    }
    removeBulb(b) {
        if (!this.mapOfBulbs.has(b)) {
            return true;
        }
        let index = this.mapOfBulbs.get(b);
        this.mapOfBulbs.delete(b);
        this.listOfBulbs.splice(index, 1);
    }
    getBrightness() {
        for (let b of this.listOfBulbs) {
            console.log(b.getBrightness());
        }
    }
}
class Bulb {
    id;
    watt;
    percentage;
    brightness;
    constructor(id, watt) {
        this.id = id;
        this.watt = watt;
        this.percentage = 0;
        this.brightness = 0;
    }
    setPercentage(val) {
        this.percentage = val;
        this.brightness = this.percentage * this.watt;
    }
    getBrightness() {
        return this.brightness;
    }
}
function testBulbsAndDimmers() {
    let b1 = new Bulb("1", 5);
    let b2 = new Bulb("2", 10);
    let b3 = new Bulb("3", 20);
    let d1 = new Dimmer(5, 15);
    d1.addBulb(b1);
    d1.addBulb(b2);
    d1.addBulb(b3);
    d1.setLevel(10);
    d1.getBrightness();
    d1.removeBulb(b2);
    d1.setLevel(5);
    d1.getBrightness();
}
testBulbsAndDimmers();
//# sourceMappingURL=DimmingLightbulbs.js.map