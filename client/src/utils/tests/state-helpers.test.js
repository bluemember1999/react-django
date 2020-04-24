import { gen } from '../state-helpers';

describe('State Helper', () => {
  it('gen', () => {
    const action = 'LOGIN';
    const res = {
      REQUEST: 'LOGIN_REQUEST',
      SUCCESS: 'LOGIN_SUCCESS',
      FAILURE: 'LOGIN_FAILURE',
    };

    expect(gen(action)).toEqual(res);
  });
});