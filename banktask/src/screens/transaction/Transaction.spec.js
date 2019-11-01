import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAttribute, testStore } from '../../utils';
import Transaction from './Transaction';
import { fireEvent, render, cleanup } from '@testing-library/react';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(<Provider store={store}><MemoryRouter><Transaction /></MemoryRouter></Provider>); // Mount insdead of shallow with Provider arround solves the problem.
  return wrapper;
}

describe('Transaction component ', () => {

    let wrapper;
    beforeEach(() => {
      const initialState = {
        accounts: {
          _u70nyuzcq: {
            id: '_u70nyuzcq',
            iban: 'BG12BUIN12341234567891',
            currency: 'BGN',
            balance: '5678.00',
            history: [
              {
                date: '05.01.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.02.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.03.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.04.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.05.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.06.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.07.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.08.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.09.2018',
                debit: '500.00',
                credit: ''
              },
              {
                date: '05.10.2018',
                debit: '500.00',
                credit: ''
              }
            ]
          },
          _wi2ozmsx9: {
            id: '_wi2ozmsx9',
            iban: 'BG12BUIN12341234567892',
            currency: 'USD',
            balance: '3456.00',
            history: [
              {
                date: '05.01.2019',
                debit: '500.00',
                credit: ''
              },
              {
                date: '06.01.2019',
                debit: '',
                credit: '500.00'
              },
              {
                date: '05.02.2019',
                debit: '500.00',
                credit: ''
              },
              {
                date: '06.02.2019',
                debit: '',
                credit: '500.00'
              },
              {
                date: '05.03.2019',
                debit: '500.00',
                credit: ''
              },
            ]
          },
          _bousuqei6: { id: '_bousuqei6', iban: 'BG12BUIN12341234567893', currency: 'EUR', balance: '2345.00', history: [] }
        }
      };
      wrapper = setUp(initialState);
    });
    
    afterEach(cleanup);

    it('Should render a transaction section component', () => {
      const transactionSection = findByTestAttribute(wrapper, 'transactionComponent');
      expect(transactionSection.length).toBe(1);
    });

    it('Should containt a button component', () => {
      const button = findByTestAttribute(wrapper, 'buttonComponentParent');
      expect(button.length).toBe(1);
    });

    it('Should contain an account selector dropdown component', () => {
      const accountDropdown = findByTestAttribute(wrapper, 'Account Selector');
      expect(accountDropdown.length).toBe(1);
    });
    it('Should contain an transaction type dropdown component', () => {
      const transactionDropdown = findByTestAttribute(wrapper, 'Transaction Selector');
      expect(transactionDropdown.length).toBe(1);
    });

    describe('Money amount input field component', () => {
      it('Should contain a money amount input field component', () => {
        const moneyInput = findByTestAttribute(wrapper, 'Money Amount Input');
        expect(moneyInput.length).toBe(1);
        expect(moneyInput.props().placeholder).toBe('Format: 500.00');
      });

      it('Should update the amount warning div on incorrect input', () => {
        const { getByTestId } = render(<Provider store={testStore({})}><MemoryRouter><Transaction /></MemoryRouter></Provider>);
        expect(getByTestId('Amount Warning Paragraph').textContent).toBe('');
        fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '123' }});
        expect(getByTestId('Money Amount Input Primitive').value).toBe('123');
        fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: 'b' }});
        expect(getByTestId('Amount Warning Paragraph').textContent).toBe('Please follow the specified format!');
        expect(getByTestId('Money Amount Input Primitive').value).toBe('123');
        
        // After correct input the input warning should disappear.
        fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '4' }});
        expect(getByTestId('Money Amount Input Primitive').value).toBe('4');
        expect(getByTestId('Amount Warning Paragraph').textContent).toBe('');
      });

      it('Should not update the amount warning div on correct input', () => {
        const { getByTestId } = render(<Provider store={testStore({})}><MemoryRouter><Transaction /></MemoryRouter></Provider>);
        expect(getByTestId('Amount Warning Paragraph').textContent).toBe('');
        fireEvent.change(getByTestId('Money Amount Input Primitive'), { target: { value: '123' }});
        expect(getByTestId('Money Amount Input Primitive').value).toBe('123');
        expect(getByTestId('Amount Warning Paragraph').textContent).toBe('');
      });
    });
    
    it('Should contain a current balance paragraph', () => {
      const currentBalance = findByTestAttribute(wrapper, 'currentBalance');
      expect(currentBalance.length).toBe(1);
    });

    describe('Submit Warning paragraph', () => {
      it('Should contain a submit warning paragraph', () => {
        const submitWarning = findByTestAttribute(wrapper, 'submitWarning');
        expect(submitWarning.length).toBe(1);
      });

      it('The submit warning should update correctly', () => {
        const { getByTestId } = render(<Provider store={testStore({})}><MemoryRouter><Transaction /></MemoryRouter></Provider>);
        expect(getByTestId('submitWarning').textContent).toBe('');
        // Try to submit without choosing and account.
        fireEvent.click(getByTestId('buttonComponentParent Primitive'), { button: 1 });
        expect(getByTestId('submitWarning').textContent).toBe('Please fill all the form fields correctly!');
      });
    });
    
    describe('Delete account button', () => {
      it('Should contain a delete button component paragraph', () => {
        const deleteButton = findByTestAttribute(wrapper, 'deleteButtonComponent');
        expect(deleteButton.length).toBe(1);
        expect(deleteButton.props().buttonText).toBe('Delete Account');
      });

      it('The submit warning should update correctly', () => {
        const { getByTestId } = render(<Provider store={testStore({})}><MemoryRouter><Transaction /></MemoryRouter></Provider>);
        expect(getByTestId('submitWarning').textContent).toBe('');
        // Try to delete an account without choosing any.
        fireEvent.click(getByTestId('deleteButtonComponent Primitive'), { button: 1 });
        expect(getByTestId('submitWarning').textContent).toBe('Please select an account to delete!');
      });
    });
    

    it('Should render an "Add Account" button component', () => {
      const addAccountButton = findByTestAttribute(wrapper, 'Add Button')
      expect(addAccountButton.length).toBe(1);
      expect(addAccountButton.props().buttonText).toBe('Add an account');
    });

    it('Should render an "Add Account" page link component with correct props', () => {
      const addAccountLink = wrapper.find(Link);
      expect(addAccountLink.length).toBe(1);
      expect(addAccountLink.props().to).toBe('/create');
    });

    it('Should contain a current balance paragraph', () => {
      const historySection = findByTestAttribute(wrapper, 'History Component');
      expect(historySection.length).toBe(1);
    });
  });