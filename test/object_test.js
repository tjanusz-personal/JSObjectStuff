var assert = require('assert');
var Hero = require("../hero.js");
var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

// TO run these tests
// ./node_modules/mocha/bin/mocha

describe('ObjectStuff', function() {

  describe("hero inline Object()", function() {
    var hero = {
      breed: 'Turtle', occupation: 'Ninja', address: { street: "Main"},
      say: function() {
        return "I am " + this.occupation;
      }
    };

    beforeEach(function() {
      // TODO: setup stuff
    });

		it("can retrieve breed, occupation", function() {
      expect(hero.breed).to.eql("Turtle");
      expect(hero.occupation).to.eql("Ninja");
      expect(hero["breed"]).to.eql("Turtle");
		});

    it("can retrieve nested properties", function() {
      expect(hero.address.street).to.eql("Main");
      expect(hero["address"]["street"]).to.eql("Main");
    });

    it("says occupation", function() {
      expect(hero.say()).to.eql("I am Ninja");
    });

    it("supports adding/deleting a property", function() {
      hero.name = "John";
      expect(hero).to.have.property("name", "John");
      delete hero.name;
      expect(hero).to.not.have.property("name");
    });

    it("can be used to create other objects in prototype", function() {
      function F() {};
      expect(typeof F.prototype).to.eql("object");
      // switch prototype to our hero
      F.prototype = hero;
      var baby = new F();
      expect(baby.breed).to.eql("Turtle");
    });

    it("can use other objects methods", function() {
      var my_obj = { occupation: "Truck Driver"};
      var result = hero.say.call(my_obj);
      expect(result).to.eql("I am Truck Driver");
      var my_obj_without_occupation = { name: 'Test'};
      result = hero.say.call(my_obj_without_occupation);
      expect(result).to.eql("I am undefined");
    });

  });

  describe("Hero Object()", function() {

    it("supports constructor", function() {
      var hero = new Hero("Joe");
      // expect(hero).to.have.property("occupation", "Ninja");
      expect(hero).to.have.property("name", "Joe");
      expect(typeof hero).to.eql("object");
      expect(hero instanceof Hero).to.be.true;
    });

    it("creates separate instances", function() {
      var hero1 = new Hero("Joe");
      var hero2 = new Hero("Joe");
      expect(hero1 === hero2).to.be.false;
    });

    it("supports constructor functions", function() {
      var hero = new Hero("Joe");
      expect(typeof hero.constructor).to.eql("function");
      expect(Hero.length).to.eql(1);
    })

    it("can't call private method on object", function() {
      var hero = new Hero("SuperMan");
      expect(hero.myPrivateName()).to.eql("SuperMan");
      expect(hero._myPrivateName).to.be.undefined;
      var hero2 = new Hero("SpiderMan");
      hero.myPrivateName = function() { return "hello"; };
      expect(hero2.myPrivateName()).to.eql("SpiderMan");
      expect(hero.myPrivateName()).to.eql("hello");
    });

    it("can support method chaining", function() {
      var hero = new Hero("SuperMan").setOccupation("Programmer");
      expect(hero.myPrivateName().length).to.eql(8);
      expect(hero.getOccupation()).to.eql("Programmer");
    });

    it("can be made into JSON", function() {
      var hero = new Hero("SuperMan").setOccupation("SuperHero");
      var asJson = hero.asJSONString();
      var expectedRawJSONString = '{"name":"SuperMan","occupation":"SuperHero"}';
      expect(asJson).to.eql(expectedRawJSONString);
      var expectedJSON = JSON.parse(asJson);
      expect(expectedJSON).to.eql({name: "SuperMan", occupation: "SuperHero"});
    });
    it("supports private variables", function() {
      var hero = new Hero("SuperMan").setOccupation("SuperHero");
      var hero2 = new Hero("SpiderMan");
      expect(hero.getOccupation()).to.eql("SuperHero");
      expect(hero2.getOccupation()).to.eql("Ninja");
    });

	});


  describe("base Object", function() {
    it("supports toString method", function() {
      var o = new Object();
      expect(o.toString()).to.eql("[object Object]");
    });

    it("supports valueOf method", function() {
      var o = new Object();
      expect(o === o.valueOf()).to.be.true;
    });
  });

  describe("Function", function() {
    it("supports creating function inline", function() {
      var sum = new Function("a", "b", "return a + b");
      expect(sum(1,2)).to.eql(3);
    })
  });
});

describe("Superman", function() {
  it("uses the singleton pattern", function() {
    var super1 = new Hero.Superman();
    var super2 = new Hero.Superman();
    expect(super1).to.equal(super2);
  });

  it("can fly", function() {
    var super1 = new Hero.Superman();
    expect(super1.isAbleToFly()).to.be.true;
  });

});

describe("basic iteration example", function() {
  it("creates a url iterating all properties using for-in loop", function() {
    var params = { productId: 100, section: "Products"};
    var url = "http://example.org/page.php?", i, query = [];
    for (i in params) {
      query.push(i + "=" + params[i]);
    }
    url+= query.join('&');
    expect(url).to.eql("http://example.org/page.php?productId=100&section=Products");
  });
});

describe("shape test examples", function() {
  var shape = {
    type: '',
    getType: function() {
      return this.type;
    }
  };
  function Triangle(a, b, c) { this.a = a; this.b = b; this.c = c};
  Triangle.prototype = shape;
  Triangle.prototype.getPerimeter = function() { return (this.a + this.b + this.c); };
  Triangle.prototype.constructor = Triangle;

  it("verifies the prototype correctly", function() {
    var tri = new Triangle(1,2,3);
    expect(tri.constructor === Triangle).to.be.true;
    expect(shape.isPrototypeOf(tri)).to.be.true;
    tri.type = 'Triangle';
    expect(tri.getType()).to.eql("Triangle");
    expect(tri.getPerimeter()).to.eql(6);
  });

  it("only shows tri props", function() {
    var tri = new Triangle(1,2,3);
    var tri_props = [];
    for (var prop in tri) {
     if(tri.hasOwnProperty(prop)) {
        tri_props.push(prop);
     }
    }
    expect(tri_props).to.eql(['a', 'b','c']);
  });

});
