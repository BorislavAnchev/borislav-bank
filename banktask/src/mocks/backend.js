import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { randomIdGenerator } from '../utils';

const mock = new MockAdapter(axios);

let database = [
  { id: '_u70nyuzcq', iban: 'BG12BUIN12341234567891', currency: 'BGN', balance: '5678.00', history: [
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
  { id: '_wi2ozmsx9', iban: 'BG12BUIN12341234567892', currency: 'USD', balance: '3456.00', history: [
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
  { id: '_bousuqei6', iban: 'BG12BUIN12341234567893', currency: 'EUR', balance: '2345.00', history: [] }
];

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

mock.onPut('/accounts')
.reply(({data}) => {
  data = JSON.parse(data);
  const {id, amount, transactionType} = data;
  const index = database.findIndex(element => id === element.id);
  database[index].balance = newBalance(database[index].balance, amount, transactionType);
  database[index].history = mockNewHistory(database[index].history, amount, transactionType);
  return [200, {
        id,            
        iban: database[index]['iban'],
        currency: database[index]['currency'],
        balance: database[index]['balance'],
        history: database[index].history
        }]
});

mock.onDelete('/accounts').reply(({params}) => {
  const { id } = params;
  const index = database.findIndex(element => id === element.id);
  database.splice(index, 1);
  return [200, { id: params.id }]
});

mock.onPost('/accounts').reply(({data}) => {
  data = JSON.parse(data);
  const {iban, currency} = data;
  database = [...database, { id: randomIdGenerator(), iban, currency, balance: '0.00', history: [] }]
  return [200, database[database.length-1]];
});