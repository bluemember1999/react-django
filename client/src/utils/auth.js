import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectLoggedIn } from 'store/selectors/auth';

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: (state) => !selectLoggedIn(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});