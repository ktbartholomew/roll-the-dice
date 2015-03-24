var express = require('express');
var redis = require('../../stores/redis');
var groups = require('../../stores/groups');
var Q = require('q');
var _ = require('lodash');

var router = express.Router();

router.get('*', function (req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

router.get('/', function (req, res) {
  Q.ninvoke(redis, 'get', 'groups')
  .then(function (groups) {
    res.send(groups);
  });
});

router.get('/:groupId', function (req, res) {
  Q.ninvoke(redis, 'get', 'groups')
  .then(function (groups) {
    groups = JSON.parse(groups);
    var group = _.find(groups, {id: parseInt(req.params.groupId)});

    if(!group) {
      res.status(404);
      res.end();
      return;
    }

    res.send(JSON.stringify(group));

    return this;
  });
});

router.post('/', function (req, res) {
  Q.ninvoke(redis, 'get', 'groups:auto_increment')
  .then(function (increment) {
    increment = parseInt(increment) + 1;
    redis.set('groups:auto_increment', increment);

    this.newGroup = {
      id: increment,
      members: []
    };

    return this;
  })
  .then(function () {
    return Q.ninvoke(redis, 'get', 'groups');
  })
  .then(function (groups) {
    groups = JSON.parse(groups);
    groups.push(this.newGroup);

    redis.set('groups', JSON.stringify(groups));

    return this;
  })
  .then(function () {
    res.set('Location', '/api/groups/' + this.newGroup.id);
    res.send(this.newGroup);

    return this;
  })
  .done();
  
});

module.exports = router;