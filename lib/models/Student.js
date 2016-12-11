'use strict';

var attachSession = require('../../attachSession')
var Person = require('./Person')

class Student extends Person {
  constructor(param) {
    super(param)
    this.city = 'Tainan'
  }
}

module.exports = Student;
