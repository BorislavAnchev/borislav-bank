import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './screens/HomePage/HomePage';
import NewAccountPage from './screens/NewAccountPage/NewAccountPage';
import { loadAccounts } from './redux/modules/account/actions';

const App = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadAccounts());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header data-test='Header Component'/>
        <Route exact path='/' render={() => <HomePage />} data-testid='Home Page Route' />
        <Route exact path='/account/new' render={(props) => <NewAccountPage {...props}/>} data-testid='Create Account Page Route' />
      </div>
    </BrowserRouter>
  );
}

export default App;