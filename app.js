'use strict';

var express = require('express');
var app = express();
var sql  = require('mssql');
var config = require('./config');

/* Models */
var models = require('./lib/models')

/* Utils */
var person = require('./lib/utils/person')

/// global.connectionPool = []
/// 
/// for(var i = 0; i < 20; i++) {
///   const connectionPool = new sql.Connection(config)
///   global.connectionPool.push(connectionPool)
/// }

global.connectionPool = new sql.Connection(config)

// const promises = global.connectionPool.map(pool => pool.connect())

global.connectionPool.connect().then(() => {
  var routing = require('./routing');

  app.use((req, res, next) => {
    const random = Math.floor(Math.random() * 20)
    console.log(random)
    req.transaction = new sql.Transaction(global.connectionPool)
    req.transaction.time = new Date()
    req.models = models(req.transaction)
    req.person = person(req.transaction)
    next()
  })

  app.use('/test', routing)
})
.catch(err => console.log(err))

app.listen(3000)
