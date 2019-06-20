const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const serveStatic = require('serve-static')

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const swagger = require('feathers-swagger');

const logger = require('./logger');
const auditlogger = require('./auditlogger');
const express_middleware = require('./middleware/express');
const socketio_middleware = require('./middleware/socketio');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
//app.use('/', express.static(app.get('public')));

const setCacheControl = (res, path)  => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
}

app.use('/', serveStatic(app.get('public'), {
  setHeaders: setCacheControl
}))


// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio(socketio_middleware));

// Configure other middleware (see `middleware/index.js`)
app.configure(express_middleware);

const swagger_host = process.env.NODE_ENV === 'production' ? app.get('host') : app.get('host')+":"+app.get('port');

app.configure(swagger({
    docsPath: '/docs',
    docsJsonPath: '/docs_json',
    uiIndex: true,
    idType: 'string',
    specs: {
      info: {
        title: 'Community Hub API',
        description: 'A description',
        version: '0.0.1',
      },
      host: swagger_host,
      schemes: [app.get('scheme')]
    },
  }));

// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
