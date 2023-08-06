const jwt = require('jsonwebtoken');


const requireSignIn = async(req,res,next)=>{

    
    try{
        token = req.headers.authorization.split(" ")[1];

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;
        console.log(req.user)

        next();

    }
    catch(err){
        console.log(err);
        res.status(401).json({message:'invalid token'})
    }

};


module.exports = requireSignIn