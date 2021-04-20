/* eslint-disable class-methods-use-this */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Store from '~/common/stores';
import App from '~/App';
import * as serviceWorker from '~/serviceWorker';

import '~/index.css';
import '~/assets/scss/material-kit-react.scss?v=1.8.0';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#83bcfa',
      main: '#4e8cc7',
      dark: '#035f96',
    },
    secondary: {
      light: '#fa5788',
      main: '#c2185b',
      dark: '#8c0032',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 61,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"NanumGothic","Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: '1.72rem',
      },
    },
  },
});

const store = new Store();

class LocalizedUtils extends MomentUtils {
  getDatePickerHeaderText(date) {
    return date.format('MMM Do (dd)');
  }

  getDateTimePickerHeaderText(date) {
    return date.format('MMM Do');
  }
}

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
