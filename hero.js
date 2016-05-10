// JS class to hold all object definitions and methods

  function Hero(name) {
    this.name = name;
    var _myPrivateName = function() {
      return this.name;
    };

    var occupation = "Ninja";
    var _setOccupation = function(newOccupation) {
      occupation = newOccupation;
      return this;
    }
    var _getOccupation = function() {
      return occupation;
    }

    this.myPrivateName = _myPrivateName;
    this.setOccupation = _setOccupation;
    this.getOccupation = _getOccupation;

    this.asJSONString = function() {
      return JSON.stringify( { name: this.name, occupation: occupation});
    }
  }

  function Superman() {
    if (Superman.single_instance == undefined) {
      Superman.single_instance = this;
    }

    var canFly = true;
    var getCanFly = function() {
      return canFly;
    }
    Superman.single_instance.isAbleToFly = getCanFly;
    return Superman.single_instance;
  }

  module.exports = Hero;
  module.exports.Superman = Superman;
