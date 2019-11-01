import { TYPES } from './types';
import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';

const accounts = (state = {}, action) => {
  switch(action.type) {
    case TYPES.LOAD_ACCOUNTS_SUCCESS:
      return mapKeys(action.payload, '_id');
    case TYPES.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        [action.payload.account._id]: action.payload.account
      };
    case TYPES.DELETE_ACCOUNT_SUCCESS:
      return omit(state, action.payload.id);
    case TYPES.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        [action.payload._id]: action.payload
      }
    default:
      return state;
  }  
}

export default accounts;