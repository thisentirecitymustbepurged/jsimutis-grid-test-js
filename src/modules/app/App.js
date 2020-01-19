
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { Grid } from 'modules';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue
  }
});

export const App = () => <ThemeProvider theme={theme}><Grid /></ThemeProvider>;
