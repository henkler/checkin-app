import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';

const styles = {
    container: {
        textAlign: 'center',
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

// define and export our Layout component
export const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
      {props.children}
        </div>
    </MuiThemeProvider>
);
