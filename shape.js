// JS class to hold all object definitions and methods

function Shape() { }
Shape.prototype.name = "Shape";
Shape.prototype.toString = function() {
  return this.name;
}

function TwoDShape() { }
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D Shape";

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
  return this.side * this.height / 2;
}

module.exports = Shape;
module.exports.TwoDShape = TwoDShape;
module.exports.Triangle = Triangle;
