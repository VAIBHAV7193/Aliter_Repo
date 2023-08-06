const bcrypt = require('bcrypt')

 const hashPassword = async(password)=>{
    try{
        const hash = await bcrypt.hash(password,10);
        return hash;

    }
    catch(err){
        console.log('Error while hasihing password',err)
    }

}

 const comparePassword = async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
    
}

module.exports = {hashPassword,comparePassword}