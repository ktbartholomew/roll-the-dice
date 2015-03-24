var client;
if (process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = require('redis').createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
}
else {
  client = require('redis').createClient();  
}

module.exports = client;