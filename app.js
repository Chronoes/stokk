import express from 'express';
import bodyParser from 'body-parser';
import {match} from 'react-router';

import api from './server/api-router';
import routes from './src/scripts/routes';
import {render} from './server/StaticRenderer';

const app = express();

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

app.get('/*', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send(render(renderProps));
    } else {
      res.status(404).send('Not found');
    }
  });
});

export default app;
