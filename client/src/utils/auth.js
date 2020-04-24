import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import {
  selectLoggedIn,
  selectIsAdmin,
  selectIsManager,
  selectIsUser,
} from 'store/selectors/auth';

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !selectLoggedIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  authenticatedSelector: (state) => selectLoggedIn(state),
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsAdminOrManager = connectedRouterRedirect({
  redirectPath: '/not-found',
  allowRedirectBack: false,
  authenticatedSelector: (state) => selectIsManager(state) || selectIsAdmin(state),
  wrapperDisplayName: 'UserIsAdminOrManager',
});

export const userIsAdminOrUser = connectedRouterRedirect({
  redirectPath: '/not-found',
  allowRedirectBack: false,
  authenticatedSelector: (state) => selectIsUser(state) || selectIsAdmin(state),
  wrapperDisplayName: 'UserIsAdminOrUser',
});