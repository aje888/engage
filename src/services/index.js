const activity = require('./activity/activity.service.js');
const emailReminder = require('./email_reminder/email_reminder.service.js');
module.exports = function (app) {
  app.configure(activity);
  app.configure(emailReminder);
};
