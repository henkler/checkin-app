import React from 'react';
import { mount } from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Routes } from '/client/imports/startup/routes.jsx';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

Meteor.startup(() => {
  mount(Routes);
});
