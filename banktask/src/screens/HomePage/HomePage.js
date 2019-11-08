import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.scss';

const HomePage = () => {

  const [transactionType, setTransactionType] = useState('');

  const transactionOptions = ['Deposit', 'Withdraw'];

  return (
        <div data-testid='Home Page Component'>
            <Dropdown
              className='transaction-dropdown'
              value={transactionType}
              options={transactionOptions}
              onChange={(event) => setTransactionType(event.value)}
              placeholder="Type"
              data-testid='Transaction Selector' />
        </div>
    );
}

export default HomePage;