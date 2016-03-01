import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '/client/imports/components/app.jsx';
import { Home } from '/client/imports/components/home.jsx';

export const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
    </Route>
  </Router>
);
