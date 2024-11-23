import { Router } from "express";
import itemsHandler from "../handlers/itemHandler.js";

const itemRouter = Router();


itemRouter.get('/shoes', async (req, res) => {
    res.send(await itemsHandler.fetchItems("shoes"));
});

itemRouter.get('/clothes', async (req, res) => {
    res.send(await itemsHandler.fetchItems("clothes"));
});

itemRouter.get('/accessories', async (req, res) => {
    res.send(await itemsHandler.fetchItems("accessories"));
});

itemRouter.get('/hats', async (req, res) => {
    res.send(await itemsHandler.fetchItems("hats"));
});

itemRouter.get('/slippers', async (req, res) => {
    res.send(await itemsHandler.fetchItems("slippers"));
});

itemRouter.get('/limited', async (req, res) => {
    res.send(await itemsHandler.fetchItems("limited"));
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
