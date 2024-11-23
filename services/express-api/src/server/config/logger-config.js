import { configDotenv } from 'dotenv';

configDotenv();

import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`);

// Create console transport
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(), // Add colors
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
    ) // Custom format combining timestamp, level, and message
  ),
});


// Create file transport with daily rotation
const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat // Apply custom format for files
  ),
});

// Choose transports based on environment
const transports = process.env.ENV === 'LOCAL' ? [consoleTransport] : [fileTransport];

// Create the logger
const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || 'debug',
  transports,
});

// Middleware to log HTTP requests
const requestLoggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const { method, url } = req;
    const { statusCode } = res;
    const responseTime = Date.now() - startTime;

    // Determine log level based on response status
    let logLevel = 'info';
    if (statusCode >= 500) logLevel = 'error';
    else if (statusCode >= 400) logLevel = 'warn';

    // Log the HTTP request details
    logger.log(logLevel, `${method} ${url} ${statusCode} - ${responseTime}ms`);
  });

  next();
};

export { logger, requestLoggerMiddleware };
