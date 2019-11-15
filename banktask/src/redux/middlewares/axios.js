import axios from 'axios';

export const handleHttpRequestsFlow = store => next => action => {
  next(action);
  if(action.payload && action.payload.request) {
    return axios(action.payload.request).then(response => {
      store.dispatch({
        type: `${action.type}_SUCCESS`,
        payload: response.data
      });
    }, error => {
      store.dispatch({
        type: `${action.type}_FAIL`,
        payload: error
      });
    })
  }
}