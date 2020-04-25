import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import CustomLayout from 'containers/Layout';
import {
  LoginPage,
  RegisterPage,
  Dashboard,
  UserPage,
  // TimezonePage,
  // Page404,
} from 'containers/Pages';
import { ScrollToTop } from 'components';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAdminOrManager,
  userIsAdminOrUser,
} from 'utils/auth';

const UserHoc = userIsAdminOrManager(UserPage);

const AuthenticatedRoutes = () => (
  <CustomLayout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      {/* <Route path="/timezone" component={userIsAdminOrUser(TimezonePage)} /> */}
      <Route path="/user" component={UserHoc} />
      {/* <Route component={Page404} /> */}
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