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