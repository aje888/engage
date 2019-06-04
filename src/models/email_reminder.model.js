const NeDB = require('nedb');
const path = require('path');
const db = require('mongoose');




module.exports = {
  createModel: function (app) {
    const dbPath = app.get('nedb');
    const Model = new NeDB({
      filename: path.join(dbPath, 'email_reminder.db'),
      autoload: true
    });

    return Model;
  },
  schema: db.model('email-reminder', new db.Schema({
      Name: {
        type: "String",
        required: [true, 'Email Reminder must have nName.'],
        description: "The users name."
      },
	  
	  Email: {
        type: String,
		validate: {
			validator: function(v) {
				return /@capgemini.com/.test(v);
			},
			message: props => `${props.value} is not a valid Capgemini email address!`
		},
        required: [true, 'Valid Capgemini email address is required.'],
        description: "The users email."
      },
	  
	  URL: {
        type: String,
		validate: {
			validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true 
			}),
			message: props => `${props.value} is not a valid Activity URL!`
		},
        required: [true, 'Activity URL is required.'],
        description: "The activity url."
      },
    },
    { versionKey: false }))   
};
