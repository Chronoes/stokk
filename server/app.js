import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import api from './api-router';

const app = express();

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

export default app;
