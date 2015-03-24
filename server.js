(function () {
  'use strict';

  var express = require('express');
  var Q = require('q');
  var redis = require('app/stores/redis');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  
  require('./app/socket')(io);

  Q.ninvoke(redis, 'get', 'groups')
  .then(function (groups) {
    if(!groups) {
      redis.set('groups', JSON.stringify([]));
    }
  });

  Q.ninvoke(redis, 'get', 'groups:auto_increment')
  .then(function (value) {
    if(!value) {
      redis.set('groups:auto_increment', 1000);
    }
  });

  // Serve static files from the public directory
  app.use(express.static('public'));

  app.get('!^/api', function(request, response, next) {
    response.sendfile(__dirname + '/public/index.html');
  });

  app.use('/api/groups', require('./app/routes/groups/index'));

  server.listen(3000);
})();