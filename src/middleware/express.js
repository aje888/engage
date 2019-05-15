
const logger = require('../logger');

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

module.exports = function (app) { // eslint-disable-line no-unused-vars
  // Add your custom middleware here. Remember, that
  // in Express the order matters

  // We need to intercept the client principal name for all requests
  // and add it to feathers for use in the services and hooks.
  app.use('/*', (req, res, next) => {

    logger.silly("URL requested: " + req.originalUrl);

    // If NODE_ENV is not production then we are not on Azure
    // and so the client header's won't exist. Force our username
    // to be a test one.
    if (process.env.NODE_ENV !== 'production') {
      req.feathers.userId   = '12345';
      req.feathers.userName = 'fred@capgemini.com';
    }
    else {
      req.feathers.userId   = req.get("X-MS-CLIENT-PRINCIPAL-ID");
      req.feathers.userName = req.get("X-MS-CLIENT-PRINCIPAL-NAME");
    }

    if( ! req.feathers.userId ) {
      req.feathers.userId   = '0';
      req.feathers.userName = 'Anonymous';
    }

    // If this is a @capgemini.com user or the grumbl api service account.
    if( ! req.feathers.userName.includes('@capgemini.com') ) {

      logger.debug("User Id: [" + req.feathers.userId + "]. User name: [" + req.feathers.userName + "] denied.")

      // If the user isn't @capgemini.com then we're not interested.
      // Redirect to login page.
      res.status(401);
      res.send("User >" + req.feathers.userName + "< denied. ");
    }
    else {

      logger.debug("User Id: [" + req.feathers.userId + "]. User name: [" + req.feathers.userName + "] allowed.")

      next();
    }

  });

  app.post('/file_upload', upload.array('uploads'), function (req, res, next) {

    //COPIED FROM OLD PROJECT BUT DOESN'T CURRENTLY WORK. WILL FIX WHEN NEEDED.

    res.status(200);

    // Return JSON array of upload file paths
    res.send(JSON.stringify(req.files.map(file => file.path.replace("public","").replace("\"","/"))));
  })
};
