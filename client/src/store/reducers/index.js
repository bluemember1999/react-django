import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { userReducer } from './user';
import { timezoneReducer } from './timezone';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  timezone: timezoneReducer,
});

export default rootReducer;