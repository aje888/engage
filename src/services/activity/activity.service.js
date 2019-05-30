// Initializes the `activity` service on path `/activity`
const createService = require('feathers-nedb');
const createModel = require('../../models/activity.model');
const hooks = require('./activity.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  const activityService = createService(options);

  // swagger spec for this service, see http://swagger.io/specification/
  activityService.docs = {
    description: 'A service to send and receive activities',
    definitions: {
      'activity_list': {
        $ref: '#/definitions/activity'
      },
      activity: {
        "type": "object",
        "required": [
          "text"
        ],
        "properties": {
          "text": {
            "type": "string",
            "description": "The message text"
          },
          "userId": {
            "type": "string",
            "description": "The id of the user that sent the message"
          }
        }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/activity', activityService);

  // Get our initialized service so that we can register hooks
  const service = app.service('activity');

  service.hooks(hooks);
};
