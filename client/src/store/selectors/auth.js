import { get } from 'lodash';

export const selectLoggedIn = (state) => !!get(state,  'auth.user');

export const selectAuthStatus = (state) => get(state, 'auth.status');
 
export const selectAuthError = (state) => get(state, 'auth.error');