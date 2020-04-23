import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import rootSaga from './middlewares';

export const history = createBrowserHistory();

const middleware = routerMiddleware(history)
const sagaMiddlware = createSagaMiddlware();
const middlewares = [middleware, sagaMiddlware];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({ collapsed: true });

  middlewares.push(loggerMiddleware);
}

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(...enhancers)
);

export default store;

sagaMiddlware.run(rootSaga);
