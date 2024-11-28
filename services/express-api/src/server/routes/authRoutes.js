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

    if(typeof response.body.message === 'object'){
        const {sessionID, ...jsonResponse} = response.body.message; 
        response.body.message = jsonResponse;
        let options = {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: false,
            sameSite: 'Lax',
        };
        res.cookie("SessionID", sessionID, options);
    }
    
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
 *   name: Authentication
 *   description: API endpoints for authenticating users
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: The endpoint for registering the user
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "test"
 *               password:
 *                 type: string
 *                 example: "test"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             example:
 *               body:
 *                 message:
 *                   user_name: "test"
 *                   favorites: []
 *                   _id: "67485e58dea2b1410dddaebf"
 *                   __v: 0
 *               status: 201
 *               success: true
 */

 
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: The endpoint for logging the user in
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "test"
 *               password:
 *                 type: string
 *                 example: "test"
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               body:
 *                 message:
 *                   _id: "67485e58dea2b1410dddaebf"
 *                   user_name: "test"
 *                   favorites: []
 *                   __v: 0
 *               status: 200
 *               success: true
 *         headers:
 *           Set-Cookie:
 *             description: Session ID in the form of a JWT token
 *             schema:
 *               type: string
 *               example: "SessionID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg1ZTU4ZGVhMmIxNDEwZGRkYWViZiIsImlhdCI6MTczMjc5NjE0MywiZXhwIjoxNzMyNzk5NzQzfQ.c_XAAsZPvVNpIbnR4eK-deYNtO2j8Ydf31RtP1KcM7w"
 */


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: The endpoint for logging the user out
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: false
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: "SessionID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg1ZTU4ZGVhMmIxNDEwZGRkYWViZiIsImlhdCI6MTczMjc5NjE0MywiZXhwIjoxNzMyNzk5NzQzfQ.c_XAAsZPvVNpIbnR4eK-deYNtO2j8Ydf31RtP1KcM7w"
 *     responses:
 *       200:
 *         description: A successful logout response
 *         content:
 *           application/json:
 *             example:
 *               body:
 *                 message: "Logged out"
 *               status: 200
 *               success: true
 *         headers:
 *           Clear-Site-Data:
 *             description: Clears the cookies from the browser after successful logout
 *             schema:
 *               type: string
 *               example: '"cookies"'
 */

