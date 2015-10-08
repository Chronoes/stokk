import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {readFileSync} from 'fs';
import {match, RoutingContext} from 'react-router';
import {createLocation} from 'history';
import {renderToString} from 'react-dom/server';
import React from 'react';

import api from './server/api-router';
import {renderReactIsomorphic} from './server/util';
import routes from './src/scripts/routes';

const app = express();
const indexHtml = readFileSync(path.join(__dirname, '/static/index.html'));

app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/api', api);

app.get('/*', (req, res) => {
  // FIXME: Once history fixed https://github.com/rackt/history/issues/90,
  // do not call createLocation statically.
  const location = createLocation(req.url);
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const reactString = renderToString(<RoutingContext {...renderProps} />);
      const reactPage = renderReactIsomorphic(indexHtml, reactString);
      res.status(200).send(reactPage);
    } else {
      res.status(404).send('Not found');
    }
  });
});

export default app;
