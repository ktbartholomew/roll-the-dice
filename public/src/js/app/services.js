var angular = require('angular');

module.exports = 'app.services';

angular.module('app.services', [
  require('./services/roller'),
  require('./services/groups')
]);