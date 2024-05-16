const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Adminname:{
        type:String,
    },
    email: {
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    username: {
        type:String,
    },
    type: {
        type:String,
    },
    organization: {
        type:String,
    },
    contactNumber: {
        type:String,
        unique:true
    },
    age:Number
})

module.exports = mongoose.model('Admin',UserSchema);