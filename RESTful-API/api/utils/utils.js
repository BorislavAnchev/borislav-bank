const newBalance = (receivedBalance, amount, transactionType) => {
  switch(transactionType) {
    case 'Deposit':
      return (Number(receivedBalance) + Number(amount)).toFixed(2).toString();
    case 'Withdraw':
      return (Number(receivedBalance) - Number(amount)).toFixed(2).toString();
    default:
      return receivedBalance;
  }
}

const newHistory = (receivedHistory, amount, transactionType) => {
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
  let history  = receivedHistory;
  if(history.length === 10) {
    history = history.slice(1, history.length);
  }
  history = [...history, newEntry];
  return history;
} 

  module.exports.newBalance = newBalance;
  module.exports.newHistory = newHistory;