'use strict';

function attachSession(Module) {
  return (transaction) => {
    Module.transaction = transaction
    return Module
  }
}

module.exports = attachSession
