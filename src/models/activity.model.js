const NeDB = require('nedb');
const path = require('path');
const db = require('mongoose');

module.exports = {
  createModel: function (app) {
    const dbPath = app.get('nedb');
    const Model = new NeDB({
      filename: path.join(dbPath, 'activity.db'),
      autoload: true
    });

    return Model;
  },
  schema: db.model('activity', new db.Schema({
      Name: {
        type: "String",
        required: [true, 'Activity must have name.'],
        description: "The activity name."
      },
      Description: {
        type: "String",
        required: [true, 'Activity must have description.'],
        description: "The activity description."
      },
      Type: {
        type: "String",
        enum: ['Charity', 'Mentoring'],
        required: true
      },
      LogoLink: {
        type: "String"
      },
      TwitterHashtags: {
        type: "String"
      },
      EventHubId: {
        type: "String"
      },
      EventHubHashtags: {
        type: "String"
      },
      FollowLink: {
        type: "String"
      },
      VolunteerLink: {
        type: "String"
      },
      TimePeriod: {
        type: "String"
      },
      ContactList: {
        type: "String"
      },
      NoLikes: {
        type: "String"
      },
      InfoLink: {
        type: "String"
      }
    },
    { versionKey: false }))   
};
