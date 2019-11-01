import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAttribute, testStore } from '../../utils';
import CreateAccount from './CreateAccount';
import { fireEvent, render, cleanup } from '@testing-library/react';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(<Provider store={store}><MemoryRouter><CreateAccount /></MemoryRouter></Provider>); // Mount insdead of shallow with Provider arround solves the problem.
  return wrapper;
}

describe('Create account component', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      accounts: {
        u70nyuzcq: {
          id: 'u70nyuzcq',
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
        wi2ozmsx9: {
          id: 'wi2ozmsx9',
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
        bousuqei6: {
          id: 'bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      }
    };
    wrapper = setUp(initialState);
  });

  afterEach(cleanup);

  it('Should render an account IBAN input field component', () => {
    const idInput = findByTestAttribute(wrapper, 'Account IBAN field');
    expect(idInput.length).toBe(1);
  });

  it('Should render an example account IBAN paragraph', () => {
    const exampleId = findByTestAttribute(wrapper, 'Example IBAN paragraph');
    expect(exampleId.length).toBe(1);
  });

  it('Should render a currency selector dropdown', () => {
    const currencySelector = findByTestAttribute(wrapper, 'Currency Selector');
    expect(currencySelector.length).toBe(1);
  });

  it('Should render an "Add" button component', () => {
    const CreatePageAddAccountButton = findByTestAttribute(wrapper, 'Create Page Add Account Button Primitive');
    expect(CreatePageAddAccountButton.length).toBe(1);
  });

  describe('"Back" button', () => {
    it('Should render the <Link>', () => {
      const backButtonLink = wrapper.find(Link);
      expect(backButtonLink.length).toBe(1);
      expect(backButtonLink.props().to).toBe('/');
    });

    it('Should render the <Button> inside the <Link>', () => {
      const backButton = findByTestAttribute(wrapper, 'Create_Back Button Primitive');
      expect(backButton.length).toBe(1);
    });
  });

  describe('Account create warning', () => {
    it('Should warn about correct form submit', () => {
      const { getByTestId } = render(<Provider store={testStore({})}><MemoryRouter><CreateAccount /></MemoryRouter></Provider>);
      expect(getByTestId('validation-warning').textContent).toBe('');
      fireEvent.click(getByTestId('Create Page Add Account Button Primitive'), { button: 1 });
      expect(getByTestId('validation-warning').textContent).toBe('Please fill in the form correctly!');
    });
  });
});