import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { randomIdGenerator } from '../utils';

const mock = new MockAdapter(axios);

let database = {
  accounts: [
    { _id: '_u70nyuzcq', iban: 'BG12BUIN12341234567891', currency: 'BGN', balance: '5678.00', history: [
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
    ] },
    { _id: '_wi2ozmsx9', iban: 'BG12BUIN12341234567892', currency: 'USD', balance: '3456.00', history: [
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
    ] },
    { _id: '_bousuqei6', iban: 'BG12BUIN12341234567893', currency: 'EUR', balance: '2345.00', history: [] }
  ]
};

// to unify the things even more, the database variable should not be an object with an 'accounts' key and an array value, but only the array value like so:
// database = [ the accounts inside here ]. This will require fixing the mockNewHistory and newBalance functions on the respective places.

const newBalance = (balance, amount, transactionType) => {
  switch(transactionType) {
    case 'Deposit':
      return (Number(balance) + Number(amount)).toFixed(2).toString();
    case 'Withdraw':
      return (Number(balance) - Number(amount)).toFixed(2).toString();
    default:
      return balance;
  }
}  

mock.onGet('/accounts').reply(200, database);

const mockNewHistory = (history, amount, transactionType) => {
const date = new Date();
const formattedDate = `${(('0' + date.getDate()).slice(-2))}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
let newEntry = {
    date: formattedDate,
    debit: '',
    credit: ''
}
if(transactionType === 'Deposit') {
    newEntry.debit = Number(amount).toFixed(2).toString();
}
else if(transactionType === 'Withdraw') {
    newEntry.credit = Number(amount).toFixed(2).toString();
}
let newHistory  = history;
if(newHistory.length === 10) {
    newHistory = newHistory.slice(1, newHistory.length);
}
newHistory = [...newHistory, newEntry];
return newHistory;
} 

mock.onPut('/accounts') // The server works with PATCH. Keep this in mind. Rework here may be required. Axios-mock-adapter may not even support PATCH requests. This needs to be looked further into.
.reply(({data}) => {
  data = JSON.parse(data);
  const {id, amount, transactionType} = data;
  const index = database.accounts.findIndex(element => id === element.id);
  database.accounts[index].balance = newBalance(database.accounts[index].balance, amount, transactionType); // Fix here would be required.
  database.accounts[index].history = mockNewHistory(database.accounts[index].history, amount, transactionType); // Fix here would be required.
  return [200, {
        id,            
        iban: database.accounts[index]['iban'],
        currency: database.accounts[index]['currency'],
        balance: database.accounts[index]['balance'],
        history: database.accounts[index].history
        }]
});

mock.onDelete('/accounts').reply(({params}) => {  // The DELETE method works with body/data field. So, this needs to be looked into further in order to unify the code.
  return [200, { id: params.id }]
});

mock.onPost('/accounts').reply(({data}) => { // If I'm not mistaken, the POST request was also with a 'params' field in the action creator. Be wary of this.
  data = JSON.parse(data);
  const {iban, currency} = data;
  database.accounts = [...database.accounts, { id: randomIdGenerator(), iban, currency, balance: '0.00', history: [] }] // Fix here would be required.
  return [200, database.accounts[database.accounts.length-1]];
});