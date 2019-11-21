import checkPropTypes from 'check-prop-types';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';

export const checkProps = (component, expectedProps) => {
  const propsError = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsError;
};


export const randomIdGenerator = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const renderWithRouter = (
  ui,
  {
    initialState = {},
    store = createStore(() => {}, initialState),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route]})
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>,
    ),
    store
  }
}

export const currencyOptions = ['BGN', 'USD', 'EUR'];