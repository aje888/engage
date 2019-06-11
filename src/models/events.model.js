const NeDB = require("nedb");
const path = require("path");
const db = require("mongoose");
const validators = require("mongoose-validators");

module.exports = {
  createModel: function(app) {
    const dbPath = app.get("nedb");
    const Model = new NeDB({
      filename: path.join(dbPath, "events.db"),
      autoload: true
    });

    return Model;
  },
  schema: db.model(
    "events",
    new db.Schema(
      {
        ID: {
          type: Number,
          description: "Unique Event ID."
        },

        Title: {
          type: String,
          description: "Title of the Event."
        },

        ShortDescription: {
          type: String,
          description: "A short summary of the Event."
        },

        Town: {
          type: String,
          description: "Town where the Event is being held."
        },

        LocationDetail: {
          type: String,
          description: "More details of the Event location."
        },

        EventStart: {
          type: String,
          description: "Event start date."
        },

        EventEnd: {
          type: String,
          description: "Event end date."
        },

        ventIsInternal: {
          type: String,
          description: "Indicates if the event is a commmunity Event or not."
        },

        EventIsPublished: {
          type: String,
          description: "Indicates if the Event is in a published state."
        },

        ContactName: {
          type: String,
          description: "Who to contact in regards to the Event."
        },

        LinkToEvent: {
          type: String,
          description: "A URL to the Event."
        },

        LinkToGroupID: {
          type: String,
          description: "A URL to the Event group."
        }
      },
      { versionKey: false }
    )
  )
};
