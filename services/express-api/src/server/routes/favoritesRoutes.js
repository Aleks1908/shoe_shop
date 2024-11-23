import { Router } from "express";
import { logger } from "../config/logger-config.js"

const favoritesRouter = Router();

//should only be accessible by the authenticated users so we should implement a middleware for this route
//TO-DO: Update is so that it uses an authetication service
favoritesRouter.use((req, res, next) => {
    logger.debug("Passing through the middleware");
    next();
})

favoritesRouter.get("/", (req, res) => {
    res.send('Route not implemented');
});

favoritesRouter.post("/", (req, res) => {
    res.send('Route not implemented');
});

favoritesRouter.delete("/",(req, res) => {
    res.send('Route not implemented');
});


export default favoritesRouter; 


/**
 * @swagger
 * tags:
 *   name: /favorites
 *   description: API endpoints for managing user favorite items
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a JSON containing all favorite items of a specific user
 *     tags: 
 *       - /favorites
 *     responses:
 *       200:   
 *         description: A successful response
 * 
 */
 
 /** 
 * @swagger
 * /:
 *   post:
 *     summary: Returns a JSON containing all favorite items of a specific user
 *     tags: 
 *       - /favorites  
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /:
 *   delete:
 *     summary: Returns a JSON containing all favorite items of a specific user
 *     tags: 
 *       - /favorites
 *     responses:
 *       200:   
 *         description: A successful response
 */
