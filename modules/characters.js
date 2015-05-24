
var vector = require('./vector');
var astar = require('./astar.js');
var world = require('./world');

var Human = {
    constructor: function(position, gender, fullName, attack, defence, maxDistance, str, dex, vit, attackSpeed) {
        this.position = position;
        this.gender = gender;
        this.fullName = fullName;

        this.strength = str;
        this.dexterity = dex;

        this.distance = maxDistance;
        this.attack = attack + str;
        this.defence = defence;

        this.vitality = vit + defence;
        this.attackDistance = attackSpeed;
        return this;
    },
    moveTo: function(x, y) {
        if(this.position.x <= x && this.position.y <= y) {
                this.position.x += this.distance.x;
                this.position.y += this.distance.y;

        } else if(this.position.x <= x && this.position.y >= y) {
                this.position.x += this.distance.x;
                this.position.y -= this.distance.y;

        } else if(this.position.x >= x && this.position.y <= y) {
                this.position.x -= this.distance.x;
                this.position.y += this.distance.y;

        } else if(this.position.x >= x && this.position.y >= y) {
                this.position.x -= this.distance.x;
                this.position.y -= this.distance.y;
        }

        if(Math.abs(x - this.position.x < this.distance.x)) {
            this.position.x = x;
        }
        if(Math.abs(y - this.position.y < this.distance.y)) {
            this.position.y = y;
        }

        if(this.position.x == x && this.position.y == y) {
            console.log('Reached destination!');
            return this.position;
        }
    },
    fight: function(enemy) {
        for(this.vitality; this.vitality >= 0;) {
            for(enemy.vitality; enemy.vitality >= 0;) {
                this.vitality -= enemy.attack;
                console.log(this.vitality);
                enemy.vitality -= this.attack;
                console.log(enemy.vitality);

                if (enemy.vitality <= 0 || this.vitality <= 0) {
                    console.log('Fight is over');
                    break;
                }
            }
        }
        if (this.vitality < enemy.vitality) {
            return console.log(this.race + ' died');
        } else {
            return console.log(enemy.race + ' died');
        }
    }
};

var Demon = Object.create(Human);
Demon.constructor = function(position, race, gender, attack, defence, maxDistance, str, dex, vit, abilityToFly, attackSpeed) {
    Human.constructor.apply(this, arguments);
    return this;
};

module.exports.Human = Human;
module.exports.Demon = Demon;