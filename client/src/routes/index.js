import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  Dashboard,
  UserPage,
  TimezonePage,
  Page404,
} from 'containers/pages';
import ScrollToTop from 'components/ScrollToTop';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAdminOrManager,
  userIsAdminOrUser,
} from 'utils/auth';

const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/timezone" component={userIsAdminOrUser(TimezonePage)} />
    <Route exact path="/user" component={userIsAdminOrManager(UserPage)} />
    <Route component={Page404} />
  </Switch>
);

const Routes = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/login" component={userIsNotAuthenticated(LoginPage)} />
        <Route exact path="/register" component={userIsNotAuthenticated(RegisterPage)} />
        <Route exact path="/" component={userIsAuthenticated(AuthenticatedRoutes)} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);

export default Routes;