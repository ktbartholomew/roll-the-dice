var angular = require('angular');
var _ = require('lodash');

module.exports = 'app.services.groups';

angular.module(module.exports, [
  require('angular-resource'),
])
.factory('Groups', function ($resource) {
  var Groups = $resource('/api/groups/:groupId');

  return Groups;
});