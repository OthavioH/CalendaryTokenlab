const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    birthDate:{
        type:Date,
        required:true
    },
},{
    timestamps:true
});

module.exports = model('User',UserSchema);