import {
  get,
  isArray,
  indexOf,
  head,
  keys,
  capitalize,
} from 'lodash';

export const parseError = (error) => {
  const errRes = get(error, 'response.data');
  const status = get(error, 'response.status');

  if (!errRes) {
    return { message: 'There was an unexpected error', status };
  }

  if (isArray(errRes)) {
    return { message: head(errRes), status };
  }

  if (indexOf(keys(errRes), 'non_fields_errors') !== -1) {
    return { message: head(get(errRes, 'non_field_errors')), status };
  }

  const firstError = get(errRes, head(keys(errRes)));

  if (isArray(firstError)) {
    return { message: capitalize(firstError[0]), status };
  }

  return { message: firstError, status };
};