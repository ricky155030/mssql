'use strict';

var attachSession = require('../../attachSession')
var Person = require('./Person')
var Student = require('./Student')
var utils = require('../utils')

const Model = {
  1: Person,
  2: Student
}

class Factory {
  constructor(transaction) {
    this.transaction = transaction
    this.utils = utils(transaction)
  }

  category(categoryId) {
    return (param) => {
      param.transaction = this.transaction
      param.utils = this.utils
      return new Model[categoryId](param)
    }
  }
}

module.exports = Factory
