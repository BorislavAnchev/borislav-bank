import configureMockStore from 'redux-mock-store';
import { handleHttpRequestsFlow } from './axios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cleanup } from '@testing-library/react';

const mock = new MockAdapter(axios);

mock.onAny('/accounts').reply(200, { testData: 'Test Data' });

const mockStore = configureMockStore([handleHttpRequestsFlow]);

describe('handleHttpRequestsFlow middleware', () => {

  afterEach(cleanup);

  it('Should log the correct actions into mocked store', () => {
    const fakeAction = {
      type: 'TEST_TYPE',
      payload: {
        request: {
          method: 'get',
          url: '/accounts',
        }
      }
    };
    const store = mockStore({ accounts: {} });
    const expectedActions = [
      {
        type: 'TEST_TYPE',
        payload: {
          request: {
            method: 'get',
            url: '/accounts'
          }
        }
      },
      {
        type: 'TEST_TYPE_SUCCESS',
        payload: {
          testData: "Test Data"  
        }
      }
    ]
    store.dispatch(fakeAction).then(() =>    
    expect(store.getActions()).toEqual(expectedActions));
  });

  it('Should log the correct actions into mocked store', () => {
    const fakeAction = {
      type: 'TEST_TYPE',
      payload: {
        request: {
          method: 'get',
          url: '/wrongUrl',
        }
      }
    };
    const store = mockStore({ accounts: {} });
    store.dispatch(fakeAction).then(() => expect(store.getActions()[1].type).toEqual('TEST_TYPE_FAIL'));
  });  
});