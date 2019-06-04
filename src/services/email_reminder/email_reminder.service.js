// Initializes the `email_reminder` service on path `/email-reminder`
const createService = require('feathers-nedb');
const model = require('../../models/email_reminder.model');
const hooks = require('./email_reminder.hooks');
const db = require('mongoose');
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
  const Model = model.createModel(app);

  const options = {
    Model
  };
  
  const emailReminderService = createService(options);
  
  const swaggerSchema = m2s(model.schema);

  // swagger spec for this service, see http://swagger.io/specification/
  emailReminderService.docs = {
    description: 'A service to send and receive email reminders',
    definitions: {
      'email-reminder_list': {
        $ref: '#/definitions/email-reminder'
      },
      'email-reminder': swaggerSchema
    },
    operations: {
      find: {
        summary: 'Search for e-mail reminders.',
        operationId: 'findEmailReminder'
      },
      get: {
        summary: 'Get an e-mail reminder by id.',
        operationId: 'getEmailReminderById'
      },
      create: {
        summary: 'Create a new e-mail reminder.',
        operationId: 'createEmailReminder'
      },
      update: {
        summary: 'Update an e-mail reminder by id.',
        operationId: 'updateEmailReminderById'
      },
      remove: {
        summary: 'Delete an e-mail reminder by id.',
        operationId: 'deleteEmailReminderById'
      },
      patch: {
        summary: 'Patch (merge update) an e-mail reminder by id.',
        operationId: 'patchEmailReminderById'
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/email-reminder', emailReminderService);

  // Get our initialized service so that we can register hooks
  const service = app.service('email-reminder');

  service.hooks(hooks);
  
  service.schema = model.schema;
};
