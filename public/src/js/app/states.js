var angular = require('angular');

module.exports = 'app.states';

angular.module('app.states', [
  require('./states/index'),
  require('./states/group/index')
]);