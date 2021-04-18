const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'Nenhum token recebido'});

    jwt.verify(authHeader,process.env.SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).send({error:'Token inválido'});
        }
        req.body.email = decoded.email;
        return next();
    });
}