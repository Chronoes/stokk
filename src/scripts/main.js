import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {createHistory} from 'history';

import routes from './routes';

function main() {
  const target = document.getElementById('target');
  render(<Router history={createHistory()}>{routes}</Router>, target);
}

window.onload = main;
