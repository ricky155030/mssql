'use strict';

var person = require('../utils/person')

class Person {
  constructor(param) {
    const {
      fname,
      lname,
      address,
      city,
      transaction,
      utils
    } = param

    this.fname = fname
    this.lname = lname
    this.address = address
    this.city = city
    this._transaction = transaction
    this.utils = utils
  }

  data() {
    return this
  }

  create() {
    return this.utils.person.insertNewPerson(this.fname, this.lname, this.address, this.city)
  }
}

module.exports = Person;
