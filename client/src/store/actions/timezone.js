import { createAction } from 'redux-actions';
import * as CONSTANTS from 'store/constants/timezone';

export const getTimezones = createAction(CONSTANTS.GET_TIMEZONES.REQUEST);
export const getTimezonesSuccess = createAction(CONSTANTS.GET_TIMEZONES.SUCCESS);
export const getTimezonesFailure = createAction(CONSTANTS.GET_TIMEZONES.FAILURE);

export const createTimezone = createAction(CONSTANTS.CREATE_TIMEZONE.REQUEST);
export const createTimezoneSuccess = createAction(CONSTANTS.CREATE_TIMEZONE.SUCCESS);
export const createTimezoneFailure = createAction(CONSTANTS.CREATE_TIMEZONE.FAILURE);

export const updateTimezone = createAction(CONSTANTS.UPDATE_TIMEZONE.REQUEST);
export const updateTimezoneSuccess = createAction(CONSTANTS.UPDATE_TIMEZONE.SUCCESS);
export const updateTimezoneFailure = createAction(CONSTANTS.UPDATE_TIMEZONE.FAILURE);

export const deleteTimezone = createAction(CONSTANTS.DELETE_TIMEZONE.REQUEST);
export const deleteTimezoneSuccess = createAction(CONSTANTS.DELETE_TIMEZONE.SUCCESS);
export const deleteTimezoneFailure = createAction(CONSTANTS.DELETE_TIMEZONE.FAILURE);