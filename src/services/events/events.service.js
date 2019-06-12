// Initializes the `events` service on path `/events`
const createService = require("feathers-nedb");
const model = require("../../models/events.model");
const hooks = require("./events.hooks");
const db = require("mongoose");
const m2s = require("mongoose-to-swagger");

module.exports = function(app) {
  const Model = model.createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate,
    multi: ["remove"]
  };

  const eventsService = createService(options);

  const swaggerSchema = m2s(model.schema);

  // swagger spec for this service, see http://swagger.io/specification/
  eventsService.docs = {
    description: "A service to view, create, update or delete events",
    definitions: {
      event_list: {
        $ref: "#/definitions/event"
      },
      event: swaggerSchema
    },
    operations: {
      find: {
        summary: "Search for events.",
        operationId: "findEvent"
      },
      get: {
        summary: "Get an event by id.",
        operationId: "getEventById"
      },
      create: {
        summary: "Create a new event.",
        operationId: "createEvent"
      },
      update: {
        summary: "Update an event by id.",
        operationId: "updateEventById"
      },
      remove: {
        summary: "Delete an event by id.",
        operationId: "deleteEventById"
      },
      patch: {
        summary: "Patch (merge update) an event by id.",
        operationId: "patchEventById"
      }
    }
  };

  // Initialize our service with any options it requires
  app.use("/events", eventsService);

  // Get our initialized service so that we can register hooks
  const service = app.service("events");

  service.hooks(hooks);

  service.schema = model.schema;
};
