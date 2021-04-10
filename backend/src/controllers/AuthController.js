const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const generateToken = require('../generateToken');

module.exports = {
    async show(req,res){
        const {email,password} = req.body;

        const user = await Users.findOne({email:email});

        if(!user){
            return res.json({error:'Email não cadastrado'});
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.json({error:'Senha inválida'});
        }
        user.password = undefined;

        return res.json({user,token:generateToken({email:email})});
    },
}

function removePasswords(UsersList){
    UsersList.map((item,i)=>{
        item.password = undefined;
    });
}