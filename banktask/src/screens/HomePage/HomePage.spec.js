import React from 'react';
import HomePage from './HomePage';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { renderWithRouter } from '../../utils';

const mockStore = configureMockStore();

describe('Home page component ', () => {
    
  afterEach(cleanup);

  it('Should render a Home page component', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Home Page Component')).toBeInTheDocument();
  });

  it('Should render an accounts selector dropdown', () => {
    const { getByText } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByText('Select an account')).toBeInTheDocument();
  });

  it('Should render a money amount input field', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Money Amount Input Primitive')).toBeInTheDocument();
  });

  it('Should render a warning paragraph for the money amount input field', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Amount Warning Paragraph')).toBeInTheDocument();
  });

  it('Should render a transaction type dropdown', () => {
    const { getByText } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByText('Type')).toBeInTheDocument();
  });

  it('Should render a money amount input field', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Submit Button Primitive')).toBeInTheDocument();
  });

  it('Should render a current balance paragraph', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Current Balance Paragraph')).toBeInTheDocument();
  });

  it('Should render a warning paragraph for the transaction submit or account deletion', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Submit Warning Paragraph')).toBeInTheDocument();
  });

  it('Should render an "Add an account" button component', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Add Button Primitive')).toBeInTheDocument();
  });

  it('Should render a "Delete Account" button component', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Delete Button Primitive')).toBeInTheDocument();
  });

  it('Should render a TransactionsHistory component', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    expect(getByTestId('Transactions History Component Primitive')).toBeInTheDocument();
  });
});

describe('Money Amount Warning paragraph', () => {

  afterEach(cleanup);

  it('Should inform the user for incorect input by changing its text content', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: 'b' }});
    expect(getByTestId('Amount Warning Paragraph').textContent).toBe('Please follow the specified format!');
  });

  it('Should not show a warning after a correct input', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: mockStore()});
    fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '1' }});
    expect(getByTestId('Amount Warning Paragraph').textContent).toBe('');
  });
});


describe('Submit Warning paragraph', () => {

  afterEach(cleanup);

  const initialState = {
    accounts: {
      _u70nyuzcq: {
        id: '_u70nyuzcq',
        iban: 'BG12BUIN12341234567891',
        currency: 'BGN',
        balance: '5678.00',
        history: [
          {
            date: '05.01.2019',
            debit: '500.00',
            credit: ''
          }
        ]
      }
    }
  };

  const store = mockStore(initialState);

  it('Should inform the user if there is some missing or incorrect information about the transaction he wants to perform', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: store });
    fireEvent.click(getByTestId('Submit Button Primitive'), { button: 0 });
    expect(getByTestId('Submit Warning Paragraph').textContent).toBe('Please fill all the form fields correctly!');
  });

  it('Should not show a warning with correctly filled out fields', () => {
    const { getByTestId, getByText } = renderWithRouter(<HomePage/>, { store: store });
    fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
    fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
    fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '600' }});
    fireEvent.touchEnd(getByText('Type'), { button: 0 });
    fireEvent.click(getByText('Deposit'), { button: 0 });
    fireEvent.click(getByTestId('Submit Button Primitive'), { button: 0 });
    expect(getByTestId('Submit Warning Paragraph').textContent).toBe('');
  });

  it('Should inform the user that he has not chosen an account for deletion', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: store });
    fireEvent.click(getByTestId('Delete Button Primitive'), { button: 0 });
    expect(getByTestId('Submit Warning Paragraph').textContent).toBe('Please select an account to delete!');
  });

  it('Should not show a warning on deletion', () => {
    const { getByTestId, getByText } = renderWithRouter(<HomePage/>, { store: store });
    fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
    fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
    fireEvent.click(getByTestId('Delete Button Primitive'), { button: 0 });
    expect(getByTestId('Submit Warning Paragraph').textContent).toBe('');
  });

  describe('Current balance paragraph', () => {

    afterEach(cleanup);

    const initialState = {
      accounts: {
        _u70nyuzcq: {
          id: '_u70nyuzcq',
          iban: 'BG12BUIN12341234567891',
          currency: 'BGN',
          balance: '5678.00',
          history: [
            {
              date: '05.01.2019',
              debit: '500.00',
              credit: ''
            }
          ]
        }
      }
    };

    const store = mockStore(initialState);

    it('Should show the current balance of the chosen bank account', () => {
      const { getByTestId, getByText } = renderWithRouter(<HomePage/>, { store: store });
      fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
      fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
      expect(getByTestId('Current Balance Paragraph').textContent).toBe('Current balance: BGN 5678.00');
    });
  });  
});

describe('Transaction history section', () => {

  afterEach(cleanup);

  const initialState = {
    accounts: {
      _u70nyuzcq: {
        id: '_u70nyuzcq',
        iban: 'BG12BUIN12341234567891',
        currency: 'BGN',
        balance: '5678.00',
        history: [
          {
            date: '05.01.2019',
            debit: '500.00',
            credit: ''
          }
        ]
      }
    }
  };

  const store = mockStore(initialState);

  it('should only show the headers when an account is not selected', () => {
    const { getByTestId } = renderWithRouter(<HomePage/>, { store: store });
    expect(getByTestId('Date Column Header')).toBeInTheDocument();
    expect(getByTestId('Deposit Column Header')).toBeInTheDocument();
    expect(getByTestId('Withdraw Column Header')).toBeInTheDocument();
  });

  it('should show the correct account history when an account is selected', () => {
    const { getByTestId, getByText } = renderWithRouter(<HomePage/>, { store: store });
    fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
    fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
    expect(getByTestId('Date Column Header')).toBeInTheDocument();
    expect(getByTestId('Deposit Column Header')).toBeInTheDocument();
    expect(getByTestId('Withdraw Column Header')).toBeInTheDocument();
    expect(getByTestId('Date Cell 1').textContent).toBe('05.01.2019');
    expect(getByTestId('Debit Cell 1').textContent).toBe('500.00');
    expect(getByTestId('Credit Cell 1').textContent).toBe('');
  });
});