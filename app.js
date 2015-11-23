import express from 'express';
import bodyParser from 'body-parser';
import {readFile} from 'fs';
import {join} from 'path';

import api from './server/api-router';

const app = express();

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

readFile('./server/secret', 'utf8', (err, secret) => {
  if (err || secret.trim() === '') {
    throw new Error('Make sure you have secret at ./server/secret');
  }
  app.set('secret', secret);
});

app.get('/*', (req, res) => {
  // FIXME: make /stock/:id get correct files.
  res.sendFile(join(__dirname, '/static/index.html'));
});

export default app;
