var angular = require('angular');
var _ = require('lodash');

module.exports = 'app.states.group';

angular.module(module.exports, [
  require('../../directives/dice-model/dice-model')
])
.controller('GroupCtrl', function ($localStorage, roller, $scope, $stateParams, $timeout) {
  var _ = require('lodash');
  var socket = require('socket.io-client')();

  $scope.clientId = $localStorage.clientId;
  $scope.members = [];
  $scope.member = {clientId: $scope.clientId};
  $scope.diceToRoll = [];
  $scope.diceColor = $localStorage.diceColor || '#cc0000';
  $scope.roll = {
    disabled: false,
    time: new Date(),
    values: [],
  };

  socket.on('groups:update:members', function (data) {
    $scope.$apply(function () {
      $scope.members = getRollStats(data);
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

  var getRollStats = function (data) {
    _.forEach(data, function (member, index, array) {
      array[index].rollStats = {
        dc: (_.find(member.rolls, {die: 20})) ?
          _.find(member.rolls, {die: 20}).value :
          null,
        sum: _.sum(_.map(member.rolls, 'value'))
      };
    });

    return data;
  }

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
    $scope.roll.time = new Date();
    $scope.roll.disabled = true;
    $scope.roll.values = [];

    socket.emit('groups:roll', {
      groupId: $stateParams.groupId,
      clientId: $localStorage.clientId,
      dice: $scope.diceToRoll
    });

    _.forEach($scope.diceToRoll, function (die) {
      $scope.roll.values.push(roller.roll(die));
    });

    $timeout(function () {
      $scope.roll.disabled = false;
    }, 1500)
  };
});