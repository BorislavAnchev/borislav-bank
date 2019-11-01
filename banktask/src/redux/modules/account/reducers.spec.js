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
            _id: '_u70nyuzcq',
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
            {
              _id: '_wi2ozmsx9',
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
            {
              _id: '_bousuqei6',
              iban: 'BG12BUIN12341234567893',
              currency: 'EUR',
              balance: '2345.00',
              history: []
            }
        ]
      }
      const expectedState = {
        _u70nyuzcq: {
          _id: '_u70nyuzcq',
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
          _id: '_wi2ozmsx9',
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
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      }
      const newState = accountsReducer(undefined, {
        type: TYPES.LOAD_ACCOUNTS_SUCCESS,
        payload: fakeResponse.data
      });
      expect(newState).toEqual(expectedState);
    });
  });
 
  describe('case: TYPES.DELETE_ACCOUNTS_SUCCESS', () => {
    it('Should remove the specified account from the state', () => {
      const fakeInitialState = {
        _u70nyuzcq: {
          _id: '_u70nyuzcq',
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
          _id: '_wi2ozmsx9',
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
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      };
      const expectedState = {
        _wi2ozmsx9: {
          _id: '_wi2ozmsx9',
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
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      };
      const mockAction = {
        type: TYPES.DELETE_ACCOUNT_SUCCESS,
        payload: {
          id: '_u70nyuzcq'
        },
        meta: {
          alert: 'Account deleted successfully!'
        }
      }
      const newState = accountsReducer(fakeInitialState, mockAction);
      expect(expectedState).toEqual(newState);
    });
  });

  describe('case: TYPES.CREATE_ACCOUNT', () => {
    it('Should add hte newly created account to the state', () => {
      const fakeInitialState = {
        _u70nyuzcq: {
          _id: '_u70nyuzcq',
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
          _id: '_wi2ozmsx9',
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
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      };
      const expectedState = {
        _u70nyuzcq: {
          _id: '_u70nyuzcq',
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
          _id: '_wi2ozmsx9',
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
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        },
        TestID: {
          _id: 'TestID',
          iban: 'TestIBAN',
          currency: 'USD',
          balance: '0.00',
          history: []
        }
      };
      const mockAction = {
        type: TYPES.CREATE_ACCOUNT_SUCCESS,
        payload: {
          _id: 'TestID',
          iban: 'TestIBAN',
          currency: 'USD',
          balance: '0.00',
          history: []
        },
        meta: {
          alert: 'Account created successfully!'
        }
      }
      const newState = accountsReducer(fakeInitialState, mockAction);
      expect(expectedState).toEqual(newState);
    });
  });
  
  describe('case: TYPES.UPDATE_ACCOUNT', () => {
    it('Should update the specified account correctly', () => {
      const fakeInitialState = {
        _bousuqei6: {
          _id: '_bousuqei6',
          iban: 'BG12BUIN12341234567893',
          currency: 'EUR',
          balance: '2345.00',
          history: []
        }
      };
      const expectedState = {
        _bousuqei6: {
          _id: '_bousuqei6',
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
      const mockAction = {
        type: TYPES.UPDATE_ACCOUNT_SUCCESS,
        payload: {
          account: {
            _id: '_bousuqei6',            
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
      }
      const newState = accountsReducer(fakeInitialState, mockAction);
      expect(expectedState).toEqual(newState);
    });
  });
});