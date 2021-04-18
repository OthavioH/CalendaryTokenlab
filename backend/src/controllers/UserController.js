const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const generateToken = require('../services/generateToken');

module.exports = {
    async store(req,res){
        const {name,email,birthDate,password,cfrPassword} = req.body;

        const userExists = await Users.findOne({email:email});
        if(userExists){
            return res.status(400).json({error:'Já existe um usuário registrado com este email'})
        }

        const passwordError = validatePasswords(password,cfrPassword);
        if(passwordError){
            return res.status(400).json({error:'As senhas são diferentes'});
        }

        const date = new Date(birthDate);
        const age = calculateAge(date);

        const user = await Users.create({
            name:name,
            email:email,
            password:await bcrypt.hash(password,10),
            age:age,
            birthDate:date,
        });
        user.password = undefined;

        return res.json({user,token:generateToken({email:user.email})});
    },
    async index(req,res){
        
        const users = await Users.find();

        removePasswords(users);

        return res.json({users});
    }
}

function removePasswords(usersList){
    usersList.map((user)=>{
        user.password = undefined;
    });
}

function calculateAge(birthDate){
    today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();

    if(today.getMonth() < (birthDate.getMonth() - 1)){
        age--;
    }
    if(( (birthDate.getMonth()) == today.getMonth()) && (today.getDay() < birthDate.getDay()) ){
        age--;
    }
    return age;
}

function validatePasswords(password, cfrPassword){
    if(cfrPassword !== password){
        return true;
    }
    else{
        return false;
    }
}