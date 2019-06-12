const { createLogger, format, transports, addColors } = require('winston');

require('winston-daily-rotate-file');

const myCustomLevels = {
  levels: {
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5
  },
  colors: {
    error: 'red', 
    warn: 'orange', 
    info: 'white', 
    verbose: 'yellow', 
    debug: 'green', 
    silly: 'grey'
  }
};

const myFormat = format.printf((info) => {
  return `[${info.level}] ${info.timestamp} - ${info.message}`;
})

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    format.splat(),
    format.timestamp(),
    myFormat,
    format.colorize()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.DailyRotateFile({ filename: 'error-%DATE%.log', dirname: './logs', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '14d', level: 'error' }),
    new transports.DailyRotateFile({ filename: 'debug-%DATE%.log', dirname: './logs', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '14d', level: 'debug' })  ],
});

addColors(myCustomLevels.colors);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
  level: 'silly',
  format: format.combine(
    format.splat(),
    format.timestamp(),
    myFormat,
    format.colorize()
  )
  }));
}

module.exports = logger;
