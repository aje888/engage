const { createLogger, format, transports, addColors } = require('winston');

require('winston-daily-rotate-file');

const myCustomLevels = {
  levels: {
    audit: 0,
  },
  colors: {
    audit: 'blue'
  }
};


const myFormat = format.printf((info) => {
  return `[${info.level}] ${info.timestamp} - ${info.message}`;
})

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const auditlogger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    format.timestamp(),
    myFormat,
    format.colorize()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.DailyRotateFile({ filename: 'audit-%DATE%.log', dirname: './logs', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '14d', level: 'audit' })
  ],
});

addColors(myCustomLevels.colors);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  auditlogger.add(new transports.Console({
  level: 'audit',
  format: format.combine(
    format.timestamp(),
    myFormat,
    format.colorize()
  )
  }));
}

module.exports = auditlogger;
