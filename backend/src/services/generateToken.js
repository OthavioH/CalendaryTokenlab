const jwt = require('jsonwebtoken');


function generateToken(params = {}){

    console.log(process.env.SECRET);

    return jwt.sign(params,process.env.SECRET,{
        expiresIn:86400,
    })
}

module.exports = generateToken;