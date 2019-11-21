import { TYPES } from './types';
import accountsReducer from './reducers';

describe('Accounts reducer', () => {
  it('should return the default state', () => {
    const newState = accountsReducer(undefined, {});
    expect(newState).toEqual({});
  });

  it('should populate the state with the accounts received from the server response', () => {
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
  
  it('should update the specified account correctly', () => {
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
    const newState = accountsReducer({
      _bousuqei6: {
        id: '_bousuqei6',
        iban: 'BG12BUIN12341234567893',
        currency: 'EUR',
        balance: '2345.00',
        history: []
      }},
      {
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
      }});
    expect(expectedState).toEqual(newState);
  });

  it('should remove the specified account from the state', () => {
    const expectedState = {
      _wi2ozmsx9: {
        id: '_wi2ozmsx9',
        iban: 'BG12BUIN12341234567892'
      }
    };
    const newState = accountsReducer({
      _u70nyuzcq: {
        id: '_u70nyuzcq',
        iban: 'BG12BUIN12341234567891'
      },
      _wi2ozmsx9: {
        id: '_wi2ozmsx9',
        iban: 'BG12BUIN12341234567892',
      }
    }, {
      type: TYPES.DELETE_ACCOUNT_SUCCESS,
      payload: {
        id: '_u70nyuzcq'
      }
    });
    expect(expectedState).toEqual(newState);
  });

  it('should add the newly created account to the state', () => {
    const expectedState = {
      _bousuqei6: {
        id: '_bousuqei6',
        iban: 'BG12BUIN12341234567893',
        currency: 'EUR',
        balance: '2345.00',
        history: []
      },
      TestID: {
        id: 'TestID',
        iban: 'TestIBAN',
        currency: 'USD',
        balance: '0.00',
        history: []
      }
    };
    const newState = accountsReducer({
      _bousuqei6: {
        id: '_bousuqei6',
        iban: 'BG12BUIN12341234567893',
        currency: 'EUR',
        balance: '2345.00',
        history: []
      }
    }, {
      type: TYPES.CREATE_ACCOUNT_SUCCESS,
      payload: {
        id: 'TestID',
        iban: 'TestIBAN',
        currency: 'USD',
        balance: '0.00',
        history: []
      }
    });
    expect(expectedState).toEqual(newState);
  });
});