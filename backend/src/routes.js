const express = require('express');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middlewares/authMiddleware');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');

const routes = express.Router();

routes.get('/',(req,res)=>{
    return res.send("Seja bem-vindo");
});

routes.post('/user/register',UserController.store);
routes.post('/sign_in',AuthController.show);


routes.get('/all_users',AuthMiddleware,UserController.index);
routes.post('/events/create',AuthMiddleware,EventController.store);
routes.post('/events',AuthMiddleware,EventController.index);
routes.delete('/events/delete/:id',AuthMiddleware,EventController.delete);
routes.put('/event/update',AuthMiddleware,EventController.update);
routes.get('/event',AuthMiddleware,EventController.show);

module.exports = routes;