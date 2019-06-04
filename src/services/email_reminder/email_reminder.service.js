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
    }
  };

  // Initialize our service with any options it requires
  app.use('/email-reminder', emailReminderService);

  // Get our initialized service so that we can register hooks
  const service = app.service('email-reminder');

  service.hooks(hooks);
  
  service.schema = model.schema;
};
