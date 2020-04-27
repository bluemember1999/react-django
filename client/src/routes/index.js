import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CustomLayout from 'containers/Layout';
import {
  LoginPage,
  RegisterPage,
  UserPage,
  TimezonePage,
  Page404,
} from 'containers/Pages';
import { ScrollToTop } from 'components';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAdminOrManager,
} from 'utils/auth';

const UserHoc = userIsAdminOrManager(UserPage);

const AuthenticatedRoutes = () => (
  <CustomLayout>
    <Switch>
      <Redirect exact path="/" to="/timezone" />
      <Route path="/timezone" component={TimezonePage} />
      <Route path="/user" component={UserHoc} />
      <Route component={Page404} />
    </Switch>
  </CustomLayout>
);

const LoginHoc = userIsNotAuthenticated(LoginPage);
const RegisterHoc = userIsNotAuthenticated(RegisterPage);
const AuthenticatedHoc = userIsAuthenticated(AuthenticatedRoutes);

const Routes = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/login" component={LoginHoc} />
        <Route exact path="/register" component={RegisterHoc} />
        <Route path="/" component={AuthenticatedHoc} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);

export default Routes;