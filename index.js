const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors')

//@connecting mongodb database to node js
const database_Connection = require('./config/dbConnection');
database_Connection();

//@Express object
const app = express();

//defining port of express js server
const port =  process.env.PORT || 5000  ;

//@middleware

//when we have to connect frontend to backend that time we required cors
app.use(cors());
//this a middleare to get a data from frontend to backedn
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//it will give info about which api developer triggered
app.use(morgan('dev'));


//rest api middleware 
app.use('/api/v1/auth',require('./routes/authRoutes'));
//

app.listen(port,()=>{
    console.log('server is running on : ',port)
})