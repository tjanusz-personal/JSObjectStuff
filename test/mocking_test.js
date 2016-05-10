var assert = require('assert');
var Hero = require("../hero.js");
var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

// TO run these tests
// ./node_modules/mocha/bin/mocha

describe('UsingSinonToSpyMockAndStubMethods', function() {

  describe("hero object can be spied", function() {

		it("can spy on an existing method", function() {
      var hero = new Hero();
      var spy = sinon.spy(hero, "myPrivateName");
      hero.myPrivateName();
      sinon.assert.called(spy);
      sinon.assert.calledOnce(spy);
		});

    it("can spy existing method and see arguments sent", function() {
      var hero = new Hero();
      var spy = sinon.spy(hero, "setOccupation");
      hero.setOccupation("Bus Driver");
      expect(spy.calledWith("Bus Driver")).to.be.true;
    });

    it("can spy existing method and see arguments sent across multiple invocations", function() {
      var hero = new Hero();
      var spy = sinon.spy(hero, "setOccupation");
      hero.setOccupation("Bus Driver");
      hero.setOccupation("Cab Driver");
      expect(spy.getCall(0).args[0]).to.eql("Bus Driver");
      expect(spy.getCall(1).args[0]).to.eql("Cab Driver");
    });

    it("can spy existing method and see arguments sent using withArgs syntax", function() {
      var hero = new Hero();
      var spy = sinon.spy(hero, "setOccupation");
      spy.withArgs("Bus Driver");
      spy.withArgs("Cab Driver");
      hero.setOccupation("Bus Driver");
      expect(spy.withArgs("Bus Driver").calledOnce).to.be.true;
      hero.setOccupation("Cab Driver");
      expect(spy.withArgs("Cab Driver").calledOnce).to.be.true;
    });

    it("can use spyCall to look at details of invocation", function() {
      var hero = new Hero();
      var spy = sinon.spy(hero, "setOccupation");
      hero.setOccupation("Bus Driver");
      var theCall = spy.getCall(0);
      expect(theCall.calledWith("Bus Driver")).to.be.true;
      expect(theCall.calledWithExactly("Bus Driver")).to.be.true;
      expect(theCall.exception).to.be.undefined;
      expect(theCall.returnValue).to.be.instanceof(Hero); // setter returns object!
    });
  });

  describe("hero object can be stubbed", function() {

    it("can stub an existing method to return a different value", function() {
      var hero = new Hero("Test");
      expect(hero.myPrivateName()).to.eql("Test");
      var theStub = sinon.stub(hero, "myPrivateName");
      theStub.returns("StubbedMethod");
      expect(hero.myPrivateName()).to.eql("StubbedMethod");
    });

    it("can stub existing method multiple times", function() {
      var hero = new Hero("Test");
      var theStub = sinon.stub(hero, "myPrivateName");
      theStub.onFirstCall().returns("FirstCall");
      theStub.onSecondCall().returns("SecondCall");
      expect(hero.myPrivateName()).to.eql("FirstCall");
      expect(hero.myPrivateName()).to.eql("SecondCall");
    });

    it("can stub an existing method to throw an error", function() {
      var hero = new Hero("Test");
      expect(hero.myPrivateName()).to.eql("Test");
      sinon.stub(hero, "myPrivateName").throws("ReferenceError");
      // need to pass function (not execute the function) to the expect clause
      expect(hero.myPrivateName).to.throw(Error);
    });
  });

  describe("hero object can be mocked", function() {

    it("can mock existing method is expected to be invoked", function() {
      var hero = new Hero("Test");
      expect(hero.myPrivateName()).to.eql("Test");
      var theMock = sinon.mock(hero);
      theMock.expects("myPrivateName").twice();
      var theResult = hero.myPrivateName();
      var theResult = hero.myPrivateName();
      expect(theResult).to.be.undefined;
      theMock.verify();
    });

  });

});
