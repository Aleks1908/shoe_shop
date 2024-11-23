import { Router } from "express";
import itemsRepository from "../../database/repositories/itemsRepository.js";

const itemRouter = Router();


itemRouter.get('/shoes', async (req, res) => {
    let shoes = await itemsRepository.getShoes(); 
    res.send(shoes);
});

itemRouter.get('/clothes', async (req, res) => {
    let clothes = await itemsRepository.getClothes();
    res.send(clothes);
});

itemRouter.get('/accessories', async (req, res) => {
    let accessories = await itemsRepository.getAccessories();
    res.send(accessories);
});

itemRouter.get('/hats', async (req, res) => {
    let hats = await itemsRepository.getHats();
    res.send(hats);
});

itemRouter.get('/slippers', async (req, res) => {
    let slippers = await itemsRepository.getSlippers();
    res.send(slippers);
});

itemRouter.get('/limited', async (req, res) => {
    let limited = await itemsRepository.getLimited();
    res.send(limited);
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