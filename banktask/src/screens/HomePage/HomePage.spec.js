import React from 'react';
import HomePage from './HomePage';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Home page component ', () => {
    
  afterEach(cleanup);

  it('Should render a Home page component', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Home Page Component')).toBeInTheDocument();
  });

  it('Should render an accounts selector dropdown', () => {
    const { getByText } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByText('Select an account')).toBeInTheDocument();
  });

  it('Should render a money amount input field', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Money Amount Input Primitive')).toBeInTheDocument();
  });

  it('Should render a warning paragraph for the money amount input field', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Amount Warning Paragraph')).toBeInTheDocument();
  });

  it('Should render a transaction type dropdown', () => {
    const { getByText } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByText('Type')).toBeInTheDocument();
  });

  it('Should render a money amount input field', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Submit Button Primitive')).toBeInTheDocument();
  });

  it('Should render a current balance paragraph', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Current Balance Paragraph')).toBeInTheDocument();
  });

  it('Should render a warning paragraph for the transaction submit or account deletion', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    expect(getByTestId('Submit Warning Paragraph')).toBeInTheDocument();
  });
});

describe('Money Amount Warning paragraph', () => {

  afterEach(cleanup);

  it('Should inform the user for incorect input by changing its text content', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
    fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: 'b' }});
    expect(getByTestId('Amount Warning Paragraph').textContent).toBe('Please follow the specified format!');
  });

  it('Should not show a warning after a correct input', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><HomePage/></Provider>);
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
        balance: '5678.00'
      }
    }
  };

  const store = mockStore(initialState);

  it('Should inform the user if there is some missing or incorrect information about the transaction he wants to perform', () => {
    const { getByTestId } = render(<Provider store={store}><HomePage/></Provider>);
    fireEvent.click(getByTestId('Submit Button Primitive'), { button: 0 });
    expect(getByTestId('Submit Warning Paragraph').textContent).toBe('Please fill all the form fields correctly!');
  });

  it('Should not show a warning with correctly filled out fields', () => {
    const { getByTestId, getByText } = render(<Provider store={store}><HomePage/></Provider>);
    fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
    fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
    fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '600' }});
    fireEvent.touchEnd(getByText('Type'), { button: 0 });
    fireEvent.click(getByText('Deposit'), { button: 0 });
    fireEvent.click(getByTestId('Submit Button Primitive'), { button: 0 });
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
          balance: '5678.00'
        }
      }
    };

    const store = mockStore(initialState);

    it('Should show the current balance of the chosen bank account', () => {
      const { getByTestId, getByText } = render(<Provider store={store}><HomePage/></Provider>);
      fireEvent.touchEnd(getByText('Select an account'), { button: 0 });
      fireEvent.click(getByText('BG12BUIN12341234567891'), { button: 0 });
      expect(getByTestId('Current Balance Paragraph').textContent).toBe('Current balance: BGN 5678.00');
    });
  });  
});