const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URL)
console.log('connected to mongodb database successfully: ',conn.connection.host)

    }
    catch(err){
        console.log('Connection failed: ',err)
    }
};


module.exports = connectDB;