import { TYPES } from './types';
import {
    loadAccounts,
    updateAccount,
    deleteAccount,
    createAccount
} from './actions';

describe('loadAccounts', () => {
  it('Should return an object with correct type and payload', () => { 
    const expectedAction = {
      type: TYPES.LOAD_ACCOUNTS,
      payload: {
        request: {
          method: 'get',
          url: '/accounts',
        }
      }
    }
    expect(loadAccounts()).toEqual(expectedAction);
  });
});

describe('updateAccount', () => {
  it('updateAccount should return an object with correct type and payload', () => { 
    const mockId = '_u70nyuzcq';
    const mockAmount = '300';
    const mockTransactionType = 'Deposit';
    const expectedAction = {
      type: TYPES.UPDATE_ACCOUNT,
      payload: {
        request: {
          method: 'patch',
          url: '/accounts',
          data: {
           id: mockId,
           amount: mockAmount,
           transactionType: mockTransactionType
          }
        }
      }
    }
    expect(updateAccount(mockId, mockAmount, mockTransactionType)).toEqual(expectedAction);
  });
});

describe('deleteAccount', () => {
  it('should return the correct action', () => {
    const expectedAction = {
      type: TYPES.DELETE_ACCOUNT,
      payload: {
        request: {
          method: 'delete',
          url: '/accounts',
          data: {
            id: 'TestID'
          }
        }
      },
      meta: {
        alert: 'Account deleted successfully!'
      }
    }
    expect(deleteAccount('TestID')).toEqual(expectedAction);
  });
});

describe('createAccount', () => {
  it('should return the correct action', () => {
    const mockIban = 'Test IBAN';
    const mockCurrency = 'Test Currency';
    const expectedAction =  {
      type: TYPES.CREATE_ACCOUNT,
      payload: {
        request: {
          method: 'post',
          url: '/accounts',
          data: {
            iban: mockIban,
            currency: mockCurrency
          }
        }
      },
      meta: {
        alert: 'Account created successfully!'
      }
    }
    expect(createAccount(mockIban, mockCurrency)).toEqual(expectedAction);
  });
});