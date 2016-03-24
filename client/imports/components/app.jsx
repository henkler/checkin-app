import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';

import { AccountsUIWrapper } from './accountsUIWrapper.jsx';

const styles = {
  container: {
    textAlign: 'center'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

// define and export our Layout component
export const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
        <AppBar
            title="Checkin App"
            iconElementRight={<AccountsUIWrapper />}
            zDepth={4}
        />
        {props.children}
      </div>
    </MuiThemeProvider>
);
