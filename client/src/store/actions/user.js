import { createAction } from 'redux-actions';
import * as CONSTANTS from 'store/constants/user';

export const getUsers = createAction(CONSTANTS.GET_USERS.REQUEST);
export const getUsersSuccess = createAction(CONSTANTS.GET_USERS.SUCCESS);
export const getUsersFailure = createAction(CONSTANTS.GET_USERS.FAILURE);

export const createUser = createAction(CONSTANTS.CREATE_USER.REQUEST);
export const createUserSuccess = createAction(CONSTANTS.CREATE_USER.SUCCESS);
export const createUserFailure = createAction(CONSTANTS.CREATE_USER.FAILURE);

export const updateUser = createAction(CONSTANTS.UPDATE_USER.REQUEST);
export const updateUserSuccess = createAction(CONSTANTS.UPDATE_USER.SUCCESS);
export const updateUserFailure = createAction(CONSTANTS.UPDATE_USER.FAILURE);

export const deleteUser = createAction(CONSTANTS.DELETE_USER.REQUEST);
export const deleteUserSuccess = createAction(CONSTANTS.DELETE_USER.SUCCESS);
export const deleteUserFailure = createAction(CONSTANTS.DELETE_USER.FAILURE);