import React from 'react';
import NewAccountPage from './NewAccountPage';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { renderWithRouter } from '../../utils';

const mockStore = configureMockStore();

describe('(NewAccountPage) component', () => {
  describe('is rendering', () => {
    afterEach(cleanup);

    it('IBAN input field', () => {
      const { getByTestId } = renderWithRouter(<NewAccountPage/>, { store: mockStore() });
      expect(getByTestId('Account IBAN field Primitive')).toBeInTheDocument();
    });

    it('example IBAN paragraph', () => {
      const { getByTestId } = renderWithRouter(<NewAccountPage/>, { store: mockStore() });
      expect(getByTestId('Example IBAN paragraph')).toBeInTheDocument();
    });

    it('currency selector dropdown', () => {
      const { getByText } = renderWithRouter(<NewAccountPage/>, { store: mockStore() });
      expect(getByText('Select a currency')).toBeInTheDocument();
    });

    it('"Add" button', () => {
      const { getByTestId } = renderWithRouter(<NewAccountPage/>, { store: mockStore() });
      expect(getByTestId('Create Page Add Account Button Primitive')).toBeInTheDocument();
    });

    it('"Back" button', () => {
      const { getByTestId } = renderWithRouter(<NewAccountPage/>, { store: mockStore() });
      expect(getByTestId('Back Button Primitive')).toBeInTheDocument();
    });
  });

  describe('Display warning on creation of a new account', () => {

    const initialState = {
      accounts: {
        _u70nyuzcq: {
          id: '_u70nyuzcq',
          iban: 'BG12BUIN12341234567891',
          currency: 'BGN',
          balance: '5678.00'
        }
      }
    };
  
    const store = mockStore(initialState);

    it('Should warn about correct form submit', () => {
      const { getByTestId } = renderWithRouter(<NewAccountPage/>, { store: store });
      expect(getByTestId('validation-warning').textContent).toBe('');
      fireEvent.click(getByTestId('Create Page Add Account Button Primitive'), { button: 0 });
      expect(getByTestId('validation-warning').textContent).toBe('Please fill in the form correctly!');
    });

    it('Should not show a warning with correctly filled out fields', () => {
    const { getByTestId, getByText } = renderWithRouter(<NewAccountPage/>, { store: store });
    fireEvent.change(getByTestId('Account IBAN field Primitive'), { target: { value: 'BG23BUIN45678901234567' }});
    fireEvent.touchEnd(getByText('Select a currency'), { button: 0 });
    fireEvent.click(getByText('BGN'), { button: 0 });
    fireEvent.click(getByTestId('Create Page Add Account Button Primitive'), { button: 0 });
    expect(getByTestId('validation-warning').textContent).toBe('');
    });

    it('Should tell the user that the specified IBAN is already taken', () => {
    const { getByTestId, getByText } = renderWithRouter(<NewAccountPage/>, { store: store });
    fireEvent.change(getByTestId('Account IBAN field Primitive'), { target: { value: 'BG12BUIN12341234567891' }});
    fireEvent.touchEnd(getByText('Select a currency'), { button: 0 });
    fireEvent.click(getByText('BGN'), { button: 0 });
    fireEvent.click(getByTestId('Create Page Add Account Button Primitive'), { button: 0 });
    expect(getByTestId('validation-warning').textContent).toBe('This account IBAN is already taken!');
    });
  });
});