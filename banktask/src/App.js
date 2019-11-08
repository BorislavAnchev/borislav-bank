import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './screens/HomePage/HomePage';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header data-test='Header Component'/>
        <Route exact path='/' render={() => <HomePage />} data-testid='Home Page Route' />
      </div>
    </BrowserRouter>
  );
}

export default App;
