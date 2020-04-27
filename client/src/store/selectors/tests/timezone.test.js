import { get } from 'lodash';
import { TimezoneMock } from 'test/mocks';
import {
  selectTimezones,
  selectTimezoneTotal,
  selectTimezonePageNo,
  selectTimezoneStatus,
  selectTimezoneError,
} from '../timezone';

const mockState = {
  timezone: {
    timezones: {
      data: [TimezoneMock(1), TimezoneMock(2)],
      pageNo: 1,
      pageSize: 10,
      total: 2,
    },
    status: 'INIT',
    error: null,
  },
};

describe('TimezoneSelector', () => {
  it('should return timezone selectors', () => {
    const { timezone } = mockState;

    expect(selectTimezones(mockState)).toEqual(get(timezone, 'timezones.data'));
    expect(selectTimezoneTotal(mockState)).toEqual(get(timezone, 'timezones.total'));
    expect(selectTimezonePageNo(mockState)).toEqual(get(timezone, 'timezones.pageNo'));
    expect(selectTimezoneStatus(mockState)).toEqual(get(timezone, 'status'));
    expect(selectTimezoneError(mockState)).toEqual(get(timezone, 'error'));
  });
});