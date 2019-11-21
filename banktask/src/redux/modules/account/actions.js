import { TYPES } from './types';

export const loadAccounts = () => {
  return {
    type: TYPES.LOAD_ACCOUNTS,
    payload: {
      request: {
        method: 'get',
        url: '/accounts',
      }
    }
  }
}

export const updateAccount = (id, amount, transactionType) => {
  return {
    type: TYPES.UPDATE_ACCOUNT,
    payload: {
      request: {
        method: 'put',
        url: '/accounts',
        data: {
          id,
          amount,
          transactionType
        }
      }
    }
  }
}

export const deleteAccount = (id) => {
  return {
    type: TYPES.DELETE_ACCOUNT,
    payload: {
      request: {
        method: 'delete',
        url: '/accounts',
        params: {
          id
        }
      }
    }
  }
}

export const createAccount = (iban, currency) => {
  return {
    type: TYPES.CREATE_ACCOUNT,
    payload: {
      request: {
        method: 'post',
        url: '/accounts',
        data: {
          iban,
          currency
        }
      }
    }
  }
}