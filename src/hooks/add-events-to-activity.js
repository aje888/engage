// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of activities either by wrapping
    // a single activity into an array or by getting the `data` from the `find` method result
    const activities = method === 'find' ? result.data : [ result ];

    // Asynchronously get event objects from each activity
    // and add it to the message
    await Promise.all(activities.map(async activity => {
      // We'll also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      const events = await app.service('events').find({
        query: {
          $or: [
            { ID: activity.EventHubId }
          ]
        }
      });

      activity.events = events;
      
    }));

    // Best practise, hooks should always return the context
    return context;
  };
};