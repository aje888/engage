const auditActivity = require('../../hooks/audit-activity');

const validateActivity = require('../../hooks/validate-activity');

module.exports = {
  before: {
    all: [auditActivity()],
    find: [],
    get: [],
    create: [validateActivity()],
    update: [],
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
