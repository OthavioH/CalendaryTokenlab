const Events = require('../models/Events');
const Users = require('../models/Users');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    async store(req,res){
        const {name,desc,date,startTime,endTime,userEmail} = req.body;

        const author = await findUser(userEmail);

        const event = await Events.create({
            name:name,
            description:desc,
            date:date,
            startTime:startTime,
            endTime:endTime,
            author:author._id,
        }).catch((err)=>{
            console.log(err);
            return res.json({error:"Erro ao tentar cadastrar novo evento"});
        })
        return res.json(event);
    },
    async index(req,res){
        const {userEmail} = req.body;

        const author = await Users.findOne({email:userEmail});

        const events = await Events.find({author: author._id});

        events.sort((a,b)=>{
            sortEvents(a,b);
        });

        return res.json(events);
    }
}

async function findUser(email){
    const userExists = await Users.findOne({email:email});

    if(userExists){
        return userExists;
    }
}

function sortEvents(a,b){
    if(a.date < b.date){
        return -1;
    }
    if(a.date > b.data){
        return 1;
    }
    return 0;
}