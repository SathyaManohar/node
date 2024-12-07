const {validatetoken}=require("../services/auth");

function checkforauthentication(cookiename){
    return (req,res,next)=>{
        const tokenvalue=req.cookies[cookiename];
        if(!tokenvalue){
            next();
        }
try{
    const payload=validatetoken(tokenvalue);
    console.log(payload);
    req.user=payload;
    next();

}catch(error){
console.log("error");
}



       

    }
}

module.exports={
    checkforauthentication,
}