import express from 'express';
import bodyParser from 'body-parser';
import {readFile} from 'fs';
import {join} from 'path';
import glob from 'glob';

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

glob('**/*', {cwd: staticPath, nodir: true}, (err, files) => {
  if (err) {
    throw err;
  }

  app.all('/*', (req, res) => {
    const sanitizedPath = req.path.replace(/\/{2,}/, '/');
    const staticFiles = files.filter(file => sanitizedPath.includes(file));
    res.sendFile(staticFiles.length ? join(staticPath, staticFiles[0]) : staticPath);
  });
});

export default app;
