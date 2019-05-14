const activity = require('./activity/activity.service.js');
module.exports = function (app) {
  app.configure(activity);
};
