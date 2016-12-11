'use strict';

const Factory = require('./Factory')

module.exports = transaction => {
  const factory = new Factory(transaction)

  return {
    1: factory.category(1),
    2: factory.category(2)
  }
};
