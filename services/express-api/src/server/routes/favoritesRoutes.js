import { Router } from "express";
import { Verify } from "../middleware/verify.js";
import favHandler from "../handlers/favHandler.js";

const favoritesRouter = Router();

//should only be accessible by the authenticated users so we should implement a middleware for this route
//TO-DO: Update is so that it uses an authetication service
favoritesRouter.use(Verify);

favoritesRouter.get("/", async (req, res) => {
    let response = await favHandler.getFavorites(req.user);
    res.send(response); 
});

favoritesRouter.post("/", async (req, res) => {
    let response = await favHandler.addItem(req.user, req.body.item_id);
    res.send(response);
});

favoritesRouter.delete("/", async (req, res) => {
    let response = await favHandler.removeItem(req.user, req.body.item_id);
    res.send(response);
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
 * /items/favorites:
 *   get:
 *     summary: Returns a JSON containing all favorite items of a specific user
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         description: Session ID for user authentication
 *         schema:
 *           type: string
 *           example: SessionID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg1ZTU4ZGVhMmIxNDEwZGRkYWViZiIsImlhdCI6MTczMjk4NjY5MSwiZXhwIjoxNzMyOTkwMjkxfQ.GLcFZ9cXvPPYtdSZR0s_VrbVyrpMQTlgZ6svurCPwn4
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "674247542ac53a6567622a97"
 *                   id:
 *                     type: integer
 *                     example: 36
 *                   name:
 *                     type: string
 *                     example: "Product"
 *                   description:
 *                     type: string
 *                     example: "This is the description for Product"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 199.99
 *                   image:
 *                     type: string
 *                     example: "../src/Assets/ProductImg/accessories/acc1.png"
 *                   category:
 *                     type: string
 *                     example: "accessories"
 *                   color:
 *                     type: string
 *                     example: "black"
 *                   stars:
 *                     type: integer
 *                     example: 3
 *         statusCode: 200
 */

 
/** 
 * @swagger
 * /items/favorites:
 *   post:
 *     summary: Adds a favorite item for a specific user
 *     tags: 
 *       - Favorites  
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         description: Session ID for user authentication
 *         schema:
 *           type: string
 *           example: SessionID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg1ZTU4ZGVhMmIxNDEwZGRkYWViZiIsImlhdCI6MTczMjk4NjY5MSwiZXhwIjoxNzMyOTkwMjkxfQ.GLcFZ9cXvPPYtdSZR0s_VrbVyrpMQTlgZ6svurCPwn4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: string
 *                 example: "674247542ac53a6567622a97"
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67485e58dea2b1410dddaebf"
 *                 user_name:
 *                   type: string
 *                   example: "test"
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "674247542ac53a6567622a97"
 *                 __v:
 *                   type: integer
 *                   example: 0
 */

/** 
 * @swagger
 * /items/favorites:
 *   delete:
 *     summary: Deletes a favorite item for a specific user
 *     tags: 
 *       - Favorites  
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         description: Session ID for user authentication
 *         schema:
 *           type: string
 *           example: SessionID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg1ZTU4ZGVhMmIxNDEwZGRkYWViZiIsImlhdCI6MTczMjk4NjY5MSwiZXhwIjoxNzMyOTkwMjkxfQ.GLcFZ9cXvPPYtdSZR0s_VrbVyrpMQTlgZ6svurCPwn4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: string
 *                 example: "674247542ac53a6567622a97"
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67485e58dea2b1410dddaebf"
 *                 user_name:
 *                   type: string
 *                   example: "test"
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "674247542ac53a6567622a87"
 *                 __v:
 *                   type: integer
 *                   example: 0
 */
