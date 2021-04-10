const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'Nenhum token recebido'});

    jwt.verify(authHeader,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({error:'Token inválido'});
        }
        req.email = decoded.email;
        return next();
    });
}