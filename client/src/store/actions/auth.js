import { createAction } from 'redux-actions';
import * as CONSTANTS from 'store/constants/auth';

export const logIn = createAction(CONSTANTS.LOGIN.REQUEST);
export const logInSuccess = createAction(CONSTANTS.LOGIN.SUCCESS);
export const logInFailure = createAction(CONSTANTS.LOGIN.FAILURE);

export const register = createAction(CONSTANTS.REGISTER.REQUEST);
export const registerSuccess = createAction(CONSTANTS.REGISTER.SUCCESS);
export const registerFailure = createAction(CONSTANTS.LOGIN.FAILURE);

