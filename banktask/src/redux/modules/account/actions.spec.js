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
    const testId = '_u70nyuzcq';
    const testAmount = '300';
    const testTransactionType = 'Deposit';
    const expectedAction = {
      type: TYPES.UPDATE_ACCOUNT,
      payload: {
        request: {
          method: 'put',
          url: '/accounts',
          data: {
           id: testId,
           amount: testAmount,
           transactionType: testTransactionType
          }
        }
      }
    }
    expect(updateAccount(testId, testAmount, testTransactionType)).toEqual(expectedAction);
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
          params: {
            id: 'TestID'
          }
        }
      }
    }
    expect(deleteAccount('TestID')).toEqual(expectedAction);
  });
});

describe('createAccount', () => {
  it('should return the correct action', () => {
    const testIban = 'Test IBAN';
    const testCurrency = 'Test Currency';
    const expectedAction =  {
      type: TYPES.CREATE_ACCOUNT,
      payload: {
        request: {
          method: 'post',
          url: '/accounts',
          data: {
            iban: testIban,
            currency: testCurrency
          }
        }
      }
    }
    expect(createAccount(testIban, testCurrency)).toEqual(expectedAction);
  });
});