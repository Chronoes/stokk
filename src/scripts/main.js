import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {createHistory} from 'history';

import routes from './routes';

function main() {
  const target = document.getElementById('target');

  ReactDOM.render(<Router history={createHistory()}>{routes}</Router>, target);
}

window.onload = main;
