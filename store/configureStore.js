import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux'

import promiseMiddleware from '../middleware/promiseMiddleware';
import loggerMiddleware from 'redux-logger';
import * as reducers from '../reducers/';
import { reducer as formReducer } from 'redux-form'
import app from '../reducers/app'
const reducer = combineReducers({...reducers.default, routing:routerReducer, form:formReducer });
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware
)(createStore);

export default function configureStore(initialState) {
	const store =  createStoreWithMiddleware(
                  reducer, 
                  initialState,
                 window.devToolsExtension && window.devToolsExtension()
                );
	if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
	return store;
}