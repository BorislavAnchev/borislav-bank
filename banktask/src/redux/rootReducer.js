import { createStore, applyMiddleware, combineReducers } from 'redux';
import accounts from './modules/account/reducers';

export const rootReducer = combineReducers({accounts});

export const middlewares = [];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

export default store