import express from 'express';
import bodyParser from 'body-parser';
import {readFile, access} from 'fs';
import {join} from 'path';

import api from './server/api-router';

const app = express();

app.use(bodyParser.json());

app.use('/api', api);

readFile('./server/secret', 'utf8', (err, secret) => {
  if (err || secret.trim() === '') {
    throw new Error('Make sure you have secret at ./server/secret');
  }
  app.set('secret', secret);
});

const staticPath = join(__dirname, '/static/');

app.all('/*', (req, res) => {
  const reqPath = staticPath + req.path.split('/').pop();
  access(reqPath, err => res.sendFile(err ? staticPath : reqPath));
});

export default app;
