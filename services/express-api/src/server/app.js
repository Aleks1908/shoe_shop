import express from 'express';
import {requestLoggerMiddleware} from './config/logger-config.js';
import {connectToDB} from '../database/db-config.js';
import authRouter from './routes/authRoutes.js';
import itemRouter from './routes/itemsRoutes.js';
import favoritesRouter from './routes/favoritesRoutes.js';
import { swaggerUi, specs } from './swagger.js';

await connectToDB(); 
const app = express();
const appRouter = express.Router();
// Use the logger middleware for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLoggerMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Registration of routes
app.use("/api/v1", appRouter); 
appRouter.use("/items", itemRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/favorites", favoritesRouter);


export {app};
