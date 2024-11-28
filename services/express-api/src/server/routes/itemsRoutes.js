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
 *   name: Items
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /items/shoes:
 *   get:
 *     summary: Returns an array of JSON objects containing all shoes
 *     tags: 
 *       - Items
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "674247652ac53a6567622aa7"
 *                 id: 5
 *                 name: "Product 1"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/shoes/shoe4.png"
 *                 category: "shoes"
 *                 color: "red"
 *                 stars: 1
 *               - _id: "674247652ac53a6567622aa9"
 *                 id: 7
 *                 name: "Product 1"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/shoes/shoe2.png"
 *                 category: "shoes"
 *                 color: "red"
 *                 stars: 3
 */

 
/**
 * @swagger
 * /items/clothes:
 *   get:
 *     summary: Returns an array of JSON objects containing all clothes
 *     tags: 
 *       - Items  
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "6742474e2ac53a6567622a8b"
 *                 id: 24
 *                 name: "Product 2"
 *                 description: "This is the description for Product"
 *                 price: 19.99
 *                 image: "../src/Assets/ProductImg/clothes/clothes2.png"
 *                 category: "clothes"
 *                 color: "red"
 *                 stars: 3
 *               - _id: "6742474e2ac53a6567622a94"
 *                 id: 33
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/clothes/clothes1.png"
 *                 category: "clothes"
 *                 color: "red"
 *                 stars: 3
 */


/**
 * @swagger
 * /items/accessories:
 *   get:
 *     summary: Returns an array of JSON objects containing all accessories
 *     tags: 
 *       - Items
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "674247542ac53a6567622a9a"
 *                 id: 39
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/accessories/acc4.png"
 *                 category: "accessories"
 *                 color: "black"
 *                 stars: 3
 *               - _id: "674247542ac53a6567622a98"
 *                 id: 37
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/accessories/acc2.png"
 *                 category: "accessories"
 *                 color: "black"
 *                 stars: 3
 */


/**
 * @swagger
 * /items/hats:
 *   get:
 *     summary: Returns an array of JSON objects containing all hats
 *     tags: 
 *       - Items
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "6742475b2ac53a6567622a9c"
 *                 id: 41
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/hats/hat2.png"
 *                 category: "hats"
 *                 color: "black"
 *                 stars: 3
 *               - _id: "6742475b2ac53a6567622a9b"
 *                 id: 40
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/hats/hat1.png"
 *                 category: "hats"
 *                 color: "blue"
 *                 stars: 3
 */


 /**
 * @swagger
 * /items/slippers:
 *   get:
 *     summary: Returns an array of JSON objects containing all slippers
 *     tags: 
 *       - Items
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "6742476a2ac53a6567622ab9"
 *                 id: 48
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/slippers/slipper1.png"
 *                 category: "slippers"
 *                 color: "black"
 *                 stars: 3
 *               - _id: "6742476a2ac53a6567622abb"
 *                 id: 50
 *                 name: "Product"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/slippers/slipper3.png"
 *                 category: "slippers"
 *                 color: "black"
 *                 stars: 3
 */


/**
 * @swagger
 * /items/limited:
 *   get:
 *     summary: Returns an array of JSON objects containing all limited items
 *     tags: 
 *       - Items
 *     responses:
 *       200:   
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "674247652ac53a6567622aa7"
 *                 id: 5
 *                 name: "Product 1"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/shoes/shoe4.png"
 *                 category: "shoes"
 *                 color: "red"
 *                 stars: 1
 *               - _id: "674247652ac53a6567622aa9"
 *                 id: 7
 *                 name: "Product 1"
 *                 description: "This is the description for Product"
 *                 price: 199.99
 *                 image: "../src/Assets/ProductImg/shoes/shoe2.png"
 *                 category: "shoes"
 *                 color: "red"
 *                 stars: 3
 */
