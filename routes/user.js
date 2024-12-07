const express=require("express");
const router=express.Router();
const {usermodelobj}=require("../models/user");

router.get('/signin',(req,res)=>{
    return res.render("signin");
});

router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.post('/signin',async(req,res)=>{
const {email,password}=req.body;
try{
    const token =await usermodelobj.matchPasswordAndGeneratetoken(email, password);
    return res.cookie("token",token).redirect('/');
    
    
}catch(error){
return res.render("signin",{
    error:"Invalid email or password",
});
}


});






router.post('/signup',async(req,res)=>{
  
    const {fullname,email,password}=req.body;
   
    await usermodelobj.create({
        fullname:fullname,
        email:email,
        password:password,
    });
    return res.redirect("/");
})
module.exports={
    router,
}