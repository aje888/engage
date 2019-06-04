// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const auditlogger = require('../auditlogger');

const db = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, data, service } = context;

    var EmailReminder = service.schema;

    var emailReminder = new EmailReminder(data);

    var error = emailReminder.validateSync();

    if (typeof error !== "undefined") {
      throw new Error(error.message);
    }

    // Best practise, hooks should always return the context
    return context;
  };
};