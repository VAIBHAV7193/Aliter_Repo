const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    }


},{timestamps:true});


module.exports = mongoose.model('Auth',AuthSchema);