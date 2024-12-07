const express=require("express");
const app=express();
// const port=8000;
const PORT=process.env.PORT||8000;
require("dotenv").config();
const path=require("path");
const {router}=require("./routes/user");
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser");
const {checkforauthentication}=require("./middlewares/auth");
const blogrouter=require("./routes/blog");
const {blogmodelobj}=require("./models/blog");
//console.log("Env variables:",process.env.myname);
//mongoose.connect("mongodb://127.0.0.1:27017/Myblog").then(()=>console.log("Mongodb Connected")).catch((error)=>console.log("MongoDb Cannot be connected",error));
mongoose.connect(process.env.mongourl).then(()=>console.log("Mongodb Connected")).catch((error)=>console.log("MongoDb Cannot be connected",error));
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use('/user',router);
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use('/blog',blogrouter);
app.use(express.static(path.resolve('./public')));
app.use('/main',(req,res)=>{
    return res.render("mainhome");
})
app.get('/',async(req,res)=>{
    console.log(req.user);
    const allblogs=await blogmodelobj.find();
    return res.render("home",{
      blogs:allblogs,
        user:req.user,
    });
})

app.get('/logout',(req,res)=>{
res.clearCookie('token').redirect('/');
});


app.listen(PORT,()=>console.log(`server started at port ${PORT}`));
