const auditActivity = require('../../hooks/audit-activity');

const validateActivity = require('../../hooks/validate-activity');

const addEventsToActivity = require('../../hooks/add-events-to-activity');

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
    find: [addEventsToActivity()],
    get: [addEventsToActivity()],
    create: [addEventsToActivity()],
    update: [addEventsToActivity()],
    patch: [addEventsToActivity()],
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
