import { Router } from "express";

const authRouter = Router();


authRouter.post('/register', (req, res) => {
    res.send('Route not implemented');
});

authRouter.post('/login', (req, res) => {
    res.send('Route not implemented');
});


export default authRouter; 

/**
 * @swagger
 * tags:
 *   name: /auth
 *   description: API endpoints for authenticating users
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: API endpoints for authenticating users
 *     tags: 
 *       - /auth
 *     responses:
 *       200:   
 *         description: A successful response
 * 
 */
 
 /** 
 * @swagger
 * /login:
 *   post:
 *     summary: API endpoints for authenticating users
 *     tags: 
 *       - /auth  
 *     responses:
 *       200:   
 *         description: A successful response
 */