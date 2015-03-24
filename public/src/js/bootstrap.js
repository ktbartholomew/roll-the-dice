var angular = require('angular');

module.exports = {
  init: function () {
    angular.bootstrap(document, [require('./app/index')]);
  }
};