const mongoose = require('mongoose');

const accountSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  iban: String,
  currency: String,
  balance: String,
  history: [
    {
      date: String, // Or date? Works this way, so leave it be. It's important that it is Date type in the utility function. This is only for storage.
      debit: String,
      credit: String
    }
  ]
}

module.exports = mongoose.model('Accounts', accountSchema);