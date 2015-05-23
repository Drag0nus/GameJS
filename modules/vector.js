
var Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.math = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
};

Vector.prototype.scalar = function(scalar) {
    this.x -= scalar;
    this.y -= scalar;
};

Vector.prototype.multScalar = function(scalar) {        //for air resistance
    this.x *= scalar;
    this.y *= scalar;
    return this;
};

module.exports.vector = Vector;