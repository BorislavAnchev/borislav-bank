import { TYPES } from './types';
import accountsReducer from './reducers';

describe('Accounts reducer', () => {
  it('should return the default state', () => {
    const newState = accountsReducer(undefined, {});
    expect(newState).toEqual({});
  });

  describe('case: TYPES.LOAD_ACCOUNTS_SUCCESS', () => {
    it('Should populate the state with the accounts received from the server response', () => {
      const fakeResponse = {
        data: [
          {
            id: 'TestID',
            iban: 'TestIBAN',
            currency: 'BGN',
            balance: '5678.00',
            history: [
              {
                date: '05.01.2018',
                debit: '500.00',
                credit: ''
              }
            ]
          }
        ]
      }
      const expectedState = {
        TestID: {
          id: 'TestID',
          iban: 'TestIBAN',
          currency: 'BGN',
          balance: '5678.00',
          history: [
            {
              date: '05.01.2018',
              debit: '500.00',
              credit: ''
            }
          ]
        }
      }
      const newState = accountsReducer(undefined, {
        type: TYPES.LOAD_ACCOUNTS_SUCCESS,
        payload: fakeResponse.data
      });
      expect(newState).toEqual(expectedState);
    });
  });
  
  describe('case: TYPES.UPDATE_ACCOUNT', () => {
    it('Should update the specified account correctly', () => {
      const testInitialState = {
        _bousuqei6: {
          id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      };
      const expectedState = {
        _bousuqei6: {
          id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2645.00',
          history: [
            {
              date: '05.09.2018',
              debit: '300.00',
              credit: ''
            }
          ]
        }
      }
      const testAction = {
        type: TYPES.UPDATE_ACCOUNT_SUCCESS,
        payload: {
          id: '_bousuqei6',            
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2645.00',
          history: [
            {
              date: '05.09.2018',
              debit: '300.00',
              credit: ''
            }
          ]
        }
      }
      const newState = accountsReducer(testInitialState, testAction);
      expect(expectedState).toEqual(newState);
    });
  });
});