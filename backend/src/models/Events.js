const {Schema,model} = require('mongoose');
const Users = require('./Users');

const EventSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
},{
    timestamps:true
});

module.exports = model('Event',EventSchema);