const morgan = require('morgan');

const config = require('./index');
const logger = require('./logger');

morgan.token('message', (_req, res) => res.locals.errorMessage || '');

const ipFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');

const successFormat = `${ipFormat()}:method :url :status - :response-time ms`;
const successHandler = morgan(successFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorFormat = `${ipFormat()}:method :url :status - :response-time ms - message: :message`;
const errorHandler = morgan(errorFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
