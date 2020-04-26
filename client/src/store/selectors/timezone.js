import { get } from 'lodash';

export const selectTimezones = (state) => get(state, 'timezone.timezones.data');

export const selectTimezoneTotal = (state) => get(state, 'timezone.timezones.total');

export const selectTimezonePageNo = (state) => get(state, 'timezone.timezones.pageNo');

export const selectTimezoneStatus = (state) => get(state, 'timezone.status');

export const selectTimezoneError =(state) => get(state, 'timezone.error');
