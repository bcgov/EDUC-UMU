import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';

import './app/FontAwesome';

import store from './store/store';
import configureAxios from './store/authorizatinoInterceptor';
import userManager from './store/oidc-usermanager';

import Router from './router';

import '../styles/index.scss';

configureAxios();

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <Router />
    </OidcProvider>
  </Provider>,
  document.getElementById('root')
);