import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer, middlewares } from '../redux/rootReducer';

export const findByTestAttribute = (component, attribute) => {
  const wrapper = component.find(`[data-testid='${attribute}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsError = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsError;
};

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}

export const randomIdGenerator = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}