var angular = require('angular');
var _ = require('lodash');

module.exports = 'app.services.roller';

angular.module(module.exports, [])
.factory('roller', function () {
  return {
    DICE: [2,4,6,8,10,12,20,100],
    roll: function (die) {
      die = parseInt(die);
      
      if(! _.includes(this.DICE, die)) {
        throw 'd' + die +' is not a valid die.';
      }

      return _.random(1, die);
    }
  };
});