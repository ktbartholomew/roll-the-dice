var Q = require('q');
var _ = require('lodash');
var redis = require('./stores/redis');

module.exports = function (io) {
  io.on('connect', function (socket) {
    var socketData = {};
    console.log('somebody connected');

    socket.on('groups:join', function (data) {
      console.log('Client %s joined.', data.clientId);

      socketData.clientId = data.clientId;
      socketData.groupId = data.groupId;

      Q.ninvoke(redis, 'get', 'groups')
      .then(function (groups) {
        this.groups = JSON.parse(groups);
        this.groupIndex = _.findIndex(this.groups, {id: parseInt(data.groupId)});

        return this;
      })
      .then(function () {
        this.groups[this.groupIndex].members =
          this.groups[this.groupIndex].members || [];

        if (_.findWhere(this.groups[this.groupIndex].members, {clientId: data.clientId})) {
          var memberIndex = _.findIndex(this.groups[this.groupIndex].members, {clientId: data.clientId});
          this.groups[this.groupIndex].members[memberIndex].clientId = data.clientId;
          this.groups[this.groupIndex].members[memberIndex].clientName = data.clientName;
          this.groups[this.groupIndex].members[memberIndex].diceColor = data.diceColor;

          return this;
        }

        var newMember = {
          clientId: data.clientId,
          clientName: data.clientName,
          diceColor: '#cc0000'
        };

        this.groups[groupIndex].members.push(newMember);
        return this;
      })
      .then(function () {
        redis.set('groups', JSON.stringify(this.groups));

        return this;
      })
      .then(function () {
        console.log('emitting groups:update:members');
        io.emit('groups:update:members', this.groups[groupIndex].members);
      })
      .done();
    });

    socket.on('groups:roll', function (roll) {
      var roller = require('./services/roller');

      Q.ninvoke(redis, 'get', 'groups')
      .then(function (groups) {
        this.groups = JSON.parse(groups);
        this.groupIndex = _.findIndex(this.groups, {id: parseInt(roll.groupId)});
        this.clientIndex = _.findIndex(this.groups[this.groupIndex].members, {clientId: roll.clientId});

        return this;
      })
      .then(function () {
        var rolls = [];
        _.forEach(roll.dice, function (die) {
          rolls.push({
            die: die,
            value: roller.roll(die)
          });
        });

        this.groups[this.groupIndex].members[this.clientIndex].rolls = rolls;
        console.log(this.groups[this.groupIndex].members[this.clientIndex].rolls);

        return this;
      })
      .then(function () {
        redis.set('groups', JSON.stringify(this.groups));

        return this;
      })
      .then(function () {
        console.log('emitting groups:update:members');
        io.emit('groups:update:members', this.groups[groupIndex].members);
      })
      .done();
    });

    socket.on('disconnect', function () {
      if(typeof socketData.clientId === 'undefined') {
        return;
      }
      
      console.log('Client %s left.', socketData.clientId);

      Q.ninvoke(redis, 'get', 'groups')
      .then(function (groups) {
        this.groups = JSON.parse(groups);
        this.groupIndex = _.findIndex(this.groups, {id: parseInt(socketData.groupId)});

        return this;
      })
      .then(function () {
        this.groups[this.groupIndex].members =
          this.groups[this.groupIndex].members || [];


        this.groups[groupIndex].members =
          _.reject(this.groups[this.groupIndex].members, {clientId: socketData.clientId});

        console.log(this.groups[this.groupIndex].members);
        return this;
      })
      .then(function () {
        redis.set('groups', JSON.stringify(this.groups));

        return this;
      })
      .then(function () {
        console.log('emitting groups:update:members');
        io.emit('groups:update:members', this.groups[groupIndex].members);
      })
      .done();
    });
  });
};  