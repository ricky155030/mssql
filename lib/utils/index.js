'use strict';

var person = require('./person');

module.exports = cp => {
  return {
    person: person(cp)
  }
};
