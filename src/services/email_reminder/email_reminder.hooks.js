
const validateEmailReminder = require('../../hooks/validate-email-reminder');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateEmailReminder()],
    update: [validateEmailReminder()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
