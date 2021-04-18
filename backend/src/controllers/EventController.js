const Events = require('../models/Events');
const Users = require('../models/Users');

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
            return res.status(400).json({error:"Erro ao tentar cadastrar novo evento"});
        })
        return res.json(event);
    },
    async index(req,res){
        const {email} = req.body;

        const author = await Users.findOne({email:email});

        const events = await Events.find({author: author._id});

        events.sort((a,b)=>{
            sortEvents(a,b);
        });

        return res.status(200).json(events);
    },
    async delete(req,res){
        const {id} = req.params;

        const event = await Events.deleteOne({_id:id});
        if(!event){
            return res.status(400).json({error:'Erro ao tentar achar o evento'})
        }

        return res.status(200).send("Personagem deletado com sucesso");
    },
    async update(req,res){
        const {id, name, date, description, startTime, endTime} = req.body;

        const event = await Events.updateOne({_id:id},{
            name:name,
            description:description,
            date:date,
            startTime:startTime,
            endTime:endTime
        }).catch((err)=>{
            return res.status(400).json({error:err});
        })

        return res.json(event);
        
    },
    async show(req,res){
        const {eventId} = req.query;

        const event = await Events.findOne({_id:eventId});
        if(!event){
            return res.status(404).json({error:'Erro ao tentar achar o evento'})
        }
        return res.json(event);
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