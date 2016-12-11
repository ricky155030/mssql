'use strict';

var sql  = require('mssql');
var config = require('./config');

sql.connect(config)
  .then(() => {
    new sql.Request()
      .execute('sp_who2')
      .then(data => data[0].filter(row => row.DBName == 'ITAM'))
      .then(data => data.forEach(row => console.log(row.SPID + ' | ' + row.Status + ' | ' + row.BlkBy + ' | ' + row.Command + ' | ' + row.CPUTime + ' | ' + row.LastBatch)))
  })

