import { Router } from "express";

const authRouter = Router();


authRouter.post('/register', (req, res) => {
    res.send('Route not implemented');
});

authRouter.post('/login', (req, res) => {
    res.send('Route not implemented');
});


export default authRouter; 