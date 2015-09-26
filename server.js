const express = require('express');
const path = require('path');
const api = require('./server/api-router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

const server = app.listen(1337, () => {
  const port = server.address().port;

  console.log('Listening on ' + port);
});
