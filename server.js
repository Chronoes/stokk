process.env.NODE_ENV = 'development';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./server/api-router');
const database = require('./server/database');

const app = express();

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

if (!module.parent) {
  database.sync().then(() => {
    const server = app.listen(1337, () => {
      const port = server.address().port;

      /* eslint-disable */
      console.log('Listening on ' + port);
      /* eslint-enable */
    });
  });
}

module.exports = app;
