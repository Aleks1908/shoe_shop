import { Router } from "express";
import authHandler from "../handlers/authHander.js";
import Validate from "../middleware/validate.js";

const authRouter = Router();

authRouter.use(Validate);

authRouter.post('/register', async (req, res) => {
    let response = await authHandler.registerUserHandler(req.body);
    res.send(response).status(response.status);
});

authRouter.post('/login', async (req, res) => {
    let response = await authHandler.loginUserHandler(req.body);
    const {sessionID, ...jsonResponse} = response.body.message; 
    response.body.message = jsonResponse;
    let options = {
        maxAge: 20 * 60 * 1000, // would expire in 20minutes
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: true,
    };
    res.cookie("SessionID", sessionID, options);
    res.send(response).status(response.status);
    res.end();
});

authRouter.post("/logout", async (req, res) => {
    
    let response = await authHandler.logoutUserHandler(req);
    
    if (response.success) {
        res.setHeader('Clear-Site-Data', '"cookies"');
        return res.send(response); // Ends the response here
    }
    
    res.send(response); // Handles the case where success is false
    
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

  /** 
 * @swagger
 * /logout:
 *   post:
 *     summary: API endpoints for authenticating users
 *     tags: 
 *       - /auth  
 *     responses:
 *       200:   
 *         description: A successful response
 */
