const NeDB = require("nedb");
const path = require("path");
const db = require("mongoose");
const validators = require("mongoose-validators");

module.exports = {
  createModel: function(app) {
    const dbPath = app.get("nedb");
    const Model = new NeDB({
      filename: path.join(dbPath, "email_reminder.db"),
      autoload: true
    });

    return Model;
  },
  schema: db.model(
    "email-reminder",
    new db.Schema(
      {
        Email: {
          type: String,
          validate: validators.isEmail({
            message: "Not a valid e-mail."
          }), //'Valid Capgemini email address is required.'],
          required: [true, "E-mail address is required."],
          description: "The users e-mail."
        },

        URL: {
          type: String,
          validate: validators.isURL({
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
            message: "Not a valid URL!"
          }),
          required: [true, "Activity URL is required."],
          description: "The activity url."
        }
      },
      { versionKey: false }
    )
  )
};
