'use strict';

const log4js = require('log4js');

const logPath = process.cwd();

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: logPath + '/logs/server.log',
      maxLogSize: 15 * 1024 * 1024,
      backups: 1,
      layout: {
        type: 'pattern',
        pattern: '%d{dd/MM/yyyy hh:mm:ss} %m',
      },
    },
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[%d{dd/MM/yyyy hh:mm:ss}%] %m',
      },
    },
  },
  categories: {
    error: { appenders: ['file', 'console'], level: 'error' },
    info: { appenders: ['file', 'console'], level: 'debug' },
    trace: { appenders: ['file'], level: 'info' },
    default: { appenders: ['file', 'console'], level: 'info' },
  },
});

const logger = log4js.getLogger();

/* TRACE NEW START OF SERVICE */
const _trace = (e) => logger.trace(e);
_trace('-------------------------------------------------------------------');
_trace('---------------------------- FIRST LOG ----------------------------');
_trace('-------------------------------------------------------------------');
/* END TRACE NEW START OF SERVICE */

module.exports = logger;
