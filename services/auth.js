const jwt=require("jsonwebtoken");
 const secretkey="#@manohar21@$"
function createtokenforuser(user){
   
   const token= jwt.sign({
        _id:user._id,
        email:user.email,
        profileimageurl:user.profileimageurl,
        role:user.role,
        fullname:user.fullname,
    },secretkey);
    console.log(token);
    return token;
    
}

function validatetoken(token){
    const payload=jwt.verify(token,secretkey);
    console.log(payload);
    return payload;
}


module.exports={
    createtokenforuser,
    validatetoken,
}