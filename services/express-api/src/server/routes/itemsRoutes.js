import { Router } from "express";

const itemRouter = Router();


itemRouter.get('/shoes', (req, res) => {
    res.send('Route not implemented');
});

itemRouter.get('/clothes', (req, res) => {
    res.send('Route not implemented');
});

itemRouter.get('/accessories', (req, res) => {
    res.send('Route not implemented');
});

itemRouter.get('/hats', (req, res) => {
    res.send('Route not implemented');
});

itemRouter.get('/slippers', (req, res) => {
    res.send('Route not implemented');
});

itemRouter.get('/limited', (req, res) => {
    res.send('Route not implemented');
});



export default itemRouter; 

/**
 * @swagger
 * tags:
 *   name: /items
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /shoes:
 *   get:
 *     summary: Returns a JSON containing all shoes
 *     tags: 
 *       - /items
 *     responses:
 *       200:   
 *         description: A successful response
 * 
 */
 
 /** 
 * @swagger
 * /clothes:
 *   get:
 *     summary: Returns a JSON containing all clothes
 *     tags: 
 *       - /items  
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /accessories:
 *   get:
 *     summary: Returns a JSON containing all accessories
 *     tags: 
 *       - /items
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /hats:
 *   get:
 *     summary: Returns a JSON containing all hats
 *     tags: 
 *       - /items
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /slippers:
 *   get:
 *     summary: Returns a JSON containing all slippers
 *     tags: 
 *       - /items
 *     responses:
 *       200:   
 *         description: A successful response
 */

 /**
 * @swagger
 * /limited:
 *   get:
 *     summary: Returns a JSON containing all limited items
 *     tags: 
 *       - /items
 *     responses:
 *       200:   
 *         description: A successful response
 */