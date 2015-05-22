
var vector = require('./vector');
var astar = require('./astar.js');
var world = require('./world');

var Human = {
    constructor: function(position, gender, fullName, attack, defence, maxDistance, str, dex, vit) {
        this.position = position;
        this.gender = gender;
        this.fullName = fullName;

        this.strength = str;
        this.dexterity = dex;

        this.distance = maxDistance;
        this.attack = attack + str;
        this.defence = defence;

        this.vitality = vit + defence;
        return this;
    },
    moveTo: function(x, y) {
        if(this.position.x < x && this.position.y < y) {
            this.position.x += this.distance.x;
            this.position.y += this.distance.y;
        } else if(this.position.x < x && this.position.y > y) {
            this.position.x += this.distance.x;
            this.position.y -= this.distance.y;
        } else if(this.position.x > x && this.position.y < y) {
            this.position.x -= this.distance.x;
            this.position.y += this.distance.y;
        } else if(this.position.x > x && this.position.y > y) {
            this.position.x -= this.distance.x;
            this.position.y -= this.distance.y;
        }

        if(Math.abs(x - this.position.x) < this.distance.x || Math.abs(y - this.position.y) < this.distance.y) {
            this.position.x = x;
            this.position.y = y;
        }

        if(this.position.x == x && this.position.y == y) {
            console.log('Reached destination!');
            return this.position;
        }
    },
    fight: function() {

    }
};

var Demon = Object.create(Human);
Demon.constructor = function(position, race, gender, fullName, attack, defence, maxDistance, str, dex, vit, abilityToFly) {
    Human.constructor.apply(this, arguments);
    if (abilityToFly == true) {
        this.distance = distance + 10;
    }
    return this;
};

module.exports.Human = Human;
module.exports.Demon = Demon;