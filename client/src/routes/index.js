import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
} from 'containers/pages';
import ScrollToTop from 'components/ScrollToTop';
import { userIsNotAuthenticated } from 'utils/auth.js';

const Routes = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/login" component={userIsNotAuthenticated(LoginPage)} />
        <Route exact path="/register" component={userIsNotAuthenticated(RegisterPage)} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);

export default Routes;