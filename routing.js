'use strict';

var sql = require('mssql');
var express = require('express');
var router = express.Router()
var Person = require('./lib/models/Person')

router.get('/create/Person', (req, res, next) => {
  const p = req.models[1]({
    fname: 'hungwei',
    lname: 'kao',
    address: 'Taiwan',
    city: 'Taipei'
  })

  p.create()  
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get('/create/Student', (req, res, next) => {
  const p = req.models[2]({
    fname: 'hungwei',
    lname: 'kao',
    address: 'Taiwan'
  })

  req.transaction.begin()
    .then(() => {
      let promise = Promise.resolve()

      for(var i = 0; i < 10000; i++) {
        promise = promise.then(() => p.create())
        if(i == 9999)
          promise = promise.then(() => Promise.reject('NO'))
      }

      return promise
    })
    .then(data => req.transaction.commit().then(() => data))
    .then(data => res.json(data))
    .catch(err => {
      return req.transaction.rollback().then(() => res.json(err))
    })
})

router.get('/', (req, res, next) => {
  req.transaction.begin()
    .then(() => req.person.queryPerson())
    .then(data => res.json(data))
    .catch(err => console.log(err))
})


module.exports = router;
