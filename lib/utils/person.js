'use strict';

var sql  = require('mssql');

function insertNewPerson(cp) {
  return (fname, lname, address, city) => {
    return new sql.Request(cp)
      .input('FirstName', fname)
      .input('LastName', lname)
      .input('Address', address)
      .input('City', city)
      .query('INSERT INTO Persons (FirstName, LastName, Address, City) VALUES (@FirstName, @LastName, @Address, @City); SELECT SCOPE_IDENTITY() AS ID;')
  }
}

function queryPerson(cp) {
  return () => {
    return new sql.Request(cp)
      .query('SELECT * FROM Persons with(READCOMMITTED)')
  }
}

module.exports = cp => {
  return {
    insertNewPerson: insertNewPerson(cp),
    queryPerson: queryPerson(cp)
  }
}
