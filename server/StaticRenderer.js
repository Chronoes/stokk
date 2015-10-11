import {renderToString} from 'react-dom/server';
import React from 'react';
import {readFileSync} from 'fs';
import {join} from 'path';
import {RoutingContext} from 'react-router';

import {renderReactIsomorphic} from './util';

class StaticRenderer {
  static indexHtml = readFileSync(join(__dirname, '/../static/index.html'));
  static locationCache = {};

  static renderPage(renderProps) {
    const reactString = renderToString(<RoutingContext {...renderProps} />);
    return renderReactIsomorphic(StaticRenderer.indexHtml, reactString);
  }

  static render(renderProps) {
    const {pathname} = renderProps.location;
    const {locationCache} = StaticRenderer;
    if (locationCache.hasOwnProperty(pathname)) {
      return locationCache[pathname];
    }
    const page = StaticRenderer.renderPage(renderProps);
    locationCache[pathname] = page;
    return page;
  }
}

export default StaticRenderer;
