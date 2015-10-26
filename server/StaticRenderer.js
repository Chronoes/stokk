import {renderToString} from 'react-dom/server';
import React from 'react';
import {readFileSync} from 'fs';
import {join} from 'path';
import {RoutingContext} from 'react-router';

import {isDev} from './util';

const indexHtml = readFileSync(join(__dirname, '/../static/index.html'));
const locationCache = {};

/* istanbul ignore next */
class StaticRenderer {
  static renderReactIsomorphic(html, reactString) {
    const targetNameDev = '<div id="target">';
    const targetNameMin = '<div id=target>';
    const targetName = isDev() ? targetNameDev : targetNameMin;
    const target = html.indexOf(targetName) + targetName.length;
    const start = html.slice(0, target);
    const end = html.slice(target);
    return start + reactString + end;
  }

  static renderPage(renderProps) {
    const reactString = renderToString(<RoutingContext {...renderProps} />);
    return StaticRenderer.renderReactIsomorphic(indexHtml, reactString);
  }

  static render(renderProps) {
    const {pathname} = renderProps.location;
    if (locationCache.hasOwnProperty(pathname)) {
      return locationCache[pathname];
    }
    const page = StaticRenderer.renderPage(renderProps);
    locationCache[pathname] = page;
    return page;
  }
}

export default StaticRenderer;
