var express = require('express');
var app = express();
var api = require('./server/api-router');
var path = require('path');

app.use(express.static('static'));
app.use('/api', api);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

var server = app.listen(1337, function() {
  var port = server.address().port;

  console.log('Listening on ' + port);
});
