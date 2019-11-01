const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Account = require('../models/accounts');

const utils = require('../utils/utils');

router.get('/', (req, res, next) => {
  Account.find()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.post('/', (req, res, next) => {
  
  const account = new Account({
    _id: new mongoose.Types.ObjectId(),
    iban: req.body.iban,
    currency: req.body.currency,
    balance: '0.00',
    history: []
  });

  account.save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });

  
});

router.patch('/', (req, res, next) => {
  Account.findById(req.body.id).exec().then(doc => {
    const oldBalance = doc.balance;
    const oldHistory = doc.history;
    
    const newBalance = utils.newBalance(oldBalance, req.body.amount, req.body.transactionType);
    const newHistory = utils.newHistory(oldHistory, req.body.amount, req.body.transactionType);

    Account.update({_id: req.body.id}, { $set: { balance: newBalance, history: newHistory}})
    .exec()
    .then(result => {
      Account.findById(req.body.id).exec().then(doc => {
        res.status(200).json({
          message: 'Update successful!',
          result,
          account: doc 
        });
      }).catch(error => {
        res.status(500).json({
          error: 'Something went wrong when finding the updated account.'
        })
      });
      
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    });
  }).catch(error => {
    res.status(500).json({
      error
    })
  });  
});

router.delete('/', (req, res, next) => {
  const id = req.body.id;
  Account.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Handling DELETE request',
        result,
        id
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    });
});

module.exports = router;