var angular = require('angular');
var _ = require('lodash');

module.exports = 'app.states.group';

angular.module(module.exports, [
  require('../../directives/dice-model/dice-model')
])
.controller('GroupCtrl', function ($localStorage, roller, $scope, $stateParams) {
  var _ = require('lodash');
  var socket = require('socket.io-client')();

  $scope.clientId = $localStorage.clientId;
  $scope.members = [];
  $scope.member = {clientId: $scope.clientId};
  $scope.diceToRoll = [];
  $scope.rollValues = [];
  $scope.diceColor = $localStorage.diceColor || '#cc0000';

  socket.on('groups:update:members', function (data) {
    $scope.$apply(function () {
      $scope.members = data;
    });
  });

  socket.on('groups:update:rolls', function (data) {
    $scope.$apply(function () {

    });
  });

  var joinGroup = function () {
    socket.emit('groups:join', {
      groupId: $stateParams.groupId,
      clientId: $localStorage.clientId,
      clientName: $localStorage.clientName,
      diceColor: $localStorage.diceColor
    });
  };

  joinGroup();

  $scope.setClientName = function () {
    $localStorage.clientName = prompt('Enter your name:');
    joinGroup();
  };

  $scope.addDie = function (type) {
    $scope.diceToRoll.push(type);
  };

  $scope.removeDie = function (index) {
    $scope.diceToRoll.splice(index, 1);
  };

  $scope.removeAllDice = function (index) {
    $scope.diceToRoll = [];
  };

  $scope.$watch('diceColor', function (newValue, oldValue) {
    if (typeof newValue === 'undefined') {
      return;
    }
    $localStorage.diceColor = newValue;
    joinGroup();
  });

  $scope.roll = function () {
    $scope.rollValues = [];

    socket.emit('groups:roll', {
      groupId: $stateParams.groupId,
      clientId: $localStorage.clientId,
      dice: $scope.diceToRoll
    });

    _.forEach($scope.diceToRoll, function (die) {
      $scope.rollValues.push(roller.roll(die));
    });
  };
});