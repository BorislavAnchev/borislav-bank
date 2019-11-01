import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../../utils';
import History from './History';

describe('The history component', () => {
  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        history: [],
        'data-testid': 'History Component'
      };
      const propsError = checkProps(History, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning in the browser console', () => {
      const expectedProps = {
        history: 'text',
        'data-testid': 23
      };
      const propsError = checkProps(History, expectedProps);
      expect(propsError).toBeTruthy();
    });
  });

  describe('Renders', () => {
    
    let wrapper;

    const fakeHistory = [
        {
          date: 'test1',
          debit: 'test1',
          credit: 'test1'
        },
        {
          date: 'test2',
          debit: 'test2',
          credit: 'test2'
        }
      ];

    beforeEach(() => {
      const props = {
        history: fakeHistory,
        'data-testid': 'History Component'
      };
      wrapper = shallow(<History {...props} />);
    });
    
    it('Should render a table', () => {
      const table = findByTestAttribute(wrapper, 'Table Primitive');
      expect(table.length).toBe(1);
    });

    it('Should render a table header', () => {
      const tableHeader = findByTestAttribute(wrapper, 'Table Head Primitive');
      expect(tableHeader.length).toBe(1);
    });

    it('Should render a table body', () => {
      const tableBody = findByTestAttribute(wrapper, 'Table Body Primitive');
      expect(tableBody.length).toBe(1);
    });

    it('Should render a date column', () => {
      const dateColumn = findByTestAttribute(wrapper, 'Date Column Header');
      expect(dateColumn.length).toBe(1);
    });

    it('Should render a withdraw column', () => {
      const withdrawColumn = findByTestAttribute(wrapper, 'Withdraw Column Header');
      expect(withdrawColumn.length).toBe(1);
    });

    it('Should render a deposit column', () => {
      const depositColumn = findByTestAttribute(wrapper, 'Deposit Column Header');
      expect(depositColumn.length).toBe(1);
    });
  });
});