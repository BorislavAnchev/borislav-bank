import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { checkProps } from '../../utils';
import TransactionsHistory from './TransactionsHistory';

describe('The history component', () => {
  describe('Checking PropTypes', () => {
    
    afterEach(cleanup);

    it('Should not throw a warning', () => {
      const expectedProps = {
        history: [],
        'data-testid': 'History Component'
      };
      const propsError = checkProps(TransactionsHistory, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning in the browser console', () => {
      const expectedProps = {
        history: 'text',
        'data-testid': 23
      };
      const propsError = checkProps(TransactionsHistory, expectedProps);
      expect(propsError).toBeTruthy();
    });
  });

  describe('renders', () => {

    const fakeHistory = [
        {
          date: 'Test Date',
          debit: 'Test Debit',
          credit: 'Test Credit'
        }
      ];
    const props = {
      history: fakeHistory,
      'data-testid': 'History Component'
    };
    
    it('a table', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Table Primitive')).toBeInTheDocument();
    });

    it('a table header', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Table Head Primitive')).toBeInTheDocument();
    });

    it('a table body', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Table Body Primitive')).toBeInTheDocument();
    });

    it('a date column', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Date Column Header')).toBeInTheDocument();
    });

    it('a withdraw column', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Withdraw Column Header')).toBeInTheDocument();
    });

    it('a deposit column', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Deposit Column Header')).toBeInTheDocument();
    });

    it('a date cell', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Date Cell 1').textContent).toBe('Test Date');
    });

    it('a debit cell', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Debit Cell 1').textContent).toBe('Test Debit');
    });

    it('a credit cell', () => {
      const { getByTestId } = render(<TransactionsHistory {...props}/>);
      expect(getByTestId('Credit Cell 1').textContent).toBe('Test Credit');
    });    
  });
});