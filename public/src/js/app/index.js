var angular = require('angular');
var _ = require('lodash');

module.exports = 'app';

angular.module(module.exports, [
  require('angular-ui-router'),
  require('./shims/ng-storage'),
  require('./states'),
  require('./services')
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('app', {
    url: '/',
    views: {
      'app@': {
        controller: 'IndexCtrl',
        templateUrl: '/src/html/index.html'
      }
    }
  })
  .state('app.group', {
    url: 'groups/:groupId',
    views: {
      'app@': {
        controller: 'GroupCtrl',
        templateUrl: '/src/html/groups/index.html'
      }
    }
  });
})
.run(function ($stateParams, $localStorage) {
  var uuid = require('node-uuid');

  $localStorage.clientId = $localStorage.clientId || uuid.v4();
});