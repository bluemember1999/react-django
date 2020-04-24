import update from 'immutability-helper';
import { ErrorMock } from 'test/mocks';
import { parseError } from '../error-parser';

describe('Error Helpers', () => {
  it('parseError', () => {
    let error = ErrorMock();
    let errorRes = { message: error.response.data[0], status: error.response.status };

    expect(parseError(error)).toEqual(errorRes);

    error = update(ErrorMock(), { response: { data: {$set: null} } });
    errorRes = { message: 'There was an unexpected error', status: error.response.status };
    expect(parseError(error)).toEqual(errorRes);

    error = update(ErrorMock(), {
      response: {
        data: { $set: { non_field_errors: ['Invalid username or password'] } },
      },
    });
    errorRes = { message: error.response.data.non_field_errors[0], status: error.response.status };
    expect(parseError(error)).toEqual(errorRes);

    error = update(ErrorMock(), {
      response: {
        data: {
          $set: {
            email: ['Invalid', 'Required'],
            password: ['Mismatch'],
          },
        },
      },
    });
    errorRes = { message: error.response.data.email[0], status: error.response.status };
    expect(parseError(error)).toEqual(errorRes);
  });
});