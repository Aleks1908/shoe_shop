import express from 'express';
import db from "../database/db-config.js"
import {logger, requestLoggerMiddleware} from './config/logger-config.js';

const app = express();

// Use the logger middleware for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLoggerMiddleware);

// Simulated routes
app.get('/', (req, res) => {
    logger.debug('Handling root route');
    res.send('Hello World!');
  });
  
app.get('/error', (req, res) => {
logger.error('Simulated error');
res.status(500).send('Error occurred');
});


export {app};
