import { Router } from "express";
import { Verify } from "../middleware/verify.js";
import { logger } from "../config/logger-config.js"

const favoritesRouter = Router();

//should only be accessible by the authenticated users so we should implement a middleware for this route
//TO-DO: Update is so that it uses an authetication service
favoritesRouter.use(Verify);

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
 *   name: Favorites
 *   description: API endpoints for managing user favorite items
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Returns a JSON containing all favorite items of a specific user
 *     tags: 
 *       - Favorites
 *     responses:
 *       200:   
 *         description: A successful response
 * 
 */
 
 /** 
 * @swagger
 * /favorites:
 *   post:
 *     summary: Adds a favorite item for a specific user
 *     tags: 
 *       - Favorites  
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Deletes a favorite item for a specific user
 *     tags: 
 *       - Favorites
 *     responses:
 *       200:   
 *         description: A successful response
 */
