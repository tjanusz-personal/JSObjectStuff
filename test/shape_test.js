var assert = require('assert');
var Shape = require("../shape.js");
var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

// TO run these tests
// ./node_modules/mocha/bin/mocha

describe('ShapeStuff', function() {

  describe("Triangle", function() {
    var myTriangle = new Shape.Triangle(5, 10);

    it("area uses function on Triangle object", function() {
      expect(myTriangle.getArea()).to.eql(25);
		});

    it("toString returns inherited toString function from Shape", function() {
      expect(myTriangle.toString()).to.eql("Triangle");
    });

    it("Returns the Triangle constructor", function() {
      expect(myTriangle.constructor).to.eql(Shape.Triangle);
    });

    it("is an instanceof of all three inherited parts (Shape, TwoDShape, Triangle)", function() {
      expect(myTriangle instanceof Shape).to.be.true;
      expect(myTriangle instanceof Shape.TwoDShape).to.be.true;
      expect(myTriangle instanceof Shape.Triangle).to.be.true;
      expect(myTriangle instanceof Array).to.be.false;
    });

    it("isPrototypeOf of all three inherited parts (Shape, TwoDShape, Triangle)", function() {
      expect(Shape.prototype.isPrototypeOf(myTriangle)).to.be.true;
      expect(Shape.TwoDShape.prototype.isPrototypeOf(myTriangle)).to.be.true;
      expect(Shape.Triangle.prototype.isPrototypeOf(myTriangle)).to.be.true;
      expect(Array.prototype.isPrototypeOf(myTriangle)).to.be.false;
    });

    it("does not haveOwnProperty of name", function() {
      expect(myTriangle.hasOwnProperty('name')).to.be.false;
    });

  });

  describe("TwoDShape", function() {
    var myTwoD = new Shape.TwoDShape();

    it("uses toString from Shape object", function() {
      expect(myTwoD.toString()).to.eql("2D Shape");
    });

    it("does not haveOwnProperty of name", function() {
      expect(myTwoD.hasOwnProperty('name')).to.be.false;
    });
  });


});
