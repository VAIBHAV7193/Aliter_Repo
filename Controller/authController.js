const Auth_Model = require('../model/AuthModel');
const {hashPassword,comparePassword} = require('../helper/userHelper')
const jwt = require("jsonwebtoken");


const Create_User_Controller = async(req,res)=>{

    try{
    const{fullname,email,password,age,city} = req.body;
    if(!fullname){
        return res.send({message:'Name is required'})
    }
    if(!email){
        return res.send({message:'Email is required'})
    }
    if(!password){
        return res.send({message:'Password is required'})
    }
    if(!age){
        return res.send({message:'Password is required'})
    }
    if(!city){
        return res.send({message:'Password is required'})
    }
    

    //chaeck existing user
    const user = await Auth_Model.findOne({email});
    if(user){
        return res.status(201).send({
            success:false,
            messgae:'Alredy register user plz login'
        })
    }

     //convert password into hashpassword
     const hashPassword2 =  await hashPassword(password)
     //create user
     const registerUser = await Auth_Model.create({fullname,email,password:hashPassword2,age,city});

     registerUser.save();

     res.status(201).send({
         success:true,
         messgae:'User created successfully',
         user:{
            name:user.fullnamename,
            email:user.email,
            age:user.age,
            city:user.city
            
        }
     })

}

catch(err){
    
        console.log(err);
        res.status(500).send({
            success:false,
            messgae:'Error in Creating User',
            err
        })}

}

const Login_Controller  = async(req,res)=>{
    try{
        const{email,password} = req.body;
    
        if(!email){
            return res.send({error:'Email is required'})
    
        }
        if(!password){
            return res.send({error:'Password is required'})
        }
        if(!email || !password){
            return res.send({error:'Both of the field is required'})
    
        }
    
        //validate the email of user 
        const user = await Auth_Model.findOne({email})
    
        if(!user){
            return res.status(404).send({
                success:false,
                messgae:'User name is invalid'
    
            })
        }
    //compare the password of user
        const validPassword = await comparePassword(password,user.password);
    
        if(!validPassword){
            return res.status(200).send({
                success:false,
                messgae:'Invalid password'
            })
        }
        //create token
    
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn: "1d"});
        res.status(200).send({
            success:true,
            messgae:'Login successfully',
            user:{
                name:user.fullnamename,
                email:user.email,
                age:user.age,
                city:user.city
                
            },
            token
    
        })
    }
    
    catch(err){
        return res.status(500).send({
            success:false,
            messgae:'Error in loging time',
            err
        })
    }
}

const forgotPassword = async(req,res)=>{
    try{
        const{email,newPassword} = req.body;
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        
        if(!newPassword){
            res.status(400).send({message:'NewPassword is required'})
        }

        //validate a email
        const user = await Auth_Model.findOne({email});

        if(!user){
            return res.status(404).send({
                success:false,
                message:'wrong email'
            })
        }
        //convert new password into hashpassword
        const hashed = await hashPassword(newPassword);
        await Auth_Model.findByIdAndUpdate({_id:user._id},{password:hashed})
        res.status(200).send({
            success:true,
            message:'Password changed successfully'
        })

    }

    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Error in forgot password',
            err
        })
    }

}


const Update_User = async(req,res)=>{

    try{
        const{fullname,age,city} = req.body;
        if(!fullname){
            return res.send({message:'Name is required'})
        }
       
        if(!age){
            return res.send({message:'Password is required'})
        }
        if(!city){
            return res.send({message:'city is required'})
        }
        
        //in this section i only allowed to update fullname , age , city
    const user = await Auth_Model.findByIdAndUpdate({_id:req.params.id},{$set:{fullname:fullname,age:age,city:city}});

    
    user.save();

    res.status(200).send({
        success:true,
        messgae:'Info Updated Successfully',
        user:{
            fullname:user.fullname,
            email:user.email,
            age:user.age,
            city:user.city
            
        },

    })

  
    }
    
    catch(err){
        
            console.log(err);
            res.status(500).send({
                success:false,
                messgae:'Error in Updating User',
                err
            })}
    
    
}


const Delete_User = async(req,res)=>{
    try{

        await Auth_Model.findByIdAndDelete({_id:req.params.id})

        res.status(200).send({
            success:true,
            message:'User Deleted Successfully'
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in delte User'
        })
    }
}

const Get_All_User = async(req,res)=>{
    try{
        
        const user = await Auth_Model.find({})
        res.status(200).send({
            success:true,
            message:'User Shown Successfully',
            user,
            count:  user.length
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting  Info of all user',
            error
        })
    }
}

const Get_Single_User = async(req,res)=>{
    try{
        
        const user = await Auth_Model.findById({_id:req.params.id})
        res.status(200).send({
            success:true,
            message:'User Shown Successfully',
            user,
            count:  user.length
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting info of sigle user',
            error
        })
    }
}


module.exports = {Create_User_Controller,Login_Controller,forgotPassword,Update_User,Delete_User,Get_All_User,Get_Single_User}