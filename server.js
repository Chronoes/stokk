var express = require('express');
var app = express();

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

var server = app.listen(1337, function () {
  var port = server.address().port;

  console.log('Listening on ' + port);
});