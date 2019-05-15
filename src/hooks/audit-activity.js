// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const auditlogger = require('../auditlogger');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method } = context;

    auditlogger.audit('User [' + context.params.userName + "] doing  [" + method + "] on activity service." );

    // Best practise, hooks should always return the context
    return context;
  };
};