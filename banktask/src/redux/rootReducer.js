import { createStore, applyMiddleware, combineReducers } from 'redux';
import { handleHttpRequestsFlow } from './middlewares/axios';
import accounts from './modules/account/reducers';

export const rootReducer = combineReducers({accounts});

export const middlewares = [handleHttpRequestsFlow];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

export default store