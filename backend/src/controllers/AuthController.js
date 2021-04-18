const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const generateToken = require('../services/generateToken');

module.exports = {
    async show(req,res){
        const {email,password} = req.body;

        const user = await Users.findOne({email:email});

        if(!user){
            return res.status(400).json({error:'Email não cadastrado'});
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.status(400).json({error:'Senha inválida'});
        }
        user.password = undefined;

        return res.json({user,token:generateToken({email:email})});
    },
}